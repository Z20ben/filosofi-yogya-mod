'use client';

import dynamic from 'next/dynamic';
import { SearchHero } from './SearchHero';
import { DestinationCarousel } from './DestinationCarousel';
import { SpotNongkrongPreview } from './SpotNongkrongPreview';
import { UMKMSection } from './UMKMSection';
import { TrendingArticles } from './TrendingArticles';

// Lazy load heavy components to reduce initial bundle
const PhilosophyScrollStory = dynamic(
  () => import('./PhilosophyScrollStory').then((mod) => mod.PhilosophyScrollStory),
  { ssr: false, loading: () => <div className="h-screen" /> }
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
