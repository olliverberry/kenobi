import { Injectable } from '@nestjs/common';

@Injectable()
export class ScansService {
    private readonly scans: any[] = [
        {
            id: "scan-001",
            repository: "frontend-app",
            branch: "main",
            failedAt: "2024-01-15T10:30:00Z",
            error: "Authentication failed - invalid token",
            severity: "high",
            lastSuccess: "2024-01-14T15:20:00Z",
          },
          {
            id: "scan-002",
            repository: "api-service",
            branch: "develop",
            failedAt: "2024-01-15T09:15:00Z",
            error: "Repository not found or access denied",
            severity: "high",
            lastSuccess: "2024-01-13T11:45:00Z",
          },
          {
            id: "scan-003",
            repository: "mobile-app",
            branch: "feature/auth",
            failedAt: "2024-01-15T08:45:00Z",
            error: "Timeout during dependency analysis",
            severity: "medium",
            lastSuccess: "2024-01-14T16:30:00Z",
          },
          {
            id: "scan-004",
            repository: "data-pipeline",
            branch: "main",
            failedAt: "2024-01-14T22:10:00Z",
            error: "Unsupported file format in analysis",
            severity: "low",
            lastSuccess: "2024-01-14T18:20:00Z",
          },
          {
            id: "scan-005",
            repository: "web-components",
            branch: "main",
            failedAt: "2024-01-14T20:30:00Z",
            error: "Memory limit exceeded during scan",
            severity: "medium",
            lastSuccess: "2024-01-14T12:15:00Z",
          },
    ];

    getScans(): any[] {
        return this.scans;
    }
}
