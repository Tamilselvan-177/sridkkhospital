import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { Reveal } from '../motion/Reveal'
import { transformations, TRANSFORMATION_FILTERS } from '../../data/transformationsData'

// ─────────────────────────────────────────────────────────────────────────────
// DragCompareSlider
// Takes a single combined side-by-side image (left=before, right=after).
// Uses CSS background-position to clip each half, with a draggable divider.
// Also supports two separate before/after image URLs as fallback.
// ─────────────────────────────────────────────────────────────────────────────
function DragCompareSlider({ combined, beforeDesc, afterDesc, accentColor }) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)
  const containerRef = useRef(null)

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(2, Math.min(clientX - rect.left, rect.width - 2))
    setPos((x / rect.width) * 100)
    setHintVisible(false)
  }, [])

  const onMouseMove = useCallback((e) => { if (dragging) updatePos(e.clientX) }, [dragging, updatePos])
  const onTouchMove = useCallback((e) => { if (dragging) updatePos(e.touches[0].clientX) }, [dragging, updatePos])
  const stopDrag = useCallback(() => setDragging(false), [])

  useEffect(() => {
    if (!dragging) return
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', stopDrag)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [dragging, onMouseMove, onTouchMove, stopDrag])

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden rounded-2xl"
      style={{ aspectRatio: '4/3', cursor: dragging ? 'col-resize' : 'col-resize' }}
      onMouseDown={(e) => { setDragging(true); updatePos(e.clientX) }}
      onTouchStart={(e) => { setDragging(true); updatePos(e.touches[0].clientX) }}
      role="img"
      aria-label="Before and after comparison slider"
    >
      {/* ── AFTER side (right half shown via background-position) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${combined})`,
          backgroundSize: '200% 100%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── BEFORE side (left half, clipped by pos%) ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${combined})`,
            backgroundSize: `${(100 / (pos / 100))}% 100%`,
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            width: containerRef.current?.offsetWidth
              ? `${containerRef.current.offsetWidth}px`
              : '100vw',
          }}
        />
      </div>

      {/* ── Divider line ── */}
      <div
        className="absolute inset-y-0 w-0.5 shadow-[0_0_12px_rgba(0,0,0,0.6)]"
        style={{ left: `${pos}%`, backgroundColor: 'white' }}
      >
        {/* Handle knob */}
        <div
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white shadow-2xl transition-transform hover:scale-110"
          style={{ backgroundColor: accentColor || '#0ea5e9' }}
        >
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* ── BEFORE label ── */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-white">Before</span>
      </div>

      {/* ── AFTER label ── */}
      <div
        className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg px-3 py-1.5"
        style={{ backgroundColor: `${accentColor}cc` }}
      >
        <span className="h-2 w-2 rounded-full bg-white/80" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-white">After</span>
      </div>

      {/* ── Drag hint (fades after first drag) ── */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm"
          >
            ← Drag to compare →
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TransformationCard
// ─────────────────────────────────────────────────────────────────────────────
function TransformationCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_32px_-8px_rgba(2,132,199,0.18)]"
    >
      {/* Slider */}
      <div className="p-4 pb-2">
        <DragCompareSlider
          combined={item.combined}
          beforeDesc={item.beforeDesc}
          afterDesc={item.afterDesc}
          accentColor={item.accentColor}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 pt-2">
        {/* Tag + duration */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: item.accentColor }}
          >
            {item.tag}
          </span>
          <span className="text-xs text-slate-400">{item.duration}</span>
        </div>

        {/* Treatment name */}
        <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.treatment}</h3>

        {/* Caption */}
        <p className="text-xs leading-relaxed text-slate-600 italic">&ldquo;{item.caption}&rdquo;</p>

        {/* Before / After descriptors */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-red-50 p-2.5">
            <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-red-500">Before</p>
            <p className="text-xs text-slate-700 leading-snug">{item.beforeDesc}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2.5">
            <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-emerald-600">After</p>
            <p className="text-xs text-slate-700 leading-snug">{item.afterDesc}</p>
          </div>
        </div>

        {/* CTA */}
        <a
          href={item.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          style={{ backgroundColor: item.accentColor }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Book Your Transformation
          <ArrowRight className="h-3.5 w-3.5" />
        </a>

        <p className="text-center text-[10px] text-slate-400">
          ⚕ Individual results may vary. Consultation recommended.
        </p>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TransformationsSection — Main Export
// ─────────────────────────────────────────────────────────────────────────────
export function TransformationsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(0)
  const CARDS_PER_PAGE = 3

  const filtered = activeFilter === 'all'
    ? transformations
    : transformations.filter((t) => t.specialty === activeFilter)

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const visible = filtered.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE)

  function setFilter(f) { setActiveFilter(f); setPage(0) }

  return (
    <section className="container-shell rounded-[2rem] bg-gradient-to-b from-slate-50 to-white py-14">
      <SectionHeader
        eyebrow="Patient Transformations"
        title="Real results from real patients"
        description="Verified transformation stories across our specialties. Drag the slider on each card to see the before & after difference."
      />

      {/* Filter chips */}
      <Reveal className="mb-8 flex flex-wrap justify-center gap-2">
        {TRANSFORMATION_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              activeFilter === f.id
                ? 'bg-sky-600 text-white shadow-md shadow-sky-200'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600'
            }`}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </Reveal>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeFilter}-${page}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {visible.map((item) => (
            <TransformationCard key={item.id} item={item} />
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
              aria-label={`Page ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === page ? 'w-8 bg-sky-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
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

      {/* Bottom CTA banner */}
      <Reveal className="mt-10 rounded-3xl bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 p-8 text-center text-white">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-sky-300">
          Your Transformation Awaits
        </p>
        <h3 className="mb-3 text-2xl font-bold">
          Ready to see your results?
        </h3>
        <p className="mb-6 mx-auto max-w-md text-sm text-sky-100">
          Our specialists will evaluate your needs honestly and create a personalised plan — no pressure, no upselling.
        </p>
        <a
          href="https://whatsform.com/xklykw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-sky-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Sparkles className="h-4 w-4 text-sky-600" />
          Book Your Transformation Consultation
          <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>

      <p className="mt-6 text-center text-xs text-slate-400">
        ⚕ All results shown are from actual patient treatments at Sri D.K.K. Hospital. Individual outcomes vary based on treatment type, skin/hair condition, and compliance. Consultation required to determine suitability.
      </p>
    </section>
  )
}
