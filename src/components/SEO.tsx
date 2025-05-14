import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  isArticle?: boolean;
  jsonLd?: Record<string, any>[];
}

export function SEO({
  title = "Da'sayonce Real Estate and Properties",
  description = "Da'sayonce Real Estate and Properties is committed to delivering exceptional real estate solutions that reflect quality, value, and client aspirations.",
  keywords = "real estate, properties, Nigeria, Lagos, property development, construction, renovation",
  image = "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  isArticle = false,
  jsonLd = [],
}: SEOProps) {
  // Build canonical URL from current location
  const canonicalUrl =
    typeof window !== "undefined" ? window.location.href.split("?")[0] : "";

  // Format title to include company name if not already there
  const formattedTitle = title.includes("Da'sayonce")
    ? title
    : `${title} | Da'sayonce Real Estate and Properties`;

  // Add organization schema for all pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Da'sayonce Real Estate and Properties",
    url: "https://dasayonce.com",
    logo: image,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234 8102 067 476",
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "69, Ayangburen road, Ojogbe bus stop",
      addressLocality: "Ikorodu",
      addressRegion: "Lagos",
      addressCountry: "Nigeria",
    },
  };

  // Combine with any other structured data
  const structuredData = [organizationSchema, ...jsonLd];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isArticle ? "article" : type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data / JSON-LD */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
