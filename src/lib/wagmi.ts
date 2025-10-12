import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { walletConnect, metaMask, coinbaseWallet, injected } from 'wagmi/connectors'

// Get WalletConnect project ID from environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({
      projectId,
      metadata: {
        name: 'StackSave',
        description: 'Save Smarter with Crypto - Practice on testnet',
        url: 'https://stacksave.app',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      },
      showQrModal: true,
    }),
    coinbaseWallet({
      appName: 'StackSave',
      appLogoUrl: 'https://avatars.githubusercontent.com/u/37784886'
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})
