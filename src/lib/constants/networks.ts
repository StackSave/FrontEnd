// Network Constants

/**
 * Available blockchain networks for staking
 */
export const NETWORKS = [
  'Base Sepolia',
  'Ethereum',
  'Polygon',
  'Arbitrum',
  'Optimism'
] as const;

export type Network = (typeof NETWORKS)[number];

/**
 * Default network
 */
export const DEFAULT_NETWORK: Network = 'Base Sepolia';
