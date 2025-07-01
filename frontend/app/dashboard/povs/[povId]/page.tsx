'use client';

import {
  AlertTriangle,
  GitBranch,
  Shield,
  TrendingUp,
  Users,
  Database,
  Code,
  ArrowLeft,
  Building2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { usePOV } from '@/hooks/use-povs';
import { DataBoundary } from '@/components/data-boundary';
import { POVData } from '@/lib/api-client';

export default function POVDashboard() {
  const params = useParams();
  const povId = params.povId as string;

  const { pov, loading, error, refetch } = usePOV(povId);

  return (
    <DataBoundary loading={loading} error={error} data={pov} onRetry={refetch}>
      <POVDashboardContent pov={pov} />
    </DataBoundary>
  );
}

function POVDashboardContent({ pov }: { pov: POVData | null }) {
  if (!pov) return null;

  const activeContributors = 347;
  const contractLimit = pov?.contractSize ?? 0;
  const utilizationPercentage = (activeContributors / contractLimit) * 100;
  const remainingSeats = contractLimit - activeContributors;

  const repositoryStats = {
    scanned: 89,
    total: 120,
    percentage: (89 / 120) * 100,
  };

  const failedScans = 3;

  const languageBreakdown = [
    { language: 'JavaScript', linesOfCode: 145230, percentage: 32.1 },
    { language: 'Python', linesOfCode: 98450, percentage: 21.8 },
    { language: 'Java', linesOfCode: 87320, percentage: 19.3 },
    { language: 'TypeScript', linesOfCode: 65890, percentage: 14.6 },
    { language: 'Go', linesOfCode: 34120, percentage: 7.5 },
    { language: 'Other', linesOfCode: 21090, percentage: 4.7 },
  ];

  const totalLinesOfCode = languageBreakdown.reduce(
    (sum, lang) => sum + lang.linesOfCode,
    0,
  );

  const contributorTrend = [
    { month: 'Jan', contributors: 298 },
    { month: 'Feb', contributors: 315 },
    { month: 'Mar', contributors: 332 },
    { month: 'Apr', contributors: 347 },
  ];

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
            <span>All POVs</span>
          </Link>
          <div className='ml-6 flex items-center space-x-2'>
            <Shield className='text-primary h-6 w-6' />
            <div className='flex flex-col'>
              <h1 className='text-lg font-semibold'>{pov?.prospectName}</h1>
              <div className='text-muted-foreground text-xs'>
                POV Dashboard • Sales Owner: {pov?.salesOwner}
              </div>
            </div>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            <div className='flex space-x-2'>
              {pov?.deployments.map(
                (deployment: { name: string; url: string }, index: number) => (
                  <Badge key={index} variant='outline' className='text-xs'>
                    {deployment.name}
                  </Badge>
                ),
              )}
            </div>
            <Button
              variant='outline'
              size='sm'
              className='gap-2 bg-transparent'
              asChild
            >
              <Link href={`/salesforce/${pov?.salesforceOpportunityId}`}>
                <ExternalLink className='h-4 w-4' />
                Salesforce
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className='flex-1 p-6'>
        <div className='mx-auto max-w-7xl space-y-6'>
          {/* POV Status Banner */}
          <Card className='border-blue-200 bg-blue-50'>
            <CardContent className='flex items-center justify-between p-4'>
              <div className='flex items-center space-x-4'>
                <Building2 className='h-5 w-5 text-blue-600' />
                <div>
                  <div className='font-medium'>
                    POV Period:{' '}
                    {pov?.startDate
                      ? new Date(pov.startDate).toLocaleDateString()
                      : 'TBD'}{' '}
                    -{' '}
                    {pov?.endDate
                      ? new Date(pov.endDate).toLocaleDateString()
                      : 'TBD'}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {pov?.endDate
                      ? Math.ceil(
                          (new Date(pov.endDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )
                      : 0}{' '}
                    days remaining
                  </div>
                </div>
              </div>
              <Badge variant='default'>{pov?.status}</Badge>
            </CardContent>
          </Card>

          {/* Hero Metric - Active Contributors */}
          <Card className='border-2'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-2xl'>
                    Active Contributors
                  </CardTitle>
                  <CardDescription>
                    Contributors with commits in the last 90 days
                  </CardDescription>
                </div>
                <TrendingUp className='h-8 w-8 text-green-600' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-baseline space-x-4'>
                  <span className='text-4xl font-bold'>
                    {activeContributors}
                  </span>
                  <span className='text-muted-foreground text-lg'>
                    / {contractLimit} contracted
                  </span>
                  <Badge
                    variant={
                      utilizationPercentage > 90
                        ? 'destructive'
                        : utilizationPercentage > 75
                          ? 'secondary'
                          : 'default'
                    }
                  >
                    {utilizationPercentage.toFixed(1)}% utilized
                  </Badge>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Available Utilization</span>
                    <span>{remainingSeats} seats remaining</span>
                  </div>
                  <Progress value={utilizationPercentage} className='h-2' />
                </div>

                <div className='grid grid-cols-4 gap-4 border-t pt-4'>
                  {contributorTrend.map((item, index) => (
                    <div key={item.month} className='text-center'>
                      <div className='text-muted-foreground text-sm'>
                        {item.month}
                      </div>
                      <div className='text-lg font-semibold'>
                        {item.contributors}
                      </div>
                      {index > 0 && (
                        <div className='text-xs text-green-600'>
                          +
                          {item.contributors -
                            contributorTrend[index - 1].contributors}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {/* Repository Coverage */}
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Repository Coverage
                </CardTitle>
                <Database className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-baseline space-x-2'>
                    <span className='text-2xl font-bold'>
                      {repositoryStats.scanned}
                    </span>
                    <span className='text-muted-foreground text-sm'>
                      / {repositoryStats.total} repos
                    </span>
                  </div>
                  <div className='space-y-1'>
                    <Progress
                      value={repositoryStats.percentage}
                      className='h-2'
                    />
                    <p className='text-muted-foreground text-xs'>
                      {repositoryStats.percentage.toFixed(1)}% of repositories
                      scanned
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Failed Scans */}
            <Card className='hover:bg-muted/50 cursor-pointer transition-colors'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Failed Scans
                </CardTitle>
                <AlertTriangle className='text-destructive h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='space-y-1'>
                  <span className='text-destructive text-2xl font-bold'>
                    {failedScans}
                  </span>
                  <p className='text-muted-foreground text-xs'>
                    {failedScans} failed scans
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Total Scans Today */}
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Scans Today
                </CardTitle>
                <GitBranch className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='space-y-1'>
                  <span className='text-2xl font-bold'>42</span>
                  <p className='text-muted-foreground text-xs'>
                    +8% from yesterday
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Language Breakdown */}
          <Card>
            <CardHeader>
              <div className='flex items-center space-x-2'>
                <Code className='h-5 w-5' />
                <CardTitle>Language Breakdown</CardTitle>
                <CardDescription className='ml-2'>
                  Lines of code scanned by language
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='text-muted-foreground mb-4 text-sm'>
                  Total: {totalLinesOfCode.toLocaleString()} lines of code
                  scanned
                </div>
                {languageBreakdown.map((lang) => (
                  <div
                    key={lang.language}
                    className='flex items-center space-x-4'
                  >
                    <div className='w-20 text-sm font-medium'>
                      {lang.language}
                    </div>
                    <div className='flex-1'>
                      <Progress value={lang.percentage} className='h-2' />
                    </div>
                    <div className='text-muted-foreground flex min-w-[120px] items-center justify-end space-x-2 text-sm'>
                      <span>{lang.linesOfCode.toLocaleString()} LOC</span>
                      <span>({lang.percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and configurations for this POV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-3'>
                <Button variant='outline' className='gap-2 bg-transparent'>
                  <Users className='h-4 w-4' />
                  Export Contributors Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
