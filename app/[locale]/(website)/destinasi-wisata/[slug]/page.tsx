'use client';

import { useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Clock, Ticket, Phone, Globe, Navigation, Camera, Star, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface Destination {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  fullDescription: string;
  location: string;
  hours: string;
  ticketPrice: string;
  phone: string;
  website: string;
  highlights: string[];
  tips: string[];
}

// Helper function to generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function DestinationDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const categories: Record<string, { label: string; color: string }> = {
    'titik-sumbu': { label: locale === 'id' ? 'Titik Sumbu' : 'Axis Point', color: 'bg-amber-500' },
    'cagar-budaya': { label: locale === 'id' ? 'Cagar Budaya' : 'Heritage Site', color: 'bg-emerald-500' },
    'museum': { label: locale === 'id' ? 'Museum' : 'Museum', color: 'bg-cyan-500' },
    'landmark': { label: locale === 'id' ? 'Landmark' : 'Landmark', color: 'bg-orange-500' },
    'kawasan': { label: locale === 'id' ? 'Kawasan' : 'Area', color: 'bg-purple-500' }
  };

  // Destination data with full details
  const destinations: Destination[] = locale === 'id' ? [
    {
      id: 1,
      slug: 'tugu-yogyakarta',
      name: 'Tugu Yogyakarta',
      category: 'titik-sumbu',
      image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
      gallery: [
        '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
        '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
        '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png'
      ],
      description: 'Monumen ikonik yang menjadi simbol persatuan dan titik awal sumbu filosofis.',
      fullDescription: `Tugu Yogyakarta adalah monumen bersejarah yang menjadi penanda titik awal Sumbu Filosofi Yogyakarta. Dibangun pada tahun 1755 oleh Sultan Hamengku Buwono I, tugu ini memiliki makna filosofis yang mendalam.

Tingginya 15 meter dengan bentuk silinder yang meruncing ke atas, melambangkan hubungan vertikal antara manusia dengan Sang Pencipta. Tugu ini terletak di persimpangan Jalan Jenderal Sudirman dan menjadi landmark penting kota Yogyakarta.

Dalam konsep Sumbu Filosofi, Tugu merepresentasikan titik paling utara yang membentuk garis imajiner lurus ke selatan menuju Keraton, Panggung Krapyak, hingga Laut Selatan. Garis ini melambangkan perjalanan hidup manusia dari lahir hingga kembali kepada Sang Pencipta.

Tugu juga menjadi saksi bisu berbagai peristiwa bersejarah, termasuk kemerdekaan Indonesia. Kini, Tugu menjadi ikon wisata yang wajib dikunjungi saat berada di Yogyakarta.`,
      location: 'Jl. Jenderal Sudirman, Gondomanan, Yogyakarta',
      hours: '24 Jam (area terbuka)',
      ticketPrice: 'Gratis',
      phone: '(0274) 512345',
      website: 'https://jogjakota.go.id',
      highlights: [
        'Titik awal Sumbu Filosofi Yogyakarta',
        'Dibangun tahun 1755 oleh Sultan HB I',
        'Tinggi 15 meter dengan arsitektur unik',
        'Spot foto ikonik terutama malam hari'
      ],
      tips: [
        'Kunjungi saat malam hari untuk melihat pencahayaan yang indah',
        'Berhati-hati saat menyeberang jalan karena lalu lintas ramai',
        'Kombinasikan dengan jalan-jalan di Malioboro yang dekat',
        'Waktu terbaik untuk foto: sore atau malam hari'
      ]
    },
    {
      id: 2,
      slug: 'keraton-yogyakarta',
      name: 'Keraton Yogyakarta',
      category: 'cagar-budaya',
      image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
      gallery: [
        '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
        '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
        '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png'
      ],
      description: 'Istana resmi Kesultanan Yogyakarta yang masih berfungsi hingga kini.',
      fullDescription: `Keraton Ngayogyakarta Hadiningrat adalah istana resmi Kesultanan Yogyakarta yang masih berfungsi hingga kini. Dibangun oleh Sultan Hamengku Buwono I pada tahun 1755-1756, keraton ini merupakan pusat pemerintahan dan kebudayaan Jawa.

Kompleks keraton terdiri dari berbagai bangunan dengan arsitektur Jawa klasik yang sarat makna filosofis. Setiap bagian keraton memiliki fungsi dan simbolisme tersendiri yang mencerminkan kosmologi Jawa.

Keraton juga menjadi pusat pelestarian budaya Jawa, termasuk tari-tarian, musik gamelan, upacara adat, dan kerajinan tradisional. Berbagai pusaka kerajaan tersimpan di sini, termasuk kereta kencana dan gamelan pusaka.

Sebagai bagian dari Sumbu Filosofi, Keraton terletak di titik pusat yang melambangkan keseimbangan antara utara (Tugu) dan selatan (Panggung Krapyak), serta antara dunia manusia dengan alam spiritual.`,
      location: 'Jl. Rotowijayan Blok No.1, Panembahan, Kraton, Yogyakarta',
      hours: '08:00 - 14:00 WIB (Tutup Jumat)',
      ticketPrice: 'Rp 15.000 (Domestik) / Rp 25.000 (Asing)',
      phone: '(0274) 373721',
      website: 'https://kratonjogja.id',
      highlights: [
        'Istana Kesultanan yang masih aktif',
        'Arsitektur Jawa klasik yang megah',
        'Koleksi pusaka kerajaan lengkap',
        'Pertunjukan seni dan budaya rutin'
      ],
      tips: [
        'Datang pagi untuk menghindari keramaian',
        'Gunakan pakaian sopan (tidak boleh celana pendek)',
        'Sewa pemandu untuk penjelasan lengkap',
        'Cek jadwal pertunjukan seni sebelum berkunjung'
      ]
    },
    {
      id: 3,
      slug: 'panggung-krapyak',
      name: 'Panggung Krapyak',
      category: 'titik-sumbu',
      image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
      gallery: [
        '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
        '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
        '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png'
      ],
      description: 'Situs spiritual di ujung selatan sumbu filosofis Yogyakarta.',
      fullDescription: `Panggung Krapyak adalah bangunan bersejarah yang terletak di ujung selatan Sumbu Filosofi Yogyakarta. Dibangun pada masa pemerintahan Sultan Hamengku Buwono I sebagai tempat berburu rusa kerajaan.

Bangunan ini berbentuk seperti panggung dengan tinggi sekitar 10 meter, dahulu digunakan Sultan untuk mengamati dan membidik rusa yang digiring dari hutan sekitar. Kini area hutan telah berubah menjadi permukiman.

Dalam konteks Sumbu Filosofi, Panggung Krapyak merepresentasikan titik paling selatan sebelum menuju Laut Selatan. Ini melambangkan akhir perjalanan hidup manusia dan kembalinya roh kepada Sang Pencipta.

Meskipun tidak sepopuler Tugu atau Keraton, Panggung Krapyak memiliki nilai historis dan filosofis yang sangat penting dalam memahami konsep tata kota Yogyakarta yang sarat makna spiritual.`,
      location: 'Jl. Parangtritis, Krapyak, Sewon, Bantul, Yogyakarta',
      hours: '24 Jam (area terbuka)',
      ticketPrice: 'Gratis',
      phone: '(0274) 367123',
      website: 'https://bantulkab.go.id',
      highlights: [
        'Titik selatan Sumbu Filosofi',
        'Bekas tempat berburu Sultan',
        'Arsitektur bersejarah abad ke-18',
        'Suasana tenang dan historis'
      ],
      tips: [
        'Lokasi lebih sepi, cocok untuk kontemplasi',
        'Kombinasikan dengan perjalanan ke Parangtritis',
        'Bawa kamera untuk foto arsitektur unik',
        'Kunjungi sore hari untuk cahaya terbaik'
      ]
    },
    {
      id: 4,
      slug: 'makam-raja-raja-imogiri',
      name: 'Makam Raja-Raja Imogiri',
      category: 'cagar-budaya',
      image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
      gallery: [
        '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
        '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
        '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png'
      ],
      description: 'Kompleks Makam Raja-Raja Imogiri di perbukitan selatan adalah tempat peristirahatan para Sultan.',
      fullDescription: `Makam Raja-Raja Imogiri adalah kompleks pemakaman kerajaan yang terletak di perbukitan Imogiri, sekitar 17 km selatan Yogyakarta. Kompleks ini dibangun oleh Sultan Agung dari Mataram pada tahun 1632.

Untuk mencapai makam, pengunjung harus menaiki 345 anak tangga yang melintasi perbukitan. Perjalanan ini melambangkan perjalanan spiritual menuju kesucian. Di puncak terdapat kompleks makam yang dibagi menjadi tiga bagian.

Makam ini menjadi tempat peristirahatan terakhir para raja Mataram dan penerusnya, termasuk Sultan-Sultan Yogyakarta dan Surakarta. Sultan Agung sendiri dimakamkan di bagian tengah yang paling suci.

Kompleks ini masih aktif digunakan untuk ziarah dan upacara kerajaan. Setiap Senin dan Jumat, makam dibuka untuk umum dengan aturan berpakaian adat Jawa.`,
      location: 'Girirejo, Imogiri, Bantul, Yogyakarta',
      hours: '08:00 - 16:00 WIB (Senin & Jumat)',
      ticketPrice: 'Rp 10.000 + sewa pakaian adat',
      phone: '(0274) 367890',
      website: 'https://bantulkab.go.id',
      highlights: [
        'Makam Sultan Agung dan raja-raja Mataram',
        '345 anak tangga menuju puncak',
        'Pemandangan perbukitan yang indah',
        'Pengalaman budaya memakai pakaian adat'
      ],
      tips: [
        'Wajib memakai pakaian adat Jawa (tersedia sewa)',
        'Siapkan fisik untuk menaiki 345 tangga',
        'Bawa air minum yang cukup',
        'Hanya buka untuk umum Senin dan Jumat'
      ]
    },
    {
      id: 5,
      slug: 'museum-sonobudoyo',
      name: 'Museum Sonobudoyo',
      category: 'museum',
      image: '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
      gallery: [
        '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
        '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
        '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png'
      ],
      description: 'Museum budaya Jawa dengan koleksi artefak bersejarah yang lengkap.',
      fullDescription: `Museum Sonobudoyo adalah museum budaya yang terletak di sisi utara Alun-Alun Utara Yogyakarta. Didirikan pada tahun 1935 oleh Java Instituut, museum ini menyimpan koleksi budaya Jawa dan Bali yang sangat lengkap.

Museum ini memiliki lebih dari 43.000 koleksi yang meliputi arkeologi, sejarah, etnografi, dan seni rupa. Koleksi unggulan termasuk wayang kulit, keris, gamelan, batik, dan berbagai artefak kuno.

Bangunan museum sendiri merupakan contoh arsitektur Jawa tradisional yang indah dengan pendopo di bagian depan. Arsitekturnya mengadaptasi gaya rumah tradisional Jawa dengan sentuhan kolonial.

Museum ini juga rutin mengadakan pertunjukan wayang kulit setiap malam (kecuali Minggu), menjadikannya tempat ideal untuk memahami budaya Jawa secara komprehensif.`,
      location: 'Jl. Trikora No.6, Ngupasan, Gondomanan, Yogyakarta',
      hours: '08:00 - 15:30 WIB (Tutup Senin)',
      ticketPrice: 'Rp 10.000 (Museum) / Rp 20.000 (Wayang)',
      phone: '(0274) 385664',
      website: 'https://sonobudoyo.com',
      highlights: [
        'Koleksi budaya Jawa terlengkap',
        '43.000+ artefak bersejarah',
        'Pertunjukan wayang kulit malam hari',
        'Arsitektur Jawa klasik yang indah'
      ],
      tips: [
        'Datang malam untuk pertunjukan wayang (20:00)',
        'Sewa audio guide untuk informasi lengkap',
        'Alokasikan 2-3 jam untuk melihat semua koleksi',
        'Kombinasikan dengan kunjungan ke Keraton'
      ]
    }
  ] : [
    {
      id: 1,
      slug: 'tugu-yogyakarta',
      name: 'Tugu Yogyakarta',
      category: 'titik-sumbu',
      image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
      gallery: [
        '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
        '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
        '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png'
      ],
      description: 'Iconic monument symbolizing unity and starting point of philosophical axis.',
      fullDescription: `Tugu Yogyakarta is a historic monument marking the starting point of Yogyakarta's Philosophical Axis. Built in 1755 by Sultan Hamengku Buwono I, this monument carries deep philosophical meaning.

Standing 15 meters tall with a cylindrical shape tapering upward, it symbolizes the vertical relationship between humans and the Creator. Located at the intersection of Jenderal Sudirman Street, it serves as an important landmark of Yogyakarta.

In the Philosophical Axis concept, Tugu represents the northernmost point forming an imaginary straight line south toward the Palace, Panggung Krapyak, and the South Sea. This line symbolizes human life's journey from birth to returning to the Creator.

Tugu has also witnessed various historical events, including Indonesian independence. Today, it's an iconic tourist attraction that's a must-visit when in Yogyakarta.`,
      location: 'Jl. Jenderal Sudirman, Gondomanan, Yogyakarta',
      hours: '24 Hours (open area)',
      ticketPrice: 'Free',
      phone: '(0274) 512345',
      website: 'https://jogjakota.go.id',
      highlights: [
        'Starting point of Philosophical Axis',
        'Built in 1755 by Sultan HB I',
        '15 meters tall with unique architecture',
        'Iconic photo spot especially at night'
      ],
      tips: [
        'Visit at night to see beautiful lighting',
        'Be careful crossing the busy street',
        'Combine with walking along nearby Malioboro',
        'Best photo time: evening or night'
      ]
    },
    {
      id: 2,
      slug: 'yogyakarta-palace',
      name: 'Yogyakarta Palace',
      category: 'cagar-budaya',
      image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
      gallery: [
        '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
        '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
        '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png'
      ],
      description: 'Official palace of Yogyakarta Sultanate still functioning today.',
      fullDescription: `Keraton Ngayogyakarta Hadiningrat is the official palace of Yogyakarta Sultanate still functioning today. Built by Sultan Hamengku Buwono I in 1755-1756, this palace is the center of Javanese governance and culture.

The palace complex consists of various buildings with classical Javanese architecture rich in philosophical meaning. Each part has its own function and symbolism reflecting Javanese cosmology.

The palace also serves as a center for preserving Javanese culture, including dances, gamelan music, traditional ceremonies, and crafts. Various royal heirlooms are kept here, including golden carriages and sacred gamelan.

As part of the Philosophical Axis, the Palace is located at the center point symbolizing balance between north (Tugu) and south (Panggung Krapyak), as well as between the human world and spiritual realm.`,
      location: 'Jl. Rotowijayan Blok No.1, Panembahan, Kraton, Yogyakarta',
      hours: '08:00 - 14:00 (Closed Fridays)',
      ticketPrice: 'IDR 15,000 (Domestic) / IDR 25,000 (Foreign)',
      phone: '(0274) 373721',
      website: 'https://kratonjogja.id',
      highlights: [
        'Active functioning Sultanate palace',
        'Magnificent classical Javanese architecture',
        'Complete collection of royal heirlooms',
        'Regular art and cultural performances'
      ],
      tips: [
        'Arrive early to avoid crowds',
        'Wear modest clothing (no shorts allowed)',
        'Hire a guide for complete explanation',
        'Check performance schedule before visiting'
      ]
    },
    {
      id: 3,
      slug: 'panggung-krapyak',
      name: 'Panggung Krapyak',
      category: 'titik-sumbu',
      image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
      gallery: [
        '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
        '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
        '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png'
      ],
      description: 'Spiritual site at southern end of Yogyakarta\'s philosophical axis.',
      fullDescription: `Panggung Krapyak is a historic building located at the southern end of Yogyakarta's Philosophical Axis. Built during the reign of Sultan Hamengku Buwono I as a royal deer hunting post.

The building is shaped like a platform about 10 meters high, formerly used by the Sultan to observe and shoot deer driven from surrounding forests. Today the forest area has become residential.

In the Philosophical Axis context, Panggung Krapyak represents the southernmost point before reaching the South Sea. This symbolizes the end of human life's journey and the soul's return to the Creator.

Although not as popular as Tugu or the Palace, Panggung Krapyak holds great historical and philosophical value in understanding Yogyakarta's city planning concept rich in spiritual meaning.`,
      location: 'Jl. Parangtritis, Krapyak, Sewon, Bantul, Yogyakarta',
      hours: '24 Hours (open area)',
      ticketPrice: 'Free',
      phone: '(0274) 367123',
      website: 'https://bantulkab.go.id',
      highlights: [
        'Southern point of Philosophical Axis',
        'Former Sultan\'s hunting post',
        '18th century historic architecture',
        'Peaceful and historic atmosphere'
      ],
      tips: [
        'Location is quieter, good for contemplation',
        'Combine with trip to Parangtritis beach',
        'Bring camera for unique architecture photos',
        'Visit in afternoon for best lighting'
      ]
    },
    {
      id: 4,
      slug: 'imogiri-royal-cemetery',
      name: 'Imogiri Royal Cemetery',
      category: 'cagar-budaya',
      image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
      gallery: [
        '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
        '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
        '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png'
      ],
      description: 'Royal cemetery complex in southern hills as resting place for Sultans and royal families.',
      fullDescription: `Imogiri Royal Cemetery is a royal burial complex located in the Imogiri hills, about 17 km south of Yogyakarta. This complex was built by Sultan Agung of Mataram in 1632.

To reach the tombs, visitors must climb 345 steps through the hills. This journey symbolizes the spiritual journey toward holiness. At the top lies the tomb complex divided into three sections.

This cemetery serves as the final resting place for Mataram kings and their successors, including Sultans of Yogyakarta and Surakarta. Sultan Agung himself is buried in the central, most sacred section.

The complex remains actively used for pilgrimages and royal ceremonies. Every Monday and Friday, the tombs are open to the public with traditional Javanese dress code requirements.`,
      location: 'Girirejo, Imogiri, Bantul, Yogyakarta',
      hours: '08:00 - 16:00 (Mondays & Fridays)',
      ticketPrice: 'IDR 10,000 + traditional dress rental',
      phone: '(0274) 367890',
      website: 'https://bantulkab.go.id',
      highlights: [
        'Tomb of Sultan Agung and Mataram kings',
        '345 steps to the summit',
        'Beautiful hillside views',
        'Cultural experience wearing traditional dress'
      ],
      tips: [
        'Must wear traditional Javanese clothing (rental available)',
        'Prepare physically for climbing 345 stairs',
        'Bring enough drinking water',
        'Only open to public on Mondays and Fridays'
      ]
    },
    {
      id: 5,
      slug: 'sonobudoyo-museum',
      name: 'Sonobudoyo Museum',
      category: 'museum',
      image: '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
      gallery: [
        '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
        '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
        '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png'
      ],
      description: 'Javanese cultural museum with comprehensive historical artifact collection.',
      fullDescription: `Sonobudoyo Museum is a cultural museum located on the north side of Yogyakarta's North Square. Established in 1935 by Java Instituut, this museum houses a very complete collection of Javanese and Balinese culture.

The museum has over 43,000 collections covering archaeology, history, ethnography, and fine arts. Featured collections include shadow puppets, keris daggers, gamelan, batik, and various ancient artifacts.

The museum building itself exemplifies beautiful traditional Javanese architecture with a pendopo (pavilion) at the front. Its architecture adapts traditional Javanese house style with colonial touches.

The museum also regularly holds shadow puppet performances every night (except Sundays), making it an ideal place to comprehensively understand Javanese culture.`,
      location: 'Jl. Trikora No.6, Ngupasan, Gondomanan, Yogyakarta',
      hours: '08:00 - 15:30 (Closed Mondays)',
      ticketPrice: 'IDR 10,000 (Museum) / IDR 20,000 (Puppet Show)',
      phone: '(0274) 385664',
      website: 'https://sonobudoyo.com',
      highlights: [
        'Most complete Javanese cultural collection',
        '43,000+ historical artifacts',
        'Nightly shadow puppet performances',
        'Beautiful classical Javanese architecture'
      ],
      tips: [
        'Come at night for puppet show (20:00)',
        'Rent audio guide for complete information',
        'Allow 2-3 hours to see all collections',
        'Combine with visit to the Palace'
      ]
    }
  ];

  // Find the destination by slug
  const destination = destinations.find(d => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {locale === 'id' ? 'Destinasi tidak ditemukan' : 'Destination not found'}
          </h1>
          <Button onClick={() => router.push(`/${locale}/destinasi-wisata`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {locale === 'id' ? 'Kembali ke Daftar' : 'Back to List'}
          </Button>
        </div>
      </div>
    );
  }

  const categoryInfo = categories[destination.category];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = destination.name;

    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' - ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Image */}
      <section className="bg-white dark:bg-slate-950 pt-6">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="relative h-[40vh] md:h-[50vh] max-h-[512px]">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover object-center rounded-b-2xl"
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-2xl" />

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className={`${categoryInfo.color} text-white mb-3`}>
                  {categoryInfo.label}
                </Badge>
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {destination.name}
                </h1>
                <div className="flex items-center gap-1 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.location.split(',')[0]}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {locale === 'id' ? 'Tentang' : 'About'}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {destination.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 dark:text-slate-400 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {locale === 'id' ? 'Keunggulan' : 'Highlights'}
                </h2>
                <ul className="space-y-3">
                  {destination.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {locale === 'id' ? 'Tips Berkunjung' : 'Visiting Tips'}
                </h2>
                <ul className="space-y-3">
                  {destination.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 sticky top-24"
              >
                <h3 className="font-semibold mb-4">
                  {locale === 'id' ? 'Informasi' : 'Information'}
                </h3>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{locale === 'id' ? 'Lokasi' : 'Location'}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{destination.location}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{locale === 'id' ? 'Jam Buka' : 'Opening Hours'}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{destination.hours}</p>
                    </div>
                  </div>

                  {/* Ticket */}
                  <div className="flex items-start gap-3">
                    <Ticket className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{locale === 'id' ? 'Tiket Masuk' : 'Entry Fee'}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{destination.ticketPrice}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{locale === 'id' ? 'Telepon' : 'Phone'}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{destination.phone}</p>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Website</p>
                      <a
                        href={destination.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-amber-600 hover:underline"
                      >
                        {destination.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                    onClick={() => router.push(`/${locale}/map?destination=${destination.id}&name=${encodeURIComponent(destination.name)}`)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {locale === 'id' ? 'Lihat di Peta' : 'View on Map'}
                  </Button>
                </div>

                {/* Share */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-medium mb-3">
                    {locale === 'id' ? 'Bagikan' : 'Share'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                      title="WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      title="Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white transition-colors"
                      title="X (Twitter)"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
