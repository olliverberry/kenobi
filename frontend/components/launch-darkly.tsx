'use client';

import {
  LDContext,
  LDFlagSet,
  LDProvider,
} from 'launchdarkly-react-client-sdk';
import { ReactNode } from 'react';

interface LaunchDarklyProviderProps {
  children: ReactNode;
  flags: LDFlagSet;
  context: LDContext;
}

export default function LaunchDarklyProvider({
  children,
  flags,
  context,
}: LaunchDarklyProviderProps) {
  return (
    <LDProvider
      clientSideID={process.env.NEXT_PUBLIC_LD_CLIENT_SDK_ID!}
      context={context}
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
