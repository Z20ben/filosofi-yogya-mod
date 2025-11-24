'use client';

import { SearchHero } from './SearchHero';
import { PhilosophyScrollStory } from './PhilosophyScrollStory';
import { DestinationCarousel } from './DestinationCarousel';
import { SpotNongkrongPreview } from './SpotNongkrongPreview';
import { UMKMSection } from './UMKMSection';
import { TrendingArticles } from './TrendingArticles';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { FAQChatbox } from '@/components/shared/FAQChatbox';

export function HomePageContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section with Search & Agenda Carousel */}
      <SearchHero />

      {/* Philosophy Scroll Story with Parallax */}
      <PhilosophyScrollStory />

      {/* Destination Carousel */}
      <DestinationCarousel />

      {/* Trending Hangout Spots Preview */}
      <SpotNongkrongPreview />

      {/* Featured Local UMKM */}
      <UMKMSection />

      {/* Trending Articles */}
      <TrendingArticles />

      {/* Interactive Map */}
      <InteractiveMap />

      {/* Floating FAQ Chatbox */}
      <FAQChatbox />
    </div>
  );
}
