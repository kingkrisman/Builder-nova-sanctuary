import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Scroll-locked horizontal rail: the section pins to the viewport and vertical scrolling
 * drives the track sideways until its last item is in view, then the page continues.
 * On phones (and with reduced motion) it falls back to a native swipeable rail.
 */
export function PinnedHorizontal({
  children,
  header,
  className,
  trackClassName,
}: {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isMobile, reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // A light spring takes the edge off wheel steps without feeling laggy
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  if (isMobile || reduceMotion) {
    return (
      <section className={cn("py-20", className)}>
        {header}
        <div
          className={cn(
            "no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4",
            trackClassName,
          )}
        >
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={cn("relative", className)}
      // Scroll length = the sideways distance, plus one screen for the pin itself
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        {header}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className={cn("flex w-max gap-6 px-8 will-change-transform", trackClassName)}
        >
          {children}
        </motion.div>
        <ProgressLine progress={smooth} />
      </div>
    </section>
  );
}

function ProgressLine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="h-px w-full bg-current opacity-15" />
      <motion.div
        className="-mt-px h-px origin-left bg-primary"
        style={{ scaleX: progress }}
      />
    </div>
  );
}

/**
 * Cards that pin one after another and stack, with earlier cards receding.
 * Each child becomes one full-height step.
 */
export function StackedCards({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {items.map((item, i) => (
        <StackedCard
          key={i}
          index={i}
          total={items.length}
          progress={scrollYProgress}
          disabled={!!reduceMotion}
        >
          {item}
        </StackedCard>
      ))}
    </div>
  );
}

function StackedCard({
  children,
  index,
  total,
  progress,
  disabled,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  disabled: boolean;
}) {
  // Once the next card starts arriving, this one shrinks and dims into the stack
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.04;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const brightness = useTransform(progress, [start, 1], [1, 0.6]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div className="sticky top-24 flex h-[80vh] items-start justify-center md:top-28">
      <motion.div
        className="relative w-full origin-top"
        style={
          disabled
            ? { top: index * 16 }
            : { scale, filter, top: index * 16 }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Moves children slower (or faster) than the scroll for depth. */
export function Parallax({
  children,
  offset = 80,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        style={reduceMotion ? undefined : { y, scale: 1.15 }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
