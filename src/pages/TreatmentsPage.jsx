import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  MessageCircleMore,
  PhoneCall,
  ShieldCheck,
  Star,
  ChevronRight,
  Sparkles,
  Stethoscope,
} from "lucide-react"
import { SectionHeader } from "../components/common/SectionHeader"
import { Reveal } from "../components/motion/Reveal"
import { SuccessStories } from "../components/sections/SuccessStories"
import { siteData } from "../data/siteData"
import { toWhatsAppLink } from "../utils/forms"

// ─── Category grouping ───────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "dental",
    label: "🦷 Dental",
    color: "sky",
    slugs: [
      "root-canal-treatment",
      "dental-implants",
      "dentures",
      "orthodontic-treatments",
      "tooth-extraction",
      "smile-designing",
    ],
  },
  {
    id: "aesthetics",
    label: "✨ Medical Aesthetics",
    color: "purple",
    slugs: ["botox", "fillers", "laser-hair-removal", "skin-lightening-treatments"],
  },
  {
    id: "hair",
    label: "💆 Hair Restoration",
    color: "amber",
    slugs: ["hair-prp", "hair-gfc"],
  },
]

const ALL_SLUGS = CATEGORIES.flatMap((c) => c.slugs)

// ─── Treatment detail card ───────────────────────────────────────────────────
function TreatmentCard({ item, index }) {
  const waLink = toWhatsAppLink(
    siteData.contact.whatsapp,
    `Hi! I'm interested in ${item.name} at SRI DKK Hospital. Please share details and availability.`,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(2,132,199,0.3)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(2,132,199,0.35)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/50 to-transparent" />
        {/* Free tag for dental */}
        {item.slug === "root-canal-treatment" || item.slug === "dental-implants" ? (
          <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white shadow">
            FREE CONSULT
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>

        {/* Trust signals */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
            <ShieldCheck className="h-3 w-3" /> Expert-led
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <Star className="h-3 w-3 fill-emerald-500 text-emerald-500" /> Highly rated
          </span>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 pt-1">
          <Link
            to={`/treatments/${item.slug}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            Learn More <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700"
          >
            <MessageCircleMore className="h-3.5 w-3.5" />
            Enquire
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const treatmentMap = Object.fromEntries(siteData.treatments.map((t) => [t.slug, t]))

  const visibleTreatments =
    activeTab === "all"
      ? siteData.treatments
      : siteData.treatments.filter((t) =>
        CATEGORIES.find((c) => c.id === activeTab)?.slugs.includes(t.slug),
      )

  return (
    <>
      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900 py-16 text-white">
        <div className="container-shell text-center">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-200">
              <Stethoscope className="h-3.5 w-3.5" />
              Evidence-Based Treatments
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Treatments designed around <span className="text-sky-300">your outcomes</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base text-sky-100 md:text-lg">
              Every treatment plan is personalised. We use your diagnosis, not a template.
              Trusted by 150,000+ patients across Kanchipuram.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact#appointment"
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-900 shadow-lg transition hover:-translate-y-0.5"
              >
                Book Free Consultation →
              </Link>
              <a
                href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <PhoneCall className="h-4 w-4" />
                {siteData.contact.phone}
              </a>
            </div>
          </Reveal>

          {/* Trust strip */}
          <Reveal className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { icon: ShieldCheck, text: "Certified specialists" },
              { icon: Star, text: "98% satisfaction rate" },
              { icon: Clock, text: "Fast appointment slots" },
              { icon: Sparkles, text: "FDA-approved methods" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
              >
                <Icon className="h-4 w-4 text-sky-300" />
                {text}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Category Tabs ─────────────────────────────────────────────────── */}
      <section className="container-shell py-10">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === "all"
              ? "bg-sky-700 text-white shadow-md"
              : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
              }`}
          >
            All Treatments ({siteData.treatments.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === cat.id
                ? "bg-sky-700 text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {visibleTreatments.map((item, i) => (
              <TreatmentCard key={item.slug} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Success Stories ───────────────────────────────────────────────── */}
      <SuccessStories />

      {/* ── Bottom CTA band ───────────────────────────────────────────────── */}
      <section className="container-shell pb-14">
        <Reveal className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 p-8 text-center text-white shadow-xl">
          <Sparkles className="mx-auto mb-3 h-7 w-7 text-emerald-200" />
          <h2 className="mb-2 text-2xl font-bold">Not sure which treatment is right for you?</h2>
          <p className="mx-auto mb-6 max-w-lg text-sm text-emerald-100">
            Our specialists will assess your condition honestly and recommend only what
            genuinely helps. No pressure, no unnecessary procedures.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact#appointment"
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow transition hover:-translate-y-0.5"
            >
              Book a Free Consultation →
            </Link>
            <a
              href={toWhatsAppLink(
                siteData.contact.whatsapp,
                "Hi! I need guidance on which treatment is right for my condition. Can we discuss?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <MessageCircleMore className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
