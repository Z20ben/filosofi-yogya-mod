'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Heart, Tag, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getInternalCategoryId } from '@/config/categoryParams';

interface UMKMItem {
  id: number;
  name: string;
  category: string;
  type: string;
  image: string;
  location: string;
  price: string;
  tags: string[];
  description: string;
  highlight: string;
}

export default function UMKMLokalPage() {
  const t = useTranslations('umkmLokal');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedUMKM, setLikedUMKM] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'culinary', label: t('categories.culinary') },
    { id: 'craft', label: t('categories.craft') },
    { id: 'fashion', label: t('categories.fashion') },
    { id: 'creative', label: t('categories.creative') }
  ];

  // Read category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const mappedCategory = getInternalCategoryId('umkmLokal', categoryParam, locale as 'id' | 'en');
      if (categories.some(cat => cat.id === mappedCategory)) {
        setActiveCategory(mappedCategory);
      }
    } else {
      // Reset to 'all' when no category param (navigating to parent page)
      setActiveCategory('all');
    }
  }, [searchParams, locale]);

  // UMKM data berdasarkan locale
  const umkmData = locale === 'id' ? [
    {
      id: 1,
      name: 'Gudeg Yu Djum',
      category: 'culinary',
      type: 'Kuliner Tradisional',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
      location: 'Jl. Wijilan',
      price: 'Rp 15.000',
      tags: ['Halal', 'Authentic', 'Must Try'],
      description: 'Gudeg legendaris yang wajib dicoba! Resep turun temurun dengan rasa autentik khas Jogja.',
      highlight: 'Viral TikTok'
    },
    {
      id: 2,
      name: 'Batik Winotosastro',
      category: 'craft',
      type: 'Kerajinan Batik',
      image: 'https://images.unsplash.com/photo-1721361467569-f8edbf851f44?w=800&q=80',
      location: 'Jl. Tirtodipuran',
      price: 'Rp 150.000',
      tags: ['Handmade', 'Premium', 'Heritage'],
      description: 'Batik cap dan tulis berkualitas tinggi dengan motif klasik dan modern.',
      highlight: 'Best Seller'
    },
    {
      id: 3,
      name: 'Dagadu Djokdja',
      category: 'fashion',
      type: 'Fashion Lokal',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      location: 'Malioboro',
      price: 'Rp 85.000',
      tags: ['Streetwear', 'Iconic', 'Limited'],
      description: 'Brand fashion lokal ikonik Jogja dengan design unik dan kualitas premium.',
      highlight: 'Trending'
    },
    {
      id: 4,
      name: 'Jogja Scrummy',
      category: 'culinary',
      type: 'Dessert & Snack',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      location: 'Jl. Kaliurang',
      price: 'Rp 25.000',
      tags: ['Modern', 'Instagramable', 'Halal'],
      description: 'Dessert box dan snack kekinian yang lagi hits di kalangan anak muda!',
      highlight: 'Hot Deal'
    },
    {
      id: 5,
      name: 'Omah Gerabah',
      category: 'craft',
      type: 'Kerajinan Tanah Liat',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
      location: 'Kasongan, Bantul',
      price: 'Rp 50.000',
      tags: ['Handmade', 'Eco-Friendly', 'Unique'],
      description: 'Produk gerabah artistik untuk dekorasi rumah dengan sentuhan modern.',
      highlight: 'New Arrival'
    },
    {
      id: 6,
      name: 'Studio Grafis Jogja',
      category: 'creative',
      type: 'Creative Studio',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      location: 'Jl. Gejayan',
      price: 'Rp 200.000',
      tags: ['Digital Art', 'Custom', 'Professional'],
      description: 'Jasa design grafis, ilustrasi, dan branding untuk UMKM dan personal.',
      highlight: 'Top Rated'
    }
  ] : [
    {
      id: 1,
      name: 'Gudeg Yu Djum',
      category: 'culinary',
      type: 'Traditional Culinary',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
      location: 'Jl. Wijilan',
      price: 'IDR 15.000',
      tags: ['Halal', 'Authentic', 'Must Try'],
      description: 'Legendary gudeg you must try! Traditional recipe with authentic Jogja taste.',
      highlight: 'TikTok Viral'
    },
    {
      id: 2,
      name: 'Batik Winotosastro',
      category: 'craft',
      type: 'Batik Craft',
      image: 'https://images.unsplash.com/photo-1721361467569-f8edbf851f44?w=800&q=80',
      location: 'Jl. Tirtodipuran',
      price: 'IDR 150.000',
      tags: ['Handmade', 'Premium', 'Heritage'],
      description: 'High-quality cap and tulis batik with classic and modern motifs.',
      highlight: 'Best Seller'
    },
    {
      id: 3,
      name: 'Dagadu Djokdja',
      category: 'fashion',
      type: 'Local Fashion',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      location: 'Malioboro',
      price: 'IDR 85.000',
      tags: ['Streetwear', 'Iconic', 'Limited'],
      description: 'Iconic Jogja local fashion brand with unique design and premium quality.',
      highlight: 'Trending'
    },
    {
      id: 4,
      name: 'Jogja Scrummy',
      category: 'culinary',
      type: 'Dessert & Snack',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      location: 'Jl. Kaliurang',
      price: 'IDR 25.000',
      tags: ['Modern', 'Instagramable', 'Halal'],
      description: 'Trendy dessert boxes and snacks popular among youngsters!',
      highlight: 'Hot Deal'
    },
    {
      id: 5,
      name: 'Omah Gerabah',
      category: 'craft',
      type: 'Clay Craft',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
      location: 'Kasongan, Bantul',
      price: 'IDR 50.000',
      tags: ['Handmade', 'Eco-Friendly', 'Unique'],
      description: 'Artistic pottery products for home decoration with modern touch.',
      highlight: 'New Arrival'
    },
    {
      id: 6,
      name: 'Studio Grafis Jogja',
      category: 'creative',
      type: 'Creative Studio',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      location: 'Jl. Gejayan',
      price: 'IDR 200.000',
      tags: ['Digital Art', 'Custom', 'Professional'],
      description: 'Graphic design, illustration, and branding services for SMEs and individuals.',
      highlight: 'Top Rated'
    }
  ];

  const filteredUMKM = activeCategory === 'all'
    ? umkmData
    : umkmData.filter((item: UMKMItem) => item.category === activeCategory);

  const toggleLike = (id: number) => {
    setLikedUMKM(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-600/70 to-cyan-600/80" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1721361467569-f8edbf851f44?w=1600&q=80')] bg-cover bg-center" />
          </div>
        </div>

        <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Support Local Business</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative overflow-hidden">
            {/* Scrollable container */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pl-4 pr-8 mx-8">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all snap-start flex-shrink-0 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-md'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/90 via-white/70 dark:from-slate-950/90 dark:via-slate-950/70 to-transparent pointer-events-none" />

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/90 via-white/70 dark:from-slate-950/90 dark:via-slate-950/70 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* UMKM Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map((item: UMKMItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full bg-white dark:bg-slate-800">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-emerald-900/30 dark:to-amber-900/30">
                    {/* Image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-emerald-400/50 text-xs">{item.name}</span>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                    {/* Highlight Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-full shadow-lg font-medium">
                        {item.highlight}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-5 h-5 ${likedUMKM.has(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/80 mb-1">{locale === 'id' ? 'Mulai dari' : 'Starting from'}</p>
                        <p className="text-white text-xl font-semibold">{item.price}</p>
                      </div>
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <ExternalLink className="w-5 h-5 text-slate-900" />
                      </button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-3">
                      <Badge variant="outline" className="mb-2 border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400">
                        {item.type}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 rounded-full">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 flex-1">{item.location}</span>
                      <button className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-xs rounded-lg transition-all font-medium">
                        {t('viewOnMap')}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
