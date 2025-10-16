'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { strategiesApi, type Strategy } from '@/lib/api'
import { VaultCard } from '@/components/earn/cards'
import { fadeInUp, stagger } from '@/lib/constants'

export default function VaultPage() {
  const [vaults, setVaults] = useState<Strategy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        setLoading(true)
        const data = await strategiesApi.getAll()

        if (data.length === 0) {
          setError('No vaults found in database. Please seed the database:\n\n1. cd backend\n2. npm run prisma:reset')
        } else {
          setVaults(data)
          setError(null)
        }
      } catch (err: any) {
        console.error('Error fetching vaults:', err)

        // Better error messages based on error type
        if (err.message?.includes('Network error') || err.message?.includes('Failed to fetch')) {
          setError('Cannot connect to backend server.\n\nPlease ensure:\n1. Backend is running: cd backend && npm run dev\n2. Backend URL is correct: http://localhost:3001')
        } else if (err.status === 404) {
          setError('Vaults API endpoint not found.\n\nPlease check:\n1. Backend routes are configured\n2. API endpoint exists at /api/strategies')
        } else if (err.status === 500) {
          setError('Backend server error.\n\nPlease check:\n1. Database is accessible\n2. Backend console for error logs')
        } else {
          setError(`Failed to load vaults: ${err.message || 'Unknown error'}\n\nTry:\n1. Check browser console (F12)\n2. Check backend is running\n3. Refresh the page`)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchVaults()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading vaults...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-black">Cannot Load Vaults</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-6 text-left">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{error}</pre>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Retry Connection
            </button>
            <button
              onClick={() => window.open('http://localhost:3001/api/strategies', '_blank')}
              className="px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors"
            >
              Test API Directly
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Check browser console (F12) for detailed error logs
          </p>
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
            All Vaults
          </h1>
          <p className="text-xl text-gray-600">
            Choose a strategy that fits your risk tolerance and goals
          </p>
        </motion.div>

        {/* Vaults List */}
        {vaults.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {vaults.map((vault) => (
              <motion.div key={vault.id} variants={fadeInUp}>
                <VaultCard vault={vault} layout="horizontal" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-black mb-2">
                No Vaults Found
              </h3>
              <p className="text-gray-600 mb-4">
                Database is empty. Run seed command to add vaults.
              </p>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-left">
                <p className="font-bold text-yellow-900 mb-2">🚀 Quick Fix:</p>
                <pre className="text-xs text-yellow-800 font-mono whitespace-pre-wrap">
                  {`cd backend
npm run prisma:reset

This will:
1. Reset the database
2. Seed with 8 vaults
3. Add working logo URLs`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
