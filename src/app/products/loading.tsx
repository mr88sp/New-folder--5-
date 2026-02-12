/**
 * کامپوننت Loading - صفحه محصولات
 */
export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* اسکلتون برای هدر */}
      <div className="text-center mb-8">
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
      </div>

      {/* اسکلتون برای جستجو */}
      <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse mb-6"></div>

      {/* اسکلتون برای فیلترها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>

      {/* اسکلتون برای گرید محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-4">
            <div className="h-48 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}