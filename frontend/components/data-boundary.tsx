'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataBoundaryProps<T = unknown> {
  loading?: boolean;
  error?: string | null;
  data?: T;
  children: React.ReactNode;
  onRetry?: () => void;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export function DataBoundary<T = unknown>({
  loading,
  error,
  data,
  children,
  onRetry,
  loadingComponent,
  errorComponent,
}: DataBoundaryProps<T>) {
  if (loading && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    return (
      <div className='flex items-center justify-center py-12'>
        <div className='space-y-4 text-center'>
          <AlertTriangle className='mx-auto h-12 w-12 text-red-500' />
          <div>
            <div className='text-lg font-medium text-red-600'>
              Error Loading Data
            </div>
            <div className='text-muted-foreground text-sm'>{error}</div>
          </div>
          {onRetry && (
            <Button onClick={onRetry} variant='outline'>
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!data && !loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-center'>
          <div className='text-muted-foreground text-lg font-medium'>
            No data found
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
