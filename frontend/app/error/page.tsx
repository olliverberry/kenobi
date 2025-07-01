'use client';

import { AlertTriangle, Home, RefreshCw, Bug } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const whimsicalMessages = [
  {
    title: 'Oops! The Force is not strong with this page',
    description:
      "Looks like our droids got lost in the asteroid field. Don't worry, we'll get you back on track!",
    icon: AlertTriangle,
    color: 'text-orange-500',
  },
  {
    title: 'Houston, we have a problem!',
    description:
      "Our servers seem to be taking an unscheduled spacewalk. We're working to bring them back to Earth.",
    icon: Bug,
    color: 'text-red-500',
  },
  {
    title: '404: Page not found in this galaxy',
    description:
      "This page has been abducted by aliens. Or maybe it just doesn't exist. We're not sure which is more concerning.",
    icon: AlertTriangle,
    color: 'text-purple-500',
  },
  {
    title: 'Something went wrong in the matrix',
    description:
      "We've detected an anomaly in our digital realm. Our code monkeys are working overtime to fix it.",
    icon: Bug,
    color: 'text-green-500',
  },
];

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('error') || 'unknown';

  // Select a random whimsical message
  const randomMessage =
    whimsicalMessages[Math.floor(Math.random() * whimsicalMessages.length)];
  const IconComponent = randomMessage.icon;

  const getErrorDetails = (type: string) => {
    switch (type) {
      case 'CredentialsSignin':
        return {
          title: 'Invalid login credentials',
          description:
            "The username or password you entered doesn't match our records. Please try again.",
          suggestion:
            'Double-check your email and password, or try resetting your password.',
        };
      case 'AccessDenied':
        return {
          title: 'Access denied',
          description: "You don't have permission to access this resource.",
          suggestion:
            'Contact your administrator if you believe this is an error.',
        };
      case 'Verification':
        return {
          title: 'Verification failed',
          description:
            "We couldn't verify your account. This might be due to an expired or invalid link.",
          suggestion: 'Try signing in again or contact support for assistance.',
        };
      default:
        return {
          title: randomMessage.title,
          description: randomMessage.description,
          suggestion: 'Try refreshing the page or going back to the home page.',
        };
    }
  };

  const errorDetails = getErrorDetails(errorType);

  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <main className='flex flex-1 items-center justify-center p-6'>
        <div className='w-full max-w-md space-y-6'>
          <div className='space-y-4 text-center'>
            <div className='flex justify-center'>
              <div
                className={`bg-muted rounded-full p-4 ${randomMessage.color}`}
              >
                <IconComponent className='h-12 w-12' />
              </div>
            </div>
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold'>{errorDetails.title}</h1>
              <p className='text-muted-foreground'>
                {errorDetails.description}
              </p>
            </div>
          </div>

          <Card>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-lg'>What can you do?</CardTitle>
              <CardDescription>{errorDetails.suggestion}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-col gap-3'>
                <Button asChild className='w-full'>
                  <Link href='/'>
                    <Home className='mr-2 h-4 w-4' />
                    Go to Home
                  </Link>
                </Button>

                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className='mr-2 h-4 w-4' />
                  Try Again
                </Button>

                <Button variant='outline' asChild className='w-full'>
                  <Link href='/signin'>Back to Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className='text-muted-foreground text-center text-sm'>
            <p>Error Code: {errorType}</p>
            <p className='mt-1'>
              If this problem persists, please contact support
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense
      fallback={
        <div className='bg-background flex min-h-screen flex-col'>
          <main className='flex flex-1 items-center justify-center p-6'>
            <div className='text-center'>
              <div className='text-lg font-medium'>Loading...</div>
            </div>
          </main>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
