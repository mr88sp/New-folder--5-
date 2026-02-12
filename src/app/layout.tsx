import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import siteData from '../data/site.json';

// تنظیم فونت وزیرمتن
const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

// متادیتای سایت - برای سئو
export const metadata: Metadata = {
  title: {
    default: siteData.seo.title,
    template: `%s | ${siteData.brand.name}`,
  },
  description: siteData.seo.description,
  keywords: siteData.seo.keywords,
  authors: [{ name: siteData.brand.name }],
  creator: siteData.brand.name,
  publisher: siteData.brand.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://${siteData.domain}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteData.seo.title,
    description: siteData.seo.description,
    url: `https://${siteData.domain}`,
    siteName: siteData.brand.name,
    images: [
      {
        url: siteData.seo.ogImage || '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteData.brand.name,
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.seo.title,
    description: siteData.seo.description,
    images: [siteData.seo.ogImage || '/images/og-image.jpg'],
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
  icons: {
    icon: siteData.brand.favicon,
    shortcut: siteData.brand.favicon,
    apple: siteData.brand.favicon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}