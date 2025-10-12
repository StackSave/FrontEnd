'use client'

import { useState } from 'react'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white">
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-black" />
            <span className="font-bold text-xl text-black">StackSave</span>
          </a>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Docs
            </a>
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="#"
              className="block text-sm font-medium text-gray-600 hover:text-black transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
            <div className="pt-2">
              <WalletConnect />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
