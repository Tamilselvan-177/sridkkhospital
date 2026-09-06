import { prisma } from '@/lib/db'
import { CalendarDays, PhoneCall, MessageSquare, Briefcase } from 'lucide-react'

// Simple fallback card
function StatCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default async function AdminDashboard() {
  const [appointmentCount, callbackCount, contactCount, careerCount] = await Promise.all([
    prisma.formSubmission.count({ where: { type: 'APPOINTMENT' } }),
    prisma.formSubmission.count({ where: { type: 'CALLBACK' } }),
    prisma.formSubmission.count({ where: { type: 'CONTACT' } }),
    prisma.formSubmission.count({ where: { type: 'CAREERS' } }),
  ])

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Overview</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Appointments"
          value={appointmentCount}
          icon={CalendarDays}
          color="bg-sky-100 text-sky-600"
        />
        <StatCard
          title="Callback Requests"
          value={callbackCount}
          icon={PhoneCall}
          color="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          title="General Inquiries"
          value={contactCount}
          icon={MessageSquare}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Job Applications"
          value={careerCount}
          icon={Briefcase}
          color="bg-amber-100 text-amber-600"
        />
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-slate-900">Welcome to SRI DKK Hospital Portal</h2>
        <p className="mx-auto max-w-xl text-slate-500">
          Use the sidebar to navigate through appointments, callbacks, inquiries, and job applications. This data is connected directly to your MongoDB database.
        </p>
      </div>
    </div>
  )
}
