import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/data";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedBlogPostProps {
  post: BlogPost;
}

export function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12 text-white">
        <div className="max-w-3xl">
          <Badge className="bg-primary text-black font-medium mb-4">
            {post.category}
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h2>

          <div className="flex items-center gap-2 text-white/80 mb-6">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
            <span className="mx-1">•</span>
            <Clock className="w-4 h-4 text-primary" />
            <span>{post.readTime} min read</span>
          </div>

          <p className="text-white/90 text-lg mb-8 max-w-2xl">{post.excerpt}</p>

          <Button asChild className="bg-primary text-black hover:bg-primary/90">
            <Link to={`/blog/${post.slug}`}>
              Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
