import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds on Vercel
    // We use the new flat config (eslint.config.mjs) which Vercel doesn't support yet
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
