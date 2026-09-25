import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/lib/data";
import { resizeImage } from "@/lib/image";

export function projectImages(project: Project) {
  return Array.from(new Set([project.imageUrl, ...(project.gallery ?? [])].filter(Boolean)));
}

/** Full project view with a swipeable gallery. The dialog locks page scroll while open. */
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const images = project ? projectImages(project) : [];

  useEffect(() => setIndex(0), [project?.id]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-5xl gap-0 overflow-y-auto border-0 p-0 sm:rounded-3xl">
        {project && (
          <>
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 sm:rounded-t-3xl">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={images[index]}
                  src={resizeImage(images[index], 1600)}
                  alt={`${project.title}, photo ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:scale-105"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:scale-105"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Photo ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="grid gap-8 p-6 md:grid-cols-3 md:p-10">
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {project.category && (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">{project.category}</span>
                  )}
                  {project.projectStatus && (
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold">{project.projectStatus}</span>
                  )}
                </div>
                <DialogTitle className="mt-4 text-3xl font-bold tracking-tight">{project.title}</DialogTitle>
                <DialogDescription className="mt-3 text-base leading-relaxed text-neutral-600">
                  {project.description}
                </DialogDescription>
                {!!project.features?.length && (
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <dl className="space-y-4 rounded-2xl bg-neutral-50 p-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <dt className="text-neutral-500">Location</dt>
                    <dd className="font-semibold">{project.location}</dd>
                  </div>
                </div>
                {project.size && (
                  <div className="flex items-start gap-3">
                    <Ruler className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <dt className="text-neutral-500">Size</dt>
                      <dd className="font-semibold">{project.size}</dd>
                    </div>
                  </div>
                )}
                {project.completionYear && (
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <dt className="text-neutral-500">Completion</dt>
                      <dd className="font-semibold">{project.completionYear}</dd>
                    </div>
                  </div>
                )}
              </dl>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
