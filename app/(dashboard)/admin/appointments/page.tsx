'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Search, CalendarDays, Clock, User, Stethoscope, RefreshCw,
  ChevronLeft, ChevronRight, AlertCircle, CheckCircle2,
  XCircle, Clock3, UserCheck, Ban, Eye
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type AptStatus = 'PENDING' | 'CONFIRMED' | 'RESCHEDULED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

interface Appointment {
  id: string
  aptId: string
  patientName: string
  phone: string
  email?: string
  doctor?: string
  department?: string
  date: string
  time: string
  type: string
  status: AptStatus
  createdAt: string
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<AptStatus, { label: string; color: string; icon: React.ElementType }> = {
  PENDING:    { label: 'Pending',       color: 'bg-amber-100 text-amber-700 border-amber-200',      icon: Clock3      },
  CONFIRMED:  { label: 'Confirmed',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  RESCHEDULED:{ label: 'Rescheduled',   color: 'bg-blue-100 text-blue-700 border-blue-200',          icon: RefreshCw   },
  CHECKED_IN: { label: 'Checked In',    color: 'bg-sky-100 text-sky-700 border-sky-200',             icon: UserCheck   },
  COMPLETED:  { label: 'Completed',     color: 'bg-slate-100 text-slate-600 border-slate-200',       icon: CheckCircle2},
  CANCELLED:  { label: 'Cancelled',     color: 'bg-red-100 text-red-600 border-red-200',             icon: XCircle     },
  NO_SHOW:    { label: 'No Show',       color: 'bg-rose-100 text-rose-600 border-rose-200',          icon: Ban         },
}

function StatusBadge({ status }: { status: AptStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  )
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const QUICK_FILTERS = [
  { label: 'All',       status: 'ALL',       date: 'all'      },
  { label: 'Today',     status: 'ALL',       date: 'today'    },
  { label: 'Upcoming',  status: 'ALL',       date: 'upcoming' },
  { label: 'Pending',   status: 'PENDING',   date: 'all'      },
  { label: 'Confirmed', status: 'CONFIRMED', date: 'all'      },
  { label: 'Completed', status: 'COMPLETED', date: 'all'      },
  { label: 'Cancelled', status: 'CANCELLED', date: 'all'      },
]

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [activeFilter, setActiveFilter] = useState(0)

  const LIMIT = 20
  const totalPages = Math.ceil(total / LIMIT)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    const { status, date } = QUICK_FILTERS[activeFilter]
    const params = new URLSearchParams({
      status,
      date,
      page: String(page),
      limit: String(LIMIT),
      ...(search ? { search } : {}),
    })
    try {
      const res = await fetch(`/api/appointments?${params}`)
      const data = await res.json()
      setAppointments(data.appointments ?? [])
      setTotal(data.total ?? 0)
    } finally {
      setLoading(false)
    }
  }, [activeFilter, page, search])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  function handleFilterChange(idx: number) {
    setActiveFilter(idx)
    setPage(1)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
      })
    } catch { return dateStr }
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-1 text-sm text-slate-500">{total} total records</p>
        </div>
        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* ── Search ── */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by patient name, phone, or APT ID…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Search
        </button>
        {search && (
          <button
            type="button"
            onClick={() => { setSearch(''); setSearchInput(''); setPage(1) }}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
          >
            Clear
          </button>
        )}
      </form>

      {/* ── Quick Filter Tabs ── */}
      <div className="flex flex-wrap gap-2">
        {QUICK_FILTERS.map((f, idx) => (
          <button
            key={f.label}
            onClick={() => handleFilterChange(idx)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeFilter === idx
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-100 border-t-sky-600" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-400">
            <AlertCircle className="h-10 w-10" />
            <p className="text-sm font-medium">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Patient</th>
                  <th className="px-5 py-3.5">Doctor</th>
                  <th className="px-5 py-3.5">Date & Time</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="group transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-semibold text-slate-400">{apt.aptId}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{apt.patientName}</p>
                          <p className="text-xs text-slate-400">{apt.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {apt.doctor ? (
                        <div>
                          <p className="font-medium text-slate-700">{apt.doctor}</p>
                          {apt.department && <p className="text-xs text-slate-400">{apt.department}</p>}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 italic">Not assigned</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-medium">{formatDate(apt.date)}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {apt.time}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-500">{apt.type}</span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/appointments/${apt.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <p>Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 transition hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <span className="rounded-lg bg-sky-600 px-3 py-1.5 text-white">{page}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
