'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Coffee, ShoppingBag, Landmark, Calendar, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Location {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description: string;
}

interface Category {
  id: string;
  label: string;
  icon: any;
  color: string;
}

export function InteractiveMap() {
  const locale = useLocale();
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const translations = {
    id: {
      title: 'Peta Interaktif Sumbu Filosofi',
      subtitle: 'Jelajahi semua lokasi menarik dengan peta interaktif',
      filters: 'Filter Lokasi',
      showAll: 'Tampilkan Semua',
      categories: [
        { id: 'all', label: 'Semua Lokasi', icon: MapPin, color: 'text-slate-600' },
        { id: 'hangout', label: 'Spot Nongkrong', icon: Coffee, color: 'text-amber-600' },
        { id: 'umkm', label: 'UMKM', icon: ShoppingBag, color: 'text-emerald-600' },
        { id: 'culture', label: 'Budaya', icon: Landmark, color: 'text-orange-600' },
        { id: 'event', label: 'Event', icon: Calendar, color: 'text-cyan-600' }
      ],
      viewDetails: 'Lihat Detail',
      getDirections: 'Rute ke Sini',
      nearbyPlaces: 'Tempat Terdekat',
      comingSoon: 'Peta interaktif akan segera hadir!',
      mapDescription: 'Kami sedang mengintegrasikan Leaflet untuk memberikan pengalaman eksplorasi terbaik. Stay tuned!',
      locationsFound: 'lokasi ditemukan'
    },
    en: {
      title: 'Interactive Philosophical Axis Map',
      subtitle: 'Explore all interesting locations with interactive map',
      filters: 'Location Filters',
      showAll: 'Show All',
      categories: [
        { id: 'all', label: 'All Locations', icon: MapPin, color: 'text-slate-600' },
        { id: 'hangout', label: 'Hangout Spots', icon: Coffee, color: 'text-amber-600' },
        { id: 'umkm', label: 'SMEs', icon: ShoppingBag, color: 'text-emerald-600' },
        { id: 'culture', label: 'Culture', icon: Landmark, color: 'text-orange-600' },
        { id: 'event', label: 'Events', icon: Calendar, color: 'text-cyan-600' }
      ],
      viewDetails: 'View Details',
      getDirections: 'Get Directions',
      nearbyPlaces: 'Nearby Places',
      comingSoon: 'Interactive map coming soon!',
      mapDescription: 'We are integrating Leaflet to provide the best exploration experience. Stay tuned!',
      locationsFound: 'locations found'
    }
  };

  const t = translations[locale as 'id' | 'en'] || translations.id;

  const locations: Record<string, Location[]> = {
    id: [
      { id: 1, name: 'Tugu Yogyakarta', category: 'culture', lat: -7.783, lng: 110.367, description: 'Monumen ikonik di ujung utara sumbu filosofis' },
      { id: 2, name: 'Kopi Klotok', category: 'hangout', lat: -7.640, lng: 110.420, description: 'Cafe hits dengan view pegunungan' },
      { id: 3, name: 'Batik Winotosastro', category: 'umkm', lat: -7.810, lng: 110.365, description: 'Galeri batik berkualitas tinggi' },
      { id: 4, name: 'Keraton Yogyakarta', category: 'culture', lat: -7.805, lng: 110.364, description: 'Istana Sultan di pusat sumbu' },
      { id: 5, name: 'Roaster & Bear', category: 'hangout', lat: -7.814, lng: 110.384, description: 'Coffee shop dengan live music' },
      { id: 6, name: 'Festival Malioboro', category: 'event', lat: -7.793, lng: 110.365, description: 'Event bulanan di kawasan Malioboro' }
    ],
    en: [
      { id: 1, name: 'Tugu Yogyakarta', category: 'culture', lat: -7.783, lng: 110.367, description: 'Iconic monument at northern axis end' },
      { id: 2, name: 'Kopi Klotok', category: 'hangout', lat: -7.640, lng: 110.420, description: 'Trending cafe with mountain view' },
      { id: 3, name: 'Batik Winotosastro', category: 'umkm', lat: -7.810, lng: 110.365, description: 'High-quality batik gallery' },
      { id: 4, name: 'Yogyakarta Palace', category: 'culture', lat: -7.805, lng: 110.364, description: 'Sultan\'s palace at axis center' },
      { id: 5, name: 'Roaster & Bear', category: 'hangout', lat: -7.814, lng: 110.384, description: 'Coffee shop with live music' },
      { id: 6, name: 'Malioboro Festival', category: 'event', lat: -7.793, lng: 110.365, description: 'Monthly event at Malioboro area' }
    ]
  };

  const currentLocations = locations[locale] || locations.id;

  const toggleFilter = (filterId: string) => {
    if (filterId === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters.filter(f => f !== 'all');
      if (newFilters.includes(filterId)) {
        const updated = newFilters.filter(f => f !== filterId);
        setActiveFilters(updated.length === 0 ? ['all'] : updated);
      } else {
        setActiveFilters([...newFilters, filterId]);
      }
    }
  };

  const filteredLocations = activeFilters.includes('all')
    ? currentLocations
    : currentLocations.filter(loc => activeFilters.includes(loc.category));

  const getCategoryInfo = (category: string): Category => {
    const cat = t.categories.find(c => c.id === category);
    return cat || t.categories[0];
  };

  return (
    <section id="map" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full" />
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-lg font-semibold">{t.filters}</h3>
                </div>

                <div className="space-y-3">
                  {t.categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeFilters.includes(category.id);

                    return (
                      <button
                        key={category.id}
                        onClick={() => toggleFilter(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : category.color}`} />
                        <span className="text-sm flex-1 text-left font-medium">{category.label}</span>
                        {isActive && category.id !== 'all' && (
                          <X className="w-4 h-4" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong className="text-cyan-600 dark:text-cyan-400">{filteredLocations.length}</strong> {t.locationsFound}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl overflow-hidden">
              {/* Map Placeholder */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-200 via-cyan-100 to-blue-200 dark:from-slate-800 dark:via-cyan-900/30 dark:to-blue-900/30 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Coming Soon Overlay */}
                <div className="relative z-10 text-center px-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-xl mb-4"
                  >
                    <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-lg font-medium">{t.comingSoon}</span>
                  </motion.div>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    {t.mapDescription}
                  </p>
                </div>

                {/* Map Pins Preview */}
                <div className="absolute inset-0 pointer-events-none">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.6 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${25 + (i % 2) * 30}%`
                      }}
                    >
                      <div className="relative">
                        <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
                        <div className="absolute inset-0 animate-ping">
                          <MapPin className="w-8 h-8 text-red-400" fill="currentColor" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Location List */}
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t.nearbyPlaces}</h3>
                <div className="grid gap-3 max-h-96 overflow-y-auto">
                  {filteredLocations.map((location) => {
                    const categoryInfo = getCategoryInfo(location.category);
                    const Icon = categoryInfo.icon;

                    return (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold mb-1 truncate">{location.name}</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                            {location.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs hidden sm:block border-cyan-300 text-cyan-700 dark:border-cyan-700 dark:text-cyan-400">
                          {categoryInfo.label}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
