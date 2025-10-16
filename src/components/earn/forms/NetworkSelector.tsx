'use client'

import { useState } from 'react'
import { ChevronDown, Network } from 'lucide-react'

interface NetworkSelectorProps {
  networks: string[]
  selectedNetwork: string
  onNetworkChange: (network: string) => void
  amount: string
  onAmountChange: (amount: string) => void
  averageAPY: number
  topProvider?: string
}

export function NetworkSelector({
  networks,
  selectedNetwork,
  onNetworkChange,
  amount,
  onAmountChange,
  averageAPY,
  topProvider = 'Multiple Providers'
}: NetworkSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const setMaxAmount = () => {
    onAmountChange('100000') // Example max amount
  }

  const handleNetworkSelect = (network: string) => {
    onNetworkChange(network)
    setIsOpen(false)
  }

  return (
    <div className="bg-black text-white p-8 md:p-12 rounded-2xl h-full flex flex-col justify-center">
      <div className="space-y-8">
        {/* Heading Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Stake Smarter.<br />Earn More
          </h1>
          <p className="text-lg text-gray-300">
            Find the best yield opportunities across verified providers
          </p>
        </div>

        {/* Network Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select Network
          </label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-3 border-2 border-white/20 rounded-lg flex items-center justify-between hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-white bg-white/5"
            >
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-white" />
                <span className="font-medium text-white">{selectedNetwork}</span>
              </div>
              <ChevronDown className={`h-5 w-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-900 border-2 border-white rounded-lg shadow-xl max-h-60 overflow-auto">
                {networks.map((network) => (
                  <button
                    key={network}
                    onClick={() => handleNetworkSelect(network)}
                    className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                      selectedNetwork === network ? 'bg-white/5 font-medium' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-white" />
                      <span className="text-white">{network}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Stake Amount (USD)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 pr-20 border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white font-semibold text-2xl bg-white/5 text-white"
            />
            <button
              onClick={setMaxAmount}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors"
            >
              MAX
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            ≈ ${amount ? Number(amount).toLocaleString('en-US') : '0'}
          </p>
        </div>

        {/* Total Display */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-2">Total Value</p>
          <p className="text-4xl font-bold text-white">
            ${amount ? Number(amount).toLocaleString('en-US') : '0'}
          </p>
        </div>
      </div>
    </div>
  )
}
