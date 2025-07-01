'use client';

import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  GitBranch,
  ExternalLink,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useScans } from '@/hooks/use-scans';

export default function FailedScansPage() {
  const { scans, loading, error, refetch } = useScans({
    autoRefresh: true,
    refreshInterval: 60_000,
  });

  // Filter to only show failed scans (scans with failedAt field)
  const failedScans = scans.filter((scan) => scan.failedAt);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Loading state
  if (loading) {
    return (
      <div className='bg-background flex min-h-screen flex-col'>
        {/* Header */}
        <header className='border-b bg-white'>
          <div className='flex h-16 items-center px-6'>
            <Link
              href='/'
              className='text-muted-foreground hover:text-foreground flex items-center space-x-2'
            >
              <ArrowLeft className='h-4 w-4' />
              <span>Back to Dashboard</span>
            </Link>
            <div className='ml-6 flex items-center space-x-2'>
              <AlertTriangle className='text-destructive h-5 w-5' />
              <h1 className='text-xl font-semibold'>Failed Scans</h1>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6'>
          <div className='mx-auto max-w-7xl'>
            <Card>
              <CardContent className='flex h-64 items-center justify-center'>
                <div className='text-muted-foreground flex items-center space-x-2'>
                  <Loader2 className='h-6 w-6 animate-spin' />
                  <span>Loading failed scans...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='bg-background flex min-h-screen flex-col'>
        {/* Header */}
        <header className='border-b bg-white'>
          <div className='flex h-16 items-center px-6'>
            <Link
              href='/'
              className='text-muted-foreground hover:text-foreground flex items-center space-x-2'
            >
              <ArrowLeft className='h-4 w-4' />
              <span>Back to Dashboard</span>
            </Link>
            <div className='ml-6 flex items-center space-x-2'>
              <AlertTriangle className='text-destructive h-5 w-5' />
              <h1 className='text-xl font-semibold'>Failed Scans</h1>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6'>
          <div className='mx-auto max-w-7xl'>
            <Card>
              <CardContent className='flex h-64 flex-col items-center justify-center space-y-4'>
                <AlertTriangle className='text-destructive h-12 w-12' />
                <div className='space-y-2 text-center'>
                  <h3 className='text-lg font-semibold'>
                    Failed to load scans
                  </h3>
                  <p className='text-muted-foreground'>{error}</p>
                </div>
                <Button onClick={refetch} className='gap-2'>
                  <RefreshCw className='h-4 w-4' />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='bg-background flex min-h-screen flex-col'>
      {/* Header */}
      <header className='border-b bg-white'>
        <div className='flex h-16 items-center px-6'>
          <Link
            href='/'
            className='text-muted-foreground hover:text-foreground flex items-center space-x-2'
          >
            <ArrowLeft className='h-4 w-4' />
            <span>Back to Dashboard</span>
          </Link>
          <div className='ml-6 flex items-center space-x-2'>
            <AlertTriangle className='text-destructive h-5 w-5' />
            <h1 className='text-xl font-semibold'>Failed Scans</h1>
          </div>
        </div>
      </header>

      <main className='flex-1 p-6'>
        <div className='mx-auto max-w-7xl space-y-6'>
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <AlertTriangle className='text-destructive h-5 w-5' />
                Scan Failures Overview
              </CardTitle>
              <CardDescription>
                Recent scan failures requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg border p-4 text-center'>
                  <div className='text-destructive text-2xl font-bold'>
                    {failedScans.length}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    Total Failed Scans
                  </div>
                </div>
                <div className='rounded-lg border p-4 text-center'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {
                      failedScans.filter((scan) => scan.severity === 'high')
                        .length
                    }
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    High Severity
                  </div>
                </div>
                <div className='rounded-lg border p-4 text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {new Set(failedScans.map((scan) => scan.repository)).size}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    Affected Repositories
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Failed Scans Table */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Failed Scan Details</CardTitle>
                  <CardDescription>
                    Detailed information about each failed scan
                  </CardDescription>
                </div>
                <div className='flex gap-2'>
                  <Button
                    onClick={refetch}
                    variant='outline'
                    className='gap-2'
                    disabled={loading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                    />
                    Refresh
                  </Button>
                  <Button variant='outline' className='gap-2 bg-transparent'>
                    <ExternalLink className='h-4 w-4' />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {failedScans.length === 0 ? (
                <div className='py-8 text-center'>
                  <AlertTriangle className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
                  <h3 className='mb-2 text-lg font-semibold'>
                    No failed scans found
                  </h3>
                  <p className='text-muted-foreground'>
                    All scans are currently successful!
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Repository</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Failed At</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Last Success</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {failedScans.map((scan) => (
                      <TableRow key={scan.id}>
                        <TableCell className='font-medium'>
                          {scan.repository}
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-1'>
                            <GitBranch className='h-3 w-3' />
                            {scan.branch}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-1 text-sm'>
                            <Calendar className='h-3 w-3' />
                            {formatDate(scan.failedAt)}
                          </div>
                        </TableCell>
                        <TableCell className='max-w-xs'>
                          <div className='truncate' title={scan.error}>
                            {scan.error}
                          </div>
                        </TableCell>
                        <TableCell className='text-muted-foreground text-sm'>
                          {formatDate(scan.lastSuccess)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
