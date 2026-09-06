'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  X,
  CheckCircle2,
  Clock,
  MessageCircleMore,
  Phone,
  CalendarCheck2,
  Star,
  ShieldCheck,
} from 'lucide-react'
import { siteData } from '@/data/siteData'
import { toWhatsAppLink } from '@/lib/utils'

interface ModalItem {
  name: string
  image: string
  description?: string
  benefits?: string[]
  duration?: string
  badge?: string
  highlight?: string
}

interface DetailModalProps {
  item: ModalItem
  onClose: () => void
  type?: 'treatment' | 'specialty'
}

export function DetailModal({ item, onClose, type = 'treatment' }: DetailModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose],
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const waMessage =
    type === 'specialty'
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          style={{ maxHeight: '90vh' }}
        >
          {/* Hero image */}
          <div className="relative h-52 flex-shrink-0 overflow-hidden sm:h-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

            {item.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                {item.badge}
              </span>
            )}

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              <X className="h-4 w-4" />
            </button>

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
          <div className="flex-1 overflow-y-auto space-y-5 px-5 py-5">
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

            <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>

            {item.benefits && item.benefits.length > 0 && (
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

            <div className="rounded-2xl bg-slate-50 px-4 py-3.5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
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
          <div className="flex-shrink-0 space-y-2.5 border-t border-slate-100 bg-white px-5 py-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              <MessageCircleMore className="h-5 w-5 flex-shrink-0" />
              Book via WhatsApp — Instant Confirmation
            </a>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/contact#appointment"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-sky-200 bg-sky-50 py-3 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
              >
                <CalendarCheck2 className="h-4 w-4" />
                Book Appointment
              </Link>
              <a
                href={`tel:${siteData.contact.phone.replace(/\s+/g, '')}`}
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
