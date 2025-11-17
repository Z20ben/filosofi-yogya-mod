'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Save, MapPin, Code, Landmark, Store, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MapsPage() {
  const locale = useLocale();

  const [mapIframes, setMapIframes] = useState({
    kawasan: '<iframe src="https://www.google.com/maps/d/embed?mid=1..." width="100%" height="600"></iframe>',
    umkm: '<iframe src="https://www.google.com/maps/d/embed?mid=2..." width="100%" height="600"></iframe>',
    wisata: '<iframe src="https://www.google.com/maps/d/embed?mid=3..." width="100%" height="600"></iframe>',
  });

  const handleSave = () => {
    alert(locale === 'id' ? 'Konfigurasi peta akan disimpan' : 'Map configuration will be saved');
  };

  const renderMapTab = (
    key: 'kawasan' | 'umkm' | 'wisata',
    title: { id: string; en: string },
    description: { id: string; en: string },
    icon: React.ReactNode
  ) => {
    const currentValue = mapIframes[key];
    const hasValidIframe = currentValue.trim() !== '' && currentValue.includes('<iframe');

    return (
      <div className="bg-card p-6 rounded-xl border border-border space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1">
              {locale === 'id' ? title.id : title.en}
            </h3>
            <p className="text-sm text-muted-foreground">
              {locale === 'id' ? description.id : description.en}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`iframe-${key}`} className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            {locale === 'id' ? 'Kode Iframe Google MyMaps' : 'Google MyMaps Iframe Code'}
          </Label>
          <Textarea
            id={`iframe-${key}`}
            value={currentValue}
            onChange={(e) => setMapIframes({ ...mapIframes, [key]: e.target.value })}
            rows={6}
            className="font-mono text-sm"
            placeholder='<iframe src="https://www.google.com/maps/d/embed?mid=..." width="100%" height="600"></iframe>'
          />
          <p className="text-xs text-muted-foreground">
            {locale === 'id'
              ? 'Paste kode embed dari Google MyMaps di sini'
              : 'Paste embed code from Google MyMaps here'}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            {locale === 'id' ? 'Cara Mendapatkan Kode Embed:' : 'How to Get Embed Code:'}
          </h4>
          <ol className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
            <li>
              {locale === 'id'
                ? 'Buka Google MyMaps di https://www.google.com/mymaps'
                : 'Open Google MyMaps at https://www.google.com/mymaps'}
            </li>
            <li>
              {locale === 'id' ? 'Pilih atau buat peta baru untuk kategori ini' : 'Select or create a new map for this category'}
            </li>
            <li>
              {locale === 'id'
                ? 'Tambahkan marker/pin sesuai data (hanya untuk kategori ini)'
                : 'Add markers/pins according to data (only for this category)'}
            </li>
            <li>
              {locale === 'id'
                ? 'Klik menu titik tiga (⋮) > Share or embed map'
                : 'Click the three-dot menu (⋮) > Share or embed map'}
            </li>
            <li>
              {locale === 'id' ? 'Pilih tab "Embed on my site"' : 'Select the "Embed on my site" tab'}
            </li>
            <li>
              {locale === 'id' ? 'Salin kode HTML dan paste di atas' : 'Copy the HTML code and paste it above'}
            </li>
          </ol>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>{locale === 'id' ? 'Preview Peta' : 'Map Preview'}</Label>
          <div className="w-full h-[400px] bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            {hasValidIframe ? (
              <div className="w-full h-full p-2">
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: currentValue }}
                />
              </div>
            ) : (
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {locale === 'id'
                    ? 'Preview peta akan ditampilkan di sini setelah kode iframe diisi'
                    : 'Map preview will be displayed here after iframe code is filled'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Konfigurasi Peta' : 'Map Configuration'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola 3 peta interaktif dari Google MyMaps' : 'Manage 3 interactive maps from Google MyMaps'}
          </p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
          <Save className="w-4 h-4 mr-2" />
          {locale === 'id' ? 'Simpan Semua' : 'Save All'}
        </Button>
      </div>

      {/* Info Card */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
          {locale === 'id' ? '💡 Kenapa 3 Peta Terpisah?' : '💡 Why 3 Separate Maps?'}
        </h3>
        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1 list-disc list-inside">
          <li>
            {locale === 'id'
              ? 'Setiap halaman menampilkan data yang relevan saja (fokus & clarity)'
              : 'Each page displays only relevant data (focus & clarity)'}
          </li>
          <li>
            {locale === 'id'
              ? 'Loading lebih cepat karena tidak load semua data sekaligus'
              : 'Faster loading as it does not load all data at once'}
          </li>
          <li>
            {locale === 'id'
              ? 'Bisa custom warna marker & icon berbeda per kategori'
              : 'Can customize marker colors & icons differently per category'}
          </li>
          <li>
            {locale === 'id'
              ? 'Lebih mudah update per kategori tanpa ganggu yang lain'
              : 'Easier to update per category without affecting others'}
          </li>
        </ul>
      </div>

      {/* Tabs for 3 Maps */}
      <Tabs defaultValue="kawasan" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="kawasan" className="flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            <span className="hidden sm:inline">{locale === 'id' ? 'Kawasan' : 'Districts'}</span>
          </TabsTrigger>
          <TabsTrigger value="umkm" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            <span className="hidden sm:inline">UMKM</span>
          </TabsTrigger>
          <TabsTrigger value="wisata" className="flex items-center gap-2">
            <MapIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{locale === 'id' ? 'Wisata' : 'Tourism'}</span>
          </TabsTrigger>
        </TabsList>

        {/* Kawasan Sumbu Filosofi */}
        <TabsContent value="kawasan" className="space-y-4">
          {renderMapTab(
            'kawasan',
            {
              id: 'Peta Kawasan Sumbu Filosofi',
              en: 'Philosophical Axis Districts Map',
            },
            {
              id: 'Peta interaktif yang menampilkan landmarks dan area di sepanjang sumbu filosofi Yogyakarta (Pantai Selatan - Keraton - Tugu - Merapi)',
              en: 'Interactive map displaying landmarks and areas along the Yogyakarta philosophical axis (South Beach - Palace - Monument - Merapi)',
            },
            <Landmark className="w-5 h-5 text-white" />
          )}
        </TabsContent>

        {/* Potensi UMKM */}
        <TabsContent value="umkm" className="space-y-4">
          {renderMapTab(
            'umkm',
            {
              id: 'Peta Potensi UMKM',
              en: 'MSME Potential Map',
            },
            {
              id: 'Peta interaktif yang menampilkan lokasi UMKM (usaha mikro, kecil, dan menengah) di sekitar sumbu filosofi Yogyakarta',
              en: 'Interactive map displaying MSME (micro, small, and medium enterprises) locations around the Yogyakarta philosophical axis',
            },
            <Store className="w-5 h-5 text-white" />
          )}
        </TabsContent>

        {/* Potensi Wisata */}
        <TabsContent value="wisata" className="space-y-4">
          {renderMapTab(
            'wisata',
            {
              id: 'Peta Potensi Wisata',
              en: 'Tourism Potential Map',
            },
            {
              id: 'Peta interaktif yang menampilkan objek wisata, tempat bersejarah, dan destinasi menarik di sekitar sumbu filosofi Yogyakarta',
              en: 'Interactive map displaying tourist attractions, historical sites, and interesting destinations around the Yogyakarta philosophical axis',
            },
            <MapIcon className="w-5 h-5 text-white" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
