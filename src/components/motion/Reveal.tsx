import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "scale"
  | "blur"
  | "clip";

const hidden: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 0, y: 40 },
  down: { opacity: 0, y: -40 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.92 },
  blur: { opacity: 0, y: 24, filter: "blur(12px)" },
  // Wipes the element in from the bottom edge, like a curtain rising
  clip: { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" },
};

const shown: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  fade: { opacity: 1 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, y: 0, filter: "blur(0px)" },
  clip: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
};

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds */
  delay?: number;
  duration?: number;
  className?: string;
  /** Fraction of the element that must be visible before it animates */
  amount?: number;
  as?: "div" | "section" | "li" | "span" | "article";
}

/** Animates its children in once when scrolled into view. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration,
  className,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px -8% 0px" });

  // A fully clipped element counts as invisible to IntersectionObserver, so the clip
  // wipe watches an unclipped wrapper and animates an inner layer instead.
  if (variant === "clip" && !reduceMotion) {
    const Outer = as;
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Outer ref={ref as any} className={cn(className)}>
        <motion.div
          className="h-full w-full"
          initial={hidden.clip}
          animate={inView ? shown.clip : hidden.clip}
          transition={{ duration: duration ?? 1.1, delay, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      </Outer>
    );
  }

  return (
    <Component
      className={cn(className)}
      initial={reduceMotion ? { opacity: 0 } : hidden[variant]}
      whileInView={reduceMotion ? { opacity: 1 } : shown[variant]}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0.3 : (duration ?? (variant === "clip" ? 1.1 : 0.9)),
        delay: reduceMotion ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </Component>
  );
}

/** Staggers direct <RevealItem> children as the group scrolls into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduceMotion ? { opacity: 0 } : hidden[variant],
        shown: {
          ...(reduceMotion ? { opacity: 1 } : shown[variant]),
          transition: { duration: reduceMotion ? 0.3 : 0.9, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
