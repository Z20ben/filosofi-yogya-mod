'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Heart, Instagram, Music, Moon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Spot {
  id: number;
  name: string;
  category: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  budget: string;
  hours: string;
  tags: string[];
  badges: string[];
  description: string;
}

export function SpotNongkrongPreview() {
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedSpots, setLikedSpots] = useState<Set<number>>(new Set());

  const translations = {
    id: {
      title: 'Spot Nongkrong Hits',
      subtitle: 'Tempat-tempat keren yang lagi viral di kalangan anak muda Jogja',
      filters: [
        { id: 'all', label: 'Semua', icon: null },
        { id: 'cheap', label: 'Murah Meriah', icon: DollarSign },
        { id: 'instagramable', label: 'Instagramable', icon: Instagram },
        { id: 'night', label: 'Buka Malam', icon: Moon },
        { id: 'music', label: 'Live Music', icon: Music }
      ]
    },
    en: {
      title: 'Trending Hangout Spots',
      subtitle: 'Cool places that are going viral among Jogja youngsters',
      filters: [
        { id: 'all', label: 'All', icon: null },
        { id: 'cheap', label: 'Budget Friendly', icon: DollarSign },
        { id: 'instagramable', label: 'Instagramable', icon: Instagram },
        { id: 'night', label: 'Night Vibes', icon: Moon },
        { id: 'music', label: 'Live Music', icon: Music }
      ]
    }
  };

  const t = translations[locale as 'id' | 'en'] || translations.id;

  const spots: Record<string, Spot[]> = {
    id: [
      {
        id: 1,
        name: 'Kopi Klotok Heritage',
        category: 'Cafe',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
        location: 'Pakem, Sleman',
        rating: 4.8,
        reviews: 1250,
        budget: 'Rp 15-50k',
        hours: '07:00 - 22:00',
        tags: ['instagramable', 'cheap'],
        badges: ['Instagramable', 'Budget Friendly'],
        description: 'Cafe di alam terbuka dengan view pegunungan yang epic!'
      },
      {
        id: 2,
        name: 'The Westlake Resto & Cafe',
        category: 'Cafe & Restaurant',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
        location: 'Sleman',
        rating: 4.7,
        reviews: 980,
        budget: 'Rp 30-80k',
        hours: '10:00 - 22:00',
        tags: ['instagramable', 'night'],
        badges: ['Sunset View', 'Date Spot'],
        description: 'Cafe tepi danau dengan sunset view yang bikin feed IG kamu makin kece!'
      },
      {
        id: 3,
        name: 'Roaster & Bear',
        category: 'Coffee Shop',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
        location: 'Jl. Prawirotaman',
        rating: 4.9,
        reviews: 2100,
        budget: 'Rp 20-60k',
        hours: '08:00 - 23:00',
        tags: ['instagramable', 'night', 'music'],
        badges: ['Live Music', 'Cozy Vibes'],
        description: 'Hidden gem dengan vibe industrial aesthetic. Sering ada live music weekend!'
      },
      {
        id: 4,
        name: 'Warung Bu Ageng',
        category: 'Traditional Food',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
        location: 'Tugu Station Area',
        rating: 4.6,
        reviews: 850,
        budget: 'Rp 10-30k',
        hours: '10:00 - 21:00',
        tags: ['cheap'],
        badges: ['Super Murah', 'Authentic'],
        description: 'Makan tradisional enak dengan harga mahasiswa banget.'
      },
      {
        id: 5,
        name: 'Abhayagiri Restaurant',
        category: 'Resto & Lounge',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        location: 'Jl. Gejayan',
        rating: 4.8,
        reviews: 1450,
        budget: 'Rp 50-150k',
        hours: '11:00 - 23:00',
        tags: ['instagramable', 'night', 'music'],
        badges: ['Rooftop', 'Party Vibes'],
        description: 'Rooftop venue dengan city view keren!'
      },
      {
        id: 6,
        name: 'Taman Lampion Kaliurang',
        category: 'Outdoor',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
        location: 'Kaliurang, Sleman',
        rating: 4.5,
        reviews: 3200,
        budget: 'Rp 25k',
        hours: '17:00 - 22:00',
        tags: ['instagramable', 'night', 'cheap'],
        badges: ['Night Spot', 'TikTok Viral'],
        description: 'Taman dengan ribuan lampion warna-warni! Viral di TikTok.'
      }
    ],
    en: [
      {
        id: 1,
        name: 'Kopi Klotok Heritage',
        category: 'Cafe',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
        location: 'Pakem, Sleman',
        rating: 4.8,
        reviews: 1250,
        budget: 'IDR 15-50k',
        hours: '07:00 - 22:00',
        tags: ['instagramable', 'cheap'],
        badges: ['Instagramable', 'Budget Friendly'],
        description: 'Open-air cafe with epic mountain views!'
      },
      {
        id: 2,
        name: 'The Westlake Resto & Cafe',
        category: 'Cafe & Restaurant',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
        location: 'Sleman',
        rating: 4.7,
        reviews: 980,
        budget: 'IDR 30-80k',
        hours: '10:00 - 22:00',
        tags: ['instagramable', 'night'],
        badges: ['Sunset View', 'Date Spot'],
        description: 'Lakeside cafe with sunset views that will level up your IG feed!'
      },
      {
        id: 3,
        name: 'Roaster & Bear',
        category: 'Coffee Shop',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
        location: 'Jl. Prawirotaman',
        rating: 4.9,
        reviews: 2100,
        budget: 'IDR 20-60k',
        hours: '08:00 - 23:00',
        tags: ['instagramable', 'night', 'music'],
        badges: ['Live Music', 'Cozy Vibes'],
        description: 'Hidden gem with industrial aesthetic vibes. Live music on weekends!'
      },
      {
        id: 4,
        name: 'Warung Bu Ageng',
        category: 'Traditional Food',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
        location: 'Tugu Station Area',
        rating: 4.6,
        reviews: 850,
        budget: 'IDR 10-30k',
        hours: '10:00 - 21:00',
        tags: ['cheap'],
        badges: ['Super Cheap', 'Authentic'],
        description: 'Delicious traditional food at student prices.'
      },
      {
        id: 5,
        name: 'Abhayagiri Restaurant',
        category: 'Resto & Lounge',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        location: 'Jl. Gejayan',
        rating: 4.8,
        reviews: 1450,
        budget: 'IDR 50-150k',
        hours: '11:00 - 23:00',
        tags: ['instagramable', 'night', 'music'],
        badges: ['Rooftop', 'Party Vibes'],
        description: 'Rooftop venue with cool city views!'
      },
      {
        id: 6,
        name: 'Taman Lampion Kaliurang',
        category: 'Outdoor',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
        location: 'Kaliurang, Sleman',
        rating: 4.5,
        reviews: 3200,
        budget: 'IDR 25k',
        hours: '17:00 - 22:00',
        tags: ['instagramable', 'night', 'cheap'],
        badges: ['Night Spot', 'TikTok Viral'],
        description: 'Park with thousands of colorful lanterns! Viral on TikTok.'
      }
    ]
  };

  const currentSpots = spots[locale] || spots.id;
  const filteredSpots = activeFilter === 'all'
    ? currentSpots
    : currentSpots.filter(spot => spot.tags.includes(activeFilter));

  const toggleLike = (id: number) => {
    setLikedSpots(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="spots" className="py-20 md:py-32 bg-gradient-to-br from-cyan-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-amber-600 mx-auto mb-6 rounded-full" />
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            {t.subtitle}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {t.filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-md'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="text-sm font-medium">{filter.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-amber-400/50 text-xs">{spot.name}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(spot.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-5 h-5 ${likedSpots.has(spot.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {spot.badges.slice(0, 2).map((badge, i) => (
                      <Badge key={i} className="bg-white/90 text-slate-900 hover:bg-white text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-full">
                      {spot.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{spot.name}</h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {spot.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>{spot.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>{spot.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>{spot.budget}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
