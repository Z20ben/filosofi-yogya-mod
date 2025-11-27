'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe, Moon, Sun, ChevronDown, LogIn } from 'lucide-react';
import { getCategoryParam, translateCategoryParam } from '@/config/categoryParams';

type MenuGroup = {
  key: string;
  label: string;
  type: 'single' | 'dropdown';
  href?: string;
  badge?: boolean;
  items?: Array<{
    key: string;
    label: string;
    href: string;
  }>;
};

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentLocale = locale as 'id' | 'en';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Menu structure for modern encyclopedia
  const menuGroups: MenuGroup[] = [
    // Urutan: Ensiklopedia, Agenda, Destinasi Wisata, Spot Nongkrong, UMKM
    {
      key: 'ensiklopedia-group',
      label: t('ensiklopedia') || 'Ensiklopedia',
      type: 'dropdown',
      href: `/${locale}/encyclopedia`,
      items: [
        { key: 'warisan-benda', label: t('warisanBenda') || 'Warisan Budaya Benda', href: `/${locale}/encyclopedia?category=${getCategoryParam('encyclopedia', 'warisan-benda', currentLocale)}` },
        { key: 'warisan-takbenda', label: t('warisanTakBenda') || 'Warisan Budaya Tak Benda', href: `/${locale}/encyclopedia?category=${getCategoryParam('encyclopedia', 'warisan-takbenda', currentLocale)}` },
        { key: 'tokoh', label: t('tokoh') || 'Tokoh / Sejarah', href: `/${locale}/encyclopedia?category=${getCategoryParam('encyclopedia', 'tokoh', currentLocale)}` },
        { key: 'istilah', label: t('istilah') || 'Istilah', href: `/${locale}/encyclopedia?category=${getCategoryParam('encyclopedia', 'istilah', currentLocale)}` },
        { key: 'peta-interaktif', label: t('petaInteraktif') || 'Peta Interaktif', href: `/${locale}/map` },
      ],
    },
    {
      key: 'agenda-group',
      label: t('agenda') || 'Agenda',
      type: 'dropdown',
      href: `/${locale}/agenda-event`,
      items: [
        { key: 'budaya', label: t('budayaUpacara') || 'Budaya & Upacara', href: `/${locale}/agenda-event?category=${getCategoryParam('agendaEvent', 'budaya', currentLocale)}` },
        { key: 'festival', label: t('festivalHiburan') || 'Festival & Hiburan', href: `/${locale}/agenda-event?category=${getCategoryParam('agendaEvent', 'festival', currentLocale)}` },
        { key: 'workshop', label: t('komunitasWorkshop') || 'Komunitas & Workshop', href: `/${locale}/agenda-event?category=${getCategoryParam('agendaEvent', 'komunitas', currentLocale)}` },
      ],
    },
    {
      key: 'destinasi-group',
      label: t('destinasiWisata') || 'Destinasi Wisata',
      type: 'dropdown',
      href: `/${locale}/destinasi-wisata`,
      items: [
        { key: 'titik-sumbu', label: t('titikSumbu') || 'Titik Sumbu', href: `/${locale}/destinasi-wisata?category=${getCategoryParam('destinasiWisata', 'titik-sumbu', currentLocale)}` },
        { key: 'cagar-budaya', label: t('cagarBudaya') || 'Cagar Budaya', href: `/${locale}/destinasi-wisata?category=${getCategoryParam('destinasiWisata', 'cagar-budaya', currentLocale)}` },
        { key: 'museum', label: t('museumGaleri') || 'Museum & Galeri', href: `/${locale}/destinasi-wisata?category=${getCategoryParam('destinasiWisata', 'museum', currentLocale)}` },
      ],
    },
    {
      key: 'spot-nongkrong-group',
      label: t('spotNongkrong') || 'Spot Nongkrong',
      type: 'dropdown',
      href: `/${locale}/spot-nongkrong`,
      items: [
        { key: 'trending-now', label: t('trendingNow') || 'Trending Now', href: `/${locale}/trending` },
      ],
    },
    {
      key: 'umkm-group',
      label: t('umkm') || 'UMKM',
      type: 'dropdown',
      href: `/${locale}/umkm-lokal`,
      items: [
        { key: 'kuliner', label: t('kuliner') || 'Kuliner', href: `/${locale}/umkm-lokal?category=${getCategoryParam('umkmLokal', 'culinary', currentLocale)}` },
        { key: 'busana', label: t('busana') || 'Busana', href: `/${locale}/umkm-lokal?category=${getCategoryParam('umkmLokal', 'fashion', currentLocale)}` },
        { key: 'craft', label: t('produkKreatif') || 'Produk Kreatif', href: `/${locale}/umkm-lokal?category=${getCategoryParam('umkmLokal', 'craft', currentLocale)}` },
      ],
    },
    // COMMENTED OUT - Menu yang tidak digunakan
    // {
    //   key: 'home',
    //   label: t('home'),
    //   type: 'single',
    //   href: `/${locale}`,
    // },
    // {
    //   key: 'peta-interaktif',
    //   label: t('petaInteraktif') || 'Map Interaktif',
    //   type: 'single',
    //   href: `/${locale}/peta-interaktif`,
    //   badge: true,
    // },
  ];

  // Scroll behavior for hiding/showing navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
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
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');

    // Translate search params
    const newSearchParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key === 'category') {
        // Translate category param
        const translatedValue = translateCategoryParam(value, currentLocale, newLocale as 'id' | 'en');
        newSearchParams.set(key, translatedValue);
      } else {
        newSearchParams.set(key, value);
      }
    });

    const queryString = newSearchParams.toString();
    const newPath = `/${newLocale}${pathWithoutLocale || ''}${queryString ? `?${queryString}` : ''}`;
    router.push(newPath);
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
    // Only highlight parent when on exact parent page (without query params)
    if (group.type === 'single') {
      return pathname === group.href;
    }
    // For dropdown, only active if pathname exactly matches parent href (no query params)
    const parentPath = group.href?.split('?')[0];
    return pathname === parentPath;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-800 shadow-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="block">
              <div className="font-serif font-bold text-lg text-slate-900 dark:text-slate-50 transition-colors">
                Filosofi
              </div>
              <div className="text-xs text-muted-foreground">Jogja</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuGroups.map((group) => {
              if (group.type === 'single') {
                return (
                  <Link
                    key={group.key}
                    href={group.href!}
                    className={`relative px-4 py-2 rounded-md text-sm transition-colors ${
                      isActiveGroup(group)
                        ? 'text-orange-600 dark:text-orange-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400'
                    }`}
                  >
                    {group.label}
                    {group.badge && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-md animate-pulse">
                        ★
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={group.href!}
                    className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm transition-colors ${
                      isActiveGroup(group)
                        ? 'text-orange-600 dark:text-orange-400 font-semibold'
                        : openDropdown === group.key
                        ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400'
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === group.key ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>

                  {openDropdown === group.key && (
                    <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      {group.items?.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block w-full text-left px-4 py-2.5 text-sm transition-colors text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400"
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
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-slate-700 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {menuGroups.map((group) => {
                if (group.type === 'single') {
                  return (
                    <Link
                      key={group.key}
                      href={group.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-md text-left transition-colors ${
                        isActiveGroup(group)
                          ? 'text-orange-600 dark:text-orange-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400'
                      }`}
                    >
                      {group.label}
                      {group.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-md">
                          ★
                        </span>
                      )}
                    </Link>
                  );
                }

                return (
                  <div key={group.key} className="space-y-1">
                    {/* Split Button: Link (left) + Toggle (right) */}
                    <div className="flex items-center gap-0.5">
                      <Link
                        href={group.href!}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex-1 px-4 py-2.5 rounded-l-md text-left transition-colors ${
                          isActiveGroup(group)
                            ? 'text-orange-600 dark:text-orange-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400'
                        }`}
                      >
                        {group.label}
                      </Link>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === group.key ? null : group.key)
                        }
                        className={`px-3 py-2.5 rounded-r-md transition-colors ${
                          openDropdown === group.key
                            ? 'bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400'
                        }`}
                        aria-label="Toggle submenu"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === group.key ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

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
                            className="block w-full text-left px-4 py-2 rounded-md text-sm transition-colors text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400"
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
