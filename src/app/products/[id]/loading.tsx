/**
 * کامپوننت Loading - صفحه جزئیات محصول
 */
export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* اسکلتون برای خرده نان */}
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>

      {/* اسکلتون برای گرید محصول */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* اسکلتون گالری */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="aspect-square bg-gray-200 rounded-xl animate-pulse mb-4"></div>
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* اسکلتون اطلاعات محصول */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-20 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-16 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-24 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-14 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}