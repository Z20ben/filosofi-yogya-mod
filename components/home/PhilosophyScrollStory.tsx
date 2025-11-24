'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Section {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlight: string;
  position: string;
}

export function PhilosophyScrollStory() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const storySectionsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: storySectionsRef,
    offset: ["start start", "end end"]
  });

  const sectionsData = {
    id: {
      title: 'Sumbu Filosofi Yogyakarta',
      subtitle: 'Warisan Budaya Dunia UNESCO',
      scrollHint: 'Scroll untuk melanjutkan cerita',
      sections: [
        {
          title: 'Warisan Budaya Dunia',
          subtitle: '',
          description: 'Sumbu Filosofi Yogyakarta telah ditetapkan sebagai Warisan Budaya Dunia UNESCO. Tata kota ini merepresentasikan kosmologi Jawa yang unik, menghubungkan alam spiritual, dunia manusia, dan kesatuan filosofis yang hidup.',
          image: '/assets/b059b0407249c80c00c9dbb43425f433d547254d.png',
          highlight: 'UNESCO Heritage',
          position: 'intro'
        },
        {
          title: 'Sumbu Utama & Penyangga',
          subtitle: '',
          description: 'Tata ruang Yogyakarta tersusun atas Sumbu Utama (Tugu-Keraton-Panggung Krapyak) dari Utara-Selatan, dan Sumbu Penyangga (Kotagede-Keraton-Imogiri) dari Timur-Barat-Selatan.',
          image: '/assets/a83cb12e1210cf7d1dc4833c9c84e8243f5ddf1a.png',
          highlight: 'Tata Ruang',
          position: 'overview'
        },
        {
          title: 'Tugu Yogyakarta',
          subtitle: '',
          description: 'Tugu Pal Putih atau Tugu Golong-Gilig menandai awal sumbu filosofis di utara. Bentuknya yang menyerupai linga dan yoni melambangkan persatuan, kesuburan, dan keseimbangan.',
          image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
          highlight: 'Titik Utara',
          position: 'tugu'
        },
        {
          title: 'Keraton Yogyakarta',
          subtitle: '',
          description: 'Keraton Ngayogyakarta Hadiningrat adalah jantung dari seluruh sistem filosofis. Sebagai pusat mandala, Keraton menjadi titik temu antara sumbu utama dan sumbu penyangga.',
          image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
          highlight: 'Titik Pusat',
          position: 'center'
        },
        {
          title: 'Panggung Krapyak',
          subtitle: '',
          description: 'Panggung Krapyak di ujung selatan sumbu filosofis merupakan bangunan bersejarah yang digunakan sebagai panggung berburu rusa oleh Sultan.',
          image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
          highlight: 'Titik Selatan',
          position: 'krapyak'
        },
        {
          title: 'Kotagede',
          subtitle: '',
          description: 'Kotagede adalah kawasan bersejarah yang merupakan ibukota pertama Kerajaan Mataram Islam, terkenal dengan kerajinan perak dan arsitektur kuno.',
          image: 'https://images.unsplash.com/photo-1726931535415-edbc43d42c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBjcmFmdCUyMGFydGlzYW58ZW58MXx8fHwxNzYzNjYzNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
          highlight: 'Sumbu Penyangga',
          position: 'kotagede'
        },
        {
          title: 'Makam Raja-Raja Imogiri',
          subtitle: '',
          description: 'Kompleks Makam Raja-Raja Imogiri di perbukitan selatan adalah tempat peristirahatan para Sultan dan keluarga kerajaan Mataram.',
          image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
          highlight: 'Sumbu Penyangga',
          position: 'imogiri'
        },
        {
          title: 'Filosofi yang Hidup',
          subtitle: '',
          description: 'Sumbu Filosofi Yogyakarta bukan sekadar tata ruang kuno, tetapi filosofi hidup yang masih diamalkan hingga kini. UNESCO mengingatkan kita untuk melestarikan warisan ini untuk generasi mendatang.',
          image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600&q=80',
          highlight: 'Warisan Hidup',
          position: 'conclusion'
        }
      ]
    },
    en: {
      title: 'Yogyakarta Philosophical Axis',
      subtitle: 'UNESCO World Heritage',
      scrollHint: 'Scroll to continue the story',
      sections: [
        {
          title: 'World Heritage Site',
          subtitle: '',
          description: 'The Philosophical Axis of Yogyakarta has been designated as a UNESCO World Heritage Site. This urban layout represents a unique Javanese cosmology, connecting the spiritual realm, human world, and living philosophical unity.',
          image: '/assets/b059b0407249c80c00c9dbb43425f433d547254d.png',
          highlight: 'UNESCO Heritage',
          position: 'intro'
        },
        {
          title: 'Main & Supporting Axes',
          subtitle: '',
          description: 'Yogyakarta\'s spatial layout consists of the Main Axis (Tugu-Keraton-Panggung Krapyak) running North-South, and the Supporting Axis (Kotagede-Keraton-Imogiri) from East-West-South.',
          image: '/assets/a83cb12e1210cf7d1dc4833c9c84e8243f5ddf1a.png',
          highlight: 'Spatial Layout',
          position: 'overview'
        },
        {
          title: 'Tugu Yogyakarta',
          subtitle: '',
          description: 'Tugu Pal Putih or Tugu Golong-Gilig marks the beginning of the philosophical axis in the north. Its shape resembling linga and yoni symbolizes unity, fertility, and balance.',
          image: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
          highlight: 'Northern End Point',
          position: 'tugu'
        },
        {
          title: 'Yogyakarta Palace',
          subtitle: '',
          description: 'Keraton Ngayogyakarta Hadiningrat is the heart of the entire philosophical system. As the mandala center, the Keraton is the meeting point between the main and supporting axes.',
          image: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
          highlight: 'Center Point',
          position: 'center'
        },
        {
          title: 'Panggung Krapyak',
          subtitle: '',
          description: 'Panggung Krapyak at the southern end of the philosophical axis is a historical building used as a deer hunting stage by the Sultan.',
          image: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
          highlight: 'Southern Point',
          position: 'krapyak'
        },
        {
          title: 'Kotagede',
          subtitle: '',
          description: 'Kotagede is a historical area that was the first capital of the Islamic Mataram Kingdom, famous for its silver crafts and ancient architecture.',
          image: 'https://images.unsplash.com/photo-1726931535415-edbc43d42c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBjcmFmdCUyMGFydGlzYW58ZW58MXx8fHwxNzYzNjYzNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
          highlight: 'Supporting Axis',
          position: 'kotagede'
        },
        {
          title: 'Imogiri Royal Cemetery',
          subtitle: '',
          description: 'The Imogiri Royal Cemetery complex in the southern hills is the resting place for Sultans and the Mataram royal family.',
          image: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
          highlight: 'Supporting Axis',
          position: 'imogiri'
        },
        {
          title: 'Living Philosophy',
          subtitle: '',
          description: 'Yogyakarta\'s Philosophical Axis is not merely an ancient spatial layout, but a living philosophy still practiced today. UNESCO reminds us to preserve this heritage for future generations.',
          image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600&q=80',
          highlight: 'Living Heritage',
          position: 'conclusion'
        }
      ]
    }
  };

  const t = sectionsData[locale as 'id' | 'en'] || sectionsData.id;

  useEffect(() => {
    const handleScroll = () => {
      if (!storySectionsRef.current) return;

      const container = storySectionsRef.current;
      const sections = container.querySelectorAll('.story-section');
      const scrollPosition = window.scrollY;
      const containerTop = container.offsetTop;

      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop + containerTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionMiddle = sectionTop + sectionHeight / 2;

        if (scrollPosition >= sectionMiddle - window.innerHeight / 2 &&
            scrollPosition < sectionMiddle + window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative bg-slate-950">
      {/* Header */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-amber-200">{t.subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 text-white"
          >
            {t.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center gap-2 mt-12"
          >
            <span className="text-sm text-amber-300/80">{t.scrollHint}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-amber-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Story Sections */}
      <div ref={storySectionsRef} className="relative">
        {t.sections.map((section, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="story-section relative min-h-screen flex items-center py-20"
            >
              {/* Background */}
              <div className="absolute inset-0 opacity-10">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />

              {/* Content */}
              <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className={`grid md:grid-cols-2 gap-12 items-center ${!isLeft ? 'md:grid-flow-dense' : ''}`}>
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={isLeft ? 'md:col-start-1' : 'md:col-start-2'}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full mb-6">
                      <span className="text-amber-400 text-sm">{section.highlight}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {section.title}
                    </h2>

                    <p className="text-lg text-slate-300 leading-relaxed">
                      {section.description}
                    </p>

                    {/* Section Indicator */}
                    <div className="flex items-center gap-2 mt-8">
                      {t.sections.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            i === index
                              ? 'w-12 bg-gradient-to-r from-amber-500 to-orange-500'
                              : i < index
                              ? 'w-8 bg-amber-500/50'
                              : 'w-6 bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: isLeft ? 50 : -50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={isLeft ? 'md:col-start-2' : 'md:col-start-1'}
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 border-4 border-amber-500/30 rounded-2xl" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Section Number */}
              <div className="absolute top-8 right-8 text-8xl md:text-9xl font-bold text-white/5 pointer-events-none">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/assets/b059b0407249c80c00c9dbb43425f433d547254d.png"
            alt="Yogyakarta Heritage"
            fill
            className="object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {locale === 'id'
              ? 'Jelajahi Yogyakarta dengan Penuh Makna'
              : 'Explore Yogyakarta with Full Meaning'}
          </h2>

          <p className="text-xl text-slate-300 mb-12">
            {locale === 'id'
              ? 'Setiap tempat di Yogyakarta memiliki cerita. Setiap langkah adalah bagian dari filosofi yang hidup.'
              : 'Every place in Yogyakarta has a story. Every step is part of a living philosophy.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/encyclopedia`}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              {locale === 'id' ? 'Mulai Eksplorasi' : 'Start Exploring'}
            </Link>

            <a
              href="https://jogjaheritage.com/reservasi/reservasi_user"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-slate-800 text-white border-2 border-amber-500 rounded-xl text-lg hover:bg-amber-500/20 hover:shadow-2xl transition-all"
            >
              {locale === 'id' ? 'Reservasi Sekarang' : 'Book Now'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
