'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Book, Landmark, Users, BookOpen, ChevronRight, TrendingUp, Lightbulb, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface Entry {
  id: number;
  category: string;
  title: string;
  snippet: string;
  fullContent: string;
  icon: any;
  editor: string;
  tags: string[];
}

interface Category {
  id: string;
  label: string;
  icon: any;
  description: string;
  count: number;
}

export default function EncyclopediaPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParam]);

  const categories: Category[] = [
    {
      id: 'warisan-benda',
      label: locale === 'id' ? 'Warisan Budaya Benda' : 'Tangible Heritage',
      icon: Landmark,
      description: locale === 'id' ? 'Bangunan, monumen, dan artefak bersejarah' : 'Buildings, monuments, and historical artifacts',
      count: 24
    },
    {
      id: 'warisan-takbenda',
      label: locale === 'id' ? 'Warisan Budaya Tak Benda' : 'Intangible Heritage',
      icon: Book,
      description: locale === 'id' ? 'Tradisi, upacara, dan pengetahuan lokal' : 'Traditions, ceremonies, and local knowledge',
      count: 18
    },
    {
      id: 'tokoh',
      label: locale === 'id' ? 'Tokoh & Sejarah' : 'Figures & History',
      icon: Users,
      description: locale === 'id' ? 'Tokoh penting dalam sejarah Yogyakarta' : 'Important figures in Yogyakarta\'s history',
      count: 15
    },
    {
      id: 'istilah',
      label: locale === 'id' ? 'Istilah & Konsep' : 'Terms & Concepts',
      icon: BookOpen,
      description: locale === 'id' ? 'Terminologi dan filosofi Jawa' : 'Javanese terminology and philosophy',
      count: 32
    },
    {
      id: 'sedang-tren',
      label: locale === 'id' ? 'Sedang Tren' : 'Trending',
      icon: TrendingUp,
      description: locale === 'id' ? 'Artikel populer minggu ini' : 'Popular articles this week',
      count: 8
    },
    {
      id: 'tips-wisata',
      label: locale === 'id' ? 'Tips Wisata' : 'Travel Tips',
      icon: Lightbulb,
      description: locale === 'id' ? 'Panduan dan tips berwisata' : 'Guides and travel tips',
      count: 12
    }
  ];

  const entries: Entry[] = locale === 'id' ? [
    {
      id: 1,
      category: 'warisan-benda',
      title: 'Tugu Yogyakarta',
      snippet: 'Monumen ikonik yang menjadi titik awal Sumbu Filosofi di ujung utara. Tugu ini dibangun tahun 1755 oleh Sultan Hamengku Buwono I sebagai simbol persatuan antara Sultan dengan rakyatnya.',
      fullContent: 'Tugu Yogyakarta adalah monumen bersejarah yang menjadi penanda titik awal Sumbu Filosofi Yogyakarta. Dibangun pada tahun 1755 oleh Sultan Hamengku Buwono I, tugu ini memiliki makna filosofis yang mendalam. Tingginya 15 meter dengan bentuk silinder yang meruncing ke atas, melambangkan hubungan vertikal antara manusia dengan Sang Pencipta.\n\nTugu ini terletak di persimpangan Jalan Jenderal Sudirman dan menjadi landmark penting kota Yogyakarta. Dalam konsep Sumbu Filosofi, Tugu merepresentasikan titik paling utara yang membentuk garis imajiner lurus ke selatan menuju Keraton, Panggung Krapyak, hingga Laut Selatan.',
      icon: Landmark,
      editor: 'Dr. Soedjono Martokusumo',
      tags: ['Monumen', 'Sumbu Utama', 'Sejarah Jogja']
    },
    {
      id: 2,
      category: 'warisan-takbenda',
      title: 'Sekaten',
      snippet: 'Upacara tradisional memperingati Maulid Nabi Muhammad SAW yang diselenggarakan di Alun-Alun Utara Keraton. Tradisi ini telah berlangsung sejak zaman Sultan Hamengku Buwono I.',
      fullContent: 'Sekaten adalah upacara adat Keraton Yogyakarta yang diselenggarakan setiap tahun untuk memperingati Maulid Nabi Muhammad SAW. Tradisi ini telah berlangsung sejak masa pemerintahan Sultan Hamengku Buwono I dan terus dilestarikan hingga kini.\n\nPelaksanaan Sekaten dimulai dengan penabuhan gamelan pusaka Kyai Sekati dan Kyai Nogowilogo di Masjid Agung Yogyakarta.',
      icon: Book,
      editor: 'Prof. KGPH Prabuningrat',
      tags: ['Upacara Adat', 'Keraton', 'Tradisi Islam']
    },
    {
      id: 3,
      category: 'tokoh',
      title: 'Sultan Hamengku Buwono I',
      snippet: 'Pendiri Kesultanan Yogyakarta dan perancang Sumbu Filosofi. Beliau menetapkan tata ruang kota berdasarkan kosmologi Jawa yang menghubungkan Tugu, Keraton, dan Panggung Krapyak.',
      fullContent: 'Sultan Hamengku Buwono I, atau Pangeran Mangkubumi, adalah pendiri Kesultanan Yogyakarta pada tahun 1755. Beliau adalah arsitek utama di balik konsep Sumbu Filosofi yang menjadi dasar perencanaan kota Yogyakarta.\n\nSetelah Perjanjian Giyanti yang membagi Kerajaan Mataram menjadi Kasunanan Surakarta dan Kesultanan Yogyakarta, Sultan HB I memilih lokasi di tepian Kali Code untuk membangun Keraton.',
      icon: Users,
      editor: 'Drs. Sumarsono Suryokusumo, M.Hum',
      tags: ['Sultan', 'Pendiri', 'Arsitektur Kota']
    },
    {
      id: 4,
      category: 'istilah',
      title: 'Manunggaling Kawula Gusti',
      snippet: 'Konsep filosofis Jawa tentang kesatuan antara rakyat (kawula) dengan raja (gusti). Filosofi ini tercermin dalam tata ruang Sumbu Filosofi yang menempatkan Keraton di pusat.',
      fullContent: 'Manunggaling Kawula Gusti adalah salah satu konsep filosofis paling penting dalam budaya Jawa. Secara harfiah berarti "bersatunya rakyat (kawula) dengan pemimpin (gusti)", konsep ini mengandung makna yang sangat mendalam tentang hubungan antara penguasa dan rakyat.',
      icon: BookOpen,
      editor: 'Ki Joko Raharjo, M.Pd',
      tags: ['Filosofi Jawa', 'Kosmologi', 'Kepemimpinan']
    },
    {
      id: 5,
      category: 'sedang-tren',
      title: 'Revitalisasi Taman Sari',
      snippet: 'Proyek pemugaran dan revitalisasi kompleks Taman Sari yang sedang menjadi perhatian. Upaya melestarikan warisan budaya sambil membuka akses wisata yang berkelanjutan.',
      fullContent: 'Taman Sari, atau Istana Air Keraton Yogyakarta, sedang mengalami proses revitalisasi besar-besaran. Kompleks yang dibangun pada masa Sultan Hamengku Buwono I ini memiliki nilai historis dan arsitektural yang sangat tinggi.',
      icon: TrendingUp,
      editor: 'Andi Setiawan, S.S., M.Hum',
      tags: ['Revitalisasi', 'Taman Sari', 'Pelestarian']
    },
    {
      id: 6,
      category: 'tips-wisata',
      title: 'Menyusuri Sumbu Filosofi: Rute & Tips',
      snippet: 'Panduan lengkap menyusuri jalur Sumbu Filosofi dari Tugu hingga Panggung Krapyak. Termasuk rekomendasi waktu kunjungan dan spot foto terbaik.',
      fullContent: 'Menyusuri Sumbu Filosofi Yogyakarta adalah pengalaman wisata budaya yang tak terlupakan. Mulai dari Tugu Yogyakarta di pagi hari, lanjutkan ke Titik Nol Kilometer, Keraton Yogyakarta, Alun-Alun Kidul, dan akhiri di Panggung Krapyak untuk menikmati sunset.',
      icon: Lightbulb,
      editor: 'Made Wijaya, S.Par',
      tags: ['Panduan Wisata', 'Rute', 'Tips Perjalanan']
    }
  ] : [
    {
      id: 1,
      category: 'warisan-benda',
      title: 'Tugu Yogyakarta',
      snippet: 'Iconic monument marking the northern starting point of the Philosophical Axis. Built in 1755 by Sultan Hamengku Buwono I as a symbol of unity between Sultan and his people.',
      fullContent: 'Tugu Yogyakarta is a historical monument marking the starting point of Yogyakarta\'s Philosophical Axis. Built in 1755 by Sultan Hamengku Buwono I, it carries deep philosophical meaning.',
      icon: Landmark,
      editor: 'Dr. Soedjono Martokusumo',
      tags: ['Monument', 'Main Axis', 'Jogja History']
    },
    {
      id: 2,
      category: 'warisan-takbenda',
      title: 'Sekaten',
      snippet: 'Traditional ceremony commemorating Prophet Muhammad\'s birthday held at North Square of the Palace.',
      fullContent: 'Sekaten is a traditional ceremony of Yogyakarta Palace held annually to commemorate Prophet Muhammad\'s birthday.',
      icon: Book,
      editor: 'Prof. KGPH Prabuningrat',
      tags: ['Traditional Ceremony', 'Palace', 'Islamic Tradition']
    },
    {
      id: 3,
      category: 'tokoh',
      title: 'Sultan Hamengku Buwono I',
      snippet: 'Founder of Yogyakarta Sultanate and designer of the Philosophical Axis.',
      fullContent: 'Sultan Hamengku Buwono I was the founder of Yogyakarta Sultanate in 1755 and the main architect behind the Philosophical Axis concept.',
      icon: Users,
      editor: 'Drs. Sumarsono Suryokusumo, M.Hum',
      tags: ['Sultan', 'Founder', 'City Architecture']
    },
    {
      id: 4,
      category: 'istilah',
      title: 'Manunggaling Kawula Gusti',
      snippet: 'Javanese philosophical concept about unity between people (kawula) and ruler (gusti).',
      fullContent: 'Manunggaling Kawula Gusti is one of the most important philosophical concepts in Javanese culture.',
      icon: BookOpen,
      editor: 'Ki Joko Raharjo, M.Pd',
      tags: ['Javanese Philosophy', 'Cosmology', 'Leadership']
    },
    {
      id: 5,
      category: 'sedang-tren',
      title: 'Taman Sari Revitalization',
      snippet: 'Major restoration and revitalization project of Taman Sari complex currently underway.',
      fullContent: 'Taman Sari, or the Water Castle of Yogyakarta Palace, is undergoing major revitalization.',
      icon: TrendingUp,
      editor: 'Andi Setiawan, S.S., M.Hum',
      tags: ['Revitalization', 'Taman Sari', 'Preservation']
    },
    {
      id: 6,
      category: 'tips-wisata',
      title: 'Exploring the Philosophical Axis: Routes & Tips',
      snippet: 'Complete guide to exploring the Philosophical Axis route from Tugu to Panggung Krapyak.',
      fullContent: 'Exploring Yogyakarta\'s Philosophical Axis is an unforgettable cultural experience.',
      icon: Lightbulb,
      editor: 'Made Wijaya, S.Par',
      tags: ['Travel Guide', 'Route', 'Travel Tips']
    }
  ];

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchQuery === '' ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.snippet.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || entry.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/30 text-slate-900 dark:text-slate-50">
      {/* Hero with Search */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-6">
              <Book className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm text-indigo-600 dark:text-indigo-400">Knowledge Base</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'id' ? 'Ensiklopedia Sumbu Filosofi' : 'Philosophical Axis Encyclopedia'}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
              {locale === 'id'
                ? 'Jelajahi pengetahuan mendalam tentang warisan budaya, tokoh, dan istilah terkait Sumbu Filosofi Yogyakarta'
                : 'Explore in-depth knowledge about cultural heritage, figures, and terms related to Yogyakarta\'s Philosophical Axis'}
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-3xl mx-auto mb-8 md:mb-12"
            >
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center flex-1">
                  <div className="pl-4 md:pl-6 pr-3 md:pr-4 py-4 sm:py-0">
                    <Search className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={locale === 'id' ? 'Cari artikel, tokoh, atau istilah...' : 'Search articles, figures, or terms...'}
                    className="flex-1 py-4 md:py-5 pr-4 bg-transparent outline-none text-base md:text-lg text-slate-900 dark:text-slate-50 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Sidebar + Articles */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-[min-content_1fr] lg:grid-cols-4 gap-2 lg:gap-6">
            {/* Sidebar Categories */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 lg:top-24">
                <div className="bg-white dark:bg-slate-900 rounded-xl lg:rounded-2xl shadow-lg p-1.5 lg:p-6">
                  <h3 className="mb-4 hidden lg:block font-semibold">
                    {locale === 'id' ? 'Kategori' : 'Categories'}
                  </h3>

                  <TooltipProvider delayDuration={200}>
                    <div className="space-y-1.5 lg:space-y-2">
                      {/* All button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setSelectedCategory(null)}
                            className={`w-full text-left p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all ${
                              !selectedCategory
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                              <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                              <span className="hidden lg:block text-sm">
                                {locale === 'id' ? 'Semua Artikel' : 'All Articles'}
                              </span>
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="lg:hidden">
                          <p>{locale === 'id' ? 'Semua Artikel' : 'All Articles'}</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Category buttons */}
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Tooltip key={category.id}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full text-left p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all ${
                                  selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                              >
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                  <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                                  <div className="hidden lg:block flex-1 min-w-0">
                                    <p className="text-sm">{category.label}</p>
                                    <p className={`text-xs mt-0.5 ${selectedCategory === category.id ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                                      {category.count} {locale === 'id' ? 'artikel' : 'articles'}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="lg:hidden">
                              <p className="font-medium">{category.label}</p>
                              <p className="text-xs text-slate-400">{category.count} {locale === 'id' ? 'artikel' : 'articles'}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </aside>

            {/* Article List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredEntries.map((entry, index) => {
                  const Icon = entry.icon;
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-xl transition-shadow cursor-pointer group overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            {/* Icon - Hidden on mobile */}
                            <div className="hidden lg:flex flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              {/* Title and Badge */}
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-2">
                                <h3 className="text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {entry.title}
                                </h3>
                                <Badge variant="outline" className="self-start lg:whitespace-nowrap">
                                  {categories.find(c => c.id === entry.category)?.label}
                                </Badge>
                              </div>

                              {/* Editor */}
                              <div className="flex items-center gap-4 mb-3 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  <span>{entry.editor}</span>
                                </div>
                              </div>

                              {/* Snippet */}
                              <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                                {entry.snippet}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {entry.tags.map((tag, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Read More */}
                              <Link
                                href={`/${locale}/encyclopedia/${generateSlug(entry.title)}`}
                                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                              >
                                {locale === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {filteredEntries.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl">
                  <p className="text-slate-500 dark:text-slate-400">
                    {locale === 'id' ? 'Tidak ada hasil yang ditemukan' : 'No results found'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
