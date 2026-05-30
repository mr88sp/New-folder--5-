import React from 'react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, idx) => start + idx);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        className="px-3 py-2 rounded-button border border-gray-200 text-gray-600 hover:text-brand-primary hover:border-brand-primary transition-colors disabled:opacity-40"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        قبلی
      </button>
      {start > 1 && (
        <>
          <button
            className="px-3 py-2 rounded-button border border-gray-200 text-gray-600 hover:text-brand-primary hover:border-brand-primary transition-colors"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="text-gray-400">…</span>}
        </>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-2 rounded-button border transition-colors ${
            page === currentPage
              ? "border-brand-primary bg-brand-primary text-white"
              : "border-gray-200 text-gray-600 hover:text-brand-primary hover:border-brand-primary"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-gray-400">…</span>}
          <button
            className="px-3 py-2 rounded-button border border-gray-200 text-gray-600 hover:text-brand-primary hover:border-brand-primary transition-colors"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="px-3 py-2 rounded-button border border-gray-200 text-gray-600 hover:text-brand-primary hover:border-brand-primary transition-colors disabled:opacity-40"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        بعدی
      </button>
    </div>
  );
};

export default ProductPagination;
