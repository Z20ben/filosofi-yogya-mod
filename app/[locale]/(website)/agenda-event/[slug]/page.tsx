'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, DollarSign, Tag, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Event {
  id: number;
  slug: string;
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
  tags: string[];
  organizer: string;
}

// Helper function to generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function AgendaDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  const categories: Record<string, { label: string; color: string }> = {
    'budaya': { label: locale === 'id' ? 'Budaya & Upacara' : 'Culture & Ceremony', color: 'from-rose-500 to-orange-500' },
    'festival': { label: locale === 'id' ? 'Festival & Hiburan' : 'Festival & Entertainment', color: 'from-purple-500 to-pink-500' },
    'komunitas': { label: locale === 'id' ? 'Komunitas & Workshop' : 'Community & Workshop', color: 'from-cyan-500 to-blue-500' },
    'pameran': { label: locale === 'id' ? 'Pameran Kreatif' : 'Creative Exhibition', color: 'from-emerald-500 to-teal-500' },
    'umkm': { label: locale === 'id' ? 'Event UMKM' : 'MSME Events', color: 'from-amber-500 to-orange-500' }
  };

  // Event data with full details
  const events: Event[] = locale === 'id' ? [
    {
      id: 1,
      slug: 'sekaten-festival-2024',
      name: 'Sekaten Festival 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      shortDesc: 'Festival tradisional memperingati Maulid Nabi Muhammad SAW dengan gamelan dan pasar malam',
      fullDesc: `Sekaten adalah upacara adat Keraton Yogyakarta yang diadakan setiap tahun untuk memperingati Maulid Nabi Muhammad SAW. Festival ini telah menjadi tradisi sejak zaman Sultan Hamengku Buwono I dan terus dilestarikan hingga kini.

Festival Sekaten dimulai dengan penabuhan gamelan pusaka Kyai Sekati dan Kyai Nogowilogo di serambi Masjid Agung Yogyakarta. Suara gamelan yang khas ini dipercaya membawa berkah dan keselamatan bagi siapa saja yang mendengarnya.

Selain pertunjukan gamelan, festival ini juga menampilkan pasar malam tradisional dengan berbagai wahana permainan, kuliner khas, dan pedagang kaki lima. Puncak acara adalah prosesi Grebeg Maulud dimana gunungan berisi hasil bumi diarak dari Keraton ke Masjid Agung.

Sekaten menjadi momen penting bagi warga Yogyakarta untuk berkumpul, berdoa, dan merayakan nilai-nilai spiritual bersama. Festival ini juga menarik ribuan wisatawan domestik dan mancanegara setiap tahunnya.`,
      date: '25 November 2024',
      time: '18:00 - 23:00',
      location: 'Alun-Alun Utara Keraton, Yogyakarta',
      ageLimit: 'Semua Umur',
      price: 'Gratis',
      status: 'upcoming',
      tags: ['Tradisi', 'Keraton', 'Maulid Nabi', 'Gamelan', 'Pasar Malam'],
      organizer: 'Keraton Yogyakarta'
    },
    {
      id: 2,
      slug: 'jogja-international-music-festival',
      name: 'Jogja International Music Festival',
      category: 'festival',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
      shortDesc: 'Festival musik internasional dengan lineup artis dalam dan luar negeri',
      fullDesc: `Jogja International Music Festival (JIMF) adalah festival musik terbesar di Yogyakarta yang menghadirkan berbagai genre musik dari jazz, rock, indie, hingga elektronik. Festival ini telah menjadi agenda tahunan yang dinantikan pecinta musik dari seluruh Indonesia.

Dengan lineup artis nasional dan internasional berkelas, JIMF menawarkan pengalaman musik yang tak terlupakan. Stage megah dengan sound system berkualitas tinggi memastikan penonton mendapatkan pengalaman audio visual terbaik.

Festival ini juga menyediakan area food court dengan berbagai pilihan kuliner, merchandise zone dengan produk-produk eksklusif, dan camping area bagi penonton yang ingin merasakan pengalaman festival secara maksimal.

JIMF berkomitmen untuk mendukung musisi lokal dengan memberikan slot khusus bagi band-band indie Yogyakarta untuk tampil di panggung utama bersama artis-artis ternama.`,
      date: '15 Desember 2024',
      time: '14:00 - 23:00',
      location: 'Stadion Mandala Krida, Yogyakarta',
      ageLimit: '18+',
      price: 'Rp 250.000 - 1.500.000',
      status: 'upcoming',
      tags: ['Musik', 'Festival', 'Konser', 'Internasional', 'Live Music'],
      organizer: 'JIMF Production'
    },
    {
      id: 3,
      slug: 'workshop-batik-untuk-pemula',
      name: 'Workshop Batik untuk Pemula',
      category: 'komunitas',
      image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80',
      shortDesc: 'Belajar teknik membatik cap dan tulis dari pengrajin berpengalaman',
      fullDesc: `Workshop Batik untuk Pemula adalah program edukasi yang dirancang untuk memperkenalkan seni batik kepada masyarakat umum. Dipandu oleh pengrajin batik berpengalaman dari Yogyakarta, peserta akan belajar teknik membatik dari dasar hingga menghasilkan karya sendiri.

Materi workshop meliputi:
- Sejarah dan filosofi batik Yogyakarta
- Pengenalan alat dan bahan membatik
- Teknik membatik cap dan tulis
- Proses pewarnaan dan pelorodan
- Tips memilih motif dan kombinasi warna

Setiap peserta akan mendapatkan:
- Kain mori siap batik
- Peralatan membatik lengkap
- Sertifikat keikutsertaan
- Hasil karya batik untuk dibawa pulang

Workshop ini cocok untuk pemula yang ingin mengenal budaya batik lebih dalam sekaligus menghasilkan karya seni yang bernilai.`,
      date: '28 November 2024',
      time: '09:00 - 15:00',
      location: 'Rumah Batik Tirtodipuran, Yogyakarta',
      ageLimit: '15+',
      price: 'Rp 150.000',
      status: 'upcoming',
      tags: ['Workshop', 'Batik', 'Kerajinan', 'Edukasi', 'Budaya'],
      organizer: 'Rumah Batik Tirtodipuran'
    },
    {
      id: 4,
      slug: 'jogja-art-fair-2024',
      name: 'Jogja Art Fair 2024',
      category: 'pameran',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
      shortDesc: 'Pameran seni rupa kontemporer dari seniman lokal dan nasional',
      fullDesc: `Jogja Art Fair adalah pameran seni rupa terbesar di Yogyakarta yang menampilkan karya-karya kontemporer dari berbagai seniman lokal dan nasional. Event tahunan ini telah menjadi barometer perkembangan seni rupa Indonesia.

Pameran tahun ini mengusung tema "Resonansi" yang mengeksplorasi hubungan antara seni, teknologi, dan budaya lokal. Lebih dari 50 seniman akan memamerkan karya lukis, patung, instalasi, video art, dan performance art.

Program pendukung meliputi:
- Artist talks dan diskusi panel
- Workshop seni untuk anak dan dewasa
- Art performance setiap weekend
- Tour galeri dengan kurator
- Musik akustik live

Jogja Art Fair juga menyediakan kesempatan bagi kolektor dan pecinta seni untuk bertemu langsung dengan seniman dan mendapatkan karya eksklusif dengan harga spesial.`,
      date: '5-10 Desember 2024',
      time: '10:00 - 20:00',
      location: 'Taman Budaya Yogyakarta',
      ageLimit: 'Semua Umur',
      price: 'Rp 25.000',
      status: 'upcoming',
      tags: ['Seni Rupa', 'Pameran', 'Kontemporer', 'Galeri', 'Seniman'],
      organizer: 'Taman Budaya Yogyakarta'
    },
    {
      id: 5,
      slug: 'pasar-umkm-kotagede',
      name: 'Pasar UMKM Kotagede',
      category: 'umkm',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      shortDesc: 'Bazar produk UMKM lokal dengan beragam kerajinan dan kuliner khas',
      fullDesc: `Pasar UMKM Kotagede adalah event bulanan yang menghadirkan lebih dari 100 booth UMKM lokal dari berbagai sektor. Event ini bertujuan untuk mendukung pertumbuhan ekonomi kreatif dan memberikan wadah bagi pelaku UMKM untuk memasarkan produknya.

Produk yang tersedia meliputi:
- Kerajinan perak Kotagede
- Batik tulis dan cap
- Kuliner tradisional dan modern
- Fashion dan aksesoris
- Souvenir khas Yogyakarta
- Produk herbal dan kecantikan

Event ini juga menyediakan:
- Live music sepanjang acara
- Food court dengan pilihan kuliner lengkap
- Area bermain anak
- Talkshow dan demo produk
- Diskon spesial dari tenant

Pasar UMKM Kotagede adalah destinasi belanja yang sempurna bagi mereka yang mencari produk berkualitas dengan harga terjangkau langsung dari produsen.`,
      date: '1-3 Desember 2024',
      time: '10:00 - 21:00',
      location: 'Alun-Alun Kotagede, Bantul',
      ageLimit: 'Semua Umur',
      price: 'Gratis',
      status: 'upcoming',
      tags: ['UMKM', 'Bazar', 'Kerajinan', 'Kuliner', 'Belanja'],
      organizer: 'Dinas Koperasi & UMKM Bantul'
    },
    {
      id: 6,
      slug: 'grebeg-syawal-2024',
      name: 'Grebeg Syawal 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80',
      shortDesc: 'Upacara adat Keraton menyambut Idul Fitri dengan prosesi gunungan',
      fullDesc: `Grebeg Syawal adalah upacara tradisional Keraton Yogyakarta yang dilaksanakan setelah Idul Fitri. Tradisi ini merupakan bentuk syukur Sultan dan rakyat atas nikmat yang diberikan selama bulan Ramadhan.

Prosesi dimulai dari Keraton Yogyakarta menuju Masjid Agung dengan membawa gunungan yang berisi hasil bumi seperti sayuran, buah-buahan, dan makanan tradisional. Gunungan ini melambangkan kemakmuran dan kesejahteraan rakyat.

Rangkaian acara meliputi:
- Pukul 07:00: Persiapan di Keraton
- Pukul 08:00: Prosesi gunungan dimulai
- Pukul 09:00: Penyerahan gunungan di Masjid Agung
- Pukul 10:00: Pembagian gunungan kepada masyarakat
- Pukul 11:00: Acara selesai

Ribuan warga berkumpul di sepanjang jalan untuk menyaksikan prosesi dan berebut isi gunungan yang dipercaya membawa berkah. Tradisi ini telah berlangsung ratusan tahun dan menjadi warisan budaya yang terus dilestarikan.`,
      date: '12 April 2024',
      time: '08:00 - 12:00',
      location: 'Keraton Yogyakarta - Masjid Agung',
      ageLimit: 'Semua Umur',
      price: 'Gratis',
      status: 'past',
      tags: ['Tradisi', 'Keraton', 'Idul Fitri', 'Gunungan', 'Budaya'],
      organizer: 'Keraton Yogyakarta'
    }
  ] : [
    {
      id: 1,
      slug: 'sekaten-festival-2024',
      name: 'Sekaten Festival 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      shortDesc: 'Traditional festival commemorating Prophet Muhammad\'s birthday with gamelan and night market',
      fullDesc: `Sekaten is an annual traditional ceremony of Yogyakarta Palace to commemorate the birth of Prophet Muhammad. This festival has been a tradition since the era of Sultan Hamengku Buwono I and continues to be preserved today.

The Sekaten Festival begins with the playing of the sacred gamelan Kyai Sekati and Kyai Nogowilogo at the Grand Mosque of Yogyakarta. The distinctive sound of this gamelan is believed to bring blessings and safety to anyone who hears it.

In addition to gamelan performances, this festival also features a traditional night market with various rides, local cuisine, and street vendors. The highlight is the Grebeg Maulud procession where gunungan containing agricultural products are paraded from the Palace to the Grand Mosque.

Sekaten becomes an important moment for Yogyakarta residents to gather, pray, and celebrate spiritual values together. This festival also attracts thousands of domestic and international tourists every year.`,
      date: 'November 25, 2024',
      time: '18:00 - 23:00',
      location: 'North Square Keraton, Yogyakarta',
      ageLimit: 'All Ages',
      price: 'Free',
      status: 'upcoming',
      tags: ['Tradition', 'Palace', 'Prophet Birthday', 'Gamelan', 'Night Market'],
      organizer: 'Yogyakarta Palace'
    },
    {
      id: 2,
      slug: 'jogja-international-music-festival',
      name: 'Jogja International Music Festival',
      category: 'festival',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
      shortDesc: 'International music festival featuring local and international artists',
      fullDesc: `Jogja International Music Festival (JIMF) is the largest music festival in Yogyakarta featuring various music genres from jazz, rock, indie, to electronic. This festival has become an annual event awaited by music lovers from all over Indonesia.

With a lineup of national and international class artists, JIMF offers an unforgettable music experience. The grand stage with high-quality sound system ensures audiences get the best audio-visual experience.

This festival also provides a food court area with various culinary options, merchandise zone with exclusive products, and camping area for audiences who want to maximize their festival experience.

JIMF is committed to supporting local musicians by providing special slots for Yogyakarta indie bands to perform on the main stage alongside well-known artists.`,
      date: 'December 15, 2024',
      time: '14:00 - 23:00',
      location: 'Mandala Krida Stadium, Yogyakarta',
      ageLimit: '18+',
      price: 'IDR 250,000 - 1,500,000',
      status: 'upcoming',
      tags: ['Music', 'Festival', 'Concert', 'International', 'Live Music'],
      organizer: 'JIMF Production'
    },
    {
      id: 3,
      slug: 'batik-workshop-for-beginners',
      name: 'Batik Workshop for Beginners',
      category: 'komunitas',
      image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80',
      shortDesc: 'Learn stamp and hand-drawn batik techniques from experienced artisans',
      fullDesc: `Batik Workshop for Beginners is an educational program designed to introduce batik art to the general public. Guided by experienced batik artisans from Yogyakarta, participants will learn batik techniques from basics to producing their own work.

Workshop materials include:
- History and philosophy of Yogyakarta batik
- Introduction to batik tools and materials
- Stamp and hand-drawn batik techniques
- Dyeing and wax removal process
- Tips for choosing motifs and color combinations

Each participant will receive:
- Ready-to-batik mori fabric
- Complete batik equipment
- Certificate of participation
- Batik artwork to take home

This workshop is suitable for beginners who want to know batik culture more deeply while producing valuable artwork.`,
      date: 'November 28, 2024',
      time: '09:00 - 15:00',
      location: 'Batik House Tirtodipuran, Yogyakarta',
      ageLimit: '15+',
      price: 'IDR 150,000',
      status: 'upcoming',
      tags: ['Workshop', 'Batik', 'Craft', 'Education', 'Culture'],
      organizer: 'Batik House Tirtodipuran'
    },
    {
      id: 4,
      slug: 'jogja-art-fair-2024',
      name: 'Jogja Art Fair 2024',
      category: 'pameran',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
      shortDesc: 'Contemporary art exhibition from local and national artists',
      fullDesc: `Jogja Art Fair is the largest art exhibition in Yogyakarta showcasing contemporary works from various local and national artists. This annual event has become a barometer for Indonesian art development.

This year's exhibition carries the theme "Resonance" which explores the relationship between art, technology, and local culture. More than 50 artists will exhibit paintings, sculptures, installations, video art, and performance art.

Supporting programs include:
- Artist talks and panel discussions
- Art workshops for children and adults
- Art performance every weekend
- Gallery tour with curator
- Live acoustic music

Jogja Art Fair also provides opportunities for collectors and art lovers to meet directly with artists and get exclusive works at special prices.`,
      date: 'December 5-10, 2024',
      time: '10:00 - 20:00',
      location: 'Taman Budaya Yogyakarta',
      ageLimit: 'All Ages',
      price: 'IDR 25,000',
      status: 'upcoming',
      tags: ['Fine Art', 'Exhibition', 'Contemporary', 'Gallery', 'Artist'],
      organizer: 'Taman Budaya Yogyakarta'
    },
    {
      id: 5,
      slug: 'kotagede-msme-market',
      name: 'Kotagede MSME Market',
      category: 'umkm',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      shortDesc: 'Local MSME bazaar featuring various crafts and traditional culinary',
      fullDesc: `Kotagede MSME Market is a monthly event featuring over 100 local MSME booths from various sectors. This event aims to support creative economy growth and provide a platform for MSME entrepreneurs to market their products.

Available products include:
- Kotagede silver crafts
- Hand-drawn and stamp batik
- Traditional and modern culinary
- Fashion and accessories
- Typical Yogyakarta souvenirs
- Herbal and beauty products

This event also provides:
- Live music throughout the event
- Food court with complete culinary options
- Children's play area
- Talkshows and product demos
- Special discounts from tenants

Kotagede MSME Market is the perfect shopping destination for those looking for quality products at affordable prices directly from producers.`,
      date: 'December 1-3, 2024',
      time: '10:00 - 21:00',
      location: 'Kotagede Square, Bantul',
      ageLimit: 'All Ages',
      price: 'Free',
      status: 'upcoming',
      tags: ['MSME', 'Bazaar', 'Craft', 'Culinary', 'Shopping'],
      organizer: 'Bantul Cooperative & MSME Office'
    },
    {
      id: 6,
      slug: 'grebeg-syawal-2024',
      name: 'Grebeg Syawal 2024',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80',
      shortDesc: 'Palace traditional ceremony welcoming Eid with gunungan procession',
      fullDesc: `Grebeg Syawal is a traditional ceremony of Yogyakarta Palace held after Eid al-Fitr. This tradition is a form of gratitude from the Sultan and the people for the blessings given during Ramadan.

The procession starts from Yogyakarta Palace to the Grand Mosque carrying gunungan containing agricultural products such as vegetables, fruits, and traditional food. This gunungan symbolizes the prosperity and welfare of the people.

Event schedule:
- 07:00: Preparation at the Palace
- 08:00: Gunungan procession begins
- 09:00: Gunungan handover at Grand Mosque
- 10:00: Distribution of gunungan to the public
- 11:00: Event ends

Thousands of residents gather along the streets to witness the procession and scramble for the gunungan contents believed to bring blessings. This tradition has been going on for hundreds of years and remains a cultural heritage that continues to be preserved.`,
      date: 'April 12, 2024',
      time: '08:00 - 12:00',
      location: 'Yogyakarta Palace - Grand Mosque',
      ageLimit: 'All Ages',
      price: 'Free',
      status: 'past',
      tags: ['Tradition', 'Palace', 'Eid', 'Gunungan', 'Culture'],
      organizer: 'Yogyakarta Palace'
    }
  ];

  // Find the event by slug
  const event = events.find(e => e.slug === slug);

  // Get upcoming events excluding current
  const upcomingEvents = events.filter(e => e.status === 'upcoming' && e.slug !== slug).slice(0, 3);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-slate-950 dark:via-rose-950/20 dark:to-orange-950/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {locale === 'id' ? 'Event tidak ditemukan' : 'Event not found'}
          </h1>
          <Link href={`/${locale}/agenda-event`}>
            <Button>
              {locale === 'id' ? 'Kembali ke Agenda' : 'Back to Agenda'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories[event.category];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = event.name;

    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' - ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-slate-950 dark:via-rose-950/20 dark:to-orange-950/20">
      {/* Hero Image */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={`bg-gradient-to-r ${categoryInfo.color} text-white border-0`}>
                {categoryInfo.label}
              </Badge>
            </div>

            {/* Status Badge */}
            {event.status === 'past' && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-slate-800/80 text-white">
                  {locale === 'id' ? 'Sudah Selesai' : 'Past Event'}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.name}</h1>

                {/* Share Buttons - Horizontal like filter */}
                <div className="flex items-center gap-2 mb-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="p-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-950/20 text-green-600 transition-colors shadow-sm"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>WhatsApp</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="p-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-blue-600 transition-colors shadow-sm"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Facebook</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="p-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors shadow-sm"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>X (Twitter)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleCopyLink}
                          className="p-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-amber-600 transition-colors shadow-sm"
                        >
                          <LinkIcon className="w-5 h-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {copied ? (locale === 'id' ? 'Tersalin!' : 'Copied!') : (locale === 'id' ? 'Salin Link' : 'Copy Link')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-white dark:bg-slate-800 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {event.fullDesc.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h3 className="font-semibold mb-4">
                  {locale === 'id' ? 'Informasi Event' : 'Event Information'}
                </h3>

                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {locale === 'id' ? 'Tanggal' : 'Date'}
                      </p>
                      <p className="font-medium text-sm">{event.date}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {locale === 'id' ? 'Waktu' : 'Time'}
                      </p>
                      <p className="font-medium text-sm">{event.time}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {locale === 'id' ? 'Lokasi' : 'Location'}
                      </p>
                      <p className="font-medium text-sm">{event.location}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {locale === 'id' ? 'Harga' : 'Price'}
                      </p>
                      <p className="font-medium text-sm text-green-600 dark:text-green-400">{event.price}</p>
                    </div>
                  </div>

                  {/* Age Limit */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {locale === 'id' ? 'Usia' : 'Age'}
                      </p>
                      <p className="font-medium text-sm">{event.ageLimit}</p>
                    </div>
                  </div>
                </div>

                {/* Organizer */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    {locale === 'id' ? 'Penyelenggara' : 'Organizer'}
                  </p>
                  <p className="font-medium">{event.organizer}</p>
                </div>

                {/* CTA Button */}
                {event.status === 'upcoming' && (
                  <Button className="w-full mt-6 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    {locale === 'id' ? 'Tambah ke Kalender' : 'Add to Calendar'}
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-12 bg-white/50 dark:bg-slate-900/50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'id' ? 'Event Lainnya' : 'Other Events'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((upcomingEvent) => (
                <Link
                  key={upcomingEvent.id}
                  href={`/${locale}/agenda-event/${upcomingEvent.slug}`}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={upcomingEvent.image}
                        alt={upcomingEvent.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={`bg-gradient-to-r ${categories[upcomingEvent.category].color} text-white border-0 text-xs`}>
                          {categories[upcomingEvent.category].label}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{upcomingEvent.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{upcomingEvent.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
