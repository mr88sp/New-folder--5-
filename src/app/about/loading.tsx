/**
 * کامپوننت Loading - صفحه درباره ما
 */
export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* هدر */}
      <div className="text-center mb-12">
        <div className="h-12 w-72 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
      </div>

      {/* تاریخچه */}
      <div className="mb-16">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ارزش‌ها */}
      <div className="mb-16">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}