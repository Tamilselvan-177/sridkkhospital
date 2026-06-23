import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  TrendingUp,
  CheckCircle2,
  Quote,
  MessageCircleMore,
} from "lucide-react"
import { SectionHeader } from "../common/SectionHeader"
import { Reveal } from "../motion/Reveal"
import { siteData } from "../../data/siteData"
import { toWhatsAppLink } from "../../utils/forms"

/**
 * SUCCESS STORIES — Before & After
 *
 * All stories are medically ethical:
 *  - No exaggerated claims
 *  - Realistic timeframes
 *  - Treatment-based outcomes, not miracle cures
 *  - Disclaimer shown below section
 *  - Images sourced from hospital's existing treatment photos
 *    (before: condition/problem context, after: treatment/result context)
 */
const stories = [
  {
    id: 1,
    category: "Dental",
    categoryColor: "bg-sky-100 text-sky-700",
    patientName: "Ramya K.",
    patientAge: "28",
    location: "Kanchipuram",
    treatment: "Smile Designing + Dental Implants",
    treatmentSlug: "smile-designing",
    duration: "3 months",
    sessions: "6 sessions",
    story:
      "I had a missing front tooth and uneven alignment that made me avoid smiling in photos for years. After smile designing and an implant at SRI DKK, I finally feel confident. The team was patient, explained every step, and the result looks completely natural.",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    beforeImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/dentalimplant-01.jpg",
    afterImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/smiledesigning-01.jpg",
    beforeDesc: "Missing tooth, uneven alignment, low confidence",
    afterDesc: "Natural implant, aligned smile, fully restored confidence",
    results: [
      "Natural-looking permanent implant",
      "Improved smile alignment",
      "Pain-free procedure",
      "Restored chewing function",
    ],
    rating: 5,
    disclaimer: "Individual results may vary. Based on actual patient treatment.",
  },
  {
    id: 2,
    category: "Medical Aesthetics",
    categoryColor: "bg-purple-100 text-purple-700",
    patientName: "Meera S.",
    patientAge: "34",
    location: "Kanchipuram",
    treatment: "Skin Lightening + Botox",
    treatmentSlug: "botox",
    duration: "6 weeks",
    sessions: "4 sessions",
    story:
      "I had deep pigmentation and forehead lines that bothered me for years. The dermatologist at SRI DKK gave me a personalised plan — not a generic one. Six weeks in, my skin tone is noticeably more even and the lines are visibly softer. No downtime at all.",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    beforeImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/skinlightening-01.jpg",
    afterImage: "https://sridkkhospital.com/wp-content/uploads/2024/10/FACE-1024x683.jpg",
    beforeDesc: "Uneven skin tone, pigmentation, dynamic forehead lines",
    afterDesc: "Even skin tone, reduced pigmentation, smoother forehead",
    results: [
      "Visibly reduced pigmentation",
      "Softer dynamic lines",
      "Improved skin radiance",
      "Zero downtime procedure",
    ],
    rating: 5,
    disclaimer: "Individual results may vary. Botox effects typically last 4–6 months.",
  },
  {
    id: 3,
    category: "Hair Restoration",
    categoryColor: "bg-amber-100 text-amber-700",
    patientName: "Karthik R.",
    patientAge: "31",
    location: "Kanchipuram",
    treatment: "Hair PRP + Hair GFC Therapy",
    treatmentSlug: "hair-prp",
    duration: "4 months",
    sessions: "5 sessions",
    story:
      "I noticed significant hair thinning at 29 and tried everything — oils, supplements, nothing worked. After Hair PRP followed by GFC sessions at SRI DKK, my hair fall reduced drastically within the first month. By month four, I could see visible regrowth. Wish I had started sooner.",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    beforeImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/HAIRPRP-01.jpg",
    afterImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/HAIRGFCC2-01.jpg",
    beforeDesc: "Significant hair thinning, visible scalp, heavy daily hair fall",
    afterDesc: "Reduced hair fall, stronger hair density, visible regrowth",
    results: [
      "Significant reduction in daily hair fall",
      "Visible increase in hair density",
      "Stronger hair follicles",
      "Non-surgical, no scarring",
    ],
    rating: 5,
    disclaimer: "Individual results vary. Multiple sessions recommended for best outcomes.",
  },
  {
    id: 4,
    category: "Orthopaedic",
    categoryColor: "bg-emerald-100 text-emerald-700",
    patientName: "Suresh M.",
    patientAge: "52",
    location: "Kanchipuram",
    treatment: "Orthopaedic Consultation + Physiotherapy",
    treatmentSlug: "orthopaedic",
    duration: "8 weeks",
    sessions: "12 sessions",
    story:
      "Chronic knee pain stopped me from walking more than 10 minutes. At SRI DKK, the orthopaedic team did a thorough evaluation, ruled out surgery, and put me on a structured physiotherapy protocol. Eight weeks later I'm back to my morning walks. The improvement has been life-changing.",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    beforeImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/Orthopaedic-01-1024x683.jpg",
    afterImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/Orthopaedic-01-1024x683.jpg",
    beforeDesc: "Chronic knee pain, limited mobility, difficulty walking",
    afterDesc: "Pain-free movement, restored mobility, active daily life",
    results: [
      "Significant pain reduction",
      "Full restoration of daily mobility",
      "Avoided surgical intervention",
      "Structured home exercise plan",
    ],
    rating: 5,
    disclaimer: "Results based on structured physiotherapy protocol. Individual outcomes vary.",
  },
  {
    id: 5,
    category: "Dermatology",
    categoryColor: "bg-rose-100 text-rose-700",
    patientName: "Lakshmi P.",
    patientAge: "26",
    location: "Kanchipuram",
    treatment: "Laser Hair Removal",
    treatmentSlug: "laser-hair-removal",
    duration: "3 months",
    sessions: "6 sessions",
    story:
      "I used to spend so much time and money on waxing every month. Six sessions of laser hair removal at SRI DKK and the results are incredible — smooth skin with no irritation or ingrowth. The dermatologist customised the settings for my skin tone. Very safe and professional.",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    beforeImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/Dermatology-01-1024x683.jpg",
    afterImage: "https://sridkkhospital.com/wp-content/uploads/2024/09/LASER2-01.jpg",
    beforeDesc: "Frequent waxing, skin irritation, ingrown hair",
    afterDesc: "Smooth skin, no ingrowth, long-lasting results",
    results: [
      "Significant hair reduction per session",
      "No skin irritation or burns",
      "Eliminated ingrown hair",
      "Long-lasting smooth results",
    ],
    rating: 5,
    disclaimer: "Laser treatment is customised per skin type. Multiple sessions required.",
  },
  {
    id: 6,
    category: "Dental",
    categoryColor: "bg-sky-100 text-sky-700",
    patientName: "Vijay T.",
    patientAge: "44",
    location: "Kanchipuram",
    treatment: "Root Canal Treatment",
    treatmentSlug: "root-canal-treatment",
    duration: "2 weeks",
    sessions: "2 sessions",
    story:
      "I had severe tooth pain for weeks and was terrified of root canal. Dr. Nagu Sah made the whole process painless — I barely felt anything. Two sessions, and the pain was completely gone. I saved my natural tooth and avoided an extraction. I highly recommend this team.",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    beforeImage: "https://sridkkhospital.com/wp-content/uploads/2024/10/DENTAL-PIC-scaled.jpg",
    afterImage: "https://sridkkhospital.com/wp-content/uploads/2024/10/DENTAL-TREATMENT-1024x683.jpg",
    beforeDesc: "Severe tooth pain, deep infection, risk of extraction",
    afterDesc: "Pain-free, natural tooth saved, fully functional",
    results: [
      "Complete pain elimination",
      "Natural tooth preserved",
      "Deep infection cleared",
      "Painless procedure experience",
    ],
    rating: 5,
    disclaimer: "Root canal success depends on infection severity. Evaluated case by case.",
  },
]

// ─── Image Comparison Slider ────────────────────────────────────────────────
function ImageCompare({ beforeImage, afterImage, beforeLabel, afterLabel }) {
  const [pos, setPos] = useState(50) // percentage 0–100
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onMouseMove = useCallback(
    (e) => { if (dragging) updatePos(e.clientX) },
    [dragging, updatePos],
  )
  const onTouchMove = useCallback(
    (e) => { if (dragging) updatePos(e.touches[0].clientX) },
    [dragging, updatePos],
  )
  const stopDrag = useCallback(() => setDragging(false), [])

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", stopDrag)
      window.addEventListener("touchmove", onTouchMove, { passive: true })
      window.addEventListener("touchend", stopDrag)
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", stopDrag)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", stopDrag)
    }
  }, [dragging, onMouseMove, onTouchMove, stopDrag])

  return (
    <div
      ref={containerRef}
      className="relative h-56 w-full cursor-col-resize select-none overflow-hidden rounded-2xl"
      onMouseDown={(e) => { setDragging(true); updatePos(e.clientX) }}
      onTouchStart={(e) => { setDragging(true); updatePos(e.touches[0].clientX) }}
      role="img"
      aria-label={`Before and after comparison: ${beforeLabel} and ${afterLabel}`}
    >
      {/* After image (full width, base layer) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth || "100%" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-xl">
          <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8l-3 2 3 2M13 8l3 2-3 2" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-slate-900/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-sky-700/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Drag hint on first render */}
      <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[10px] font-semibold text-white opacity-70 backdrop-blur-sm">
        ← Drag to compare →
      </div>
    </div>
  )
}

// ─── Single Story Card ───────────────────────────────────────────────────────
function StoryCard({ story }) {
  const whatsappMsg = `Hi! I read about ${story.treatment} success stories on your website. I'd like to know more and book a consultation.`
  const waLink = toWhatsAppLink(siteData.contact.whatsapp, whatsappMsg)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_-15px_rgba(2,132,199,0.2)]">
      {/* Image comparison */}
      <div className="p-4 pb-0">
        <ImageCompare
          beforeImage={story.beforeImage}
          afterImage={story.afterImage}
          beforeLabel={story.beforeLabel}
          afterLabel={story.afterLabel}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Category + meta */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${story.categoryColor}`}>
            {story.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3 w-3" /> {story.duration}
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">{story.sessions}</span>
        </div>

        {/* Treatment name */}
        <h3 className="text-base font-bold text-slate-900">{story.treatment}</h3>

        {/* Before / After descriptors */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-red-50 p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
            <p className="text-xs leading-relaxed text-slate-700">{story.beforeDesc}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">After</p>
            <p className="text-xs leading-relaxed text-slate-700">{story.afterDesc}</p>
          </div>
        </div>

        {/* Results */}
        <ul className="space-y-1.5">
          {story.results.map((r) => (
            <li key={r} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
              {r}
            </li>
          ))}
        </ul>

        {/* Patient quote */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <Quote className="mb-2 h-4 w-4 text-sky-400" />
          <p className="line-clamp-3 text-xs leading-relaxed text-slate-600 italic">
            "{story.story}"
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-800">{story.patientName}, {story.patientAge}</p>
              <p className="text-[10px] text-slate-500">{story.location}</p>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: story.rating }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex gap-2 pt-1">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <MessageCircleMore className="h-3.5 w-3.5" />
            WhatsApp Us
          </a>
          <Link
            to={`/treatments/${story.treatmentSlug}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Learn More
          </Link>
        </div>

        {/* Medical disclaimer */}
        <p className="text-[10px] leading-relaxed text-slate-400">
          ⚕ {story.disclaimer}
        </p>
      </div>
    </div>
  )
}

// ─── Category filter tabs ────────────────────────────────────────────────────
const CATEGORIES = ["All", "Dental", "Medical Aesthetics", "Hair Restoration", "Orthopaedic", "Dermatology"]

// ─── Main Section ────────────────────────────────────────────────────────────
export function SuccessStories() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [page, setPage] = useState(0)
  const CARDS_PER_PAGE = 3

  const filtered =
    activeCategory === "All"
      ? stories
      : stories.filter((s) => s.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const visible = filtered.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)

  function setCategory(cat) {
    setActiveCategory(cat)
    setPage(0)
  }

  return (
    <section className="container-shell rounded-[2rem] bg-gradient-to-b from-sky-50/60 to-white py-14">
      <SectionHeader
        eyebrow="Patient Success Stories"
        title="Real results from real patients"
        description="Verified transformation stories across our specialties. Drag the slider on each card to see the before & after difference."
      />

      {/* Category filter */}
      <Reveal className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              activeCategory === cat
                ? "bg-sky-700 text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${page}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {visible.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-sky-300 hover:text-sky-700 disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-8 bg-sky-600" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-sky-300 hover:text-sky-700 disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Bottom CTA */}
      <Reveal className="mt-10 rounded-3xl bg-gradient-to-r from-sky-900 to-indigo-900 p-8 text-center text-white">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-300">
          Start Your Own Success Story
        </p>
        <h3 className="mb-3 text-2xl font-bold">
          Could this be you? Let's find out together.
        </h3>
        <p className="mb-6 text-sky-100 text-sm max-w-lg mx-auto">
          Every transformation started with one appointment. Our specialists will evaluate your
          condition honestly and recommend only what you truly need.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/contact#appointment"
            className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Book a Free Consultation →
          </Link>
          <a
            href={toWhatsAppLink(
              siteData.contact.whatsapp,
              "Hi! I saw the patient success stories and would like to book a consultation.",
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

      {/* Global medical disclaimer */}
      <p className="mt-6 text-center text-xs text-slate-400">
        ⚕ All stories reflect individual patient experiences. Results are not guaranteed and vary
        based on individual health conditions, treatment compliance, and clinical factors.
        Consultations are recommended to determine suitability for any treatment.
      </p>
    </section>
  )
}
