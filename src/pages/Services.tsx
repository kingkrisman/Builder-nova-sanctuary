import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ServicesSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { SmartImage } from "@/components/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Pinned";
import { services } from "@/lib/data";

const PROCESS = [
  {
    title: "Consultation",
    body: "We start by listening: your goals, budget, timeline and the site itself. You leave with clear, honest advice.",
  },
  {
    title: "Planning & proposal",
    body: "Our team develops designs, costings and a schedule tailored to you, with every assumption spelled out.",
  },
  {
    title: "Execution & delivery",
    body: "Skilled crews and tight project management deliver to spec, on time, with regular progress updates.",
  },
  {
    title: "Handover & aftercare",
    body: "We walk you through every detail at handover, and our facility management team is there long after.",
  },
];

const DETAILS = [
  {
    title: "Property Development",
    body: "Our development services cover the full lifecycle, from land acquisition to project completion. We deliver residential, commercial and mixed-use developments with a focus on quality, sustainability and return on investment.",
    points: [
      "Residential developments: apartments, houses, estates",
      "Commercial developments: offices, retail spaces, malls",
      "Mixed-use developments",
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F5b476d39e79c489b893fbce223f62517",
  },
  {
    title: "Building Construction",
    body: "Structures that stand the test of time. Our skilled professionals complete every project to the highest standards of quality and safety.",
    points: ["Residential construction", "Commercial construction", "Institutional buildings"],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F2882003515394644b8f752a7f67c54b3",
  },
  {
    title: "Interior & Exterior Design",
    body: "We transform spaces into functional, beautiful environments that reflect your personality, blending creativity with practicality.",
    points: [
      "Interior space planning and design",
      "Exterior façade design",
      "Landscaping and outdoor spaces",
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F05b931d2989c419796354d089120dfba",
  },
];

/** Vertical timeline whose gold line draws itself as the section scrolls through. */
function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-16 pl-12 md:pl-20">
      <span className="absolute bottom-2 left-[11px] top-2 w-px bg-white/15 md:left-[19px]" />
      <motion.span
        className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-primary md:left-[19px]"
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
      />
      {PROCESS.map((step, i) => (
        <li key={step.title} className="relative">
          <Reveal variant="blur" amount={0.8}>
            <span className="absolute -left-12 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-black md:-left-20 md:h-10 md:w-10 md:text-sm">
              {i + 1}
            </span>
            <h3 className="text-2xl font-semibold md:text-4xl">{step.title}</h3>
            <p className="mt-3 max-w-xl text-lg text-white/65">{step.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export default function Services() {
  return (
    <Layout>
      <ServicesSEO />
      <PageHeader
        title={
          <>
            Our <span className="text-primary">Services</span>
          </>
        }
        subtitle="Comprehensive Real Estate Solutions"
        description="From property development and construction to interior design and facility management, end-to-end solutions tailored to your needs."
        badge="Full-Service Provider"
        backgroundImage="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
        action={{ label: "Request Consultation", href: "/contact" }}
      />

      {/* All services */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What we offer"
            title={
              <>
                Ten services, <span className="text-primary">one partner.</span>
              </>
            }
            subtitle="Whether you're buying your first plot or delivering a multi-unit estate, we cover every stage."
          />
          <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {services.map((service, i) => (
              <RevealItem key={service.id}>
                <ServiceCard service={service} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="bg-black py-24 text-white md:py-32">
        <div className="container mx-auto grid gap-16 px-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="How we work"
                title={
                  <>
                    A process built for <span className="text-primary">peace of mind.</span>
                  </>
                }
                subtitle="Four clear stages, with you informed at every step."
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* In-depth */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto space-y-24 px-4 md:space-y-32">
          {DETAILS.map((d, i) => (
            <div key={d.title} className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">
              <Reveal variant="clip" className={i % 2 ? "md:order-last" : ""}>
                <Parallax offset={50} className="aspect-[4/3] rounded-3xl">
                  <SmartImage
                    src={d.image}
                    alt={d.title}
                    wrapperClassName="h-full w-full"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </Parallax>
              </Reveal>
              <div>
                <Reveal>
                  <span className="font-serif text-6xl italic text-primary">0{i + 1}</span>
                  <h3 className="mt-4 text-3xl font-bold md:text-4xl">{d.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-neutral-600">{d.body}</p>
                </Reveal>
                <RevealGroup className="mt-8 divide-y border-y" delay={0.15}>
                  {d.points.map((p) => (
                    <RevealItem key={p} className="py-4 text-lg">
                      {p}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
