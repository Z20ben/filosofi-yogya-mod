'use client';

import { useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Landmark, Users, BookOpen, TrendingUp, Lightbulb, User, Calendar, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Entry {
  id: number;
  slug: string;
  category: string;
  title: string;
  snippet: string;
  fullContent: string;
  icon: any;
  editor: string;
  tags: string[];
  publishedDate: string;
  readTime: string;
}

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function EncyclopediaArticlePage() {
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Entry data with slugs
  const entries: Entry[] = locale === 'id' ? [
    {
      id: 1,
      slug: 'tugu-yogyakarta',
      category: 'warisan-benda',
      title: 'Tugu Yogyakarta',
      snippet: 'Monumen ikonik yang menjadi titik awal Sumbu Filosofi di ujung utara.',
      fullContent: `Tugu Yogyakarta adalah monumen bersejarah yang menjadi penanda titik awal Sumbu Filosofi Yogyakarta. Dibangun pada tahun 1755 oleh Sultan Hamengku Buwono I, tugu ini memiliki makna filosofis yang mendalam. Tingginya 15 meter dengan bentuk silinder yang meruncing ke atas, melambangkan hubungan vertikal antara manusia dengan Sang Pencipta.

Tugu ini terletak di persimpangan Jalan Jenderal Sudirman dan menjadi landmark penting kota Yogyakarta. Dalam konsep Sumbu Filosofi, Tugu merepresentasikan titik paling utara yang membentuk garis imajiner lurus ke selatan menuju Keraton, Panggung Krapyak, hingga Laut Selatan.

Awalnya, tugu ini berbentuk golong-gilig (silinder dengan bulatan di atasnya) yang melambangkan persatuan antara rakyat dan pemimpin. Setelah gempa bumi tahun 1867, tugu dipugar dengan bentuk seperti sekarang. Meski bentuknya berubah, makna filosofisnya tetap terjaga.

Tugu Yogyakarta juga menjadi saksi berbagai peristiwa sejarah penting, termasuk perjuangan kemerdekaan Indonesia. Hingga kini, monumen ini tetap menjadi simbol kebanggaan warga Yogyakarta dan destinasi wisata yang wajib dikunjungi.`,
      icon: Landmark,
      editor: 'Dr. Soedjono Martokusumo',
      tags: ['Monumen', 'Sumbu Utama', 'Sejarah Jogja', 'Landmark'],
      publishedDate: '15 November 2024',
      readTime: '5 menit'
    },
    {
      id: 2,
      slug: 'sekaten',
      category: 'warisan-takbenda',
      title: 'Sekaten',
      snippet: 'Upacara tradisional memperingati Maulid Nabi Muhammad SAW.',
      fullContent: `Sekaten adalah upacara adat Keraton Yogyakarta yang diselenggarakan setiap tahun untuk memperingati Maulid Nabi Muhammad SAW. Tradisi ini telah berlangsung sejak masa pemerintahan Sultan Hamengku Buwono I dan terus dilestarikan hingga kini.

Pelaksanaan Sekaten dimulai dengan penabuhan gamelan pusaka Kyai Sekati dan Kyai Nogowilogo di Masjid Agung Yogyakarta. Kedua gamelan pusaka ini hanya dikeluarkan setahun sekali khusus untuk acara Sekaten.

Puncak perayaan Sekaten adalah upacara Grebeg Maulud, di mana gunungan (makanan yang disusun berbentuk gunung) diarak dari Keraton menuju Masjid Agung untuk diperebutkan oleh masyarakat. Dipercaya, mendapatkan bagian dari gunungan akan membawa berkah.

Sekaten bukan hanya upacara keagamaan, tetapi juga momen penting untuk memperkuat hubungan antara Keraton dengan rakyat. Pasar malam Sekaten yang berlangsung selama sebulan penuh juga menjadi daya tarik tersendiri bagi wisatawan.`,
      icon: Book,
      editor: 'Prof. KGPH Prabuningrat',
      tags: ['Upacara Adat', 'Keraton', 'Tradisi Islam', 'Grebeg'],
      publishedDate: '20 November 2024',
      readTime: '4 menit'
    },
    {
      id: 3,
      slug: 'sultan-hamengku-buwono-i',
      category: 'tokoh',
      title: 'Sultan Hamengku Buwono I',
      snippet: 'Pendiri Kesultanan Yogyakarta dan perancang Sumbu Filosofi.',
      fullContent: `Sultan Hamengku Buwono I, atau Pangeran Mangkubumi, adalah pendiri Kesultanan Yogyakarta pada tahun 1755. Beliau adalah arsitek utama di balik konsep Sumbu Filosofi yang menjadi dasar perencanaan kota Yogyakarta.

Setelah Perjanjian Giyanti yang membagi Kerajaan Mataram menjadi Kasunanan Surakarta dan Kesultanan Yogyakarta, Sultan HB I memilih lokasi di tepian Kali Code untuk membangun Keraton. Pemilihan lokasi ini didasarkan pada pertimbangan filosofis dan strategis.

Sultan HB I merancang tata kota dengan konsep kosmologi Jawa yang kompleks. Sumbu utama membentang dari utara ke selatan, menghubungkan Gunung Merapi, Tugu, Keraton, hingga Laut Selatan. Konsep ini melambangkan perjalanan hidup manusia dari lahir hingga kembali kepada Sang Pencipta.

Kepemimpinan Sultan HB I ditandai dengan kebijaksanaan dan keberanian. Beliau berhasil membangun Kesultanan Yogyakarta menjadi kerajaan yang kuat dan makmur, serta mewariskan budaya dan tradisi yang masih hidup hingga kini.`,
      icon: Users,
      editor: 'Drs. Sumarsono Suryokusumo, M.Hum',
      tags: ['Sultan', 'Pendiri', 'Arsitektur Kota', 'Sejarah'],
      publishedDate: '10 November 2024',
      readTime: '6 menit'
    },
    {
      id: 4,
      slug: 'manunggaling-kawula-gusti',
      category: 'istilah',
      title: 'Manunggaling Kawula Gusti',
      snippet: 'Konsep filosofis Jawa tentang kesatuan antara rakyat dengan raja.',
      fullContent: `Manunggaling Kawula Gusti adalah salah satu konsep filosofis paling penting dalam budaya Jawa. Secara harfiah berarti "bersatunya rakyat (kawula) dengan pemimpin (gusti)", konsep ini mengandung makna yang sangat mendalam tentang hubungan antara penguasa dan rakyat.

Dalam konteks spiritual, konsep ini juga bermakna penyatuan diri manusia dengan Tuhan. Kawula melambangkan manusia sebagai hamba, sedangkan Gusti melambangkan Tuhan sebagai penguasa alam semesta.

Filosofi ini tercermin dalam tata ruang Keraton Yogyakarta dan Sumbu Filosofi. Keraton sebagai tempat tinggal Sultan (Gusti) dikelilingi oleh pemukiman rakyat (Kawula), melambangkan kesatuan yang harmonis.

Dalam praktik kepemimpinan Jawa, Manunggaling Kawula Gusti berarti pemimpin harus menyatu dengan rakyatnya, memahami kebutuhan mereka, dan mengutamakan kesejahteraan bersama di atas kepentingan pribadi.`,
      icon: BookOpen,
      editor: 'Ki Joko Raharjo, M.Pd',
      tags: ['Filosofi Jawa', 'Kosmologi', 'Kepemimpinan', 'Spiritualitas'],
      publishedDate: '5 November 2024',
      readTime: '4 menit'
    },
    {
      id: 5,
      slug: 'revitalisasi-taman-sari',
      category: 'sedang-tren',
      title: 'Revitalisasi Taman Sari',
      snippet: 'Proyek pemugaran dan revitalisasi kompleks Taman Sari yang sedang berjalan.',
      fullContent: `Taman Sari, atau Istana Air Keraton Yogyakarta, sedang mengalami proses revitalisasi besar-besaran. Kompleks yang dibangun pada masa Sultan Hamengku Buwono I ini memiliki nilai historis dan arsitektural yang sangat tinggi.

Proyek revitalisasi bertujuan untuk memulihkan kejayaan Taman Sari sebagai kompleks istana air yang megah. Termasuk di dalamnya pemugaran kolam pemandian, lorong bawah tanah, dan bangunan-bangunan bersejarah lainnya.

Tim revitalisasi melibatkan ahli arkeologi, arsitek, dan pemerhati budaya untuk memastikan pemugaran dilakukan sesuai dengan prinsip konservasi yang benar. Setiap detail arsitektur asli berusaha dipertahankan atau dikembalikan.

Dengan selesainya revitalisasi, diharapkan Taman Sari dapat menjadi destinasi wisata budaya yang lebih informatif dan menarik, sekaligus tetap menjaga nilai-nilai sejarah dan filosofisnya.`,
      icon: TrendingUp,
      editor: 'Andi Setiawan, S.S., M.Hum',
      tags: ['Revitalisasi', 'Taman Sari', 'Pelestarian', 'Wisata Budaya'],
      publishedDate: '1 Desember 2024',
      readTime: '3 menit'
    },
    {
      id: 6,
      slug: 'menyusuri-sumbu-filosofi-rute-tips',
      category: 'tips-wisata',
      title: 'Menyusuri Sumbu Filosofi: Rute & Tips',
      snippet: 'Panduan lengkap menyusuri jalur Sumbu Filosofi dari Tugu hingga Panggung Krapyak.',
      fullContent: `Menyusuri Sumbu Filosofi Yogyakarta adalah pengalaman wisata budaya yang tak terlupakan. Berikut panduan lengkap untuk perjalanan Anda:

**Rute yang Disarankan:**
1. Mulai dari Tugu Yogyakarta di pagi hari (06:00-08:00) untuk menikmati suasana tenang
2. Lanjutkan ke Titik Nol Kilometer dan Malioboro
3. Kunjungi Keraton Yogyakarta (buka 08:00-14:00)
4. Mampir ke Taman Sari dan Kampung Wisata
5. Nikmati makan siang di sekitar Alun-Alun Kidul
6. Akhiri di Panggung Krapyak untuk menikmati sunset

**Tips Penting:**
- Kenakan pakaian sopan saat mengunjungi Keraton
- Sewa sepeda untuk pengalaman lebih autentik
- Siapkan uang tunai untuk tiket masuk dan parkir
- Bawa air minum dan topi untuk melindungi dari panas
- Gunakan jasa pemandu lokal untuk penjelasan lebih mendalam

**Waktu Terbaik:**
Kunjungi pada hari biasa (Selasa-Kamis) untuk menghindari keramaian. Musim kemarau (April-Oktober) adalah waktu ideal untuk berjalan kaki.`,
      icon: Lightbulb,
      editor: 'Made Wijaya, S.Par',
      tags: ['Panduan Wisata', 'Rute', 'Tips Perjalanan', 'Itinerary'],
      publishedDate: '25 November 2024',
      readTime: '5 menit'
    }
  ] : [
    {
      id: 1,
      slug: 'tugu-yogyakarta',
      category: 'warisan-benda',
      title: 'Tugu Yogyakarta',
      snippet: 'Iconic monument marking the northern starting point of the Philosophical Axis.',
      fullContent: `Tugu Yogyakarta is a historical monument marking the starting point of Yogyakarta's Philosophical Axis. Built in 1755 by Sultan Hamengku Buwono I, it carries deep philosophical meaning. Standing 15 meters tall with a cylindrical shape tapering upward, it symbolizes the vertical connection between humans and the Creator.

The monument is located at the intersection of Jenderal Sudirman Street and serves as an important landmark of Yogyakarta city. In the Philosophical Axis concept, Tugu represents the northernmost point forming an imaginary straight line southward to Keraton, Panggung Krapyak, and the South Sea.

Originally, this monument was shaped as golong-gilig (cylinder with a ball on top) symbolizing unity between people and leader. After the 1867 earthquake, it was restored to its current form. Though its shape changed, its philosophical meaning remains intact.

Tugu Yogyakarta has also witnessed various important historical events, including Indonesia's independence struggle. To this day, the monument remains a symbol of pride for Yogyakarta citizens and a must-visit tourist destination.`,
      icon: Landmark,
      editor: 'Dr. Soedjono Martokusumo',
      tags: ['Monument', 'Main Axis', 'Jogja History', 'Landmark'],
      publishedDate: 'November 15, 2024',
      readTime: '5 min'
    },
    {
      id: 2,
      slug: 'sekaten',
      category: 'warisan-takbenda',
      title: 'Sekaten',
      snippet: 'Traditional ceremony commemorating Prophet Muhammad\'s birthday.',
      fullContent: `Sekaten is a traditional ceremony of Yogyakarta Palace held annually to commemorate Prophet Muhammad's birthday. This tradition has continued since the reign of Sultan Hamengku Buwono I and is still preserved today.

The Sekaten ceremony begins with the playing of the heirloom gamelan Kyai Sekati and Kyai Nogowilogo at the Grand Mosque of Yogyakarta. These two heirloom gamelans are only brought out once a year specifically for the Sekaten event.

The peak of Sekaten celebration is the Grebeg Maulud ceremony, where gunungan (food arranged in mountain shape) is paraded from the Palace to the Grand Mosque to be scrambled for by the public. It is believed that obtaining a portion of the gunungan will bring blessings.

Sekaten is not just a religious ceremony but also an important moment to strengthen the relationship between the Palace and the people. The Sekaten night market lasting for a full month is also a special attraction for tourists.`,
      icon: Book,
      editor: 'Prof. KGPH Prabuningrat',
      tags: ['Traditional Ceremony', 'Palace', 'Islamic Tradition', 'Grebeg'],
      publishedDate: 'November 20, 2024',
      readTime: '4 min'
    },
    {
      id: 3,
      slug: 'sultan-hamengku-buwono-i',
      category: 'tokoh',
      title: 'Sultan Hamengku Buwono I',
      snippet: 'Founder of Yogyakarta Sultanate and designer of the Philosophical Axis.',
      fullContent: `Sultan Hamengku Buwono I, or Prince Mangkubumi, was the founder of Yogyakarta Sultanate in 1755. He was the main architect behind the Philosophical Axis concept that became the foundation of Yogyakarta city planning.

After the Treaty of Giyanti which divided the Mataram Kingdom into Surakarta Sunanate and Yogyakarta Sultanate, Sultan HB I chose a location on the banks of Code River to build the Palace. This location selection was based on philosophical and strategic considerations.

Sultan HB I designed the city layout with a complex Javanese cosmology concept. The main axis extends from north to south, connecting Mount Merapi, Tugu, Keraton, to the South Sea. This concept symbolizes the human life journey from birth to returning to the Creator.

Sultan HB I's leadership was marked by wisdom and courage. He successfully built Yogyakarta Sultanate into a strong and prosperous kingdom, and left behind culture and traditions that are still alive today.`,
      icon: Users,
      editor: 'Drs. Sumarsono Suryokusumo, M.Hum',
      tags: ['Sultan', 'Founder', 'City Architecture', 'History'],
      publishedDate: 'November 10, 2024',
      readTime: '6 min'
    },
    {
      id: 4,
      slug: 'manunggaling-kawula-gusti',
      category: 'istilah',
      title: 'Manunggaling Kawula Gusti',
      snippet: 'Javanese philosophical concept about unity between people and ruler.',
      fullContent: `Manunggaling Kawula Gusti is one of the most important philosophical concepts in Javanese culture. Literally meaning "the unity of people (kawula) with leader (gusti)", this concept contains very deep meaning about the relationship between ruler and people.

In spiritual context, this concept also means the unification of humans with God. Kawula symbolizes humans as servants, while Gusti symbolizes God as the ruler of the universe.

This philosophy is reflected in the spatial layout of Yogyakarta Palace and the Philosophical Axis. The Palace as the Sultan's (Gusti) residence is surrounded by people's settlements (Kawula), symbolizing harmonious unity.

In Javanese leadership practice, Manunggaling Kawula Gusti means leaders must unite with their people, understand their needs, and prioritize collective welfare above personal interests.`,
      icon: BookOpen,
      editor: 'Ki Joko Raharjo, M.Pd',
      tags: ['Javanese Philosophy', 'Cosmology', 'Leadership', 'Spirituality'],
      publishedDate: 'November 5, 2024',
      readTime: '4 min'
    },
    {
      id: 5,
      slug: 'taman-sari-revitalization',
      category: 'sedang-tren',
      title: 'Taman Sari Revitalization',
      snippet: 'Major restoration and revitalization project of Taman Sari complex.',
      fullContent: `Taman Sari, or the Water Castle of Yogyakarta Palace, is undergoing major revitalization. The complex built during Sultan Hamengku Buwono I's reign has very high historical and architectural value.

The revitalization project aims to restore Taman Sari's glory as a magnificent water palace complex. This includes restoration of bathing pools, underground passages, and other historical buildings.

The revitalization team involves archaeologists, architects, and cultural observers to ensure restoration is done according to proper conservation principles. Every original architectural detail is being preserved or restored.

Upon completion of revitalization, Taman Sari is expected to become a more informative and attractive cultural tourism destination while maintaining its historical and philosophical values.`,
      icon: TrendingUp,
      editor: 'Andi Setiawan, S.S., M.Hum',
      tags: ['Revitalization', 'Taman Sari', 'Preservation', 'Cultural Tourism'],
      publishedDate: 'December 1, 2024',
      readTime: '3 min'
    },
    {
      id: 6,
      slug: 'exploring-the-philosophical-axis-routes-tips',
      category: 'tips-wisata',
      title: 'Exploring the Philosophical Axis: Routes & Tips',
      snippet: 'Complete guide to exploring the Philosophical Axis route from Tugu to Panggung Krapyak.',
      fullContent: `Exploring Yogyakarta's Philosophical Axis is an unforgettable cultural experience. Here's a complete guide for your journey:

**Suggested Route:**
1. Start from Tugu Yogyakarta in the morning (06:00-08:00) to enjoy the peaceful atmosphere
2. Continue to Zero Kilometer Point and Malioboro
3. Visit Yogyakarta Palace (open 08:00-14:00)
4. Stop by Taman Sari and Tourism Village
5. Enjoy lunch around Alun-Alun Kidul
6. End at Panggung Krapyak to enjoy sunset

**Important Tips:**
- Wear modest clothing when visiting the Palace
- Rent a bicycle for a more authentic experience
- Prepare cash for entrance tickets and parking
- Bring drinking water and hat for sun protection
- Use local guide services for deeper explanations

**Best Time:**
Visit on weekdays (Tuesday-Thursday) to avoid crowds. Dry season (April-October) is the ideal time for walking.`,
      icon: Lightbulb,
      editor: 'Made Wijaya, S.Par',
      tags: ['Travel Guide', 'Route', 'Travel Tips', 'Itinerary'],
      publishedDate: 'November 25, 2024',
      readTime: '5 min'
    }
  ];

  // Find article by slug
  const article = entries.find(entry => entry.slug === slug);

  // Category mapping
  const categories = {
    'warisan-benda': { label: locale === 'id' ? 'Warisan Budaya Benda' : 'Tangible Heritage', color: 'bg-amber-500' },
    'warisan-takbenda': { label: locale === 'id' ? 'Warisan Budaya Tak Benda' : 'Intangible Heritage', color: 'bg-emerald-500' },
    'tokoh': { label: locale === 'id' ? 'Tokoh & Sejarah' : 'Figures & History', color: 'bg-blue-500' },
    'istilah': { label: locale === 'id' ? 'Istilah & Konsep' : 'Terms & Concepts', color: 'bg-purple-500' },
    'sedang-tren': { label: locale === 'id' ? 'Sedang Tren' : 'Trending', color: 'bg-red-500' },
    'tips-wisata': { label: locale === 'id' ? 'Tips Wisata' : 'Travel Tips', color: 'bg-cyan-500' }
  };

  const handleShare = (platform: string) => {
    if (!article) return;
    const url = window.location.href;
    const text = article.title;

    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' - ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], '_blank');
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {locale === 'id' ? 'Artikel tidak ditemukan' : 'Article not found'}
          </h1>
          <Link
            href={`/${locale}/encyclopedia`}
            className="text-amber-600 hover:underline"
          >
            {locale === 'id' ? 'Kembali ke Ensiklopedia' : 'Back to Encyclopedia'}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = article.icon;
  const categoryInfo = categories[article.category as keyof typeof categories];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/30 text-slate-900 dark:text-slate-50">
      {/* Header */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/${locale}/encyclopedia`}
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'id' ? 'Kembali ke Ensiklopedia' : 'Back to Encyclopedia'}
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className={`${categoryInfo.color} text-white mb-4`}>
              {categoryInfo.label}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.editor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                <span>{article.readTime} {locale === 'id' ? 'baca' : 'read'}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-8 lg:p-10"
          >
            {/* Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-slate-50">
              {article.fullContent.split('\n\n').map((paragraph, idx) => {
                // Check if it's a header (starts with **)
                if (paragraph.startsWith('**') && paragraph.includes(':**')) {
                  const headerText = paragraph.replace(/\*\*/g, '').replace(':', '');
                  return (
                    <h3 key={idx} className="text-lg font-semibold mt-6 mb-3">
                      {headerText}
                    </h3>
                  );
                }
                // Check if it's a list item
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <p key={idx} className="mb-2 pl-4">
                      {paragraph}
                    </p>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <p key={idx} className="mb-2 pl-4">
                      {paragraph}
                    </p>
                  );
                }
                return (
                  <p key={idx} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share Section */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  {locale === 'id' ? 'Bagikan artikel ini:' : 'Share this article:'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="p-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                    title="WhatsApp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white transition-colors"
                    title="Twitter/X"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back to Encyclopedia */}
          <div className="text-center mt-8">
            <Link href={`/${locale}/encyclopedia`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {locale === 'id' ? 'Lihat Artikel Lainnya' : 'View Other Articles'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
