// API Types for StackSave Backend

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
