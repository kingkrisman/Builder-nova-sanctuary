import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TeamSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamCard } from "@/components/TeamCard";
import { SmartImage } from "@/components/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { leadershipTeam } from "@/lib/data";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  { key: "executiveManagement", name: "Executive" },
  { key: "projectConstruction", name: "Project & Construction" },
  { key: "realEstate", name: "Real Estate" },
  { key: "designPlanning", name: "Design & Planning" },
  { key: "supportServices", name: "Support Services" },
  { key: "securityLogistics", name: "Security & Logistics" },
] as const;

const CULTURE = [
  {
    title: "Collaboration",
    body: "Engineers, architects, designers and agents working as one team, so nothing gets lost between disciplines.",
  },
  {
    title: "Continuous learning",
    body: "We invest in professional development to stay ahead of industry standards and best practice.",
  },
  {
    title: "Excellence",
    body: "The highest standards of quality and professionalism on every project, however large or small.",
  },
];

export default function Team() {
  const [dept, setDept] = useState<(typeof DEPARTMENTS)[number]["key"]>("executiveManagement");
  const members = leadershipTeam[dept];

  return (
    <Layout>
      <TeamSEO />
      <PageHeader
        title={
          <>
            Our <span className="text-primary">Leadership</span> Team
          </>
        }
        subtitle="Excellence Through Expert Leadership"
        description="The professionals behind every Da'sayonce project, bringing decades of expertise in development, construction, design and management."
        badge="Our people"
        backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
        action={{ label: "Join Our Team", href: "/careers" }}
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-14 px-4 md:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="A team of experts"
              title={
                <>
                  Our greatest asset is <span className="text-primary">our people.</span>
                </>
              }
            />
            <Reveal className="space-y-5 text-lg leading-relaxed text-neutral-600">
              <p>
                Our diverse group of professionals brings together expertise from engineering,
                architecture, interior design, project management and real estate.
              </p>
              <p>
                Every member of our leadership team is committed to our core values and to
                delivering exceptional results, so each project meets the highest standards of
                quality.
              </p>
            </Reveal>
          </div>
          <Reveal variant="clip">
            <SmartImage
              src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F1d77033fc36e46d4b147c3ce854efd1f"
              alt="The Da'sayonce team"
              wrapperClassName="aspect-[4/3] rounded-3xl"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-100 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Leadership"
            title={
              <>
                Meet the <span className="text-primary">team</span>
              </>
            }
          />
          <LayoutGroup>
            <div className="no-scrollbar -mx-4 mb-12 flex gap-1 overflow-x-auto px-4">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setDept(d.key)}
                  aria-pressed={dept === d.key}
                  className={cn(
                    "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                    dept === d.key ? "text-white" : "text-neutral-600 hover:text-black",
                  )}
                >
                  {dept === d.key && (
                    <motion.span
                      layoutId="team-filter"
                      className="absolute inset-0 rounded-full bg-black"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{d.name}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <AnimatePresence mode="wait">
            <motion.div
              key={dept}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            >
              {members.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-black py-24 text-white md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Culture"
            title={
              <>
                What makes Da'sayonce <span className="text-primary">special</span>
              </>
            }
          />
          <RevealGroup className="grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
            {CULTURE.map((c, i) => (
              <RevealItem key={c.title} className="bg-black p-8 md:p-10">
                <span className="font-serif text-5xl italic text-primary">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-8 text-black md:flex-row md:items-center md:p-12">
            <div>
              <h3 className="text-3xl font-bold">Want to join us?</h3>
              <p className="mt-2 text-black/70">
                We're always looking for talented people who share our commitment to excellence.
              </p>
            </div>
            <Link
              to="/careers"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-7 py-4 font-semibold text-white"
            >
              See open roles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
