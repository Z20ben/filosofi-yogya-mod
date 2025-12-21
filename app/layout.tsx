import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filosofi Jogja - Ensiklopedia Sumbu Filosofi Yogyakarta",
  description: "Explore the rich cultural heritage of Yogyakarta's Philosophical Axis (Sumbu Filosofi) - from Tugu Monument to Panggung Krapyak. Discover landmarks, culture, UMKM, and events.",
  keywords: ["Yogyakarta", "Cultural Heritage", "Sumbu Filosofi", "Tourism", "UMKM", "Indonesia", "Keraton", "Javanese Philosophy"],
  authors: [{ name: "Filosofi Jogja Team" }],
  creator: "Filosofi Jogja",
  publisher: "Filosofi Jogja",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "http://localhost:3000",
    title: "Filosofi Jogja - Ensiklopedia Sumbu Filosofi Yogyakarta",
    description: "Explore the rich cultural heritage of Yogyakarta's Philosophical Axis (Sumbu Filosofi). Discover landmarks, UMKM, cultural events, and the philosophical meaning behind this sacred axis.",
    siteName: "Filosofi Jogja",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Filosofi Jogja - Sumbu Filosofi Yogyakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Filosofi Jogja - Ensiklopedia Sumbu Filosofi Yogyakarta",
    description: "Explore the rich cultural heritage of Yogyakarta's Philosophical Axis",
    images: ["/assets/og-image.jpg"],
    creator: "@filosofijogja",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    languages: {
      'id': '/id',
      'en': '/en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>

        {/* Sienna Accessibility Widget */}
        <Script
          src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
