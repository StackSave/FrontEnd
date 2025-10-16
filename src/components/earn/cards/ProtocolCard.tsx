import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'
import type { Protocol } from '@/lib/api'

interface ProtocolCardProps {
  protocol: Protocol
  showCategory?: boolean
  layout?: 'horizontal' | 'square'
}

export function ProtocolCard({ protocol, showCategory = true, layout = 'square' }: ProtocolCardProps) {
  if (layout === 'horizontal') {
    return (
      <Link href={`/earn/protocol/${protocol.name}`}>
        <Card className="border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
          <div className="p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Protocol Info */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {protocol.logo ? (
                  <img
                    src={protocol.logo}
                    alt={protocol.displayName}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {protocol.displayName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-black truncate">
                    {protocol.displayName}
                  </h3>
                  {showCategory && (
                    <span className="text-xs text-gray-500">{protocol.category}</span>
                  )}
                </div>
              </div>

              {/* Middle: Stats */}
              <div className="hidden md:flex items-center gap-8">
                {/* APY */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {protocol.apy.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-500">APY</div>
                </div>

                {/* TVL */}
                <div className="text-center min-w-[100px]">
                  <div className="text-sm font-bold text-black">
                    ${(protocol.tvl / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-gray-500">TVL</div>
                </div>
              </div>

              {/* Right: Action */}
              <button className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex-shrink-0">
                View Details
              </button>
            </div>

            {/* Mobile Stats */}
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-600">
                    {protocol.apy.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-500">APY</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-black">
                    ${(protocol.tvl / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-gray-500">TVL</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  // Original square layout
  return (
    <Link href={`/earn/protocol/${protocol.name}`}>
      <Card className="border-2 border-black hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {protocol.logo ? (
                <img src={protocol.logo} alt={protocol.displayName} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {protocol.displayName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-black">{protocol.displayName}</h3>
                {showCategory && (
                  <span className="text-xs text-gray-500">{protocol.category}</span>
                )}
              </div>
            </div>
          </div>

          {/* APY */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black">
                {protocol.apy.toFixed(2)}%
              </span>
              <span className="text-sm text-gray-600">APY</span>
            </div>
          </div>

          {/* TVL */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Value Locked</span>
              <span className="text-sm font-medium text-black">
                ${(protocol.tvl / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
