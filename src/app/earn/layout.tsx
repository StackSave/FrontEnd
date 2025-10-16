import { TabNavigation } from '@/components/earn/navigation'

export default function EarnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <TabNavigation />
      {children}
    </div>
  )
}
