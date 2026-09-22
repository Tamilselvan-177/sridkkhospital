'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, User, Phone, Mail, Stethoscope, CalendarDays, Clock,
  ClipboardList, CheckCircle2, XCircle, RefreshCw, UserCheck, Ban,
  Clock3, FileEdit, Save, X, AlertTriangle, ChevronDown
} from 'lucide-react'

type AptStatus = 'PENDING' | 'CONFIRMED' | 'RESCHEDULED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

interface AptHistory {
  id: string
  action: string
  fromStatus?: AptStatus
  toStatus?: AptStatus
  note?: string
  changedBy: string
  createdAt: string
}

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
  reason?: string
  status: AptStatus
  adminNotes?: string
  history: AptHistory[]
  createdAt: string
  updatedAt: string
}

const STATUS_CONFIG: Record<AptStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  PENDING:    { label: 'Pending',     color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',    icon: Clock3      },
  CONFIRMED:  { label: 'Confirmed',   color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200',icon: CheckCircle2 },
  RESCHEDULED:{ label: 'Rescheduled', color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',      icon: RefreshCw   },
  CHECKED_IN: { label: 'Checked In',  color: 'text-sky-700',     bg: 'bg-sky-50 border-sky-200',        icon: UserCheck   },
  COMPLETED:  { label: 'Completed',   color: 'text-slate-600',   bg: 'bg-slate-50 border-slate-200',    icon: CheckCircle2},
  CANCELLED:  { label: 'Cancelled',   color: 'text-red-600',     bg: 'bg-red-50 border-red-200',        icon: XCircle     },
  NO_SHOW:    { label: 'No Show',     color: 'text-rose-600',    bg: 'bg-rose-50 border-rose-200',      icon: Ban         },
}

const TRANSITIONS: Record<AptStatus, { status: AptStatus; label: string; color: string }[]> = {
  PENDING:    [
    { status: 'CONFIRMED', label: 'Confirm', color: 'bg-emerald-600 hover:bg-emerald-700' },
    { status: 'CANCELLED', label: 'Cancel', color: 'bg-red-500 hover:bg-red-600' },
    { status: 'NO_SHOW',   label: 'No Show', color: 'bg-rose-500 hover:bg-rose-600' },
  ],
  CONFIRMED:  [
    { status: 'CHECKED_IN', label: 'Check In', color: 'bg-sky-600 hover:bg-sky-700' },
    { status: 'CANCELLED',  label: 'Cancel', color: 'bg-red-500 hover:bg-red-600' },
  ],
  RESCHEDULED:[
    { status: 'CONFIRMED', label: 'Confirm', color: 'bg-emerald-600 hover:bg-emerald-700' },
    { status: 'CANCELLED', label: 'Cancel', color: 'bg-red-500 hover:bg-red-600' },
  ],
  CHECKED_IN: [
    { status: 'COMPLETED', label: 'Complete', color: 'bg-slate-700 hover:bg-slate-800' },
    { status: 'NO_SHOW',   label: 'No Show', color: 'bg-rose-500 hover:bg-rose-600' },
  ],
  COMPLETED:  [],
  CANCELLED:  [],
  NO_SHOW:    [],
}

const DOCTORS = [
  'Dr. General Physician',
  'Dr. Dental Specialist',
  'Dr. Dermatologist',
  'Dr. Gynaecologist',
  'Dr. Paediatrician',
  'Dr. Orthopaedic Surgeon',
  'Dr. Medical Cosmetologist',
]

const DEPARTMENTS = [
  'General Medicine', 'Dental', 'Dermatology & Aesthetics',
  'Gynaecology', 'Paediatrics', 'Orthopaedics', 'Hair & Scalp',
]

function Card({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
        <Icon className="h-4 w-4 text-sky-600" />
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-center">
      <span className="min-w-[140px] text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value || <span className="text-slate-300 italic text-xs">Not set</span>}</span>
    </div>
  )
}

export default function AppointmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [apt, setApt] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [editNotes, setEditNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [editDoctor, setEditDoctor] = useState(false)
  const [doctor, setDoctor] = useState('')
  const [department, setDepartment] = useState('')
  const [showReschedule, setShowReschedule] = useState(false)
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('')
  const [cancelNote, setCancelNote] = useState('')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<AptStatus | null>(null)

  useEffect(() => {
    fetch(`/api/appointments/${id}`)
      .then(r => r.json())
      .then(data => {
        setApt(data)
        setNotes(data.adminNotes ?? '')
        setDoctor(data.doctor ?? '')
        setDepartment(data.department ?? '')
      })
      .finally(() => setLoading(false))
  }, [id])

  async function doStatusChange(newStatus: AptStatus, note?: string) {
    setActionLoading(true)
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'status', status: newStatus, note }),
    })
    const data = await res.json()
    setApt(data)
    setActionLoading(false)
    setShowCancelModal(false)
    setPendingStatus(null)
  }

  function handleStatusClick(newStatus: AptStatus) {
    if (newStatus === 'CANCELLED' || newStatus === 'NO_SHOW') {
      setPendingStatus(newStatus)
      setShowCancelModal(true)
    } else {
      doStatusChange(newStatus)
    }
  }

  async function doReschedule() {
    if (!rescheduleDate || !rescheduleTime) return
    setActionLoading(true)
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reschedule', date: rescheduleDate, time: rescheduleTime }),
    })
    const data = await res.json()
    setApt(data)
    setShowReschedule(false)
    setActionLoading(false)
  }

  async function saveNotes() {
    setActionLoading(true)
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', adminNotes: notes }),
    })
    const data = await res.json()
    setApt(data)
    setEditNotes(false)
    setActionLoading(false)
  }

  async function saveDoctor() {
    setActionLoading(true)
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', doctor, department }),
    })
    const data = await res.json()
    setApt(data)
    setEditDoctor(false)
    setActionLoading(false)
  }

  function formatDate(dateStr: string) {
    try { return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) }
    catch { return dateStr }
  }

  function formatDateTime(dt: string) {
    try { return new Date(dt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }
    catch { return dt }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-100 border-t-sky-600" />
    </div>
  )

  if (!apt) return (
    <div className="py-20 text-center text-slate-500">Appointment not found.</div>
  )

  const statusCfg = STATUS_CONFIG[apt.status]
  const StatusIcon = statusCfg.icon
  const actions = TRANSITIONS[apt.status]
  const isTerminal = actions.length === 0

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/appointments"
            className="mb-2 inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-sky-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Appointments
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{apt.aptId}</h1>
        </div>
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${statusCfg.bg}`}>
          <StatusIcon className={`h-4 w-4 ${statusCfg.color}`} />
          <span className={`text-sm font-bold ${statusCfg.color}`}>{statusCfg.label}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left column (2/3) ── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Patient info */}
          <Card title="Patient Information" icon={User}>
            <div className="divide-y divide-slate-50">
              <InfoRow label="Full Name" value={apt.patientName} />
              <InfoRow label="Phone" value={apt.phone} />
              <InfoRow label="Email" value={apt.email} />
            </div>
          </Card>

          {/* Appointment details */}
          <Card title="Appointment Details" icon={CalendarDays}>
            <div className="divide-y divide-slate-50">
              <InfoRow label="Date" value={formatDate(apt.date)} />
              <InfoRow label="Time" value={apt.time} />
              <InfoRow label="Type" value={apt.type} />
              <InfoRow label="Reason" value={apt.reason} />
              <InfoRow label="Created" value={formatDateTime(apt.createdAt)} />
            </div>
          </Card>

          {/* Doctor assignment */}
          <Card title="Doctor / Department" icon={Stethoscope}>
            {editDoctor ? (
              <div className="space-y-3">
                <select
                  value={doctor}
                  onChange={e => setDoctor(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">Select doctor...</option>
                  {DOCTORS.map(d => <option key={d}>{d}</option>)}
                </select>
                <select
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">Select department...</option>
                  {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={saveDoctor} disabled={actionLoading} className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60">
                    <Save className="h-3.5 w-3.5" /> Save
                  </button>
                  <button onClick={() => setEditDoctor(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="divide-y divide-slate-50 flex-1">
                  <InfoRow label="Doctor" value={apt.doctor} />
                  <InfoRow label="Department" value={apt.department} />
                </div>
                {!isTerminal && (
                  <button onClick={() => setEditDoctor(true)} className="ml-3 flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50">
                    <FileEdit className="h-3.5 w-3.5" /> Edit
                  </button>
                )}
              </div>
            )}
          </Card>

          {/* Admin notes */}
          <Card title="Admin Notes" icon={ClipboardList}>
            {editNotes ? (
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add internal notes for this appointment…"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
                <div className="flex gap-2">
                  <button onClick={saveNotes} disabled={actionLoading} className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60">
                    <Save className="h-3.5 w-3.5" /> Save Notes
                  </button>
                  <button onClick={() => { setEditNotes(false); setNotes(apt.adminNotes ?? '') }} className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-slate-600 whitespace-pre-wrap flex-1">
                  {apt.adminNotes || <span className="italic text-slate-300">No notes added yet.</span>}
                </p>
                {!isTerminal && (
                  <button onClick={() => setEditNotes(true)} className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50">
                    <FileEdit className="h-3.5 w-3.5" /> Edit
                  </button>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* ── Right column (1/3) ── */}
        <div className="space-y-6">

          {/* Actions */}
          {!isTerminal && (
            <Card title="Actions" icon={ChevronDown}>
              <div className="space-y-2.5">
                {actions.map(({ status, label, color }) => (
                  <button
                    key={status}
                    onClick={() => handleStatusClick(status)}
                    disabled={actionLoading}
                    className={`w-full rounded-xl py-2.5 text-sm font-bold text-white transition disabled:opacity-60 ${color}`}
                  >
                    {actionLoading ? '…' : label}
                  </button>
                ))}
                {/* Reschedule */}
                {(apt.status === 'PENDING' || apt.status === 'CONFIRMED' || apt.status === 'RESCHEDULED') && (
                  <button
                    onClick={() => setShowReschedule(v => !v)}
                    className="w-full rounded-xl border-2 border-blue-200 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                  >
                    Reschedule
                  </button>
                )}
              </div>

              {/* Reschedule form */}
              {showReschedule && (
                <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">New Schedule</p>
                  <input
                    type="date"
                    value={rescheduleDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setRescheduleDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                  <select
                    value={rescheduleTime}
                    onChange={e => setRescheduleTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="">Select time…</option>
                    {['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <button
                    onClick={doReschedule}
                    disabled={!rescheduleDate || !rescheduleTime || actionLoading}
                    className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              )}
            </Card>
          )}

          {/* Timeline */}
          <Card title="Timeline" icon={Clock}>
            <ol className="relative space-y-4 pl-5">
              {apt.history.map((h, i) => (
                <li key={h.id} className="relative">
                  {i < apt.history.length - 1 && (
                    <div className="absolute -left-[13px] top-5 h-full w-px bg-slate-200" />
                  )}
                  <div className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-sky-400 shadow-sm" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{h.action}</p>
                    {h.note && <p className="mt-0.5 text-xs text-slate-500">{h.note}</p>}
                    <p className="mt-1 text-[11px] text-slate-400">{formatDateTime(h.createdAt)} · {h.changedBy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>

      {/* ── Cancel / No-show confirmation modal ── */}
      {showCancelModal && pendingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  {pendingStatus === 'CANCELLED' ? 'Cancel Appointment' : 'Mark as No Show'}
                </h3>
                <p className="text-sm text-slate-500">This action cannot be undone.</p>
              </div>
            </div>
            <textarea
              value={cancelNote}
              onChange={e => setCancelNote(e.target.value)}
              placeholder={pendingStatus === 'CANCELLED' ? 'Reason for cancellation (optional)…' : 'Note (optional)…'}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => doStatusChange(pendingStatus, cancelNote)}
                disabled={actionLoading}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {pendingStatus === 'CANCELLED' ? 'Cancel Appointment' : 'Mark No Show'}
              </button>
              <button
                onClick={() => { setShowCancelModal(false); setPendingStatus(null); setCancelNote('') }}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
