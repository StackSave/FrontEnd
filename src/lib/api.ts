// API Client for StackSave Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types matching backend responses
export interface Protocol {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  category: string;
  logo?: string;
  apy: number;
  tvl: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StrategyProtocol {
  id: string;
  strategyId: string;
  protocolId: string;
  allocation: number;
  protocol: Protocol;
  createdAt: string;
  updatedAt: string;
}

export interface Strategy {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  apyCurrent: number;
  riskLevel: string;
  lockPeriod: number;
  minDeposit: number;
  category: string;
  isFeatured: boolean;
  isHot: boolean;
  tvl: number;
  protocols: StrategyProtocol[];
  createdAt: string;
  updatedAt: string;
}

export interface StrategyBreakdown {
  name: string;
  displayName: string;
  currentAPY: number;
  protocols: {
    name: string;
    displayName: string;
    apy: number;
    allocation: number;
    contribution: number;
  }[];
}

export interface ApyHistory {
  id: string;
  protocolName: string;
  apy: number;
  timestamp: string;
}

// Faucet types
export interface FaucetRequest {
  id: string;
  walletAddress: string;
  amount: number;
  txHash?: string;
  requestedAt: string;
}

export interface FaucetResponse {
  success: boolean;
  amount?: number;
  txHash?: string;
  cooldownUntil?: string;
  error?: string;
}

// API Error class
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error: Unable to connect to backend');
  }
}

// Protocols API
export const protocolsApi = {
  // Get all protocols
  getAll: () => fetchApi<Protocol[]>('/protocols'),

  // Get top protocols by APY
  getTop: (limit: number = 4) => fetchApi<Protocol[]>(`/protocols/top?limit=${limit}`),

  // Get protocols by category
  getByCategory: (category?: string) =>
    fetchApi<Protocol[]>(`/protocols/category${category ? `/${category}` : ''}`),

  // Get all categories
  getCategories: () => fetchApi<string[]>('/protocols/categories'),

  // Get single protocol by name
  getByName: (name: string) => fetchApi<Protocol>(`/protocols/${name}`),

  // Get protocol APY history
  getHistory: (name: string, days: number = 7) =>
    fetchApi<ApyHistory[]>(`/protocols/${name}/history?days=${days}`),
};

// Strategies API
export const strategiesApi = {
  // Get all strategies
  getAll: () => fetchApi<Strategy[]>('/strategies'),

  // Get hot/trending vaults
  getHot: (limit: number = 6) => fetchApi<Strategy[]>(`/strategies/hot?limit=${limit}`),

  // Get single strategy by name
  getByName: (name: string) => fetchApi<Strategy>(`/strategies/${name}`),

  // Get strategy breakdown with detailed allocation
  getBreakdown: (name: string) =>
    fetchApi<StrategyBreakdown>(`/strategies/${name}/breakdown`),
};

// Health check
export const healthApi = {
  check: () => fetchApi<{ status: string; timestamp: string }>('/health'),
};

// Faucet API
export const faucetApi = {
  // Request mockIDRX tokens from faucet
  requestTokens: (walletAddress: string) =>
    fetchApi<FaucetResponse>('/faucet/request', {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    }),

  // Get faucet request history for a wallet
  getHistory: (walletAddress: string) =>
    fetchApi<FaucetRequest[]>(`/faucet/history/${walletAddress}`),
};
