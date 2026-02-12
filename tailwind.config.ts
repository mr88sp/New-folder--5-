import type { Config } from 'tailwindcss';

/**
 * تنظیمات Tailwind CSS برای پروژه Soheili Wood
 * منطبق بر استایل‌های HTML قبلی با رنگ‌بندی صنعتی و چوبی
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // ============ پالت رنگی منطبق بر HTML ============
      colors: {
        // رنگ‌های اصلی برند
        brand: {
          primary: '#2c3e50',    // سرمه‌ای تیره - رنگ اصلی
          secondary: '#e67e22',  // نارنجی چوبی - رنگ تاکید
          dark: '#1a2634',       // مشکی مایل به آبی - تیره
          light: '#f8f9fa',      // سفید شکری - روشن
        },
        
        // رنگ‌های چوب و MDF
        wood: {
          50: '#faf6f0',        // چوب خیلی روشن
          100: '#f0e7db',       // چوب روشن
          200: '#e1cfbc',       // چوب کرم
          300: '#d4b996',       // بلوط روشن
          400: '#b08968',       // چوب متوسط
          500: '#8b4513',       // قهوه‌ای چوب - بلوط تیره
          600: '#6b3410',       // چوب تیره
          700: '#5d4037',       // قهوه‌ای شکلاتی
          800: '#3e2723',       // قهوه‌ای شب
          900: '#2c1810',       // قهوه‌ای سوخته
        },
        
        // رنگ‌های خاکستری صنعتی
        industrial: {
          50: '#f9fafb',        // تقریبا سفید
          100: '#f3f4f6',       // خاکستری برفی
          200: '#e5e7eb',       // خاکستری روشن
          300: '#d1d5db',       // خاکستری ملایم
          400: '#90a4ae',       // خاکستری نقره‌ای
          500: '#64748b',       // خاکستری متوسط
          600: '#4a5568',       // خاکستری تیره
          700: '#334155',       // خاکستری زغالی
          800: '#1e293b',       // خاکستری طوفانی
          900: '#0f172a',       // خاکستری نیمه‌شب
        },
        
        // وضعیت‌ها
        status: {
          success: '#28a745',    // سبز - موجود
          warning: '#ffc107',    // زرد - محدود
          error: '#dc3545',      // قرمز - ناموجود
          info: '#17a2b8',       // آبی - اطلاعات
        },
        
        // رنگ‌های طیف MDF
        mdf: {
          white: '#ffffff',      // سفید یخچالی
          cream: '#f8f5f0',      // کرم صدفی
          gray: '#90a4ae',       // خاکستری نقره‌ای
          darkgray: '#455a64',   // خاکستری زغالی
          black: '#212121',      // مشکی
        },
      },
      
      // ============ فونت‌های فارسی ============
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      
      // ============ انیمیشن‌های منطبق بر fade-in ============
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      
      keyframes: {
        // انیمیشن fade-in از کد قدیمی شما
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      
      // ============ سایه‌های منطبق بر HTML ============
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'header': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'button-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      
      // ============ borderRadius منطبق بر HTML ============
      borderRadius: {
        'card': '0.5rem',
        'button': '0.375rem',
        'badge': '9999px',
        'modal': '0.75rem',
      },
      
      // ============ spacing منطبق بر HTML ============
      spacing: {
        'section': '4rem',
        'section-sm': '2rem',
        'card-padding': '1.5rem',
        'container': '1280px',
      },
      
      // ============ container ============
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },
      
      // ============ screens ریسپانسیو ============
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      
      // ============ zIndex ============
      zIndex: {
        'header': '50',
        'modal': '100',
        'overlay': '75',
        'tooltip': '150',
        'toast': '200',
      },
    },
  },
  
  // ============ پلاگین‌ها ============
  plugins: [],
};

export default config;