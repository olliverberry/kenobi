import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const SIGNIN_ERROR_URL = '/error';

export default async function SignInPage() {
  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <main className='flex flex-1 items-center justify-center p-6'>
        <div className='w-full max-w-md space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>Welcome back</h1>
            <p className='text-muted-foreground'>
              Sign in to your account to continue
            </p>
          </div>

          <Card>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-lg'>Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form
                action={async (formData) => {
                  'use server';
                  try {
                    await signIn('credentials', formData);
                  } catch (error) {
                    if (
                      error instanceof Error &&
                      error.message === 'NEXT_REDIRECT'
                    ) {
                      throw error;
                    }

                    if (error instanceof AuthError) {
                      return redirect(
                        `${SIGNIN_ERROR_URL}?error=${error.type}`,
                      );
                    }

                    throw error;
                  }
                }}
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    name='email'
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    name='password'
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    required
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
