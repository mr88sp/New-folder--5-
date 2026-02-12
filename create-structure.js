const fs = require("fs");
const path = require("path");

const projectStructure = {
  // ============ پیکربندی پروژه ============
  ".vscode": {
    "settings.json": ""
  },
  
  // ============ فایل‌های ریشه ============
  ".env.local": "",
  ".env.production": "",
  ".gitignore": "",
  "package.json": "",
  "tsconfig.json": "",
  "tailwind.config.ts": "",
  "postcss.config.js": "",
  "next.config.js": "",
  "README.md": "",

  // ============ سورس اصلی ============
  "src": {
    // ======== اپلیکیشن (صفحات) ========
    "app": {
      // لایه‌های اصلی
      "layout.tsx": "",
      "page.tsx": "", // صفحه اصلی (index.html)
      "error.tsx": "",
      "loading.tsx": "",
      "not-found.tsx": "",
      "global-error.tsx": "",
      
      // ===== محصولات =====
      "products": {
        "page.tsx": "", // لیست محصولات (products.html)
        "loading.tsx": "",
        "[id]": {
          "page.tsx": "" // جزئیات محصول (جداگانه)
        }
      },
      
      // ===== استعلام قیمت =====
      "price": {
        "page.tsx": "" // صفحه قیمت‌ها (price.html)
      },
      
      // ===== رنگ‌بندی MDF =====
      "categories": { // تغییر نام از services → categories
        "page.tsx": "" // رنگ‌بندی MDF (categories.html)
      },
      
      // ===== پروژه‌ها =====
      "projects": { // تغییر نام از gallery → projects
        "page.tsx": "" // پروژه‌ها (project.html - جدید)
      },
      
      // ===== درباره ما =====
      "about": {
        "page.tsx": "" // درباره ما (about.html)
      },
      
      // ===== تماس =====
      "contact": {
        "page.tsx": "" // تماس (contact.html)
      },
      
      // ===== API Routes (برای پنل مدیریت) =====
      "api": {
        "products": {
          "route.ts": "",
          "[id]": {
            "route.ts": ""
          }
        },
        "prices": {
          "route.ts": ""
        },
        "colors": {
          "route.ts": ""
        },
        "about": {
          "route.ts": ""
        },
        "contact": {
          "route.ts": ""
        },
        "site": {
          "route.ts": ""
        }
      }
    },

    // ======== کامپوننت‌ها ========
    "components": {
      // کامپوننت‌های مشترک
      "common": {
        "Container.tsx": "",
        "Section.tsx": "",
        "Grid.tsx": ""
      },
      
      // لایه‌بندی
      "layout": {
        "Header.tsx": "",
        "Footer.tsx": "",
        "Navbar.tsx": "",
        "NavMenu.tsx": "",
        "MobileMenu.tsx": "",
        "Breadcrumb.tsx": ""
      },
      
      // کامپوننت‌های UI
      "ui": {
        "Button.tsx": "",
        "Card.tsx": "",
        "Modal.tsx": "",
        "Badge.tsx": "",
        "Tabs.tsx": "",
        "Accordion.tsx": "",
        "Skeleton.tsx": "",
        "LoadingSpinner.tsx": "",
        "WhatsAppButton.tsx": ""
      },
      
      // صفحه اصلی
      "home": {
        "HeroSection.tsx": "",
        "HeroFeatures.tsx": "",
        "WhyMDFSection.tsx": "",
        "FeaturedProducts.tsx": ""
      },
      
      // محصولات
      "products": {
        "ProductGrid.tsx": "",
        "ProductCard.tsx": "",
        "ProductDetail.tsx": "",
        "ProductImageGallery.tsx": "",
        "ProductFilters.tsx": "",
        "ProductSearch.tsx": "",
        "SortBar.tsx": "",
        "RelatedProducts.tsx": ""
      },
      
      // قیمت‌ها
      "price": {
        "PriceBanner.tsx": "",
        "PriceFilter.tsx": "",
        "PriceTable.tsx": "",
        "PriceRow.tsx": "",
        "DiscountCards.tsx": "",
        "PriceNotes.tsx": "",
        "TableFeatures.tsx": ""
      },
      
      // رنگ‌بندی MDF
      "categories": { // تغییر نام از services → categories
        "ColorSearch.tsx": "",
        "ColorFilters.tsx": "",
        "ColorsGrid.tsx": "",
        "ColorCard.tsx": "",
        "PopularColors.tsx": "",
        "ColorPalettes.tsx": "",
        "ColorModal.tsx": "",
        "ColorSpectrum.tsx": ""
      },
      
      // پروژه‌ها
      "projects": { // بخش جدید
        "ProjectsGrid.tsx": "",
        "ProjectCard.tsx": "",
        "ProjectCategories.tsx": "",
        "ProjectLightbox.tsx": ""
      },
      
      // درباره ما
      "about": {
        "AboutHeader.tsx": "",
        "HistoryTimeline.tsx": "",
        "ValuesGrid.tsx": "",
        "TeamGrid.tsx": "",
        "StatsSection.tsx": "",
        "CertificatesSlider.tsx": "",
        "ManagementContact.tsx": ""
      },
      
      // تماس
      "contact": {
        "ContactCards.tsx": "",
        "WorkingHours.tsx": "",
        "MapSection.tsx": "",
        "DepartmentsGrid.tsx": "",
        "SocialLinks.tsx": "",
        "FAQAccordion.tsx": "",
        "EmergencyBanner.tsx": ""
      },
      
      // بخش‌های ویژه
      "sections": {
        "Newsletter.tsx": "",
        "QuickContact.tsx": ""
      }
    },

    // ======== هوک‌های سفارشی ========
    "hooks": {
      "useProducts.ts": "",
      "usePrices.ts": "",
      "useColors.ts": "",
      "useFilter.ts": "",
      "useWhatsApp.ts": "",
      "useScrollAnimation.ts": "",
      "useLocalStorage.ts": ""
    },

    // ======== سرویس‌ها ========
    "services": {
      "productService.ts": "",
      "priceService.ts": "",
      "colorService.ts": "",
      "aboutService.ts": "",
      "contactService.ts": "",
      "siteService.ts": ""
    },

    // ======== تایپ‌ها ========
    "types": {
      "index.ts": "",
      "product.ts": "",
      "price.ts": "",
      "color.ts": "",
      "about.ts": "",
      "contact.ts": "",
      "site.ts": ""
    },

    // ======== دیتا (JSON) ========
    "data": {
      // تنظیمات سایت
      "site.json": "",
      
      // محصولات
      "products": {
        "products.json": "",
        "categories.json": "",
        "brands.json": "",
        "thicknesses.json": "",
        "dimensions.json": ""
      },
      
      // قیمت‌ها
      "prices": {
        "price-tables.json": "",
        "discounts.json": ""
      },
      
      // رنگ‌ها
      "colors": {
        "colors.json": "",
        "color-families.json": "",
        "surface-types.json": "",
        "popular-colors.json": "",
        "palettes.json": ""
      },
      
      // درباره ما
      "about": {
        "history.json": "",
        "values.json": "",
        "team.json": "",
        "stats.json": "",
        "certificates.json": ""
      },
      
      // تماس
      "contact": {
        "contact.json": "",
        "offices.json": "",
        "working-hours.json": "",
        "departments.json": "",
        "social.json": "",
        "faq.json": ""
      }
    },

    // ======== ثابت‌ها ========
    "constants": {
      "site.constants.ts": "",
      "navigation.constants.ts": "",
      "colors.constants.ts": ""
    },

    // ======== ابزارها ========
    "utils": {
      "format.util.ts": "",
      "seo.util.ts": "",
      "animation.util.ts": "",
      "whatsapp.util.ts": ""
    },

    // ======== استایل ========
    "styles": {
      "globals.css": ""
    },

    // ======== پراوایدرها ========
    "providers": {
      "ThemeProvider.tsx": ""
    },

    // ======== ابزارهای دیتا ========
    "lib": {
      "data-utils.ts": ""
    }
  },

  // ============ فایل‌های عمومی ============
  "public": {
    "favicon.ico": "",
    "robots.txt": "",
    "sitemap.xml": "",
    
    "images": {
      "logo": {
        "logo.svg": "",
        "logo-dark.svg": ""
      },
      "products": {},
      "projects": {},
      "team": {},
      "about": {},
      "hero": {},
      "icons": {}
    }
  }
};

// ============ تابع ایجاد ساختار ============
function createStructure(base, structure) {
  Object.entries(structure).forEach(([name, value]) => {
    const fullPath = path.join(base, name);

    if (typeof value === "string") {
      // فایل خالی
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, "");
      }
      
    } else if (Array.isArray(value)) {
      // پوشه با فایل‌های خالی
      fs.mkdirSync(fullPath, { recursive: true });
      value.forEach((file) => {
        const filePath = path.join(fullPath, file);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, "");
        }
      });

    } else if (typeof value === "object") {
      // پوشه با زیرساختار
      fs.mkdirSync(fullPath, { recursive: true });
      createStructure(fullPath, value);
    }
  });
}

// ============ اجرا ============
console.log("🚀 در حال ایجاد پروژه Soheili Wood...");
createStructure(process.cwd(), projectStructure);
console.log("✅ ساختار پروژه با موفقیت ایجاد شد!");
console.log("📁 مسیر:", process.cwd());