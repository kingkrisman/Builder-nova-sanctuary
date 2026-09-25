import type { BlogPostRow, ProjectRow, PropertyRow } from "@/lib/content";
import { ContentList } from "../ContentList";

const naira = (n: number) =>
  n >= 1_000_000 ? `₦${(n / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M` : `₦${n.toLocaleString()}`;

const pill = (text: string, tone = "bg-neutral-100 text-neutral-700") => (
  <span className={`rounded-full px-2 py-0.5 font-medium ${tone}`}>{text}</span>
);

export function PropertiesList() {
  return (
    <ContentList<PropertyRow>
      table="properties"
      title="Properties"
      description="Listings shown on the Properties page and home page."
      singular="property"
      basePath="/admin/properties"
      thumbnail={(r) => r.images?.[0] || r.image_url}
      searchText={(r) => `${r.title} ${r.location} ${r.type} ${r.status}`}
      meta={(r) => (
        <>
          {pill(r.status, r.status === "For Sale" ? "bg-green-100 text-green-800" : r.status === "For Rent" ? "bg-blue-100 text-blue-800" : undefined)}
          <span>{naira(Number(r.price))}</span>
          <span>{r.location}</span>
          {r.featured && pill("Featured", "bg-primary/20 text-black")}
        </>
      )}
    />
  );
}

export function ProjectsList() {
  return (
    <ContentList<ProjectRow>
      table="projects"
      title="Projects"
      description="Your portfolio on the Projects page."
      singular="project"
      basePath="/admin/projects"
      thumbnail={(r) => r.gallery?.[0] || r.image_url}
      searchText={(r) => `${r.title} ${r.location} ${r.category}`}
      meta={(r) => (
        <>
          {pill(r.category)}
          {pill(r.project_status, r.project_status === "Ongoing" ? "bg-amber-100 text-amber-800" : undefined)}
          <span>{r.location}</span>
          {r.featured && pill("Featured", "bg-primary/20 text-black")}
        </>
      )}
    />
  );
}

export function BlogList() {
  return (
    <ContentList<BlogPostRow>
      table="blog_posts"
      title="Blog posts"
      description="Articles on the Blog page."
      singular="article"
      basePath="/admin/blog"
      thumbnail={(r) => r.image_url}
      searchText={(r) => `${r.title} ${r.category} ${r.author} ${r.tags?.join(" ")}`}
      meta={(r) => (
        <>
          {pill(r.category)}
          <span>
            {new Date(r.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          {r.author && <span>{r.author}</span>}
        </>
      )}
    />
  );
}
