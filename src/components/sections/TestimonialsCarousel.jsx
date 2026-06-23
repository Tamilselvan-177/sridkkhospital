import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, ExternalLink } from 'lucide-react'
import { testimonials, SPECIALTY_FILTERS } from '../../data/testimonialsData'
import { SectionHeader } from '../common/SectionHeader'
import { siteData } from '../../data/siteData'

// ── Helpers ──────────────────────────────────────────────────
function StarRating({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${i <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
        />
      ))}
    </div>
  )
}

// ── Single Testimonial Card ───────────────────────────────────
function TestimonialCard({ review, isActive }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative flex h-full flex-col rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
    >
      {/* Glow accent */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
        style={{
          background: `radial-gradient(circle at top left, ${review.avatarColor}18 0%, transparent 60%)`,
        }}
      />

      {/* Quote + Platform badge */}
      <div className="mb-4 flex items-start justify-between">
        <Quote className="h-8 w-8 text-sky-200" />
        <span className="flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-600 ring-1 ring-sky-100">
          <BadgeCheck className="h-3 w-3" />
          {review.platform} · Verified
        </span>
      </div>

      {/* Review text */}
      <p className="relative z-10 mb-5 flex-1 text-sm leading-relaxed text-slate-700">
        &ldquo;{review.review}&rdquo;
      </p>

      {/* Tag chip */}
      <div className="mb-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold text-white"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.tag}
        </span>
      </div>

      {/* Footer — avatar + name + stars */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow"
            style={{ backgroundColor: review.avatarColor }}
          >
            {review.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{review.name}</p>
            <p className="text-xs text-slate-400">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────
export function TestimonialsCarousel() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  const autoPlayRef = useRef(null)

  // Filtered list
  const filtered = activeFilter === 'all'
    ? testimonials
    : testimonials.filter((t) => t.specialty === activeFilter)

  // Cards per view (responsive)
  const [cardsPerView, setCardsPerView] = useState(3)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1)
      else if (window.innerWidth < 1024) setCardsPerView(2)
      else setCardsPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeFilter])

  const maxIndex = Math.max(0, filtered.length - cardsPerView)

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Auto-play every 5 seconds
  useEffect(() => {
    if (isPaused) return
    autoPlayRef.current = setInterval(goNext, 5000)
    return () => clearInterval(autoPlayRef.current)
  }, [isPaused, goNext])

  const visibleCards = filtered.slice(currentIndex, currentIndex + cardsPerView)
  // wrap-around fill
  if (visibleCards.length < cardsPerView && filtered.length > 0) {
    const shortage = cardsPerView - visibleCards.length
    visibleCards.push(...filtered.slice(0, shortage))
  }

  const totalDots = maxIndex + 1

  return (
    <section className="py-16">
      <div className="container-shell">
        {/* Header */}
        <SectionHeader
          eyebrow="Patient Testimonials"
          title="Real stories. Real healing."
          description={`Over 1,700 verified reviews across Google & Justdial. Here's what patients say about care at Sri D.K.K. Hospital, Kanchipuram.`}
        />

        {/* Aggregate rating card */}
        <div className="mx-auto mb-10 max-w-sm">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-center shadow-sm">
            <div className="flex items-end gap-1">
              <span className="text-5xl font-extrabold text-slate-900">4.9</span>
              <span className="mb-1.5 text-lg text-slate-400">/ 5</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-500">Based on 1,700+ verified patient reviews</p>
            <a
              href={siteData.contact.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2 text-xs font-semibold text-amber-700 shadow-sm transition hover:bg-amber-100"
            >
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              Read All Reviews on Google
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {SPECIALTY_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                activeFilter === f.id
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-200'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600'
              }`}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>

        {/* Carousel */}
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">No reviews found for this category.</p>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Prev button */}
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-white shadow-md transition hover:bg-sky-50 hover:border-sky-400 disabled:opacity-30"
              disabled={filtered.length <= cardsPerView}
            >
              <ChevronLeft className="h-5 w-5 text-sky-600" />
            </button>

            {/* Cards track */}
            <div
              className={`grid gap-5 ${
                cardsPerView === 1 ? 'grid-cols-1' :
                cardsPerView === 2 ? 'grid-cols-2' :
                'grid-cols-3'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {visibleCards.map((review, i) => (
                  <TestimonialCard
                    key={`${review.id}-${currentIndex}-${i}`}
                    review={review}
                    isActive={i === 0}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-white shadow-md transition hover:bg-sky-50 hover:border-sky-400 disabled:opacity-30"
              disabled={filtered.length <= cardsPerView}
            >
              <ChevronRight className="h-5 w-5 text-sky-600" />
            </button>
          </div>
        )}

        {/* Dot navigation */}
        {totalDots > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-sky-500' : 'w-2 bg-slate-300 hover:bg-sky-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Pause indicator */}
        <div className="mt-3 flex justify-center">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
            {isPaused ? 'Paused — move away to resume' : 'Auto-playing · Hover to pause'}
          </span>
        </div>

        {/* Leave a review CTA */}
        <div className="mt-10 text-center">
          <p className="mb-4 text-sm text-slate-500">
            Treated at SRI DKK? Your review helps other families find trusted care.
          </p>
          <a
            href={siteData.contact.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow transition hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-md"
          >
            <Star className="h-4 w-4" />
            Share Your Experience — Takes 60 Seconds
            <ExternalLink className="h-4 w-4 opacity-80" />
          </a>
        </div>
      </div>
    </section>
  )
}
