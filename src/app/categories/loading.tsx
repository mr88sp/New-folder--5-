/**
 * کامپوننت Loading - صفحه رنگ‌بندی MDF
 */
export default function CategoriesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* هدر */}
      <div className="text-center mb-8">
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
      </div>

      {/* جستجو */}
      <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse mb-6"></div>

      {/* فیلترها */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>

      {/* گرید رنگ‌ها */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="h-32 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}