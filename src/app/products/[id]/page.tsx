import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductInfo from '@/components/products/ProductInfo';
import RelatedProducts from '@/components/products/RelatedProducts';
import productsData from '@/data/products/products.json';
import siteData from '@/data/site.json';
import type { Product } from '@/types/product';

/**
 * تولید متادیتا برای سئو
 */
export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = productsData.find(p => p.id === params.id) as Product | undefined;

  if (!product) {
    return {
      title: 'محصول یافت نشد',
      description: 'محصول مورد نظر شما در فروشگاه موجود نمی‌باشد.'
    };
  }

  return {
    title: `${product.name} | ${siteData.brand.name}`,
    description: product.fullDescription || product.description,
    keywords: `${product.name}, ${product.brand}, MDF, ورق کابینت, ${product.thickness}mm`,
    openGraph: {
      title: `${product.name} | ${siteData.brand.name}`,
      description: product.description,
      images: product.images?.length ? [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.name
        }
      ] : undefined,
    },
  };
}

/**
 * صفحه جزئیات محصول
 */
export default function ProductDetailPage({
  params
}: {
  params: { id: string }
}) {
  // پیدا کردن محصول بر اساس id
  const product = productsData.find(p => p.id === params.id) as Product | undefined;

  // اگر محصول یافت نشد، صفحه 404
  if (!product) {
    notFound();
  }

  return (
    <div className="pb-16">
      <Breadcrumb />
      
      <Container className="pt-8">
        {/* ===== بخش اصلی محصول ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* گالری تصاویر */}
          <ProductImageGallery
            images={product.images || []}
            productName={product.name}
          />

          {/* اطلاعات محصول */}
          <ProductInfo product={product} />
        </div>

        {/* ===== محصولات مرتبط ===== */}
        <RelatedProducts
          products={productsData as Product[]}
          currentProductId={product.id}
        />
      </Container>
    </div>
  );
}

// ===== تولید صفحات استاتیک برای تمام محصولات =====
export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}