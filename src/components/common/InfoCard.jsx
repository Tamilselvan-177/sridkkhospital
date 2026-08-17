import { motion, useReducedMotion } from "framer-motion"

/**
 * InfoCard
 *
 * Props:
 *  title        — string
 *  description  — string (optional)
 *  image        — string URL
 *  href         — string  → navigate link (used when no onLearnMore)
 *  onLearnMore  — () => void → opens a popup modal (takes priority over href)
 */
export function InfoCard({ title, description, image, href, onLearnMore, imagePosition }) {
  const reduceMotion = useReducedMotion()
  const Card = reduceMotion ? "article" : motion.article
  const motionProps = reduceMotion
    ? {}
    : { whileHover: { y: -8, transition: { duration: 0.2 } } }

  return (
    <Card
      className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_10px_30px_-18px_rgba(2,132,199,0.4)] transition-shadow hover:shadow-[0_22px_40px_-20px_rgba(2,132,199,0.45)]"
      {...motionProps}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`h-52 w-full object-cover transition duration-500 group-hover:scale-105 ${imagePosition || "object-center"}`}
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/35 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        {description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}

        {/* onLearnMore takes priority — opens popup */}
        {onLearnMore ? (
          <button
            onClick={onLearnMore}
            className="mt-5 inline-flex items-center text-sm font-semibold text-sky-700 transition hover:text-sky-800"
          >
            Learn more{" "}
            <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
          </button>
        ) : href ? (
          <a
            href={href}
            className="mt-5 inline-flex items-center text-sm font-semibold text-sky-700 transition hover:text-sky-800"
          >
            Learn more{" "}
            <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
          </a>
        ) : null}
      </div>
    </Card>
  )
}
