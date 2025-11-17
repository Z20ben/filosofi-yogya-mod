'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  const t = useTranslations();
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const locale = useLocale();

  const quickLinks = [
    {
      key: 'kawasan',
      href: `/${locale}/kawasan-sumbu-filosofi`
    },
    {
      key: 'sejarah',
      href: `/${locale}/sejarah-dan-riset`
    },
    {
      key: 'katalog',
      href: `/${locale}/potensi-umkm/katalog`
    },
    {
      key: 'galeri',
      href: `/${locale}/galeri-foto`
    },
    {
      key: 'agenda',
      href: `/${locale}/agenda-seni-budaya`
    },
  ];

  return (
    <footer className="bg-[var(--javanese-brown-bg)] text-javanese-ivory mt-20">
      <div className="wayang-border"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-javanese-gold mb-4 font-serif text-xl">
              {tFooter('aboutTitle')}
            </h3>
            <p className="text-javanese-ivory/80 leading-relaxed">
              {tFooter('aboutDescription')}
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center hover:bg-javanese-gold hover:text-[var(--javanese-brown-text)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center hover:bg-javanese-gold hover:text-[var(--javanese-brown-text)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center hover:bg-javanese-gold hover:text-[var(--javanese-brown-text)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-javanese-gold mb-4 font-serif text-xl">
              {tFooter('quickLinksTitle')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-javanese-ivory/80 hover:text-javanese-gold transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-javanese-gold mb-4 font-serif text-xl">
              {tFooter('contactTitle')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-javanese-gold mt-1 flex-shrink-0" />
                <span className="text-javanese-ivory/80">
                  Keraton Yogyakarta, Jl. Rotowijayan Blok No. 1, Yogyakarta
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-javanese-gold flex-shrink-0" />
                <span className="text-javanese-ivory/80">+62 274 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-javanese-gold flex-shrink-0" />
                <span className="text-javanese-ivory/80">info@sumbufilosofi.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-border-top mt-12 pt-8 text-center text-javanese-ivory/60">
          <p>
            &copy; {new Date().getFullYear()} Ensiklopedia Sumbu Filosofi Yogyakarta.{' '}
            {tFooter('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
