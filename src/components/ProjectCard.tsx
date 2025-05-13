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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
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
        <CardTitle className="text-xl mb-3">{project.title}</CardTitle>
        <p className="text-muted-foreground mb-4">{project.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-6 px-6">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
