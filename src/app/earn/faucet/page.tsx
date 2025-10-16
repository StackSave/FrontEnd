'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, CheckCircle2, XCircle, Loader2, Wallet, Info, Clock, ExternalLink } from 'lucide-react'
import { useAccount } from 'wagmi'
import { faucetApi } from '@/lib/api'
import type { FaucetResponse } from '@/lib/api'
import { fadeInUp } from '@/lib/constants'

export default function FaucetPage() {
  const { address, isConnected } = useAccount()
  const [requesting, setRequesting] = useState(false)
  const [txStatus, setTxStatus] = useState<FaucetResponse | null>(null)

  // Request mockIDRX tokens
  const handleRequestTokens = async () => {
    if (!isConnected || !address) {
      setTxStatus({
        success: false,
        error: 'Please connect your wallet first'
      })
      return
    }

    setRequesting(true)
    setTxStatus(null)

    try {
      const result = await faucetApi.requestTokens(address)
      setTxStatus(result)
    } catch (err: any) {
      setTxStatus({
        success: false,
        error: err.message || 'Failed to request tokens. Please try again.'
      })
    } finally {
      setRequesting(false)
    }
  }

  // Calculate remaining cooldown
  const getRemainingCooldown = () => {
    if (!txStatus?.cooldownUntil) return ''

    const cooldownDate = new Date(txStatus.cooldownUntil)
    const now = new Date()
    const hoursRemaining = Math.ceil((cooldownDate.getTime() - now.getTime()) / (1000 * 60 * 60))

    if (hoursRemaining <= 0) return ''
    if (hoursRemaining === 1) return '1 hour'
    return `${hoursRemaining} hours`
  }

  const cooldownRemaining = getRemainingCooldown()
  const onCooldown = !txStatus?.success && txStatus?.error?.includes('request again in')

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplets className="h-10 w-10 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Get Free mockIDRX
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Request free testnet tokens to try out StackSave's features
          </p>
        </motion.div>

        {/* Educational Info */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">What is mockIDRX?</h3>
              <p className="text-sm text-blue-800 mb-2">
                mockIDRX is a testnet token that represents Indonesian Rupiah (IDR). It has no real value
                and is only used for testing StackSave's DeFi features safely.
              </p>
              <p className="text-sm text-blue-800">
                You can request <strong>10,000 IDRX</strong> once every 24 hours. Use these tokens to
                deposit into vaults and test earning APY!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Wallet Status */}
        {!isConnected ? (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-yellow-700" />
              <p className="text-yellow-800 font-medium">
                Please connect your wallet using the button in the header to request tokens
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mb-8 p-6 bg-gray-50 border-2 border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="h-5 w-5 text-gray-700" />
              <h3 className="font-bold text-gray-900">Connected Wallet</h3>
            </div>
            <p className="font-mono text-sm text-gray-700 ml-8">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </motion.div>
        )}

        {/* Transaction Status */}
        {txStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-6 rounded-lg border-2 ${
              txStatus.success
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {txStatus.success ? (
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className={`font-bold mb-2 ${
                  txStatus.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {txStatus.success ? 'Success!' : 'Request Failed'}
                </h3>
                {txStatus.success ? (
                  <>
                    <p className="text-sm text-green-800 mb-3">
                      Successfully minted <strong>{txStatus.amount?.toLocaleString()} IDRX</strong> to your wallet!
                    </p>
                    {txStatus.txHash && (
                      <p className="text-xs text-green-700 font-mono mb-2">
                        TX: {txStatus.txHash}
                      </p>
                    )}
                    <p className="text-xs text-green-700">
                      You can request again in 24 hours.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-red-800">{txStatus.error}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Faucet Card */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="p-8 border-4 border-black rounded-2xl bg-white shadow-lg"
        >
          {/* IDRX Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">IDRX</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">mockIDRX</h2>
                <p className="text-sm text-gray-600">Indonesian Rupiah (Testnet)</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-black">10,000</p>
              <p className="text-xs text-gray-500">per request</p>
            </div>
          </div>

          {/* Cooldown Warning */}
          {onCooldown && (
            <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <p className="text-sm text-orange-800">
                  <strong>Cooldown active:</strong> {txStatus?.error}
                </p>
              </div>
            </div>
          )}

          {/* Request Button */}
          <button
            onClick={handleRequestTokens}
            disabled={!isConnected || requesting || onCooldown}
            className={`w-full flex items-center justify-center gap-3 px-6 py-5 rounded-xl font-bold text-lg transition-all ${
              onCooldown
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : requesting
                ? 'bg-gray-800 text-white cursor-wait'
                : !isConnected
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {requesting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Processing Request...
              </>
            ) : onCooldown ? (
              <>
                <Clock className="h-6 w-6" />
                On Cooldown
              </>
            ) : !isConnected ? (
              <>
                <Wallet className="h-6 w-6" />
                Connect Wallet First
              </>
            ) : (
              <>
                <Droplets className="h-6 w-6" />
                Get 10,000 IDRX
              </>
            )}
          </button>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Request limit: Once every 24 hours per wallet
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mt-8 p-6 bg-gray-50 border-2 border-gray-200 rounded-lg"
        >
          <h3 className="font-bold text-black mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            What's Next?
          </h3>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-bold text-black">1.</span>
              <span>Request mockIDRX tokens using the button above</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-black">2.</span>
              <span>Go to <strong>Explore</strong> tab to browse available vaults and their APYs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-black">3.</span>
              <span>Go to <strong>Deposit</strong> tab to deposit IDRX into vaults and start earning!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-black">4.</span>
              <span>Track your earnings and withdraw anytime</span>
            </li>
          </ol>
        </motion.div>

        {/* Help Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mt-8 p-6 bg-white border-2 border-gray-200 rounded-lg"
        >
          <h3 className="font-bold text-black mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-black mb-1">Q: How do I get more IDRX if I need it?</p>
              <p className="text-gray-600 ml-4">A: You can request again after 24 hours, or contact us on WhatsApp (button in header) for assistance.</p>
            </div>
            <div>
              <p className="font-medium text-black mb-1">Q: Do these tokens have real value?</p>
              <p className="text-gray-600 ml-4">A: No, mockIDRX is a testnet token with no real monetary value. It's only for testing features.</p>
            </div>
            <div>
              <p className="font-medium text-black mb-1">Q: What blockchain is this on?</p>
              <p className="text-gray-600 ml-4">A: We're using Sepolia Testnet, an Ethereum test network that's free to use.</p>
            </div>
          </div>
        </motion.div>

        {/* External Resources */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mt-8"
        >
          <h3 className="font-bold text-black mb-4">Need Testnet ETH for Gas?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.alchemy.com/faucets/ethereum-sepolia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:shadow-lg transition-all group bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-black group-hover:text-blue-600 transition-colors">
                  Alchemy Sepolia Faucet
                </h4>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-sm text-gray-600">Get free Sepolia ETH for transaction gas fees</p>
            </a>
            <a
              href="https://sepolia-faucet.pk910.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:shadow-lg transition-all group bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-black group-hover:text-blue-600 transition-colors">
                  PoW Sepolia Faucet
                </h4>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-sm text-gray-600">Alternative faucet with higher limits</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
