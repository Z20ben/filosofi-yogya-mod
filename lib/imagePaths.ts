// Image Path Configuration
// Centralized image path management for easy updates

export const ImagePaths = {
  // Hero Slider Images (1920px width)
  hero: {
    tugu: '/images/hero/tugu-yogyakarta.jpg',
    kraton: '/images/hero/kraton-yogyakarta.jpg',
    panggung: '/images/hero/panggung-krapyak.jpg',
  },

  // Introduction/Feature Images
  intro: {
    culture: '/images/hero/javanese-culture.jpg',
  },

  // Kawasan/Landmarks (600px width)
  kawasan: {
    parangtritis: '/images/kawasan/parangtritis.jpg',
    alunAlunSelatan: '/images/kawasan/alun-alun-selatan.jpg',
    kraton: '/images/kawasan/kraton.jpg',
    tugu: '/images/kawasan/tugu.jpg',
    merapi: '/images/kawasan/merapi.jpg',
  },

  // Wisata/Tourism (800px width)
  wisata: {
    parangtritis: '/images/wisata/parangtritis.jpg',
    alunAlunKidul: '/images/wisata/alun-alun-kidul.jpg',
    kraton: '/images/wisata/kraton.jpg',
    malioboro: '/images/wisata/malioboro.jpg',
    tugu: '/images/wisata/tugu.jpg',
    bentengVredeburg: '/images/wisata/benteng-vredeburg.jpg',
    tamanSari: '/images/wisata/taman-sari.jpg',
    prambanan: '/images/wisata/prambanan.jpg',
    kaliurang: '/images/wisata/kaliurang.jpg',
  },

  // UMKM (800px width)
  umkm: {
    batikWinotosastro: '/images/umkm/batik-winotosastro.jpg',
    wayangKulit: '/images/umkm/wayang-kulit.jpg',
    gudegYuDjum: '/images/umkm/gudeg-yu-djum.jpg',
    perakKotaGede: '/images/umkm/perak-kota-gede.jpg',
    keramikKasongan: '/images/umkm/keramik-kasongan.jpg',
    bakpiaPathok: '/images/umkm/bakpia-pathok.jpg',
    tenunLurik: '/images/umkm/tenun-lurik.jpg',
    kerajinanKulit: '/images/umkm/kerajinan-kulit.jpg',
    jamuTradisional: '/images/umkm/jamu-tradisional.jpg',
    blangkon: '/images/umkm/blangkon.jpg',
    keripikTempe: '/images/umkm/keripik-tempe.jpg',
    kerajinanKayu: '/images/umkm/kerajinan-kayu.jpg',
  },

  // Galeri (1080px width)
  galeri: {
    sample1: '/images/galeri/kraton-1.jpg',
    sample2: '/images/galeri/upacara-tradisional.jpg',
    sample3: '/images/galeri/kerajinan-batik.jpg',
    sample4: '/images/galeri/tugu-yogyakarta.jpg',
    sample5: '/images/galeri/panggung-krapyak.jpg',
    sample6: '/images/galeri/wayang-kulit.jpg',
  },

  // Tugu Pal Putih Detail Page Gallery (1920px width)
  tuguPalPutih: {
    historic: '/images/tugu-detail/tugu-historic.jpg',
    aerial: '/images/tugu-detail/tugu-aerial.jpg',
    ground: '/images/tugu-detail/tugu-ground.jpg',
  },

  // SimplePage backgrounds (1920px width)
  pages: {
    sejarah: '/images/hero/sejarah-background.jpg',
    wisata: '/images/hero/wisata-background.jpg',
    umkmPotential: '/images/hero/umkm-background.jpg',
    tentang: '/images/hero/tentang-background.jpg',
  },
};

// Fallback images (using Unsplash as backup if local image not found)
export const FallbackImages = {
  hero: {
    tugu: 'https://images.unsplash.com/photo-1722444924699-391078e83ad6?w=1920',
    kraton: 'https://images.unsplash.com/photo-1740815324000-963c957cc973?w=1920',
    panggung: 'https://images.unsplash.com/photo-1669032667712-4402633fb1e0?w=1920',
  },
  tuguPalPutih: {
    historic: 'https://images.unsplash.com/photo-1655793488799-1ffba5b22cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    aerial: 'https://images.unsplash.com/photo-1671706474508-2d1e05be761d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    ground: 'https://images.unsplash.com/photo-1729522605417-cd949a27a27b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  default: 'https://images.unsplash.com/photo-1655793488799-1ffba5b22cbd?w=800',
};

// Helper function to get image with fallback
export function getImagePath(path: string, fallback?: string): string {
  return path || fallback || FallbackImages.default;
}
