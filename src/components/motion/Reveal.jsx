import { motion, useReducedMotion } from "framer-motion"

export function Reveal({ children, className = "", direction = "up", delay = 0 }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div className={className}>{children}</div>

  const initialByDirection = {
    up: { opacity: 0, y: 16 },
    left: { opacity: 0, x: -24 },
    right: { opacity: 0, x: 24 },
  }

  return (
    <motion.div
      className={className}
      initial={initialByDirection[direction] ?? initialByDirection.up}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
