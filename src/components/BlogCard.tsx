import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/lib/data";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

export const formatPostDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <SmartImage
          src={post.imageUrl}
          alt={post.title}
          wrapperClassName="absolute inset-0"
          className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
          maxWidth={1080}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-black backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {formatPostDate(post.date)} · {post.readTime} min read
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug">
          <Link
            to={`/blog/${post.slug}`}
            className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo after:absolute after:inset-0 group-hover:bg-[length:100%_2px]"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-neutral-600">{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
