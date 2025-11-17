'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { id: 'Beranda', en: 'Home' },
  'nav.kawasan': { id: 'Kawasan Sumbu Filosofi', en: 'Philosophical Axis Area' },
  'nav.sejarah': { id: 'Sejarah & Riset', en: 'History & Research' },
  'nav.wisata': { id: 'Potensi Wisata', en: 'Tourism Potential' },
  'nav.umkm': { id: 'Potensi UMKM', en: 'MSME Potential' },
  'nav.agenda': { id: 'Agenda Seni & Budaya', en: 'Arts & Culture Agenda' },
  'nav.katalog': { id: 'Katalog UMKM', en: 'MSME Catalog' },
  'nav.galeri': { id: 'Galeri Foto', en: 'Photo Gallery' },
  'nav.tentang': { id: 'Tentang', en: 'About' },
  'nav.admin': { id: 'Admin', en: 'Admin' },

  // Home page
  'home.title': { id: 'Ensiklopedia Sumbu Filosofi Yogyakarta', en: 'Yogyakarta Philosophical Axis Encyclopedia' },
  'home.subtitle': { id: 'Menjelajahi Warisan Budaya dan Filosofi Jawa', en: 'Exploring Javanese Cultural and Philosophical Heritage' },
  'home.welcome': { id: 'Selamat Datang', en: 'Welcome' },
  'home.explore': { id: 'Jelajahi Sumbu Filosofi', en: 'Explore the Philosophical Axis' },
  'home.featured': { id: 'Sorotan Utama', en: 'Featured Highlights' },
  'home.description': { id: 'Sumbu Filosofi adalah garis imajiner yang membentang dari selatan ke utara, menghubungkan Pantai Parangtritis, Keraton Yogyakarta, dan Gunung Merapi. Garis ini bukan sekadar orientasi geografis, tetapi merupakan representasi mendalam dari filosofi Jawa tentang harmoni kosmologis.', en: 'The Philosophical Axis is an imaginary line stretching from south to north, connecting Parangtritis Beach, Yogyakarta Palace, and Mount Merapi. This line is not merely a geographical orientation, but a profound representation of Javanese philosophy about cosmological harmony.' },
  'home.description2': { id: 'Konsep ini mencerminkan hubungan antara manusia (mikrokosmos) dengan alam semesta (makrokosmos), serta perjalanan spiritual dari nafsu duniawi (Parangtritis) menuju kesempurnaan spiritual (Merapi) dengan Keraton sebagai pusat kekuatan dan kebijaksanaan.', en: 'This concept reflects the relationship between humans (microcosm) and the universe (macrocosm), as well as the spiritual journey from worldly desires (Parangtritis) towards spiritual perfection (Merapi) with the Palace as the center of power and wisdom.' },
  'home.learnMore': { id: 'Pelajari Lebih Lanjut', en: 'Learn More' },

  // Common
  'common.learnMore': { id: 'Pelajari Selengkapnya', en: 'Learn More' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'id' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
