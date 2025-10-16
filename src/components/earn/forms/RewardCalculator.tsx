'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface RewardCalculatorProps {
  apy: number
  tokenSymbol?: string
  compact?: boolean
}

export function RewardCalculator({ apy, tokenSymbol = 'USD', compact = false }: RewardCalculatorProps) {
  const [amount, setAmount] = useState<string>('1000')

  const numAmount = parseFloat(amount) || 0
  const dailyRate = apy / 365 / 100
  const monthlyRate = apy / 12 / 100
  const yearlyRate = apy / 100

  const dailyReward = numAmount * dailyRate
  const monthlyReward = numAmount * monthlyRate
  const yearlyReward = numAmount * yearlyRate

  if (compact) {
    return (
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-gray-900">
            ${yearlyReward.toFixed(2)}/year
          </span>
        </div>
      </div>
    )
  }

  return (
    <Card className="border-2 border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-bold text-black mb-4">Reward Estimation</h3>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stake Amount ({tokenSymbol})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-lg font-semibold"
          />
        </div>

        {/* Rewards Display */}
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Daily Rewards</span>
            <span className="text-lg font-bold text-black">
              ${dailyReward.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Monthly Rewards</span>
            <span className="text-lg font-bold text-black">
              ${monthlyReward.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
            <span className="text-sm font-medium text-green-700">Yearly Rewards</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-600">
                ${yearlyReward.toFixed(2)}
              </span>
              <div className="text-xs text-green-600 mt-1">
                Total: ${(numAmount + yearlyReward).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* APY Display */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current APY</span>
            <span className="text-xl font-bold text-black">{apy.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
