// Shared helpers for the Vercel functions in /api. Reads published content through Supabase's
// REST API with the public (anon) key, so row level security applies exactly as in the browser.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

export async function fetchRows<T>(table: string, query: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) return [];
  return (await res.json()) as T[];
}

export const siteOrigin = (request: Request) => new URL(request.url).origin;

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Resize common CDN images to a social-preview-friendly width. */
export function previewImage(url: string | undefined | null) {
  if (!url) return null;
  if (url.includes("images.pexels.com")) {
    const u = new URL(url);
    u.search = "auto=compress&cs=tinysrgb&fit=crop&w=1200&h=630";
    return u.toString();
  }
  if (url.includes("cdn.builder.io/api/v1/image")) {
    const u = new URL(url);
    u.searchParams.set("width", "1200");
    return u.toString();
  }
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace(/\/upload\/(?:[a-z]_[^/]*\/)?/, "/upload/w_1200,h_630,c_fill,f_auto,q_auto/");
  }
  return url;
}
