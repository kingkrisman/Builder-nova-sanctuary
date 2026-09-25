import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/layout/Layout";
import { HomeSEO } from "@/components/RealEstateSEO";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { PropertyCard } from "@/components/PropertyCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { MobileAppPromo } from "@/components/MobileAppPromo";
import { SmartImage } from "@/components/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax, PinnedHorizontal, StackedCards } from "@/components/motion/Pinned";
import { Marquee } from "@/components/motion/Marquee";
import { Skeleton } from "@/components/ui/skeleton";
import { companyValues, differentiators, services, testimonials } from "@/lib/data";
import { useProjects, useProperties } from "@/lib/content";

const LOCATIONS = [
  "Lekki",
  "Ikoyi",
  "Victoria Island",
  "Ikorodu",
  "Magodo",
  "Mowe",
  "Gwarimpa",
  "Maitama",
  "Wuye",
  "Ibadan",
  "Port Harcourt",
];

// Services grouped into four pillars for the stacked scroll section
const PILLARS = [
  {
    title: "Develop",
    body: "Residential, commercial and mixed-use developments, from land acquisition to handover.",
    items: [services[0], services[1], services[6]],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F5b476d39e79c489b893fbce223f62517",
  },
  {
    title: "Transform",
    body: "Renovations and interior & exterior design that turn tired structures into spaces people love.",
    items: [services[2], services[3], services[7]],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F05b931d2989c419796354d089120dfba",
  },
  {
    title: "Transact",
    body: "Verified land and property sales with the documentation handled properly, start to finish.",
    items: [services[4], services[5]],
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
  },
  {
    title: "Manage & Advise",
    body: "Valuations, investment advice and day-to-day facility management that protect your returns.",
    items: [services[8], services[9]],
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
];

export default function Home() {
  const { data: projects } = useProjects();
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  const featuredProperties = (properties ?? [])
    .filter((p) => p.status === "For Sale" || p.status === "For Rent")
    .slice(0, 3);

  return (
    <Layout>
      <HomeSEO />
      <Hero />

      {/* Locations ticker */}
      <div className="border-y border-black/5 bg-white py-6">
        <Marquee speed={45}>
          {LOCATIONS.map((place) => (
            <span key={place} className="flex items-center gap-12 whitespace-nowrap text-2xl font-semibold tracking-tight text-neutral-300 md:text-3xl">
              {place}
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* About */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-14 px-4 md:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  Built on <span className="text-primary">integrity,</span> delivered with care.
                </>
              }
              className="mb-8 md:mb-8"
            />
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-neutral-600">
                Da'sayonce Real Estate and Properties is a Nigerian-owned company registered
                with the Corporate Affairs Commission (RC: 7115835). From our Lagos head office
                and branches across Nigeria, we create homes and investments that epitomise
                comfort, luxury and sustainability.
              </p>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2" delay={0.2}>
              {companyValues.slice(0, 4).map((value) => (
                <RevealItem key={value.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-semibold">{value.title}</p>
                    <p className="text-sm text-neutral-500">{value.description}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.3}>
              <Link
                to="/about"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Our story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <Reveal variant="clip" className="relative">
            <Parallax offset={40} className="aspect-[4/5] rounded-3xl">
              <SmartImage
                src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ff96e58722991403781c933a1465be5de"
                alt="Da'sayonce development"
                wrapperClassName="h-full w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Parallax>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-primary p-6 shadow-2xl md:block">
              <p className="font-serif text-4xl italic leading-none">Since 2014</p>
              <p className="mt-2 text-sm font-medium">Building across Nigeria</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services: stacked, scroll-locked cards */}
      <section className="bg-neutral-100 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Everything property, <span className="text-primary">under one roof.</span>
              </>
            }
            subtitle="Ten specialist services grouped into four ways we work with you."
          />
          <StackedCards
            items={PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className="grid overflow-hidden rounded-3xl bg-black text-white shadow-2xl md:min-h-[520px] md:grid-cols-2"
              >
                <div className="flex flex-col p-8 md:p-12">
                  <span className="font-serif text-6xl italic text-primary">0{i + 1}</span>
                  <h3 className="mt-6 text-3xl font-bold md:text-5xl">{pillar.title}</h3>
                  <p className="mt-4 max-w-md text-lg text-white/70">{pillar.body}</p>
                  <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                    {pillar.items.map((s) => (
                      <li key={s.id} className="flex items-start gap-3">
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          <span className="font-semibold">{s.title}</span>
                          <span className="text-white/55"> · {s.description}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <SmartImage
                  src={pillar.image}
                  alt={pillar.title}
                  wrapperClassName="hidden h-full min-h-[280px] md:block"
                  sizes="50vw"
                  maxWidth={1440}
                />
              </div>
            ))}
          />
          <Reveal className="mt-4 text-center">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 font-semibold underline decoration-primary decoration-2 underline-offset-8"
            >
              Explore all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Projects: horizontal scroll-locked rail */}
      <PinnedHorizontal
        className="bg-black text-white"
        header={
          <div className="container mx-auto mb-10 flex flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Our portfolio"
              title={
                <>
                  Projects that <span className="text-primary">speak for us.</span>
                </>
              }
              className="mb-0 md:mb-0"
            />
            <Link
              to="/projects"
              className="group inline-flex shrink-0 items-center gap-2 font-semibold text-white"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        }
      >
        {(projects ?? []).map((project) => (
          <Link
            key={project.id}
            to="/projects"
            className="w-[80vw] shrink-0 snap-center sm:w-[60vw] md:w-[38vw] lg:w-[30vw]"
          >
            <ProjectCard project={project} variant="poster" />
          </Link>
        ))}
        <Link
          to="/projects"
          className="group flex w-[70vw] shrink-0 snap-center flex-col items-center justify-center gap-4 rounded-2xl border border-white/15 text-center sm:w-[40vw] md:w-[22vw]"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-black transition-transform duration-500 group-hover:scale-110">
            <ArrowRight className="h-7 w-7" />
          </span>
          <span className="text-xl font-semibold">See every project</span>
        </Link>
      </PinnedHorizontal>

      {/* Featured properties */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="On the market"
              title={
                <>
                  Featured <span className="text-primary">properties</span>
                </>
              }
              subtitle="Hand-picked homes and investments available right now."
            />
            <Reveal className="mb-12 md:mb-16">
              <Link
                to="/properties"
                className="group inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 font-semibold transition-colors hover:bg-black hover:text-white"
              >
                All listings
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propertiesLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
                ))
              : featuredProperties.map((property) => (
                  <RevealItem key={property.id}>
                    <PropertyCard property={property} />
                  </RevealItem>
                ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-neutral-100 py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-14 px-4 md:grid-cols-2 lg:gap-20">
          <Reveal variant="clip" className="order-last md:order-first">
            <Parallax offset={40} className="aspect-[4/5] rounded-3xl">
              <SmartImage
                src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ffda83bddc58a41748f24a9d9dac8b329"
                alt="Why choose Da'sayonce"
                wrapperClassName="h-full w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Parallax>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Why Da'sayonce"
              title={
                <>
                  What <span className="text-primary">sets us apart</span>
                </>
              }
              subtitle="Our commitment to excellence shows in every detail, from the first survey to the final key handover."
            />
            <RevealGroup className="grid gap-px overflow-hidden rounded-2xl bg-black/10 sm:grid-cols-2">
              {differentiators.map((item, i) => (
                <RevealItem key={item.title} className="bg-neutral-100 p-6">
                  <span className="text-sm font-semibold text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-neutral-600">{item.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Mortgage calculator */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-14 px-4 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Plan ahead"
              title={
                <>
                  Calculate your <span className="text-primary">mortgage</span>
                </>
              }
              subtitle="Get instant estimates for monthly payments, interest and total cost before you commit."
            />
            <RevealGroup className="space-y-4">
              {[
                "Instant payment calculations",
                "Interest rate comparisons",
                "Down payment planning",
                "Total cost breakdown",
              ].map((item) => (
                <RevealItem key={item} className="flex items-center gap-3 text-lg">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                  </span>
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal variant="right" className="[&>div]:rounded-3xl [&>div]:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.25)]">
            <MortgageCalculator />
          </Reveal>
        </div>
      </section>

      <MobileAppPromo />

      {/* Testimonials */}
      <section className="border-t border-white/10 bg-neutral-950 py-24 text-white md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Client stories"
            title={
              <>
                In their <span className="text-primary">own words</span>
              </>
            }
            centered
          />
          <RevealGroup className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2" stagger={0.12}>
            {testimonials.map((testimonial) => (
              <RevealItem key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </Layout>
  );
}
