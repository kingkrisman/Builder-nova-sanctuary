import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/data";
import { SmartImage } from "@/components/SmartImage";
import { formatPostDate } from "@/components/BlogCard";

export function FeaturedBlogPost({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-3xl bg-black text-white"
    >
      <div className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        <SmartImage
          src={post.imageUrl}
          alt={post.title}
          priority
          sizes="100vw"
          wrapperClassName="absolute inset-0 bg-neutral-800"
          className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black">
            {post.category}
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">{post.title}</h2>
          <p className="mt-4 hidden max-w-2xl text-lg text-white/75 md:block">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            <span>{formatPostDate(post.date)}</span>
            <span>{post.readTime} min read</span>
            <span className="inline-flex items-center gap-2 font-semibold text-white">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
