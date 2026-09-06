import { CalendarCheck2, Phone } from 'lucide-react'
import Link from 'next/link'

export function StickyMobileCTA({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  const normalized = phone.replace(/\s+/g, '')
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <a
          href={`tel:${normalized}`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-900"
        >
          <Phone className="mr-2 h-4 w-4" /> Call Now
        </a>
        <Link
          href="/contact#appointment"
          className="inline-flex items-center justify-center rounded-xl bg-sky-700 px-3 py-3 text-sm font-semibold text-white"
        >
          <CalendarCheck2 className="mr-2 h-4 w-4" /> Appointment
        </Link>
      </div>
    </div>
  )
}
