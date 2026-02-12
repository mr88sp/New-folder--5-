/** @type {import('next').NextConfig} */

const nextConfig = {
  // ============ تنظیمات React ============
  reactStrictMode: true,
  swcMinify: true,
  
  // ============ تنظیمات تصاویر ============
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // ============ کامپایلر ============
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // ============ آدرس پایه ============
  basePath: '',
  
  // ============ تنظیمات بین‌المللی ============
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
    localeDetection: false,
  },
  
  // ============ بهینه‌سازی ============
  optimizeFonts: true,
  
  // ============ هدرهای امنیتی ============
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // ============ ریدایرکت‌های اصلاح شده ============
  async redirects() {
    return [
      // ✅ ریدایرکت از آدرس‌های قدیمی به آدرس‌های جدید
      {
        source: '/gallery',
        destination: '/projects',
        permanent: true, // 301 redirect
      },
      {
        source: '/services',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/price-list',
        destination: '/price',
        permanent: true,
      },
      {
        source: '/color-catalog',
        destination: '/categories',
        permanent: true,
      },
      // ❌ این ریدایرکت حذف شده چون باعث لوپ میشد
      // {
      //   source: '/categories',
      //   destination: '/categories',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;