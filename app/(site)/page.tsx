import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { siteData } from '@/data/siteData'
import HomePageClient from '@/components/pages/HomePageClient'

export const revalidate = 86400 // ISR: revalidate daily

export const metadata: Metadata = {
  title: 'SRI D.K.K. Hospital — Trusted Multispeciality Care in Kanchipuram',
  description:
    'Sri D.K.K. Multispeciality Hospital in Kanchipuram — dental, skin, hair, gynaecology, child care, orthopaedics. 150,000+ patients treated. Open Mon–Sun 10am–8pm.',
  openGraph: {
    title: 'SRI D.K.K. Hospital Kanchipuram — Dental, Aesthetics, Gynaecology & More',
    description:
      'Expert multispeciality care: dentistry, medical aesthetics, child care, gynaecology, orthopaedics. Book a free consultation today.',
    url: '/',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://sridkkhospital.com',
  },
}

export default async function HomePage() {
  // Fetch data server-side from MongoDB via Prisma
  const [treatments, specialties, blogs] = await Promise.all([
    prisma.treatment.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.specialty.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.blog.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    }),
  ])

  return (
    <HomePageClient
      treatments={treatments}
      specialties={specialties}
      blogs={blogs}
      siteData={siteData}
    />
  )
}
