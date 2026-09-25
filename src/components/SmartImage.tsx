import { ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { imageSrcSet, resizeImage } from "@/lib/image";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Rendered width hint, used as the `sizes` attribute. */
  sizes?: string;
  /** Largest width worth downloading for this slot. */
  maxWidth?: number;
  /** Load immediately (above-the-fold images). */
  priority?: boolean;
  /** Classes for the wrapper that holds the placeholder shimmer. */
  wrapperClassName?: string;
}

/**
 * Responsive, lazy-loaded image that fades in once decoded.
 * The wrapper shows a subtle placeholder so layout never jumps.
 */
export function SmartImage({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  maxWidth = 1920,
  priority = false,
  className,
  wrapperClassName,
  onLoad,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cn(
        "relative block overflow-hidden bg-neutral-200/70",
        wrapperClassName,
      )}
    >
      <img
        src={resizeImage(src, Math.min(maxWidth, 1440))}
        srcSet={imageSrcSet(src, maxWidth)}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error fetchpriority is valid HTML but not yet in React's types
        fetchpriority={priority ? "high" : "auto"}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out-expo",
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
          className,
        )}
        {...props}
      />
    </span>
  );
}
