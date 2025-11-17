'use client';

import React from 'react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 600,
}: FadeInSectionProps) {
  const { ref, isVisible } = useFadeInOnScroll({ threshold: 0.1 });

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(30px)';
        case 'down':
          return 'translateY(-30px)';
        case 'left':
          return 'translateX(30px)';
        case 'right':
          return 'translateX(-30px)';
        case 'none':
          return 'none';
        default:
          return 'translateY(30px)';
      }
    }
    return 'translate(0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
