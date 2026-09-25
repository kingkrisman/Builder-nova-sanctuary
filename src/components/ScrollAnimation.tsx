import { ReactNode } from "react";
import { Reveal, type RevealVariant } from "@/components/motion/Reveal";

interface ScrollAnimationProps {
  children: ReactNode;
  animation: string;
  threshold?: number;
  /** Milliseconds */
  delay?: number;
  className?: string;
}

// Maps the legacy CSS animation class names onto the framer-motion Reveal variants,
// so every existing <ScrollAnimation> across the site gets the upgraded motion for free.
const VARIANTS: Record<string, RevealVariant> = {
  "animate-fade-up": "up",
  "animate-fade-down": "down",
  "animate-fade-in": "fade",
  // Legacy names describe the side the element slides in from
  "animate-fade-left": "left",
  "animate-fade-right": "right",
};

export function ScrollAnimation({
  children,
  animation,
  threshold = 0.1,
  delay = 0,
  className = "",
}: ScrollAnimationProps) {
  return (
    <Reveal
      variant={VARIANTS[animation] ?? "up"}
      delay={delay / 1000}
      amount={threshold}
      className={className}
    >
      {children}
    </Reveal>
  );
}
