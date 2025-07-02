interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface POVData {
  id: string;
  prospectName: string;
  salesforceOpportunityId: string;
  status: 'active' | 'setup' | 'completed';
  startDate: string;
  endDate: string;
  salesOwner: string;
  contractSize: number;
  currentContributors: number;
  utilizationPercentage: number;
  repositoriesScanned: number;
  totalRepositories: number;
  failedScans: number;
  lastActivity: string | null;
  deployments: Array<{
    name: string;
    url: string;
  }>;
}

interface Scan {
  id: string;
  repository: string;
  branch: string;
  deployment?: string;
  failedAt: string;
  error: string;
  severity: 'high' | 'medium' | 'low';
  lastSuccess: string;
}

export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  businessUnit: string;
  title: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    // Use relative URLs - Next.js API routes will handle the proxying
    this.baseUrl = '/api';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllPOVs(): Promise<ApiResponse<POVData[]>> {
    return this.request<POVData[]>('/povs');
  }

  async getPOVById(id: string): Promise<ApiResponse<POVData>> {
    return this.request<POVData>(`/povs/${id}`);
  }

  async getPOVsByStatus(status: string): Promise<ApiResponse<POVData[]>> {
    return this.request<POVData[]>(`/povs?status=${status}`);
  }

  async getScans(): Promise<ApiResponse<Scan[]>> {
    return this.request<Scan[]>('/scans');
  }

  async setupAlerts(data: {
    povIds: string[];
    email: string;
    frequency: string;
    customMessage?: string;
  }): Promise<ApiResponse<{ success: boolean }>> {
    return this.request('/alerts/setup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string): Promise<ApiResponse<User>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
}

export const apiClient = new ApiClient();
export type { POVData, Scan };
