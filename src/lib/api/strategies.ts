// Strategies API Module

import { fetchApi } from './client';
import type { Strategy, StrategyBreakdown } from './types';

/**
 * API endpoints for Strategy operations
 */
export const strategiesApi = {
  /**
   * Get all strategies
   */
  getAll: () => fetchApi<Strategy[]>('/strategies'),

  /**
   * Get hot/trending vaults
   * @param limit - Number of vaults to return (default: 6)
   */
  getHot: (limit: number = 6) => fetchApi<Strategy[]>(`/strategies/hot?limit=${limit}`),

  /**
   * Get single strategy by name
   * @param name - Strategy name
   */
  getByName: (name: string) => fetchApi<Strategy>(`/strategies/${name}`),

  /**
   * Get strategy breakdown with detailed allocation
   * @param name - Strategy name
   */
  getBreakdown: (name: string) =>
    fetchApi<StrategyBreakdown>(`/strategies/${name}/breakdown`),
};
