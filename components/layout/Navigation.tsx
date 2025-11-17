'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe, Moon, Sun, ChevronDown, LogIn } from 'lucide-react';

type MenuGroup = {
  key: string;
  label: string;
  type: 'single' | 'dropdown';
  href?: string;
  items?: Array<{
    key: string;
    label: string;
    href: string;
  }>;
};

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Wait for component to mount to prevent hydration mismatch
  // Server doesn't know user's theme preference from localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Grouped menu structure matching original design
  const menuGroups: MenuGroup[] = [
    {
      key: 'home',
      label: t('home'),
      type: 'single',
      href: `/${locale}`,
    },
    {
      key: 'kawasan-group',
      label: t('kawasanGroup'),
      type: 'dropdown',
      items: [
        { key: 'kawasan', label: t('kawasan'), href: `/${locale}/kawasan-sumbu-filosofi` },
        { key: 'sejarah', label: t('sejarah'), href: `/${locale}/sejarah-dan-riset` },
        { key: 'wisata', label: t('wisata'), href: `/${locale}/potensi-wisata` },
      ],
    },
    {
      key: 'umkm-group',
      label: t('umkmGroup'),
      type: 'dropdown',
      items: [
        { key: 'umkm', label: t('umkm'), href: `/${locale}/potensi-umkm` },
        { key: 'katalog', label: t('katalog'), href: `/${locale}/potensi-umkm/katalog` },
      ],
    },
    {
      key: 'media-group',
      label: t('mediaGroup'),
      type: 'dropdown',
      items: [
        { key: 'galeri', label: t('galeri'), href: `/${locale}/galeri-foto` },
        { key: 'agenda', label: t('agenda'), href: `/${locale}/agenda-seni-budaya` },
      ],
    },
    {
      key: 'tentang',
      label: t('tentang'),
      type: 'single',
      href: `/${locale}/tentang`,
    },
  ];

  // Scroll behavior for hiding/showing navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
        setOpenDropdown(null);
        setMobileMenuOpen(false); // Close mobile menu when scrolling down
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    // Get current path without locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Redirect to same path with new locale
    router.push(`/${newLocale}${pathWithoutLocale || ''}`);
  };

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const isActiveGroup = (group: MenuGroup) => {
    if (group.type === 'single') {
      return pathname === group.href;
    }
    return group.items?.some((item) => pathname === item.href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            {/* Logo Image - Commented for now */}
            {/* <div className="w-12 h-12 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
              <Image
                src="/assets/fcbd9c1adc4e5f7b378480e7e255d48862891047.png"
                alt="Filosofi Jogja Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div> */}
            <div className="block">
              <div className="font-serif font-bold text-lg text-foreground">
                Filosofi
              </div>
              <div className="text-xs text-muted-foreground">Jogja</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {menuGroups.map((group) => {
              if (group.type === 'single') {
                return (
                  <Link
                    key={group.key}
                    href={group.href!}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      isActiveGroup(group)
                        ? 'bg-[var(--javanese-brown-bg)] text-javanese-ivory shadow-sm'
                        : 'text-[var(--javanese-brown-text)] hover:bg-gold-100'
                    }`}
                  >
                    {group.label}
                  </Link>
                );
              }

              // Dropdown menu
              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                      isActiveGroup(group)
                        ? 'bg-[var(--javanese-brown-bg)] text-javanese-ivory shadow-sm'
                        : 'text-[var(--javanese-brown-text)] hover:bg-gold-100'
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === group.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown content */}
                  {openDropdown === group.key && (
                    <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-card rounded-lg shadow-xl border border-border py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {group.items?.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`block w-full text-left px-4 py-2.5 transition-colors ${
                            pathname === item.href
                              ? 'bg-gold-100 text-[var(--javanese-brown-text)]'
                              : 'text-[var(--javanese-brown-text)] hover:bg-gold-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle with Active Language Display */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold-100 text-[var(--javanese-brown-text)] hover:bg-gold-200 transition-all hover:scale-105"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5 hidden sm:inline" />
              <span className="text-sm font-medium uppercase">
                {locale}
              </span>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center p-2 rounded-lg bg-gold-100 text-[var(--javanese-brown-text)] hover:bg-gold-200 transition-all hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            {/* Admin Login Button */}
            <Link
              href={`/${locale}/admin/login`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border ${
                pathname.startsWith(`/${locale}/admin`)
                  ? 'bg-[var(--javanese-brown-bg)] text-javanese-ivory border-[var(--javanese-brown-bg)] shadow-md'
                  : 'border-javanese-brown/20 text-[var(--javanese-brown-text)] hover:border-[var(--javanese-brown-text)] hover:bg-gold-100'
              }`}
              title={t('admin')}
            >
              <LogIn className="h-5 w-5" />
              <span className="hidden lg:inline text-sm">{t('admin')}</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-javanese-brown/10 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {menuGroups.map((group) => {
                if (group.type === 'single') {
                  return (
                    <Link
                      key={group.key}
                      href={group.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-left transition-all ${
                        isActiveGroup(group)
                          ? 'bg-[var(--javanese-brown-bg)] text-javanese-ivory shadow-sm'
                          : 'text-[var(--javanese-brown-text)] hover:bg-gold-100'
                      }`}
                    >
                      {group.label}
                    </Link>
                  );
                }

                // Mobile dropdown
                return (
                  <div key={group.key} className="space-y-1">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === group.key ? null : group.key)
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                        isActiveGroup(group)
                          ? 'bg-[var(--javanese-brown-bg)] text-javanese-ivory shadow-sm'
                          : 'text-[var(--javanese-brown-text)] hover:bg-gold-100'
                      }`}
                    >
                      {group.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === group.key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openDropdown === group.key && (
                      <div className="ml-4 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {group.items?.map((item) => (
                          <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                            className={`block w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                              pathname === item.href
                                ? 'bg-gold-200 text-[var(--javanese-brown-text)]'
                                : 'text-[var(--javanese-brown-text)] hover:bg-gold-50'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
