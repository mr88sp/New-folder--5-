import type { Config } from "tailwindcss";

/**
 * تنظیمات Tailwind CSS برای پروژه Soheili Wood
 * منطبق بر استایل‌های HTML قبلی با رنگ‌بندی صنعتی و چوبی
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{astro,html}",
  ],

  theme: {
    extend: {
      // ============ پالت رنگی جدید (آبی نفتی و تیره) ============
      colors: {
        brand: {
          primary: "#1e3a8a", // Navy Blue (آبی نفتی) - رنگ اصلی
          secondary: "#334155", // Slate (طوسی تیره) - رنگ دوم
          accent: "#0ea5e9", // Sky Blue (آبی آسمانی روشن) - برای دکمه‌ها
          dark: "#020617", // Dark Navy (آبی خیلی تیره/مشکی) - برای متون و هدر
          light: "#f8fafc", // Cool White (سفید یخی) - برای پس‌زمینه
          nature: "#475569", // Slate (طوسی) - جایگزین سبز
        },

        wood: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b", // طوسی آبی
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },

        industrial: {
          50: "#f7f7f7",
          100: "#ececec",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#8f8f8f",
          500: "#5f5f5f",
          600: "#404040",
          700: "#2c2c2c",
          800: "#1c1c1c",
          900: "#121212",
        },

        status: {
          success: "#3fa34d",
          warning: "#e0a800",
          error: "#c0392b",
          info: "#2980b9",
        },

        mdf: {
          white: "#ffffff",
          cream: "#f6f3ec",
          gray: "#7d8b8f",
          darkgray: "#3c4a4f",
          black: "#181818",
        },
      },

      // ============ فونت‌های فارسی رسمی ============
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
        vazir: ["Vazirmatn", "system-ui", "sans-serif"],
      },

      // ============ انیمیشن‌های منطبق بر fade-in ============
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "fade-in-left": "fadeInLeft 0.8s ease-out forwards",
        "fade-in-right": "fadeInRight 0.8s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 3s linear infinite",
      },

      keyframes: {
        // انیمیشن fade-in از کد قدیمی شما
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      // ============ سایه‌های منطبق بر HTML ============
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        header: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        button: "0 2px 4px rgba(0, 0, 0, 0.05)",
        "button-hover": "0 4px 6px rgba(0, 0, 0, 0.1)",
      },

      // ============ borderRadius منطبق بر HTML ============
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button)",
        badge: "9999px",
        modal: "calc(var(--radius-card) * 1.5)",
      },

      // ============ spacing منطبق بر HTML ============
      spacing: {
        section: "4rem",
        "section-sm": "2rem",
        "card-padding": "1.5rem",
        container: "1280px",
      },

      // ============ container ============
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "4rem",
        },
      },

      // ============ screens ریسپانسیو ============
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },

      // ============ zIndex ============
      zIndex: {
        header: "50",
        modal: "100",
        overlay: "75",
        tooltip: "150",
        toast: "200",
      },
    },
  },

  // ============ پلاگین‌ها ============
  plugins: [],
};

export default config;
