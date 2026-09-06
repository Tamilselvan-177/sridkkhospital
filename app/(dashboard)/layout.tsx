'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  PhoneCall,
  MessageSquare,
  Briefcase,
  LogOut,
  Hospital,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Appointments', href: '/admin/appointments', icon: CalendarDays },
  { name: 'Callbacks', href: '/admin/callbacks', icon: PhoneCall },
  { name: 'Inquiries', href: '/admin/contacts', icon: MessageSquare },
  { name: 'Careers', href: '/admin/careers', icon: Briefcase },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-6">
          <Link href="/admin" className="flex items-center gap-3 font-bold">
            <Hospital className="h-6 w-6 text-sky-400" />
            <span>Staff Portal</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-slate-400" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 rounded-xl bg-slate-800 p-4">
            <p className="text-sm font-medium text-white">{session?.user?.name || 'Admin User'}</p>
            <p className="text-xs text-slate-400">{session?.user?.email || 'admin@sridkkhospital.com'}</p>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-700 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-600 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-slate-900">
            <Hospital className="h-5 w-5 text-sky-600" />
            <span>Staff Portal</span>
          </Link>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-500">
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  )
}
