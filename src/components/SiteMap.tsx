import React from "react";

/**
 * This component isn't meant to be rendered in the UI.
 * It's a template for generating a sitemap.xml file which should be
 * built during your deployment process and placed at the root of your website.
 *
 * For a production site, you'd use a build script to generate this file.
 */
export function SiteMap() {
  const baseUrl = "https://dasayonce.com"; // Replace with your actual domain

  const routes = [
    {
      path: "/",
      changefreq: "weekly",
      priority: "1.0",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      path: "/about",
      changefreq: "monthly",
      priority: "0.8",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      path: "/services",
      changefreq: "monthly",
      priority: "0.8",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      path: "/projects",
      changefreq: "weekly",
      priority: "0.9",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      path: "/team",
      changefreq: "monthly",
      priority: "0.7",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      path: "/contact",
      changefreq: "monthly",
      priority: "0.8",
      lastmod: new Date().toISOString().split("T")[0],
    },
  ];

  // This XML output is for reference only
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return <pre style={{ display: "none" }}>{sitemap}</pre>;
}
