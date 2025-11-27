'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Sparkles, Clock, Tag, ArrowLeft, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// Generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface TrendingArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  category: string;
  readTime: number;
  trendingBadge: 'viral' | 'hot' | 'new' | 'rising';
  tags: string[];
}

type TimeFilter = 'week' | 'month' | 'all';

export default function TrendingPage() {
  const locale = useLocale();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');

  const timeFilters = locale === 'id' ? [
    { id: 'week' as TimeFilter, label: '🔥 Minggu Ini' },
    { id: 'month' as TimeFilter, label: '📅 Bulan Ini' },
    { id: 'all' as TimeFilter, label: '⭐ Sepanjang Masa' }
  ] : [
    { id: 'week' as TimeFilter, label: '🔥 This Week' },
    { id: 'month' as TimeFilter, label: '📅 This Month' },
    { id: 'all' as TimeFilter, label: '⭐ All Time' }
  ];

  const trendingArticles: TrendingArticle[] = locale === 'id' ? [
    {
      id: 1,
      title: '5 Spot Nongkrong Hidden Gem yang Lagi Viral di Jogja!',
      slug: '5-spot-nongkrong-hidden-gem-viral-jogja',
      excerpt: 'Tempat nongkrong aesthetic yang belum banyak orang tau tapi super Instagram-able!',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      imageWidth: 800,
      imageHeight: 1067,
      category: 'Kuliner & Nongkrong',
      readTime: 5,
      trendingBadge: 'viral',
      tags: ['cafe', 'instagramable', 'hits']
    },
    {
      id: 2,
      title: 'Filosofi Tugu Jogja yang Ternyata Relate Banget Sama Kehidupan Kita',
      slug: 'filosofi-tugu-jogja-relate-kehidupan',
      excerpt: 'Mind-blowing! Makna di balik Tugu Jogja ternyata deep banget dan relevan dengan anak muda masa kini.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      imageWidth: 800,
      imageHeight: 800,
      category: 'Sejarah & Filosofi',
      readTime: 7,
      trendingBadge: 'hot',
      tags: ['filosofi', 'viral', 'mindblowing']
    },
    {
      id: 3,
      title: 'Thread: Mitos vs Fakta Tentang Keraton Jogja yang Bikin Merinding',
      slug: 'mitos-fakta-keraton-jogja-merinding',
      excerpt: 'Kalian pasti belum tau fakta-fakta ini tentang Keraton! Prepare to be shook.',
      image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80',
      imageWidth: 800,
      imageHeight: 533,
      category: 'Sejarah & Budaya',
      readTime: 6,
      trendingBadge: 'viral',
      tags: ['keraton', 'sejarah', 'thread']
    },
    {
      id: 4,
      title: 'UMKM Batik Jogja yang Collab Sama Brand Streetwear!',
      slug: 'umkm-batik-jogja-collab-streetwear',
      excerpt: 'Batik meets streetwear culture! Kolaborasi yang gak nyangka tapi hasilnya fire 🔥',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80',
      imageWidth: 800,
      imageHeight: 1200,
      category: 'UMKM & Fashion',
      readTime: 4,
      trendingBadge: 'new',
      tags: ['batik', 'fashion', 'umkm']
    },
    {
      id: 5,
      title: 'Event Seni & Budaya Gratis di Jogja Bulan Ini - Jangan Sampe Kelewat!',
      slug: 'event-seni-budaya-gratis-jogja',
      excerpt: 'List lengkap event seru yang free dan worth it banget untuk dikunjungi!',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      imageWidth: 800,
      imageHeight: 600,
      category: 'Agenda & Event',
      readTime: 8,
      trendingBadge: 'rising',
      tags: ['event', 'gratis', 'budaya']
    },
    {
      id: 6,
      title: 'Kuliner Legendaris Jogja yang Hits Lagi di TikTok',
      slug: 'kuliner-legendaris-jogja-hits-tiktok',
      excerpt: 'Warung-warung jadul yang mendadak viral karena TikTok. Worth the hype!',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      imageWidth: 800,
      imageHeight: 1000,
      category: 'Kuliner',
      readTime: 5,
      trendingBadge: 'hot',
      tags: ['kuliner', 'viral', 'tiktok']
    }
  ] : [
    {
      id: 1,
      title: '5 Hidden Gem Hangout Spots Going Viral in Yogya!',
      slug: '5-hidden-gem-hangout-spots-viral-yogya',
      excerpt: 'Aesthetic spots that are still under the radar but super Instagram-worthy!',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      imageWidth: 800,
      imageHeight: 1067,
      category: 'Culinary & Hangouts',
      readTime: 5,
      trendingBadge: 'viral',
      tags: ['cafe', 'instagramable', 'trending']
    },
    {
      id: 2,
      title: 'Tugu Monument Philosophy That Actually Relates to Our Lives',
      slug: 'tugu-monument-philosophy-relates-to-life',
      excerpt: 'Mind-blowing! The meaning behind Tugu Jogja is so deep and relevant to today\'s youth.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      imageWidth: 800,
      imageHeight: 800,
      category: 'History & Philosophy',
      readTime: 7,
      trendingBadge: 'hot',
      tags: ['philosophy', 'viral', 'mindblowing']
    },
    {
      id: 3,
      title: 'Thread: Myths vs Facts About Yogyakarta Palace That\'ll Shock You',
      slug: 'myths-facts-yogyakarta-palace-shocking',
      excerpt: 'You probably don\'t know these facts about the Palace! Prepare to be shook.',
      image: 'https://images.unsplash.com/photo-1555400082-87a44cd6b95a?w=800&q=80',
      imageWidth: 800,
      imageHeight: 533,
      category: 'History & Culture',
      readTime: 6,
      trendingBadge: 'viral',
      tags: ['palace', 'history', 'thread']
    },
    {
      id: 4,
      title: 'Batik MSME Collabs with Streetwear Brand!',
      slug: 'batik-msme-collabs-streetwear-brand',
      excerpt: 'Batik meets streetwear culture! Unexpected collab but the result is fire 🔥',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c615d?w=800&q=80',
      imageWidth: 800,
      imageHeight: 1200,
      category: 'MSME & Fashion',
      readTime: 4,
      trendingBadge: 'new',
      tags: ['batik', 'fashion', 'msme']
    },
    {
      id: 5,
      title: 'Free Art & Culture Events in Jogja This Month - Don\'t Miss Out!',
      slug: 'free-art-culture-events-jogja',
      excerpt: 'Complete list of awesome events that are free and totally worth visiting!',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      imageWidth: 800,
      imageHeight: 600,
      category: 'Events & Agenda',
      readTime: 8,
      trendingBadge: 'rising',
      tags: ['events', 'free', 'culture']
    },
    {
      id: 6,
      title: 'Legendary Jogja Street Food Going Viral on TikTok',
      slug: 'legendary-jogja-street-food-viral-tiktok',
      excerpt: 'Old-school warungs suddenly going viral because of TikTok. Worth the hype!',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      imageWidth: 800,
      imageHeight: 1000,
      category: 'Culinary',
      readTime: 5,
      trendingBadge: 'hot',
      tags: ['culinary', 'viral', 'tiktok']
    }
  ];

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


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-950 dark:via-orange-950/20 dark:to-amber-950/20">
      {/* Navigation Bar + Header - Combined */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center justify-between py-4">
            {/* Back Button & Breadcrumb */}
            <div className="flex items-center gap-3">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">{locale === 'id' ? 'Beranda' : 'Home'}</span>
              </Link>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                <span className="font-bold text-orange-600 dark:text-orange-400 text-lg">
                  {locale === 'id' ? 'Sedang Tren' : 'Trending Now'}
                </span>
              </div>
            </div>

            {/* Home Button */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-950/50 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">{locale === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}</span>
            </Link>
          </div>

          {/* Title + Time Filter */}
          <div className="py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Title */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <Flame className="w-7 h-7 text-orange-500 animate-pulse" />
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  {locale === 'id' ? 'Lagi Viral Sekarang!' : 'Trending Now!'}
                </h1>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full sm:w-auto sm:flex-shrink-0 px-1 py-1 -mx-1">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setTimeFilter(filter.id)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                      timeFilter === filter.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid - Masonry Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {trendingArticles.map((article, index) => {
            const badgeConfig = getBadgeConfig(article.trendingBadge);
            const BadgeIcon = badgeConfig.icon;

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid mb-6"
              >
                <Link href={`/${locale}/trending/${article.slug}`}>
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white dark:bg-slate-900">
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: `${article.imageWidth} / ${article.imageHeight}` }}
                    >
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Trending Badge */}
                      <div className="absolute top-3 left-3">
                        <div className={`${badgeConfig.color} px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg`}>
                          <BadgeIcon className="w-4 h-4 text-white" />
                          <span className="text-xs font-black text-white">{badgeConfig.text}</span>
                        </div>
                      </div>
                      {/* Stats Overlay */}
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3 text-white" />
                          <span className="text-xs font-semibold text-white">{article.readTime} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Category */}
                      <Badge className="mb-2 bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200">
                        {article.category}
                      </Badge>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
                          >
                            <Tag className="w-3 h-3" />
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
