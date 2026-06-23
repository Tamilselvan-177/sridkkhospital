import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { MessageCircleMore, PhoneCall, PlaySquare, ShieldCheck, Star, Stethoscope, Timer, TrendingUp, Award, Zap } from "lucide-react"
import { InfoCard } from "../components/common/InfoCard"
import { DetailModal } from "../components/common/DetailModal"
import { MapLocationCard } from "../components/common/MapLocationCard"
import { SectionHeader } from "../components/common/SectionHeader"
import { CallbackForm } from "../components/forms/InquiryForms"
import { Reveal } from "../components/motion/Reveal"
import { HeroSlider } from "../components/layout/HeroSlider"
import { TestimonialsCarousel } from "../components/sections/TestimonialsCarousel"
import { TransformationsSection } from "../components/sections/TransformationsSection"
import { SuccessStories } from "../components/sections/SuccessStories"
import { siteData } from "../data/siteData"

export function HomePage() {
  const reduceMotion = useReducedMotion()
  const [activeModal, setActiveModal] = useState(null) // { item, type }

  const statMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
      }

  return (
    <>
      {/* ── Hero Slider ───────────────────────────────────────────────────── */}
      <HeroSlider />

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      {activeModal && (
        <DetailModal
          item={activeModal.item}
          type={activeModal.type}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* ── Stats Bar — social proof numbers above the fold ──────────────── */}

      <section className="container-shell pb-16">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {siteData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              {...statMotion}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-center shadow-sm backdrop-blur"
            >
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-shell rounded-[2rem] bg-gradient-to-b from-white/70 to-sky-50/70 py-12">
        <SectionHeader
          eyebrow="Treatments"
          title="Stop suffering in silence — find your treatment today"
          description="Every treatment journey is personalized for safety, comfort, and predictable outcomes. Trusted by 150,000+ patients."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {siteData.treatments.slice(0, 6).map((item) => (
            <Reveal key={item.slug} direction={item.slug.length % 2 ? "left" : "right"}>
              <InfoCard
                title={item.name}
                description={item.description}
                image={item.image}
                onLearnMore={() => setActiveModal({ item, type: "treatment" })}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/treatments"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400"
          >
            View All Treatments
          </Link>
        </div>
      </section>

      <section className="container-shell py-12">
        <SectionHeader
          eyebrow="Specialties"
          title="Every specialist you need — under one roof"
          description="Integrated specialists and diagnostics help you move faster from symptoms to solutions. No referrals, no delays."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {siteData.specialties.map((item) => (
            <Reveal key={item.slug} direction={item.slug.length % 2 ? "right" : "left"}>
              <InfoCard
                title={item.name}
                image={item.image}
                onLearnMore={() => setActiveModal({ item, type: "specialty" })}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-shell rounded-[2rem] bg-gradient-to-b from-white/70 to-indigo-50/70 py-12">
        <SectionHeader
          eyebrow="Patient Safety"
          title="Your safety isn't optional — it's our standard"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {siteData.patientSafety.map((point) => (
            <Reveal
              key={point}
              direction="left"
              className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-5"
            >
              <p className="font-medium text-slate-800">{point}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-6 py-12 md:grid-cols-2">
        <Reveal className="rounded-3xl bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-800 p-8 text-white shadow-xl shadow-sky-900/20">
          <p className="mb-2 inline-flex rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            🎁 Free Consultation Available
          </p>
          <h2 className="mt-3 text-3xl font-bold">Don't wait until it hurts.</h2>
          <p className="mt-3 text-sky-100">
            Most dental and health issues are silent until they become expensive. Catch problems
            early with a free specialist consultation — zero cost, zero obligation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-900"
            >
              Call {siteData.contact.phone}
            </a>
            <Link
              to="/contact#appointment"
              className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white"
            >
              Book Free Consultation →
            </Link>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-sky-300">
            <Timer className="h-3.5 w-3.5" />
            ⏱ Only a few free slots left today — act now
          </p>
        </Reveal>
        <Reveal id="callback">
          <CallbackForm />
        </Reveal>
      </section>

      <section className="container-shell py-12">
        <SectionHeader eyebrow="Blogs" title="Latest Insights" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {siteData.blogs.map((item) => (
            <Reveal key={item.slug}>
              <InfoCard
                title={item.title}
                image={item.image}
                href={`https://sridkkhospital.com/${item.slug}/`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Verified Patient Reviews — Auto-rotating testimonials carousel ─ */}
      <TestimonialsCarousel />

      {/* ── Patient Transformations — Drag-to-compare before/after slider ─── */}
      <TransformationsSection />

      {/* ── Before & After Success Stories ───────────────────────────────── */}
      <SuccessStories />

      <section className="container-shell py-12">
        <SectionHeader
          eyebrow="YouTube Channel"
          title="Watch videos from SRI DKK Hospital"
          description="Follow our channel and watch recent short videos from the hospital."
        />
        <div className="mb-6 text-center">
          <a
            href={siteData.social.youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <PlaySquare className="mr-2 h-4 w-4" />
            Open YouTube Channel
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {siteData.youtubeVideos.map((video) => (
            <Reveal key={video.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <iframe
                className="aspect-video w-full"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="p-4">
                <p className="font-semibold text-slate-900">{video.title}</p>
                <p className="text-xs text-slate-500">Duration: {video.duration}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-shell rounded-[2rem] bg-gradient-to-b from-white/80 to-sky-50/70 py-12">
        <SectionHeader
          eyebrow="Hospital Location"
          title="Visit our Kanchipuram hospital"
          description="Map location added similar to your existing website experience."
        />
        <Reveal direction="right" className="overflow-hidden rounded-3xl">
          <MapLocationCard
            mapsEmbed={siteData.contact.mapsEmbed}
            address={siteData.contact.address}
            destination={siteData.contact.mapDestination}
            coordinates={siteData.contact.mapCoordinates}
          />
        </Reveal>
      </section>
    </>
  )
}
