'use client';

import dynamic from 'next/dynamic';
import { SearchHero } from './SearchHero';

// Lazy load below-the-fold components to reduce initial bundle and TBT
const PhilosophyScrollStory = dynamic(
  () => import('./PhilosophyScrollStory').then((mod) => mod.PhilosophyScrollStory),
  { ssr: false, loading: () => <div className="h-screen" /> }
);

const DestinationCarousel = dynamic(
  () => import('./DestinationCarousel').then((mod) => mod.DestinationCarousel),
  { loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900/50 animate-pulse" /> }
);

const SpotNongkrongPreview = dynamic(
  () => import('./SpotNongkrongPreview').then((mod) => mod.SpotNongkrongPreview),
  { loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900/50 animate-pulse" /> }
);

const UMKMSection = dynamic(
  () => import('./UMKMSection').then((mod) => mod.UMKMSection),
  { loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900/50 animate-pulse" /> }
);

const TrendingArticles = dynamic(
  () => import('./TrendingArticles').then((mod) => mod.TrendingArticles),
  { loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900/50 animate-pulse" /> }
);

const InteractiveMap = dynamic(
  () => import('@/components/map/InteractiveMap').then((mod) => mod.InteractiveMap),
  { ssr: false, loading: () => <div className="h-96 bg-slate-100 dark:bg-slate-900 animate-pulse" /> }
);

export function HomePageContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section with Search & Agenda Carousel */}
      <SearchHero />

      {/* Philosophy Scroll Story with Parallax - lazy loaded */}
      <PhilosophyScrollStory />

      {/* Destination Carousel */}
      <DestinationCarousel />

      {/* Trending Hangout Spots Preview */}
      <SpotNongkrongPreview />

      {/* Featured Local UMKM */}
      <UMKMSection />

      {/* Trending Articles */}
      <TrendingArticles />

      {/* Interactive Map - lazy loaded */}
      <InteractiveMap />

      {/* FAQChatbox is already in the website layout - removed duplicate */}
    </div>
  );
}
