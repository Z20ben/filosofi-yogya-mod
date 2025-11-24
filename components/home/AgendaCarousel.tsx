'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

  // Sample events data
  const events: Event[] = [
    {
      title: locale === 'id' ? 'Jogja Fashion Week 2026' : 'Jogja Fashion Week 2026',
      category: locale === 'id' ? 'Festival & Hiburan' : 'Festivals & Entertainment',
      date: locale === 'id' ? '22-24 Jan 2026' : 'Jan 22-24, 2026',
      time: locale === 'id' ? '10:00 - 22:00 WIB' : '10:00 AM - 10:00 PM',
      location: locale === 'id' ? 'Taman Budaya Yogyakarta' : 'Yogyakarta Cultural Park',
      price: locale === 'id' ? 'Gratis' : 'Free',
      age: locale === 'id' ? 'Semua Umur' : 'All Ages',
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20'
    },
    {
      title: locale === 'id' ? 'Workshop Batik Modern' : 'Modern Batik Workshop',
      category: locale === 'id' ? 'Komunitas & Workshop' : 'Community & Workshop',
      date: locale === 'id' ? '28 Jan 2026' : 'Jan 28, 2026',
      time: locale === 'id' ? '13:00 - 17:00 WIB' : '1:00 PM - 5:00 PM',
      location: 'Kotagede Heritage Center',
      price: 'Rp 150.000',
      age: locale === 'id' ? 'Semua Umur' : 'All Ages',
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20'
    },
    {
      title: locale === 'id' ? 'Pasar Seni Rakyat' : 'Folk Art Market',
      category: locale === 'id' ? 'Event UMKM' : 'MSME Events',
      date: locale === 'id' ? '1-2 Feb 2026' : 'Feb 1-2, 2026',
      time: locale === 'id' ? '08:00 - 20:00 WIB' : '8:00 AM - 8:00 PM',
      location: 'Alun-alun Kidul',
      price: locale === 'id' ? 'Gratis' : 'Free',
      age: locale === 'id' ? 'Semua Umur' : 'All Ages',
      gradient: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20'
    },
    {
      title: 'Sekaten & Grebeg Maulud',
      category: locale === 'id' ? 'Budaya & Upacara' : 'Culture & Ceremony',
      date: locale === 'id' ? '12 Feb 2026' : 'Feb 12, 2026',
      time: locale === 'id' ? '08:00 - 16:00 WIB' : '8:00 AM - 4:00 PM',
      location: locale === 'id' ? 'Keraton Yogyakarta' : 'Yogyakarta Palace',
      price: locale === 'id' ? 'Gratis' : 'Free',
      age: locale === 'id' ? 'Semua Umur' : 'All Ages',
      gradient: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/20'
    },
    {
      title: locale === 'id' ? 'Pameran Fotografi Jogja' : 'Jogja Photography Exhibition',
      category: locale === 'id' ? 'Pameran Kreatif' : 'Creative Exhibition',
      date: locale === 'id' ? '5-10 Feb 2026' : 'Feb 5-10, 2026',
      time: locale === 'id' ? '10:00 - 21:00 WIB' : '10:00 AM - 9:00 PM',
      location: 'Taman Pintar Yogyakarta',
      price: 'Rp 25.000',
      age: locale === 'id' ? 'Semua Umur' : 'All Ages',
      gradient: 'from-rose-500 to-red-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20'
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
                    <Button className={`bg-gradient-to-r ${events[currentIndex].gradient} hover:opacity-90 text-white shadow-lg group`}>
                      {locale === 'id' ? 'Lihat Detail' : 'View Details'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
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
