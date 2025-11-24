'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      if (email && password) {
        // Redirect to dashboard after successful login
        router.push(`/${locale}/admin`);
      } else {
        alert(locale === 'id' ? 'Email dan password harus diisi' : 'Email and password are required');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl mb-3 font-bold">
            {t('title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {locale === 'id' ? 'Ensiklopedia Sumbu Filosofi Yogyakarta' : 'Yogyakarta Philosophical Axis Encyclopedia'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
              {t('password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {locale === 'id' ? 'Memproses...' : 'Processing...'}
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t('login')}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('loginNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
