import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resizeImage } from "@/lib/image";

export const SITE_NAME = "Da'sayonce Real Estate";
export const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=630";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "product";
  /** Hide the page from search engines (e.g. 404) */
  noindex?: boolean;
  /** Structured data for this page (schema.org JSON-LD) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** @deprecated use type="article" */
  isArticle?: boolean;
  url?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Sets the document title, meta description, social preview tags, canonical URL and JSON-LD. */
export function SEO({
  title = "Da'sayonce Real Estate and Properties",
  description = "Da'sayonce Real Estate and Properties is committed to delivering exceptional real estate solutions that reflect quality, value, and client aspirations.",
  keywords,
  image,
  type,
  noindex = false,
  jsonLd,
  isArticle = false,
}: SEOProps) {
  const { pathname } = useLocation();
  const fullTitle = title.includes("Da'sayonce") ? title : `${title} | ${SITE_NAME}`;
  const ogType = type ?? (isArticle ? "article" : "website");
  const ogImage = image ? resizeImage(image, 1200) : DEFAULT_IMAGE;
  const ldJson = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${window.location.origin}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    const desc = description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setLink("canonical", url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", ogType === "product" ? "website" : ogType);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", ogImage);

    // Page-level structured data, replaced on every navigation
    document.getElementById("page-jsonld")?.remove();
    if (ldJson) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = ldJson;
      document.head.appendChild(script);
    }
  }, [pathname, fullTitle, description, keywords, noindex, ogImage, ogType, ldJson]);

  return null;
}
