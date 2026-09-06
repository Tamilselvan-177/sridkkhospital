import { prisma } from '@/lib/db'

export default async function ContactsPage() {
  const contacts = await prisma.formSubmission.findMany({
    where: { type: 'CONTACT' },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">General Inquiries</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Phone</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Message</th>
              <th className="px-6 py-4 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => {
                const data = contact.data as any
                return (
                  <tr key={contact.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={data?.message}>{data?.message || '-'}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleString()}
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
