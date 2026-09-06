import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import SpecialtiesPageClient from '@/components/pages/SpecialtiesPageClient'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Specialties — Medical Departments | SRI DKK Hospital',
  description: 'Specialized departments including Dental, Medical Aesthetics, Gynaecology, Paediatrics, and Orthopaedics under one trusted roof in Kanchipuram.',
}

export default async function SpecialtiesPage() {
  const specialties = await prisma.specialty.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  })

  return <SpecialtiesPageClient specialties={specialties} />
}
