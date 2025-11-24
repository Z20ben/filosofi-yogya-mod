'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgendaCarousel } from './AgendaCarousel';

export function SearchHero() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/${locale}/encyclopedia?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/${locale}/encyclopedia`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 px-4 py-12 md:py-20 pt-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full mb-4 md:mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
              <span className="text-xs md:text-sm">Sumbu Filosofi Yogyakarta</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base font-normal mb-3 md:mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-cyan-600 bg-clip-text text-transparent"
            >
              {t('title') || 'Jelajah Jogja Versimu'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-slate-600 dark:text-slate-300 mb-6 md:mb-8 text-base md:text-lg px-4"
            >
              {t('subtitle') || 'Temukan spot nongkrong, UMKM lokal, dan tren terbaru di kawasan Sumbu Filosofi Yogyakarta'}
            </motion.p>

            {/* Search Bar - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-3xl mx-auto mb-8 md:mb-12"
            >
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
                <div className="flex items-center flex-1">
                  <div className="pl-4 md:pl-6 pr-3 md:pr-4 py-4 sm:py-0">
                    <Search className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('placeholder') || 'Cari cafe, UMKM, atau destinasi...'}
                    className="flex-1 py-4 md:py-5 pr-4 bg-transparent outline-none text-base md:text-lg placeholder:text-slate-400"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="m-2 px-6 md:px-8 py-3 md:py-0 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm md:text-base"
                >
                  {t('search') || 'Cari'}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Agenda Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AgendaCarousel />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
