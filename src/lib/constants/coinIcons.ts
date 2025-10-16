/**
 * Coin icons and metadata for cryptocurrency display
 */

export interface CoinMetadata {
  symbol: string
  name: string
  logo: string
  gradient: string
}

/**
 * Map of coin symbols to their metadata
 */
export const COIN_ICONS: Record<string, CoinMetadata> = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    gradient: 'from-blue-500 to-purple-600'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    gradient: 'from-blue-400 to-blue-600'
  },
  LINK: {
    symbol: 'LINK',
    name: 'Chainlink',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png',
    gradient: 'from-blue-500 to-indigo-600'
  },
  ARB: {
    symbol: 'ARB',
    name: 'Arbitrum',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png',
    gradient: 'from-blue-400 to-cyan-500'
  },
  OP: {
    symbol: 'OP',
    name: 'Optimism',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png',
    gradient: 'from-red-500 to-pink-600'
  },
  BASE: {
    symbol: 'BASE',
    name: 'Base',
    logo: 'https://github.com/base-org.png',
    gradient: 'from-blue-600 to-blue-800'
  },
  KAITO: {
    symbol: 'KAITO',
    name: 'Kaito AI',
    logo: '',
    gradient: 'from-purple-500 to-pink-600'
  },
  MORPH: {
    symbol: 'MORPH',
    name: 'Morph',
    logo: '',
    gradient: 'from-green-500 to-teal-600'
  },
  IDRX: {
    symbol: 'IDRX',
    name: 'Indonesian Rupiah',
    logo: 'https://flagcdn.com/w80/id.png',
    gradient: 'from-red-500 to-red-700'
  }
}

/**
 * Extract coin symbol from vault name
 * Example: "eth-idrx" -> "ETH"
 */
export function extractCoinSymbol(vaultName: string): string {
  const parts = vaultName.split('-')
  return parts[0].toUpperCase()
}

/**
 * Get coin metadata for a vault
 */
export function getCoinMetadata(vaultName: string): CoinMetadata {
  const symbol = extractCoinSymbol(vaultName)
  return COIN_ICONS[symbol] || {
    symbol,
    name: symbol,
    logo: '',
    gradient: 'from-gray-500 to-gray-700'
  }
}

/**
 * Get coin icon URL with fallback
 */
export function getCoinIcon(vaultName: string): string {
  const metadata = getCoinMetadata(vaultName)
  return metadata.logo
}

/**
 * Get gradient class for coin
 */
export function getCoinGradient(vaultName: string): string {
  const metadata = getCoinMetadata(vaultName)
  return metadata.gradient
}
