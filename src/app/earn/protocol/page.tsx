'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ExternalLink } from 'lucide-react'
import { protocolsApi, type Protocol } from '@/lib/api'
import { ProtocolCard } from '@/components/earn/cards'
import { fadeInUp, stagger } from '@/lib/constants'

export default function ProtocolPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [protocolsData, categoriesData] = await Promise.all([
          protocolsApi.getAll(),
          protocolsApi.getCategories()
        ])

        setProtocols(protocolsData)
        setFilteredProtocols(protocolsData)
        setCategories(['All', ...categoriesData])
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

  useEffect(() => {
    let filtered = [...protocols]

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProtocols(filtered)
  }, [protocols, selectedCategory, searchQuery])

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

  const totalTVL = protocols.reduce((sum, p) => sum + p.tvl, 0)
  const avgAPY = protocols.reduce((sum, p) => sum + p.apy, 0) / protocols.length

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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Protocols</p>
            <p className="text-2xl font-bold text-black">{protocols.length}</p>
          </div>
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total TVL</p>
            <p className="text-2xl font-bold text-black">
              ${(totalTVL / 1000000).toFixed(2)}M
            </p>
          </div>
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Avg APY</p>
            <p className="text-2xl font-bold text-black">
              {avgAPY.toFixed(2)}%
            </p>
          </div>
          <div className="p-4 border-2 border-black rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Categories</p>
            <p className="text-2xl font-bold text-black">{categories.length - 1}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search protocols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Protocols Grid */}
        {filteredProtocols.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProtocols.map((protocol) => (
              <motion.div key={protocol.id} variants={fadeInUp}>
                <ProtocolCard protocol={protocol} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No protocols found matching your search
          </div>
        )}

        {/* Learn More Section */}
        <div className="mt-16 p-8 bg-gray-50 border-2 border-black rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-black">
            Learn More About DeFi Protocols
          </h3>
          <p className="text-gray-600 mb-4">
            Each protocol offers unique opportunities for earning yield on your crypto assets.
            Explore different strategies including lending, liquidity provision, and yield optimization.
          </p>
          <a
            href="https://stacksave.gitbook.io/stacksave-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black font-medium hover:underline"
          >
            Read Documentation
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
