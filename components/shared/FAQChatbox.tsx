'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQChatbox() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    id: {
      title: 'Pertanyaan Umum',
      subtitle: 'Ada yang bisa kami bantu?',
      searchPlaceholder: 'Cari pertanyaan...',
      noResults: 'Tidak ada hasil yang ditemukan',
      needHelp: 'Butuh bantuan lebih? Hubungi kami di info@filosofijogja.com',
      faqs: [
        {
          question: 'Apa itu Sumbu Filosofi Yogyakarta?',
          answer: 'Sumbu Filosofi Yogyakarta adalah konsep tata ruang kota yang menghubungkan Tugu di utara, Keraton di tengah, dan Panggung Krapyak di selatan. Tata ruang ini merepresentasikan kosmologi Jawa dan telah diakui sebagai Warisan Budaya Dunia UNESCO.'
        },
        {
          question: 'Bagaimana cara mengakses Keraton Yogyakarta?',
          answer: 'Keraton Yogyakarta buka setiap hari Senin-Kamis pukul 08:00-14:00 dan Jumat-Minggu pukul 08:00-13:00. Tiket masuk untuk wisatawan domestik Rp 7.000 dan wisatawan mancanegara Rp 15.000. Anda bisa mengakses melalui gerbang utama di Jl. Rotowijayan.'
        },
        {
          question: 'Apa saja spot nongkrong yang direkomendasikan?',
          answer: 'Beberapa spot nongkrong populer di kawasan Sumbu Filosofi antara lain: Malioboro area, Prawirotaman, Kotabaru, dan kawasan sekitar Tugu. Tempat-tempat ini menawarkan cafe, restoran, dan ruang kreatif yang cocok untuk anak muda.'
        },
        {
          question: 'Bagaimana cara memesan tur heritage?',
          answer: 'Anda bisa memesan tur heritage melalui tombol "Reservasi Sekarang" yang tersedia di website ini. Tur mencakup kunjungan ke berbagai situs sumbu filosofi dengan pemandu berpengalaman yang akan menjelaskan makna historis dan filosofis setiap lokasi.'
        },
        {
          question: 'UMKM lokal apa saja yang bisa dikunjungi?',
          answer: 'Di kawasan Sumbu Filosofi terdapat berbagai UMKM lokal seperti kerajinan batik di Kotagede, kerajinan perak, kuliner tradisional, dan produk kreatif lainnya. Anda bisa menemukan rekomendasi UMKM di halaman khusus website ini.'
        },
        {
          question: 'Apa perbedaan Sumbu Utama dan Sumbu Penyangga?',
          answer: 'Sumbu Utama adalah garis Utara-Selatan (Tugu-Keraton-Panggung Krapyak), sementara Sumbu Penyangga adalah garis Timur-Barat-Selatan (Kotagede-Keraton-Imogiri). Keduanya membentuk sistem kosmologi yang sempurna dalam tata ruang Yogyakarta.'
        },
        {
          question: 'Apakah website ini tersedia dalam bahasa Inggris?',
          answer: 'Ya, website ini mendukung dua bahasa: Indonesia dan Inggris. Anda bisa mengubah bahasa melalui tombol toggle di bagian header website.'
        },
        {
          question: 'Bagaimana cara menuju Tugu Yogyakarta?',
          answer: 'Tugu Yogyakarta terletak di perempatan Jl. Jenderal Sudirman dan Jl. Mangkubumi. Anda bisa menggunakan TransJogja, ojek online, atau berjalan kaki dari Stasiun Tugu. Landmark ini mudah diakses dan menjadi titik referensi utama di Yogyakarta.'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'How can we help you?',
      searchPlaceholder: 'Search questions...',
      noResults: 'No results found',
      needHelp: 'Need more help? Contact us at info@filosofijogja.com',
      faqs: [
        {
          question: 'What is Yogyakarta Philosophical Axis?',
          answer: 'Yogyakarta Philosophical Axis is an urban spatial concept connecting Tugu in the north, Keraton in the center, and Panggung Krapyak in the south. This spatial layout represents Javanese cosmology and has been recognized as a UNESCO World Heritage Site.'
        },
        {
          question: 'How to access Yogyakarta Palace?',
          answer: 'Yogyakarta Palace is open Monday-Thursday 08:00-14:00 and Friday-Sunday 08:00-13:00. Entrance fee for domestic tourists is Rp 7,000 and international tourists Rp 15,000. You can access through the main gate at Jl. Rotowijayan.'
        },
        {
          question: 'What hangout spots are recommended?',
          answer: 'Popular hangout spots in the Philosophical Axis area include: Malioboro area, Prawirotaman, Kotabaru, and areas around Tugu. These places offer cafes, restaurants, and creative spaces suitable for young people.'
        },
        {
          question: 'How to book a heritage tour?',
          answer: 'You can book a heritage tour through the "Book Now" button available on this website. Tours include visits to various philosophical axis sites with experienced guides who will explain the historical and philosophical significance of each location.'
        },
        {
          question: 'What local SMEs can be visited?',
          answer: 'In the Philosophical Axis area, there are various local SMEs such as batik crafts in Kotagede, silver crafts, traditional culinary, and other creative products. You can find SME recommendations on the dedicated page of this website.'
        },
        {
          question: 'What is the difference between Main Axis and Supporting Axis?',
          answer: 'The Main Axis is the North-South line (Tugu-Keraton-Panggung Krapyak), while the Supporting Axis is the East-West-South line (Kotagede-Keraton-Imogiri). Together they form a perfect cosmological system in Yogyakarta\'s spatial layout.'
        },
        {
          question: 'Is this website available in English?',
          answer: 'Yes, this website supports two languages: Indonesian and English. You can change the language through the toggle button in the website header.'
        },
        {
          question: 'How to get to Tugu Yogyakarta?',
          answer: 'Tugu Yogyakarta is located at the intersection of Jl. Jenderal Sudirman and Jl. Mangkubumi. You can use TransJogja, online motorcycle taxi, or walk from Tugu Station. This landmark is easily accessible and serves as a main reference point in Yogyakarta.'
        }
      ]
    }
  };

  const t = translations[locale as 'id' | 'en'] || translations.id;

  // Filter FAQs based on search query
  const filteredFAQs = t.faqs.filter(
    (faq: FAQ) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-2xl flex items-center justify-center relative group"
          aria-label={isOpen ? 'Tutup FAQ' : 'Buka FAQ'}
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="message"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20" />
          )}
        </Button>
      </motion.div>

      {/* FAQ Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              aria-label="Tutup panel FAQ"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] md:w-96 max-h-[70vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white">
                <h3 className="text-xl font-semibold mb-1">{t.title}</h3>
                <p className="text-sm text-amber-100">{t.subtitle}</p>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* FAQ List */}
              <div className="flex-1 overflow-y-auto p-4">
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredFAQs.map((faq: FAQ, index: number) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-slate-200 dark:border-slate-800 rounded-lg px-4 bg-slate-50 dark:bg-slate-800/50"
                      >
                        <AccordionTrigger className="text-sm hover:no-underline py-3 text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-600 dark:text-slate-400 pb-3">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <p className="text-sm">{t.noResults}</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  {t.needHelp}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
