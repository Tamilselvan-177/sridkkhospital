import { Star, Gift, ExternalLink, ArrowRight } from "lucide-react"

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=dkk+hospital+kanchipuram&oq=dkk+hospital&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg7MgcIAhAAGIAEMggIAxAAGBYYHjIICAQQABgWGB4yCAgFEAAYFhgeMgYIBhBFGDwyBggHEEUYPdIBCDM1NTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dExRaVZFX3kwSFlMamZRNDBhajF4X3E1UlNxOFh1ZXBSZWpOT2loQ2U1dUpMYUpBY3RuRkhoMnU2aWZkRzRoQi1mUms0M1lHTWhlN3hKVGw0bVhCbF92RHd0TmR4M2FaYTZTS3I4OXFQT3V1WlhOYVF3EhY5TWs4YXRqekVwS01zZU1QbEtMdWVBGiJBRHNyOWZUeUNzUzBGOEJqM184aVNESXZ2YjNhWTlGaHVnEgQ4MDUxGgEzKgAwADgBQAAYACC3uaabC0oCEAI"
const BOOK_URL = "https://whatsform.com/xklykw"

export function DiscountStickyBanner() {
  return (
    <div
      id="discount-sticky-banner"
      role="complementary"
      aria-label="Discount promotion banner"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        /* Push above iOS home gesture bar */
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      className="w-full border-t border-amber-300 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 shadow-2xl"
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

        {/* Right — CTAs (no dismiss button) */}
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
        </div>
      </div>
    </div>
  )
}
