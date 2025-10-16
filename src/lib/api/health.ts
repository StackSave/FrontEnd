// Health Check API Module

import { fetchApi } from './client';

/**
 * API health check endpoint
 */
export const healthApi = {
  /**
   * Check backend API health status
   */
  check: () => fetchApi<{ status: string; timestamp: string }>('/health'),
};
