import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  /** Small gold label above the title */
  eyebrow?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = false,
  className,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  // Observe the container, not the masked title: the title starts outside its clip box,
  // so observing it directly would never report it as visible.
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
          animate={shown ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <span className="h-px w-10 bg-primary" />
          <span className="eyebrow">{eyebrow}</span>
          {centered && <span className="h-px w-10 bg-primary" />}
        </motion.div>
      )}

      {/* Title rises out of a mask */}
      <h2 className="overflow-hidden pb-1 text-3xl font-bold leading-[1.1] md:text-5xl">
        <motion.span
          className="block"
          initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
          animate={shown ? (reduceMotion ? { opacity: 1 } : { y: "0%" }) : undefined}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.05 }}
        >
          {title}
        </motion.span>
      </h2>

      {subtitle && (
        <motion.p
          className={cn(
            "max-w-2xl text-base leading-relaxed opacity-70 md:text-lg",
            centered && "mx-auto",
          )}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={shown ? { opacity: 0.7, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
