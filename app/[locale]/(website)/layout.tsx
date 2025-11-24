import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FAQChatbox } from "@/components/shared/FAQChatbox";
import { Toaster } from "sonner";

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
      <FAQChatbox />
      <Toaster />
    </div>
  );
}
