import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, X, Gift, ExternalLink, ArrowRight } from "lucide-react"

const BANNER_KEY        = "sridkk_discount_banner_dismissed"
const DISMISS_HOURS     = 24 // Re-show after 24 h
const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=dkk+hospital+kanchipuram&oq=dkk+&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg5MgYIAhBFGDsyBggDEEUYOzIMCAQQIxgnGIAEGIoFMgYIBRBFGD0yBggGEEUYPTIGCAcQRRg90gEINDYxOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
const BOOK_URL          = "https://whatsform.com/xklykw"

export function DiscountStickyBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissedAt = localStorage.getItem(BANNER_KEY)
    if (dismissedAt) {
      const hoursSince = (Date.now() - parseInt(dismissedAt, 10)) / 3_600_000
      if (hoursSince < DISMISS_HOURS) return
    }
    // Show immediately (no delay — complements the popup which has a 15s delay)
    setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(BANNER_KEY, String(Date.now()))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="discount-sticky-banner"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 shadow-2xl"
          role="complementary"
          aria-label="Discount promotion banner"
        >
          <div className="container-shell flex flex-col items-center justify-between gap-2 py-2.5 sm:flex-row sm:gap-4">
            {/* Left — offer copy */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 sm:justify-start">
              <span className="flex items-center gap-1.5 text-sm font-extrabold text-white">
                <Gift className="h-4 w-4 text-white" />
                Share Your Experience &amp; Save! ⭐
              </span>
              <span className="hidden text-amber-200 sm:inline">·</span>
              <span className="text-xs font-medium text-amber-50">
                Leave a Google review → get{" "}
                <strong className="text-white">10% off</strong> your first consultation.
                Code: <strong className="rounded bg-white/20 px-1 font-black text-white">REVIEW10</strong>
              </span>
            </div>

            {/* Right — CTAs */}
            <div className="flex shrink-0 items-center gap-2">
              <a
                id="banner-write-review-btn"
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-amber-700 shadow transition hover:bg-amber-50"
              >
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                Write a Review
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              <a
                id="banner-book-btn"
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg border border-white/50 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Book Consultation
                <ArrowRight className="h-3 w-3" />
              </a>

              {/* Dismiss */}
              <button
                onClick={dismiss}
                aria-label="Dismiss banner"
                className="ml-1 rounded-lg p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
