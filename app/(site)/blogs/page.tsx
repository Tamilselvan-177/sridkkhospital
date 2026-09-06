import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { InfoCard } from '@/components/common/InfoCard'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Blog Insights — Health & Medical Aesthetics | SRI DKK Hospital',
  description: 'Read our latest articles on dental care, skin health, hair restoration, and general wellness by the specialists at SRI DKK Hospital Kanchipuram.',
}

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    where: { isActive: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <section className="container-shell rounded-[2rem] bg-gradient-to-b from-white/80 to-violet-50/70 py-14 md:py-18">
      <SectionHeader
        eyebrow="Blog Insights"
        title="Health and medical aesthetic articles"
        description="Stay updated with the latest in medical care, treatments, and healthy living."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {blogs.map((blog) => (
          <Reveal key={blog.slug}>
            <InfoCard
              title={blog.title}
              image={blog.image}
              href={`/blogs/${blog.slug}`}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
