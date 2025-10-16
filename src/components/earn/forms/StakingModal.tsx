'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Strategy } from '@/lib/api'

interface StakingModalProps {
  isOpen: boolean
  onClose: () => void
  strategy: Strategy | null
}

export function StakingModal({ isOpen, onClose, strategy }: StakingModalProps) {
  const [activeTab, setActiveTab] = useState<'subscribe' | 'rules'>('subscribe')
  const [lockPeriod, setLockPeriod] = useState<'flexible' | 'fixed'>('flexible')
  const [amount, setAmount] = useState('')
  const [autoSubscribe, setAutoSubscribe] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const balance = '10,000' // Mock balance
  const quota = '10,000' // Mock quota

  if (!isOpen || !strategy) return null

  const apy = lockPeriod === 'flexible' ? strategy.apyCurrent : strategy.apyCurrent + 0.5
  const minAmount = 0.1

  const calculateDailyRewards = () => {
    if (!amount || isNaN(Number(amount))) return '0'
    const daily = (Number(amount) * (apy / 100)) / 365
    return daily.toFixed(4)
  }

  const handleSetMax = () => {
    setAmount(balance.replace(/,/g, ''))
  }

  const handleConfirm = () => {
    // Handle staking confirmation
    console.log('Staking:', { strategy, amount, lockPeriod })
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-2 border-black shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b-2 border-black p-6 flex items-center justify-between rounded-t-2xl">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('subscribe')}
                className={`text-lg font-medium pb-2 transition-colors relative ${
                  activeTab === 'subscribe'
                    ? 'text-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Subscribe
                {activeTab === 'subscribe' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`text-lg font-medium pb-2 transition-colors relative ${
                  activeTab === 'rules'
                    ? 'text-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Product Rules
                {activeTab === 'rules' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'subscribe' ? (
              <div className="space-y-6">
                {/* Lock Period Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      className="text-gray-600 hover:text-black transition-colors"
                      onClick={() => setLockPeriod(lockPeriod === 'flexible' ? 'fixed' : 'flexible')}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex-1 mx-4">
                      <div className="border-2 border-black rounded-lg p-4 text-center bg-white">
                        <p className="text-gray-600 text-sm mb-1">
                          {lockPeriod === 'flexible' ? 'Flexible' : `${strategy.lockPeriod} Days`}
                        </p>
                        <p className="text-3xl font-bold text-black">
                          {apy.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-gray-600 hover:text-black transition-colors"
                      onClick={() => setLockPeriod(lockPeriod === 'flexible' ? 'fixed' : 'flexible')}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Auto Subscribe */}
                <div className="flex items-center justify-end gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSubscribe}
                      onChange={(e) => setAutoSubscribe(e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-black"
                    />
                    <span className="text-sm text-gray-600">Auto-Subscribe</span>
                  </label>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Min ${minAmount} ${strategy.displayName}`}
                      className="w-full px-4 py-3 pr-32 bg-white border-2 border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-gray-600 text-sm">
                        {strategy.displayName.split(' ')[0]}
                      </span>
                      <button
                        onClick={handleSetMax}
                        className="px-3 py-1 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                      >
                        MAX
                      </button>
                    </div>
                  </div>

                  {/* Balance Info */}
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                      Avail (2 accounts){' '}
                      <span className="text-black font-medium">{balance} {strategy.displayName.split(' ')[0]}</span>
                      {' '}
                      <button className="text-black hover:text-gray-700 font-medium">
                        Top up
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Personal Remaining quota {quota} {strategy.displayName.split(' ')[0]}
                  </p>
                </div>

                {/* Summary */}
                <div className="p-4 bg-gray-50 border-2 border-black rounded-lg">
                  <p className="text-sm font-medium text-black mb-3">Summary</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Est. Daily Rewards</span>
                    <span className="text-black font-bold">
                      {calculateDailyRewards()} {strategy.displayName.split(' ')[0]}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    * APY does not represent actual or predicted returns in fiat currency. Please refer to the Product Rules for reward mechanisms.
                  </p>
                </div>

                {/* Terms */}
                <div className="pt-4">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-2 border-black"
                    />
                    <span className="text-sm text-gray-600">
                      I have read and agreed to{' '}
                      <button className="text-black hover:text-gray-700 font-medium underline">
                        StackSave Simple Earn Service Terms & Conditions
                      </button>
                    </span>
                  </label>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirm}
                  disabled={!amount || !agreedToTerms || Number(amount) < minAmount}
                  className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-gray-600 text-sm">
                <div>
                  <h3 className="text-black font-medium mb-2">Product Type</h3>
                  <p>{lockPeriod === 'flexible' ? 'Flexible Staking' : 'Fixed Staking'}</p>
                </div>
                <div>
                  <h3 className="text-black font-medium mb-2">Lock Period</h3>
                  <p>{lockPeriod === 'flexible' ? 'No lock period - withdraw anytime' : `${strategy.lockPeriod} days`}</p>
                </div>
                <div>
                  <h3 className="text-black font-medium mb-2">Minimum Amount</h3>
                  <p>{minAmount} {strategy.displayName.split(' ')[0]}</p>
                </div>
                <div>
                  <h3 className="text-black font-medium mb-2">Interest Calculation</h3>
                  <p>Interest is calculated daily and distributed to your account automatically.</p>
                </div>
                <div>
                  <h3 className="text-black font-medium mb-2">Redemption</h3>
                  <p>
                    {lockPeriod === 'flexible'
                      ? 'You can redeem your assets anytime. Redemption will be processed within 24 hours.'
                      : `Assets can be redeemed after the lock period (${strategy.lockPeriod} days). Early redemption will forfeit all rewards.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
