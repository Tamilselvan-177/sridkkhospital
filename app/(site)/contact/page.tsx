import type { Metadata } from 'next'
import { siteData } from '@/data/siteData'
import { ContactPageClient } from '@/components/pages/ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact & Appointments — SRI DKK Hospital Kanchipuram',
  description:
    'Book an appointment, request a callback, or contact SRI DKK Hospital in Kanchipuram. We are available Monday to Sunday, 10 AM to 8 PM. Call +91 9790122269.',
  openGraph: {
    title: 'Contact & Appointments | SRI DKK Hospital',
    description: 'Book an appointment or reach us directly. Open Mon–Sun, 10am–8pm.',
    url: '/contact',
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sridkkhospital.com'}/contact` },
}

export default function ContactPage() {
  return <ContactPageClient siteData={siteData} />
}
