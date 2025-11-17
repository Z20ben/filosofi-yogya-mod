'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SiteSettingsPage() {
  const locale = useLocale();

  // Mock initial values
  const [settings, setSettings] = useState({
    siteName: 'Ensiklopedia Sumbu Filosofi Yogyakarta',
    tagline: 'Menelusuri Warisan Budaya dan Filosofi Jawa',
    email: 'info@filosofiyogya.id',
    phone: '+62 274 123456',
    address: 'Yogyakarta, Indonesia',
    description_id: 'Platform digital yang mendokumentasikan dan melestarikan warisan budaya Yogyakarta',
    description_en: 'Digital platform documenting and preserving Yogyakarta cultural heritage',
    facebook: 'https://facebook.com/filosofiyogya',
    instagram: 'https://instagram.com/filosofiyogya',
    twitter: 'https://twitter.com/filosofiyogya',
    youtube: 'https://youtube.com/@filosofiyogya',
  });

  const handleSave = () => {
    // This will be integrated with backend
    alert(locale === 'id' ? 'Pengaturan akan disimpan ke backend' : 'Settings will be saved to backend');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Pengaturan Situs' : 'Site Settings'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola pengaturan umum website' : 'Manage general website settings'}
          </p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
          <Save className="w-4 h-4 mr-2" />
          {locale === 'id' ? 'Simpan Perubahan' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{locale === 'id' ? 'Umum' : 'General'}</TabsTrigger>
          <TabsTrigger value="contact">{locale === 'id' ? 'Kontak' : 'Contact'}</TabsTrigger>
          <TabsTrigger value="social">{locale === 'id' ? 'Media Sosial' : 'Social Media'}</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">{locale === 'id' ? 'Nama Situs' : 'Site Name'}</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                placeholder={locale === 'id' ? 'Masukkan nama situs' : 'Enter site name'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">{locale === 'id' ? 'Tagline' : 'Tagline'}</Label>
              <Input
                id="tagline"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                placeholder={locale === 'id' ? 'Masukkan tagline situs' : 'Enter site tagline'}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="desc_id">{locale === 'id' ? 'Deskripsi (ID)' : 'Description (ID)'}</Label>
                <Textarea
                  id="desc_id"
                  value={settings.description_id}
                  onChange={(e) => setSettings({ ...settings, description_id: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc_en">{locale === 'id' ? 'Deskripsi (EN)' : 'Description (EN)'}</Label>
                <Textarea
                  id="desc_en"
                  value={settings.description_en}
                  onChange={(e) => setSettings({ ...settings, description_en: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {locale === 'id' ? 'Telepon' : 'Phone'}
              </Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+62 xxx xxx xxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {locale === 'id' ? 'Alamat' : 'Address'}
              </Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </Label>
              <Input
                id="facebook"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                placeholder="https://facebook.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </Label>
              <Input
                id="instagram"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Label>
              <Input
                id="twitter"
                value={settings.twitter}
                onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube" className="flex items-center gap-2">
                <Youtube className="w-4 h-4" />
                YouTube
              </Label>
              <Input
                id="youtube"
                value={settings.youtube}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                placeholder="https://youtube.com/@username"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <Globe className="w-4 h-4 inline mr-2" />
          {locale === 'id'
            ? 'Pengaturan ini akan diterapkan ke seluruh website. Pastikan untuk menyimpan perubahan.'
            : 'These settings will be applied site-wide. Make sure to save your changes.'}
        </p>
      </div>
    </div>
  );
}
