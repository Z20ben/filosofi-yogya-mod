'use client';

import { use, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  Bookmark,
  Clock,
  TrendingUp,
  Flame,
  Sparkles,
  Tag,
  ChevronLeft,
  ChevronRight,
  Share,
  User,
  Calendar
} from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/shared/SocialShare';

interface TrendingDetailData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: number;
  trendingBadge: 'viral' | 'hot' | 'new' | 'rising';
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  publishedDate: string;
  relatedArticles: Array<{
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    trendingBadge: 'viral' | 'hot' | 'new' | 'rising';
  }>;
}

// Mock Articles Database - In production, this would come from API/CMS
const getTrendingArticles = (locale: string): TrendingDetailData[] => {
  if (locale === 'id') {
    return [
      {
    id: 1,
    title: '5 Spot Nongkrong Hidden Gem yang Lagi Viral di Jogja!',
    slug: '5-spot-nongkrong-hidden-gem-viral-jogja',
    excerpt: 'Tempat nongkrong aesthetic yang belum banyak orang tau tapi super Instagram-able!',
    content: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">Jogja memang nggak pernah kehabisan tempat nongkrong yang keren. Tapi kali ini, kita bakal bahas 5 hidden gem yang baru-baru ini viral di kalangan anak muda!</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">1. Kopi Klotok Heritage</h2>
        <p class="leading-relaxed">Tempat ini menggabungkan konsep traditional Javanese architecture dengan sentuhan modern minimalist. Instagrammable banget!</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">2. Rooftop Garden Malioboro</h2>
        <p class="leading-relaxed">Siapa sangka di tengah hiruk pikuk Malioboro ada rooftop garden yang super cozy? View nya amazing, cocok buat sunset vibes!</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">3. Omah Dhuwur Cafe</h2>
        <p class="leading-relaxed">Literally rumah joglo yang dimodifikasi jadi cafe. Nuansa klasik tapi dengan interior yang modern dan aesthetic.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">4. The Secret Garden Prambanan</h2>
        <p class="leading-relaxed">Hidden di area Prambanan, cafe ini punya garden yang bikin kamu serasa di Bali. Perfect buat foto-foto aesthetic!</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">5. Urban Forest Cafe</h2>
        <p class="leading-relaxed">Konsep urban jungle yang nggak cuma di Jakarta! Cafe ini punya vibe yang super fresh dengan banyak tanaman everywhere.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Tips Berkunjung</h2>
        <ul class="list-disc list-inside space-y-2 leading-relaxed">
          <li>Datang saat weekday kalau mau lebih sepi dan puas foto-foto</li>
          <li>Book dulu kalau weekend karena biasanya fully booked</li>
          <li>Bawa kamera/HP yang bagus buat maksimalin foto</li>
          <li>Cek jam operasional di Instagram mereka sebelum datang</li>
        </ul>
      </div>
    `,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80',
    category: 'Kuliner & Nongkrong',
    readTime: 5,
    trendingBadge: 'viral',
    tags: ['cafe', 'instagramable', 'hits', 'jogja', 'nongkrong'],
    author: {
      name: 'Rina Kusuma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
    },
    stats: {
      views: 45230,
      likes: 3420,
      comments: 234,
      shares: 567
    },
    publishedDate: '2 hari yang lalu',
    relatedArticles: [
      {
        id: 2,
        title: 'Filosofi Tugu Jogja yang Ternyata Relate Banget',
        slug: 'filosofi-tugu-jogja-relate-kehidupan',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
        category: 'Sejarah & Filosofi',
        trendingBadge: 'hot'
      },
      {
        id: 3,
        title: 'Thread: Mitos vs Fakta Keraton Jogja',
        slug: 'mitos-fakta-keraton-jogja-merinding',
        image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80',
        category: 'Sejarah & Budaya',
        trendingBadge: 'viral'
      },
      {
        id: 4,
        title: 'UMKM Batik Jogja Collab Streetwear!',
        slug: 'umkm-batik-jogja-collab-streetwear',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80',
        category: 'UMKM & Fashion',
        trendingBadge: 'new'
      }
    ]
  },
  // Article 2
  {
    id: 2,
        title: 'Filosofi Tugu Jogja yang Ternyata Relate Banget Sama Kehidupan Kita',
        slug: 'filosofi-tugu-jogja-relate-kehidupan',
        excerpt: 'Mind-blowing! Makna di balik Tugu Jogja ternyata deep banget dan relevan dengan anak muda masa kini.',
        content: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed">Tugu Jogja bukan cuma landmark kota aja, guys! Ada makna filosofis yang deep banget di baliknya yang ternyata relate sama kehidupan kita.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Simbol Persatuan</h2>
            <p class="leading-relaxed">Tugu ini sebenarnya simbol dari persatuan empat elemen penting: Sultan, rakyat, laut selatan, dan Gunung Merapi. Ini mengajarkan kita tentang harmoni dan balance dalam hidup.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Filosofi "Manunggaling Kawula Gusti"</h2>
            <p class="leading-relaxed">Konsep penyatuan antara hamba dan Tuhan ini deep banget. Dalam konteks modern, ini bisa diartikan sebagai pencarian makna hidup dan tujuan kita.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Desain yang Bermakna</h2>
            <p class="leading-relaxed">Setiap bagian tugu punya arti: tinggi 15 meter melambangkan tanggal 15, diameter 117 cm melambangkan tanggal 1 dan 17. Semuanya merujuk pada hari kemerdekaan Indonesia!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Relevansi untuk Anak Muda</h2>
            <p class="leading-relaxed">Di era yang serba instant ini, filosofi tugu mengajarkan kita tentang pentingnya tetap grounded, menghargai identitas, dan mencari keseimbangan dalam hidup.</p>
          </div>
        `,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
        category: 'Sejarah & Filosofi',
        readTime: 7,
        trendingBadge: 'hot',
        tags: ['filosofi', 'viral', 'mindblowing', 'budaya'],
        author: {
          name: 'Budi Santoso',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
        },
        stats: {
          views: 38520,
          likes: 2850,
          comments: 189,
          shares: 423
        },
        publishedDate: '3 hari yang lalu',
        relatedArticles: [
          {
            id: 1,
            title: '5 Spot Nongkrong Hidden Gem yang Lagi Viral di Jogja!',
            slug: '5-spot-nongkrong-hidden-gem-viral-jogja',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
            category: 'Kuliner & Nongkrong',
            trendingBadge: 'viral'
          },
          {
            id: 3,
            title: 'Thread: Mitos vs Fakta Keraton Jogja',
            slug: 'mitos-fakta-keraton-jogja-merinding',
            image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80',
            category: 'Sejarah & Budaya',
            trendingBadge: 'viral'
          },
          {
            id: 4,
            title: 'UMKM Batik Jogja Collab Streetwear!',
            slug: 'umkm-batik-jogja-collab-streetwear',
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80',
            category: 'UMKM & Fashion',
            trendingBadge: 'new'
          }
        ]
      },
      // Article 3
      {
        id: 3,
        title: 'Thread: Mitos vs Fakta Tentang Keraton Jogja yang Bikin Merinding',
        slug: 'mitos-fakta-keraton-jogja-merinding',
        excerpt: 'Kalian pasti belum tau fakta-fakta ini tentang Keraton! Prepare to be shook.',
        content: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed">Thread viral tentang Keraton Jogja yang bikin merinding! Mari kita bedah mitos dan fakta yang selama ini beredar.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mitos: Keraton Punya Penunggu Gaib</h2>
            <p class="leading-relaxed"><strong>Fakta:</strong> Keraton memang memiliki tradisi spiritual yang kuat dan dihormati. Ada ritual-ritual khusus yang dilakukan untuk menjaga keseimbangan spiritual dan budaya.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mitos: Foto di Keraton Bisa Bermasalah</h2>
            <p class="leading-relaxed"><strong>Fakta:</strong> Boleh foto, tapi dengan etika. Hindari area-area sakral tertentu dan selalu minta izin guide. Ini lebih tentang menghormati budaya daripada mistis.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Fakta Menarik: Arsitektur Penuh Makna</h2>
            <p class="leading-relaxed">Setiap sudut Keraton punya filosofi. Dari jumlah pilar, bentuk atap, hingga tata ruang semuanya mengandung makna cosmology Jawa yang kompleks.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Fakta: Masih Berfungsi sebagai Istana</h2>
            <p class="leading-relaxed">Berbeda dengan istana-istana di negara lain yang jadi museum, Keraton Jogja masih aktif sebagai kediaman Sultan dan pusat kebudayaan Jawa.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Tips Berkunjung</h2>
            <ul class="list-disc list-inside space-y-2 leading-relaxed">
              <li>Datang pagi hari untuk menghindari keramaian</li>
              <li>Pakai pakaian sopan dan tertutup</li>
              <li>Ambil guide untuk dapat penjelasan lengkap</li>
              <li>Hormati aturan dan tradisi setempat</li>
            </ul>
          </div>
        `,
        image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=1200&q=80',
        category: 'Sejarah & Budaya',
        readTime: 6,
        trendingBadge: 'viral',
        tags: ['keraton', 'sejarah', 'thread', 'viral'],
        author: {
          name: 'Siti Nurhaliza',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
        },
        stats: {
          views: 52100,
          likes: 4120,
          comments: 312,
          shares: 689
        },
        publishedDate: '1 hari yang lalu',
        relatedArticles: [
          {
            id: 1,
            title: '5 Spot Nongkrong Hidden Gem yang Lagi Viral di Jogja!',
            slug: '5-spot-nongkrong-hidden-gem-viral-jogja',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
            category: 'Kuliner & Nongkrong',
            trendingBadge: 'viral'
          },
          {
            id: 2,
            title: 'Filosofi Tugu Jogja yang Ternyata Relate Banget',
            slug: 'filosofi-tugu-jogja-relate-kehidupan',
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
            category: 'Sejarah & Filosofi',
            trendingBadge: 'hot'
          },
          {
            id: 6,
            title: 'Kuliner Legendaris Jogja yang Hits Lagi di TikTok',
            slug: 'kuliner-legendaris-jogja-hits-tiktok',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            category: 'Kuliner',
            trendingBadge: 'hot'
          }
        ]
      },
      // Article 4
      {
        id: 4,
        title: 'UMKM Batik Jogja yang Collab Sama Brand Streetwear!',
        slug: 'umkm-batik-jogja-collab-streetwear',
        excerpt: 'Batik meets streetwear culture! Kolaborasi yang gak nyangka tapi hasilnya fire 🔥',
        content: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed">Who says batik cuma buat acara formal? UMKM batik di Jogja ini collab sama brand streetwear dan hasilnya beyond expectations!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Batik Meets Urban Culture</h2>
            <p class="leading-relaxed">Kolaborasi ini menggabungkan motif batik tradisional dengan desain streetwear modern. Hoodie batik? Check! Snapback dengan aksen batik? Check!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Cerita di Balik Kolaborasi</h2>
            <p class="leading-relaxed">Dimulai dari pertemuan tidak sengaja antara pembatik generasi ketiga dengan designer streetwear muda. Mereka share vision tentang melestarikan batik dengan cara yang fresh.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Produk-Produk Andalan</h2>
            <ul class="list-disc list-inside space-y-2 leading-relaxed">
              <li>Oversized Tee dengan print batik digital</li>
              <li>Bomber jacket dengan lining batik cap</li>
              <li>Tote bag canvas dengan patch batik</li>
              <li>Bucket hat dengan motif batik Parang</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Impact untuk UMKM</h2>
            <p class="leading-relaxed">Kolaborasi ini nggak cuma menghasilkan produk keren, tapi juga membuka pasar baru untuk UMKM batik. Anak muda jadi lebih appreciate batik tanpa harus pakai dalam konteks formal.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Dimana Bisa Beli?</h2>
            <p class="leading-relaxed">Produk-produk ini available di beberapa streetwear store di Jogja dan bisa order online. Limited edition, so cepetan sebelum sold out!</p>
          </div>
        `,
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=1200&q=80',
        category: 'UMKM & Fashion',
        readTime: 4,
        trendingBadge: 'new',
        tags: ['batik', 'fashion', 'umkm', 'streetwear'],
        author: {
          name: 'Ahmad Rizki',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
        },
        stats: {
          views: 29800,
          likes: 2340,
          comments: 156,
          shares: 378
        },
        publishedDate: '5 hari yang lalu',
        relatedArticles: [
          {
            id: 1,
            title: '5 Spot Nongkrong Hidden Gem yang Lagi Viral di Jogja!',
            slug: '5-spot-nongkrong-hidden-gem-viral-jogja',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
            category: 'Kuliner & Nongkrong',
            trendingBadge: 'viral'
          },
          {
            id: 5,
            title: 'Event Seni & Budaya Gratis di Jogja Bulan Ini',
            slug: 'event-seni-budaya-gratis-jogja',
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
            category: 'Agenda & Event',
            trendingBadge: 'rising'
          },
          {
            id: 6,
            title: 'Kuliner Legendaris Jogja yang Hits Lagi di TikTok',
            slug: 'kuliner-legendaris-jogja-hits-tiktok',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            category: 'Kuliner',
            trendingBadge: 'hot'
          }
        ]
      },
      // Article 5
      {
        id: 5,
        title: 'Event Seni & Budaya Gratis di Jogja Bulan Ini - Jangan Sampe Kelewat!',
        slug: 'event-seni-budaya-gratis-jogja',
        excerpt: 'List lengkap event seru yang free dan worth it banget untuk dikunjungi!',
        content: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed">Jogja bulan ini full dengan event seni dan budaya yang GRATIS! Nih gue kasih list lengkapnya, jangan sampe nyesel ketinggalan!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">1. Pagelaran Wayang Kulit di Alun-Alun</h2>
            <p class="leading-relaxed"><strong>Tanggal:</strong> Setiap Sabtu malam<br><strong>Lokasi:</strong> Alun-Alun Kidul<br>Nonton wayang sambil ngopi dan jajan angkringan. Free dan bisa dateng jam berapa aja!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">2. Jogja Art Fair 2024</h2>
            <p class="leading-relaxed"><strong>Tanggal:</strong> 15-20 bulan ini<br><strong>Lokasi:</strong> Taman Budaya Yogyakarta<br>Exhibition karya seniman lokal, workshop gratis, dan meet & greet dengan seniman terkenal.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">3. Traditional Music Festival</h2>
            <p class="leading-relaxed"><strong>Tanggal:</strong> 22-23 bulan ini<br><strong>Lokasi:</strong> Benteng Vredeburg<br>Gamelan fusion, kolaborasi musik tradisional modern. Entry free, worth it banget!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">4. Batik Exhibition & Workshop</h2>
            <p class="leading-relaxed"><strong>Tanggal:</strong> Setiap hari, 10.00-16.00<br><strong>Lokasi:</strong> Museum Batik<br>Lihat koleksi batik langka dan ikut workshop membatik gratis (terbatas 20 orang/hari).</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">5. Film Screening: Indonesian Cinema</h2>
            <p class="leading-relaxed"><strong>Tanggal:</strong> Setiap Jumat malam<br><strong>Lokasi:</strong> Sangkring Art Space<br>Nonton film indie Indonesia dengan diskusi bareng sutradara. Gratis, tinggal daftar online aja.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Tips Ikut Event</h2>
            <ul class="list-disc list-inside space-y-2 leading-relaxed">
              <li>Datang lebih awal karena kapasitas terbatas</li>
              <li>Bawa botol minum sendiri</li>
              <li>Follow Instagram penyelenggara untuk update</li>
              <li>Ajak temen biar lebih seru!</li>
            </ul>
          </div>
        `,
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
        category: 'Agenda & Event',
        readTime: 8,
        trendingBadge: 'rising',
        tags: ['event', 'gratis', 'budaya', 'seni'],
        author: {
          name: 'Dewi Lestari',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80'
        },
        stats: {
          views: 35600,
          likes: 2890,
          comments: 203,
          shares: 512
        },
        publishedDate: '4 hari yang lalu',
        relatedArticles: [
          {
            id: 2,
            title: 'Filosofi Tugu Jogja yang Ternyata Relate Banget',
            slug: 'filosofi-tugu-jogja-relate-kehidupan',
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
            category: 'Sejarah & Filosofi',
            trendingBadge: 'hot'
          },
          {
            id: 3,
            title: 'Thread: Mitos vs Fakta Keraton Jogja',
            slug: 'mitos-fakta-keraton-jogja-merinding',
            image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80',
            category: 'Sejarah & Budaya',
            trendingBadge: 'viral'
          },
          {
            id: 4,
            title: 'UMKM Batik Jogja Collab Streetwear!',
            slug: 'umkm-batik-jogja-collab-streetwear',
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80',
            category: 'UMKM & Fashion',
            trendingBadge: 'new'
          }
        ]
      },
      // Article 6
      {
        id: 6,
        title: 'Kuliner Legendaris Jogja yang Hits Lagi di TikTok',
        slug: 'kuliner-legendaris-jogja-hits-tiktok',
        excerpt: 'Warung-warung jadul yang mendadak viral karena TikTok. Worth the hype!',
        content: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed">TikTok bikin warung-warung legendaris Jogja yang udah puluhan tahun buka jadi viral lagi! Ini dia list kuliner yang lagi hits dan worth the hype!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">1. Gudeg Yu Djum</h2>
            <p class="leading-relaxed">Gudeg legendaris yang udah ada sejak 1950-an ini viral lagi karena video TikTok yang menunjukkan proses masak tradisionalnya. Antrian panjang tapi worth it!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">2. Bakmi Jawa Mbah Hadi</h2>
            <p class="leading-relaxed">Bakmi dengan resep turun temurun yang nggak pernah berubah. Viral karena video mukbang-nya yang bikin ngiler. Rasa autentik dan harga masih terjangkau!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">3. Angkringan Lik Man</h2>
            <p class="leading-relaxed">Angkringan legendaris yang buka dari jam 5 sore sampai pagi. Viral karena ambience-nya yang cozy dan harga nasi kucing yang masih 3000-an!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">4. Sate Klathak Pak Pong</h2>
            <p class="leading-relaxed">Sate kambing yang dibakar pakai tusuk besi dan arang kayu. Teknik masak unik ini bikin viral di TikTok. Empuk, bumbu meresap, dan nggak bau prengus!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">5. Wedang Ronde Mbah Karto</h2>
            <p class="leading-relaxed">Wedang ronde dengan ronde isi kacang yang lumer di mulut. Viral karena videonya yang aesthetic dan nostalgia childhood memories!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Tips Makan di Warung Legendaris</h2>
            <ul class="list-disc list-inside space-y-2 leading-relaxed">
              <li>Datang di luar jam makan siang/malam untuk avoid antrian</li>
              <li>Siapkan cash karena kebanyakan belum terima e-wallet</li>
              <li>Jangan bandingkan dengan taste modern, appreciate authenticity-nya</li>
              <li>Respect antrian dan local customers yang udah langganan puluhan tahun</li>
            </ul>
          </div>
        `,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
        category: 'Kuliner',
        readTime: 5,
        trendingBadge: 'hot',
        tags: ['kuliner', 'viral', 'tiktok', 'legendaris'],
        author: {
          name: 'Rina Kusuma',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
        },
        stats: {
          views: 48900,
          likes: 3780,
          comments: 267,
          shares: 634
        },
        publishedDate: '1 hari yang lalu',
        relatedArticles: [
          {
            id: 1,
            title: '5 Spot Nongkrong Hidden Gem yang Lagi Viral di Jogja!',
            slug: '5-spot-nongkrong-hidden-gem-viral-jogja',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
            category: 'Kuliner & Nongkrong',
            trendingBadge: 'viral'
          },
          {
            id: 3,
            title: 'Thread: Mitos vs Fakta Keraton Jogja',
            slug: 'mitos-fakta-keraton-jogja-merinding',
            image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80',
            category: 'Sejarah & Budaya',
            trendingBadge: 'viral'
          },
          {
            id: 5,
            title: 'Event Seni & Budaya Gratis di Jogja Bulan Ini',
            slug: 'event-seni-budaya-gratis-jogja',
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
            category: 'Agenda & Event',
            trendingBadge: 'rising'
          }
        ]
      }
    ]
  } else {
    // English version with similar structure
    return [
      {
        id: 1,
        title: '5 Hidden Gem Hangout Spots Going Viral in Yogya!',
        slug: '5-hidden-gem-hangout-spots-viral-yogya',
        excerpt: 'Aesthetic spots that are still under the radar but super Instagram-worthy!',
        content: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed">Yogyakarta never runs out of cool hangout places. But this time, we'll discuss 5 hidden gems that have recently gone viral among young people!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">1. Kopi Klotok Heritage</h2>
            <p class="leading-relaxed">This place combines traditional Javanese architecture with modern minimalist touches. Super Instagrammable!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">2. Rooftop Garden Malioboro</h2>
            <p class="leading-relaxed">Who knew that in the midst of bustling Malioboro there's a super cozy rooftop garden? Amazing views, perfect for sunset vibes!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">3. Omah Dhuwur Cafe</h2>
            <p class="leading-relaxed">Literally a joglo house modified into a cafe. Classic ambiance but with modern and aesthetic interior.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">4. The Secret Garden Prambanan</h2>
            <p class="leading-relaxed">Hidden in the Prambanan area, this cafe has a garden that makes you feel like you're in Bali. Perfect for aesthetic photos!</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">5. Urban Forest Cafe</h2>
            <p class="leading-relaxed">Urban jungle concept that's not just in Jakarta! This cafe has super fresh vibes with plants everywhere.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Visiting Tips</h2>
            <ul class="list-disc list-inside space-y-2 leading-relaxed">
              <li>Come on weekdays if you want it less crowded and satisfying photo sessions</li>
              <li>Book ahead if visiting on weekends as it's usually fully booked</li>
              <li>Bring a good camera/phone to maximize photos</li>
              <li>Check their operating hours on Instagram before coming</li>
            </ul>
          </div>
        `,
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80',
        category: 'Culinary & Hangouts',
        readTime: 5,
        trendingBadge: 'viral',
        tags: ['cafe', 'instagramable', 'trending', 'yogya', 'hangout'],
        author: {
          name: 'Rina Kusuma',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
        },
        stats: {
          views: 45230,
          likes: 3420,
          comments: 234,
          shares: 567
        },
        publishedDate: '2 days ago',
        relatedArticles: [
          {
            id: 2,
            title: 'Tugu Monument Philosophy That Relates to Life',
            slug: 'tugu-monument-philosophy-relates-to-life',
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
            category: 'History & Philosophy',
            trendingBadge: 'hot'
          },
          {
            id: 3,
            title: 'Thread: Myths vs Facts About Yogyakarta Palace',
            slug: 'myths-facts-yogyakarta-palace-shocking',
            image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80',
            category: 'History & Culture',
            trendingBadge: 'viral'
          },
          {
            id: 4,
            title: 'Batik MSME Collabs with Streetwear!',
            slug: 'batik-msme-collabs-streetwear-brand',
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80',
            category: 'MSME & Fashion',
            trendingBadge: 'new'
          }
          
        ],
      },
      // Add other English articles 2-6 with same structure as ID (simplified for demo)
      {
        id: 2,
        title: 'Tugu Monument Philosophy That Actually Relates to Our Lives',
        slug: 'filosofi-tugu-jogja-relate-kehidupan',
        excerpt: 'Mind-blowing! The meaning behind Tugu Jogja is so deep and relevant to today\'s youth.',
        content: `<div class="space-y-6"><p class="text-lg leading-relaxed">Tugu Jogja is more than just a city landmark! There's a deep philosophical meaning behind it.</p></div>`,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
        category: 'History & Philosophy',
        readTime: 7,
        trendingBadge: 'hot',
        tags: ['philosophy', 'viral'],
        author: { name: 'Budi Santoso', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
        stats: { views: 38520, likes: 2850, comments: 189, shares: 423 },
        publishedDate: '3 days ago',
        relatedArticles: [
          { id: 1, title: '5 Hidden Gem Hangout Spots Going Viral in Yogya!', slug: '5-hidden-gem-hangout-spots-viral-yogya', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', category: 'Culinary & Hangouts', trendingBadge: 'viral' },
          { id: 3, title: 'Thread: Myths vs Facts About Yogyakarta Palace', slug: 'mitos-fakta-keraton-jogja-merinding', image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80', category: 'History & Culture', trendingBadge: 'viral' },
          { id: 4, title: 'Batik MSME Collabs with Streetwear!', slug: 'umkm-batik-jogja-collab-streetwear', image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80', category: 'MSME & Fashion', trendingBadge: 'new' }
        ]
      },
      { id: 3, title: 'Thread: Myths vs Facts About Yogyakarta Palace', slug: 'mitos-fakta-keraton-jogja-merinding', excerpt: 'Prepare to be shook!', content: `<div class="space-y-6"><p>Viral thread about Keraton Jogja!</p></div>`, image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=1200&q=80', category: 'History & Culture', readTime: 6, trendingBadge: 'viral', tags: ['palace', 'history'], author: { name: 'Siti Nurhaliza', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' }, stats: { views: 52100, likes: 4120, comments: 312, shares: 689 }, publishedDate: '1 day ago', relatedArticles: [{ id: 1, title: '5 Hidden Gem Hangout Spots', slug: '5-hidden-gem-hangout-spots-viral-yogya', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', category: 'Culinary', trendingBadge: 'viral' }, { id: 2, title: 'Tugu Monument Philosophy', slug: 'filosofi-tugu-jogja-relate-kehidupan', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', category: 'History', trendingBadge: 'hot' }, { id: 6, title: 'Legendary Food on TikTok', slug: 'kuliner-legendaris-jogja-hits-tiktok', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', category: 'Culinary', trendingBadge: 'hot' }] },
      { id: 4, title: 'Batik MSME Collabs with Streetwear!', slug: 'umkm-batik-jogja-collab-streetwear', excerpt: 'Unexpected collab!', content: `<div class="space-y-6"><p>Batik meets streetwear culture!</p></div>`, image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=1200&q=80', category: 'MSME & Fashion', readTime: 4, trendingBadge: 'new', tags: ['batik', 'fashion'], author: { name: 'Ahmad Rizki', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' }, stats: { views: 29800, likes: 2340, comments: 156, shares: 378 }, publishedDate: '5 days ago', relatedArticles: [{ id: 1, title: '5 Hidden Gem', slug: '5-hidden-gem-hangout-spots-viral-yogya', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', category: 'Culinary', trendingBadge: 'viral' }, { id: 5, title: 'Free Events', slug: 'event-seni-budaya-gratis-jogja', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', category: 'Events', trendingBadge: 'rising' }, { id: 6, title: 'Food on TikTok', slug: 'kuliner-legendaris-jogja-hits-tiktok', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', category: 'Culinary', trendingBadge: 'hot' }] },
      { id: 5, title: 'Free Art & Culture Events in Jogja This Month', slug: 'event-seni-budaya-gratis-jogja', excerpt: 'Don\'t miss out!', content: `<div class="space-y-6"><p>Jogja is full of FREE events!</p></div>`, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80', category: 'Events & Agenda', readTime: 8, trendingBadge: 'rising', tags: ['events', 'free'], author: { name: 'Dewi Lestari', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' }, stats: { views: 35600, likes: 2890, comments: 203, shares: 512 }, publishedDate: '4 days ago', relatedArticles: [{ id: 2, title: 'Philosophy', slug: 'filosofi-tugu-jogja-relate-kehidupan', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', category: 'History', trendingBadge: 'hot' }, { id: 3, title: 'Palace Facts', slug: 'mitos-fakta-keraton-jogja-merinding', image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80', category: 'History', trendingBadge: 'viral' }, { id: 4, title: 'Batik Streetwear', slug: 'umkm-batik-jogja-collab-streetwear', image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80', category: 'Fashion', trendingBadge: 'new' }] },
      { id: 6, title: 'Legendary Jogja Street Food Going Viral on TikTok', slug: 'kuliner-legendaris-jogja-hits-tiktok', excerpt: 'Worth the hype!', content: `<div class="space-y-6"><p>Old-school warungs going viral!</p></div>`, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', category: 'Culinary', readTime: 5, trendingBadge: 'hot', tags: ['culinary', 'viral'], author: { name: 'Rina Kusuma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' }, stats: { views: 48900, likes: 3780, comments: 267, shares: 634 }, publishedDate: '1 day ago', relatedArticles: [{ id: 1, title: '5 Hidden Gem', slug: '5-hidden-gem-hangout-spots-viral-yogya', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', category: 'Culinary', trendingBadge: 'viral' }, { id: 3, title: 'Palace', slug: 'mitos-fakta-keraton-jogja-merinding', image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80', category: 'History', trendingBadge: 'viral' }, { id: 5, title: 'Events', slug: 'event-seni-budaya-gratis-jogja', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', category: 'Events', trendingBadge: 'rising' }] }
    ];
  }
};

export default function TrendingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const locale = useLocale();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  // Get all articles
  const allArticles = getTrendingArticles(locale);

  // Find article by slug
  const article = allArticles.find(a => a.slug === slug);

  // If article not found, redirect to trending list
  if (!article) {
    router.push(`/${locale}/trending`);
    return null;
  }

  const getBadgeConfig = (badge: string) => {
    const configs = {
      viral: {
        icon: Flame,
        color: 'bg-gradient-to-r from-red-500 to-orange-500',
        text: locale === 'id' ? 'VIRAL' : 'VIRAL'
      },
      hot: {
        icon: TrendingUp,
        color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
        text: locale === 'id' ? 'HOT' : 'HOT'
      },
      new: {
        icon: Sparkles,
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        text: locale === 'id' ? 'BARU' : 'NEW'
      },
      rising: {
        icon: TrendingUp,
        color: 'bg-gradient-to-r from-purple-500 to-pink-500',
        text: locale === 'id' ? 'NAIK' : 'RISING'
      }
    };
    return configs[badge as keyof typeof configs];
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const badgeConfig = getBadgeConfig(article.trendingBadge);
  const BadgeIcon = badgeConfig.icon;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % article.relatedArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + article.relatedArticles.length) % article.relatedArticles.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-950 dark:via-orange-950/20 dark:to-amber-950/20">
      {/* Hero Section - TikTok/Story Style */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        </motion.div>

        {/* Floating Navigation */}
        <motion.div
          style={{ opacity }}
          className="absolute top-0 left-0 right-0 z-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">{locale === 'id' ? 'Kembali' : 'Back'}</span>
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full backdrop-blur-md transition-colors ${
                    isBookmarked
                      ? 'bg-orange-500 text-white'
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Badge & Category */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className={`${badgeConfig.color} px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg`}>
                  <BadgeIcon className="w-4 h-4 text-white" />
                  <span className="text-sm font-black text-white">{badgeConfig.text}</span>
                </div>
                <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-orange-600 dark:text-orange-400 px-4 py-1.5 text-sm font-semibold">
                  {article.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl leading-tight max-w-4xl">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 flex-wrap text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-white/50"
                  />
                  <span className="font-semibold">{article.author.name}</span>
                </div>
                <span>•</span>
                <span>{article.publishedDate}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} {locale === 'id' ? 'menit baca' : 'min read'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5" />
                #{tag}
              </span>
            ))}
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-slate-100
              prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-slate-100
              prose-ul:text-slate-700 dark:prose-ul:text-slate-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Floating Action Bar - Article Info + Social Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky bottom-4 sm:bottom-8 mt-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 p-3 sm:p-4 lg:p-6"
          >
            {/* Mobile Layout: Stacked */}
            <div className="flex flex-col sm:hidden gap-3">
              {/* Article Info */}
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime} {locale === 'id' ? 'menit baca' : 'min read'}</span>
                </div>
              </div>

              {/* Social Share - Left Aligned with padding */}
              <div className="flex justify-start pt-2 pl-1">
                <SocialShare
                  title={article.title}
                  size="md"
                />
              </div>
            </div>

            {/* Desktop Layout: Horizontal */}
            <div className="hidden sm:flex items-center justify-between gap-4">
              {/* Left: Article Title + Author Info */}
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm lg:text-base line-clamp-1 mb-1">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    <span className="font-semibold">{article.author.name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                    <span>{article.publishedDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                    <span>{article.readTime} {locale === 'id' ? 'menit' : 'min'}</span>
                  </div>
                </div>
              </div>

              {/* Right: Social Media Share Icons */}
              <SocialShare
                title={article.title}
                size="md"
                className="flex-shrink-0"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Related Articles - Story Style Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-8">
            {locale === 'id' ? 'Lanjut Baca' : 'Keep Reading'}
          </h2>

          <div className="relative">
            {/* Carousel */}
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {article.relatedArticles.map((related) => {
                  const relatedBadgeConfig = getBadgeConfig(related.trendingBadge);
                  const RelatedBadgeIcon = relatedBadgeConfig.icon;

                  return (
                    <Link
                      key={related.id}
                      href={`/${locale}/trending/${related.slug}`}
                      className="min-w-full"
                    >
                      <Card className="group relative h-[400px] overflow-hidden border-0 shadow-2xl cursor-pointer">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className={`${relatedBadgeConfig.color} px-3 py-1 rounded-full flex items-center gap-1.5`}>
                                <RelatedBadgeIcon className="w-3 h-3 text-white" />
                                <span className="text-xs font-black text-white">{relatedBadgeConfig.text}</span>
                              </div>
                              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                                {related.category}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-black text-white drop-shadow-lg">
                              {related.title}
                            </h3>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {article.relatedArticles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-500'
                      : 'w-2 bg-gray-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Back to Trending List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href={`/${locale}/trending`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all hover:scale-105 shadow-xl"
          >
            <Flame className="w-5 h-5" />
            {locale === 'id' ? 'Lihat Semua Trending' : 'View All Trending'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
