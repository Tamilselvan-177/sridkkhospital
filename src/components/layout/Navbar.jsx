import { Menu, PhoneCall, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { siteData } from "../../data/siteData"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-3 z-50">
      <div className="container-shell">
        <div className="flex h-18 items-center justify-between gap-4 rounded-2xl border border-white/80 bg-white/90 px-4 shadow-[0_16px_34px_-24px_rgba(2,132,199,0.55)] backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={siteData.brand.logo}
            alt={`${siteData.brand.shortName} logo`}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-sky-100 shadow-sm"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{siteData.brand.shortName}</p>
            <p className="text-xs text-slate-600">{siteData.brand.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteData.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-sky-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteData.contact.phone.replace(/\s+/g, "")}`}
            className="hidden rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-800 md:inline-flex"
          >
            <PhoneCall className="mr-2 h-4 w-4" /> Call Now
          </a>
          <button
            type="button"
            className="rounded-xl border border-slate-300 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      </div>

      {open ? (
        <div className="container-shell md:hidden">
          <div className="mt-2 grid gap-1 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
            {siteData.navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-sky-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
