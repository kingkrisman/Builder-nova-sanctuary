import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Back-to-top button whose ring fills with page progress. */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-xl ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Thin gold reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}
