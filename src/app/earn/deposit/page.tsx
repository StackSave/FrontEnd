'use client'

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Info, Shield, TrendingUp, Zap, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { strategiesApi, type StrategyBreakdown } from '@/lib/api'

// Icon and UI configuration by strategy name
const strategyConfig = {
  conservative: {
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  balanced: {
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  growth: {
    icon: Zap,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  }
} as const

const strategyDescriptions = {
  conservative: 'Perfect for emergency funds. Withdraw anytime with stable returns.',
  balanced: 'Optimal balance of returns and flexibility for short-term goals.',
  growth: 'Maximum returns for long-term wealth building. Best performance.'
}

function DepositContent() {
  const searchParams = useSearchParams()
  const strategyName = searchParams.get('strategy') || 'balanced'

  const [strategy, setStrategy] = useState<StrategyBreakdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [balance] = useState('10000') // Mock balance
  const [isDepositing, setIsDepositing] = useState(false)
  const [depositSuccess, setDepositSuccess] = useState(false)

  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        setLoading(true)
        const data = await strategiesApi.getBreakdown(strategyName)
        setStrategy(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching strategy:', err)
        setError('Failed to load strategy data')
      } finally {
        setLoading(false)
      }
    }

    fetchStrategy()
  }, [strategyName])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading strategy...</p>
        </div>
      </div>
    )
  }

  if (error || !strategy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-black">Error Loading Strategy</h2>
          <p className="text-gray-600 mb-6">{error || 'Strategy not found'}</p>
          <Link href="/earn">
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Back to Strategies
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const config = strategyConfig[strategy.name as keyof typeof strategyConfig]
  const Icon = config?.icon || Shield

  const handleDeposit = async () => {
    setIsDepositing(true)
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsDepositing(false)
    setDepositSuccess(true)
  }

  const setMaxAmount = () => {
    setAmount(balance)
  }

  const calculateProjectedEarnings = () => {
    if (!amount || isNaN(Number(amount)) || !strategy) return '0'
    const apy = strategy.currentAPY
    const monthly = (Number(amount) * (apy / 100)) / 12
    return monthly.toLocaleString('id-ID', { maximumFractionDigits: 0 })
  }

  // Get risk level for display
  const getRiskLevel = () => {
    if (strategy.name === 'conservative') return 'Low'
    if (strategy.name === 'balanced') return 'Medium'
    return 'Higher'
  }

  // Get lock period for display
  const getLockPeriod = () => {
    if (strategy.name === 'conservative') return 'None'
    if (strategy.name === 'balanced') return '7 days'
    return '30 days'
  }

  if (depositSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-2 border-black p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-black">Deposit Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your funds have been deposited and are now earning {strategy.currentAPY.toFixed(2)}% APY.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Deposited</span>
                <span className="font-medium text-black">Rp {Number(amount).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Strategy</span>
                <span className="font-medium text-black">{strategy.displayName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lock Period</span>
                <span className="font-medium text-black">{getLockPeriod()}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/earn" className="flex-1">
                <button className="w-full px-4 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors">
                  Back to Strategies
                </button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <button className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  View Dashboard
                </button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-black py-6">
        <div className="container px-4 md:px-6">
          <Link href="/earn" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Strategies</span>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Deposit Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                  Deposit to {strategy.displayName}
                </h1>

                <Card className="border-2 border-black p-6">
                  {/* Amount Input */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-black">
                        Amount
                      </label>
                      <span className="text-sm text-gray-600">
                        Balance: <span className="font-medium text-black">Rp {Number(balance).toLocaleString('id-ID')}</span>
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-4 text-2xl font-bold border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <button
                        onClick={setMaxAmount}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
                      >
                        MAX
                      </button>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-600">Min: Rp 100,000</span>
                      <span className="text-gray-600">≈ ${amount ? (Number(amount) / 15500).toFixed(2) : '0'}</span>
                    </div>
                  </div>

                  {/* Projected Earnings */}
                  <div className="mb-6 p-4 bg-gray-50 border-2 border-black rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Projected Monthly Earnings</span>
                      <span className="text-lg font-bold text-black">
                        Rp {calculateProjectedEarnings()}
                      </span>
                    </div>
                  </div>

                  {/* Wallet Connection */}
                  <div className="mb-6">
                    <button className="w-full px-4 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors font-medium">
                      Connect Wallet
                    </button>
                  </div>

                  {/* Deposit Button */}
                  <button
                    onClick={handleDeposit}
                    disabled={!amount || Number(amount) < 100000 || isDepositing}
                    className="w-full px-4 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDepositing ? 'Processing...' : 'Deposit Now'}
                  </button>

                  {/* Warning */}
                  <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg flex gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      This is a testnet deployment. Do not deposit real funds.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Strategy Details */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-2 border-black p-6 sticky top-6">
                  {/* Strategy Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${config?.bgColor || 'bg-gray-50'}`}>
                      <Icon className={`h-6 w-6 ${config?.color || 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{strategy.displayName} Strategy</h3>
                      <Badge variant="outline" className="border-black mt-1">
                        {getRiskLevel()} Risk
                      </Badge>
                    </div>
                  </div>

                  {/* APY Display */}
                  <div className="mb-6 p-4 bg-gray-50 border-2 border-black rounded-lg">
                    <div className="text-center">
                      <span className={`text-5xl font-bold ${config?.color || 'text-gray-600'}`}>
                        {strategy.currentAPY.toFixed(2)}%
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Annual Percentage Yield</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-black">Lock Period</span>
                      </div>
                      <p className="text-gray-600 pl-6">{getLockPeriod()}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-black">Protocol Allocation</span>
                      </div>
                      <ul className="space-y-1 pl-6">
                        {strategy.protocols.map((protocol, idx) => (
                          <li key={idx} className="text-gray-600 text-sm">
                            • {protocol.displayName} ({protocol.allocation}%)
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-black">How It Works</span>
                      </div>
                      <p className="text-gray-600 pl-6 text-sm">
                        Your deposit is automatically allocated across multiple DeFi protocols based on current APYs and risk parameters. Rewards are auto-compounded daily.
                      </p>
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                    <div className="flex gap-2">
                      <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-900 mb-1">Secure & Audited</p>
                        <p className="text-xs text-green-700">
                          Smart contracts audited by OpenZeppelin and CertiK. Insured up to $100K per user.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function DepositPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DepositContent />
    </Suspense>
  )
}
