import { prisma } from '@/lib/db'

export default async function AppointmentsPage() {
  const appointments = await prisma.formSubmission.findMany({
    where: { type: 'APPOINTMENT' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Appointments</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Phone</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Time Slot</th>
              <th className="px-6 py-4 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((apt) => {
                const data = apt.data as any
                return (
                  <tr key={apt.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{apt.name}</td>
                    <td className="px-6 py-4">{apt.phone}</td>
                    <td className="px-6 py-4">{apt.email || '-'}</td>
                    <td className="px-6 py-4">{data?.date ? new Date(data.date).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4">{data?.slot || '-'}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(apt.createdAt).toLocaleString()}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
