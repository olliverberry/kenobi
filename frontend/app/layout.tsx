import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LaunchDarklyProvider from "@/components/launch-darkly"
import { getFeatureFlags } from "@/lib/ld-server"
import getUserContext from "@/lib/user-context"
import { LDContext } from "@launchdarkly/node-server-sdk"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Semgrep POV Dashboard",
  description: "Track health metrics and forecast contributors for Semgrep Proof of Value deployments",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userContext = await getUserContext();
  const allFlags = await getFeatureFlags(userContext as LDContext);
  return (  
    <html lang="en">
      <body className={inter.className}>
        <LaunchDarklyProvider flags={allFlags} userContext={userContext}>
          {children}
        </LaunchDarklyProvider>
      </body>
    </html>
  )
}
