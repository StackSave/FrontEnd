// Protocols API Module

import { fetchApi } from './client';
import type { Protocol, ApyHistory } from './types';

/**
 * API endpoints for Protocol operations
 */
export const protocolsApi = {
  /**
   * Get all protocols
   */
  getAll: () => fetchApi<Protocol[]>('/protocols'),

  /**
   * Get top protocols by APY
   * @param limit - Number of protocols to return (default: 4)
   */
  getTop: (limit: number = 4) => fetchApi<Protocol[]>(`/protocols/top?limit=${limit}`),

  /**
   * Get protocols by category
   * @param category - Category name (optional)
   */
  getByCategory: (category?: string) =>
    fetchApi<Protocol[]>(`/protocols/category${category ? `/${category}` : ''}`),

  /**
   * Get all protocol categories
   */
  getCategories: () => fetchApi<string[]>('/protocols/categories'),

  /**
   * Get single protocol by name
   * @param name - Protocol name
   */
  getByName: (name: string) => fetchApi<Protocol>(`/protocols/${name}`),

  /**
   * Get protocol APY history
   * @param name - Protocol name
   * @param days - Number of days of history (default: 7)
   */
  getHistory: (name: string, days: number = 7) =>
    fetchApi<ApyHistory[]>(`/protocols/${name}/history?days=${days}`),
};
