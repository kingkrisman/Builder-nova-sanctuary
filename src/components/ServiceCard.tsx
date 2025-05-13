import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/lib/data";
import { Building2, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon || Building2;

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg border-black/10 hover:border-primary">
      <CardHeader>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base min-h-[60px]">
          {service.description}
        </CardDescription>
        <Button asChild variant="ghost" className="p-0 h-auto" size="sm">
          <Link
            to="/services"
            className="flex items-center gap-1 text-primary hover:text-primary/80"
          >
            Learn more <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
