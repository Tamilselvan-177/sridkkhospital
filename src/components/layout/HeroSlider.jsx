import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, Star, Gift, ShieldCheck, Zap, Users } from "lucide-react"
import { siteData } from "../../data/siteData"

const slides = [
  {
    id: 1,
    badge: "🎁 Limited Time Offer",
    badgeColor: "bg-amber-500/90 text-white",
    headline: "FREE Dental Consultation — Today Only",
    subheadline:
      "Don't wait until the pain starts. Most dental issues are silently progressing right now. Book a FREE consultation with our senior specialists and catch problems before they cost you more.",
    urgency: "⏱ Only 5 free slots left today",
    urgencyColor: "text-amber-300",
    primaryCta: { label: "Claim Free Consultation →", path: "/contact#appointment" },
    secondaryCta: { label: "Call Now", path: `tel:${siteData.contact.phone.replace(/\s+/g, "")}` },
    trust: [
      { icon: Star, text: "98% Patient Satisfaction" },
      { icon: Users, text: "150,000+ Patients Treated" },
      { icon: ShieldCheck, text: "Certified Senior Specialists" },
    ],
    bg: "from-sky-950 via-sky-900 to-indigo-900",
    image: "https://sridkkhospital.com/wp-content/uploads/2024/10/DENTAL-TREATMENT-1024x683.jpg",
    imageAlt: "Dental consultation at SRI DKK Hospital",
  },
  {
    id: 2,
    badge: "⭐ Most Trusted in Kanchipuram",
    badgeColor: "bg-emerald-500/90 text-white",
    headline: "12+ Years of Care. 12,000+ Surgeries. Zero Compromises.",
    subheadline:
      "Families across Kanchipuram trust us for advanced multispeciality care — Dental, Aesthetics, Gynaecology, Orthopaedic, Child Care, and more. One hospital. Every need covered.",
    urgency: "📍 Walk-in available Monday–Sunday, 10am–8pm",
    urgencyColor: "text-emerald-300",
    primaryCta: { label: "Book Appointment", path: "/contact#appointment" },
    secondaryCta: { label: "View Specialties", path: "/specialties" },
    trust: [
      { icon: Zap, text: "Emergency Response in 10 min" },
      { icon: ShieldCheck, text: "30+ Doctors & Specialists" },
      { icon: Star, text: "12+ Years of Service" },
    ],
    bg: "from-slate-900 via-emerald-950 to-teal-900",
    image: "https://sridkkhospital.com/wp-content/uploads/2024/09/Child-care-01-1024x683.jpg",
    imageAlt: "Expert team at SRI DKK Hospital",
  },
  {
    id: 3,
    badge: "✨ Exclusive Aesthetic Packages",
    badgeColor: "bg-purple-500/90 text-white",
    headline: "Look Younger. Feel Confident. No Surgery Needed.",
    subheadline:
      "Botox, Fillers, Laser Hair Removal, Skin Lightening, Hair PRP — science-backed aesthetic treatments by certified specialists. Special combo packages available this month.",
    urgency: "🔥 Package bookings are filling up fast this week",
    urgencyColor: "text-purple-300",
    primaryCta: { label: "Explore Aesthetic Packages →", path: "/treatments" },
    secondaryCta: { label: "WhatsApp Us", path: `https://wa.me/${siteData.contact.whatsapp}` },
    trust: [
      { icon: ShieldCheck, text: "Certified Dermatologists" },
      { icon: Star, text: "Safe, FDA-Approved Methods" },
      { icon: Users, text: "Thousands of Satisfied Clients" },
    ],
    bg: "from-slate-900 via-purple-950 to-indigo-900",
    image: "https://sridkkhospital.com/wp-content/uploads/2024/10/FACE-1024x683.jpg",
    imageAlt: "Medical aesthetics at SRI DKK Hospital",
  },
]

const AUTOPLAY_DELAY = 5500

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_DELAY)
    return () => clearInterval(id)
  }, [paused, next])

  const slide = slides[current]

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "92vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
        />
      </AnimatePresence>

      {/* Decorative radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />

      <div className="container-shell relative z-10 flex min-h-[92vh] flex-col justify-center py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Text Column */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Badge */}
              <span
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${slide.badgeColor} shadow-lg`}
              >
                {slide.badge}
              </span>

              {/* Headline */}
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
                {slide.headline}
              </h1>

              {/* Subheadline */}
              <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                {slide.subheadline}
              </p>

              {/* Urgency line */}
              <p className={`flex items-center gap-2 text-sm font-semibold ${slide.urgencyColor}`}>
                <Clock className="h-4 w-4 flex-shrink-0" />
                {slide.urgency}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                {slide.primaryCta.path.startsWith("http") || slide.primaryCta.path.startsWith("tel:") ? (
                  <a
                    href={slide.primaryCta.path}
                    className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    {slide.primaryCta.label}
                  </a>
                ) : (
                  <Link
                    to={slide.primaryCta.path}
                    className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    {slide.primaryCta.label}
                  </Link>
                )}
                {slide.secondaryCta.path.startsWith("http") || slide.secondaryCta.path.startsWith("tel:") ? (
                  <a
                    href={slide.secondaryCta.path}
                    target={slide.secondaryCta.path.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {slide.secondaryCta.label}
                  </a>
                ) : (
                  <Link
                    to={slide.secondaryCta.path}
                    className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                )}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {slide.trust.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur"
                  >
                    <Icon className="h-3.5 w-3.5 flex-shrink-0 text-white/80" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image Column */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${slide.id}`}
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-black/40">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              {/* Decorative floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md"
              >
                ✅ Trusted by 1.5 Lakh+ patients
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 top-4 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md"
              >
                ⭐ 4.9 Google Rating
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/25 md:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/25 md:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={`progress-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
          style={{ originX: 0 }}
          className="absolute bottom-0 left-0 z-20 h-0.5 w-full bg-white/50"
        />
      )}
    </section>
  )
}
