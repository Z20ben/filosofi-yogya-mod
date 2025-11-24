import Link from 'next/link';
import { Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background pt-16">
      {/* Main Content */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Code */}
        <h1 className="text-9xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
            <MapPin className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">{t('title')}</h2>
          <p className="text-xl font-medium text-foreground">{t('message')}</p>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              {t('btnHome')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
