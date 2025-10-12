'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BlockchainVisual } from './BlockchainVisual'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      <div className="container relative z-10 px-4 md:px-6 py-12 md:py-20">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col space-y-8 max-w-xl">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black"
            >
              StackSave
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600"
            >
              Save smart, reach goals faster — your decentralized savings journey starts here.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <BlockchainVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
