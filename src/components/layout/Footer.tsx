import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { socialMedia } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Our Team", to: "/team" },
      { label: "Careers", to: "/careers" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Services", to: "/services" },
      { label: "Projects", to: "/projects" },
      { label: "Properties", to: "/properties" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Closing call to action */}
      <div className="container mx-auto border-b border-white/10 px-4 py-20 md:py-28">
        <Reveal variant="blur">
          <p className="eyebrow mb-6">Start a conversation</p>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
              Let's build something <span className="text-primary">that lasts.</span>
            </h2>
            <Link
              to="/contact"
              className="group inline-flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-primary text-center text-sm font-semibold text-black transition-transform duration-500 ease-out-expo hover:scale-110 md:h-40 md:w-40"
            >
              <span className="flex flex-col items-center gap-1">
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                Get in touch
              </span>
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-12">
        <div className="space-y-4 md:col-span-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078?width=320"
            alt="Da'sayonce"
            className="h-16 w-auto"
            loading="lazy"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Da'sayonce Real Estate and Properties Limited. Transforming spaces, building
            trust across Nigeria. RC: 7115835.
          </p>
          <div className="flex gap-2 pt-2">
            {socialMedia.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:bg-primary hover:text-black"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/75 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <address className="space-y-4 not-italic md:col-span-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Head office
          </h3>
          <p className="text-white/75">69, Ayangburen Road, Ojogbe Bus Stop, Ikorodu, Lagos.</p>
          <div className="space-y-1">
            <a href="mailto:Sayonce99@gmail.com" className="block text-white/75 hover:text-primary">
              Sayonce99@gmail.com
            </a>
            <a href="tel:+2348102067476" className="block text-white/75 hover:text-primary">
              +234 810 206 7476
            </a>
            <a href="tel:+2347064258898" className="block text-white/75 hover:text-primary">
              +234 706 425 8898
            </a>
          </div>
        </address>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden="true" className="pointer-events-none select-none px-4">
        <p className="-mb-[0.18em] whitespace-nowrap text-center font-serif text-[17vw] italic leading-none text-white/[0.06]">
          Da'sayonce
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/50 md:flex-row">
          <p>© {year} Da'sayonce Real Estate and Properties. All rights reserved.</p>
          <p>Lagos · Abuja · Ogun · Ibadan · Port Harcourt</p>
        </div>
      </div>
    </footer>
  );
}
