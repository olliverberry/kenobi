'use client';

import { LDContext, LDFlagSet, LDProvider } from 'launchdarkly-react-client-sdk';
import { ReactNode } from 'react';

interface LaunchDarklyProviderProps {
  children: ReactNode;
  flags: LDFlagSet;
  userContext: LDContext | undefined;
}

export default function LaunchDarklyProvider({ 
  children, 
  flags, 
  userContext
}: LaunchDarklyProviderProps) {
  console.log('[LaunchDarklyProvider] Rendering with context:', JSON.stringify(userContext, null, 2));

  return (
    <LDProvider
      clientSideID={process.env.NEXT_PUBLIC_LD_CLIENT_SDK_ID!}
      context={userContext}
      options={{
        bootstrap: flags,
        streaming: true, // Enable streaming for real-time updates
      }}
      timeout={5}
    >
      {children}
    </LDProvider>
  );
}