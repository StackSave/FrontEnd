import { Header } from '@/components/landing/Header'
import { HeroSection } from '@/components/landing/HeroSection'
import { WhatsAppSection } from '@/components/landing/WhatsAppSection'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <WhatsAppSection />
        <Footer />
      </main>
    </>
  )
}
