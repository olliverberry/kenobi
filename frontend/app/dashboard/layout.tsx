import { auth } from '@/auth';
import LaunchDarklyProvider from '@/components/launch-darkly';
import { launchDarklyServer } from '@/lib/ld-server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect('/signin');
  }
  const { flags, context } = await launchDarklyServer.getInitialContext(
    session!,
  );
  return (
    <LaunchDarklyProvider flags={flags} context={context}>
      {children}
    </LaunchDarklyProvider>
  );
}
