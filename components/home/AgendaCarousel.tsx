'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Generate URL-friendly slug from event title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface Event {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: string;
  age: string;
  gradient: string;
  bgColor: string;
}

export function AgendaCarousel() {
  const locale = useLocale();
  const t = useTranslations('agenda');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Category mapping to get labels
  const getCategoryLabel = (categoryId: string): string => {
    const categoryMap: Record<string, { id: string; en: string }> = {
      'budaya': { id: 'Budaya & Upacara', en: 'Culture & Ceremony' },
      'festival': { id: 'Festival & Hiburan', en: 'Festivals & Entertainment' },
      'komunitas': { id: 'Komunitas & Workshop', en: 'Community & Workshop' },
      'pameran': { id: 'Pameran Kreatif', en: 'Creative Exhibition' },
      'umkm': { id: 'Event UMKM', en: 'MSME Events' }
    };
    return categoryMap[categoryId]?.[locale as 'id' | 'en'] || categoryId;
  };

  // Gradient mapping by category
  const getCategoryGradient = (categoryId: string): { gradient: string; bgColor: string } => {
    const gradientMap: Record<string, { gradient: string; bgColor: string }> = {
      'budaya': { gradient: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-50 dark:bg-cyan-950/20' },
      'festival': { gradient: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50 dark:bg-indigo-950/20' },
      'komunitas': { gradient: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50 dark:bg-amber-950/20' },
      'pameran': { gradient: 'from-rose-500 to-red-500', bgColor: 'bg-rose-50 dark:bg-rose-950/20' },
      'umkm': { gradient: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50 dark:bg-emerald-950/20' }
    };
    return gradientMap[categoryId] || { gradient: 'from-slate-500 to-gray-500', bgColor: 'bg-slate-50 dark:bg-slate-950/20' };
  };

  // Events data - synced with agenda-event page (upcoming only)
  const events: Event[] = locale === 'id' ? [
    {
      title: 'Sekaten Festival 2024',
      category: getCategoryLabel('budaya'),
      date: '25 November 2024',
      time: '18:00 - 23:00',
      location: 'Alun-Alun Utara Keraton, Yogyakarta',
      price: 'Gratis',
      age: 'Semua Umur',
      gradient: getCategoryGradient('budaya').gradient,
      bgColor: getCategoryGradient('budaya').bgColor
    },
    {
      title: 'Jogja International Music Festival',
      category: getCategoryLabel('festival'),
      date: '15 Desember 2024',
      time: '14:00 - 23:00',
      location: 'Stadion Mandala Krida, Yogyakarta',
      price: 'Rp 250.000 - 1.500.000',
      age: '18+',
      gradient: getCategoryGradient('festival').gradient,
      bgColor: getCategoryGradient('festival').bgColor
    },
    {
      title: 'Workshop Batik untuk Pemula',
      category: getCategoryLabel('komunitas'),
      date: '28 November 2024',
      time: '09:00 - 15:00',
      location: 'Rumah Batik Tirtodipuran, Yogyakarta',
      price: 'Rp 150.000',
      age: '15+',
      gradient: getCategoryGradient('komunitas').gradient,
      bgColor: getCategoryGradient('komunitas').bgColor
    },
    {
      title: 'Jogja Art Fair 2024',
      category: getCategoryLabel('pameran'),
      date: '5-10 Desember 2024',
      time: '10:00 - 20:00',
      location: 'Taman Budaya Yogyakarta',
      price: 'Rp 25.000',
      age: 'Semua Umur',
      gradient: getCategoryGradient('pameran').gradient,
      bgColor: getCategoryGradient('pameran').bgColor
    },
    {
      title: 'Pasar UMKM Kotagede',
      category: getCategoryLabel('umkm'),
      date: '1-3 Desember 2024',
      time: '10:00 - 21:00',
      location: 'Alun-Alun Kotagede, Bantul',
      price: 'Gratis',
      age: 'Semua Umur',
      gradient: getCategoryGradient('umkm').gradient,
      bgColor: getCategoryGradient('umkm').bgColor
    }
  ] : [
    {
      title: 'Sekaten Festival 2024',
      category: getCategoryLabel('budaya'),
      date: 'November 25, 2024',
      time: '18:00 - 23:00',
      location: 'North Square Keraton, Yogyakarta',
      price: 'Free',
      age: 'All Ages',
      gradient: getCategoryGradient('budaya').gradient,
      bgColor: getCategoryGradient('budaya').bgColor
    },
    {
      title: 'Jogja International Music Festival',
      category: getCategoryLabel('festival'),
      date: 'December 15, 2024',
      time: '14:00 - 23:00',
      location: 'Mandala Krida Stadium, Yogyakarta',
      price: 'IDR 250,000 - 1,500,000',
      age: '18+',
      gradient: getCategoryGradient('festival').gradient,
      bgColor: getCategoryGradient('festival').bgColor
    },
    {
      title: 'Batik Workshop for Beginners',
      category: getCategoryLabel('komunitas'),
      date: 'November 28, 2024',
      time: '09:00 - 15:00',
      location: 'Batik House Tirtodipuran, Yogyakarta',
      price: 'IDR 150,000',
      age: '15+',
      gradient: getCategoryGradient('komunitas').gradient,
      bgColor: getCategoryGradient('komunitas').bgColor
    },
    {
      title: 'Jogja Art Fair 2024',
      category: getCategoryLabel('pameran'),
      date: 'December 5-10, 2024',
      time: '10:00 - 20:00',
      location: 'Taman Budaya Yogyakarta',
      price: 'IDR 25,000',
      age: 'All Ages',
      gradient: getCategoryGradient('pameran').gradient,
      bgColor: getCategoryGradient('pameran').bgColor
    },
    {
      title: 'Kotagede MSME Market',
      category: getCategoryLabel('umkm'),
      date: 'December 1-3, 2024',
      time: '10:00 - 21:00',
      location: 'Kotagede Square, Bantul',
      price: 'Free',
      age: 'All Ages',
      gradient: getCategoryGradient('umkm').gradient,
      bgColor: getCategoryGradient('umkm').bgColor
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [events.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base font-normal mb-2 bg-gradient-to-r from-amber-600 via-orange-600 to-cyan-600 bg-clip-text text-transparent"
        >
          {locale === 'id' ? 'Event Seru di Jogja' : 'Exciting Events in Jogja'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400"
        >
          {locale === 'id' ? 'Jangan lewatkan agenda menarik dibawah' : "Don't miss the exciting agenda below"}
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div className="relative h-[420px] md:h-[380px] max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="absolute inset-0"
            >
              <Card className={`h-full ${events[currentIndex].bgColor} border-0 overflow-hidden`}>
                <div className="relative h-full p-6 md:p-8 flex flex-col">
                  {/* Gradient Background Accent */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${events[currentIndex].gradient} opacity-10 rounded-full blur-3xl`} />

                  {/* Category Badge */}
                  <div className="relative z-10 mb-4">
                    <Badge className={`bg-gradient-to-r ${events[currentIndex].gradient} text-white border-0 shadow-lg`}>
                      {events[currentIndex].category}
                    </Badge>
                  </div>

                  {/* Event Title */}
                  <h3 className="relative z-10 mb-4 text-slate-900 dark:text-slate-50 text-base font-normal">
                    {events[currentIndex].title}
                  </h3>

                  {/* Event Details Grid */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-br ${events[currentIndex].gradient} rounded-lg shadow-md`}>
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{locale === 'id' ? 'Tanggal' : 'Date'}</p>
                        <p className="text-sm text-slate-900 dark:text-slate-50">{events[currentIndex].date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-br ${events[currentIndex].gradient} rounded-lg shadow-md`}>
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{locale === 'id' ? 'Waktu' : 'Time'}</p>
                        <p className="text-sm text-slate-900 dark:text-slate-50">{events[currentIndex].time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-br ${events[currentIndex].gradient} rounded-lg shadow-md`}>
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{locale === 'id' ? 'Lokasi' : 'Location'}</p>
                        <p className="text-sm text-slate-900 dark:text-slate-50">{events[currentIndex].location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-br ${events[currentIndex].gradient} rounded-lg shadow-md`}>
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{locale === 'id' ? 'Umur' : 'Age'}</p>
                        <p className="text-sm text-slate-900 dark:text-slate-50">{events[currentIndex].age}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="relative z-10 mt-auto flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{locale === 'id' ? 'Harga Tiket' : 'Price'}</p>
                      <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{events[currentIndex].price}</p>
                    </div>
                    <Link href={`/${locale}/agenda-event/${generateSlug(events[currentIndex].title)}`}>
                      <Button className={`bg-gradient-to-r ${events[currentIndex].gradient} hover:opacity-90 text-white shadow-lg group`}>
                        {locale === 'id' ? 'Lihat Detail' : 'View Details'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-amber-500 to-orange-600'
                  : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Hidden on Mobile */}
        <div className="hidden md:block">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-[50%] -translate-y-1/2 translate-x-2 z-50 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Previous slide"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-[50%] -translate-y-1/2 -translate-x-2 z-50 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
