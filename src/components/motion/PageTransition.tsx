import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_IN_OUT = [0.87, 0, 0.13, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Curtain transition between routes. On leave, a gold then black panel rises to cover the
 * screen; on arrival the black panel lifts away to reveal the new page, which settles up.
 * Used inside <AnimatePresence mode="wait"> keyed by pathname.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: -40 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
      >
        {children}
      </motion.div>

      {/* Leaving: gold sweep, closely followed by black */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] origin-bottom bg-primary"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: EASE_IN_OUT }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[96] origin-bottom bg-black"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: EASE_IN_OUT, delay: 0.08 }}
      />

      {/* Arriving: black lifts off the top to reveal the page */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[96] flex origin-top items-center justify-center bg-black"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE_IN_OUT, delay: 0.1 }}
      >
        <motion.img
          src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078?width=240"
          alt=""
          className="h-16 w-auto"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
