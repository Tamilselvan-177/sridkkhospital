import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  X,
  ExternalLink,
  Upload,
  Send,
  CheckCircle2,
  Smartphone,
  Gift,
  Sparkles,
  ArrowRight,
} from "lucide-react"

/* ─── Constants ──────────────────────────────────────────────────────────── */
const POPUP_DELAY        = 15000 // 15 s after page load
const SESSION_KEY        = "sridkk_review_popup_v2"
const AB_KEY             = "sridkk_ab_variant"
const GOOGLE_REVIEW_URL  =
  "https://www.google.com/search?q=dkk+hospital+kanchipuram&oq=dkk+&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg5MgYIAhBFGDsyBggDEEUYOzIMCAQQIxgnGIAEGIoFMgYIBRBFGD0yBggGEEUYPTIGCAcQRRg90gEINDYxOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
const BOOK_URL           = "https://whatsform.com/xklykw"
const WA_NUMBER          = "919790122269"

/* ─── A/B Variant picker (persisted so same user sees same variant) ──────── */
function getVariant() {
  let v = localStorage.getItem(AB_KEY)
  if (!v) {
    v = Math.random() < 0.5 ? "A" : "B"
    localStorage.setItem(AB_KEY, v)
  }
  return v
}

/* ─── Track event to console (replace with analytics SDK if desired) ──────── */
function track(event, props = {}) {
  console.info("[ReviewPopup]", event, props)
  // TODO: fire to Google Analytics / Mixpanel / custom CRM
}

/* ═══════════════════════════════════════════════════════════════════════════
   ReviewSubmitForm  –  screenshot upload + WhatsApp confirmation
═══════════════════════════════════════════════════════════════════════════ */
function ReviewSubmitForm({ onClose }) {
  const [form, setForm]     = useState({ name: "", phone: "", screenshot: null })
  const [preview, setPreview] = useState(null)
  const [status, setStatus]  = useState("idle") // idle | submitting | done | error
  const fileRef              = useRef(null)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setForm((f) => ({ ...f, screenshot: file }))
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.screenshot) return
    setStatus("submitting")
    track("review_form_submitted", { name: form.name, phone: form.phone })

    // ── Build WhatsApp deep-link with pre-filled message ─────────────────
    const discount   = "REVIEW10"
    const msg = encodeURIComponent(
      `🙏 Thank you, ${form.name}!\n\nWe received your Google review — our team really appreciates it!\n\n✅ Your exclusive discount code: *${discount}*\nUse it to get *10% off* your first consultation at Sri D.K.K. Hospital.\n\n📅 Book now: ${BOOK_URL}\n\nSee you soon! 🏥`
    )
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${msg}`

    // Simulate a short "processing" delay then open WhatsApp
    await new Promise((r) => setTimeout(r, 1200))
    setStatus("done")
    // Open WhatsApp auto-reply (hospital staff sends from business account)
    setTimeout(() => window.open(waUrl, "_blank", "noopener"), 800)
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <p className="text-base font-bold text-slate-900">You're all set! 🎉</p>
        <p className="text-sm text-slate-600">
          Check WhatsApp — your discount code{" "}
          <span className="font-bold text-emerald-600">REVIEW10</span> is on its way!
        </p>
        <button
          onClick={onClose}
          className="mt-2 rounded-xl bg-emerald-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
        Step 2 — Claim Your Reward
      </p>
      <p className="text-sm text-slate-600">
        Show us your Google review screenshot and we'll send your{" "}
        <span className="font-bold text-slate-900">10% discount code</span> via WhatsApp instantly.
      </p>

      <input
        type="text"
        placeholder="Your name *"
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />
      <input
        type="tel"
        placeholder="WhatsApp number * (+91...)"
        required
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
      />

      {/* Screenshot upload */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
      >
        <Upload className="h-4 w-4" />
        {form.screenshot ? form.screenshot.name : "Upload review screenshot *"}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        aria-label="Upload review screenshot"
      />
      {preview && (
        <img
          src={preview}
          alt="Review screenshot preview"
          className="h-24 w-full rounded-xl border border-amber-200 object-cover"
        />
      )}

      <button
        type="submit"
        disabled={!form.name || !form.phone || !form.screenshot || status === "submitting"}
        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-600 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <span className="animate-pulse">Sending…</span>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send My Discount via WhatsApp
          </>
        )}
      </button>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main ReviewPopup Component
═══════════════════════════════════════════════════════════════════════════ */
export function ReviewPopup() {
  const [visible, setVisible]   = useState(false)
  const [step, setStep]         = useState("offer") // offer | form
  const variant                 = useRef(getVariant())

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    const t = setTimeout(() => {
      setVisible(true)
      track("popup_shown", { variant: variant.current })
    }, POPUP_DELAY)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, "1")
    setVisible(false)
    track("popup_dismissed", { variant: variant.current, step })
  }

  function handleWriteReview() {
    track("write_review_clicked", { variant: variant.current })
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener")
    // Move to claim-discount step after short delay
    setTimeout(() => setStep("form"), 1500)
  }

  function handleBook() {
    track("book_clicked", { variant: variant.current })
    window.open(BOOK_URL, "_blank", "noopener")
    dismiss()
  }

  /* ── Variant copy ─────────────────────────────────────────────────── */
  const isA = variant.current === "A"
  const rewardLabel  = isA ? "Get 10% Off Your First Consultation" : "Get a Free Skin / Dental Consultation"
  const rewardBadge  = isA ? "10% OFF" : "FREE Consult"
  const rewardColor  = isA ? "from-amber-400 to-orange-500" : "from-rose-400 to-pink-500"
  const rewardBg     = isA ? "bg-amber-500" : "bg-rose-500"
  const rewardHover  = isA ? "hover:bg-amber-600" : "hover:bg-rose-600"

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="review-popup"
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-120%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="fixed bottom-28 left-3 z-[60] w-80 overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-2xl shadow-amber-200/40 md:bottom-10 md:left-6"
          role="dialog"
          aria-label="Leave a review and get a discount"
          aria-modal="true"
        >
          {/* ── Top gradient accent bar */}
          <div className={`h-1.5 bg-gradient-to-r ${rewardColor}`} />

          {/* ── A/B variant badge */}
          <div className="absolute right-10 top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5">
            <Sparkles className="h-3 w-3 text-white" />
            <span className="text-[10px] font-extrabold uppercase tracking-wide text-white">
              {rewardBadge}
            </span>
          </div>

          {/* ── Close button */}
          <button
            onClick={dismiss}
            aria-label="Close popup"
            className="absolute right-2 top-2 z-10 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-5">
            {step === "offer" ? (
              <>
                {/* Stars row */}
                <div className="mb-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-xs font-semibold text-amber-600">4.9 · Google</span>
                </div>

                {/* Headline */}
                <h3 className="mb-1 text-base font-extrabold leading-snug text-slate-900">
                  Share Your Experience &amp; Save! ⭐
                </h3>
                <p className="mb-1 text-[13px] leading-relaxed text-slate-600">
                  Leave us a Google review and{" "}
                  <span className="font-bold text-slate-800">{rewardLabel}</span> at Sri D.K.K.
                  Multispeciality Hospital, Kanchipuram.
                </p>

                {/* How it works */}
                <ul className="mb-4 mt-3 flex flex-col gap-1.5 text-xs text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">1</span>
                    Click "Write a Review" below
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">2</span>
                    Post your honest experience on Google
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">3</span>
                    Upload screenshot → get discount code via WhatsApp 🎁
                  </li>
                </ul>

                {/* Primary CTA */}
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="popup-write-review-btn"
                  onClick={handleWriteReview}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl ${rewardBg} ${rewardHover} px-4 py-2.5 text-sm font-bold text-white shadow transition`}
                >
                  <Star className="h-4 w-4" />
                  Write a Review
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>

                {/* Secondary CTA */}
                <button
                  id="popup-book-btn"
                  onClick={handleBook}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Smartphone className="h-3.5 w-3.5 text-emerald-500" />
                  Book Your Consultation
                  <ArrowRight className="h-3 w-3 opacity-60" />
                </button>

                {/* Already reviewed? */}
                <button
                  onClick={() => setStep("form")}
                  className="mt-2 w-full text-center text-[11px] text-slate-400 underline decoration-dotted underline-offset-2 transition hover:text-slate-600"
                >
                  Already reviewed? Claim your discount →
                </button>
              </>
            ) : (
              <ReviewSubmitForm onClose={dismiss} />
            )}
          </div>

          {/* Bottom gift strip */}
          <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-2">
            <Gift className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[11px] text-slate-500">
              Code: <span className="font-bold text-slate-800">REVIEW10</span> · Valid 30 days
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
