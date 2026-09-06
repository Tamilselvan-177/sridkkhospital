import { prisma } from '@/lib/db'

export default async function CallbacksPage() {
  const callbacks = await prisma.formSubmission.findMany({
    where: { type: 'CALLBACK' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Callback Requests</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Phone</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {callbacks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No callback requests found.
                </td>
              </tr>
            ) : (
              callbacks.map((cb) => (
                <tr key={cb.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{cb.name}</td>
                  <td className="px-6 py-4">{cb.phone}</td>
                  <td className="px-6 py-4">{cb.email || '-'}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(cb.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
