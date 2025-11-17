'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Home, MapPin, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [locale, setLocale] = useState<'id' | 'en'>('id');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('preferredLocale') as 'id' | 'en' | null;
    const browserLang = navigator.language.toLowerCase();

    if (savedLocale) {
      setLocale(savedLocale);
    } else if (browserLang.startsWith('en')) {
      setLocale('en');
    }
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    setLocale(newLocale);
    localStorage.setItem('preferredLocale', newLocale);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const content = {
    id: {
      title: 'Halaman Tidak Ditemukan',
      message: 'Halaman yang anda cari tidak ditemukan',
      description: 'Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.',
      btnHome: 'Kembali ke Beranda',
    },
    en: {
      title: 'Page Not Found',
      message: 'The page you are looking for could not be found',
      description: 'The page may have been moved or the URL you entered is incorrect.',
      btnHome: 'Back to Home',
    },
  };

  const t = content[locale];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {/* Top Action Buttons */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
        {/* Language Toggle */}
        <Button
          onClick={toggleLocale}
          variant="outline"
          size="sm"
          className="rounded-full border-2 border-border bg-card hover:bg-accent"
        >
          <Globe className="w-4 h-4 mr-2" />
          <span>{locale === 'id' ? 'EN' : 'ID'}</span>
        </Button>

        {/* Theme Toggle */}
        {mounted && (
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            className="rounded-full border-2 border-border bg-card hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Code */}
        <h1 className="text-9xl font-bold bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
          404
        </h1>

        {/* Icon */}
        <div className="flex justify-center animate-in fade-in zoom-in duration-700 delay-200">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] flex items-center justify-center shadow-2xl">
            <MapPin className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
          <p className="text-xl font-medium text-foreground">{t.message}</p>
          <p className="text-base text-muted-foreground max-w-md mx-auto">{t.description}</p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Link href={`/${locale}`}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] hover:opacity-90 text-white shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              {t.btnHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
