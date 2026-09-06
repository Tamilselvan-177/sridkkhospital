import type { Metadata } from 'next'
import { CareersForm } from '@/components/forms/InquiryForms'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Careers — Build your career with SRI DKK Hospital',
  description: 'Join our team of expert doctors, nurses, and medical staff in Kanchipuram.',
}

export default function CareersPage() {
  return (
    <section className="container-shell rounded-[2rem] bg-gradient-to-b from-white/80 to-sky-50/70 py-14 md:py-18">
      <SectionHeader
        eyebrow="Careers"
        title="Build your career with Sri D.K.K. Hospital"
        description="Apply for open healthcare and support roles through the preserved careers workflow."
      />
      <Reveal className="mx-auto max-w-3xl">
        <CareersForm />
      </Reveal>
    </section>
  )
}
