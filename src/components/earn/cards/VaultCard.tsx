import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, TrendingUp, Zap, Flame } from 'lucide-react'
import Link from 'next/link'
import type { Strategy } from '@/lib/api'

interface VaultCardProps {
  vault: Strategy
  compact?: boolean
  layout?: 'horizontal' | 'square'
}

const strategyIcons = {
  conservative: Shield,
  balanced: TrendingUp,
  growth: Zap
} as const

const strategyColors = {
  conservative: { bg: 'bg-blue-50', text: 'text-blue-600', badge: 'border-blue-600 text-blue-600' },
  balanced: { bg: 'bg-purple-50', text: 'text-purple-600', badge: 'border-purple-600 text-purple-600' },
  growth: { bg: 'bg-orange-50', text: 'text-orange-600', badge: 'border-orange-600 text-orange-600' }
} as const

export function VaultCard({ vault, compact = false, layout = 'square' }: VaultCardProps) {
  const Icon = strategyIcons[vault.name as keyof typeof strategyIcons] || Shield
  const colors = strategyColors[vault.name as keyof typeof strategyColors] || strategyColors.conservative

  if (layout === 'horizontal') {
    return (
      <Link href={`/earn/deposit?strategy=${vault.name}`}>
        <Card className="border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
          <div className="p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Vault Info */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className={`p-3 rounded-lg ${colors.bg} flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-black truncate">
                      {vault.displayName}
                    </h3>
                    {vault.isHot && (
                      <Badge variant="outline" className="border-red-500 text-red-500 text-xs flex-shrink-0">
                        <Flame className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{vault.category}</span>
                    <span>•</span>
                    <span className="capitalize">{vault.riskLevel}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Stats */}
              <div className="hidden md:flex items-center gap-8">
                {/* APY */}
                <div className="text-center">
                  <div className={`text-2xl font-bold ${colors.text}`}>
                    {vault.apyCurrent.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-500">APY</div>
                </div>

                {/* Lock Period */}
                <div className="text-center min-w-[80px]">
                  <div className="text-sm font-medium text-black">
                    {vault.lockPeriod === 0 ? 'Flexible' : `${vault.lockPeriod}d`}
                  </div>
                  <div className="text-xs text-gray-500">Lock Period</div>
                </div>

                {/* TVL */}
                <div className="text-center min-w-[100px]">
                  <div className="text-sm font-bold text-black">
                    ${(vault.tvl / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-gray-500">TVL</div>
                </div>
              </div>

              {/* Right: Action */}
              <button className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex-shrink-0">
                Stake Now
              </button>
            </div>

            {/* Mobile Stats */}
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className={`text-xl font-bold ${colors.text}`}>
                    {vault.apyCurrent.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-500">APY</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-black">
                    {vault.lockPeriod === 0 ? 'Flexible' : `${vault.lockPeriod}d`}
                  </div>
                  <div className="text-xs text-gray-500">Lock Period</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-black">
                    ${(vault.tvl / 1000000).toFixed(2)}M
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
    <Link href={`/earn/deposit?strategy=${vault.name}`}>
      <Card className="border-2 border-black hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${colors.bg}`}>
                <Icon className={`h-6 w-6 ${colors.text}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-black">{vault.displayName}</h3>
                  {vault.isHot && (
                    <Badge variant="outline" className="border-red-500 text-red-500 text-xs">
                      <Flame className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">{vault.category}</span>
              </div>
            </div>
            <Badge variant="outline" className={`${colors.badge} border-2`}>
              {vault.riskLevel}
            </Badge>
          </div>

          {/* APY */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${colors.text}`}>
                {vault.apyCurrent.toFixed(2)}%
              </span>
              <span className="text-sm text-gray-600">Current APY</span>
            </div>
          </div>

          {!compact && (
            <>
              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lock Period</span>
                  <span className="font-medium text-black">
                    {vault.lockPeriod === 0 ? 'None' : `${vault.lockPeriod} days`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TVL</span>
                  <span className="font-medium text-black">
                    ${(vault.tvl / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Protocols</span>
                  <span className="font-medium text-black">
                    {vault.protocols.length}
                  </span>
                </div>
              </div>

              {/* Description */}
              {vault.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {vault.description}
                </p>
              )}
            </>
          )}
        </div>
      </Card>
    </Link>
  )
}
