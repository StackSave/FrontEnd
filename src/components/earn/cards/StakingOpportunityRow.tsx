'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Lock, Flame } from 'lucide-react'
import Link from 'next/link'
import { RewardCalculator } from './RewardCalculator'
import type { Strategy, Protocol } from '@/lib/api'

interface StakingOpportunityRowProps {
  data: Strategy | Protocol
  type: 'strategy' | 'protocol'
  showCalculator?: boolean
  onClick?: () => void
  isSelected?: boolean
  onStakeClick?: () => void
}

export function StakingOpportunityRow({
  data,
  type,
  showCalculator = false,
  onClick,
  isSelected = false,
  onStakeClick
}: StakingOpportunityRowProps) {
  const isStrategy = type === 'strategy'
  const strategy = isStrategy ? (data as Strategy) : null
  const protocol = !isStrategy ? (data as Protocol) : null

  const apy = isStrategy ? strategy!.apyCurrent : protocol!.apy
  const tvl = data.tvl
  const displayName = isStrategy ? strategy!.displayName : protocol!.displayName
  const lockPeriod = isStrategy ? strategy!.lockPeriod : 0
  const category = isStrategy ? strategy!.category : protocol!.category
  const isHot = isStrategy ? strategy!.isHot : false

  const href = isStrategy
    ? `/earn/deposit?strategy=${strategy!.name}`
    : `/earn/protocol/${protocol!.name}`

  return (
    <Card
      className={`border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-2 border-black bg-gray-50 shadow-lg'
          : 'border border-gray-200 hover:shadow-lg'
      }`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Asset Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {/* Logo */}
            <div className="flex-shrink-0">
              {protocol?.logo ? (
                <img
                  src={protocol.logo}
                  alt={displayName}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {displayName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Name & Category */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-black truncate">
                  {displayName}
                </h3>
                {isHot && (
                  <Badge variant="outline" className="border-red-500 text-red-500 text-xs flex-shrink-0">
                    <Flame className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{category}</span>
                {isStrategy && strategy!.riskLevel && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{strategy!.riskLevel}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Middle: Stats */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* APY */}
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {apy.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500">APY</div>
            </div>

            {/* Lock Period */}
            <div className="text-center min-w-[80px]">
              <div className="flex items-center justify-center gap-1 text-sm font-medium text-black">
                {lockPeriod > 0 && <Lock className="h-3 w-3" />}
                {lockPeriod === 0 ? 'Flexible' : `${lockPeriod}d`}
              </div>
              <div className="text-xs text-gray-500">Lock Period</div>
            </div>

            {/* TVL */}
            <div className="text-center min-w-[100px]">
              <div className="text-sm font-bold text-black">
                ${(tvl / 1000000).toFixed(2)}M
              </div>
              <div className="text-xs text-gray-500">TVL</div>
            </div>

            {/* Reward Estimate (compact) */}
            {showCalculator && (
              <div className="hidden lg:block">
                <RewardCalculator apy={apy} compact />
              </div>
            )}
          </div>

          {/* Right: Action Button */}
          {isStrategy && onStakeClick ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onStakeClick()
              }}
              className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex-shrink-0"
            >
              Stake Now
            </button>
          ) : (
            <Link href={href} className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <button className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
                {isStrategy ? 'Stake Now' : 'View Details'}
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-green-600">
                {apy.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500">APY</div>
            </div>
            <div>
              <div className="text-sm font-medium text-black">
                {lockPeriod === 0 ? 'Flexible' : `${lockPeriod}d`}
              </div>
              <div className="text-xs text-gray-500">Lock Period</div>
            </div>
            <div>
              <div className="text-sm font-bold text-black">
                ${(tvl / 1000000).toFixed(2)}M
              </div>
              <div className="text-xs text-gray-500">TVL</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
