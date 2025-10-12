'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Zap, Shield, Clock, Wallet, Coins } from 'lucide-react'
import { WhatsAppMockup } from './WhatsAppMockup'
import { Card, CardContent } from '@/components/ui/card'

const whatsappFeatures = [
  {
    icon: MessageCircle,
    title: 'Chat-Based Interface',
    description: 'Manage your savings through simple WhatsApp messages. No complex apps.',
  },
  {
    icon: Zap,
    title: 'Instant Actions',
    description: 'Deposit, withdraw, and check balances with a quick text message.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'End-to-end encrypted conversations. Your data stays safe.',
  },
  {
    icon: Clock,
    title: 'Always Available',
    description: 'Save anytime, anywhere. Your personal crypto assistant 24/7.',
  },
]

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your Web3 wallet (MetaMask, WalletConnect) to get started.',
  },
  {
    icon: MessageCircle,
    title: 'Chat on WhatsApp',
    description: 'Open WhatsApp and message the StackSave bot. It\'s that simple.',
  },
  {
    icon: Coins,
    title: 'Start Saving',
    description: 'Set goals, deposit testnet crypto, and build healthy saving habits.',
  },
]

export function WhatsAppSection() {
  return (
    <section className="py-20 md:py-32">
      {/* WhatsApp Showcase */}
      <div className="container px-4 md:px-6 mb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black">
            Save Through WhatsApp
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The easiest way to manage your crypto savings. Just chat like you normally do.
          </p>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <WhatsAppMockup />
          </motion.div>

          {/* Right - WhatsApp Features */}
          <div className="space-y-6">
            {whatsappFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Get Started */}
      <div className="container px-4 md:px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black">
            Get Started in 3 Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your savings journey in minutes. No complex setup required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card className="h-full border-2 border-black bg-white hover:bg-black hover:text-white transition-all group">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex p-3 bg-black group-hover:bg-white transition-colors">
                    <step.icon className="h-6 w-6 text-white group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-black group-hover:text-white">{step.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-200 transition-colors">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-black z-10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors text-lg font-medium"
          >
            <MessageCircle className="h-5 w-5" />
            Start Chatting on WhatsApp
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Connect your wallet first, then chat to start saving
          </p>
        </motion.div>
      </div>
    </section>
  )
}
