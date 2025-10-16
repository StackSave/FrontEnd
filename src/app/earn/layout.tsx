import { Sidebar } from '@/components/earn/navigation'
import { EarnHeader } from '@/components/earn/EarnHeader'

export default function EarnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <EarnHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
