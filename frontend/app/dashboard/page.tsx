'use client';

import { AlertTriangle, ExternalLink, Building2, Database } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Header from '@/components/header';
import { usePOVs } from '@/hooks/use-povs';

type FilterState = 'all' | 'active' | 'setup';

export default function POVOverview() {
  const [selectedFilter, setSelectedFilter] =
    React.useState<FilterState>('active');
  // Fetch POVs from API
  const { povs, loading, error, refetch } = usePOVs({
    autoRefresh: true,
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  // Handle loading state
  if (loading) {
    return (
      <div className='bg-background flex min-h-screen flex-col'>
        <Header povs={[]} />
        <main className='flex-1 p-6'>
          <div className='mx-auto max-w-7xl'>
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <div className='text-lg font-medium'>Loading POVs...</div>
                <div className='text-muted-foreground text-sm'>
                  Please wait while we fetch your data
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className='bg-background flex min-h-screen flex-col'>
        <Header povs={[]} />
        <main className='flex-1 p-6'>
          <div className='mx-auto max-w-7xl'>
            <div className='flex items-center justify-center py-12'>
              <div className='space-y-4 text-center'>
                <AlertTriangle className='mx-auto h-12 w-12 text-red-500' />
                <div>
                  <div className='text-lg font-medium text-red-600'>
                    Error Loading POVs
                  </div>
                  <div className='text-muted-foreground text-sm'>{error}</div>
                </div>
                <Button onClick={() => refetch()} variant='outline'>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'setup':
        return 'secondary';
      case 'completed':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-orange-600';
    return 'text-green-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const activePOVs = povs.filter((pov) => pov.status === 'active');
  const setupPOVs = povs.filter((pov) => pov.status === 'setup');
  const allActivePOVs = [...activePOVs, ...setupPOVs]; // Only active and setup for stats

  // Filter POVs based on selected filter
  const getFilteredPOVs = () => {
    switch (selectedFilter) {
      case 'active':
        return activePOVs;
      case 'setup':
        return setupPOVs;
      case 'all':
        return allActivePOVs;
      default:
        return allActivePOVs;
    }
  };

  const filteredPOVs = getFilteredPOVs();
  const totalFailedScans = activePOVs.reduce(
    (sum, pov) => sum + pov.failedScans,
    0,
  );

  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <Header povs={povs} />

      <main className='flex-1 p-6'>
        <div className='mx-auto max-w-7xl space-y-6'>
          {/* Overview Stats */}
          <div className='grid gap-6 md:grid-cols-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active POVs
                </CardTitle>
                <Building2 className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{activePOVs.length}</div>
                <p className='text-muted-foreground text-xs'>
                  {setupPOVs.length} in setup
                </p>
              </CardContent>
            </Card>

            <Card>
              <Link href='/dashboard/failed-scans'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Failed Scans
                  </CardTitle>
                  <AlertTriangle className='text-destructive h-4 w-4' />
                </CardHeader>
                <CardContent>
                  <div className='text-destructive text-2xl font-bold'>
                    {totalFailedScans}
                  </div>
                  <p className='text-muted-foreground text-xs'>
                    Requiring attention
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Repositories
                </CardTitle>
                <Database className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {activePOVs.reduce(
                    (sum, pov) => sum + pov.repositoriesScanned,
                    0,
                  )}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Being scanned across active POVs
                </p>
              </CardContent>
            </Card>
          </div>

          {/* POV Cards */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold'>My POVs</h2>
              <Select
                value={selectedFilter}
                onValueChange={(value: FilterState) => setSelectedFilter(value)}
              >
                <SelectTrigger className='w-48'>
                  <SelectValue>
                    {selectedFilter === 'active' &&
                      `Active POVs (${activePOVs.length})`}
                    {selectedFilter === 'setup' &&
                      `Setup POVs (${setupPOVs.length})`}
                    {selectedFilter === 'all' &&
                      `All POVs (${allActivePOVs.length})`}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>
                    Active POVs ({activePOVs.length})
                  </SelectItem>
                  <SelectItem value='setup'>
                    Setup POVs ({setupPOVs.length})
                  </SelectItem>
                  <SelectItem value='all'>
                    All POVs ({allActivePOVs.length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* POV Cards Grid */}
            {filteredPOVs.length > 0 ? (
              <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
                {filteredPOVs.map((pov) => (
                  <Card
                    key={pov.id}
                    className='transition-shadow hover:shadow-md'
                  >
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div className='space-y-1'>
                          <CardTitle className='text-lg'>
                            {pov.prospectName}
                          </CardTitle>
                          <CardDescription>
                            Sales Owner: {pov.salesOwner} •{' '}
                            {formatDate(pov.startDate)} -{' '}
                            {formatDate(pov.endDate)}
                          </CardDescription>
                        </div>
                        <Badge variant={getStatusColor(pov.status)}>
                          {pov.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      {/* Key Metrics */}
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                          <div className='text-muted-foreground text-sm'>
                            Contributors
                          </div>
                          <div className='flex items-baseline space-x-1'>
                            <span className='text-xl font-bold'>
                              {pov.currentContributors}
                            </span>
                            <span className='text-muted-foreground text-sm'>
                              / {pov.contractSize}
                            </span>
                          </div>
                          {pov.status === 'active' && (
                            <div
                              className={`text-xs font-medium ${getUtilizationColor(pov.utilizationPercentage)}`}
                            >
                              {pov.utilizationPercentage.toFixed(1)}% utilized
                            </div>
                          )}
                          {pov.status === 'setup' && (
                            <div className='text-muted-foreground text-xs'>
                              Setup in progress
                            </div>
                          )}
                        </div>

                        <div className='space-y-1'>
                          <div className='text-muted-foreground text-sm'>
                            Repository Coverage
                          </div>
                          <div className='flex items-baseline space-x-1'>
                            <span className='text-xl font-bold'>
                              {pov.repositoriesScanned}
                            </span>
                            <span className='text-muted-foreground text-sm'>
                              / {pov.totalRepositories}
                            </span>
                          </div>
                          {pov.totalRepositories > 0 && (
                            <Progress
                              value={
                                (pov.repositoriesScanned /
                                  pov.totalRepositories) *
                                100
                              }
                              className='h-1'
                            />
                          )}
                          {pov.totalRepositories === 0 && (
                            <div className='text-muted-foreground text-xs'>
                              Repositories not configured
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Failed Scans Alert */}
                      {pov.failedScans > 0 && (
                        <div className='flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 p-2'>
                          <AlertTriangle className='h-4 w-4 text-red-600' />
                          <span className='text-sm text-red-800'>
                            {pov.failedScans} failed scan
                            {pov.failedScans !== 1 ? 's' : ''} need attention
                          </span>
                        </div>
                      )}

                      {/* Deployments */}
                      {pov.deployments.length > 0 && (
                        <div className='space-y-2'>
                          <div className='text-sm font-medium'>
                            Semgrep Deployments:
                          </div>
                          <div className='flex flex-wrap gap-2'>
                            {pov.deployments.map((deployment, index) => (
                              <a
                                key={index}
                                href={`${deployment.url}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-block transition-opacity hover:opacity-80'
                              >
                                <Badge variant='outline' className='text-xs'>
                                  {deployment.name}
                                </Badge>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Setup Status for Setup POVs */}
                      {pov.status === 'setup' && (
                        <div className='rounded-md border border-blue-200 bg-blue-50 p-3'>
                          <div className='text-sm text-blue-800'>
                            POV setup in progress. Configure repositories and
                            deployments to begin scanning.
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className='flex items-center justify-between border-t pt-2'>
                        <div className='text-muted-foreground text-xs'>
                          {pov.lastActivity
                            ? `Last activity: ${new Date(pov.lastActivity).toLocaleDateString()}`
                            : 'No activity yet'}
                        </div>
                        <div className='flex space-x-2'>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button 
                                  variant='outline' 
                                  size='sm' 
                                  disabled
                                  className="cursor-not-allowed opacity-50"
                                >
                                  <ExternalLink className='mr-1 h-3 w-3' />
                                  Salesforce
                                </Button>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Salesforce integration coming soon</p>
                            </TooltipContent>
                          </Tooltip>
                          <Button size='sm' asChild>
                            <Link href={`/dashboard/povs/${pov.id}`}>
                              {pov.status === 'setup'
                                ? 'Configure'
                                : 'View Dashboard'}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='space-y-4 py-12 text-center'>
                <div className='text-muted-foreground'>
                  No {selectedFilter === 'all' ? '' : selectedFilter} POVs
                  found.
                </div>
                {povs.length > 0 && filteredPOVs.length === 0 && (
                  <div className='space-y-2'>
                    <div className='text-muted-foreground text-sm'>
                      You have {povs.length} POV{povs.length !== 1 ? 's' : ''}{' '}
                      total.
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setSelectedFilter('all')}
                    >
                      Show All POVs
                    </Button>
                  </div>
                )}
                {povs.length === 0 && (
                  <div className='text-muted-foreground text-sm'>
                    No POVs have been created yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
