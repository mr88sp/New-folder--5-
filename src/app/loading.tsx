/**
 * کامپوننت Loading - صفحه بارگذاری
 * نمایش داده می‌شود وقتی صفحات در حال لود هستند
 */
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        {/* اسپینر لودینگ */}
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        
        {/* متن لودینگ */}
        <p className="mt-4 text-gray-600 font-medium">
          در حال بارگذاری...
        </p>
        
        <p className="mt-2 text-sm text-gray-500">
          لطفاً چند لحظه صبر کنید
        </p>
      </div>
    </div>
  );
}