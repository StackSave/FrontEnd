'use client'

import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only showing wallet state after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Show static button during SSR to match initial client render
    return (
      <Button className="gap-2 bg-primary hover:bg-primary/90" disabled>
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <Button
        onClick={() => disconnect()}
        variant="outline"
        className="gap-2"
      >
        <Wallet className="h-4 w-4" />
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    )
  }

  return (
    <Button
      onClick={() => connect({ connector: connectors[0] })}
      className="gap-2 bg-primary hover:bg-primary/90"
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  )
}
