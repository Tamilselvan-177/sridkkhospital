import { InfoCard } from "../components/common/InfoCard"
import { SectionHeader } from "../components/common/SectionHeader"
import { Reveal } from "../components/motion/Reveal"
import { siteData } from "../data/siteData"

export function BlogsPage() {
  return (
    <section className="container-shell rounded-[2rem] bg-gradient-to-b from-white/80 to-violet-50/70 py-14 md:py-18">
      <SectionHeader
        eyebrow="Blog Insights"
        title="Health and medical aesthetic articles"
        description="Content mapped from the current website and organized for better readability."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {siteData.blogs.map((blog) => (
          <Reveal key={blog.slug}>
            <InfoCard
              title={blog.title}
              image={blog.image}
              href={`https://sridkkhospital.com/${blog.slug}/`}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
