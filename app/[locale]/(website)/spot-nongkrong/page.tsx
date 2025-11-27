'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Music, Moon, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

// Helper function to generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface Spot {
  id: number;
  name: string;
  category: string;
  image: string;
  location: string;
  budget: string;
  hours: string;
  tags: string[];
  badges: string[];
  description: string;
}

export default function SpotNongkrongPage() {
  const t = useTranslations('spotNongkrong');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('filters.all'), icon: null },
    { id: 'cheap', label: t('filters.cheap'), icon: DollarSign },
    { id: 'instagramable', label: t('filters.instagramable'), icon: null },
    { id: 'night', label: t('filters.night'), icon: Moon },
    { id: 'music', label: t('filters.music'), icon: Music }
  ];

  // Spots data berdasarkan locale
  const spots: Spot[] = locale === 'id' ? [
    {
      id: 1,
      name: 'Kopi Klotok Heritage',
      category: 'Cafe',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      location: 'Pakem, Sleman',
      budget: 'Rp 15-50k',
      hours: '07:00 - 22:00',
      tags: ['instagramable', 'cheap'],
      badges: ['Instagramable', 'Budget Friendly'],
      description: 'Cafe di alam terbuka dengan view pegunungan yang epic! Perfect buat foto-foto aesthetic.'
    },
    {
      id: 2,
      name: 'The Westlake Resto & Cafe',
      category: 'Cafe & Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      location: 'Sleman',
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
      budget: 'Rp 10-30k',
      hours: '10:00 - 21:00',
      tags: ['cheap'],
      badges: ['Super Murah', 'Authentic'],
      description: 'Makan tradisional enak dengan harga mahasiswa banget. Recommended untuk makan bareng!'
    },
    {
      id: 5,
      name: 'Abhayagiri Restaurant',
      category: 'Resto & Lounge',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      location: 'Jl. Gejayan',
      budget: 'Rp 50-150k',
      hours: '11:00 - 23:00',
      tags: ['instagramable', 'night', 'music'],
      badges: ['Rooftop', 'Party Vibes'],
      description: 'Rooftop venue dengan city view keren! Cocok buat nongkrong rame-rame.'
    },
    {
      id: 6,
      name: 'Taman Lampion Kaliurang',
      category: 'Outdoor',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      location: 'Kaliurang, Sleman',
      budget: 'Rp 25k',
      hours: '17:00 - 22:00',
      tags: ['instagramable', 'night', 'cheap'],
      badges: ['Night Spot', 'TikTok Viral'],
      description: 'Taman dengan ribuan lampion warna-warni! Viral di TikTok dan super instagramable.'
    }
  ] : [
    {
      id: 1,
      name: 'Kopi Klotok Heritage',
      category: 'Cafe',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      location: 'Pakem, Sleman',
      budget: 'IDR 15-50k',
      hours: '07:00 - 22:00',
      tags: ['instagramable', 'cheap'],
      badges: ['Instagramable', 'Budget Friendly'],
      description: 'Open-air cafe with epic mountain views! Perfect for aesthetic photoshoots.'
    },
    {
      id: 2,
      name: 'The Westlake Resto & Cafe',
      category: 'Cafe & Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      location: 'Sleman',
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
      budget: 'IDR 10-30k',
      hours: '10:00 - 21:00',
      tags: ['cheap'],
      badges: ['Super Cheap', 'Authentic'],
      description: 'Delicious traditional food at student prices. Recommended for group dining!'
    },
    {
      id: 5,
      name: 'Abhayagiri Restaurant',
      category: 'Resto & Lounge',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      location: 'Jl. Gejayan',
      budget: 'IDR 50-150k',
      hours: '11:00 - 23:00',
      tags: ['instagramable', 'night', 'music'],
      badges: ['Rooftop', 'Party Vibes'],
      description: 'Rooftop venue with cool city views! Perfect for hanging out with friends.'
    },
    {
      id: 6,
      name: 'Taman Lampion Kaliurang',
      category: 'Outdoor',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      location: 'Kaliurang, Sleman',
      budget: 'IDR 25k',
      hours: '17:00 - 22:00',
      tags: ['instagramable', 'night', 'cheap'],
      badges: ['Night Spot', 'TikTok Viral'],
      description: 'Park with thousands of colorful lanterns! Viral on TikTok and super instagramable.'
    }
  ];

  const filteredSpots = activeFilter === 'all'
    ? spots
    : spots.filter((s: Spot) => s.tags.includes(activeFilter));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/80 via-orange-500/70 to-rose-500/80" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80')] bg-cover bg-center" />
          </div>
        </div>

        <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Filter Pills */}
      <section className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spot Cards Grid */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/30 dark:from-slate-950 dark:via-amber-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot: Spot, index: number) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/${locale}/spot-nongkrong/${generateSlug(spot.name)}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-800 cursor-pointer h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={spot.image}
                        alt={spot.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0">
                          {spot.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                        {spot.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span>{spot.location}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          <span>{spot.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span>{spot.hours}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {spot.badges.map((badge, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
