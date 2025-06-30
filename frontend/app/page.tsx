"use client"

import { AlertTriangle, ExternalLink, Building2, Database } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import { usePOVs } from "@/hooks/use-povs"

type FilterState = "all" | "active" | "setup"

export default function POVOverview() {
  const [selectedFilter, setSelectedFilter] = React.useState<FilterState>("active")
  // Fetch POVs from API
  const { povs, loading, error, refetch } = usePOVs({
    autoRefresh: true,
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header povs={[]} />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-lg font-medium">Loading POVs...</div>
                <div className="text-sm text-muted-foreground">Please wait while we fetch your data</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header povs={[]} />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
                <div>
                  <div className="text-lg font-medium text-red-600">Error Loading POVs</div>
                  <div className="text-sm text-muted-foreground">{error}</div>
                </div>
                <Button onClick={() => refetch()} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "setup":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "outline"
    }
  }

  const getUtilizationColor = (percentage: number) => {
    if (percentage > 90) return "text-red-600"
    if (percentage > 75) return "text-orange-600"
    return "text-green-600"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const activePOVs = povs.filter((pov) => pov.status === "active")
  const setupPOVs = povs.filter((pov) => pov.status === "setup")
  const allActivePOVs = [...activePOVs, ...setupPOVs] // Only active and setup for stats

  // Filter POVs based on selected filter
  const getFilteredPOVs = () => {
    switch (selectedFilter) {
      case "active":
        return activePOVs
      case "setup":
        return setupPOVs
      case "all":
        return allActivePOVs
      default:
        return allActivePOVs
    }
  }

  const filteredPOVs = getFilteredPOVs()
  const totalFailedScans = activePOVs.reduce((sum, pov) => sum + pov.failedScans, 0)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header povs={povs} />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Overview Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active POVs</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activePOVs.length}</div>
                <p className="text-xs text-muted-foreground">{setupPOVs.length} in setup</p>
              </CardContent>
            </Card>

            <Card>
              <Link href="/failed-scans">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Scans</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{totalFailedScans}</div>
                  <p className="text-xs text-muted-foreground">Requiring attention</p>
                </CardContent>
              </Link>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {activePOVs.reduce((sum, pov) => sum + pov.repositoriesScanned, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Being scanned across active POVs</p>
              </CardContent>
            </Card>
          </div>

          {/* POV Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My POVs</h2>
              <Select value={selectedFilter} onValueChange={(value: FilterState) => setSelectedFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue>
                    {selectedFilter === "active" && `Active POVs (${activePOVs.length})`}
                    {selectedFilter === "setup" && `Setup POVs (${setupPOVs.length})`}
                    {selectedFilter === "all" && `All POVs (${allActivePOVs.length})`}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active POVs ({activePOVs.length})</SelectItem>
                  <SelectItem value="setup">Setup POVs ({setupPOVs.length})</SelectItem>
                  <SelectItem value="all">All POVs ({allActivePOVs.length})</SelectItem>
                </SelectContent>
              </Select>
            </div>



            {/* POV Cards Grid */}
            {filteredPOVs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {filteredPOVs.map((pov) => (
                  <Card key={pov.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{pov.prospectName}</CardTitle>
                          <CardDescription>
                            Sales Owner: {pov.salesOwner} • {formatDate(pov.startDate)} - {formatDate(pov.endDate)}
                          </CardDescription>
                        </div>
                        <Badge variant={getStatusColor(pov.status)}>{pov.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Contributors</div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-xl font-bold">{pov.currentContributors}</span>
                            <span className="text-sm text-muted-foreground">/ {pov.contractSize}</span>
                          </div>
                          {pov.status === "active" && (
                            <div className={`text-xs font-medium ${getUtilizationColor(pov.utilizationPercentage)}`}>
                              {pov.utilizationPercentage.toFixed(1)}% utilized
                            </div>
                          )}
                          {pov.status === "setup" && (
                            <div className="text-xs text-muted-foreground">Setup in progress</div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Repository Coverage</div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-xl font-bold">{pov.repositoriesScanned}</span>
                            <span className="text-sm text-muted-foreground">/ {pov.totalRepositories}</span>
                          </div>
                          {pov.totalRepositories > 0 && (
                            <Progress value={(pov.repositoriesScanned / pov.totalRepositories) * 100} className="h-1" />
                          )}
                          {pov.totalRepositories === 0 && (
                            <div className="text-xs text-muted-foreground">Repositories not configured</div>
                          )}
                        </div>
                      </div>

                      {/* Failed Scans Alert */}
                      {pov.failedScans > 0 && (
                        <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-md border border-red-200">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-800">
                            {pov.failedScans} failed scan{pov.failedScans !== 1 ? "s" : ""} need attention
                          </span>
                        </div>
                      )}

                      {/* Deployments */}
                      {pov.deployments.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Semgrep Deployments:</div>
                          <div className="flex flex-wrap gap-2">
                            {pov.deployments.map((deployment, index) => (
                              <a
                                key={index}
                                href={`${deployment.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block hover:opacity-80 transition-opacity"
                              >
                                <Badge variant="outline" className="text-xs">
                                  {deployment.name}
                                </Badge>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Setup Status for Setup POVs */}
                      {pov.status === "setup" && (
                        <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                          <div className="text-sm text-blue-800">
                            POV setup in progress. Configure repositories and deployments to begin scanning.
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-xs text-muted-foreground">
                          {pov.lastActivity
                            ? `Last activity: ${new Date(pov.lastActivity).toLocaleDateString()}`
                            : "No activity yet"}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/salesforce/${pov.salesforceOpportunityId}`}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Salesforce
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/povs/${pov.id}`}>
                              {pov.status === "setup" ? "Configure" : "View Dashboard"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="text-muted-foreground">
                  No {selectedFilter === "all" ? "" : selectedFilter} POVs found.
                </div>
                {povs.length > 0 && filteredPOVs.length === 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      You have {povs.length} POV{povs.length !== 1 ? 's' : ''} total.
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedFilter("all")}
                    >
                      Show All POVs
                    </Button>
                  </div>
                )}
                {povs.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No POVs have been created yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
