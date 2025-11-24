'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const locale = useLocale();

  const exploreLinks = [
    { key: 'ensiklopedia', href: `/${locale}/encyclopedia` },
    { key: 'agenda', href: `/${locale}/agenda-event` },
    { key: 'destinasiWisata', href: `/${locale}/destinasi-wisata` },
    { key: 'spotNongkrong', href: `/${locale}/spot-nongkrong` },
    { key: 'umkm', href: `/${locale}/umkm-lokal` },
  ];

  const aboutLinks = [
    { label: tFooter('about') || 'Tentang', href: `/${locale}/tentang` },
    { label: tFooter('contact') || 'Kontak', href: `/${locale}/kontak` },
    { label: tFooter('privacy') || 'Privasi', href: `/${locale}/privasi` },
    { label: tFooter('terms') || 'Syarat & Ketentuan', href: `/${locale}/syarat-ketentuan` },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' }
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 group mb-4">
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-serif font-bold text-slate-900 dark:text-slate-50 transition-colors">
                  Filosofi
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400 tracking-wide transition-colors">
                  Jogja
                </span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
              {tFooter('aboutDescription') || 'Menjelajah warisan budaya di era digital'}
            </p>

            {/* Social Links */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                {tFooter('followUs') || 'Ikuti Kami'}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">
              {tFooter('exploreTitle') || 'Jelajah'}
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {tNav(link.key) || link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">
              {tFooter('aboutUsTitle') || 'Tentang Kami'}
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>info@filosofijogja.id</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>+62 274 123 4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Filosofi Jogja. {tFooter('copyright') || 'Semua hak dilindungi.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
