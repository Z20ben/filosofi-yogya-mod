'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { X, ChevronLeft, ChevronRight, Filter, Image as ImageIcon, Sparkles } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { FadeInSection } from '@/components/shared/FadeInSection';

interface GalleryImage {
  id: string;
  category: string;
  url: string;
  caption_id: string;
  caption_en: string;
  tags: string[];
}

export default function GaleriPage() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { key: 'all', labelId: t('categories.all'), labelEn: t('categories.all') },
    { key: 'kawasan', labelId: t('categories.kawasan'), labelEn: t('categories.kawasan') },
    { key: 'sejarah', labelId: t('categories.sejarah'), labelEn: t('categories.sejarah') },
    { key: 'wisata', labelId: t('categories.wisata'), labelEn: t('categories.wisata') },
    { key: 'umkm', labelId: t('categories.umkm'), labelEn: t('categories.umkm') },
    { key: 'agenda', labelId: t('categories.agenda'), labelEn: t('categories.agenda') },
  ];

  useEffect(() => {
    loadGallery();
  }, []);

  useEffect(() => {
    filterImages();
  }, [selectedCategory, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex, filteredImages]);

  const loadGallery = async () => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/gallery');
      // const data = await response.json();
      // setImages(data || []);

      // Use sample data as fallback
      const sampleImages: GalleryImage[] = [
        {
          id: 'sample-1',
          category: 'kawasan',
          url: 'https://images.unsplash.com/photo-1655793488799-1ffba5b22cbd?w=1080',
          caption_id: 'Keraton Yogyakarta - Pusat Sumbu Filosofi',
          caption_en: 'Yogyakarta Palace - Center of Philosophical Axis',
          tags: ['keraton', 'heritage', 'palace'],
        },
        {
          id: 'sample-2',
          category: 'sejarah',
          url: 'https://images.unsplash.com/photo-1721747994983-96d23e197487?w=1080',
          caption_id: 'Upacara Tradisional Jawa',
          caption_en: 'Traditional Javanese Ceremony',
          tags: ['ceremony', 'tradition'],
        },
        {
          id: 'sample-3',
          category: 'umkm',
          url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1080',
          caption_id: 'Kerajinan Batik Tradisional',
          caption_en: 'Traditional Batik Craft',
          tags: ['batik', 'craft'],
        },
        {
          id: 'sample-4',
          category: 'wisata',
          url: 'https://images.unsplash.com/photo-1675475904342-47d71467df1a?w=1080',
          caption_id: 'Tugu Yogyakarta',
          caption_en: 'Yogyakarta Monument',
          tags: ['monument', 'landmark'],
        },
        {
          id: 'sample-5',
          category: 'kawasan',
          url: 'https://images.unsplash.com/photo-1669032667712-4402633fb1e0?w=1080',
          caption_id: 'Panggung Krapyak',
          caption_en: 'Krapyak Stage',
          tags: ['panggung', 'architecture'],
        },
        {
          id: 'sample-6',
          category: 'agenda',
          url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1080',
          caption_id: 'Pertunjukan Wayang Kulit',
          caption_en: 'Shadow Puppet Performance',
          tags: ['wayang', 'performance'],
        },
        {
          id: 'sample-7',
          category: 'kawasan',
          url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1080',
          caption_id: 'Alun-alun Kidul',
          caption_en: 'South Square',
          tags: ['alun-alun', 'public space'],
        },
        {
          id: 'sample-8',
          category: 'wisata',
          url: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1080',
          caption_id: 'Taman Sari',
          caption_en: 'Taman Sari Water Castle',
          tags: ['taman sari', 'heritage'],
        },
        {
          id: 'sample-9',
          category: 'umkm',
          url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1080',
          caption_id: 'Kuliner Tradisional',
          caption_en: 'Traditional Cuisine',
          tags: ['food', 'culinary'],
        },
      ];
      setImages(sampleImages);
    } catch (error) {
      console.error('Error loading gallery:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.category === selectedCategory));
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 bg-[var(--javanese-gold)]/20 backdrop-blur-sm rounded-full text-sm mb-4 border border-[var(--javanese-gold)]/30">
            {t('badge')}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-[var(--javanese-ivory)]/90 text-lg md:text-xl mt-4 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Sample Data Notice */}
      {images.length > 0 && images[0].id.includes('sample') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-gradient-to-r from-[var(--javanese-gold)]/10 to-[var(--javanese-gold)]/5 border border-[var(--javanese-gold)]/20 rounded-lg p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[var(--javanese-gold)] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--javanese-brown-text)]">
              {t('sampleNotice')}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-[var(--javanese-brown-text)]">
            <Filter className="w-5 h-5" />
            <span className="font-medium">{t('filter')}:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  selectedCategory === category.key
                    ? 'bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] shadow-md'
                    : 'bg-card text-[var(--javanese-brown-text)] hover:bg-[var(--javanese-gold)]/10 border border-[var(--javanese-brown-text)]/20'
                }`}
              >
                {locale === 'id' ? category.labelId : category.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--javanese-brown-text)]/20 border-t-[var(--javanese-brown-bg)] rounded-full animate-spin"></div>
            <p className="text-[var(--javanese-brown-text)]/60 mt-4">{t('loading')}</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 mx-auto text-[var(--javanese-brown-text)]/30 mb-4" />
            <p className="text-[var(--javanese-brown-text)]/60">{t('noImages')}</p>
          </div>
        ) : (
          <Masonry
            columnsCount={3}
            gutter="1.5rem"
            responsive={{
              350: 1,
              768: 2,
              1024: 3
            }}
          >
            {filteredImages.map((image, index) => (
              <FadeInSection key={image.id} delay={index * 50} direction="up">
                <div
                  className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={locale === 'id' ? image.caption_id : image.caption_en}
                      className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay brown tipis yang selalu ada */}
                    <div className="absolute inset-0 gallery-overlay-light"></div>
                    {/* Overlay lebih gelap saat hover dengan caption */}
                    <div className="absolute inset-0 gallery-overlay-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium mb-2">
                          {locale === 'id' ? image.caption_id : image.caption_en}
                        </p>
                        {image.tags && image.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {image.tags.map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-javanese-gold-10 backdrop-blur-sm text-white rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </Masonry>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && filteredImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full">
            <img
              src={filteredImages[currentImageIndex].url}
              alt={locale === 'id' ? filteredImages[currentImageIndex].caption_id : filteredImages[currentImageIndex].caption_en}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium">
                {locale === 'id' ? filteredImages[currentImageIndex].caption_id : filteredImages[currentImageIndex].caption_en}
              </p>
              {filteredImages[currentImageIndex].tags && filteredImages[currentImageIndex].tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {filteredImages[currentImageIndex].tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-sm px-3 py-1 bg-[var(--javanese-gold)]/30 text-white rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-white/60 text-sm mt-2">
                {currentImageIndex + 1} {t('imageCounter')} {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
