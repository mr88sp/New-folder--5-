/**
 * کامپوننت Loading - صفحه استعلام قیمت
 */
export default function PriceLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* هدر */}
      <div className="text-center mb-8">
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
      </div>

      {/* فیلترها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>

      {/* جداول قیمت */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="bg-white rounded-2xl shadow-lg p-4">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-12 bg-gray-100 rounded animate-pulse mb-2 last:mb-0"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}