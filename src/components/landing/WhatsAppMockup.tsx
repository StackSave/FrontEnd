'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Check } from 'lucide-react'

export function WhatsAppMockup() {
  const messages = [
    { type: 'user', text: 'Hey StackSave! I want to save 100 USDC', time: '10:23' },
    { type: 'bot', text: 'Great! Let me help you set that up. What\'s your goal name?', time: '10:23' },
    { type: 'user', text: 'Emergency Fund', time: '10:24' },
    { type: 'bot', text: '✓ Goal created! Your Emergency Fund is now active. You can deposit anytime by saying "deposit 100 USDC to Emergency Fund"', time: '10:24' },
    { type: 'user', text: 'Show my balance', time: '10:25' },
    { type: 'bot', text: 'Emergency Fund: 100 USDC\n\nYou\'re doing great! 🎯', time: '10:25' },
  ]

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-black rounded-[3rem] p-4 shadow-2xl">
        {/* Screen */}
        <div className="bg-gray-50 rounded-[2.5rem] overflow-hidden">
          {/* WhatsApp Header */}
          <div className="bg-black text-white px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-black" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">StackSave Bot</div>
              <div className="text-xs text-gray-300">Online</div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 min-h-[400px] bg-white">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${
                    message.type === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-gray-200 text-black rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <div
                    className={`flex items-center gap-1 justify-end mt-1 text-xs ${
                      message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    <span>{message.time}</span>
                    {message.type === 'user' && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-t border-gray-200">
            <div className="flex-1 bg-white rounded-full px-4 py-2">
              <span className="text-sm text-gray-400">Type a message...</span>
            </div>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-4 -right-4 bg-black text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg"
      >
        No app needed! 📱
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute -bottom-4 -left-4 bg-white border-2 border-black px-3 py-2 rounded-lg text-xs font-medium shadow-lg"
      >
        Save on the go! 🚀
      </motion.div>
    </div>
  )
}
