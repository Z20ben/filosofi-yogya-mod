'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface HeroSlideshowProps {
  title: string;
  subtitle: string;
  welcomeText: string;
  exploreText: string;
}

export function HeroSlideshow({ title, subtitle, welcomeText, exploreText }: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero background images - User's vintage B&W photos!
  const heroImages = [
    {
      url: '/assets/9f169dd83a8981e7aedcf8dbab93b79692f0d10d.png', // Tugu
      alt: 'Tugu Yogyakarta',
    },
    {
      url: '/assets/e68ea45479378a6003bae5ab6b785184768f6914.png', // Kraton
      alt: 'Kraton Yogyakarta',
    },
    {
      url: '/assets/6503837eba87dc083593e8a3ad9478adf75c2c83.png', // Panggung
      alt: 'Panggung Krapyak',
    },
  ];

  // Auto-rotate slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden pt-20">
      {/* Slideshow Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 hero-overlay-gradient"></div>
          </div>
        ))}
      </div>

      {/* Slide indicators - hidden on mobile to avoid overlapping button */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-[var(--javanese-gold)] w-8'
                : 'bg-javanese-ivory/50 hover:bg-javanese-ivory/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
          <p className="text-[var(--javanese-gold)] dark:text-white">{welcomeText}</p>
        </div>

        <h1
          className="text-javanese-ivory mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', lineHeight: '1.2' }}
        >
          {title}
        </h1>

        <p className="text-javanese-ivory opacity-90 text-xl mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <Link
          href="/kawasan-sumbu-filosofi"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--javanese-gold)] text-[#4A2C2A] dark:text-[#1A1412] hover:opacity-90 rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          {exploreText}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Decorative pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent"></div>
    </section>
  );
}
