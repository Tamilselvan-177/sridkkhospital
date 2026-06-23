import { useState } from "react"
import { Link } from "react-router-dom"
import { X, Gift, Clock } from "lucide-react"

export function UrgencyBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative z-40 w-full bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-700 px-4 py-2.5">
      <div className="container-shell flex items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-white">
          <span className="flex items-center gap-1.5 font-semibold">
            <Gift className="h-4 w-4 text-amber-300" />
            FREE Dental Consultation — Limited Slots Today
          </span>
          <span className="hidden text-sky-300 md:inline">|</span>
          <span className="flex items-center gap-1 text-sky-100">
            <Clock className="h-3.5 w-3.5" />
            Open Mon–Sun · 10am–8pm
          </span>
          <Link
            to="/contact#appointment"
            className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-sky-800 transition hover:bg-sky-50"
          >
            Book Now →
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="flex-shrink-0 rounded-lg p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
