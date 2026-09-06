import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <section className="container-shell py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">404</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        This route is not available in the redesign yet. Return to home to continue browsing.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white"
      >
        Back to Home
      </Link>
    </section>
  )
}
