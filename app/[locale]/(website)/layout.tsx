import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LazyFAQChatbox } from "@/components/shared/LazyFAQChatbox";
import { Toaster } from "sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Filosofi Yogya',
    default: 'Filosofi Yogya - Ensiklopedia Sumbu Filosofi Yogyakarta',
  },
  description: 'Jelajahi kekayaan budaya dan filosofi Jawa melalui Sumbu Filosofi Yogyakarta. Temukan sejarah, destinasi wisata, UMKM lokal, dan agenda acara budaya.',
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <LazyFAQChatbox />
      <Toaster />
    </div>
  );
}
