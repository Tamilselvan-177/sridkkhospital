import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { TreatmentDetailPageClient } from '@/components/pages/TreatmentDetailPageClient'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await prisma.treatment.findUnique({
    where: { slug },
  })
  
  if (!treatment) {
    return { title: 'Treatment Not Found' }
  }

  return {
    title: `${treatment.name} | SRI DKK Hospital Kanchipuram`,
    description: treatment.description,
    openGraph: {
      title: `${treatment.name} | SRI DKK Hospital`,
      description: treatment.description,
      images: [{ url: treatment.image }],
    },
  }
}

export async function generateStaticParams() {
  const treatments = await prisma.treatment.findMany({
    where: { isActive: true },
    select: { slug: true },
  })
  
  return treatments.map((t) => ({
    slug: t.slug,
  }))
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = await prisma.treatment.findUnique({
    where: { slug },
  })

  if (!treatment || !treatment.isActive) {
    notFound()
  }

  return <TreatmentDetailPageClient treatment={treatment} />
}
