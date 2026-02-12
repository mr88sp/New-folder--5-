/**
 * کامپوننت Loading - صفحه تماس
 */
export default function ContactLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* هدر */}
      <div className="text-center mb-12">
        <div className="h-12 w-72 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
      </div>

      {/* کارت‌های تماس */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse mb-4"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* فرم تماس */}
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse mt-6 mb-4"></div>
        <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}