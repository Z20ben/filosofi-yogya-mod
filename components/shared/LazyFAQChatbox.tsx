'use client';

import dynamic from 'next/dynamic';

// Lazy load FAQChatbox - reduces initial bundle by ~523KB (framer-motion)
const FAQChatbox = dynamic(
  () => import('@/components/shared/FAQChatbox').then((mod) => mod.FAQChatbox),
  { ssr: false }
);

export function LazyFAQChatbox() {
  return <FAQChatbox />;
}
