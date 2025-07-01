import { Injectable } from '@nestjs/common';

@Injectable()
export class PovsService {
  private readonly povs: any[] = [
    {
      id: 'pov-001',
      prospectName: 'Acme Corporation',
      salesforceOpportunityId: '006XX000004C2ZZYA0',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-02-29',
      salesOwner: 'Sarah Johnson',
      contractSize: 500,
      currentContributors: 347,
      utilizationPercentage: 69.4,
      repositoriesScanned: 89,
      totalRepositories: 120,
      failedScans: 3,
      lastActivity: '2024-01-15T14:30:00Z',
      deployments: [
        { name: 'Production Org', url: 'https://semgrep.dev/orgs/acme-prod' },
        { name: 'Development Org', url: 'https://semgrep.dev/orgs/acme-dev' },
      ],
    },
    {
      id: 'pov-002',
      prospectName: 'TechStart Inc',
      salesforceOpportunityId: '006XX000004C3AAYA0',
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      salesOwner: 'Mike Chen',
      contractSize: 200,
      currentContributors: 156,
      utilizationPercentage: 78.0,
      repositoriesScanned: 45,
      totalRepositories: 67,
      failedScans: 8,
      lastActivity: '2024-01-15T16:45:00Z',
      deployments: [
        { name: 'Main Org', url: 'https://semgrep.dev/orgs/techstart-main' },
      ],
    },
    {
      id: 'pov-003',
      prospectName: 'Global Finance Ltd',
      salesforceOpportunityId: '006XX000004C4BBYA0',
      status: 'setup',
      startDate: '2024-01-20',
      endDate: '2024-04-20',
      salesOwner: 'Lisa Rodriguez',
      contractSize: 1000,
      currentContributors: 0,
      utilizationPercentage: 0,
      repositoriesScanned: 0,
      totalRepositories: 0,
      failedScans: 0,
      lastActivity: null,
      deployments: [],
    },
    {
      id: 'pov-004',
      prospectName: 'Enterprise Solutions Co',
      salesforceOpportunityId: '006XX000004C6DDYA0',
      status: 'setup',
      startDate: '2024-01-25',
      endDate: '2024-04-25',
      salesOwner: 'Alex Thompson',
      contractSize: 750,
      currentContributors: 0,
      utilizationPercentage: 0,
      repositoriesScanned: 0,
      totalRepositories: 0,
      failedScans: 0,
      lastActivity: null,
      deployments: [],
    },
    {
      id: 'pov-005',
      prospectName: 'DevTools Co',
      salesforceOpportunityId: '006XX000004C5CCYA0',
      status: 'completed',
      startDate: '2023-11-01',
      endDate: '2023-12-31',
      salesOwner: 'David Park',
      contractSize: 300,
      currentContributors: 287,
      utilizationPercentage: 95.7,
      repositoriesScanned: 156,
      totalRepositories: 156,
      failedScans: 1,
      lastActivity: '2023-12-30T10:15:00Z',
      deployments: [
        { name: 'Production', url: 'https://semgrep.dev/orgs/devtools-prod' },
      ],
    },
  ];

  getPovs(): any[] {
    return this.povs;
  }

  getPov(povId: string): any {
    return this.povs.find((pov: any) => pov.id === povId);
  }
}
