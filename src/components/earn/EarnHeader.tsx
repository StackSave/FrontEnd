'use client'

import Link from 'next/link'
import { ArrowLeft, Wallet, ChevronDown, MessageCircle } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState, useEffect } from 'react'

export function EarnHeader() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Truncate address for display
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="border-b-2 border-gray-200 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Left: Back to Home + Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="hidden md:block h-6 w-px bg-gray-300" />
            <Link href="/earn" className="hidden md:block">
              <h1 className="text-xl font-bold text-black">StackSave</h1>
            </Link>
          </div>

          {/* Right: WhatsApp + Wallet Connection */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Chat Button */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">Chat on WhatsApp</span>
            </a>

            {/* Wallet Connection */}
            <div className="relative">
            {!mounted ? (
              // Static state during SSR
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg transition-colors font-medium text-sm opacity-50"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            ) : isConnected && address ? (
              // Connected State
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">
                    {truncateAddress(address)}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              // Not Connected State
              <div>
                <button
                  onClick={() => setShowConnectors(!showConnectors)}
                  disabled={isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm disabled:opacity-50"
                >
                  <Wallet className="h-4 w-4" />
                  {isPending ? 'Connecting...' : 'Connect Wallet'}
                  {!isPending && <ChevronDown className="h-4 w-4" />}
                </button>

                {/* Wallet Connectors Dropdown */}
                {showConnectors && !isPending && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowConnectors(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-black rounded-lg shadow-xl z-50">
                      <div className="p-2">
                        <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                          Choose Wallet
                        </p>
                        {connectors.map((connector) => (
                          <button
                            key={connector.id}
                            onClick={() => {
                              connect({ connector })
                              setShowConnectors(false)
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Wallet className="h-4 w-4" />
                            {connector.name}
                          </button>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                        <p className="text-xs text-gray-600">
                          Connect your wallet to start earning
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
