import { siteOrigin } from "./_lib.js";

/** /robots.txt, pointing at the sitemap on whichever domain the site is served from. */
export function GET(request: Request) {
  const body = [
    "# Da'sayonce Real Estate and Properties",
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "",
    `Sitemap: ${siteOrigin(request)}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
