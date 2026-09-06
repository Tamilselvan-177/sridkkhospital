import { Link, useParams } from "react-router-dom"
import { AppointmentForm } from "../components/forms/InquiryForms"
import { Reveal } from "../components/motion/Reveal"
import { siteData } from "../data/siteData"

export function TreatmentDetailPage() {
  const { slug } = useParams()
  const treatment = siteData.treatments.find((item) => item.slug === slug)

  if (!treatment) {
    return (
      <section className="container-shell py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Treatment not found</h1>
        <p className="mt-3 text-slate-600">Please return to treatments and choose a valid service.</p>
        <Link
          to="/treatments"
          className="mt-5 inline-flex rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Treatments
        </Link>
      </section>
    )
  }

  return (
    <section className="container-shell py-14 md:py-18">
      <Reveal className="grid gap-8 md:grid-cols-2">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="h-full min-h-80 w-full rounded-3xl object-cover"
        />
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Treatment</p>
          <h1 className="text-4xl font-bold text-slate-900">{treatment.name}</h1>
          <p className="text-base text-slate-600">{treatment.description}</p>
          <p className="text-base text-slate-600">
            This section preserves source treatment intent and combines it with a cleaner modern layout,
            clearer call-to-actions, and mobile-first readability.
          </p>
          <div className="flex gap-3">
            <a
              href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            >
              Call Now
            </a>
            <Link
              to="/contact#appointment"
              className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </Reveal>
      <div className="mt-10">
        <AppointmentForm />
      </div>
    </section>
  )
}
