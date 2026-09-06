import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { DoctorsPageClient } from '@/components/pages/DoctorsPageClient'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Our Doctors & Specialists — SRI DKK Hospital Kanchipuram',
  description:
    '30+ experienced doctors at SRI DKK Hospital Kanchipuram — dental specialists, dermatologists, gynaecologists, paediatricians, orthopaedic surgeons, and general physicians. Book an appointment today.',
  openGraph: {
    title: 'Our Doctors | SRI DKK Hospital Kanchipuram',
    description: '30+ specialists in dental, aesthetics, gynaecology, child care, orthopaedics, and general medicine.',
    url: '/doctors',
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sridkkhospital.com'}/doctors` },
}

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    where: { isActive: true },
  })

  // JSON-LD for Physician structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Doctors at SRI DKK Hospital',
    itemListElement: doctors.map((doc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Physician',
        name: doc.name,
        jobTitle: doc.role,
        image: doc.image,
        worksFor: {
          '@type': 'MedicalOrganization',
          name: 'SRI D.K.K. Multispeciality Hospital',
          address: { '@type': 'PostalAddress', addressLocality: 'Kanchipuram', addressRegion: 'Tamil Nadu' },
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DoctorsPageClient doctors={doctors} />
    </>
  )
}
