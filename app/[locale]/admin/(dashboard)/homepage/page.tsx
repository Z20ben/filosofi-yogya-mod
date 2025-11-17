'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Save, Image as ImageIcon, BarChart3, Trash2, Plus, Upload, FolderOpen, GripVertical, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StatsData {
  totalWisata: number;
  totalUMKM: number;
  totalGaleri: number;
  totalAgenda: number;
}

export default function HomepageSettingsPage() {
  const locale = useLocale();

  // Hero Banner Settings (Global untuk semua slide)
  const [heroSettings, setHeroSettings] = useState({
    badge_id: 'Selamat Datang',
    badge_en: 'Welcome',
    title_id: 'Ensiklopedia Sumbu Filosofi Yogyakarta',
    title_en: 'Yogyakarta Philosophical Axis Encyclopedia',
    subtitle_id: 'Menjelajahi Warisan Budaya dan Filosofi Jawa',
    subtitle_en: 'Exploring Javanese Cultural and Philosophical Heritage',
    ctaText_id: 'Jelajahi Sumbu Filosofi',
    ctaText_en: 'Explore the Philosophical Axis',
    ctaLink: 'kawasan-sumbu-filosofi',
  });

  // Slider Images (max 3)
  const [sliderImages, setSliderImages] = useState<string[]>([
    '/assets/9f169dd83a8981e7aedcf8dbab93b79692f0d10d.png', // Tugu Yogyakarta
    '/assets/e68ea45479378a6003bae5ab6b785184768f6914.png', // Kraton Yogyakarta
    '/assets/6503837eba87dc083593e8a3ad9478adf75c2c83.png', // Panggung Krapyak
  ]);

  // Drag & Drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Live Preview Slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate slider preview
  useEffect(() => {
    if (!isAutoPlay || sliderImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, sliderImages.length]);

  // Statistics (auto-fetched from database)
  const [statsSettings, setStatsSettings] = useState({
    enabled: true,
  });

  const [stats, setStats] = useState<StatsData>({
    totalWisata: 0,
    totalUMKM: 0,
    totalGaleri: 0,
    totalAgenda: 0,
  });

  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Fetch statistics from API
  useEffect(() => {
    if (statsSettings.enabled) {
      fetchStatistics();
    }
  }, [statsSettings.enabled]);

  const fetchStatistics = async () => {
    setIsLoadingStats(true);
    try {
      // TODO: Replace with actual API endpoints
      // For now, using fallback data since API endpoints are not implemented yet
      // const [wisataCount, umkmCount, galeriCount, agendaCount] = await Promise.all([
      //   fetch('/api/wisata/count').then(r => r.json()),
      //   fetch('/api/umkm/count').then(r => r.json()),
      //   fetch('/api/galeri/count').then(r => r.json()),
      //   fetch('/api/agenda/count').then(r => r.json()),
      // ]);

      // Temporary fallback data (remove when API is ready)
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setStats({
        totalWisata: 9,
        totalUMKM: 12,
        totalGaleri: 50,
        totalAgenda: 8,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      // Fallback data
      setStats({
        totalWisata: 9,
        totalUMKM: 12,
        totalGaleri: 50,
        totalAgenda: 8,
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  const addSliderImage = () => {
    if (sliderImages.length >= 3) {
      alert(locale === 'id' ? 'Maksimal 3 gambar' : 'Maximum 3 images');
      return;
    }
    setSliderImages([...sliderImages, '']);
  };

  const updateSliderImage = (index: number, value: string) => {
    const newImages = [...sliderImages];
    newImages[index] = value;
    setSliderImages(newImages);
  };

  const deleteSliderImage = (index: number) => {
    if (sliderImages.length > 1) {
      setSliderImages(sliderImages.filter((_, i) => i !== index));
      if (currentSlide >= sliderImages.length - 1) {
        setCurrentSlide(0);
      }
    } else {
      alert(locale === 'id' ? 'Minimal harus ada 1 gambar' : 'Minimum 1 image required');
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...sliderImages];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setSliderImages(newImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Open Media Library (TODO: implement actual media library modal)
  const openMediaLibrary = (index: number) => {
    alert(locale === 'id'
      ? `Fitur Media Library akan segera tersedia. Sementara masukkan URL gambar secara manual.`
      : `Media Library feature coming soon. Please enter image URL manually for now.`
    );
  };

  // Upload Image (TODO: implement actual file upload)
  const handleUpload = (index: number) => {
    alert(locale === 'id'
      ? `Fitur upload akan segera tersedia. Sementara masukkan URL gambar secara manual.`
      : `Upload feature coming soon. Please enter image URL manually for now.`
    );
  };

  const handleSave = async () => {
    try {
      // TODO: Implement actual save to database
      const saveData = {
        heroSettings,
        sliderImages,
        statsSettings,
      };
      console.log('Saving homepage settings:', saveData);
      alert(locale === 'id' ? 'Pengaturan beranda berhasil disimpan' : 'Homepage settings saved successfully');
    } catch (error) {
      console.error('Error saving homepage settings:', error);
      alert(locale === 'id' ? 'Gagal menyimpan pengaturan' : 'Failed to save settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Pengaturan Beranda' : 'Homepage Settings'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola hero banner slider dan statistik beranda' : 'Manage hero banner slider and homepage statistics'}
          </p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
          <Save className="w-4 h-4 mr-2" />
          {locale === 'id' ? 'Simpan' : 'Save'}
        </Button>
      </div>

      {/* Hero Banner Section */}
      <div className="bg-card p-6 rounded-xl border border-border space-y-6">
        <div>
          <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            {locale === 'id' ? 'Hero Banner' : 'Hero Banner'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {locale === 'id' ? 'Atur konten hero banner beranda' : 'Configure homepage hero banner content'}
          </p>
        </div>

        {/* Global Hero Content */}
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-semibold text-sm text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Konten Banner' : 'Banner Content'}
          </h4>

          <div className="space-y-4">
            {/* Badge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="badge-id">
                  {locale === 'id' ? 'Badge Banner (Indonesia)' : 'Badge Banner (Indonesian)'}
                </Label>
                <Input
                  id="badge-id"
                  value={heroSettings.badge_id}
                  onChange={(e) => setHeroSettings({ ...heroSettings, badge_id: e.target.value })}
                  placeholder="Selamat Datang"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge-en">
                  {locale === 'id' ? 'Badge Banner (English)' : 'Badge Banner (English)'}
                </Label>
                <Input
                  id="badge-en"
                  value={heroSettings.badge_en}
                  onChange={(e) => setHeroSettings({ ...heroSettings, badge_en: e.target.value })}
                  placeholder="Welcome"
                />
              </div>
            </div>

            {/* Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title-id">
                  {locale === 'id' ? 'Judul (Indonesia)' : 'Title (Indonesian)'}
                </Label>
                <Input
                  id="title-id"
                  value={heroSettings.title_id}
                  onChange={(e) => setHeroSettings({ ...heroSettings, title_id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title-en">
                  {locale === 'id' ? 'Judul (English)' : 'Title (English)'}
                </Label>
                <Input
                  id="title-en"
                  value={heroSettings.title_en}
                  onChange={(e) => setHeroSettings({ ...heroSettings, title_en: e.target.value })}
                />
              </div>
            </div>

            {/* Subtitles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtitle-id">
                  {locale === 'id' ? 'Subtitle (Indonesia)' : 'Subtitle (Indonesian)'}
                </Label>
                <Textarea
                  id="subtitle-id"
                  value={heroSettings.subtitle_id}
                  onChange={(e) => setHeroSettings({ ...heroSettings, subtitle_id: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle-en">
                  {locale === 'id' ? 'Subtitle (English)' : 'Subtitle (English)'}
                </Label>
                <Textarea
                  id="subtitle-en"
                  value={heroSettings.subtitle_en}
                  onChange={(e) => setHeroSettings({ ...heroSettings, subtitle_en: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="border-t pt-4 space-y-4">
              <h5 className="text-sm font-semibold">{locale === 'id' ? 'Tombol Call-to-Action' : 'Call-to-Action Button'}</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta-text-id">
                    {locale === 'id' ? 'Teks Tombol (ID)' : 'Button Text (ID)'}
                  </Label>
                  <Input
                    id="cta-text-id"
                    value={heroSettings.ctaText_id}
                    onChange={(e) => setHeroSettings({ ...heroSettings, ctaText_id: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-text-en">
                    {locale === 'id' ? 'Teks Tombol (EN)' : 'Button Text (EN)'}
                  </Label>
                  <Input
                    id="cta-text-en"
                    value={heroSettings.ctaText_en}
                    onChange={(e) => setHeroSettings({ ...heroSettings, ctaText_en: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-link">
                    {locale === 'id' ? 'Menu Tujuan' : 'Destination Menu'}
                  </Label>
                  <Select
                    value={heroSettings.ctaLink}
                    onValueChange={(value) => setHeroSettings({ ...heroSettings, ctaLink: value })}
                  >
                    <SelectTrigger id="cta-link">
                      <SelectValue placeholder={locale === 'id' ? 'Pilih menu' : 'Select menu'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kawasan-sumbu-filosofi">
                        {locale === 'id' ? 'Kawasan Sumbu Filosofi' : 'Philosophical Axis Area'}
                      </SelectItem>
                      <SelectItem value="potensi-wisata">
                        {locale === 'id' ? 'Potensi Wisata' : 'Tourism Potential'}
                      </SelectItem>
                      <SelectItem value="katalog-umkm">
                        {locale === 'id' ? 'Katalog UMKM' : 'MSME Catalog'}
                      </SelectItem>
                      <SelectItem value="agenda-seni-budaya">
                        {locale === 'id' ? 'Agenda Seni & Budaya' : 'Arts & Culture Events'}
                      </SelectItem>
                      <SelectItem value="galeri-foto">
                        {locale === 'id' ? 'Galeri Foto' : 'Photo Gallery'}
                      </SelectItem>
                      <SelectItem value="sejarah">
                        {locale === 'id' ? 'Sejarah & Riset' : 'History & Research'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Images - Card Preview Layout */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-[var(--javanese-brown-text)]">
                {locale === 'id' ? 'Gambar Slider' : 'Slider Images'}
              </h4>
              <p className="text-xs text-muted-foreground">
                {locale === 'id' ? `Drag untuk ubah urutan (${sliderImages.length}/3)` : `Drag to reorder (${sliderImages.length}/3)`}
              </p>
            </div>
            {sliderImages.length < 3 && (
              <Button onClick={addSliderImage} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {locale === 'id' ? 'Tambah Gambar' : 'Add Image'}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sliderImages.map((image, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`group relative bg-card rounded-xl border-2 border-border overflow-hidden transition-all cursor-move hover:border-[var(--javanese-brown-bg)] ${
                  draggedIndex === index ? 'opacity-50 scale-95' : ''
                }`}
              >
                {/* Drag Handle */}
                <div className="absolute top-2 left-2 z-10 bg-black/50 text-white p-1.5 rounded-lg cursor-move">
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Delete Button */}
                {sliderImages.length > 1 && (
                  <button
                    onClick={() => deleteSliderImage(index)}
                    className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Image Number Badge */}
                <div className="absolute bottom-2 left-2 z-10 bg-[var(--javanese-brown-bg)] text-white px-2 py-1 rounded-md text-xs font-semibold">
                  {locale === 'id' ? `Gambar ${index + 1}` : `Image ${index + 1}`}
                </div>

                {/* Image Preview - 16:9 Aspect Ratio */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {image ? (
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dy=".3em">Image not found</text></svg>';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                </div>

                {/* URL Input & Action Buttons */}
                <div className="p-3 space-y-2 bg-muted/30">
                  <Input
                    value={image}
                    onChange={(e) => updateSliderImage(index, e.target.value)}
                    placeholder="/images/hero-banner.jpg"
                    className="text-xs"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpload(index)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      {locale === 'id' ? 'Upload' : 'Upload'}
                    </Button>
                    <Button
                      onClick={() => openMediaLibrary(index)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      <FolderOpen className="w-3 h-3 mr-1" />
                      {locale === 'id' ? 'Media' : 'Media'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              <strong>{locale === 'id' ? 'Tips:' : 'Tips:'}</strong>{' '}
              {locale === 'id'
                ? 'Drag & drop untuk ubah urutan. Gambar akan berganti otomatis sebagai background slider. Rekomendasi: 1920x1080 px, JPG/WEBP.'
                : 'Drag & drop to reorder. Images will rotate automatically as slider background. Recommended: 1920x1080 px, JPG/WEBP.'}
            </p>
          </div>
        </div>

        {/* Live Slider Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-[var(--javanese-brown-text)] flex items-center gap-2">
              <Play className="w-4 h-4" />
              {locale === 'id' ? 'Preview Slider' : 'Slider Preview'}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {locale === 'id' ? 'Auto-play' : 'Auto-play'}
              </span>
              <Switch
                checked={isAutoPlay}
                onCheckedChange={setIsAutoPlay}
                className="data-[state=checked]:bg-[var(--javanese-brown-bg)]"
              />
            </div>
          </div>

          {/* Preview container matching HeroSlideshow */}
          <div className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-xl border-2 border-border">
            {/* Slideshow Background Images */}
            <div className="absolute inset-0">
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {image && (
                    <>
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dy=".3em">Image not found</text></svg>';
                        }}
                      />
                      {/* Gradient overlay - matching home page */}
                      <div className="absolute inset-0 hero-overlay-gradient"></div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Slide indicators - matching home page style */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 gap-2 z-20 flex">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-[var(--javanese-gold)] w-8'
                      : 'bg-[var(--javanese-ivory)]/50 hover:bg-[var(--javanese-ivory)]/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Content - matching home page layout */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--javanese-gold)]/20 backdrop-blur-sm rounded-full mb-6 border border-[var(--javanese-gold)]/30">
                <p className="text-[var(--javanese-gold)] dark:text-white">
                  {locale === 'id' ? heroSettings.badge_id : heroSettings.badge_en}
                </p>
              </div>

              {/* Title */}
              <h1
                className="text-[var(--javanese-ivory)] mb-6"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', lineHeight: '1.2' }}
              >
                {locale === 'id' ? heroSettings.title_id : heroSettings.title_en}
              </h1>

              {/* Subtitle */}
              <p className="text-[var(--javanese-ivory)] opacity-90 text-lg mb-8 max-w-2xl mx-auto">
                {locale === 'id' ? heroSettings.subtitle_id : heroSettings.subtitle_en}
              </p>

              {/* CTA Button */}
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--javanese-gold)] text-[#4A2C2A] dark:text-[#1A1412] hover:opacity-90 rounded-lg transition-all shadow-lg hover:shadow-xl">
                {locale === 'id' ? heroSettings.ctaText_id : heroSettings.ctaText_en}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Decorative pattern at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-card p-6 rounded-xl border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[var(--javanese-brown-text)] mb-1 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {locale === 'id' ? 'Statistik Beranda' : 'Homepage Statistics'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {locale === 'id' ? 'Data statistik otomatis dari database' : 'Automatically fetched statistics from database'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {statsSettings.enabled && (
              <Button onClick={fetchStatistics} variant="outline" size="sm" disabled={isLoadingStats}>
                {isLoadingStats ? (locale === 'id' ? 'Memuat...' : 'Loading...') : (locale === 'id' ? 'Refresh Data' : 'Refresh Data')}
              </Button>
            )}
            <Switch
              checked={statsSettings.enabled}
              onCheckedChange={(checked) => setStatsSettings({ enabled: checked })}
            />
          </div>
        </div>

        {statsSettings.enabled && (
          <div className="space-y-4 mt-4 pt-4 border-t">
            {/* Stats Display */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-lg">
              <h4 className="text-sm font-semibold mb-4 text-center">
                {locale === 'id' ? 'Data Statistik Saat Ini' : 'Current Statistics Data'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: locale === 'id' ? 'Destinasi Wisata' : 'Tourism Destinations', value: stats.totalWisata },
                  { label: locale === 'id' ? 'Potensi UMKM' : 'SME Businesses', value: stats.totalUMKM },
                  { label: locale === 'id' ? 'Foto Galeri' : 'Gallery Photos', value: stats.totalGaleri },
                  { label: locale === 'id' ? 'Acara Budaya' : 'Cultural Events', value: stats.totalAgenda },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white dark:bg-card rounded-lg border border-border">
                    <p className="text-3xl font-bold text-[var(--javanese-brown-text)]">{stat.value}+</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
