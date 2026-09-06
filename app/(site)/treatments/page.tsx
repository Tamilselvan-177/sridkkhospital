import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import TreatmentsPageClient from '@/components/pages/TreatmentsPageClient'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'All Treatments — Dental, Aesthetics & Hair Restoration',
  description:
    'Browse all treatments at SRI DKK Hospital Kanchipuram — root canal, dental implants, smile designing, Botox, fillers, hair PRP, GFC, laser hair removal, skin lightening. Free dental consultation available.',
  openGraph: {
    title: 'Treatments | SRI DKK Hospital Kanchipuram',
    description:
      'Expert dental, aesthetic, and hair restoration treatments. Trusted by 150,000+ patients.',
    url: '/treatments',
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sridkkhospital.com'}/treatments` },
}

export default async function TreatmentsPage() {
  const treatments = await prisma.treatment.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  })

  return <TreatmentsPageClient treatments={treatments} />
}
