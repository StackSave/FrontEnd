'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Droplets, Wallet, Vault, Building2 } from 'lucide-react'

const tabs = [
  { name: 'Explore', href: '/earn/explore', icon: Compass },
  { name: 'Faucet', href: '/earn/faucet', icon: Droplets },
  { name: 'Deposit', href: '/earn/deposit', icon: Wallet },
  { name: 'Vault', href: '/earn/vault', icon: Vault },
  { name: 'Protocol', href: '/earn/protocol', icon: Building2 },
]

export function TabNavigation() {
  const pathname = usePathname()

  // Check if current path is active (exact match or starts with for nested routes)
  const isActive = (href: string) => {
    if (href === '/earn/explore') {
      return pathname === '/earn' || pathname === '/earn/explore' || pathname.startsWith('/earn/explore/')
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div className="border-b border-gray-200">
      <div className="container px-4 md:px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.href)

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                  ${active
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
