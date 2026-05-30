import { cn } from '@/lib/utils';
import { FiLoader } from 'react-icons/fi';

export function LoadingSpinner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex justify-center items-center', className)} {...props}>
      <FiLoader className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
