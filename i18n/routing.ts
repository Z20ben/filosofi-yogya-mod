import { defineRouting } from 'next-intl/routing';
import { pathnames } from '@/config/pathnames';

export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  pathnames: pathnames as any,
});
