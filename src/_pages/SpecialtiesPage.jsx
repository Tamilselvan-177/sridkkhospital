import { useState } from "react"
import { InfoCard } from "../components/common/InfoCard"
import { DetailModal } from "../components/common/DetailModal"
import { SectionHeader } from "../components/common/SectionHeader"
import { Reveal } from "../components/motion/Reveal"
import { siteData } from "../data/siteData"

export function SpecialtiesPage() {
  const [activeModal, setActiveModal] = useState(null)

  return (
    <>
      <section className="container-shell rounded-[2rem] bg-gradient-to-b from-white/80 to-indigo-50/70 py-14 md:py-18">
        <SectionHeader
          eyebrow="Specialties"
          title="Specialized departments under one trusted roof"
          description="Click any specialty to see what's included, what to expect, and how to book — all in seconds."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {siteData.specialties.map((item) => (
            <Reveal key={item.slug}>
              <InfoCard
                title={item.name}
                description={item.description}
                image={item.image}
                imagePosition={item.imagePosition}
                onLearnMore={() => setActiveModal(item)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {activeModal && (
        <DetailModal
          item={activeModal}
          type="specialty"
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}
