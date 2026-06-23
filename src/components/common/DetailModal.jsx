import { useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  X,
  CheckCircle2,
  Clock,
  MessageCircleMore,
  Phone,
  CalendarCheck2,
  Star,
  ShieldCheck,
} from "lucide-react"
import { siteData } from "../../data/siteData"
import { toWhatsAppLink } from "../../utils/forms"

/**
 * DetailModal
 *
 * Props:
 *  item   — { name, image, description, benefits[], duration?, badge?, highlight? }
 *  onClose — () => void
 *  type   — "treatment" | "specialty"  (controls wording of CTAs)
 */
export function DetailModal({ item, onClose, type = "treatment" }) {
  // Close on Escape key
  const handleKey = useCallback(
    (e) => { if (e.key === "Escape") onClose() },
    [onClose],
  )
  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    // Prevent body scroll while open
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  const waMessage =
    type === "specialty"
      ? `Hi! I'd like to book a consultation for ${item.name} at SRI DKK Hospital.`
      : `Hi! I'm interested in ${item.name} treatment at SRI DKK Hospital. Please share details and book a slot.`

  const waLink = toWhatsAppLink(siteData.contact.whatsapp, waMessage)

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          style={{ maxHeight: "90vh" }}
        >
          {/* Hero image */}
          <div className="relative h-52 flex-shrink-0 overflow-hidden sm:h-60">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

            {/* Badge */}
            {item.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                {item.badge}
              </span>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-14">
              <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
                {item.name}
              </h2>
              {item.highlight && (
                <p className="mt-1 text-xs font-semibold text-sky-300">{item.highlight}</p>
              )}
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {/* Trust row */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                <ShieldCheck className="h-3.5 w-3.5" /> Expert-led care
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <Star className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" /> 98% satisfaction
              </span>
              {item.duration && (
                <span className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  <Clock className="h-3.5 w-3.5" /> {item.duration}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>

            {/* Benefits / What's included */}
            {item.benefits?.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                  What you can expect
                </h3>
                <ul className="space-y-2.5">
                  {item.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm leading-relaxed text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Doctors note */}
            <div className="rounded-2xl bg-slate-50 px-4 py-3.5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Treated by
              </p>
              <p className="text-sm font-medium text-slate-800">
                Certified specialist team · SRI D.K.K. Multispeciality Hospital, Kanchipuram
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Open Mon–Sun · 10 AM – 8 PM · Walk-in & appointments welcome
              </p>
            </div>
          </div>

          {/* Sticky CTA footer */}
          <div className="flex-shrink-0 border-t border-slate-100 bg-white px-5 py-4 space-y-2.5">
            {/* Primary — WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book via WhatsApp — Instant Confirmation
            </a>

            {/* Secondary row */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/contact#appointment"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-sky-200 bg-sky-50 py-3 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
              >
                <CalendarCheck2 className="h-4 w-4" />
                Book Appointment
              </Link>
              <a
                href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                <Phone className="h-4 w-4" />
                Call Us Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  )
}
