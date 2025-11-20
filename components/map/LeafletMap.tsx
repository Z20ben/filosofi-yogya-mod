'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { MapPin, Satellite, Landmark, Pyramid, Building, Store, UtensilsCrossed, ShoppingCart, Plus, Minus, Layers, HelpCircle, Search, Locate, Maximize2, Minimize2 } from 'lucide-react';
import { categoryMetadata, type SiteLocation, type SiteCategory } from '@/lib/data/mapLocations';
import L from 'leaflet';
import 'leaflet.markercluster';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './LeafletMap.css';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Category icon mapping
const categoryIcons: Record<SiteCategory, any> = {
  heritage: Landmark,
  monument: Pyramid,
  religious: Building,
  tourism: MapPin,
  umkm: Store,
  culinary: UtensilsCrossed,
  market: ShoppingCart,
};

interface LeafletMapProps {
  locations: SiteLocation[];
  onLocationSelect: (location: SiteLocation) => void;
  isSearchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  selectedLocation: SiteLocation | null;
  searchSidebar: React.ReactNode;
  locationSidebar: React.ReactNode;
}

export function LeafletMap({ locations, onLocationSelect, isSearchOpen, onSearchOpenChange, selectedLocation, searchSidebar, locationSidebar }: LeafletMapProps) {
  const locale = useLocale();
  const t = useTranslations('interactiveMap');
  const { theme } = useTheme();
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<SiteCategory>>(
    new Set(Object.keys(categoryMetadata) as SiteCategory[])
  );
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);
  const currentLayerRef = useRef<L.TileLayer | null>(null);
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Filter locations based on selected categories
  const filteredLocations = locations.filter((loc) =>
    selectedCategories.has(loc.category)
  );

  // Initialize map
  useEffect(() => {
    // Don't initialize if already exists
    if (mapRef.current || !mapContainerRef.current) return;

    // Create map with Yogyakarta bounds
    const yogyakartaBounds: L.LatLngBoundsExpression = [
      [-8.2, 110.1], // Southwest coordinates
      [-7.5, 110.7], // Northeast coordinates
    ];

    const map = L.map(mapContainerRef.current, {
      center: [-7.797068, 110.370529],
      zoom: 13,
      minZoom: 10, // Prevent zooming out too far
      maxBounds: yogyakartaBounds,
      maxBoundsViscosity: 0.8, // How strongly to stick to bounds
      scrollWheelZoom: true,
      attributionControl: true, // Enable attribution control for proper credits
      zoomControl: false, // Remove default zoom control
    });

    // Customize attribution position and prefix
    if (map.attributionControl) {
      map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank">Leaflet</a>');
    }

    mapRef.current = map;

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle theme changes and switch tile layer
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Remove current layer if exists
    if (currentLayerRef.current) {
      map.removeLayer(currentLayerRef.current);
    }

    // Create appropriate tile layer
    let tileLayer: L.TileLayer;

    if (isSatelliteView) {
      // Satellite view - Using Esri World Imagery (Free for commercial use with attribution)
      tileLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      );
    } else {
      // Theme-based view (Light or Dark) - Using CARTO (Free for commercial with attribution)
      const isDark = theme === 'dark';
      tileLayer = L.tileLayer(
        isDark
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );
    }

    // Add new layer to map
    tileLayer.addTo(map);
    currentLayerRef.current = tileLayer;
  }, [theme, isSatelliteView]);

  // Add markers with clustering
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Remove existing cluster group if exists
    if (markerClusterGroupRef.current) {
      map.removeLayer(markerClusterGroupRef.current);
    }

    // Create marker cluster group with custom styling
    const markerClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();
        let diameter = 40;

        if (count > 10) {
          diameter = 60;
        } else if (count > 5) {
          diameter = 50;
        }

        const fontSize = diameter === 40 ? '14px' : diameter === 50 ? '16px' : '18px';

        return L.divIcon({
          html: `<div style="
            background: linear-gradient(135deg, var(--javanese-brown-bg), var(--javanese-terracotta));
            color: white;
            border-radius: 50%;
            width: ${diameter}px;
            height: ${diameter}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: ${fontSize};
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          ">${count}</div>`,
          className: 'custom-cluster-icon',
          iconSize: L.point(diameter, diameter),
        });
      },
    });

    markerClusterGroupRef.current = markerClusterGroup;

    // Add markers to cluster group - only for filtered locations
    filteredLocations.forEach((location) => {
      // Get category color and icon
      const categoryColor = categoryMetadata[location.category].color;
      const IconComponent = categoryIcons[location.category];

      // Create custom colored icon using Lucide icon
      const iconHtml = renderToStaticMarkup(
        <div
          style={{
            backgroundColor: categoryColor,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <IconComponent size={20} color="white" strokeWidth={2.5} />
        </div>
      );

      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: iconHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon: customIcon,
      });

      // Add click event to open sidebar
      marker.on('click', () => {
        onLocationSelect(location);
      });

      // Add marker to cluster group
      markerClusterGroup.addLayer(marker);
    });

    // Add cluster group to map
    map.addLayer(markerClusterGroup);
  }, [filteredLocations, onLocationSelect]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const toggleFullscreen = async () => {
    if (!containerWrapperRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await containerWrapperRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
        setIsFullscreen(false);
      }

      // Invalidate map size after fullscreen toggle to ensure proper rendering
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const toggleCategory = (category: SiteCategory) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const handleGetUserLocation = () => {
    if (!('geolocation' in navigator)) {
      alert(locale === 'id'
        ? 'Geolokasi tidak didukung oleh browser Anda'
        : 'Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        setUserLocation(coords);
        setIsLocating(false);

        // Pan to user location
        if (mapRef.current) {
          mapRef.current.panTo([coords.lat, coords.lng], {
            animate: true,
            duration: 1.0
          });
        }

        // Create or update user marker
        if (mapRef.current) {
          // Remove existing user marker if exists
          if (userMarkerRef.current) {
            mapRef.current.removeLayer(userMarkerRef.current);
          }

          // Create blue circle icon for user location
          const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: `<div style="
              width: 20px;
              height: 20px;
              background: #4285F4;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          // Add user marker
          const userMarker = L.marker([coords.lat, coords.lng], {
            icon: userIcon,
            zIndexOffset: 1000 // Always on top
          });

          userMarker.bindPopup(
            locale === 'id' ? 'Anda di sini' : 'You are here'
          );

          userMarker.addTo(mapRef.current);
          userMarkerRef.current = userMarker;

          // Add accuracy circle
          L.circle([coords.lat, coords.lng], {
            radius: position.coords.accuracy,
            color: '#4285F4',
            fillColor: '#4285F4',
            fillOpacity: 0.1,
            weight: 1
          }).addTo(mapRef.current);
        }
      },
      (error) => {
        setIsLocating(false);

        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = locale === 'id'
              ? 'Izin lokasi ditolak. Silakan aktifkan izin lokasi di browser Anda.'
              : 'Location permission denied. Please enable location permission in your browser.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = locale === 'id'
              ? 'Informasi lokasi tidak tersedia.'
              : 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = locale === 'id'
              ? 'Waktu permintaan lokasi habis.'
              : 'Location request timed out.';
            break;
          default:
            errorMessage = locale === 'id'
              ? 'Terjadi kesalahan saat mendapatkan lokasi.'
              : 'An error occurred while getting location.';
        }

        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Reset all category filters when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setSelectedCategories(new Set(Object.keys(categoryMetadata) as SiteCategory[]));
    }
  }, [isSearchOpen]);

  // Fly to selected location with zoom
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      const currentZoom = mapRef.current.getZoom();

      // Always zoom to 18 (maximum detail) to avoid cluster markers
      // This ensures individual markers are visible even when close together
      const targetZoom = 18;

      mapRef.current.flyTo(
        [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng],
        targetZoom,
        {
          duration: 1.5,
          easeLinearity: 0.25
        }
      );
    }
  }, [selectedLocation]);

  // Handle fullscreen change events (including ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);

      // Invalidate map size when fullscreen state changes
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerWrapperRef}
      className="relative"
      style={{
        height: isFullscreen ? '100vh' : '600px',
        width: '100%',
        backgroundColor: 'var(--background)'
      }}
    >
      <div
        ref={mapContainerRef}
        style={{
          height: '100%',
          width: '100%'
        }}
      />

      {/* Control Buttons Stack */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        {/* Zoom In Button */}
        <button
          onClick={handleZoomIn}
          className="p-3 rounded-lg shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={handleZoomOut}
          className="p-3 rounded-lg shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </button>

        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isFullscreen
              ? 'map-button-active text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={isFullscreen ? (locale === 'id' ? 'Keluar Layar Penuh' : 'Exit Fullscreen') : (locale === 'id' ? 'Layar Penuh' : 'Fullscreen')}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>

        {/* Satellite View Toggle Button */}
        <button
          onClick={() => setIsSatelliteView(!isSatelliteView)}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isSatelliteView
              ? 'map-button-active text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={isSatelliteView ? 'Switch to Map View' : 'Switch to Satellite View'}
        >
          <Satellite className="w-5 h-5" />
        </button>

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isFilterOpen
              ? 'map-button-active text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Filter Categories"
        >
          <Layers className="w-5 h-5" />
        </button>

        {/* Search Button */}
        <button
          onClick={() => onSearchOpenChange(!isSearchOpen)}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isSearchOpen
              ? 'map-button-active text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={locale === 'id' ? 'Cari Lokasi' : 'Search Location'}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Get User Location Button */}
        <button
          onClick={handleGetUserLocation}
          disabled={isLocating}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isLocating
              ? 'map-button-active text-white cursor-wait opacity-50'
              : userLocation
              ? 'map-button-active text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={locale === 'id' ? 'Lokasi Saya' : 'My Location'}
        >
          <Locate className={`w-5 h-5 ${isLocating ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Filter Card */}
      {isFilterOpen && (
        <div className="absolute top-4 right-20 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 w-64 border border-border">
          <h3 className="font-semibold text-sm mb-3">
            {locale === 'id' ? 'Filter Kategori' : 'Filter Categories'}
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {(Object.keys(categoryMetadata) as SiteCategory[]).map((category) => {
              const IconComponent = categoryIcons[category];
              const isSelected = selectedCategories.has(category);
              return (
                <div
                  key={category}
                  className="flex items-center justify-between p-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: categoryMetadata[category].color }}
                    >
                      <IconComponent className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm">
                      {locale === 'id'
                        ? categoryMetadata[category].label_id
                        : categoryMetadata[category].label_en}
                    </span>
                  </div>
                  {/* Switch Toggle */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isSelected
                        ? 'bg-primary'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isSelected ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend - Mobile: Button */}
      <div className="lg:hidden absolute bottom-4 left-4 z-30">
        <button
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
            isLegendOpen
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={locale === 'id' ? 'Legenda' : 'Legend'}
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Legend - Mobile: Popup Card */}
      {isLegendOpen && (
        <div className="lg:hidden absolute bottom-20 left-4 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-3 w-56 border border-border">
          <h4 className="text-xs font-semibold mb-2">
            {locale === 'id' ? 'Legenda Kategori' : 'Category Legend'}
          </h4>
          <div className="space-y-2">
            {(Object.keys(categoryMetadata) as SiteCategory[]).map((category) => {
              const IconComponent = categoryIcons[category];
              return (
                <div key={category} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: categoryMetadata[category].color }}
                  >
                    <IconComponent className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs">
                    {locale === 'id'
                      ? categoryMetadata[category].label_id
                      : categoryMetadata[category].label_en}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend - Desktop: Horizontal Bar */}
      <div className="hidden lg:block absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-border">
        <div className="flex flex-nowrap items-center justify-center gap-x-3">
          {(Object.keys(categoryMetadata) as SiteCategory[]).map((category) => {
            const IconComponent = categoryIcons[category];
            return (
              <div key={category} className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: categoryMetadata[category].color }}
                >
                  <IconComponent className="w-3 h-3 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] leading-tight whitespace-nowrap">
                  {locale === 'id'
                    ? categoryMetadata[category].label_id
                    : categoryMetadata[category].label_en}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebars - Render inside fullscreen container */}
      {searchSidebar}
      {locationSidebar}
    </div>
  );
}
