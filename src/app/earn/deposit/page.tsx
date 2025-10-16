'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DepositPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Back Button */}
        <Link
          href="/earn"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Explore</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-12 border-4 border-black rounded-2xl bg-white shadow-lg"
        >
          {/* Icon */}
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10 text-gray-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            The deposit feature is currently under development and will be available soon.
          </p>

          {/* Info Box */}
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg mb-8">
            <p className="text-sm text-blue-800">
              <strong>What you can do now:</strong>
            </p>
            <ul className="mt-3 text-sm text-blue-700 space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Get free mockIDRX tokens from the <strong>Faucet</strong> tab</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Browse available vaults and strategies in the <strong>Explore</strong> tab</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Check out protocol details in the <strong>Protocol</strong> tab</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/earn/faucet">
              <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Get Free Tokens
              </button>
            </Link>
            <Link href="/earn/explore">
              <button className="px-8 py-4 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Explore Vaults
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Footer Note */}
        <p className="mt-8 text-sm text-gray-500">
          Follow our progress and stay updated on new features
        </p>
      </div>
    </div>
  )
}
