'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, TrendingUp, Sparkles, DollarSign } from 'lucide-react'
import { protocolsApi, strategiesApi, type Protocol, type Strategy } from '@/lib/api'
import { ProtocolCard, VaultCard, StakingOpportunityRow } from '@/components/earn/cards'
import { RewardEstimationGraph } from '@/components/earn/charts'
import { NetworkSelector, StakingModal } from '@/components/earn/forms'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, stagger, NETWORKS } from '@/lib/constants'

export default function ExplorePage() {
  const [topProtocols, setTopProtocols] = useState<Protocol[]>([])
  const [hotVaults, setHotVaults] = useState<Strategy[]>([])
  const [allVaults, setAllVaults] = useState<Strategy[]>([])
  const [selectedNetwork, setSelectedNetwork] = useState<string>(NETWORKS[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stakeAmount, setStakeAmount] = useState<string>('20098')
  const [selectedStaking, setSelectedStaking] = useState<Strategy | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalStrategy, setModalStrategy] = useState<Strategy | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [protocols, vaults, allStrategies] = await Promise.all([
          protocolsApi.getTop(4),
          strategiesApi.getHot(6),
          strategiesApi.getAll()
        ])

        setTopProtocols(protocols)
        setHotVaults(vaults)
        setAllVaults(allStrategies)
        setError(null)
      } catch (err) {
        console.error('Error fetching explore data:', err)
        setError('Failed to load data. Please try again later.')
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
          <p className="text-gray-600">Loading...</p>
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
          <h2 className="text-2xl font-bold mb-2 text-black">Error Loading Data</h2>
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

  // Calculate total stats
  const totalTVL = [...topProtocols, ...allVaults].reduce((sum, item) => sum + item.tvl, 0)
  const avgAPY = allVaults.length > 0
    ? allVaults.reduce((sum, vault) => sum + vault.apyCurrent, 0) / allVaults.length
    : 0

  // Filter vaults by selected network (limit to 10)
  const filteredVaults = allVaults.slice(0, 10)

  const handleOpenModal = (strategy: Strategy) => {
    setModalStrategy(strategy)
    setModalOpen(true)
  }

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        {/* Main Section - Network Selector & Rewards Graph */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Network Selector (40% width) */}
            <div className="lg:col-span-2">
              <NetworkSelector
                networks={[...NETWORKS]}
                selectedNetwork={selectedNetwork}
                onNetworkChange={setSelectedNetwork}
                amount={stakeAmount}
                onAmountChange={setStakeAmount}
                averageAPY={avgAPY}
                topProvider="Starke Finance"
              />
            </div>

            {/* Right: Reward Estimation Graph (60% width) */}
            <div className="lg:col-span-3">
              <RewardEstimationGraph
                amount={Number(stakeAmount) || 20098}
                apy={avgAPY}
                selectedStaking={selectedStaking}
              />
            </div>
          </div>
        </section>

        {/* All Staking Opportunities - List View Only */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-6 w-6 text-black" />
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Available Staking on {selectedNetwork}
            </h2>
            <span className="text-sm text-gray-500">({filteredVaults.length} opportunities)</span>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {filteredVaults.map((vault) => (
              <motion.div key={vault.id} variants={fadeInUp}>
                <StakingOpportunityRow
                  data={vault}
                  type="strategy"
                  showCalculator
                  onClick={() => setSelectedStaking(vault)}
                  isSelected={selectedStaking?.id === vault.id}
                  onStakeClick={() => handleOpenModal(vault)}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Top Protocols Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-black" />
            <h2 className="text-2xl md:text-3xl font-bold text-black">Top Protocols</h2>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {topProtocols.map((protocol) => (
              <motion.div key={protocol.id} variants={fadeInUp}>
                <ProtocolCard protocol={protocol} layout="horizontal" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Hot Vaults Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-black">Hot Vaults</h2>
            <Badge variant="outline" className="border-red-500 text-red-500">
              Trending
            </Badge>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {hotVaults.map((vault) => (
              <motion.div key={vault.id} variants={fadeInUp}>
                <VaultCard vault={vault} layout="horizontal" />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* Staking Modal */}
      <StakingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        strategy={modalStrategy}
      />
    </div>
  )
}
