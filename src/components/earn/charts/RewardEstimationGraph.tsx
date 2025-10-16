'use client'

import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { Strategy } from '@/lib/api'

interface RewardEstimationGraphProps {
  amount: number
  apy: number
  tokenSymbol?: string
  selectedStaking?: Strategy | null
}

export function RewardEstimationGraph({ amount, apy, tokenSymbol = 'USD', selectedStaking }: RewardEstimationGraphProps) {
  // Use selected staking APY if available, otherwise use average APY
  const effectiveAPY = selectedStaking ? selectedStaking.apyCurrent : apy
  const displayName = selectedStaking ? selectedStaking.displayName : 'Average'

  // Calculate projected values over time
  const data = useMemo(() => {
    const principal = amount || 0
    const rate = effectiveAPY / 100

    // Time periods: Today, 1 month, 6 months, 1 year, 2 years
    const periods = [
      { label: 'Today', months: 0 },
      { label: '1M', months: 1 },
      { label: '6M', months: 6 },
      { label: '1Y', months: 12 },
      { label: '2Y', months: 24 },
    ]

    return periods.map(({ label, months }) => {
      const years = months / 12
      const futureValue = principal * Math.pow(1 + rate, years)
      const earnings = futureValue - principal

      return {
        label,
        value: futureValue,
        earnings,
        displayValue: futureValue.toFixed(2),
      }
    })
  }, [amount, effectiveAPY])

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border-2 border-black rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-600 mb-1">{data.label}</p>
          <p className="text-2xl font-bold text-black mb-1">
            ${Number(data.value).toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-green-600">
            +${Number(data.earnings).toLocaleString('en-US', { maximumFractionDigits: 2 })} earnings
          </p>
        </div>
      )
    }
    return null
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const finalValue = data[data.length - 1]
  const initialValue = data[0]

  return (
    <div className="w-full h-full">
      {/* Header Stats */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl md:text-5xl font-bold text-black">
            APY {effectiveAPY.toFixed(2)}%
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {selectedStaking ? `${displayName} Rewards Estimation` : 'Average Rewards Estimation'}
        </p>
      </div>

      {/* Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="label"
              stroke="#6b7280"
              style={{ fontSize: '12px', fontWeight: 500 }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#000000"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Data Points Labels */}
        <div className="flex justify-between mt-4 px-2">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">{initialValue.label}</p>
            <p className="text-sm font-bold text-black">
              ${Number(initialValue.value).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">{data[2].label}</p>
            <p className="text-sm font-bold text-black">
              ${Number(data[2].value).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">{finalValue.label}</p>
            <p className="text-sm font-bold text-green-600">
              ${Number(finalValue.value).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 mb-1">Projected Earnings (2 years)</p>
            <p className="text-2xl font-bold text-green-600">
              +${Number(finalValue.earnings).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Final Value</p>
            <p className="text-2xl font-bold text-black">
              ${Number(finalValue.value).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
