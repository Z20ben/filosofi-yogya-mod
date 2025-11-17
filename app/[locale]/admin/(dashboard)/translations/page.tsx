'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Save, Languages, Search, Download, Upload, AlertCircle, CheckCircle2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TranslationKey {
  key: string;
  namespace: string;
  id: string;
  en: string;
  status: 'complete' | 'missing' | 'pending';
}

export default function TranslationsPage() {
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNamespace, setSelectedNamespace] = useState('all');
  const [selectedKey, setSelectedKey] = useState<TranslationKey | null>(null);

  // Mock translation data
  const mockTranslations: TranslationKey[] = [
    {
      key: 'common.welcome',
      namespace: 'common',
      id: 'Selamat datang di Ensiklopedia Budaya Yogyakarta',
      en: 'Welcome to Yogyakarta Cultural Encyclopedia',
      status: 'complete',
    },
    {
      key: 'common.search_placeholder',
      namespace: 'common',
      id: 'Cari konten...',
      en: 'Search content...',
      status: 'complete',
    },
    {
      key: 'navigation.home',
      namespace: 'navigation',
      id: 'Beranda',
      en: 'Home',
      status: 'complete',
    },
    {
      key: 'navigation.explore',
      namespace: 'navigation',
      id: 'Jelajahi',
      en: 'Explore',
      status: 'complete',
    },
    {
      key: 'navigation.about',
      namespace: 'navigation',
      id: 'Tentang',
      en: 'About',
      status: 'complete',
    },
    {
      key: 'umkm.business_name',
      namespace: 'umkm',
      id: 'Nama Usaha',
      en: 'Business Name',
      status: 'complete',
    },
    {
      key: 'umkm.category',
      namespace: 'umkm',
      id: 'Kategori',
      en: 'Category',
      status: 'complete',
    },
    {
      key: 'wisata.tourist_attraction',
      namespace: 'wisata',
      id: 'Objek Wisata',
      en: 'Tourist Attraction',
      status: 'complete',
    },
    {
      key: 'wisata.opening_hours',
      namespace: 'wisata',
      id: 'Jam Buka',
      en: 'Opening Hours',
      status: 'complete',
    },
    {
      key: 'admin.dashboard',
      namespace: 'admin',
      id: 'Dasbor',
      en: 'Dashboard',
      status: 'complete',
    },
    {
      key: 'admin.content_management',
      namespace: 'admin',
      id: 'Manajemen Konten',
      en: 'Content Management',
      status: 'complete',
    },
    {
      key: 'admin.new_feature_label',
      namespace: 'admin',
      id: 'Label Fitur Baru',
      en: '',
      status: 'missing',
    },
  ];

  const namespaces = ['all', ...Array.from(new Set(mockTranslations.map((t) => t.namespace)))];

  const filteredTranslations = mockTranslations.filter((t) => {
    const matchesSearch = t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNamespace = selectedNamespace === 'all' || t.namespace === selectedNamespace;
    return matchesSearch && matchesNamespace;
  });

  const stats = {
    total: mockTranslations.length,
    complete: mockTranslations.filter((t) => t.status === 'complete').length,
    missing: mockTranslations.filter((t) => t.status === 'missing').length,
    pending: mockTranslations.filter((t) => t.status === 'pending').length,
  };

  const handleSave = () => {
    alert(locale === 'id' ? 'Terjemahan akan disimpan' : 'Translations will be saved');
  };

  const handleExport = () => {
    alert(locale === 'id' ? 'Export file terjemahan' : 'Export translation files');
  };

  const handleImport = () => {
    alert(locale === 'id' ? 'Import file terjemahan' : 'Import translation files');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Manajemen Terjemahan' : 'Translation Management'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola terjemahan multi-bahasa (Indonesia & English)' : 'Manage multi-language translations (Indonesian & English)'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleImport} variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            {locale === 'id' ? 'Import' : 'Import'}
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {locale === 'id' ? 'Export' : 'Export'}
          </Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white" size="sm">
            <Save className="w-4 h-4 mr-2" />
            {locale === 'id' ? 'Simpan' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-1">
            <Languages className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-medium text-muted-foreground">{locale === 'id' ? 'Total Keys' : 'Total Keys'}</p>
          </div>
          <p className="text-2xl font-bold text-[var(--javanese-brown-text)]">{stats.total}</p>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <p className="text-xs font-medium text-muted-foreground">{locale === 'id' ? 'Lengkap' : 'Complete'}</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.complete}</p>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-xs font-medium text-muted-foreground">{locale === 'id' ? 'Hilang' : 'Missing'}</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.missing}</p>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <p className="text-xs font-medium text-muted-foreground">{locale === 'id' ? 'Pending' : 'Pending'}</p>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
      </div>

      <Tabs defaultValue="browser" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browser">{locale === 'id' ? 'Browser' : 'Browser'}</TabsTrigger>
          <TabsTrigger value="editor">{locale === 'id' ? 'Editor' : 'Editor'}</TabsTrigger>
          <TabsTrigger value="missing">{locale === 'id' ? 'Terjemahan Hilang' : 'Missing Translations'}</TabsTrigger>
        </TabsList>

        {/* Translation Browser */}
        <TabsContent value="browser" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={locale === 'id' ? 'Cari key, teks Indonesia, atau teks English...' : 'Search key, Indonesian text, or English text...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={selectedNamespace} onValueChange={setSelectedNamespace}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {namespaces.map((ns) => (
                      <SelectItem key={ns} value={ns}>
                        {ns === 'all' ? (locale === 'id' ? 'Semua Namespace' : 'All Namespaces') : ns}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Translation List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredTranslations.map((translation) => (
                <div
                  key={translation.key}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedKey?.key === translation.key
                      ? 'border-[var(--javanese-brown-bg)] bg-[var(--javanese-brown-bg)]/5'
                      : 'border-border hover:border-[var(--javanese-brown-bg)]/50'
                  }`}
                  onClick={() => setSelectedKey(translation)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">{translation.key}</code>
                        <span className="text-xs text-muted-foreground">({translation.namespace})</span>
                        {translation.status === 'missing' && (
                          <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 px-2 py-0.5 rounded">
                            {locale === 'id' ? 'Hilang' : 'Missing'}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">🇮🇩 Bahasa Indonesia</p>
                          <p className="text-[var(--javanese-brown-text)]">{translation.id || <em className="text-muted-foreground">Empty</em>}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">🇬🇧 English</p>
                          <p className="text-[var(--javanese-brown-text)]">{translation.en || <em className="text-red-600">Missing translation</em>}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredTranslations.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Languages className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{locale === 'id' ? 'Tidak ada terjemahan ditemukan' : 'No translations found'}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Translation Editor */}
        <TabsContent value="editor" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            {selectedKey ? (
              <>
                <div>
                  <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1">
                    {locale === 'id' ? 'Edit Terjemahan' : 'Edit Translation'}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-sm font-mono bg-muted px-3 py-1 rounded">{selectedKey.key}</code>
                    <span className="text-sm text-muted-foreground">({selectedKey.namespace})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="translation-id" className="flex items-center gap-2">
                      🇮🇩 <span>{locale === 'id' ? 'Bahasa Indonesia' : 'Indonesian'}</span>
                    </Label>
                    <Textarea
                      id="translation-id"
                      value={selectedKey.id}
                      onChange={(e) => setSelectedKey({ ...selectedKey, id: e.target.value })}
                      rows={5}
                      className="font-medium"
                    />
                    <p className="text-xs text-muted-foreground">
                      {selectedKey.id.length} {locale === 'id' ? 'karakter' : 'characters'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="translation-en" className="flex items-center gap-2">
                      🇬🇧 <span>English</span>
                    </Label>
                    <Textarea
                      id="translation-en"
                      value={selectedKey.en}
                      onChange={(e) => setSelectedKey({ ...selectedKey, en: e.target.value })}
                      rows={5}
                      className="font-medium"
                    />
                    <p className="text-xs text-muted-foreground">
                      {selectedKey.en.length} {locale === 'id' ? 'karakter' : 'characters'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {locale === 'id' ? 'Status:' : 'Status:'}{' '}
                    {selectedKey.status === 'complete' && <span className="text-green-600 font-medium">Complete</span>}
                    {selectedKey.status === 'missing' && <span className="text-red-600 font-medium">Missing</span>}
                    {selectedKey.status === 'pending' && <span className="text-yellow-600 font-medium">Pending</span>}
                  </div>
                  <Button onClick={handleSave} className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    {locale === 'id' ? 'Simpan Perubahan' : 'Save Changes'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Languages className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{locale === 'id' ? 'Pilih key terjemahan dari tab Browser untuk mengedit' : 'Select a translation key from the Browser tab to edit'}</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Missing Translations */}
        <TabsContent value="missing" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1">
                {locale === 'id' ? 'Terjemahan yang Belum Lengkap' : 'Incomplete Translations'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'id' ? `${stats.missing} terjemahan belum lengkap` : `${stats.missing} translations are incomplete`}
              </p>
            </div>

            <div className="space-y-2">
              {mockTranslations
                .filter((t) => t.status === 'missing')
                .map((translation) => (
                  <div key={translation.key} className="p-4 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <code className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded">{translation.key}</code>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">🇮🇩 Bahasa Indonesia</p>
                            <p className="text-sm">{translation.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">🇬🇧 English</p>
                            <p className="text-sm text-red-600 italic">{locale === 'id' ? 'Belum diterjemahkan' : 'Not translated yet'}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedKey(translation);
                          // Switch to editor tab
                        }}
                      >
                        {locale === 'id' ? 'Edit' : 'Edit'}
                      </Button>
                    </div>
                  </div>
                ))}

              {stats.missing === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <p className="text-green-600 font-medium">
                    {locale === 'id' ? 'Semua terjemahan sudah lengkap!' : 'All translations are complete!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
