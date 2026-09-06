import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { TreatmentDetailPageClient } from '@/components/pages/TreatmentDetailPageClient'

export const revalidate = 86400

// Fallback slugs used when DB is unavailable at build time (Vercel SSG phase)
const FALLBACK_SLUGS = [
  'root-canal-treatment',
  'dental-implants',
  'dentures',
  'orthodontic-treatments',
  'tooth-extraction',
  'smile-designing',
  'botox',
  'skin-brightening',
  'hair-prp',
  'laser-hair-removal',
  'gynaecology',
  'child-care',
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const treatment = await prisma.treatment.findUnique({ where: { slug } })
    if (!treatment) return { title: 'Treatment Not Found' }
    return {
      title: `${treatment.name} | SRI DKK Hospital Kanchipuram`,
      description: treatment.description,
      openGraph: {
        title: `${treatment.name} | SRI DKK Hospital`,
        description: treatment.description,
        images: [{ url: treatment.image }],
      },
    }
  } catch {
    return { title: 'Treatment | SRI DKK Hospital Kanchipuram' }
  }
}

export async function generateStaticParams() {
  try {
    const treatments = await prisma.treatment.findMany({
      where: { isActive: true },
      select: { slug: true },
    })
    if (treatments.length > 0) {
      return treatments.map((t) => ({ slug: t.slug }))
    }
  } catch (err) {
    console.warn('[generateStaticParams] DB unavailable, using fallback slugs:', err)
  }
  // Fallback: use known slugs so the build succeeds even without DB access
  return FALLBACK_SLUGS.map((slug) => ({ slug }))
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const treatment = await prisma.treatment.findUnique({ where: { slug } })
    if (!treatment || !treatment.isActive) notFound()
    return <TreatmentDetailPageClient treatment={treatment} />
  } catch {
    notFound()
  }
}
