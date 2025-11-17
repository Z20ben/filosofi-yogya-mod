import { HomePageContent } from '@/components/home/HomePageContent';
import type { Metadata } from 'next';

// Generate static pages for all locales
export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export const metadata: Metadata = {
  title: 'Filosofi Yogya - Ensiklopedia Sumbu Filosofi Yogyakarta',
  description:
    'Jelajahi kekayaan budaya dan filosofi Jawa melalui Sumbu Filosofi Yogyakarta. Temukan sejarah, destinasi wisata, UMKM lokal, galeri foto, dan agenda acara budaya di sepanjang koridor bersejarah dari Pantai Parangtritis hingga Gunung Merapi.',
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
    title: 'Filosofi Yogya - Ensiklopedia Sumbu Filosofi Yogyakarta',
    description:
      'Jelajahi kekayaan budaya dan filosofi Jawa melalui Sumbu Filosofi Yogyakarta - dari Pantai Parangtritis hingga Gunung Merapi',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
