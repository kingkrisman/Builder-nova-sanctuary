import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite horizontal ticker. Content is duplicated so the loop is seamless. */
export function Marquee({
  children,
  className,
  reverse = false,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  /** Seconds per loop */
  speed?: number;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
