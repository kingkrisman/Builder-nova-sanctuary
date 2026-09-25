import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { BlogSEO } from "@/components/RealEstateSEO";
import { FeaturedBlogPost } from "@/components/FeaturedBlogPost";
import { BlogCard } from "@/components/BlogCard";
import { Reveal } from "@/components/motion/Reveal";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Blog() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );
  const [featured, ...rest] = posts;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // While browsing everything, the featured post is shown above rather than repeated
    const pool = !q && category === "All" ? rest : posts;
    return pool.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))),
    );
  }, [posts, rest, query, category]);

  return (
    <Layout>
      <BlogSEO />

      <section className="bg-black pb-16 pt-16 text-white md:pb-24 md:pt-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <p className="eyebrow">Insights & news</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] md:text-7xl">
              Notes on Nigerian <span className="text-primary">real estate.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/65">
              Market trends, buying guides and stories from our projects, written by the people
              who build them.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            {isLoading ? (
              <Skeleton className="aspect-[21/9] rounded-3xl bg-white/10" />
            ) : (
              featured && <FeaturedBlogPost post={featured} />
            )}
          </Reveal>
        </div>
      </section>

      <section className="min-h-[50vh] bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <LayoutGroup>
              <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:px-0">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={cn(
                      "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                      category === c ? "text-white" : "text-neutral-600 hover:text-black",
                    )}
                  >
                    {category === c && (
                      <motion.span
                        layoutId="blog-filter"
                        className="absolute inset-0 rounded-full bg-black"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <div className="relative md:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 rounded-full bg-neutral-50 pl-11"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[16/10] rounded-2xl" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div layout className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.05 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="py-16 text-center text-neutral-500">
              {posts.length ? "No articles match your search." : "Articles are coming soon."}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
