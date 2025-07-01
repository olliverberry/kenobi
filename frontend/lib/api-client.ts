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
    console.log(
      '🔧 ApiClient constructor - Using relative URLs for API routes',
    );
    // Use relative URLs - Next.js API routes will handle the proxying
    this.baseUrl = '/api';
    console.log('  Base URL set to:', this.baseUrl);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    console.log('🔍 API Request Debug:');
    console.log('  Base URL:', this.baseUrl);
    console.log('  Endpoint:', endpoint);
    console.log('  Full URL:', url);
    console.log('  Method:', options.method || 'GET');
    console.log('  Headers:', options.headers);

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('📡 Making request to:', url);
      const response = await fetch(url, config);
      console.log('📥 Response status:', response.status);
      console.log(
        '📥 Response headers:',
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        console.error('❌ HTTP error! status:', response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Response data:', data);
      return data;
    } catch (error) {
      console.error('💥 API request failed:', error);
      console.error('💥 Error details:', {
        message: error instanceof Error ? error.message : String(error),
        cause: error instanceof Error ? error.cause : undefined,
        stack: error instanceof Error ? error.stack : undefined,
      });
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
