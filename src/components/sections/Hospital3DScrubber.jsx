import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Configuration ─────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240
const FRAME_PATH = "/videos/master_frames/frame_"
const FRAME_EXT = ".jpg"

// Text overlay sections mapped to scroll progress ranges
const OVERLAY_SECTIONS = [
  {
    range: [0, 0.25],
    title: "SRI D.K.K. HOSPITAL",
    subtitle: "General Dental • Childcare • Skin • Hair • Laser",
  },
  {
    range: [0.25, 0.5],
    title: "State-of-the-Art Facilities",
    subtitle: "Modern, sterile treatment rooms built for your comfort.",
  },
  {
    range: [0.5, 0.75],
    title: "Proven Patient Transformations",
    subtitle: "Delivering excellence across all medical specialties.",
  },
  {
    range: [0.75, 1.0],
    title: "Private Consultation Lounge",
    subtitle: "Your journey to complete healthcare starts here.",
  },
]

/**
 * Pad a number to 4 digits: 1 → "0001", 42 → "0042"
 */
function pad(n) {
  return String(n).padStart(4, "0")
}

/**
 * Linear interpolation for smooth frame scrubbing
 */
function lerp(a, b, t) {
  return a + (b - a) * t
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Hospital3DScrubber() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(0)
  const targetFrameRef = useRef(0)
  const rafRef = useRef(null)
  const lastDrawnFrameRef = useRef(-1)

  const [loadedCount, setLoadedCount] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(true)

  const loadingPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100)

  // ── Determine which text overlay to show ────────────────────────────────
  const activeSection = useMemo(() => {
    for (let i = OVERLAY_SECTIONS.length - 1; i >= 0; i--) {
      if (scrollProgress >= OVERLAY_SECTIONS[i].range[0]) {
        return i
      }
    }
    return 0
  }, [scrollProgress])

  const currentOverlay = OVERLAY_SECTIONS[activeSection]

  // ── Preload all frames into memory ──────────────────────────────────────
  useEffect(() => {
    const images = []
    let loaded = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `${FRAME_PATH}${pad(i)}${FRAME_EXT}`
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true)
        }
      }
      img.onerror = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true)
        }
      }
      images.push(img)
    }

    imagesRef.current = images

    return () => {
      imagesRef.current = []
    }
  }, [])

  // ── Draw a frame on the canvas ──────────────────────────────────────────
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const img = imagesRef.current[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    // Skip redraw if same frame
    if (lastDrawnFrameRef.current === frameIndex) return
    lastDrawnFrameRef.current = frameIndex

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Use window dimensions for the fixed canvas
    const w = window.innerWidth
    const h = window.innerHeight

    // Set canvas buffer size
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }

    // Cover-fit the frame into the canvas (like object-fit: cover)
    const imgRatio = img.naturalWidth / img.naturalHeight
    const canvasRatio = w / h
    let drawW, drawH, drawX, drawY
    if (imgRatio > canvasRatio) {
      drawH = h
      drawW = h * imgRatio
      drawX = (w - drawW) / 2
      drawY = 0
    } else {
      drawW = w
      drawH = w / imgRatio
      drawX = 0
      drawY = (h - drawH) / 2
    }

    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, drawX, drawY, drawW, drawH)
  }, [])

  // ── Scroll handler: update target frame + visibility ────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrollableHeight = container.offsetHeight - window.innerHeight

      // Determine if we're inside the scrubber section
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight
      setIsInView(rect.top <= window.innerHeight && rect.bottom >= 0)

      // Guard against division by zero
      if (scrollableHeight <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight))

      setScrollProgress(progress)
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ── Animation loop: smoothly interpolate toward the target frame ────────
  useEffect(() => {
    if (!isReady) return

    // Draw first frame immediately
    lastDrawnFrameRef.current = -1
    drawFrame(0)

    const animate = () => {
      const current = currentFrameRef.current
      const target = targetFrameRef.current

      // Smooth lerp toward target frame
      const next = lerp(current, target, 0.15)
      currentFrameRef.current = next

      const frameIndex = Math.max(
        0,
        Math.min(Math.round(next), TOTAL_FRAMES - 1)
      )
      drawFrame(frameIndex)

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isReady, drawFrame])

  // ── Handle resize: redraw current frame ─────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      lastDrawnFrameRef.current = -1 // Force redraw
      const frameIndex = Math.max(
        0,
        Math.min(Math.round(currentFrameRef.current), TOTAL_FRAMES - 1)
      )
      drawFrame(frameIndex)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [drawFrame])

  return (
    <>
      {/* ── Fixed fullscreen viewport (portal-style, bypasses overflow:hidden ancestors) ── */}
      {isInView && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          {/* ── Loading screen ─────────────────────────────────────────── */}
          <AnimatePresence>
            {!isReady && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ pointerEvents: "auto" }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-sky-950 via-sky-900 to-indigo-900"
              >
                {/* Animated hospital icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-8"
                >
                  <svg
                    className="h-16 w-16 text-white/80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                    />
                  </svg>
                </motion.div>

                <p className="mb-4 text-lg font-semibold tracking-wide text-white/90">
                  Loading Hospital Walkthrough…
                </p>

                {/* Progress bar */}
                <div className="relative h-1.5 w-64 overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                    style={{ width: `${loadingPercent}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-white/60">
                  {loadingPercent}%
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Canvas ───────────────────────────────────────────────────── */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />

          {/* ── Bottom gradient overlay ──────────────────────────────────── */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{ height: "40%" }}
          >
            <div className="h-full w-full bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          </div>

          {/* ── Scroll progress indicator (thin bar at top) ──────────────── */}
          <div className="absolute inset-x-0 top-0 z-30 h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-[width] duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* ── Dynamic text overlay ────────────────────────────────────── */}
          {isReady && (
            <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-3xl"
                >
                  <motion.h2
                    className="text-3xl font-extrabold leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
                    style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
                  >
                    {currentOverlay.title}
                  </motion.h2>
                  <motion.p
                    className="mt-3 max-w-xl text-base font-medium text-white/85 drop-shadow-md md:mt-4 md:text-lg lg:text-xl"
                    style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
                  >
                    {currentOverlay.subtitle}
                  </motion.p>

                  {/* Section dots indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    {OVERLAY_SECTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          i === activeSection
                            ? "w-8 bg-white"
                            : "w-2 bg-white/40"
                        }`}
                      />
                    ))}
                    <span className="ml-3 text-xs font-medium tracking-wider text-white/50 uppercase">
                      {activeSection + 1} / {OVERLAY_SECTIONS.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* ── Scroll hint (visible at start) ───────────────────────────── */}
          {isReady && scrollProgress < 0.05 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center md:bottom-8"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <span className="mb-2 text-xs font-semibold tracking-widest text-white/70 uppercase">
                  Scroll to explore
                </span>
                <svg
                  className="h-6 w-6 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </div>
      )}

      {/* ── Scroll track spacer (this div creates the 300vh scroll distance) ── */}
      <div
        ref={containerRef}
        style={{ height: "300vh" }}
        className="relative bg-slate-950"
      />
    </>
  )
}
