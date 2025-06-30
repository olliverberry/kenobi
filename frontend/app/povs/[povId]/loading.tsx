import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>All POVs</span>
          </Link>
          <div className="ml-6 flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse mt-1"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Loading Content */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <div className="text-lg font-medium">Loading POV Dashboard...</div>
              <div className="text-sm text-muted-foreground">Please wait while we fetch the data</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 