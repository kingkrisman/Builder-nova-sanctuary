import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactInfo } from "@/lib/data";

const LOGO =
  "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078?width=320";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Properties", path: "/properties" },
  { name: "Team", path: "/team" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid glass once scrolled; slide away while scrolling down, return on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !open);
  });

  // Sticky elements (filter bars, sidebars) read this to sit just below the visible navbar
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-offset", hidden ? "0px" : "80px");
  }, [hidden]);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock the page behind the open mobile menu
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-20 items-center text-white transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled || open
            ? "border-b border-white/10 bg-black/75 backdrop-blur-xl"
            : "border-b border-transparent bg-black",
        )}
        animate={{ y: hidden && !reduceMotion ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/" className="relative z-[60] flex items-center" aria-label="Da'sayonce home">
            <img src={LOGO} alt="Da'sayonce Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.path) ? "text-white" : "text-white/65 hover:text-white",
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="group ml-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </nav>

          {/* Mobile toggle: two lines that morph into an X */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
          >
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-white transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-white transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-black px-6 pb-8 pt-28 text-white lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
          >
            <nav className="flex-1 overflow-y-auto" aria-label="Mobile">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <li key={item.path} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 + i * 0.04 }}
                    >
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-baseline gap-4 py-1.5 text-4xl font-semibold tracking-tight",
                          isActive(item.path) ? "text-primary" : "text-white",
                        )}
                      >
                        <span className="w-6 text-xs font-medium text-white/40 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="space-y-1 border-t border-white/10 pt-6 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {contactInfo
                .find((c) => c.title === "Phone")
                ?.details.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="block hover:text-primary">
                    {phone}
                  </a>
                ))}
              <a href="mailto:Sayonce99@gmail.com" className="block hover:text-primary">
                Sayonce99@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
