import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sridkkhospital.com' // Replace with your actual domain

  // Static routes
  const routes = [
    '',
    '/about',
    '/treatments',
    '/specialties',
    '/doctors',
    '/careers',
    '/contact',
    '/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic routes (Treatments) — gracefully falls back if DB unreachable at build time
  let treatmentRoutes: MetadataRoute.Sitemap = []
  try {
    const treatments = await prisma.treatment.findMany({ select: { slug: true } })
    treatmentRoutes = treatments.map((treatment) => ({
      url: `${baseUrl}/treatments/${treatment.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    // Use fallback slugs if DB is unavailable during build
    const fallback = ['root-canal-treatment','dental-implants','dentures','orthodontic-treatments','tooth-extraction','smile-designing','botox','skin-brightening','hair-prp','laser-hair-removal']
    treatmentRoutes = fallback.map((slug) => ({
      url: `${baseUrl}/treatments/${slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  }

  return [...routes, ...treatmentRoutes]
}
