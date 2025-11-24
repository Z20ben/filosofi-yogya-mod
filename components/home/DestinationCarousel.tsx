'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Destination {
  name: string;
  location: string;
  description: string;
  image: string;
  hours: string;
}

export function DestinationCarousel() {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const translations = {
    id: {
      title: 'Destinasi Sumbu Filosofi',
      subtitle: 'Jelajahi lokasi-lokasi bersejarah sepanjang sumbu imajiner Yogyakarta',
      visitHours: 'Jam Kunjung'
    },
    en: {
      title: 'Philosophical Axis Destinations',
      subtitle: 'Explore historical locations along Yogyakarta\'s imaginary axis',
      visitHours: 'Visit Hours'
    }
  };

  const t = translations[locale as 'id' | 'en'] || translations.id;

  const destinations: Record<string, Destination[]> = {
    id: [
      {
        name: 'Tugu Yogyakarta',
        location: 'Jl. Jenderal Sudirman, Yogyakarta',
        description: 'Monumen ikonik yang menjadi simbol persatuan dan titik awal sumbu filosofis.',
        image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
        hours: '24 Jam'
      },
      {
        name: 'Keraton Yogyakarta',
        location: 'Jl. Rotowijayan, Yogyakarta',
        description: 'Istana resmi Kesultanan Yogyakarta yang masih berfungsi hingga kini.',
        image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
        hours: '08:00 - 14:00'
      },
      {
        name: 'Panggung Krapyak',
        location: 'Krapyak, Bantul, Yogyakarta',
        description: 'Situs spiritual di ujung selatan sumbu filosofis Yogyakarta.',
        image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
        hours: '24 Jam'
      },
      {
        name: 'Makam Raja-Raja Imogiri',
        location: 'Imogiri, Bantul, Yogyakarta',
        description: 'Kompleks makam di perbukitan selatan sebagai tempat peristirahatan para Sultan.',
        image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
        hours: '08:00 - 16:00'
      },
      {
        name: 'Museum Sonobudoyo',
        location: 'Jl. Trikora No.6, Yogyakarta',
        description: 'Museum budaya Jawa dengan koleksi artefak sejarah yang komprehensif.',
        image: '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
        hours: '08:00 - 15:30'
      }
    ],
    en: [
      {
        name: 'Tugu Yogyakarta',
        location: 'Jl. Jenderal Sudirman, Yogyakarta',
        description: 'Iconic monument symbolizing unity and starting point of philosophical axis.',
        image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
        hours: '24 Hours'
      },
      {
        name: 'Yogyakarta Palace',
        location: 'Jl. Rotowijayan, Yogyakarta',
        description: 'Official palace of Yogyakarta Sultanate still functioning today.',
        image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
        hours: '08:00 - 14:00'
      },
      {
        name: 'Panggung Krapyak',
        location: 'Krapyak, Bantul, Yogyakarta',
        description: 'Spiritual site at southern end of Yogyakarta\'s philosophical axis.',
        image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
        hours: '24 Hours'
      },
      {
        name: 'Imogiri Royal Cemetery',
        location: 'Imogiri, Bantul, Yogyakarta',
        description: 'Royal cemetery complex in southern hills as resting place for Sultans.',
        image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
        hours: '08:00 - 16:00'
      },
      {
        name: 'Sonobudoyo Museum',
        location: 'Jl. Trikora No.6, Yogyakarta',
        description: 'Javanese cultural museum with comprehensive historical artifact collection.',
        image: '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
        hours: '08:00 - 15:30'
      }
    ]
  };

  const currentDestinations = destinations[locale] || destinations.id;
  const maxIndex = Math.max(0, currentDestinations.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section id="destinations" className="py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto mb-6 rounded-full" />
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={{
                x: `-${currentIndex * (100 / itemsPerView)}%`
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            >
              {currentDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * (itemsPerView === 1 ? 0 : 16) / itemsPerView}px)` }}
                >
                  <Card className="group overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow h-full">
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
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {destination.location}
                        </p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {destination.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>{destination.hours}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 w-8'
                      : 'bg-slate-300 dark:bg-slate-700 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="rounded-full disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
