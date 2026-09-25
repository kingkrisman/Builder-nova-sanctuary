import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  blogPosts as staticBlogPosts,
  projects as staticProjects,
  properties as staticProperties,
  type BlogPost,
  type Project,
  type Property,
} from "@/lib/data";

// ---------------------------------------------------------------------------
// Database row shapes (snake_case, as stored in Supabase)
// ---------------------------------------------------------------------------

export interface PropertyRow {
  id: number;
  title: string;
  type: Property["type"];
  status: Property["status"];
  price: number;
  location: string;
  address: string;
  bedrooms: number | null;
  bathrooms: number | null;
  size: string;
  description: string;
  features: string[];
  image_url: string;
  images: string[];
  year_built: number | null;
  parking: number | null;
  furnished: boolean | null;
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  featured: boolean;
  published: boolean;
  date_added: string;
  updated_at?: string;
}

export interface ProjectRow {
  id: number;
  title: string;
  description: string;
  location: string;
  category: NonNullable<Project["category"]>;
  project_status: NonNullable<Project["projectStatus"]>;
  image_url: string;
  gallery: string[];
  completion_year: number | null;
  size: string;
  features: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  updated_at?: string;
}

export interface BlogPostRow {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  tags: string[];
  author: string;
  author_role: string | null;
  author_image_url: string | null;
  read_time: number;
  published: boolean;
  published_at: string;
  updated_at?: string;
}

// ---------------------------------------------------------------------------
// Row -> app model mappers
// ---------------------------------------------------------------------------

export const toProperty = (r: PropertyRow): Property => ({
  id: r.id,
  title: r.title,
  type: r.type,
  status: r.status,
  price: Number(r.price),
  location: r.location,
  address: r.address,
  bedrooms: r.bedrooms ?? undefined,
  bathrooms: r.bathrooms ?? undefined,
  size: r.size,
  description: r.description,
  features: r.features ?? [],
  imageUrl: r.image_url || r.images?.[0] || "",
  images: r.images?.length ? r.images : r.image_url ? [r.image_url] : [],
  yearBuilt: r.year_built ?? undefined,
  parking: r.parking ?? undefined,
  furnished: r.furnished ?? undefined,
  dateAdded: r.date_added,
  featured: r.featured,
  agent: { name: r.agent_name, phone: r.agent_phone, email: r.agent_email },
});

export const toProject = (r: ProjectRow): Project => ({
  id: r.id,
  title: r.title,
  description: r.description,
  location: r.location,
  imageUrl: r.image_url || r.gallery?.[0] || "",
  category: r.category,
  projectStatus: r.project_status,
  gallery: r.gallery ?? [],
  completionYear: r.completion_year ?? undefined,
  size: r.size || undefined,
  features: r.features ?? [],
  featured: r.featured,
});

export const toBlogPost = (r: BlogPostRow): BlogPost => ({
  id: r.id,
  title: r.title,
  slug: r.slug,
  excerpt: r.excerpt,
  content: r.content,
  imageUrl: r.image_url,
  category: r.category,
  date: r.published_at,
  author: r.author,
  authorRole: r.author_role ?? undefined,
  authorImageUrl: r.author_image_url ?? undefined,
  readTime: r.read_time,
  tags: r.tags ?? [],
});

// ---------------------------------------------------------------------------
// Public read hooks. Without Supabase configured (or if a request fails) they serve the
// bundled content, so the site never renders empty or broken.
// ---------------------------------------------------------------------------

const STALE = 5 * 60 * 1000;

const cmsConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// The Supabase client is loaded on demand so it stays out of the initial page bundle
async function fetchOr<T>(
  fallback: T,
  run: (db: SupabaseClient) => Promise<T>,
): Promise<T> {
  if (!cmsConfigured) return fallback;
  try {
    const { supabase } = await import("@/lib/supabase");
    return await run(supabase!);
  } catch (error) {
    console.warn("[content] falling back to bundled data:", error);
    return fallback;
  }
}

export function useProperties() {
  return useQuery({
    queryKey: ["content", "properties"],
    staleTime: STALE,
    queryFn: () =>
      fetchOr(staticProperties, async (db) => {
        const { data, error } = await db
          .from("properties")
          .select("*")
          .eq("published", true)
          .order("featured", { ascending: false })
          .order("date_added", { ascending: false });
        if (error) throw error;
        return (data as PropertyRow[]).map(toProperty);
      }),
  });
}

export function useProperty(id: number) {
  const all = useProperties();
  return { ...all, data: all.data?.find((p) => p.id === id) };
}

export function useProjects() {
  return useQuery({
    queryKey: ["content", "projects"],
    staleTime: STALE,
    queryFn: () =>
      fetchOr(staticProjects, async (db) => {
        const { data, error } = await db
          .from("projects")
          .select("*")
          .eq("published", true)
          .order("featured", { ascending: false })
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });
        if (error) throw error;
        return (data as ProjectRow[]).map(toProject);
      }),
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["content", "blog_posts"],
    staleTime: STALE,
    queryFn: () =>
      fetchOr(staticBlogPosts, async (db) => {
        const { data, error } = await db
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .order("published_at", { ascending: false });
        if (error) throw error;
        return (data as BlogPostRow[]).map(toBlogPost);
      }),
  });
}

export function useBlogPost(slug: string | undefined) {
  const all = useBlogPosts();
  return { ...all, data: all.data?.find((p) => p.slug === slug) };
}
