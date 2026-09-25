import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { AboutSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SmartImage } from "@/components/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { companyInfo, companyValues } from "@/lib/data";

const SPECIALISMS = [
  "Property Development",
  "Construction",
  "Renovation",
  "Interior & Exterior Design",
  "Land Sales & Documentation",
  "Property Management",
  "Real Estate Consultancy",
];

const GALLERY = [
  { url: "https://images.pexels.com/photos/8837715/pexels-photo-8837715.jpeg", alt: "Team collaboration on architectural plans" },
  { url: "https://images.pexels.com/photos/16612657/pexels-photo-16612657.jpeg", alt: "Construction site at sunset" },
  { url: "https://images.pexels.com/photos/32473240/pexels-photo-32473240.png", alt: "Modern living room and kitchen design" },
  { url: "https://images.pexels.com/photos/7242263/pexels-photo-7242263.jpeg", alt: "Empty modern room with geometric design" },
  { url: "https://images.pexels.com/photos/14646006/pexels-photo-14646006.jpeg", alt: "Aerial view of residential property" },
  { url: "https://images.pexels.com/photos/13515672/pexels-photo-13515672.jpeg", alt: "High-rise building under construction" },
  { url: "https://images.pexels.com/photos/9244866/pexels-photo-9244866.jpeg", alt: "Contemporary apartment buildings" },
  { url: "https://images.pexels.com/photos/17797763/pexels-photo-17797763.jpeg", alt: "Modern commercial building facade" },
  { url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg", alt: "Completed family home" },
];

/** Three columns drifting at different speeds as the section scrolls past. */
function DriftGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const speeds = [
    useTransform(scrollYProgress, [0, 1], [60, -120]),
    useTransform(scrollYProgress, [0, 1], [-40, 80]),
    useTransform(scrollYProgress, [0, 1], [100, -160]),
  ];
  const columns = [GALLERY.slice(0, 3), GALLERY.slice(3, 6), GALLERY.slice(6, 9)];

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 overflow-hidden md:grid-cols-3 md:gap-6">
      {columns.map((col, c) => (
        <motion.div
          key={c}
          style={reduceMotion ? undefined : { y: speeds[c] }}
          className={`space-y-4 md:space-y-6 ${c === 2 ? "hidden md:block" : ""}`}
        >
          {col.map((img, i) => (
            <SmartImage
              key={img.url}
              src={img.url}
              alt={img.alt}
              wrapperClassName={`rounded-2xl ${(i + c) % 2 ? "aspect-[4/5]" : "aspect-square"}`}
              sizes="(min-width: 768px) 33vw, 50vw"
              maxWidth={1080}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <Layout>
      <AboutSEO />
      <PageHeader
        title={
          <>
            About <span className="text-primary">Da'sayonce</span> Real Estate
          </>
        }
        subtitle="Transforming Spaces. Building Trust."
        description="Over a decade of excellence in Nigerian real estate development, construction, and property management."
        badge="Established 2014"
        backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
        action={{ label: "Meet Our Team", href: "/team" }}
      />

      {/* MD/CEO letter */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto grid gap-14 px-4 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal variant="clip">
                <SmartImage
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F88438a5961da449a8d020124630b99a4"
                  alt="Engr. Olusayo Taiwo Okusanya, MD/CEO"
                  wrapperClassName="aspect-[4/5] rounded-3xl"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-xl font-semibold">Engr. Olusayo Taiwo Okusanya</p>
                <p className="text-neutral-500">MD/CEO · MNSE, COREN</p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="A welcome from our MD/CEO"
              title={
                <>
                  Let's build the <span className="text-primary">future</span> together.
                </>
              }
            />
            <Reveal className="space-y-6 text-lg leading-relaxed text-neutral-700 md:text-xl">
              <p>Dear Esteemed Clients and Partners,</p>
              <p>
                It is with great pleasure that I welcome you to Da'sayonce Real Estate and
                Properties Limited. Our journey began with a vision to redefine real estate in
                Nigeria, focusing on innovation, quality, and client satisfaction. Today, we
                stand as a testament to what dedication and integrity can achieve.
              </p>
              <p>
                Our team of professionals is committed to delivering exceptional services across
                property development, construction, interior design, and more. We believe in
                building not just structures, but lasting relationships grounded in trust and
                excellence.
              </p>
              <p>Thank you for choosing Da'sayonce. Together, let's build the future.</p>
              <div className="border-t pt-6">
                <p className="font-serif text-4xl italic text-black">Olusayo T. Okusanya</p>
                <p className="mt-1 text-base text-neutral-500">MD/CEO (MNSE, COREN)</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="bg-black py-24 text-white md:py-32">
        <div className="container mx-auto grid gap-px overflow-hidden rounded-3xl bg-white/10 px-0 md:grid-cols-2">
          {[
            { label: "Our vision", text: companyInfo.vision },
            { label: "Our mission", text: companyInfo.mission },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.12} className="bg-black p-8 md:p-14">
              <p className="eyebrow">{item.label}</p>
              <p className="mt-6 text-2xl font-medium leading-snug md:text-3xl">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Company profile */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Company profile"
            title={
              <>
                Nigerian-owned, <span className="text-primary">nationwide</span> in reach.
              </>
            }
            subtitle="Registered with the Corporate Affairs Commission (RC: 7115835). Headquartered in Lagos, with branches in Abuja, Ogun, Ibadan, Port Harcourt and other major cities."
          />
          <RevealGroup className="divide-y border-y">
            {SPECIALISMS.map((item, i) => (
              <RevealItem key={item} className="group flex items-center justify-between py-5">
                <span className="text-xl font-medium transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:text-2xl">
                  {item}
                </span>
                <span className="text-sm tabular-nums text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Core values: heading stays locked while the values scroll past */}
      <section className="bg-neutral-100 py-24 md:py-32">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Core values"
                title={
                  <>
                    The principles we <span className="text-primary">build on.</span>
                  </>
                }
                subtitle="Seven commitments that guide how we work with every client, partner and community."
              />
            </div>
          </div>
          <div className="space-y-4 lg:col-span-7">
            {companyValues.map((value, i) => (
              <Reveal key={value.title} variant="up" amount={0.6}>
                <div className="flex gap-6 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
                  <span className="font-serif text-4xl italic text-primary md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold md:text-2xl">{value.title}</h3>
                    <p className="mt-1 text-neutral-600">{value.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="overflow-hidden bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our journey"
            title={
              <>
                A decade in <span className="text-primary">pictures</span>
              </>
            }
            subtitle="The growth, the milestones, and the spaces we've transformed."
            centered
          />
          <DriftGallery />
        </div>
      </section>
    </Layout>
  );
}
