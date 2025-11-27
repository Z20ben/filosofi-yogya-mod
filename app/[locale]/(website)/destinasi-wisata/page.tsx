'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { getInternalCategoryId } from '@/config/categoryParams';

// Generate URL-friendly slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface Destination {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  location: string;
  hours: string;
}

export default function DestinasiWisataPage() {
  const t = useTranslations('destinasiWisata');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState('kawasan');

  const categories = [
    { id: 'kawasan', label: t('categories.kawasan') },
    { id: 'titik-sumbu', label: t('categories.titikSumbu') },
    { id: 'cagar-budaya', label: t('categories.cagarBudaya') },
    { id: 'museum', label: t('categories.museum') },
    { id: 'landmark', label: t('categories.landmark') }
  ];

  useEffect(() => {
    if (categoryParam) {
      const mappedCategory = getInternalCategoryId('destinasiWisata', categoryParam, locale as 'id' | 'en');
      if (categories.some(cat => cat.id === mappedCategory)) {
        setActiveCategory(mappedCategory);
      }
    } else {
      // Default to 'kawasan' when no category param
      setActiveCategory('kawasan');
    }
  }, [categoryParam, locale]);

  // Data destinations (locale-specific)
  const destinations = locale === 'id' ? [
    {
      id: 1,
      name: 'Tugu Yogyakarta',
      category: 'titik-sumbu',
      image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
      description: 'Monumen ikonik yang menjadi simbol persatuan dan titik awal sumbu filosofis.',
      location: 'Jl. Jenderal Sudirman, Yogyakarta',
      hours: '24 Jam'
    },
    {
      id: 2,
      name: 'Keraton Yogyakarta',
      category: 'cagar-budaya',
      image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
      description: 'Istana resmi Kesultanan Yogyakarta yang masih berfungsi hingga kini.',
      location: 'Jl. Rotowijayan, Yogyakarta',
      hours: '08:00 - 14:00'
    },
    {
      id: 3,
      name: 'Panggung Krapyak',
      category: 'titik-sumbu',
      image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
      description: 'Situs spiritual di ujung selatan sumbu filosofis Yogyakarta.',
      location: 'Krapyak, Bantul, Yogyakarta',
      hours: '24 Jam'
    },
    {
      id: 4,
      name: 'Makam Raja-Raja Imogiri',
      category: 'cagar-budaya',
      image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
      description: 'Kompleks Makam Raja-Raja Imogiri di perbukitan selatan adalah tempat peristirahatan para Sultan dan keluarga kerajaan.',
      location: 'Imogiri, Bantul, Yogyakarta',
      hours: '08:00 - 16:00'
    },
    {
      id: 5,
      name: 'Museum Sonobudoyo',
      category: 'museum',
      image: '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
      description: 'Museum budaya Jawa dengan koleksi artefak bersejarah yang lengkap.',
      location: 'Jl. Trikora No.6, Yogyakarta',
      hours: '08:00 - 15:30'
    }
  ] : [
    {
      id: 1,
      name: 'Tugu Yogyakarta',
      category: 'titik-sumbu',
      image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
      description: 'Iconic monument symbolizing unity and starting point of philosophical axis.',
      location: 'Jl. Jend. Sudirman, Yogyakarta',
      hours: '24 Hours'
    },
    {
      id: 2,
      name: 'Yogyakarta Palace',
      category: 'cagar-budaya',
      image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
      description: 'Official palace of Yogyakarta Sultanate still functioning today.',
      location: 'Jl. Rotowijayan, Yogyakarta',
      hours: '08:00 - 14:00'
    },
    {
      id: 3,
      name: 'Panggung Krapyak',
      category: 'titik-sumbu',
      image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
      description: 'Spiritual site at southern end of Yogyakarta\'s philosophical axis.',
      location: 'Krapyak, Bantul, Yogyakarta',
      hours: '24 Hours'
    },
    {
      id: 4,
      name: 'Imogiri Royal Cemetery',
      category: 'cagar-budaya',
      image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
      description: 'Royal cemetery complex in southern hills as resting place for Sultans and royal families.',
      location: 'Imogiri, Bantul, Yogyakarta',
      hours: '08:00 - 16:00'
    },
    {
      id: 5,
      name: 'Sonobudoyo Museum',
      category: 'museum',
      image: '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
      description: 'Javanese cultural museum with comprehensive historical artifact collection.',
      location: 'Jl. Trikora No.6, Yogyakarta',
      hours: '08:00 - 15:30'
    }
  ];

  const filteredDestinations = activeCategory === 'kawasan'
    ? destinations
    : destinations.filter((d: Destination) => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/b059b0407249c80c00c9dbb43425f433d547254d.png"
            alt="Destinasi Wisata Yogyakarta"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Category Tabs */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative py-4 overflow-hidden">
            {/* Scrollable container */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pl-4 pr-8 mx-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium snap-start flex-shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/80 via-white/60 dark:from-slate-950/80 dark:via-slate-950/60 to-transparent pointer-events-none" />

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/80 via-white/60 dark:from-slate-950/80 dark:via-slate-950/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Destination Cards Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination: Destination, index: number) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/${locale}/destinasi-wisata/${generateSlug(destination.name)}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer border-0 shadow-lg">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white text-lg font-semibold">{destination.name}</h3>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-50 backdrop-blur-sm">
                        {categories.find(c => c.id === destination.category)?.label}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {destination.location}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {destination.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>{destination.hours}</span>
                      </div>
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
