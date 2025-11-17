'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import {
  LogOut, Menu, X,
  LayoutDashboard, FileText, Image as ImageIcon,
  Calendar, Store, Map, Settings, Users, BarChart3,
  Languages, HelpCircle, Landmark, BookOpen, MapPin,
  ChevronDown, Bell, Globe, Sun, Moon, User
} from 'lucide-react';
import Link from 'next/link';
import { QueryProvider } from '@/components/admin/providers/QueryProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['content', 'settings']);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Mock user email (TODO: replace with real auth)
  const email = 'admin@example.com';

  // Wait for component to mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto open sidebar di desktop on mount (only after mounted)
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  // Handle language toggle
  const toggleLanguage = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
  };

  const handleLogout = () => {
    router.push(`/${locale}`);
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  // Close sidebar di mobile ketika route berubah
  useEffect(() => {
    if (!mounted) return;

    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname, mounted]);

  // Menu configuration
  const menuConfig = [
    {
      id: 'dashboard-section',
      label: locale === 'id' ? 'Dashboard' : 'Dashboard',
      items: [
        { id: 'dashboard', icon: LayoutDashboard, label: locale === 'id' ? 'Ringkasan' : 'Overview', href: `/${locale}/admin` },
      ],
    },
    {
      id: 'content',
      label: locale === 'id' ? 'Konten' : 'Content',
      collapsible: true,
      items: [
        { id: 'kawasan', icon: Landmark, label: locale === 'id' ? 'Kawasan & Landmarks' : 'Area & Landmarks', href: `/${locale}/admin/kawasan` },
        { id: 'sejarah', icon: BookOpen, label: locale === 'id' ? 'Sejarah & Riset' : 'History & Research', href: `/${locale}/admin/sejarah` },
        { id: 'wisata', icon: MapPin, label: locale === 'id' ? 'Potensi Wisata' : 'Tourism Potential', href: `/${locale}/admin/wisata` },
        { id: 'umkm', icon: Store, label: locale === 'id' ? 'Potensi UMKM' : 'MSME Potential', href: `/${locale}/admin/umkm` },
        { id: 'agenda', icon: Calendar, label: locale === 'id' ? 'Agenda Seni & Budaya' : 'Arts & Culture Events', href: `/${locale}/admin/agenda` },
        { id: 'galeri', icon: ImageIcon, label: locale === 'id' ? 'Galeri Foto' : 'Photo Gallery', href: `/${locale}/admin/galeri` },
      ],
    },
    {
      id: 'media',
      label: locale === 'id' ? 'Media' : 'Media',
      collapsible: true,
      items: [
        { id: 'media', icon: FileText, label: locale === 'id' ? 'Pustaka Media' : 'Media Library', href: `/${locale}/admin/media` },
        { id: 'maps', icon: Map, label: locale === 'id' ? 'Konfigurasi Peta' : 'Maps Configuration', href: `/${locale}/admin/maps` },
      ],
    },
    {
      id: 'settings',
      label: locale === 'id' ? 'Pengaturan' : 'Settings',
      collapsible: true,
      items: [
        { id: 'homepage', icon: LayoutDashboard, label: locale === 'id' ? 'Pengaturan Beranda' : 'Homepage Settings', href: `/${locale}/admin/homepage` },
        { id: 'faq', icon: HelpCircle, label: locale === 'id' ? 'Manajemen FAQ' : 'FAQ Management', href: `/${locale}/admin/faq` },
        { id: 'seo', icon: BarChart3, label: locale === 'id' ? 'SEO & Meta' : 'SEO & Meta', href: `/${locale}/admin/seo` },
        { id: 'users', icon: Users, label: locale === 'id' ? 'Manajemen Pengguna' : 'User Management', href: `/${locale}/admin/users` },
        { id: 'translations', icon: Languages, label: locale === 'id' ? 'Terjemahan' : 'Translations', href: `/${locale}/admin/translations` },
        { id: 'site-settings', icon: Settings, label: locale === 'id' ? 'Pengaturan Situs' : 'Site Settings', href: `/${locale}/admin/site-settings` },
      ],
    },
    {
      id: 'analytics-section',
      label: locale === 'id' ? 'Analitik' : 'Analytics',
      items: [
        { id: 'analytics', icon: BarChart3, label: locale === 'id' ? 'Laporan & Statistik' : 'Reports & Statistics', href: `/${locale}/admin/analytics` },
      ],
    },
  ];

  // Check if menu item is active
  const isActive = (href: string) => {
    return pathname === href;
  };

  // Get page title from current pathname
  const getPageTitle = () => {
    const allItems = menuConfig.flatMap(section => section.items);
    const currentItem = allItems.find(item => item.href === pathname);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Backdrop Overlay - Mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-full sm:w-80 lg:w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-[var(--javanese-gold)]" />
                </div>
                <div>
                  <h2 className="text-[var(--javanese-brown-text)] font-semibold">Admin Panel</h2>
                  <p className="text-xs text-[var(--javanese-brown-text)]/60">
                    {locale === 'id' ? 'Kelola Konten' : 'Manage Content'}
                  </p>
                </div>
              </div>
              {/* Close button - Mobile only */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-[var(--javanese-gold)]/10 rounded-lg transition-colors"
                title={locale === 'id' ? 'Tutup Menu' : 'Close Menu'}
              >
                <X className="w-5 h-5 text-[var(--javanese-brown-text)]" />
              </button>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            {menuConfig.map((section) => (
              <div key={section.id} className="mb-4">
                {section.collapsible ? (
                  <>
                    <button
                      onClick={() => toggleMenu(section.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[var(--javanese-brown-text)]/70 hover:text-[var(--javanese-brown-text)] transition-colors"
                    >
                      <span>{section.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        expandedMenus.includes(section.id) ? 'rotate-0' : '-rotate-90'
                      }`} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedMenus.includes(section.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="mt-1 space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                                isActive(item.href)
                                  ? 'bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] text-white shadow-md'
                                  : 'text-[var(--javanese-brown-text)]/70 hover:bg-[var(--javanese-gold)]/10 hover:text-[var(--javanese-brown-text)]'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive(item.href)
                              ? 'bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] text-white shadow-md'
                              : 'text-[var(--javanese-brown-text)]/70 hover:bg-[var(--javanese-gold)]/10 hover:text-[var(--javanese-brown-text)]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 w-full transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-background border-b border-border">
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-[var(--javanese-gold)]/10 rounded-lg transition-colors"
                title={sidebarOpen ? (locale === 'id' ? 'Tutup Menu' : 'Close Menu') : (locale === 'id' ? 'Buka Menu' : 'Open Menu')}
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                ) : (
                  <Menu className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                )}
              </button>
              <h1 className="text-lg sm:text-2xl font-bold text-[var(--javanese-brown-text)] truncate">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 hover:bg-[var(--javanese-gold)]/10 rounded-lg transition-colors"
                  title={theme === 'dark' ? (locale === 'id' ? 'Mode Terang' : 'Light Mode') : (locale === 'id' ? 'Mode Gelap' : 'Dark Mode')}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                  ) : (
                    <Moon className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                  )}
                </button>
              )}

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-[var(--javanese-gold)]/10 transition-all"
                title={locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              >
                <Globe className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                <span className="hidden sm:inline text-sm font-medium uppercase text-[var(--javanese-brown-text)]">
                  {locale}
                </span>
              </button>

              {/* Notification Bell */}
              <button className="relative p-2 hover:bg-[var(--javanese-gold)]/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Dropdown Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 bg-card rounded-lg border border-border hover:bg-[var(--javanese-gold)]/10 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] rounded-full flex items-center justify-center">
                    <span className="text-xs text-[var(--javanese-ivory)] font-semibold">
                      {email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm text-[var(--javanese-brown-text)] max-w-[150px] truncate">{email}</span>
                  <ChevronDown className={`w-4 h-4 text-[var(--javanese-brown-text)] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg border border-border shadow-xl z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium text-[var(--javanese-brown-text)]">{email}</p>
                      <p className="text-xs text-[var(--javanese-brown-text)]/60 mt-1">
                        {locale === 'id' ? 'Administrator' : 'Administrator'}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href={`/${locale}/admin/profile`}
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">{locale === 'id' ? 'Profil Saya' : 'My Profile'}</span>
                      </Link>

                      <Link
                        href={`/${locale}/admin/site-settings`}
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">{locale === 'id' ? 'Pengaturan Situs' : 'Site Settings'}</span>
                      </Link>

                      <div className="border-t border-border my-2"></div>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">{locale === 'id' ? 'Keluar' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-3 sm:p-6">
          <QueryProvider>{children}</QueryProvider>
        </div>
      </main>
    </div>
  );
}
