import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import { ArrowLeft, Link2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { BlogPostSEO } from "@/components/RealEstateSEO";
import { BlogCard, formatPostDate } from "@/components/BlogCard";
import { SmartImage } from "@/components/SmartImage";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Pinned";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/lib/content";
import { getInitials } from "@/lib/utils";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: posts = [], isLoading } = useBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  // Articles are written in the admin editor; sanitise before rendering as HTML
  const html = useMemo(() => (post ? DOMPurify.sanitize(post.content) : ""), [post]);

  const related = useMemo(() => {
    if (!post) return [];
    const same = posts.filter((p) => p.id !== post.id && p.category === post.category);
    const others = posts.filter((p) => p.id !== post.id && p.category !== post.category);
    return [...same, ...others].slice(0, 3);
  }, [posts, post]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto max-w-3xl space-y-6 px-4 py-24">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="aspect-[16/9] w-full rounded-3xl" />
        </div>
      </Layout>
    );
  }
  if (!post) return <Navigate to="/blog" replace />;

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };

  return (
    <Layout>
      <BlogPostSEO post={post} />

      <article>
        <header className="bg-white pt-12 md:pt-20">
          <div className="container mx-auto max-w-4xl px-4">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All articles
            </Link>
            <Reveal>
              <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-primary">
                {post.category}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.08] md:text-6xl">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-600">{post.excerpt}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y py-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.authorImageUrl} alt="" />
                  <AvatarFallback className="bg-black text-primary">{getInitials(post.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-neutral-500">
                    {formatPostDate(post.date)} · {post.readTime} min read
                  </p>
                </div>
              </div>
              <button
                onClick={copyLink}
                className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold hover:border-black"
              >
                <Link2 className="h-4 w-4" /> Copy link
              </button>
            </Reveal>
          </div>
        </header>

        {post.imageUrl && (
          <div className="bg-white py-12">
            <div className="container mx-auto max-w-6xl px-4">
              <Reveal variant="clip">
                <Parallax offset={40} className="aspect-[16/9] rounded-3xl">
                  <SmartImage src={post.imageUrl} alt={post.title} priority sizes="100vw" wrapperClassName="h-full w-full" />
                </Parallax>
              </Reveal>
            </div>
          </div>
        )}

        <div className="bg-white pb-24">
          <div className="container mx-auto max-w-3xl px-4">
            <Reveal>
              <div
                className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-12 prose-a:decoration-primary prose-a:decoration-2 prose-a:underline-offset-4 prose-blockquote:border-primary prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:font-normal prose-blockquote:italic prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Reveal>
            {post.tags.length > 0 && (
              <div className="mt-14 flex flex-wrap gap-2 border-t pt-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-neutral-100 py-24">
          <div className="container mx-auto px-4">
            <SectionHeading
              eyebrow="Keep reading"
              title={
                <>
                  More from the <span className="text-primary">blog</span>
                </>
              }
            />
            <RevealGroup className="grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((p) => (
                <RevealItem key={p.id}>
                  <BlogCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </Layout>
  );
}
