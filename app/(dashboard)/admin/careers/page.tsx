import { prisma } from '@/lib/db'

export default async function CareersPage() {
  const careers = await prisma.formSubmission.findMany({
    where: { type: 'CAREERS' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Job Applications</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Phone</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Resume</th>
              <th className="px-6 py-4 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {careers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No job applications found.
                </td>
              </tr>
            ) : (
              careers.map((career) => {
                const data = career.data as any
                return (
                  <tr key={career.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{career.name}</td>
                    <td className="px-6 py-4 font-medium text-sky-600">{data?.role || '-'}</td>
                    <td className="px-6 py-4">{career.phone}</td>
                    <td className="px-6 py-4">{career.email}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {data?.resumeUrl ? (
                        <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                          View Resume
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(career.createdAt).toLocaleString()}
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
