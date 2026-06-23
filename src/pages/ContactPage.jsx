import { Link } from "react-router-dom"
import {
  AppointmentForm,
  CallbackForm,
  ContactForm,
} from "../components/forms/InquiryForms"
import {
  Clock,
  MapPin,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
} from "lucide-react"
import { MapLocationCard } from "../components/common/MapLocationCard"
import { SectionHeader } from "../components/common/SectionHeader"
import { Reveal } from "../components/motion/Reveal"
import { siteData } from "../data/siteData"
import { toWhatsAppLink } from "../utils/forms"

// ─── Quick contact bar ───────────────────────────────────────────────────────
function QuickContactBar() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {/* Call */}
      <a
        href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
        className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 transition hover:bg-sky-100"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-700 text-white shadow">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">Call Us</p>
          <p className="text-sm font-bold text-slate-900">{siteData.contact.phone}</p>
        </div>
      </a>
      {/* WhatsApp */}
      <a
        href={toWhatsAppLink(
          siteData.contact.whatsapp,
          "Hi! I'd like to enquire about treatment at SRI DKK Hospital.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 transition hover:bg-emerald-100"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow">
          <MessageCircleMore className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">WhatsApp</p>
          <p className="text-sm font-bold text-slate-900">Chat Instantly</p>
        </div>
      </a>
      {/* Timings */}
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Hours</p>
          <p className="text-sm font-bold text-slate-900">Mon–Sun · 10am–8pm</p>
        </div>
      </div>
    </div>
  )
}

// ─── Trust signals sidebar ───────────────────────────────────────────────────
function TrustSidebar() {
  return (
    <div className="space-y-4">
      {/* Hospital info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-bold text-slate-900">Hospital Details</h3>
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5 text-sm text-slate-700">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600" />
            <span>{siteData.contact.address}</span>
          </div>
          <div className="flex items-start gap-2.5 text-sm text-slate-700">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600" />
            <span>{siteData.contact.hours}</span>
          </div>
          <a
            href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2.5 text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            <Phone className="h-4 w-4 text-sky-600" />
            {siteData.contact.phone}
          </a>
        </div>
      </div>

      {/* Trust signals */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-bold text-slate-900">Why patients choose us</h3>
        <ul className="space-y-2.5">
          {[
            { icon: Star, text: "98% patient satisfaction rate" },
            { icon: ShieldCheck, text: "150,000+ patients treated" },
            { icon: Stethoscope, text: "30+ doctors & specialists" },
            { icon: Clock, text: "Emergency response in 10 minutes" },
            { icon: Star, text: "4.9 ⭐ Google Rating" },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-sm text-slate-700">
              <Icon className="h-4 w-4 flex-shrink-0 text-emerald-600" />
              {text}
            </li>
          ))}
        </ul>

        {/* Reviews link */}
        <a
          href={siteData.contact.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
        >
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          Read Patient Reviews →
        </a>
      </div>

      {/* Callback form */}
      <CallbackForm />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export function ContactPage() {
  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900 py-14 text-white">
        <div className="container-shell text-center">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-200">
              <Phone className="h-3.5 w-3.5" />
              Get in Touch
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Talk to our care team today
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base text-sky-100">
              Book an appointment, request a callback, or just ask us a question.
              We're available every day, 10 AM to 8 PM.
            </p>
          </Reveal>
          <Reveal>
            <QuickContactBar />
          </Reveal>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="container-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Appointment form */}
          <div className="space-y-6">
            <div id="appointment">
              <Reveal>
                <AppointmentForm />
              </Reveal>
            </div>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          {/* Right: Trust + Info sidebar */}
          <Reveal>
            <TrustSidebar />
          </Reveal>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────────────────────────── */}
      <section className="container-shell pb-14">
        <SectionHeader
          eyebrow="Find Us"
          title="Visit SRI DKK Hospital"
          description="Conveniently located in the heart of Kanchipuram, Tamil Nadu."
        />
        <Reveal className="overflow-hidden rounded-3xl shadow-lg">
          <MapLocationCard
            mapsEmbed={siteData.contact.mapsEmbed}
            address={siteData.contact.address}
            destination={siteData.contact.mapDestination}
            coordinates={siteData.contact.mapCoordinates}
          />
        </Reveal>
      </section>
    </>
  )
}
