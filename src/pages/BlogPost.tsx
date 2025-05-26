import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BlogPostSEO } from "@/components/RealEstateSEO";
import { blogPosts } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlogCard } from "@/components/BlogCard";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getInitials } from "@/lib/utils";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find((p) => p.slug === slug);

    if (!currentPost) {
      // Redirect to blog page if post not found
      navigate("/blog", { replace: true });
      return;
    }

    setPost(currentPost);

    // Find related posts (same category, excluding current post)
    const related = blogPosts
      .filter(
        (p) => p.category === currentPost.category && p.id !== currentPost.id,
      )
      .slice(0, 3);

    setRelatedPosts(related);
  }, [slug, navigate]);

  if (!post) {
    return null; // Will redirect in useEffect
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const authorInitials = getInitials(post.author);

  return (
    <Layout>
      <BlogPostSEO post={post} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-6 hover:bg-transparent"
            >
              <Link
                to="/blog"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <ScrollAnimation animation="animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>{post.category}</span>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation animation="animate-fade-up">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation animation="animate-fade-up">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={post.authorImageUrl} alt={post.author} />
                    <AvatarFallback>{authorInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{post.author}</h3>
                    {post.authorRole && (
                      <p className="text-muted-foreground">{post.authorRole}</p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <ScrollAnimation
                  key={relatedPost.id}
                  animation="animate-fade-up"
                  delay={100 * index}
                >
                  <BlogCard post={relatedPost} />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
