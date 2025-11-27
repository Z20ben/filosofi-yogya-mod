'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, ArrowLeft, Share2, Heart, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Helper function to generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface Spot {
  id: number;
  name: string;
  category: string;
  image: string;
  location: string;
  budget: string;
  hours: string;
  tags: string[];
  badges: string[];
  description: string;
  fullDescription?: string;
  facilities?: string[];
  tips?: string[];
  coordinates?: { lat: number; lng: number };
}

export default function SpotNongkrongDetailPage() {
  const t = useTranslations('spotNongkrong');
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  // Spots data
  const spots: Spot[] = locale === 'id' ? [
    {
      id: 1,
      name: 'Kopi Klotok Heritage',
      category: 'Cafe',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      location: 'Pakem, Sleman',
      budget: 'Rp 15-50k',
      hours: '07:00 - 22:00',
      tags: ['instagramable', 'cheap'],
      badges: ['Instagramable', 'Budget Friendly'],
      description: 'Cafe di alam terbuka dengan view pegunungan yang epic! Perfect buat foto-foto aesthetic.',
      fullDescription: 'Kopi Klotok Heritage adalah destinasi wajib bagi pecinta kopi dan alam. Terletak di kaki Gunung Merapi, cafe ini menawarkan pemandangan sawah yang menghijau dengan latar belakang gunung yang megah. Menu andalannya adalah Kopi Klotok yang disajikan dalam klotok (cangkir tradisional dari tanah liat) dengan aroma khas yang menggugah selera. Suasana yang tenang dan udara sejuk pegunungan membuat tempat ini ideal untuk bersantai sambil menikmati secangkir kopi.',
      facilities: ['Parkir Luas', 'WiFi Gratis', 'Mushola', 'Toilet Bersih', 'Spot Foto'],
      tips: ['Datang pagi untuk mendapat spot terbaik', 'Coba menu Kopi Klotok signature', 'Bawa jaket karena udara cukup dingin'],
      coordinates: { lat: -7.67013, lng: 110.42128 }
    },
    {
      id: 2,
      name: 'The Westlake Resto & Cafe',
      category: 'Cafe & Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      location: 'Sleman',
      budget: 'Rp 30-80k',
      hours: '10:00 - 22:00',
      tags: ['instagramable', 'night'],
      badges: ['Sunset View', 'Date Spot'],
      description: 'Cafe tepi danau dengan sunset view yang bikin feed IG kamu makin kece!',
      fullDescription: 'The Westlake Resto & Cafe menawarkan pengalaman bersantap romantis di tepi danau buatan yang indah. Saat sore hari, pemandangan matahari terbenam menciptakan suasana magis yang sempurna untuk kencan atau sekadar melepas penat. Menu yang disajikan beragam dari Western hingga Indonesian cuisine dengan kualitas premium.',
      facilities: ['Area Outdoor', 'Private Room', 'Live Acoustic', 'Valet Parking'],
      tips: ['Reservasi untuk weekend', 'Datang jam 5 sore untuk sunset', 'Coba menu fusion mereka'],
      coordinates: { lat: -7.74727, lng: 110.33835 }
    },
    {
      id: 3,
      name: 'Roaster & Bear',
      category: 'Coffee Shop',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      location: 'Jl. Margo Utomo',
      budget: 'Rp 20-60k',
      hours: '08:00 - 23:00',
      tags: ['instagramable', 'night', 'music'],
      badges: ['Live Music', 'Cozy Vibes'],
      description: 'Hidden gem dengan vibe industrial aesthetic. Sering ada live music weekend!',
      fullDescription: 'Roaster & Bear adalah coffee shop dengan konsep industrial yang unik di kawasan Prawirotaman. Interior dengan ekspos bata dan pipa-pipa memberi kesan raw yang artistic. Coffee mereka di-roast sendiri dengan biji pilihan dari berbagai daerah di Indonesia. Setiap weekend, tempat ini menghadirkan live acoustic music yang menambah kehangatan suasana.',
      facilities: ['WiFi Cepat', 'Stop Kontak', 'Board Games', 'Smoking Area'],
      tips: ['Cek jadwal live music di Instagram mereka', 'Pesan V60 untuk pengalaman kopi terbaik', 'Spot lantai 2 lebih tenang untuk kerja'],
      coordinates: { lat: -7.78442, lng: 110.36704 }
    },
    {
      id: 4,
      name: 'Warung Bu Ageng',
      category: 'Traditional Food',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      location: 'Jl. Tirtodipuran No.13, Mantrijeron',
      budget: 'Rp 10-30k',
      hours: '10:00 - 21:00',
      tags: ['cheap'],
      badges: ['Super Murah', 'Authentic'],
      description: 'Makan tradisional enak dengan harga mahasiswa banget. Recommended untuk makan bareng!',
      fullDescription: 'Warung Bu Ageng sudah menjadi legenda kuliner di kawasan Tirtodipuran. Menyajikan masakan Jawa autentik dengan cita rasa yang konsisten selama puluhan tahun. Menu favorit seperti Gudeg, Ayam Goreng Kampung, dan Sayur Lodeh selalu habis sebelum sore. Porsi yang besar dengan harga terjangkau menjadikan tempat ini favorit mahasiswa dan pekerja.',
      facilities: ['Parkir Motor', 'Makan di Tempat', 'Bungkus'],
      tips: ['Datang sebelum jam 12 untuk menu lengkap', 'Coba sambal koreknya yang legendaris', 'Bisa request tingkat kepedasan'],
      coordinates: { lat: -7.818075026450364, lng: 110.3641136935998 }
    },
    {
      id: 5,
      name: 'Pendopo Lawas',
      category: 'Resto & Lounge',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      location: 'Jl. Alun-Alun Utara',
      budget: 'Rp 25-100k',
      hours: '10:00 - 22:00',
      tags: ['instagramable', 'night', 'music'],
      badges: ['Traditional', 'Live Music'],
      description: 'Restoran dengan konsep pendopo Jawa klasik yang autentik!',
      fullDescription: 'Pendopo Lawas adalah restoran dengan konsep pendopo Jawa klasik yang menyajikan masakan tradisional Yogyakarta dalam suasana autentik. Bangunan bergaya Jawa dengan ornamen kayu dan pendopo yang luas menciptakan atmosfer klasik yang unik. Menu yang disajikan adalah masakan Jawa premium dengan presentasi modern. Sering ada pertunjukan live music gamelan dan tari tradisional.',
      facilities: ['Parkir', 'Toilet', 'Mushola', 'Live Music', 'Private Room'],
      tips: ['Cek jadwal pertunjukan musik tradisional', 'Reservasi untuk weekend', 'Coba menu rijsttafel mereka'],
      coordinates: { lat: -7.80413, lng: 110.36567 }
    },
    {
      id: 6,
      name: 'Taman Lampion Kaliurang',
      category: 'Outdoor',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      location: 'Kaliurang, Sleman',
      budget: 'Rp 25k',
      hours: '17:00 - 22:00',
      tags: ['instagramable', 'night', 'cheap'],
      badges: ['Night Spot', 'TikTok Viral'],
      description: 'Taman dengan ribuan lampion warna-warni! Viral di TikTok dan super instagramable.',
      fullDescription: 'Taman Lampion Kaliurang adalah destinasi wisata malam yang viral di media sosial. Ribuan lampion dengan berbagai bentuk dan warna menghiasi area taman, menciptakan suasana magical yang sempurna untuk foto. Terdapat berbagai spot foto tematik dan juga area kuliner yang menyajikan makanan khas Kaliurang.',
      facilities: ['Parkir Luas', 'Food Court', 'Spot Foto Tematik', 'Toilet'],
      tips: ['Datang saat magrib untuk melihat lampion dinyalakan', 'Bawa kamera dengan mode night', 'Weekend lebih ramai, datang lebih awal'],
      coordinates: { lat: -7.67013, lng: 110.42128 }
    }
  ] : [
    {
      id: 1,
      name: 'Kopi Klotok Heritage',
      category: 'Cafe',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      location: 'Pakem, Sleman',
      budget: 'IDR 15-50k',
      hours: '07:00 - 22:00',
      tags: ['instagramable', 'cheap'],
      badges: ['Instagramable', 'Budget Friendly'],
      description: 'Open-air cafe with epic mountain views! Perfect for aesthetic photoshoots.',
      fullDescription: 'Kopi Klotok Heritage is a must-visit destination for coffee and nature lovers. Located at the foot of Mount Merapi, this cafe offers views of green rice fields with a magnificent mountain backdrop. Their signature is Kopi Klotok served in a klotok (traditional clay cup) with a distinctive aroma. The peaceful atmosphere and cool mountain air make this place ideal for relaxing over a cup of coffee.',
      facilities: ['Large Parking', 'Free WiFi', 'Prayer Room', 'Clean Toilets', 'Photo Spots'],
      tips: ['Come early for the best spots', 'Try the signature Kopi Klotok', 'Bring a jacket as it can be chilly'],
      coordinates: { lat: -7.67013, lng: 110.42128 }
    },
    {
      id: 2,
      name: 'The Westlake Resto & Cafe',
      category: 'Cafe & Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      location: 'Sleman',
      budget: 'IDR 30-80k',
      hours: '10:00 - 22:00',
      tags: ['instagramable', 'night'],
      badges: ['Sunset View', 'Date Spot'],
      description: 'Lakeside cafe with sunset views that will level up your IG feed!',
      fullDescription: 'The Westlake Resto & Cafe offers a romantic dining experience by a beautiful artificial lake. In the evening, the sunset creates a magical atmosphere perfect for dates or unwinding. The menu ranges from Western to Indonesian cuisine with premium quality.',
      facilities: ['Outdoor Area', 'Private Room', 'Live Acoustic', 'Valet Parking'],
      tips: ['Make reservations for weekends', 'Arrive at 5 PM for sunset', 'Try their fusion menu'],
      coordinates: { lat: -7.74727, lng: 110.33835 }
    },
    {
      id: 3,
      name: 'Roaster & Bear',
      category: 'Coffee Shop',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      location: 'Jl. Margo Utomo',
      budget: 'IDR 20-60k',
      hours: '08:00 - 23:00',
      tags: ['instagramable', 'night', 'music'],
      badges: ['Live Music', 'Cozy Vibes'],
      description: 'Hidden gem with industrial aesthetic vibes. Live music on weekends!',
      fullDescription: 'Roaster & Bear is a coffee shop with a unique industrial concept in the Prawirotaman area. The interior with exposed brick and pipes gives an artistic raw impression. Their coffee is roasted in-house with selected beans from various regions in Indonesia. Every weekend, this place features live acoustic music that adds warmth to the atmosphere.',
      facilities: ['Fast WiFi', 'Power Outlets', 'Board Games', 'Smoking Area'],
      tips: ['Check their Instagram for live music schedule', 'Order V60 for the best coffee experience', 'Second floor is quieter for work'],
      coordinates: { lat: -7.78442, lng: 110.36704 }
    },
    {
      id: 4,
      name: 'Warung Bu Ageng',
      category: 'Traditional Food',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      location: 'Jl. Tirtodipuran No.13, Mantrijeron',
      budget: 'IDR 10-30k',
      hours: '10:00 - 21:00',
      tags: ['cheap'],
      badges: ['Super Cheap', 'Authentic'],
      description: 'Delicious traditional food at student prices. Recommended for group dining!',
      fullDescription: 'Warung Bu Ageng has become a culinary legend in the Tirtodipuran area. Serving authentic Javanese cuisine with consistent taste for decades. Favorite menus like Gudeg, Kampung Fried Chicken, and Sayur Lodeh always sell out before evening. Large portions at affordable prices make this a favorite among students and workers.',
      facilities: ['Motorcycle Parking', 'Dine-in', 'Takeaway'],
      tips: ['Come before noon for complete menu', 'Try the legendary korek sambal', 'Can request spice level'],
      coordinates: { lat: -7.818075026450364, lng: 110.3641136935998 }
    },
    {
      id: 5,
      name: 'Pendopo Lawas',
      category: 'Resto & Lounge',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      location: 'Jl. Alun-Alun Utara',
      budget: 'IDR 25-100k',
      hours: '10:00 - 22:00',
      tags: ['instagramable', 'night', 'music'],
      badges: ['Traditional', 'Live Music'],
      description: 'Restaurant with authentic classic Javanese pendopo concept!',
      fullDescription: 'Pendopo Lawas is a restaurant with a classic Javanese pendopo concept serving traditional Yogyakarta cuisine in an authentic atmosphere. The Javanese-style building with wooden ornaments and spacious pendopo creates a unique classic atmosphere. The menu features premium Javanese cuisine with modern presentation. There are often live gamelan music and traditional dance performances.',
      facilities: ['Parking', 'Toilets', 'Prayer Room', 'Live Music', 'Private Room'],
      tips: ['Check schedule for traditional music performances', 'Make reservations for weekends', 'Try their rijsttafel menu'],
      coordinates: { lat: -7.80413, lng: 110.36567 }
    },
    {
      id: 6,
      name: 'Taman Lampion Kaliurang',
      category: 'Outdoor',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      location: 'Kaliurang, Sleman',
      budget: 'IDR 25k',
      hours: '17:00 - 22:00',
      tags: ['instagramable', 'night', 'cheap'],
      badges: ['Night Spot', 'TikTok Viral'],
      description: 'Park with thousands of colorful lanterns! Viral on TikTok and super instagramable.',
      fullDescription: 'Taman Lampion Kaliurang is a viral night tourism destination on social media. Thousands of lanterns in various shapes and colors decorate the park area, creating a magical atmosphere perfect for photos. There are various themed photo spots and a culinary area serving Kaliurang specialties.',
      facilities: ['Large Parking', 'Food Court', 'Themed Photo Spots', 'Toilets'],
      tips: ['Arrive at dusk to see lanterns being lit', 'Bring a camera with night mode', 'Weekends are busier, arrive early'],
      coordinates: { lat: -7.67013, lng: 110.42128 }
    }
  ];

  // Find the spot by slug
  const spot = spots.find(s => generateSlug(s.name) === slug);

  // Get related spots (same tags, excluding current)
  const relatedSpots = spot
    ? spots.filter(s => s.id !== spot.id && s.tags.some(tag => spot.tags.includes(tag))).slice(0, 3)
    : [];

  if (!spot) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {locale === 'id' ? 'Spot Tidak Ditemukan' : 'Spot Not Found'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {locale === 'id' ? 'Spot yang kamu cari tidak tersedia.' : 'The spot you are looking for is not available.'}
          </p>
          <Link href={`/${locale}/spot-nongkrong`}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'id' ? 'Kembali ke Daftar' : 'Back to List'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src={spot.image}
            alt={spot.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href={`/${locale}/spot-nongkrong`}>
            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm hover:bg-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === 'id' ? 'Kembali' : 'Back'}
            </Button>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto max-w-6xl">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 mb-3">
              {spot.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {spot.name}
            </h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span>{spot.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  {locale === 'id' ? 'Tentang Tempat Ini' : 'About This Place'}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {spot.fullDescription || spot.description}
                </p>
              </motion.div>

              {/* Facilities */}
              {spot.facilities && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {locale === 'id' ? 'Fasilitas' : 'Facilities'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {spot.facilities.map((facility, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
                      >
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tips */}
              {spot.tips && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {locale === 'id' ? 'Tips Berkunjung' : 'Visiting Tips'}
                  </h2>
                  <ul className="space-y-3">
                    {spot.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-2 border-orange-100 dark:border-orange-900/30">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">
                      {locale === 'id' ? 'Informasi' : 'Information'}
                    </h3>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {locale === 'id' ? 'Estimasi Budget' : 'Estimated Budget'}
                        </p>
                        <p className="font-semibold">{spot.budget}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {locale === 'id' ? 'Jam Operasional' : 'Operating Hours'}
                        </p>
                        <p className="font-semibold">{spot.hours}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-rose-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {locale === 'id' ? 'Lokasi' : 'Location'}
                        </p>
                        <p className="font-semibold">{spot.location}</p>
                      </div>
                    </div>

                    {spot.coordinates && (
                      <Link href={`/${locale}/map?lat=${spot.coordinates.lat}&lng=${spot.coordinates.lng}&location=${encodeURIComponent(slug)}`}>
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                          <Navigation className="w-4 h-4 mr-2" />
                          {locale === 'id' ? 'Lihat di Peta' : 'View on Map'}
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {spot.badges.map((badge, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Related Spots */}
          {relatedSpots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'id' ? 'Spot Serupa' : 'Similar Spots'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedSpots.map((relatedSpot) => (
                  <Link key={relatedSpot.id} href={`/${locale}/spot-nongkrong/${generateSlug(relatedSpot.name)}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-800 cursor-pointer h-full">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={relatedSpot.image}
                          alt={relatedSpot.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                            {relatedSpot.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{relatedSpot.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                          <MapPin className="w-3 h-3" />
                          <span>{relatedSpot.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
