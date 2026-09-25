import { fetchRows, siteOrigin } from "./_lib.js";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/properties", priority: "0.9", changefreq: "daily" },
  { path: "/projects", priority: "0.8", changefreq: "weekly" },
  { path: "/services", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/team", priority: "0.6", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/contact", priority: "0.7", changefreq: "yearly" },
];

/** /sitemap.xml, generated from the database so new listings and posts appear automatically. */
export async function GET(request: Request) {
  const origin = siteOrigin(request);
  const [properties, posts] = await Promise.all([
    fetchRows<{ id: number; updated_at: string }>("properties", "select=id,updated_at&published=eq.true"),
    fetchRows<{ slug: string; updated_at: string }>("blog_posts", "select=slug,updated_at&published=eq.true"),
  ]);

  const url = (loc: string, extra: string) => `  <url><loc>${origin}${loc}</loc>${extra}</url>`;
  const lastmod = (d: string) => `<lastmod>${d.slice(0, 10)}</lastmod>`;

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...STATIC_ROUTES.map((r) =>
      url(r.path, `<changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority>`),
    ),
    ...properties.map((p) => url(`/properties/${p.id}`, `${lastmod(p.updated_at)}<priority>0.8</priority>`)),
    ...posts.map((p) => url(`/blog/${p.slug}`, `${lastmod(p.updated_at)}<priority>0.6</priority>`)),
    `</urlset>`,
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
