'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Award,
  Calendar,
  MessageCircleMore,
  PhoneCall,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'
import { siteData } from '@/data/siteData'
import { toWhatsAppLink } from '@/lib/utils'

interface Doctor {
  id: string
  slug: string
  name: string
  role: string
  image: string
  imagePosition?: string | null
  qualification?: string | null
  experience?: string | null
  languages?: string | null
  availability?: string | null
  highlight?: string | null
  specialties: string[]
}

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const waLink = toWhatsAppLink(
    siteData.contact.whatsapp,
    `Hi! I'd like to book an appointment with ${doctor.name} at SRI DKK Hospital.`,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(2,132,199,0.25)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(2,132,199,0.35)]"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doctor.image}
          alt={`Photo of ${doctor.name}`}
          className={`h-64 w-full object-cover transition duration-500 group-hover:scale-105 ${doctor.imagePosition || 'object-top'}`}
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Available Today
        </div>
        {doctor.experience && (
          <div className="absolute right-4 top-4 rounded-xl border border-white/20 bg-white/90 px-2.5 py-1.5 text-xs font-bold text-sky-800 shadow backdrop-blur-sm">
            {doctor.experience}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
          <p className="mt-0.5 text-sm font-medium text-sky-700">{doctor.role}</p>
          {doctor.qualification && (
            <p className="mt-0.5 text-xs text-slate-500">{doctor.qualification}</p>
          )}
        </div>

        {doctor.highlight && (
          <div className="flex items-start gap-2 rounded-xl bg-sky-50 px-3 py-2.5">
            <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600" />
            <p className="text-xs font-medium text-sky-800">{doctor.highlight}</p>
          </div>
        )}

        {doctor.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {doctor.specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {doctor.availability && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {doctor.availability}
          </div>
        )}

        {doctor.languages && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            Speaks: {doctor.languages}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-1">
          <Link
            href="/contact#appointment"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-sky-700 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-sky-800"
          >
            <Calendar className="h-3.5 w-3.5" />
            Book Visit
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
          >
            <MessageCircleMore className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function DoctorsPageClient({ doctors }: { doctors: Doctor[] }) {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-900 py-16 text-white">
        <div className="container-shell text-center">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-300">
              <Stethoscope className="h-3.5 w-3.5" /> Our Medical Team
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Specialists who put <span className="text-sky-300">you first</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base text-sky-100">
              Our team of 30+ doctors brings decades of combined expertise across dental, aesthetics,
              gynaecology, orthopaedics, child care, and general medicine — all under one roof.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact#appointment"
                className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-900 shadow-lg transition hover:-translate-y-0.5"
              >
                Book an Appointment →
              </Link>
              <a
                href={`tel:${siteData.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <PhoneCall className="h-4 w-4" /> {siteData.contact.phone}
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap justify-center gap-5">
            {[
              { icon: Users, value: '30+', label: 'Doctors & Specialists' },
              { icon: Star, value: '98%', label: 'Patient Satisfaction' },
              { icon: ShieldCheck, value: '12+', label: 'Years of Service' },
              { icon: Award, value: '150,000+', label: 'Patients Treated' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="flex items-center gap-1 text-xs text-sky-300">
                  <Icon className="h-3 w-3" /> {label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-shell py-14">
        <SectionHeader
          eyebrow="Meet Our Doctors"
          title="Experienced. Compassionate. Expert."
          description="Each doctor on our team is a specialist in their field, committed to patient-first, evidence-based care."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor, i) => (
            <DoctorCard key={doctor.slug} doctor={doctor} index={i} />
          ))}
        </div>
      </section>

      <section className="container-shell rounded-[2rem] bg-gradient-to-b from-sky-50/60 to-white py-14">
        <SectionHeader eyebrow="Why Choose Our Team" title="The difference a great doctor makes" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, color: 'text-sky-700 bg-sky-100', title: 'Honest assessments only', desc: 'Our doctors recommend treatments only when genuinely needed. No unnecessary procedures, ever.' },
            { icon: Star, color: 'text-amber-600 bg-amber-100', title: 'Patient-first approach', desc: 'Every consultation is tailored to your specific condition, lifestyle, and health goals.' },
            { icon: Award, color: 'text-emerald-700 bg-emerald-100', title: 'Proven expertise', desc: '12+ years of service, 150,000+ patients, and 12,000+ successful procedures.' },
            { icon: Users, color: 'text-purple-700 bg-purple-100', title: 'Multilingual care', desc: 'All our doctors communicate in Tamil and English so you always feel understood.' },
            { icon: Calendar, color: 'text-indigo-700 bg-indigo-100', title: 'Same-day appointments', desc: 'Walk in or book online. We try to accommodate urgent consultations the same day.' },
            { icon: Stethoscope, color: 'text-rose-700 bg-rose-100', title: 'Integrated specialists', desc: 'Dental, aesthetics, orthopaedics, gynaecology, child care — all specialists without referrals.' },
          ].map((item) => (
            <Reveal key={item.title}>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className={`mb-3 inline-flex rounded-xl p-2.5 ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-shell pb-14">
        <Reveal className="rounded-3xl bg-gradient-to-r from-sky-900 to-indigo-900 p-8 text-center text-white shadow-xl">
          <h2 className="mb-3 text-2xl font-bold">Ready to meet your specialist?</h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-sky-100">
            Book an appointment online or call us directly. Our team is available 7 days a week, 10 AM to 8 PM.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact#appointment"
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-900 shadow transition hover:-translate-y-0.5"
            >
              Book Appointment →
            </Link>
            <a
              href={toWhatsAppLink(siteData.contact.whatsapp, "Hi! I'd like to book an appointment with a specialist at SRI DKK Hospital.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <MessageCircleMore className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
