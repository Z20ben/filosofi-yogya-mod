import { HomePageContent } from '@/components/home/HomePageContent';
import type { Metadata } from 'next';

// Generate static pages for all locales
export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

// Dynamic metadata based on locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    id: {
      title: 'Filosofi Yogya - Ensiklopedia Sumbu Filosofi Yogyakarta',
      description: 'Jelajahi kekayaan budaya dan filosofi Jawa melalui Sumbu Filosofi Yogyakarta. Temukan sejarah, destinasi wisata, UMKM lokal, galeri foto, dan agenda acara budaya di sepanjang koridor bersejarah dari Pantai Parangtritis hingga Gunung Merapi.',
      ogDescription: 'Jelajahi kekayaan budaya dan filosofi Jawa melalui Sumbu Filosofi Yogyakarta - dari Pantai Parangtritis hingga Gunung Merapi',
    },
    en: {
      title: 'Filosofi Yogya - Yogyakarta Philosophical Axis Encyclopedia',
      description: 'Explore the rich cultural heritage and Javanese philosophy through Yogyakarta\'s Philosophical Axis. Discover history, tourist destinations, local SMEs, photo gallery, and cultural events along the historic corridor from Parangtritis Beach to Mount Merapi.',
      ogDescription: 'Explore the rich cultural heritage of Yogyakarta\'s Philosophical Axis - from Parangtritis Beach to Mount Merapi',
    },
  };

  const t = metadata[locale as 'id' | 'en'] || metadata.id;

  return {
    title: t.title,
    description: t.description,
    keywords: [
      'Sumbu Filosofi',
      'Yogyakarta',
      'Filosofi Jawa',
      'Keraton Yogyakarta',
      'Tugu Yogyakarta',
      'Panggung Krapyak',
      'Wisata Jogja',
      'UMKM Yogyakarta',
      'Budaya Jawa',
      'Sejarah Yogyakarta',
    ],
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'id_ID',
    },
  };
}

export default function HomePage() {
  return <HomePageContent />;
}
