import { useState, useEffect, useMemo } from "react";
import { FiPackage, FiFilter, FiSearch } from "react-icons/fi";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSearch from "@/components/products/ProductSearch";
import type { ProductFilter as ProductFilterType } from "@/types/product";
import ProductFilters from "@/components/products/ProductFilters";
import SortBar from "@/components/products/SortBar";
import ProductPagination from "@/components/products/ProductPagination";

interface ProductPageContentProps {
  products: any[];
  categories?: any[];
}

const parseNumberParam = (
  param: string | null,
  defaultValue: number
): number => {
  if (!param) return defaultValue;
  const val = parseInt(param, 10);
  return isNaN(val) ? defaultValue : val;
};

export default function ProductPageContent({
  products = [],
  categories = [],
}: ProductPageContentProps) {
  // Safety check to ensure products and categories are always arrays
  const safeProducts = Array.isArray(products) ? products : [];
  const safeCategories = Array.isArray(categories) ? categories : [];
  const isInventoryEmpty = safeProducts.length === 0;

  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<any>({
    category: "all",
    brand: "all",
    minPrice: 0,
    maxPrice: 20000000,
    sort: "newest",
    search: "",
    page: 1,
    thickness: [],
  });

  // Sync filter with URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("ProductPageContent mounting. Syncing with URL...");
      const urlParams = new URLSearchParams(window.location.search);
      const thicknessParam = urlParams.get("thickness");

      const initialFilter = {
        category: urlParams.get("category") || "all",
        brand: urlParams.get("brand") || "all",
        minPrice: parseNumberParam(urlParams.get("minPrice"), 0),
        maxPrice: parseNumberParam(urlParams.get("maxPrice"), 20000000),
        sort: urlParams.get("sort") || "newest",
        search: urlParams.get("q") || "",
        page: parseNumberParam(urlParams.get("page"), 1),
        thickness: thicknessParam ? [parseInt(thicknessParam)] : [],
      };

      setFilter(initialFilter);
      setIsLoaded(true);
    }
  }, []);

  const updateUrl = (newParams: URLSearchParams) => {
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  const handleFilterChange = (newFilter: any) => {
    setFilter((prev: any) => {
      const filterToApply =
        typeof newFilter === "string"
          ? { sort: newFilter, page: 1 }
          : newFilter;

      return { ...prev, ...filterToApply };
    });
  };

  // Sync URL with filter state
  useEffect(() => {
    if (!isLoaded) return;

    const params = new URLSearchParams();
    if (filter.category !== "all") params.set("category", filter.category);
    if (filter.brand !== "all") params.set("brand", filter.brand);
    if (filter.minPrice !== 0) params.set("minPrice", filter.minPrice.toString());
    if (filter.maxPrice !== 20000000) params.set("maxPrice", filter.maxPrice.toString());
    if (filter.sort !== "newest") params.set("sort", filter.sort);
    if (filter.search !== "") params.set("q", filter.search);
    if (filter.page !== 1) params.set("page", filter.page.toString());
    if (filter.thickness && filter.thickness.length > 0)
      params.set("thickness", filter.thickness[0].toString());

    updateUrl(params);
  }, [filter, isLoaded]);

  const filteredProducts = safeProducts
    .filter((product) => {
      if (!product) return false;

      const categoryValue = String(filter.category || "all");
      const productCategory =
        typeof product.category === "object" && product.category
          ? product.category
          : { id: product.category, slug: product.category, name: product.category };

      // بررسی دسته‌بندی - پشتیبانی از انواع مختلف داده
      const categoryMatch =
        categoryValue === "all" ||
        String(productCategory.id) === categoryValue ||
        String(productCategory.slug) === categoryValue ||
        String(productCategory.name) === categoryValue;

      // بررسی برند - پشتیبانی از انواع مختلف داده
      const brandMatch =
        filter.brand === "all" ||
        product.brand === filter.brand ||
        (product.brand &&
          typeof product.brand === "object" &&
          product.brand.slug === filter.brand);

      const priceMatch =
        (product.price || 0) >= filter.minPrice &&
        (product.price || 0) <= filter.maxPrice;

      // بررسی ضخامت
      const thicknessMatch =
        !filter.thickness ||
        filter.thickness.length === 0 ||
        filter.thickness.some((t: number) => {
          // تبدیل ضخامت محصول به عدد برای مقایسه
          const productThickness = parseInt(String(product.thickness || "0"));
          return productThickness === t;
        });

      const searchMatch = (product.name || "")
        .toLowerCase()
        .includes(filter.search.toLowerCase());

      return (
        categoryMatch &&
        brandMatch &&
        priceMatch &&
        thicknessMatch &&
        searchMatch
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.date_added || a.created_at || 0).getTime();
      const dateB = new Date(b.date_added || b.created_at || 0).getTime();

      switch (filter.sort) {
        case "popular":
          return (b.orderCount || b.viewCount || 0) - (a.orderCount || a.viewCount || 0);
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "newest":
        default:
          return dateB - dateA;
      }
    });

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(Math.max(filter.page, 1), totalPages);

  useEffect(() => {
    if (filter.page !== currentPage) {
      handleFilterChange({ page: currentPage });
    }
  }, [currentPage, filter.page]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage]);

  return (
    <Container className="pt-8">
      {/* هدر صفحه */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          محصولات MDF
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          تنوع بی‌نظیر در طرح، رنگ و ابعاد برای تمامی نیازهای شما
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* فیلترها */}
        <aside className="w-full lg:w-1/4">
          <ProductSearch
            onSearch={(search) => handleFilterChange({ search, page: 1 })}
          />
          <ProductFilters
            onFilterChange={handleFilterChange}
            onSortChange={handleFilterChange}
            totalProducts={products.length}
            categories={categories}
            currentFilter={filter}
          />
        </aside>

        {/* لیست محصولات */}
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <SortBar
              totalProducts={filteredProducts.length}
              currentSort={filter.sort}
              onSortChange={(sort) => handleFilterChange({ sort, page: 1 })}
            />
            {/* تعداد نتایج */}
            <div className="text-gray-600 text-sm">
              نمایش {paginatedProducts.length} از {filteredProducts.length} محصول
            </div>
          </div>

          {!isLoaded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`loading-skeleton-${index}`}
                  className="bg-white rounded-card p-4 border border-gray-100 animate-pulse"
                >
                  <div className="h-48 bg-gray-100 rounded-button mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : isInventoryEmpty ? (
            <div className="bg-white rounded-card border border-gray-100 p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                  <FiPackage size={48} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                موجودی نداریم
              </h3>
              <p className="text-gray-600">
                در حال بروزرسانی محصولات هستیم. لطفا بعدا دوباره بررسی کنید.
              </p>
            </div>
          ) : (
            <ProductGrid
              products={
                Array.isArray(paginatedProducts) ? paginatedProducts : []
              }
            />
          )}

          {!isInventoryEmpty && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => handleFilterChange({ page })}
            />
          )}
        </main>
      </div>
    </Container>
  );
}
