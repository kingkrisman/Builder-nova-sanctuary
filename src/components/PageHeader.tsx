import { ReactNode, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { resizeImage } from "@/lib/image";

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string;
  backgroundImage?: string;
  gradient?: "primary" | "dark" | "blue" | "purple" | "green";
  badge?: string;
  showBreadcrumb?: boolean;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
}

// Same curve as the home hero so every page enters with the same feel.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;


export function PageHeader({
  title,
  subtitle,
  description,
  backgroundImage,
  gradient = "dark",
  badge,
  showBreadcrumb = true,
  action,
  className = "",
}: PageHeaderProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const imageUrl = backgroundImage ? resizeImage(backgroundImage, 1920) : undefined;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload so the photo fades in once decoded rather than painting in over black.
  useEffect(() => {
    if (!imageUrl) return;
    setImageLoaded(false);
    const img = new Image();
    img.onload = img.onerror = () => setImageLoaded(true);
    img.src = imageUrl;
  }, [imageUrl]);

  const getGradientClasses = () => {
    switch (gradient) {
      case "primary":
        return "bg-gradient-to-br from-primary/10 via-primary/5 to-background";
      case "blue":
        return "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900";
      case "purple":
        return "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900";
      case "green":
        return "bg-gradient-to-br from-green-600 via-green-700 to-green-900";
      case "dark":
      default:
        return "bg-gradient-to-br from-gray-900 via-black to-gray-800";
    }
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Home", href: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = showBreadcrumb ? getBreadcrumbs() : [];

  const reveal = (delay: number) =>
    reduceMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3 },
        }
      : {
          initial: { opacity: 0, y: 24, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

  return (
    <section
      className={`relative isolate flex min-h-[26rem] flex-col overflow-hidden bg-black text-white md:min-h-[32rem] ${className}`}
    >
      {/* Background: photo with the hero's slow settle, or a brand gradient */}
      {imageUrl ? (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.1 }}
          animate={
            imageLoaded
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: reduceMotion ? 1 : 1.1 }
          }
          transition={{ duration: 2.4, ease: EASE_OUT }}
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 ${getGradientClasses()}`}
        />
      )}

      {/* Legibility scrims, matching the home hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
      />

      <div className="container mx-auto flex w-full flex-1 flex-col justify-center px-4 py-14 md:py-20">
        {showBreadcrumb && breadcrumbs.length > 1 && (
          <motion.nav {...reveal(0)} aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-y-1 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="mx-2 h-4 w-4 text-white/40" />
                  )}
                  {index === 0 && <Home className="mr-2 h-4 w-4" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span
                      aria-current="page"
                      className="font-medium text-primary"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div className="max-w-3xl">
          {badge && (
            <motion.div
              {...reveal(0.1)}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title rises out of a mask, like the home headline */}
          <h1 className="overflow-hidden pb-1 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            <motion.span
              className="block"
              initial={reduceMotion ? { opacity: 0 } : { y: "105%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: "0%" }}
              transition={{
                duration: reduceMotion ? 0.3 : 0.9,
                delay: 0.2,
                ease: EASE_OUT,
              }}
            >
              {title}
            </motion.span>
          </h1>

          {subtitle && (
            <motion.div
              {...reveal(0.4)}
              className="mt-5 text-xl text-white/85 md:text-2xl"
            >
              {subtitle}
            </motion.div>
          )}

          {description && (
            <motion.p
              {...reveal(0.5)}
              className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75"
            >
              {description}
            </motion.p>
          )}

          {action && (
            <motion.div {...reveal(0.6)} className="mt-8">
              <Button
                asChild={!!action.href}
                size="lg"
                onClick={action.href ? undefined : action.onClick}
                className={
                  action.variant === "outline"
                    ? "group h-14 border border-white/40 bg-white/5 px-8 text-base text-white backdrop-blur-md transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-black active:scale-[0.97]"
                    : "group h-14 bg-primary px-8 text-base text-black transition-transform duration-150 hover:bg-primary/90 active:scale-[0.97]"
                }
              >
                {action.href && /^(tel|mailto|https?):/.test(action.href) ? (
                  // External and phone/email links can't go through the router
                  <a href={action.href}>
                    {action.label}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                ) : action.href ? (
                  <Link to={action.href}>
                    {action.label}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <>
                    {action.label}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
}
