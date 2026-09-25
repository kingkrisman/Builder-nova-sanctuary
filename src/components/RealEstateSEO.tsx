import { SEO } from "./SEO";
import type { BlogPost, Property } from "@/lib/data";
import { resizeImage } from "@/lib/image";

const LOGO =
  "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078?width=512";

export function HomeSEO() {
  return (
    <SEO
      title="Da'sayonce Real Estate and Properties | Transforming Spaces. Building Trust."
      description="Da'sayonce Real Estate and Properties is committed to delivering exceptional real estate solutions including property development, construction, renovation, and more."
      keywords="real estate, properties, Nigeria, Lagos, property development, construction, renovation, interior design, land sales"
    />
  );
}

export function ServicesSEO() {
  return (
    <SEO
      title="Our Services | Da'sayonce Real Estate"
      description="Comprehensive real estate solutions tailored to your needs including property development, construction, renovation, interior design, and more."
      keywords="property development, building construction, renovation, interior design, exterior design, land sales, property management, real estate consultancy"
    />
  );
}

export function ProjectsSEO() {
  return (
    <SEO
      title="Our Projects | Da'sayonce Real Estate"
      description="Explore our portfolio of successful projects that exemplify quality and innovation in real estate development across Nigeria."
      keywords="real estate projects, property development, housing projects, commercial projects, gated estates, luxury homes, Nigeria real estate"
    />
  );
}

export function ContactSEO() {
  return (
    <SEO
      title="Contact Us | Da'sayonce Real Estate"
      description="Get in touch with Da'sayonce Real Estate and Properties. Our team is ready to answer your inquiries and help with your real estate needs."
      keywords="contact, real estate, Nigeria, Lagos, Ikorodu, property inquiry, real estate consultation"
    />
  );
}

export function AboutSEO() {
  return (
    <SEO
      title="About Us | Da'sayonce Real Estate"
      description="Learn about Da'sayonce Real Estate and Properties, our vision, mission, core values, and the team behind our success."
      keywords="about, real estate company, property developers, Nigeria, Lagos, company history, company vision, company mission"
    />
  );
}

export function TeamSEO() {
  return (
    <SEO
      title="Our Team | Da'sayonce Real Estate"
      description="Meet the professionals dedicated to delivering excellence in every project at Da'sayonce Real Estate and Properties."
      keywords="real estate team, property professionals, Nigeria real estate experts, engineering team, design team"
    />
  );
}

export function BlogSEO() {
  return (
    <SEO
      title="Blog | Da'sayonce Real Estate"
      description="Stay informed with the latest insights, trends, and news about Nigerian real estate, property development, and investment opportunities."
      keywords="real estate blog, property insights, Nigerian real estate market, investment advice, construction trends, interior design"
    />
  );
}

export function BlogPostSEO({ post }: { post: BlogPost }) {
  return (
    <SEO
      title={`${post.title} | Da'sayonce Real Estate Blog`}
      description={post.excerpt}
      keywords={post.tags.join(", ")}
      image={post.imageUrl}
      type="article"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.imageUrl ? [resizeImage(post.imageUrl, 1200)] : undefined,
        datePublished: post.date,
        author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
        publisher: {
          "@type": "Organization",
          name: "Da'sayonce Real Estate and Properties",
          logo: { "@type": "ImageObject", url: LOGO },
        },
        keywords: post.tags.join(", "),
      }}
    />
  );
}

export function PropertiesSEO() {
  return (
    <SEO
      title="Properties for Sale & Rent in Lagos, Abuja & Ogun | Da'sayonce Real Estate"
      description="Browse verified homes, apartments, commercial spaces and land for sale and rent across Lagos, Abuja and Ogun State from Da'sayonce Real Estate."
      keywords="property for sale Lagos, houses for rent Lagos, land for sale Abuja, duplex Lekki, apartments Victoria Island, Nigeria real estate listings"
    />
  );
}

export function PropertySEO({ property }: { property: Property }) {
  const forRent = property.status === "For Rent";
  const details = [
    property.bedrooms != null && `${property.bedrooms}-bedroom`,
    property.type.toLowerCase(),
    forRent ? "for rent" : property.status === "For Sale" ? "for sale" : property.status.toLowerCase(),
    `in ${property.location}`,
  ]
    .filter(Boolean)
    .join(" ");
  const price = `₦${property.price.toLocaleString()}${forRent ? " per year" : ""}`;

  return (
    <SEO
      title={`${property.title} | ${price}`}
      description={`${details.charAt(0).toUpperCase()}${details.slice(1)}. ${price}. ${property.description}`}
      keywords={[property.location, property.type, property.status, ...property.features.slice(0, 5)].join(", ")}
      image={property.imageUrl}
      type="product"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: property.title,
        description: property.description,
        image: property.images.slice(0, 6).map((u) => resizeImage(u, 1200)),
        datePosted: property.dateAdded,
        address: { "@type": "PostalAddress", streetAddress: property.address, addressLocality: property.location, addressCountry: "NG" },
        offers: {
          "@type": "Offer",
          price: property.price,
          priceCurrency: "NGN",
          availability:
            property.status === "Sold" || property.status === "Rented"
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
          businessFunction: forRent ? "https://schema.org/LeaseOut" : "https://schema.org/Sell",
        },
      }}
    />
  );
}

export function NotFoundSEO() {
  return <SEO title="Page not found" description="This page doesn't exist." noindex />;
}
