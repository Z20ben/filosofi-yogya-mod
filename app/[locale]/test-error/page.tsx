'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, MapPin, Home } from 'lucide-react';

export default function TestErrorPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test error untuk melihat error page 500');
  }

  const triggerError = () => {
    setShouldError(true);
  };

  const goToNotFound = () => {
    router.push(`/${locale}/halaman-yang-tidak-ada-404`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 text-foreground">Test Error Pages</h1>
          <p className="text-muted-foreground">
            Halaman untuk testing 3 custom error pages yang sudah dibuat
          </p>
        </div>

        {/* Error Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* 404 Card */}
          <div className="bg-card border-2 border-border rounded-lg p-6 text-center space-y-4 hover:border-[var(--javanese-brown-bg)] transition-colors">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] bg-clip-text text-transparent">
              404
            </h2>
            <h3 className="text-lg font-semibold text-foreground">Not Found</h3>
            <p className="text-sm text-muted-foreground">
              Halaman tidak ditemukan
            </p>
            <Button
              onClick={goToNotFound}
              className="w-full bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] hover:opacity-90 text-white"
            >
              Test 404
            </Button>
          </div>

          {/* 419 Card */}
          <div className="bg-card border-2 border-border rounded-lg p-6 text-center space-y-4 hover:border-[var(--javanese-brown-bg)] transition-colors">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] bg-clip-text text-transparent">
              419
            </h2>
            <h3 className="text-lg font-semibold text-foreground">Session Expired</h3>
            <p className="text-sm text-muted-foreground">
              Sesi telah berakhir
            </p>
            <Link href={`/${locale}/session-expired`} className="block w-full">
              <Button className="w-full bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] dark:from-orange-600 dark:to-[var(--javanese-terracotta)] hover:opacity-90 text-white">
                Test 419
              </Button>
            </Link>
          </div>

          {/* 500 Card */}
          <div className="bg-card border-2 border-border rounded-lg p-6 text-center space-y-4 hover:border-red-700 dark:hover:border-red-500 transition-colors">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-700 to-red-900 dark:from-red-500 dark:to-red-700 flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-red-700 to-red-900 dark:from-red-500 dark:to-red-700 bg-clip-text text-transparent">
              500
            </h2>
            <h3 className="text-lg font-semibold text-foreground">Server Error</h3>
            <p className="text-sm text-muted-foreground">
              Terjadi kesalahan server
            </p>
            <Button
              onClick={triggerError}
              variant="destructive"
              className="w-full bg-gradient-to-r from-red-700 to-red-900 dark:from-red-500 dark:to-red-700 hover:opacity-90"
            >
              Test 500
            </Button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-10">
          <Link href={`/${locale}`}>
            <Button variant="outline" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
