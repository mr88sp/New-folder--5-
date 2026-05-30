import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import PriceBanner from "@/components/price/PriceBanner";
import PriceFilter from "@/components/price/PriceFilter";
import PriceTable from "@/components/price/PriceTable";
import DiscountCards from "@/components/price/DiscountCards";
import TableFeatures from "@/components/price/TableFeatures";
import PriceNotes from "@/components/price/PriceNotes";
import DynamicPriceTable from "@/components/price/DynamicPriceTable";
import type { PriceCategory, PriceRow, DynamicTable } from "@/types/price";

interface PricePageContentProps {
  siteContent: any;
  products: any[];
  priceTables?: DynamicTable[];
}

export default function PricePageContent({
  siteContent,
  products,
  priceTables = [],
}: PricePageContentProps) {
  // Construct price tables from siteContent or products
  const allPriceTables = useMemo(() => {
    // If siteContent has price_categories, use them (assuming they are static/manual)
    if (
      siteContent.price_categories &&
      Array.isArray(siteContent.price_categories) &&
      siteContent.price_categories.length > 0
    ) {
      return siteContent.price_categories as PriceCategory[];
    }

    // Fallback: Group products by category to create dynamic price tables
    const groups: Record<string, PriceCategory> = {};

    products.forEach((p, index) => {
      const catName = p.category || "سایر محصولات";
      if (!groups[catName]) {
        groups[catName] = {
          id: `cat-${index}`,
          name: catName,
          order: index,
          products: [],
        };
      }

      // Attempt to extract price row data from product
      const thickness = p.thickness ? parseFloat(p.thickness) : 16;
      const dimensions = p.dimensions || "3660x1830";
      const factory = p.brand || p.factory || "نامشخص";
      const price = p.price ? parseInt(p.price) : 0;

      // Calculate square meter price (approximate based on dimensions)
      let area = 0;
      const dimSeparator = dimensions.includes("x")
        ? "x"
        : dimensions.includes("*")
        ? "*"
        : null;

      if (dimSeparator) {
        const [l, w] = dimensions
          .split(dimSeparator)
          .map((d: string) => parseFloat(d));
        if (!isNaN(l) && !isNaN(w)) {
          // dimensions are usually in cm or mm.
          // If > 100, assume cm or mm. 3660 is mm. 366 is cm.
          // Standard sheet is roughly 1.83m * 3.66m = 6.7 sqm
          let lengthM = l;
          let widthM = w;

          if (l > 10) lengthM = l / 100; // cm to m
          if (l > 1000) lengthM = l / 1000; // mm to m

          if (w > 10) widthM = w / 100;
          if (w > 1000) widthM = w / 1000;

          area = lengthM * widthM;
        }
      }

      // If dimensions format is unknown or invalid, default to standard sheet size 3.66*1.83 = 6.6978
      if (area === 0) area = 6.7;

      const squareMeterPrice = area > 0 ? Math.round(price / area) : 0;

      let stockDisplay = "ناموجود";
      if (p.stockStatus === "in-stock" || p.stock_status === "instock")
        stockDisplay = "موجود";
      else if (p.stockStatus === "call-for-price" || p.stock_status === "call")
        stockDisplay = "تماس بگیرید";
      else if (
        p.stockStatus === "out-of-stock" ||
        p.stock_status === "outofstock"
      )
        stockDisplay = "ناموجود";

      const priceRow: PriceRow = {
        thickness,
        dimensions,
        factory,
        unitPrice: price,
        squareMeterPrice,
        stock: stockDisplay,
        productId: p.id,
      };

      groups[catName].products.push(priceRow);
    });

    return Object.values(groups);
  }, [siteContent, products]);

  const [filteredPriceTables, setFilteredPriceTables] =
    useState<PriceCategory[]>(allPriceTables);

  const allRowsWithCategory = useMemo(() => {
    return allPriceTables.flatMap((cat) =>
      cat.products.map((product) => ({
        ...product,
        categoryName: cat.name,
      }))
    );
  }, [allPriceTables]);

  const getTypeKey = (name: string) => {
    const title = name || "";
    if (title.includes("هایگلاس") || title.includes("پلی")) return "glossy";
    if (title.includes("خام")) return "raw";
    if (
      title.includes("رنگی") ||
      title.includes("سفید") ||
      title.includes("ملامینه")
    )
      return "colored";
    return "other";
  };

  const formatPrice = (value: number) => {
    if (!value || value <= 0) return "ناموجود";
    return `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;
  };

  const summaryCards = useMemo(() => {
    const groups: Record<string, number[]> = {
      raw: [],
      colored: [],
      glossy: [],
    };

    allRowsWithCategory.forEach((row) => {
      const key = getTypeKey(row.categoryName);
      if (groups[key]) {
        groups[key].push(row.unitPrice);
      }
    });

    const getMin = (values: number[]) => {
      const filtered = values.filter((v) => v > 0);
      return filtered.length > 0 ? Math.min(...filtered) : 0;
    };

    return [
      {
        id: "raw",
        title: "MDF خام",
        value: getMin(groups.raw),
      },
      {
        id: "colored",
        title: "MDF رنگی/سفید",
        value: getMin(groups.colored),
      },
      {
        id: "glossy",
        title: "هایگلاس/پلی‌گلس",
        value: getMin(groups.glossy),
      },
    ];
  }, [allRowsWithCategory]);

  const thicknessOptions = useMemo(() => {
    const values = Array.from(
      new Set(allRowsWithCategory.map((row) => row.thickness))
    ).sort((a, b) => a - b);
    return values;
  }, [allRowsWithCategory]);

  const brandOptions = useMemo(() => {
    return Array.from(
      new Set(allRowsWithCategory.map((row) => row.factory).filter(Boolean))
    );
  }, [allRowsWithCategory]);

  const typeOptions = useMemo(() => {
    const base = [
      { value: "all", label: "همه" },
      { value: "raw", label: "خام" },
      { value: "colored", label: "رنگی/سفید" },
      { value: "glossy", label: "هایگلاس/پلی‌گلس" },
      { value: "other", label: "سایر" },
    ];
    const available = new Set(
      allRowsWithCategory.map((row) => getTypeKey(row.categoryName))
    );
    return base.filter((item) => item.value === "all" || available.has(item.value));
  }, [allRowsWithCategory]);

  const [quickType, setQuickType] = useState("all");
  const [quickThickness, setQuickThickness] = useState("all");
  const [quickBrand, setQuickBrand] = useState("all");

  const quickMatches = useMemo(() => {
    return allRowsWithCategory.filter((row) => {
      const typeMatch =
        quickType === "all" || getTypeKey(row.categoryName) === quickType;
      const thicknessMatch =
        quickThickness === "all" ||
        row.thickness === Number(quickThickness);
      const brandMatch = quickBrand === "all" || row.factory === quickBrand;
      return typeMatch && thicknessMatch && brandMatch;
    });
  }, [allRowsWithCategory, quickType, quickThickness, quickBrand]);

  const quickMinPrice = useMemo(() => {
    const values = quickMatches.map((row) => row.unitPrice).filter((v) => v > 0);
    return values.length > 0 ? Math.min(...values) : 0;
  }, [quickMatches]);

  const brandStats = useMemo(() => {
    const map = new Map<
      string,
      { min: number; max: number; count: number }
    >();

    allRowsWithCategory.forEach((row) => {
      if (!row.factory) return;
      const current = map.get(row.factory) || {
        min: row.unitPrice || 0,
        max: row.unitPrice || 0,
        count: 0,
      };
      const price = row.unitPrice || 0;
      if (price > 0) {
        current.min = current.min === 0 ? price : Math.min(current.min, price);
        current.max = Math.max(current.max, price);
      }
      current.count += 1;
      map.set(row.factory, current);
    });

    return Array.from(map.entries())
      .map(([name, stats]) => ({
        name,
        ...stats,
      }))
      .sort((a, b) => a.min - b.min)
      .slice(0, 8);
  }, [allRowsWithCategory]);

  const lastUpdate =
    siteContent.price_update_date ||
    siteContent.price_last_update ||
    new Date().toLocaleDateString("fa-IR");

  const showPriceSummary = siteContent.show_price_summary !== "0";
  const showBrandComparison = siteContent.show_brand_comparison !== "0";
  const showThicknessGuide = siteContent.show_thickness_guide !== "0";
  const showMaterialSelector = siteContent.show_material_selector !== "0";

  const handleFilterChange = (filters: any) => {
    if (!filters || Object.keys(filters).length === 0) {
      setFilteredPriceTables(allPriceTables);
      return;
    }

    // Deep clone to avoid mutating state
    let filtered = allPriceTables.map((cat) => ({
      ...cat,
      products: [...cat.products],
    }));

    // 1. Filter by Category (Type)
    if (filters.type && filters.type !== "") {
      // Assuming filters.type matches category name or id
      // Since we don't have exact mapping, we might need loose matching or just skip if not applicable
      // For now, let's assume 'type' maps to category name partially
      // Or better, let's filter categories that match the type
      // But PriceFilter options are hardcoded (white, raw, etc).
      // We'll try to match category name.
      const typeKeyword =
        filters.type === "white"
          ? "سفید"
          : filters.type === "raw"
          ? "خام"
          : filters.type === "scratch"
          ? "ضدخش"
          : filters.type === "moisture"
          ? "ضد رطوبت"
          : "";

      if (typeKeyword) {
        filtered = filtered.filter((cat) => cat.name.includes(typeKeyword));
      }
    }

    // 2. Filter products within categories by Thickness
    if (filters.thickness && filters.thickness !== "") {
      const thickVal = parseFloat(filters.thickness);
      filtered.forEach((cat) => {
        cat.products = cat.products.filter((p) => p.thickness === thickVal);
      });
    }

    // 3. Filter products within categories by Size
    if (filters.size && filters.size !== "") {
      filtered.forEach((cat) => {
        cat.products = cat.products.filter(
          (p) => p.dimensions === filters.size
        );
      });
    }

    // Remove empty categories
    filtered = filtered.filter((cat) => cat.products.length > 0);

    setFilteredPriceTables(filtered);
  };

  return (
    <Container className="pt-8">
      {/* بنر بالای صفحه */}
      <PriceBanner siteContent={siteContent} client:load />

      {showPriceSummary && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaryCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-gray-100 rounded-button p-5 shadow-sm"
            >
              <div className="text-sm text-gray-500 mb-2">{card.title}</div>
              <div className="text-xl font-bold text-gray-900">
                {card.value > 0 ? `از ${formatPrice(card.value)}` : "ناموجود"}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-button p-4">
        <div className="text-sm text-gray-700">
          آخرین بروزرسانی قیمت‌ها: {lastUpdate}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteContent.contact_page_phone || siteContent.phone}`}
            className="px-4 py-2 rounded-button bg-brand-primary text-white font-bold"
          >
            تماس برای قیمت روز
          </a>
          <a
            href={siteContent.whatsapp_link || "#"}
            target="_blank"
            className="px-4 py-2 rounded-button bg-green-600 text-white font-bold"
          >
            واتساپ
          </a>
        </div>
      </div>

      {showMaterialSelector && (
        <div className="mt-8 bg-white border border-gray-100 rounded-button p-5">
          <div className="text-lg font-bold text-gray-900 mb-4">
            انتخاب سریع ورق
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">نوع ورق</label>
              <select
                className="w-full bg-gray-100 border border-transparent rounded-button py-2 px-3"
                value={quickType}
                onChange={(e) => setQuickType(e.target.value)}
              >
                {typeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">ضخامت</label>
              <select
                className="w-full bg-gray-100 border border-transparent rounded-button py-2 px-3"
                value={quickThickness}
                onChange={(e) => setQuickThickness(e.target.value)}
              >
                <option value="all">همه</option>
                {thicknessOptions.map((thickness) => (
                  <option key={thickness} value={thickness}>
                    {thickness} میلی‌متر
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">برند</label>
              <select
                className="w-full bg-gray-100 border border-transparent rounded-button py-2 px-3"
                value={quickBrand}
                onChange={(e) => setQuickBrand(e.target.value)}
              >
                <option value="all">همه</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              {quickMatches.length > 0
                ? `${quickMatches.length} گزینه پیدا شد`
                : "گزینه‌ای پیدا نشد"}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {quickMinPrice > 0 ? `حداقل قیمت: ${formatPrice(quickMinPrice)}` : ""}
            </div>
          </div>
        </div>
      )}

      {showBrandComparison && brandStats.length > 0 && (
        <div className="mt-8">
          <div className="text-lg font-bold text-gray-900 mb-4">
            مقایسه سریع برندها
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brandStats.map((brand) => (
              <div
                key={brand.name}
                className="bg-white border border-gray-100 rounded-button p-4"
              >
                <div className="text-sm text-gray-500 mb-2">{brand.name}</div>
                <div className="text-base font-bold text-gray-900">
                  {brand.min > 0 && brand.max > 0
                    ? `${formatPrice(brand.min)} تا ${formatPrice(brand.max)}`
                    : "ناموجود"}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {brand.count} گزینه
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showThicknessGuide && (
        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-button p-5">
          <div className="text-lg font-bold text-gray-900 mb-4">
            راهنمای انتخاب ضخامت
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="bg-white rounded-button p-4 border border-gray-100">
              ۸ تا ۱۶ میلی‌متر مناسب کابینت و بدنه‌های سبک
            </div>
            <div className="bg-white rounded-button p-4 border border-gray-100">
              ۱۶ تا ۱۸ میلی‌متر مناسب اکثر پروژه‌های MDF
            </div>
            <div className="bg-white rounded-button p-4 border border-gray-100">
              ۲۵ میلی‌متر مناسب صفحات سنگین و مقاوم
            </div>
          </div>
        </div>
      )}

      {/* فیلتر قیمت */}
      <PriceFilter
        siteContent={siteContent}
        onFilterChange={handleFilterChange}
        client:load
      />

      {/* جداول قیمت */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {siteContent.price_table_title || "جدول قیمت‌ها"}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {siteContent.price_table_subtitle ||
            "قیمت‌ها برای هر متر مربع محاسبه شده‌اند"}
        </p>

        {/* جداول قیمت داینامیک */}
        {priceTables && priceTables.length > 0 && (
          <div className="mb-8">
            {priceTables.map((table, index) => (
              <DynamicPriceTable
                key={table.id}
                table={table}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        )}

        {filteredPriceTables.length > 0 ? (
          filteredPriceTables.map((category, index) => (
            <PriceTable
              key={category.id}
              siteContent={siteContent}
              category={category}
              defaultOpen={index === 0}
              client:load
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-button">
            محصولی با این مشخصات یافت نشد.
          </div>
        )}
      </div>

      {/* کارت‌های تخفیف */}
      <DiscountCards siteContent={siteContent} client:load />

      {/* ویژگی‌ها */}
      <TableFeatures siteContent={siteContent} client:load />

      {/* توضیحات قیمت */}
      <PriceNotes siteContent={siteContent} client:load />
    </Container>
  );
}
