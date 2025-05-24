import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobListing } from "@/lib/data";
import { MapPin, Clock, Briefcase, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: JobListing;
  featured?: boolean;
}

export function JobCard({ job, featured = false }: JobCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg h-full border-black/10 hover:border-primary ${featured ? "border-l-4 border-l-primary" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="mt-1">{job.department}</CardDescription>
          </div>
          <Badge
            className={`${job.type === "Full-time" ? "bg-primary text-black" : "bg-slate-200 text-slate-800"}`}
          >
            {job.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-primary" />
              <span>{job.experience}</span>
            </div>
            {job.deadline && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Apply by {job.deadline}</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground">{job.description}</p>

          {featured && (
            <div className="mt-2">
              <h4 className="font-medium mb-1">Key Responsibilities:</h4>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                {job.responsibilities.slice(0, 3).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          asChild
          variant={featured ? "default" : "outline"}
          className={
            featured ? "bg-primary text-black hover:bg-primary/90" : ""
          }
        >
          <Link to={`/careers/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
