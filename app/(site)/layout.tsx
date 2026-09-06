'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { UrgencyBanner } from '@/components/sections/UrgencyBanner'
import { SocialProofTicker } from '@/components/sections/SocialProofTicker'
import { FloatingWhatsAppButton } from '@/components/layout/FloatingWhatsAppButton'
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA'
import { DiscountStickyBanner } from '@/components/layout/DiscountStickyBanner'
import { siteData } from '@/data/siteData'

// Heavy components — dynamically imported to keep initial JS bundle lean
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const ChatBot = dynamic(() => import('@/components/layout/ChatBot'), { ssr: false })
const ReviewRewardWidget = dynamic(() => import('@/components/layout/ReviewRewardWidget'), { ssr: false })

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <UrgencyBanner />
      <Navbar />
      <SocialProofTicker />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsAppButton whatsapp={siteData.contact.whatsapp} />
      <StickyMobileCTA phone={siteData.contact.phone} whatsapp={siteData.contact.whatsapp} />
      <ChatBot />
      <ReviewRewardWidget />
      <DiscountStickyBanner />
    </>
  )
}
