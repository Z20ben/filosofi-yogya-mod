'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Clock, LogIn, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SessionExpired() {
  const router = useRouter();
  const [locale, setLocale] = useState<'id' | 'en'>('id');
  const [countdown, setCountdown] = useState(10);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect browser language or get from localStorage
    const savedLocale = localStorage.getItem('preferredLocale') as 'id' | 'en' | null;
    const browserLang = navigator.language.toLowerCase();

    if (savedLocale) {
      setLocale(savedLocale);
    } else if (browserLang.startsWith('en')) {
      setLocale('en');
    }
  }, []);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Redirect when countdown reaches 0
    if (countdown === 0) {
      router.push(`/${locale}/admin/login`);
    }
  }, [countdown, router, locale]);

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
      title: 'Sesi Telah Berakhir',
      message: 'Sesi Anda telah berakhir',
      description: 'Untuk keamanan, silakan login kembali untuk melanjutkan.',
      autoRedirect: 'Otomatis kembali ke login dalam',
      seconds: 'detik',
      btnLogin: 'Login Sekarang',
    },
    en: {
      title: 'Session Expired',
      message: 'Your session has expired',
      description: 'For security reasons, please login again to continue.',
      autoRedirect: 'Auto-redirecting to login in',
      seconds: 'seconds',
      btnLogin: 'Login Now',
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
        {/* 419 Code */}
        <h1 className="text-9xl font-bold bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
          419
        </h1>

        {/* Icon with tick animation */}
        <div className="flex justify-center animate-in fade-in zoom-in duration-700 delay-200">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] flex items-center justify-center shadow-2xl">
            <Clock className="w-16 h-16 text-white animate-[swing_1s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-3xl font-bold text-foreground">{t.title}</h2>
          <p className="text-xl font-medium text-foreground">{t.message}</p>
          <p className="text-base text-muted-foreground max-w-md mx-auto">{t.description}</p>
        </div>

        {/* Countdown */}
        <div className="inline-flex items-center gap-2 px-5 py-3 bg-card border-2 border-border rounded-xl text-foreground animate-in fade-in zoom-in duration-700 delay-400">
          <span className="text-sm font-medium">{t.autoRedirect}</span>
          <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] text-white font-bold rounded-lg">
            {countdown}
          </span>
          <span className="text-sm font-medium">{t.seconds}</span>
        </div>

        {/* Action Button */}
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Link href={`/${locale}/admin/login`}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] hover:opacity-90 text-white shadow-lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {t.btnLogin}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
