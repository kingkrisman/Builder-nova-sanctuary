import { MapPin } from "lucide-react";
import { Project } from "@/lib/data";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  /** Tall poster format for rails, standard for grids */
  variant?: "poster" | "standard";
  onClick?: () => void;
}

export function ProjectCard({ project, className, variant = "standard", onClick }: ProjectCardProps) {
  const Wrapper = onClick ? "button" : "article";
  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl bg-neutral-900 text-left text-white",
        variant === "poster" ? "aspect-[3/4]" : "aspect-[4/5] md:aspect-[4/3]",
        className,
      )}
    >
      <SmartImage
        src={project.imageUrl}
        alt={project.title}
        wrapperClassName="absolute inset-0 bg-neutral-800"
        className="transition-transform duration-[1400ms] ease-out-expo group-hover:scale-110"
        sizes={variant === "poster" ? "(min-width: 768px) 420px, 80vw" : "(min-width: 1024px) 33vw, 100vw"}
        maxWidth={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/0 transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute left-5 top-5 flex gap-2">
        {project.category && (
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-medium backdrop-blur">
            {project.category}
          </span>
        )}
        {project.projectStatus === "Ongoing" && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black">Ongoing</span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mb-2 flex items-center gap-1.5 text-sm text-white/70">
          <MapPin className="h-4 w-4 text-primary" />
          {project.location}
        </p>
        <h3 className="text-2xl font-bold leading-tight">{project.title}</h3>
        {/* Description slides up on hover */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-expo group-hover:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm leading-relaxed text-white/75">
            <span className="block pt-3">{project.description}</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
