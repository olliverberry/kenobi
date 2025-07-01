import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Loading() {
  return (
    <div className='bg-background flex min-h-screen flex-col'>
      {/* Header Skeleton */}
      <header className='border-b bg-white'>
        <div className='flex h-16 items-center px-6'>
          <Link
            href='/'
            className='text-muted-foreground hover:text-foreground flex items-center space-x-2'
          >
            <ArrowLeft className='h-4 w-4' />
            <span>All POVs</span>
          </Link>
          <div className='ml-6 flex items-center space-x-2'>
            <Shield className='text-primary h-6 w-6' />
            <div className='flex flex-col'>
              <div className='h-4 w-48 animate-pulse rounded bg-gray-200'></div>
              <div className='mt-1 h-3 w-32 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </header>

      <main className='flex-1 p-6'>
        <div className='mx-auto max-w-7xl space-y-6'>
          {/* Loading Content */}
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
              <div className='text-lg font-medium'>
                Loading POV Dashboard...
              </div>
              <div className='text-muted-foreground text-sm'>
                Please wait while we fetch the data
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
