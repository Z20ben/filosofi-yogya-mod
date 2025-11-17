'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Save, Globe, FileText, Hash, Image as ImageIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SEOPage() {
  const locale = useLocale();

  const [globalSEO, setGlobalSEO] = useState({
    title: 'Ensiklopedia Sumbu Filosofi Yogyakarta',
    description: 'Platform digital yang mendokumentasikan warisan budaya dan filosofi Yogyakarta',
    keywords: 'yogyakarta, budaya jawa, filosofi jawa, keraton, prambanan, wisata jogja',
    ogImage: '/og-image.jpg',
    twitterCard: 'summary_large_image',
    twitterHandle: '@filosofiyogya',
  });

  const [robotsTxt, setRobotsTxt] = useState(`User-agent: *
Allow: /
Sitemap: https://filosofiyogya.id/sitemap.xml`);

  const handleSave = () => {
    alert(locale === 'id' ? 'Pengaturan SEO akan disimpan' : 'SEO settings will be saved');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">SEO & Meta Tags</h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Optimalkan website untuk mesin pencari' : 'Optimize website for search engines'}
          </p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
          <Save className="w-4 h-4 mr-2" />
          {locale === 'id' ? 'Simpan' : 'Save'}
        </Button>
      </div>

      <Tabs defaultValue="global" className="space-y-4">
        <TabsList>
          <TabsTrigger value="global">{locale === 'id' ? 'Global SEO' : 'Global SEO'}</TabsTrigger>
          <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
          <TabsTrigger value="technical">{locale === 'id' ? 'Teknis' : 'Technical'}</TabsTrigger>
        </TabsList>

        {/* Global SEO */}
        <TabsContent value="global" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {locale === 'id' ? 'Judul Meta Default' : 'Default Meta Title'}
              </Label>
              <Input
                id="seoTitle"
                value={globalSEO.title}
                onChange={(e) => setGlobalSEO({ ...globalSEO, title: e.target.value })}
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground">
                {globalSEO.title.length}/60 {locale === 'id' ? 'karakter' : 'characters'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {locale === 'id' ? 'Deskripsi Meta Default' : 'Default Meta Description'}
              </Label>
              <Textarea
                id="seoDescription"
                value={globalSEO.description}
                onChange={(e) => setGlobalSEO({ ...globalSEO, description: e.target.value })}
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground">
                {globalSEO.description.length}/160 {locale === 'id' ? 'karakter' : 'characters'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords" className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                {locale === 'id' ? 'Kata Kunci (Keywords)' : 'Keywords'}
              </Label>
              <Input
                id="keywords"
                value={globalSEO.keywords}
                onChange={(e) => setGlobalSEO({ ...globalSEO, keywords: e.target.value })}
                placeholder={locale === 'id' ? 'Pisahkan dengan koma' : 'Separate with commas'}
              />
              <p className="text-xs text-muted-foreground">
                {locale === 'id' ? 'Contoh: yogyakarta, budaya jawa, wisata' : 'Example: yogyakarta, javanese culture, tourism'}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Open Graph */}
        <TabsContent value="opengraph" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1">Open Graph (Facebook, LinkedIn)</h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'id' ? 'Kontrol bagaimana konten ditampilkan saat dibagikan di social media' : 'Control how content appears when shared on social media'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {locale === 'id' ? 'Gambar Default' : 'Default Image'}
              </Label>
              <Input id="ogImage" value={globalSEO.ogImage} onChange={(e) => setGlobalSEO({ ...globalSEO, ogImage: e.target.value })} />
              <p className="text-xs text-muted-foreground">
                {locale === 'id' ? 'Rekomendasi: 1200x630 px' : 'Recommended: 1200x630 px'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1 mt-6">Twitter Card</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {locale === 'id' ? 'Pengaturan khusus untuk Twitter/X' : 'Special settings for Twitter/X'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterHandle">Twitter Handle</Label>
              <Input
                id="twitterHandle"
                value={globalSEO.twitterHandle}
                onChange={(e) => setGlobalSEO({ ...globalSEO, twitterHandle: e.target.value })}
                placeholder="@username"
              />
            </div>
          </div>
        </TabsContent>

        {/* Technical SEO */}
        <TabsContent value="technical" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1">robots.txt</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {locale === 'id' ? 'Kontrol bagaimana crawler search engine mengakses website' : 'Control how search engine crawlers access your website'}
              </p>
            </div>

            <div className="space-y-2">
              <Textarea
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <Search className="w-4 h-4 inline mr-2" />
                {locale === 'id'
                  ? 'Sitemap XML akan di-generate otomatis dari konten yang published'
                  : 'XML sitemap will be auto-generated from published content'}
              </p>
            </div>
          </div>

          {/* SEO Checklist */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-4">
              {locale === 'id' ? 'Checklist SEO' : 'SEO Checklist'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span>{locale === 'id' ? 'Meta title dan description sudah di-set' : 'Meta title and description are set'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span>{locale === 'id' ? 'Open Graph images tersedia' : 'Open Graph images available'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span>robots.txt {locale === 'id' ? 'terkonfigurasi' : 'configured'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span>{locale === 'id' ? 'Sitemap akan di-generate saat backend ready' : 'Sitemap will be generated when backend is ready'}</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

