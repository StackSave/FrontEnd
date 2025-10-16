'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { strategiesApi, type Strategy } from '@/lib/api'
import { VaultCard } from '@/components/earn/cards'
import { fadeInUp, stagger } from '@/lib/constants'

type RiskFilter = 'All' | 'Low' | 'Medium' | 'Higher'

export default function VaultPage() {
  const [vaults, setVaults] = useState<Strategy[]>([])
  const [filteredVaults, setFilteredVaults] = useState<Strategy[]>([])
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('All')
  const [sortBy, setSortBy] = useState<'apy' | 'tvl' | 'name'>('apy')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        setLoading(true)
        const data = await strategiesApi.getAll()
        setVaults(data)
        setFilteredVaults(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching vaults:', err)
        setError('Failed to load vaults. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchVaults()
  }, [])

  useEffect(() => {
    let filtered = [...vaults]

    // Filter by risk level
    if (riskFilter !== 'All') {
      filtered = filtered.filter(v => v.riskLevel === riskFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'apy') return b.apyCurrent - a.apyCurrent
      if (sortBy === 'tvl') return b.tvl - a.tvl
      return a.displayName.localeCompare(b.displayName)
    })

    setFilteredVaults(filtered)
  }, [vaults, riskFilter, sortBy])

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-black">Error Loading Vaults</h2>
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
            All Vaults
          </h1>
          <p className="text-xl text-gray-600">
            Choose a strategy that fits your risk tolerance and goals
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          {/* Risk Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Risk Level:</span>
            <div className="flex gap-2">
              {(['All', 'Low', 'Medium', 'Higher'] as RiskFilter[]).map((risk) => (
                <button
                  key={risk}
                  onClick={() => setRiskFilter(risk)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    riskFilter === risk
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'apy' | 'tvl' | 'name')}
              className="px-3 py-1 border-2 border-black rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="apy">Highest APY</option>
              <option value="tvl">Highest TVL</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Vaults</p>
            <p className="text-2xl font-bold text-black">{filteredVaults.length}</p>
          </div>
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Avg APY</p>
            <p className="text-2xl font-bold text-black">
              {(filteredVaults.reduce((sum, v) => sum + v.apyCurrent, 0) / filteredVaults.length || 0).toFixed(2)}%
            </p>
          </div>
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total TVL</p>
            <p className="text-2xl font-bold text-black">
              ${(filteredVaults.reduce((sum, v) => sum + v.tvl, 0) / 1000000).toFixed(2)}M
            </p>
          </div>
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Hot Vaults</p>
            <p className="text-2xl font-bold text-black">
              {filteredVaults.filter(v => v.isHot).length}
            </p>
          </div>
        </div>

        {/* Vaults Grid */}
        {filteredVaults.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredVaults.map((vault) => (
              <motion.div key={vault.id} variants={fadeInUp}>
                <VaultCard vault={vault} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No vaults found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}
