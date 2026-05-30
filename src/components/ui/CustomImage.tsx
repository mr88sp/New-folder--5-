'use client';

import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { FiImage } from 'react-icons/fi';

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  // Add any custom props if needed
}

export default function CustomImage({
  src,
  alt,
  className,
  onLoad,
  onError,
  ...props
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
  }, [src]);

  // Timeout for loading
  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      if (isLoading) {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleLoad = (e: any) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: any) => {
    setIsError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  if (isError) {
    return (
      <div 
        className={cn(
          "flex flex-col items-center justify-center bg-gray-100 text-gray-400 h-full w-full absolute inset-0", 
          className
        )}
      >
         <FiImage size={32} className="mb-2" />
         <span className="text-sm font-medium">تصویر یافت نشد</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <Skeleton 
          className={cn(
            "w-full h-full absolute inset-0 z-10", 
            // Remove object-cover etc from skeleton if passed in className, 
            // but keep rounded classes or sizing if relevant.
            // For simplicity, we just apply className to match dimensions/rounding.
            className
          )} 
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500', 
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </>
  );
}
