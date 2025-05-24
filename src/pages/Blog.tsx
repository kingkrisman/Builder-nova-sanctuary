import { Layout } from "@/components/layout/Layout";
import { BlogSEO } from "@/components/RealEstateSEO";
import { SectionHeading } from "@/components/SectionHeading";
import { FeaturedBlogPost } from "@/components/FeaturedBlogPost";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/data";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];

  // Get featured post (most recent)
  const featuredPost = blogPosts[0];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <BlogSEO />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground">
              Insights and updates from the Nigerian real estate market
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Article"
            subtitle="Our latest insights on the real estate market"
            centered
          />

          <ScrollAnimation animation="animate-fade-up">
            <FeaturedBlogPost post={featuredPost} />
          </ScrollAnimation>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Latest Articles"
            subtitle="Stay informed with our latest insights and guides"
            centered
          />

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    activeCategory === category
                      ? "bg-primary text-black hover:bg-primary/90"
                      : "hover:bg-slate-200"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-[300px]"
              />
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <ScrollAnimation
                  key={post.id}
                  animation="animate-fade-up"
                  delay={100 * (index % 3)}
                >
                  <BlogCard post={post} />
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollAnimation animation="animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-white/80 mb-6">
                Stay updated with the latest insights, trends, and opportunities
                in Nigerian real estate.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 mb-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-black hover:bg-primary/90 px-6 py-2 rounded-md font-medium"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-white/60 text-sm">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </Layout>
  );
}
