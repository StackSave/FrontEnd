'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Droplets, Wallet, Vault, Building2, Menu, X } from 'lucide-react'
import { useState } from 'react'

const tabs = [
  { name: 'Explore', href: '/earn/explore', icon: Compass },
  { name: 'Faucet', href: '/earn/faucet', icon: Droplets },
  { name: 'Deposit', href: '/earn/deposit', icon: Wallet },
  { name: 'Vault', href: '/earn/vault', icon: Vault },
  { name: 'Protocol', href: '/earn/protocol', icon: Building2 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  // Check if current path is active (exact match or starts with for nested routes)
  const isActive = (href: string) => {
    if (href === '/earn/explore') {
      return pathname === '/earn' || pathname === '/earn/explore' || pathname.startsWith('/earn/explore/')
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white border-r-2 border-gray-200 transition-all duration-300 ease-in-out z-30 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-end p-4 border-b border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.href)

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-all relative group
                  ${active
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }
                `}
                title={!isExpanded ? tab.name : undefined}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r" />
                )}

                {/* Icon */}
                <Icon className={`h-5 w-5 flex-shrink-0 ${isExpanded ? '' : 'mx-auto'}`} />

                {/* Text Label */}
                {isExpanded && (
                  <span className="font-medium text-sm whitespace-nowrap">
                    {tab.name}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {tab.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Spacer to prevent content from going under sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      />
    </>
  )
}
