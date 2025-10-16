'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { protocolsApi, type Protocol } from '@/lib/api'
import { ProtocolCard } from '@/components/earn/cards'
import { fadeInUp, stagger } from '@/lib/constants'

export default function ProtocolPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const protocolsData = await protocolsApi.getAll()
        setProtocols(protocolsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching protocols:', err)
        setError('Failed to load protocols. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading protocols...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-black">Error Loading Protocols</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            All Protocols
          </h1>
          <p className="text-xl text-gray-600">
            Explore DeFi protocols on Base Sepolia with real-time APY data
          </p>
        </motion.div>

        {/* Protocols List */}
        {protocols.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {protocols.map((protocol) => (
              <motion.div key={protocol.id} variants={fadeInUp}>
                <ProtocolCard protocol={protocol} layout="horizontal" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-black mb-2">
                No Protocols Found
              </h3>
              <p className="text-gray-600 mb-4">
                Database is empty. Run seed command to add protocols.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
