'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  views: number;
  comments: number;
  tags: string[];
}

export function TrendingArticles() {
  const locale = useLocale();
  const [savedArticles, setSavedArticles] = useState<Set<number>>(new Set());

  const translations = {
    id: {
      title: 'Trending Now',
      subtitle: 'Artikel viral dan tren terbaru seputar lifestyle Jogja',
      readMore: 'Baca Selengkapnya',
      categories: {
        trend: 'Trending',
        food: 'Kuliner',
        lifestyle: 'Lifestyle',
        event: 'Event',
        culture: 'Budaya'
      }
    },
    en: {
      title: 'Trending Now',
      subtitle: 'Viral articles and latest trends about Jogja lifestyle',
      readMore: 'Read More',
      categories: {
        trend: 'Trending',
        food: 'Culinary',
        lifestyle: 'Lifestyle',
        event: 'Event',
        culture: 'Culture'
      }
    }
  };

  const t = translations[locale as 'id' | 'en'] || translations.id;

  const articles: Record<string, Article[]> = {
    id: [
      {
        id: 1,
        title: '10 Cafe Aesthetic di Jogja yang Lagi Viral di TikTok!',
        excerpt: 'Mau foto-foto kece buat feed Instagram? Ini dia cafe-cafe aesthetic yang lagi happening dan sering viral di TikTok!',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
        category: 'trend',
        author: 'Rara Lifestyle',
        date: '2 jam lalu',
        readTime: 5,
        views: 12500,
        comments: 89,
        tags: ['TikTok Viral', 'Cafe Aesthetic', 'Must Visit']
      },
      {
        id: 2,
        title: 'Makanan Khas Jogja yang Wajib Dicoba Anak Muda!',
        excerpt: 'Jangan cuma gudeg! Ada banyak makanan khas Jogja yang enak dan affordable buat anak muda.',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
        category: 'food',
        author: 'Foodie Jogja',
        date: '5 jam lalu',
        readTime: 7,
        views: 8300,
        comments: 45,
        tags: ['Food Guide', 'Budget Friendly', 'Local Taste']
      },
      {
        id: 3,
        title: 'Hidden Gems: Spot Foto Keren di Sepanjang Sumbu Filosofi',
        excerpt: 'Selain tempat mainstream, ada banyak spot foto hidden gems yang nggak kalah keren lho!',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
        category: 'lifestyle',
        author: 'Jogja Explorer',
        date: '1 hari lalu',
        readTime: 6,
        views: 15200,
        comments: 123,
        tags: ['Hidden Gems', 'Photography', 'Instagramable']
      },
      {
        id: 4,
        title: 'Event Seru Bulan Ini: Festival & Konser di Jogja',
        excerpt: 'Weekend mau ngapain? Cek dulu event-event seru yang bakal happening di Jogja bulan ini!',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
        category: 'event',
        author: 'Event Hunter',
        date: '2 hari lalu',
        readTime: 4,
        views: 6700,
        comments: 34,
        tags: ['Festival', 'Music', 'Weekend Vibes']
      }
    ],
    en: [
      {
        id: 1,
        title: '10 Aesthetic Cafes in Jogja Going Viral on TikTok!',
        excerpt: 'Want cool photos for your Instagram feed? Here are aesthetic cafes that are trending and often go viral on TikTok!',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
        category: 'trend',
        author: 'Rara Lifestyle',
        date: '2 hours ago',
        readTime: 5,
        views: 12500,
        comments: 89,
        tags: ['TikTok Viral', 'Aesthetic Cafe', 'Must Visit']
      },
      {
        id: 2,
        title: 'Jogja Local Foods Youngsters Must Try!',
        excerpt: 'Not just gudeg! There are many delicious and affordable Jogja foods for youngsters.',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
        category: 'food',
        author: 'Foodie Jogja',
        date: '5 hours ago',
        readTime: 7,
        views: 8300,
        comments: 45,
        tags: ['Food Guide', 'Budget Friendly', 'Local Taste']
      },
      {
        id: 3,
        title: 'Hidden Gems: Cool Photo Spots Along Philosophical Axis',
        excerpt: 'Besides mainstream places, there are many hidden gem photo spots that are equally cool!',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
        category: 'lifestyle',
        author: 'Jogja Explorer',
        date: '1 day ago',
        readTime: 6,
        views: 15200,
        comments: 123,
        tags: ['Hidden Gems', 'Photography', 'Instagramable']
      },
      {
        id: 4,
        title: 'Fun Events This Month: Festivals & Concerts in Jogja',
        excerpt: 'What to do this weekend? Check out exciting events happening in Jogja this month!',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
        category: 'event',
        author: 'Event Hunter',
        date: '2 days ago',
        readTime: 4,
        views: 6700,
        comments: 34,
        tags: ['Festival', 'Music', 'Weekend Vibes']
      }
    ]
  };

  const currentArticles = articles[locale] || articles.id;
  const featuredArticle = currentArticles[0];
  const otherArticles = currentArticles.slice(1);

  const toggleSave = (id: number) => {
    setSavedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      trend: 'from-red-500 to-orange-500',
      food: 'from-amber-500 to-yellow-500',
      lifestyle: 'from-cyan-500 to-teal-500',
      event: 'from-orange-500 to-amber-500',
      culture: 'from-emerald-500 to-teal-500'
    };
    return colors[category] || 'from-slate-500 to-slate-600';
  };

  return (
    <section id="trending" className="py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-sm text-red-700 dark:text-red-300 font-medium">What's Hot in Jogja</span>
          </div>

          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30">
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-red-400/50 text-xs">{featuredArticle.title}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-gradient-to-r ${getCategoryColor(featuredArticle.category)} text-white border-0`}>
                    {t.categories[featuredArticle.category as keyof typeof t.categories]}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleSave(featuredArticle.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Bookmark className={`w-5 h-5 ${savedArticles.has(featuredArticle.id) ? 'fill-white text-white' : 'text-white'}`} />
                </button>
              </div>

              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <span>{featuredArticle.author}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredArticle.title}</h2>

                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredArticle.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white rounded-xl transition-all w-fit font-medium">
                  {t.readMore}
                </button>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Other Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-400/50 text-xs">{article.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(article.category)} text-white border-0 text-xs`}>
                      {t.categories[article.category as keyof typeof t.categories]}
                    </Badge>
                  </div>

                  <button
                    onClick={() => toggleSave(article.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Bookmark className={`w-4 h-4 ${savedArticles.has(article.id) ? 'fill-white text-white' : 'text-white'}`} />
                  </button>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">{article.title}</h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
