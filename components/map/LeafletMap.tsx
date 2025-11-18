'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { MapPin, Satellite, Landmark, Mountain, Building, Store, UtensilsCrossed, Sparkles } from 'lucide-react';
import { categoryMetadata, type SiteLocation, type SiteCategory } from '@/lib/data/mapLocations';
import L from 'leaflet';
import 'leaflet.markercluster';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './LeafletMap.module.css';

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
  monument: Mountain,
  religious: Building,
  tourism: MapPin,
  umkm: Store,
  culinary: UtensilsCrossed,
  attraction: Sparkles,
};

interface LeafletMapProps {
  locations: SiteLocation[];
}

export function LeafletMap({ locations }: LeafletMapProps) {
  const locale = useLocale();
  const t = useTranslations('interactiveMap');
  const { theme } = useTheme();
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const currentLayerRef = useRef<L.TileLayer | null>(null);
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  // Initialize map
  useEffect(() => {
    // Don't initialize if already exists
    if (mapRef.current || !mapContainerRef.current) return;

    // Create map
    const map = L.map(mapContainerRef.current, {
      center: [-7.797068, 110.370529],
      zoom: 13,
      scrollWheelZoom: true,
      attributionControl: false, // Remove attribution control
    });

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
      // Satellite view
      tileLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
        }
      );
    } else {
      // Theme-based view (Light or Dark)
      const isDark = theme === 'dark';
      tileLayer = L.tileLayer(
        isDark
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
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

    // Add markers to cluster group
    locations.forEach((location) => {
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
        popupAnchor: [0, -18],
      });

      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon: customIcon,
      });

      // Create popup content
      const popupContent = `
        <div class="min-w-[250px]">
          <div class="inline-block px-2 py-1 rounded text-xs font-medium text-white mb-2" style="background-color: ${categoryMetadata[location.category].color}">
            ${locale === 'id' ? categoryMetadata[location.category].label_id : categoryMetadata[location.category].label_en}
          </div>

          <h3 class="font-bold text-lg mb-2">
            ${locale === 'id' ? location.name_id : location.name_en}
          </h3>

          <p class="text-sm text-gray-700 mb-3 line-clamp-3">
            ${locale === 'id' ? location.description_id : location.description_en}
          </p>

          <div class="flex items-start text-xs text-gray-600 mb-3">
            <svg class="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>${locale === 'id' ? location.address_id : location.address_en}</span>
          </div>

          ${
            location.entryFee
              ? `<div class="text-xs mb-2">
                <strong>${t('details.entryFee')}:</strong>
                ${location.entryFee.local ? `<div>${t('details.local')}: Rp ${location.entryFee.local.toLocaleString()}</div>` : ''}
                ${location.entryFee.foreign ? `<div>${t('details.foreign')}: Rp ${location.entryFee.foreign.toLocaleString()}</div>` : ''}
              </div>`
              : ''
          }

          ${location.openingHours ? `<div class="text-xs mb-2"><strong>${t('details.openingHours')}:</strong> ${location.openingHours}</div>` : ''}

          ${
            location.products && location.products.length > 0
              ? `<div class="text-xs mb-2"><strong>${t('details.products')}:</strong> ${location.products.join(', ')}</div>`
              : ''
          }

          ${location.priceRange ? `<div class="text-xs mb-2"><strong>${t('details.priceRange')}:</strong> ${location.priceRange}</div>` : ''}

          ${
            location.googleMapsUrl
              ? `<a href="${location.googleMapsUrl}" target="_blank" rel="noopener noreferrer"
                class="inline-block w-full text-center bg-primary text-white text-xs font-medium py-2 px-3 rounded hover:bg-primary/90 transition-colors mt-2">
                ${t('details.getDirections')}
              </a>`
              : ''
          }
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

      // Add marker to cluster group
      markerClusterGroup.addLayer(marker);
    });

    // Add cluster group to map
    map.addLayer(markerClusterGroup);
  }, [locations, locale, t]);

  return (
    <div className="relative">
      <div ref={mapContainerRef} style={{ height: '600px', width: '100%' }} />

      {/* Satellite View Toggle Button */}
      <button
        onClick={() => setIsSatelliteView(!isSatelliteView)}
        className={`absolute top-4 right-4 z-10 p-3 rounded-lg shadow-lg transition-all duration-200 ${
          isSatelliteView
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title={isSatelliteView ? 'Switch to Map View' : 'Switch to Satellite View'}
      >
        <Satellite className="w-5 h-5" />
      </button>
    </div>
  );
}
