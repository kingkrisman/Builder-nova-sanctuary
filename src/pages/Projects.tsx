import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProjectsSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDialog, projectImages } from "@/components/ProjectDialog";
import { SmartImage } from "@/components/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Pinned";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/lib/content";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Residential", "Commercial", "Mixed-Use", "Renovation"] as const;

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    projects.forEach((p) => p.category && (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, [projects]);

  const visible = category === "All" ? projects : projects.filter((p) => p.category === category);
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const gallery = useMemo(
    () => Array.from(new Set(projects.flatMap(projectImages))).slice(0, 10),
    [projects],
  );

  return (
    <Layout>
      <ProjectsSEO />
      <PageHeader
        title={
          <>
            Our <span className="text-primary">Projects</span>
          </>
        }
        subtitle="Excellence in Every Development"
        description="A portfolio of completed and ongoing work, from luxury residential estates to commercial complexes."
        badge="Portfolio"
        backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
        action={{ label: "Start Your Project", href: "/contact" }}
      />

      {/* Filterable grid */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Browse the work"
              title={
                <>
                  Built with <span className="text-primary">pride.</span>
                </>
              }
              className="mb-0 md:mb-0"
            />
            <LayoutGroup>
              <div
                role="tablist"
                aria-label="Filter projects"
                className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:px-0"
              >
                {CATEGORIES.map((c) => {
                  const active = c === category;
                  const disabled = c !== "All" && !counts[c];
                  return (
                    <button
                      key={c}
                      role="tab"
                      aria-selected={active}
                      disabled={disabled}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-30",
                        active ? "text-white" : "text-neutral-600 hover:text-black",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="project-filter"
                          className="absolute inset-0 rounded-full bg-black"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      <span className="relative">
                        {c}
                        <span className="ml-1.5 text-xs opacity-50">{counts[c] ?? 0}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setOpen(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          {!isLoading && visible.length === 0 && (
            <p className="py-16 text-center text-neutral-500">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* Featured spotlight */}
      {featured && (
        <section className="bg-black py-24 text-white md:py-32">
          <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="clip">
              <Parallax offset={50} className="aspect-[4/5] rounded-3xl md:aspect-[4/3] lg:aspect-[4/5]">
                <SmartImage
                  src={featured.gallery?.[0] ?? featured.imageUrl}
                  alt={featured.title}
                  wrapperClassName="h-full w-full bg-neutral-900"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </Parallax>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Featured project"
                title={featured.title}
                subtitle={featured.description}
              />
              <Reveal>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
                  {[
                    { k: "Location", v: featured.location },
                    { k: "Type", v: featured.category },
                    { k: "Size", v: featured.size },
                    { k: "Completion", v: featured.completionYear ?? featured.projectStatus },
                  ]
                    .filter((d) => d.v)
                    .map((d) => (
                      <div key={d.k} className="bg-black p-5">
                        <dt className="text-xs uppercase tracking-widest text-white/50">{d.k}</dt>
                        <dd className="mt-1 text-lg font-semibold">{d.v}</dd>
                      </div>
                    ))}
                </dl>
              </Reveal>
              {!!featured.features?.length && (
                <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2">
                  {featured.features.map((f) => (
                    <RevealItem key={f} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary" /> {f}
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
              <Reveal delay={0.2}>
                <button
                  onClick={() => setOpen(featured)}
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  View project details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length >= 4 && (
        <section className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4">
            <SectionHeading
              eyebrow="Gallery"
              title={
                <>
                  Moments from <span className="text-primary">site to handover</span>
                </>
              }
              centered
            />
            <RevealGroup className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4" stagger={0.05}>
              {gallery.map((url, i) => (
                <RevealItem
                  key={url}
                  variant="scale"
                  className={cn(i % 7 === 0 && "row-span-2", i % 7 === 3 && "md:col-span-2")}
                >
                  <SmartImage
                    src={url}
                    alt=""
                    wrapperClassName="group h-full w-full rounded-2xl"
                    className="transition-transform duration-[1200ms] ease-out-expo hover:scale-110"
                    sizes="(min-width: 768px) 25vw, 50vw"
                    maxWidth={1080}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </Layout>
  );
}
