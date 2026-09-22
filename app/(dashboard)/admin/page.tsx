export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import Link from 'next/link'
import {
  CalendarDays, Clock3, CheckCircle2, XCircle, UserCheck,
  Clock, ArrowRight, AlertCircle
} from 'lucide-react'

function StatCard({
  title, value, icon: Icon, color, href
}: {
  title: string; value: number; icon: any; color: string; href?: string
}) {
  const content = (
    <div className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{title}</p>
          <p className="mt-2 text-3xl font-extrabold">{value}</p>
        </div>
        <div className="rounded-xl bg-white/30 p-3">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
  if (href) return <Link href={href}>{content}</Link>
  return content
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING:    'bg-amber-100 text-amber-700',
    CONFIRMED:  'bg-emerald-100 text-emerald-700',
    RESCHEDULED:'bg-blue-100 text-blue-700',
    CHECKED_IN: 'bg-sky-100 text-sky-700',
    COMPLETED:  'bg-slate-100 text-slate-600',
    CANCELLED:  'bg-red-100 text-red-600',
    NO_SHOW:    'bg-rose-100 text-rose-600',
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${map[status] ?? 'bg-slate-100 text-slate-600'}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

export default async function AdminDashboard() {
  const today = new Date().toISOString().split('T')[0]

  const [
    todayTotal,
    pendingCount,
    confirmedCount,
    completedToday,
    cancelledCount,
    checkedInCount,
    totalAll,
    todayAppointments,
  ] = await Promise.all([
    prisma.appointment.count({ where: { date: today } }),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
    prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
    prisma.appointment.count({ where: { date: today, status: 'COMPLETED' } }),
    prisma.appointment.count({ where: { status: 'CANCELLED' } }),
    prisma.appointment.count({ where: { date: today, status: 'CHECKED_IN' } }),
    prisma.appointment.count(),
    prisma.appointment.findMany({
      where: { date: today },
      orderBy: { time: 'asc' },
      take: 15,
      select: {
        id: true, aptId: true, patientName: true, phone: true,
        doctor: true, department: true, time: true, status: true,
      },
    }),
  ])

  return (
    <div className="space-y-8">
      {/* ── Welcome header ── */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Appointments"
          value={todayTotal}
          icon={CalendarDays}
          color="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-sky-600"
          href="/admin/appointments"
        />
        <StatCard
          title="Pending Approval"
          value={pendingCount}
          icon={Clock3}
          color="bg-gradient-to-br from-amber-400 to-amber-500 text-white border-amber-500"
          href="/admin/appointments"
        />
        <StatCard
          title="Confirmed"
          value={confirmedCount}
          icon={CheckCircle2}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-600"
          href="/admin/appointments"
        />
        <StatCard
          title="Completed Today"
          value={completedToday}
          icon={UserCheck}
          color="bg-gradient-to-br from-slate-600 to-slate-700 text-white border-slate-700"
          href="/admin/appointments"
        />
      </div>

      {/* ── Secondary stats ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Currently Checked In</p>
          <p className="mt-2 text-2xl font-bold text-sky-600">{checkedInCount}</p>
          <p className="mt-1 text-xs text-slate-400">Patients in consultation</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cancelled</p>
          <p className="mt-2 text-2xl font-bold text-red-500">{cancelledCount}</p>
          <p className="mt-1 text-xs text-slate-400">Total cancelled appointments</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">All Appointments</p>
          <p className="mt-2 text-2xl font-bold text-slate-700">{totalAll}</p>
          <p className="mt-1 text-xs text-slate-400">All time total</p>
        </div>
      </div>

      {/* ── Today's Schedule ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-sky-600" />
            <h2 className="font-bold text-slate-900">Today&apos;s Schedule</h2>
          </div>
          <Link
            href="/admin/appointments"
            className="flex items-center gap-1.5 text-sm font-medium text-sky-600 transition hover:text-sky-800"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {todayAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm">No appointments scheduled for today.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-50 bg-slate-50/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Patient</th>
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {todayAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3.5">
                      <span className="font-semibold text-slate-700">{apt.time}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="font-semibold text-slate-900">{apt.patientName}</p>
                      <p className="text-xs text-slate-400">{apt.phone}</p>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-slate-700">{apt.doctor ?? <span className="italic text-slate-300 text-xs">Unassigned</span>}</p>
                      {apt.department && <p className="text-xs text-slate-400">{apt.department}</p>}
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        href={`/admin/appointments/${apt.id}`}
                        className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                      >
                        Open →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
