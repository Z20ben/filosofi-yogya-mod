'use client';

import { Landmark, Store, Camera, Calendar, Sparkles } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

interface StatisticsSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  stats: {
    destinations: string;
    businesses: string;
    photos: string;
    events: string;
  };
}

export function StatisticsSection({ title, subtitle, badgeText, stats }: StatisticsSectionProps) {
  return (
    <section className="bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
              <Sparkles className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
              <span className="text-[var(--javanese-gold)] dark:text-white">{badgeText}</span>
            </div>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}
            >
              {title}
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeInSection delay={100} direction="up">
            <AnimatedCounter end={9} suffix="+" icon={Landmark} label={stats.destinations} delay={200} />
          </FadeInSection>

          <FadeInSection delay={200} direction="up">
            <AnimatedCounter end={12} suffix="+" icon={Store} label={stats.businesses} delay={400} />
          </FadeInSection>

          <FadeInSection delay={300} direction="up">
            <AnimatedCounter end={50} suffix="+" icon={Camera} label={stats.photos} delay={600} />
          </FadeInSection>

          <FadeInSection delay={400} direction="up">
            <AnimatedCounter end={8} suffix="+" icon={Calendar} label={stats.events} delay={800} />
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
