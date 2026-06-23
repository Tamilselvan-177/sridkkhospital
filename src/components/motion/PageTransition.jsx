import { motion, useReducedMotion } from "framer-motion"

export function PageTransition({ children }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <main>{children}</main>
  }

  return (
    <motion.main
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  )
}
