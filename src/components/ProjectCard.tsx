import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/lib/data";
import { MapPin } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-white/10 hover:border-primary bg-black/30 text-white">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-3 text-primary">
          {project.title}
        </CardTitle>
        <p className="text-white/70 mb-4">{project.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-6 px-6">
        <div className="flex items-center gap-1 text-sm text-white/60">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{project.location}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
