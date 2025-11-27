'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface Event {
  id: number;
  name: string;
  category: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  date: string;
  time: string;
  location: string;
  ageLimit: string;
  price: string;
  status: 'upcoming' | 'past';
}

interface Filter {
  id: string;
  label: string;
}

export default function AgendaEventPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'upcoming' | 'past'>('upcoming');

  const filters: Filter[] = locale === 'id' ? [
    { id: 'all', label: 'Semua Event' },
    { id: 'budaya', label: 'Budaya & Upacara' },
    { id: 'festival', label: 'Festival & Hiburan' },
    { id: 'komunitas', label: 'Komunitas & Workshop' },
    { id: 'pameran', label: 'Pameran Kreatif' },
    { id: 'umkm', label: 'Event UMKM' }
  ] : [
    { id: 'all', label: 'All Events' },
    { id: 'budaya', label: 'Culture & Ceremony' },
    { id: 'festival', label: 'Festivals & Entertainment' },
    { id: 'komunitas', label: 'Community & Workshop' },
    { id: 'pameran', label: 'Creative Exhibition' },
    { id: 'umkm', label: 'MSME Events' }
  ];

  useEffect(() => {
    if (categoryParam) {
      const mappedCategory = getInternalCategoryId('agendaEvent', categoryParam, locale as 'id' | 'en');
      if (filters.some(f => f.id === mappedCategory)) {
        setActiveFilter(mappedCategory);
      }
    } else {
      // Reset to 'all' when no category param (navigating to parent page)
      setActiveFilter('all');
    }
  }, [categoryParam, locale]);

  const events: Event[] = locale === 'id' ? [
    {
      id: 1,
      name: 'Sekaten Festival 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      shortDesc: 'Festival tradisional memperingati Maulid Nabi Muhammad SAW dengan gamelan dan pasar malam',
      fullDesc: 'Sekaten adalah upacara adat Keraton Yogyakarta yang diadakan setiap tahun untuk memperingati Maulid Nabi Muhammad SAW. Festival ini menampilkan pertunjukan gamelan Kyai Sekati, pasar malam, dan berbagai kegiatan budaya lainnya.',
      date: '25 November 2024',
      time: '18:00 - 23:00',
      location: 'Alun-Alun Utara Keraton, Yogyakarta',
      ageLimit: 'Semua Umur',
      price: 'Gratis',
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Jogja International Music Festival',
      category: 'festival',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
      shortDesc: 'Festival musik internasional dengan lineup artis dalam dan luar negeri',
      fullDesc: 'Jogja International Music Festival menghadirkan berbagai genre musik dari jazz, rock, indie, hingga elektronik. Dengan lineup artis nasional dan internasional, festival ini menjadi ajang musik terbesar di Yogyakarta.',
      date: '15 Desember 2024',
      time: '14:00 - 23:00',
      location: 'Stadion Mandala Krida, Yogyakarta',
      ageLimit: '18+',
      price: 'Rp 250.000 - 1.500.000',
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'Workshop Batik untuk Pemula',
      category: 'komunitas',
      image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80',
      shortDesc: 'Belajar teknik membatik cap dan tulis dari pengrajin berpengalaman',
      fullDesc: 'Workshop batik ini mengajarkan dasar-dasar teknik membatik cap dan tulis. Peserta akan mendapatkan bahan praktek lengkap dan dipandu langsung oleh pengrajin batik berpengalaman dari Yogyakarta.',
      date: '28 November 2024',
      time: '09:00 - 15:00',
      location: 'Rumah Batik Tirtodipuran, Yogyakarta',
      ageLimit: '15+',
      price: 'Rp 150.000',
      status: 'upcoming'
    },
    {
      id: 4,
      name: 'Jogja Art Fair 2024',
      category: 'pameran',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
      shortDesc: 'Pameran seni rupa kontemporer dari seniman lokal dan nasional',
      fullDesc: 'Jogja Art Fair adalah pameran seni rupa terbesar di Yogyakarta yang menampilkan karya-karya kontemporer dari berbagai seniman lokal dan nasional. Event ini juga menghadirkan talks, workshop, dan art performance.',
      date: '5-10 Desember 2024',
      time: '10:00 - 20:00',
      location: 'Taman Budaya Yogyakarta',
      ageLimit: 'Semua Umur',
      price: 'Rp 25.000',
      status: 'upcoming'
    },
    {
      id: 5,
      name: 'Pasar UMKM Kotagede',
      category: 'umkm',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      shortDesc: 'Bazar produk UMKM lokal dengan beragam kerajinan dan kuliner khas',
      fullDesc: 'Pasar UMKM Kotagede menghadirkan lebih dari 100 booth UMKM lokal yang menjual berbagai produk kerajinan perak, batik, kuliner, hingga souvenir khas Yogyakarta. Ada juga live music dan food court.',
      date: '1-3 Desember 2024',
      time: '10:00 - 21:00',
      location: 'Alun-Alun Kotagede, Bantul',
      ageLimit: 'Semua Umur',
      price: 'Gratis',
      status: 'upcoming'
    },
    {
      id: 6,
      name: 'Grebeg Syawal 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80',
      shortDesc: 'Upacara adat Keraton menyambut Idul Fitri dengan prosesi gunungan',
      fullDesc: 'Grebeg Syawal adalah upacara tradisional Keraton Yogyakarta yang dilaksanakan setelah Idul Fitri. Prosesi dimulai dari Keraton menuju Masjid Agung dengan membawa gunungan berisi hasil bumi.',
      date: '12 April 2024',
      time: '08:00 - 12:00',
      location: 'Keraton Yogyakarta - Masjid Agung',
      ageLimit: 'Semua Umur',
      price: 'Gratis',
      status: 'past'
    }
  ] : [
    {
      id: 1,
      name: 'Sekaten Festival 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      shortDesc: 'Traditional festival commemorating Prophet Muhammad\'s birthday with gamelan and night market',
      fullDesc: 'Sekaten is an annual traditional ceremony of Yogyakarta Palace to commemorate the birth of Prophet Muhammad. The festival features Kyai Sekati gamelan performances, night market, and various cultural activities.',
      date: 'November 25, 2024',
      time: '18:00 - 23:00',
      location: 'North Square Keraton, Yogyakarta',
      ageLimit: 'All Ages',
      price: 'Free',
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Jogja International Music Festival',
      category: 'festival',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
      shortDesc: 'International music festival featuring local and international artists',
      fullDesc: 'Jogja International Music Festival presents various music genres from jazz, rock, indie, to electronic. With national and international artist lineup, this is Yogyakarta\'s biggest music event.',
      date: 'December 15, 2024',
      time: '14:00 - 23:00',
      location: 'Mandala Krida Stadium, Yogyakarta',
      ageLimit: '18+',
      price: 'IDR 250,000 - 1,500,000',
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'Batik Workshop for Beginners',
      category: 'komunitas',
      image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80',
      shortDesc: 'Learn stamp and hand-drawn batik techniques from experienced artisans',
      fullDesc: 'This batik workshop teaches basic stamp and hand-drawn batik techniques. Participants receive complete practice materials and direct guidance from experienced Yogyakarta batik artisans.',
      date: 'November 28, 2024',
      time: '09:00 - 15:00',
      location: 'Batik House Tirtodipuran, Yogyakarta',
      ageLimit: '15+',
      price: 'IDR 150,000',
      status: 'upcoming'
    },
    {
      id: 4,
      name: 'Jogja Art Fair 2024',
      category: 'pameran',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
      shortDesc: 'Contemporary art exhibition from local and national artists',
      fullDesc: 'Jogja Art Fair is Yogyakarta\'s largest art exhibition showcasing contemporary works from various local and national artists. The event also features talks, workshops, and art performances.',
      date: 'December 5-10, 2024',
      time: '10:00 - 20:00',
      location: 'Taman Budaya Yogyakarta',
      ageLimit: 'All Ages',
      price: 'IDR 25,000',
      status: 'upcoming'
    },
    {
      id: 5,
      name: 'Kotagede MSME Market',
      category: 'umkm',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      shortDesc: 'Local MSME bazaar featuring various crafts and traditional culinary',
      fullDesc: 'Kotagede MSME Market presents over 100 local MSME booths selling various silver crafts, batik, culinary, to typical Yogyakarta souvenirs. Also features live music and food court.',
      date: 'December 1-3, 2024',
      time: '10:00 - 21:00',
      location: 'Kotagede Square, Bantul',
      ageLimit: 'All Ages',
      price: 'Free',
      status: 'upcoming'
    },
    {
      id: 6,
      name: 'Grebeg Syawal 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80',
      shortDesc: 'Palace traditional ceremony welcoming Eid with gunungan procession',
      fullDesc: 'Grebeg Syawal is a traditional ceremony of Yogyakarta Palace held after Eid al-Fitr. The procession starts from the Palace to the Grand Mosque carrying gunungan filled with agricultural products.',
      date: 'April 12, 2024',
      time: '08:00 - 12:00',
      location: 'Yogyakarta Palace - Grand Mosque',
      ageLimit: 'All Ages',
      price: 'Free',
      status: 'past'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeFilter === 'all' || event.category === activeFilter;
    const matchesStatus = event.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-slate-950 dark:via-rose-950/20 dark:to-orange-950/20 text-slate-900 dark:text-slate-50">
      {/* Hero with Event Posters Grid */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/50 rounded-full mb-6">
              <Calendar className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span className="text-sm text-rose-600 dark:text-rose-400">Event Calendar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'id' ? 'Agenda Event Jogja' : 'Jogja Event Calendar'}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {locale === 'id'
                ? 'Temukan event budaya, festival, workshop, dan kegiatan menarik di Yogyakarta'
                : 'Discover cultural events, festivals, workshops, and exciting activities in Yogyakarta'}
            </p>
          </motion.div>

          {/* Compact Filters - Single Row */}
          <div className="max-w-[1024px] mx-auto mb-12">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              {/* Status Toggle */}
              <div className="flex gap-2 sm:w-auto">
                <button
                  onClick={() => setStatusFilter('upcoming')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    statusFilter === 'upcoming'
                      ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {locale === 'id' ? '🎉 Akan Datang' : '🎉 Upcoming'}
                </button>
                <button
                  onClick={() => setStatusFilter('past')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    statusFilter === 'past'
                      ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {locale === 'id' ? '📅 Sudah Dilaksanakan' : '📅 Past Events'}
                </button>
              </div>

              {/* Divider - hidden on mobile */}
              <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

              {/* Category Filter Pills with Gradient Fade */}
              <div className="relative flex-1 overflow-hidden">
                {/* Scrollable container */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pl-4 pr-8 mx-8">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all snap-start flex-shrink-0 ${
                        activeFilter === filter.id
                          ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-pink-50 via-pink-50/80 dark:from-slate-950 dark:via-slate-950/80 to-transparent pointer-events-none" />

                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-pink-50 via-pink-50/80 dark:from-slate-950 dark:via-slate-950/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-[1024px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-rose-500 to-orange-500 text-white border-0">
                        {filters.find(f => f.id === event.category)?.label}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {event.shortDesc}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="p-1.5 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg">
                          <Calendar className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="p-1.5 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="p-1.5 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg">
                          <MapPin className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                          <DollarSign className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-semibold text-green-600 dark:text-green-400">{event.price}</span>
                      </div>
                    </div>

                    <Link href={`/${locale}/agenda-event/${generateSlug(event.name)}`}>
                      <Button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white">
                        {locale === 'id' ? 'Lihat Detail' : 'View Details'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                {locale === 'id' ? 'Tidak ada event yang ditemukan' : 'No events found'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
