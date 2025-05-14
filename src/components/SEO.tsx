import React from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  isArticle?: boolean;
}

export function SEO({
  title = "Da'sayonce Real Estate and Properties",
  description = "Da'sayonce Real Estate and Properties is committed to delivering exceptional real estate solutions that reflect quality, value, and client aspirations.",
  keywords = "real estate, properties, Nigeria, Lagos, property development, construction, renovation",
  image = "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078",
  url = "",
  type = "website",
  isArticle = false,
}: SEOProps) {
  // Format title to include company name if not already there
  const formattedTitle = title.includes("Da'sayonce")
    ? title
    : `${title} | Da'sayonce Real Estate and Properties`;

  // Use document.head directly rather than Helmet which may be causing issues
  React.useEffect(() => {
    // Set page title
    document.title = formattedTitle;

    // Function to create or update a meta tag
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }

      meta.content = content;
    };

    // Function to create or update an Open Graph meta tag
    const setOgMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }

      meta.content = content;
    };

    // Set basic meta tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);

    // Set Open Graph meta tags
    setOgMetaTag("og:title", formattedTitle);
    setOgMetaTag("og:description", description);
    setOgMetaTag("og:image", image);
    setOgMetaTag("og:type", isArticle ? "article" : type);

    // Set Twitter meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", formattedTitle);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);

    // Cleanup function when component unmounts
    return () => {
      // No cleanup needed as we're only modifying tags
    };
  }, [formattedTitle, description, keywords, image, type, isArticle]);

  return null; // This component doesn't render anything visible
}
