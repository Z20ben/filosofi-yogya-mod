'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { MessageCircle, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  questionId: string;
  questionEn: string;
  answerId: string;
  answerEn: string;
  categoryId: string;
  categoryEn: string;
}

export function FAQChat() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        // Don't close if clicking the floating button
        if (!target.closest('button[aria-label="Open FAQ"]')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close panel with ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const faqs: FAQItem[] = [
    {
      questionId: 'Apa itu Sumbu Filosofi Yogyakarta?',
      questionEn: 'What is the Yogyakarta Philosophical Axis?',
      answerId: 'Sumbu Filosofi adalah garis imajiner yang menghubungkan Tugu Yogyakarta, Keraton Yogyakarta, dan Panggung Krapyak. Garis ini melambangkan harmoni kosmologis dalam filosofi Jawa.',
      answerEn: 'The Philosophical Axis is an imaginary line connecting Tugu Yogyakarta, Yogyakarta Palace, and Panggung Krapyak. This line symbolizes cosmological harmony in Javanese philosophy.',
      categoryId: 'Umum',
      categoryEn: 'General',
    },
    {
      questionId: 'Bagaimana cara mengakses peta interaktif?',
      questionEn: 'How do I access the interactive map?',
      answerId: 'Klik menu "Kawasan Sumbu Filosofi" di navigasi atas. Anda akan menemukan peta Google My Maps interaktif yang menampilkan semua titik penting di sepanjang sumbu.',
      answerEn: 'Click the "Philosophical Axis Area" menu in the top navigation. You will find an interactive Google My Maps showing all important points along the axis.',
      categoryId: 'Navigasi',
      categoryEn: 'Navigation',
    },
    {
      questionId: 'Dimana saya bisa melihat galeri foto?',
      questionEn: 'Where can I view the photo gallery?',
      answerId: 'Klik menu "Galeri Foto" atau tombol "Lihat Galeri" di halaman utama. Galeri menampilkan koleksi foto dengan filter berdasarkan kategori.',
      answerEn: 'Click the "Photo Gallery" menu or "View Gallery" button on the homepage. The gallery displays photo collections with category-based filters.',
      categoryId: 'Navigasi',
      categoryEn: 'Navigation',
    },
    {
      questionId: 'Bagaimana cara menemukan UMKM lokal?',
      questionEn: 'How do I find local MSMEs?',
      answerId: 'Buka halaman "Katalog UMKM" dari menu navigasi. Anda dapat memfilter UMKM berdasarkan kategori (Kerajinan, Kuliner, Fashion, Seni) dan lokasi.',
      answerEn: 'Open the "MSME Catalog" page from the navigation menu. You can filter MSMEs by category (Handicrafts, Culinary, Fashion, Arts) and location.',
      categoryId: 'UMKM',
      categoryEn: 'MSME',
    },
    {
      questionId: 'Dimana informasi acara budaya?',
      questionEn: 'Where can I find cultural event information?',
      answerId: 'Kunjungi halaman "Agenda Seni & Budaya" untuk melihat kalender acara budaya yang akan datang di kawasan Sumbu Filosofi.',
      answerEn: 'Visit the "Arts & Culture Agenda" page to see the calendar of upcoming cultural events in the Philosophical Axis area.',
      categoryId: 'Acara',
      categoryEn: 'Events',
    },
    {
      questionId: 'Apa saja titik penting di Sumbu Filosofi?',
      questionEn: 'What are the key points of the Philosophical Axis?',
      answerId: 'Tiga titik utama: Tugu Yogyakarta (utara), Keraton Yogyakarta (pusat), dan Panggung Krapyak (selatan). Sumbu ini membentang dari utara ke selatan sebagai representasi filosofis perjalanan hidup.',
      answerEn: 'Three main points: Tugu Yogyakarta (north), Yogyakarta Palace (center), and Panggung Krapyak (south). This axis stretches from north to south as a philosophical representation of life\'s journey.',
      categoryId: 'Umum',
      categoryEn: 'General',
    },
    {
      questionId: 'Bagaimana cara menghubungi untuk kolaborasi acara?',
      questionEn: 'How do I contact for event collaboration?',
      answerId: 'Anda dapat menghubungi kami melalui email info@sumbufilosofi.id atau melalui tombol "Hubungi Kami" di halaman Agenda Seni & Budaya.',
      answerEn: 'You can contact us via email at info@sumbufilosofi.id or through the "Contact Us" button on the Arts & Culture Agenda page.',
      categoryId: 'Kontak',
      categoryEn: 'Contact',
    },
    {
      questionId: 'Apakah website ini tersedia dalam bahasa Inggris?',
      questionEn: 'Is this website available in English?',
      answerId: 'Ya! Klik tombol bendera di pojok kanan atas untuk beralih antara Bahasa Indonesia dan English.',
      answerEn: 'Yes! Click the flag button in the top right corner to switch between Bahasa Indonesia and English.',
      categoryId: 'Navigasi',
      categoryEn: 'Navigation',
    },
    {
      questionId: 'Apa makna filosofis Sumbu ini?',
      questionEn: 'What is the philosophical meaning of this Axis?',
      answerId: 'Bukan sekadar garis geografis, tetapi merupakan representasi mendalam dari perjalanan hidup manusia - dari kelahiran hingga kembali kepada Sang Pencipta, dengan setiap lokasi dan vegetasi memiliki makna filosofis yang mendalam.',
      answerEn: 'More than just a geographical line, it is a profound representation of the human life journey - from birth to returning to the Creator, with each location and vegetation having deep philosophical meaning.',
      categoryId: 'Umum',
      categoryEn: 'General',
    },
    {
      questionId: 'Bagaimana cara filter galeri foto?',
      questionEn: 'How do I filter the photo gallery?',
      answerId: 'Di halaman Galeri Foto, gunakan tombol filter di bagian atas untuk memilih kategori: Kawasan, Sejarah, Wisata, UMKM, atau Agenda. Klik "Semua" untuk melihat semua foto.',
      answerEn: 'On the Photo Gallery page, use the filter buttons at the top to select categories: Area, History, Tourism, MSME, or Events. Click "All" to view all photos.',
      categoryId: 'Navigasi',
      categoryEn: 'Navigation',
    },
    {
      questionId: 'Apakah UMKM yang terdaftar sudah terverifikasi?',
      questionEn: 'Are the registered MSMEs verified?',
      answerId: 'Ya, semua UMKM yang terdaftar di katalog sudah melalui proses kurasi oleh admin untuk memastikan kualitas dan keaslian.',
      answerEn: 'Yes, all MSMEs listed in the catalog have gone through a curation process by admins to ensure quality and authenticity.',
      categoryId: 'UMKM',
      categoryEn: 'MSME',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const question = locale === 'id' ? faq.questionId : faq.questionEn;
    const answer = locale === 'id' ? faq.answerId : faq.answerEn;
    return (
      question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Reset search and expanded when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setExpandedIndex(null);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-4 sm:right-5 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group"
        aria-label="Open FAQ"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[var(--javanese-gold)] rounded-full animate-pulse"></span>
          </>
        )}
      </button>

      {/* FAQ Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-20 sm:bottom-20 right-4 sm:right-5 w-[calc(100vw-2rem)] sm:w-80 h-[26rem] sm:h-[28rem] bg-card rounded-xl shadow-2xl z-40 flex flex-col overflow-hidden border-2 border-javanese-gold/20 faq-chat-panel"
          >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white p-3">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                <MessageCircle className="w-4 h-4" />
                {locale === 'id' ? 'FAQ - Bantuan Cepat' : 'FAQ - Quick Help'}
              </h3>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {filteredFaqs.length}
              </span>
            </div>
            <p className="text-white/80 text-xs mt-1">
              {locale === 'id'
                ? 'Temukan jawaban atas pertanyaan umum'
                : 'Find answers to common questions'}
            </p>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-javanese-brown/10">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-javanese-brown/40" />
              <input
                type="text"
                placeholder={locale === 'id' ? 'Cari pertanyaan...' : 'Search questions...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-javanese-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-javanese-gold text-sm"
              />
            </div>
          </div>

          {/* FAQ List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-6 text-javanese-brown/60">
                <p className="text-sm">
                  {locale === 'id'
                    ? 'Tidak ada hasil ditemukan'
                    : 'No results found'}
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-javanese-brown/10 rounded-md overflow-hidden hover:border-javanese-gold/50 transition-colors"
                >
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="w-full p-2.5 text-left flex items-start gap-2 hover:bg-javanese-gold/5 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-[var(--javanese-brown-text)] mb-1 leading-snug">
                        {locale === 'id' ? faq.questionId : faq.questionEn}
                      </p>
                      <span className="inline-block text-xs px-2 py-0.5 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 text-[#B8860B] rounded-full border border-[#D4AF37]/30 faq-category-badge">
                        {locale === 'id' ? faq.categoryId : faq.categoryEn}
                      </span>
                    </div>
                    {expandedIndex === index ? (
                      <ChevronUp className="w-4 h-4 text-[var(--javanese-brown-text)] flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--javanese-brown-text)] flex-shrink-0 mt-0.5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-2.5 pb-2.5 pt-0">
                          <div className="pl-0 border-l-2 border-javanese-gold/30 pl-2.5">
                            <p className="text-xs text-[var(--javanese-brown-text)] leading-relaxed">
                              {locale === 'id' ? faq.answerId : faq.answerEn}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-javanese-brown/10 bg-[var(--javanese-ivory)]">
            <p className="text-xs text-javanese-brown/60 text-center leading-tight">
              {locale === 'id'
                ? 'Butuh bantuan? info@sumbufilosofi.id'
                : 'Need help? info@sumbufilosofi.id'}
            </p>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
