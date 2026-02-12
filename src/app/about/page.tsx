'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { FiPhone, FiMail, FiMapPin, FiClock, FiAward, FiUsers, FiPackage, FiTruck } from 'react-icons/fi';

// ============ دیتای استاتیک ============
const historyData = [
  {
    year: 1389,
    title: 'تأسیس فروشگاه',
    description: 'فروشگاه سهیلی با هدف تأمین مواد اولیه صنعت چوب در تهران آغاز به کار کرد.'
  },
  {
    year: 1392,
    title: 'توسعه محصولات',
    description: 'با اضافه شدن محصولات MDF به سبد کالا، خدمات ما به صنعت کابینت‌سازی گسترش یافت.'
  },
  {
    year: 1395,
    title: 'همکاری با تولیدکنندگان بین‌المللی',
    description: 'انعقاد قرارداد با تولیدکنندگان مطرح اروپایی برای واردات MDF با کیفیت.'
  },
  {
    year: 1400,
    title: 'راه‌اندازی فروشگاه اینترنتی',
    description: 'با راه‌اندازی وبسایت، خدمات ما به سراسر کشور گسترش پیدا کرد.'
  },
  {
    year: 1403,
    title: 'تأسیس شعبه دوم',
    description: 'با افتتاح شعبه دوم در اصفهان، پوشش خدمات ما در مرکز کشور کامل شد.'
  }
];

const valuesData = [
  {
    id: 'quality',
    icon: '✅',
    title: 'کیفیت تضمینی',
    description: 'تمامی محصولات ما دارای گواهی کیفیت از تولیدکنندگان معتبر بوده و قبل از ارسال کنترل کیفی می‌شوند.'
  },
  {
    id: 'honesty',
    icon: '🤝',
    title: 'صداقت و شفافیت',
    description: 'قیمت‌ها و مشخصات فنی محصولات را به صورت شفاف و بدون هیچ گونه ابهامی ارائه می‌دهیم.'
  },
  {
    id: 'consulting',
    icon: '💡',
    title: 'مشاوره تخصصی',
    description: 'تیم کارشناسان ما آماده ارائه مشاوره فنی برای انتخاب بهترین محصول متناسب با نیاز شما هستند.'
  },
  {
    id: 'delivery',
    icon: '🚚',
    title: 'تحویل به موقع',
    description: 'با ناوگان حمل اختصاصی، سفارشات شما در کمترین زمان ممکن به مقصد می‌رسند.'
  },
  {
    id: 'support',
    icon: '🛠️',
    title: 'پشتیبانی پس از فروش',
    description: 'پشتیبانی مستمر پس از فروش و پاسخگویی به سوالات فنی مشتریان.'
  },
  {
    id: 'environment',
    icon: '🌱',
    title: 'مسئولیت اجتماعی',
    description: 'حفظ محیط زیست و استفاده از مواد اولیه سازگار با طبیعت در اولویت ماست.'
  }
];

const teamData = [
  {
    id: 1,
    name: 'علی سهیلی',
    position: 'مدیرعامل و بنیان‌گذار',
    bio: 'با بیش از ۲۰ سال تجربه در صنعت چوب و ۱۵ سال مدیریت فروشگاه سهیلی.'
  },
  {
    id: 2,
    name: 'مریم احمدی',
    position: 'مدیر فروش',
    bio: 'کارشناس ارشد مدیریت بازرگانی با ۱۰ سال سابقه در صنعت مواد اولیه ساختمانی.'
  },
  {
    id: 3,
    name: 'رضا محمدی',
    position: 'کارشناس فنی',
    bio: 'مهندس صنایع چوب با ۱۲ سال تجربه در زمینه مشاوره و انتخاب مواد اولیه.'
  },
  {
    id: 4,
    name: 'سارا کریمی',
    position: 'مدیر لجستیک',
    bio: 'مسئولیت حمل و نقل و انبارداری با ۸ سال سابقه در صنعت حمل و نقل.'
  }
];

const statsData = [
  { id: 'experience', number: '۱۵+', label: 'سال تجربه', icon: '🏭' },
  { id: 'customers', number: '۵۰۰۰+', label: 'مشتری راضی', icon: '👥' },
  { id: 'suppliers', number: '۵۰+', label: 'تأمین‌کننده', icon: '🤝' },
  { id: 'products', number: '۱۰۰+', label: 'محصول متنوع', icon: '📦' },
  { id: 'support', number: '۲۴/۷', label: 'پشتیبانی', icon: '🕒' }
];

const certificatesData = [
  {
    id: 'award-1402',
    icon: '🏆',
    title: 'تولیدکننده برتر',
    description: 'جایزه بهترین تأمین‌کننده مواد اولیه ۱۴۰۲'
  },
  {
    id: 'iso-9001',
    icon: '⭐',
    title: 'ISO 9001',
    description: 'گواهی مدیریت کیفیت بین‌المللی'
  },
  {
    id: 'fsc',
    icon: '🌿',
    title: 'FSC',
    description: 'گواهی چوب جنگل‌های پایدار'
  },
  {
    id: 'e1',
    icon: '🏅',
    title: 'کیفیت اروپایی',
    description: 'تأییدیه کیفیت E1 از اتحادیه اروپا'
  },
  {
    id: 'customer-satisfaction',
    icon: '✅',
    title: 'رضایت مشتری',
    description: 'دریافت نشان طلایی رضایت مشتری'
  }
];

/**
 * صفحه درباره ما
 */
export default function AboutPage() {
  return (
    <div className="pb-16">
      <Breadcrumb />
      
      <Container className="pt-8">
        {/* ============ هدر صفحه ============ */}
        <div className="relative bg-gradient-to-r from-brand-primary to-brand-dark rounded-3xl text-white p-8 md:p-12 mb-12 overflow-hidden">
          {/* الگوی پس‌زمینه */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                درباره فروشگاه سهیلی
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                با بیش از ۱۵ سال تجربه در صنعت چوب و MDF، کیفیت و رضایت مشتری اولویت ماست
              </p>
            </motion.div>

            {/* آمار سریع */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <FiAward className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">۱۵+</div>
                <div className="text-sm text-white/80">سال تجربه</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <FiUsers className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">۵۰۰۰+</div>
                <div className="text-sm text-white/80">مشتری راضی</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <FiPackage className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">۱۰۰+</div>
                <div className="text-sm text-white/80">محصول متنوع</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <FiTruck className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">۲۴/۷</div>
                <div className="text-sm text-white/80">پشتیبانی</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============ تاریخچه شرکت ============ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              تاریخچه ما
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              از یک فروشگاه کوچک تا یکی از معتبرترین تأمین‌کنندگان MDF
            </p>
          </div>

          <div className="relative">
            {/* خط عمودی تایملاین */}
            <div className="absolute right-1/2 transform translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand-primary to-brand-secondary hidden md:block"></div>

            <div className="space-y-8 md:space-y-12">
              {historyData.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } items-center gap-6 md:gap-12`}
                >
                  {/* سال */}
                  <div className="flex items-center justify-center w-full md:w-1/2">
                    <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2">
                      <span className="text-xl font-bold">{item.year}</span>
                    </div>
                  </div>

                  {/* محتوا */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* نقطه روی تایملاین */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ============ ارزش‌های ما ============ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ارزش‌های ما
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اصولی که همواره در کارمان دنبال می‌کنیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesData.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============ آمار و ارقام ============ */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-dark rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============ تیم ما ============ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              تیم ما
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              متخصصان با تجربه ما که پشتیبان شما هستند
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
              >
                {/* عکس پروفایل (پلاسهولدر) */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-brand-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* اطلاعات */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-brand-primary font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============ گواهینامه‌ها ============ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              گواهینامه‌ها و افتخارات
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تأییدیه‌های کیفیت و افتخارات کسب‌شده
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h4 className="text-base font-bold text-gray-900 mb-2">
                  {cert.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============ تماس با مدیریت ============ */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* متن */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                تماس مستقیم با مدیریت
              </h2>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                برای مشاوره تخصصی و حل مسائل پیچیده، مستقیماً با مدیریت در ارتباط باشید
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">شماره مستقیم:</p>
                    <a
                      href="tel:02188888888"
                      className="text-xl font-bold hover:underline"
                    >
                      ۰۲۱-۸۸۸۸۸۸۸۸
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">ایمیل مدیریت:</p>
                    <a
                      href="mailto:manager@soheiliwood.ir"
                      className="text-xl font-bold hover:underline"
                    >
                      manager@soheiliwood.ir
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FiClock size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">ساعت تماس:</p>
                    <p className="text-xl font-bold">۹ صبح تا ۵ عصر</p>
                  </div>
                </div>
              </div>
            </div>

            {/* دکمه اقدام */}
            <div className="text-center lg:text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-6xl mb-4">👔</div>
                <h3 className="text-2xl font-bold mb-3">
                  آماده پاسخگویی هستیم
                </h3>
                <p className="text-white/90 mb-6">
                  مدیریت مجموعه شخصاً به درخواست‌های شما رسیدگی می‌کند
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold text-center transition-colors"
                >
                  تماس با مدیریت
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}