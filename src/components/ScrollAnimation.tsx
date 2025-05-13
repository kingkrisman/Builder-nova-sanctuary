import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  animation: string;
  threshold?: number;
  delay?: number;
  className?: string;
}

export function ScrollAnimation({
  children,
  animation,
  threshold = 0.1,
  delay = 0,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when element is in view
            setTimeout(() => {
              if (ref.current) {
                ref.current.classList.add(animation);
              }
            }, delay);

            // Remove observer once animation is triggered
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        });
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animation, threshold, delay]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}
