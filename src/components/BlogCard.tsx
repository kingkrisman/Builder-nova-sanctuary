import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BlogPost } from "@/lib/data";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

export function BlogCard({ post, className, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg h-full border-black/10 hover:border-primary",
        featured && "md:flex md:flex-row",
        className,
      )}
    >
      <div className={cn("relative", featured ? "md:w-2/5" : "w-full")}>
        <AspectRatio ratio={16 / 9}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <Badge className="absolute top-2 right-2 bg-primary text-black font-medium">
          {post.category}
        </Badge>
      </div>

      <div className={cn("flex flex-col", featured && "md:w-3/5")}>
        <CardHeader className={cn(featured ? "md:pt-6" : "pt-6")}>
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
            <span className="mx-1">•</span>
            <Clock className="w-4 h-4 text-primary" />
            <span>{post.readTime} min read</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>

        <CardFooter className="mt-auto">
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
