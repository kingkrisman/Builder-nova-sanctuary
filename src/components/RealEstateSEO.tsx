import { SEO } from "./SEO";

export function HomeSEO() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Da'sayonce Real Estate and Properties",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078",
      priceRange: "₦₦-₦₦₦₦",
      address: {
        "@type": "PostalAddress",
        streetAddress: "69, Ayangburen road, Ojogbe bus stop",
        addressLocality: "Ikorodu",
        addressRegion: "Lagos",
        addressCountry: "Nigeria",
      },
      telephone: "+234 8102 067 476",
      url: "https://dasayonce.com",
    },
  ];

  return (
    <SEO
      title="Da'sayonce Real Estate and Properties | Transforming Spaces. Building Trust."
      description="Da'sayonce Real Estate and Properties is committed to delivering exceptional real estate solutions including property development, construction, renovation, and more."
      keywords="real estate, properties, Nigeria, Lagos, property development, construction, renovation, interior design, land sales"
      jsonLd={jsonLd}
    />
  );
}

export function ServicesSEO() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Real Estate Services",
      provider: {
        "@type": "RealEstateAgent",
        name: "Da'sayonce Real Estate and Properties",
      },
      areaServed: {
        "@type": "Country",
        name: "Nigeria",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Real Estate Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Property Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Building Construction",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Interior & Exterior Design",
            },
          },
        ],
      },
    },
  ];

  return (
    <SEO
      title="Our Services | Da'sayonce Real Estate"
      description="Comprehensive real estate solutions tailored to your needs including property development, construction, renovation, interior design, and more."
      keywords="property development, building construction, renovation, interior design, exterior design, land sales, property management, real estate consultancy"
      jsonLd={jsonLd}
    />
  );
}

export function ProjectsSEO() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Residence",
            name: "Da'sayonce Mini-Estate",
            description:
              "A gated estate featuring modern homes with top-tier amenities.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Mowe",
              addressRegion: "Ogun State",
              addressCountry: "Nigeria",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Residence",
            name: "Residential Renovation",
            description:
              "A complete transformation of a private residence into a smart luxury home.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gwarimpa",
              addressRegion: "Abuja",
              addressCountry: "Nigeria",
            },
          },
        },
      ],
    },
  ];

  return (
    <SEO
      title="Our Projects | Da'sayonce Real Estate"
      description="Explore our portfolio of successful projects that exemplify quality and innovation in real estate development across Nigeria."
      keywords="real estate projects, property development, housing projects, commercial projects, gated estates, luxury homes, Nigeria real estate"
      jsonLd={jsonLd}
    />
  );
}

export function ContactSEO() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Da'sayonce Real Estate and Properties",
      telephone: "+234 8102 067 476",
      email: "Sayonce99@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "69, Ayangburen road, Ojogbe bus stop",
        addressLocality: "Ikorodu",
        addressRegion: "Lagos",
        addressCountry: "Nigeria",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    },
  ];

  return (
    <SEO
      title="Contact Us | Da'sayonce Real Estate"
      description="Get in touch with Da'sayonce Real Estate and Properties. Our team is ready to answer your inquiries and help with your real estate needs."
      keywords="contact, real estate, Nigeria, Lagos, Ikorodu, property inquiry, real estate consultation"
      jsonLd={jsonLd}
    />
  );
}

export function AboutSEO() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      mainEntity: {
        "@type": "RealEstateAgent",
        name: "Da'sayonce Real Estate and Properties",
        description:
          "Da'sayonce Real Estate and Properties is a Nigerian-owned company registered under the Corporate Affairs Commission (RC: 7115835). We specialize in Property Development, Construction, Renovation, Interior & Exterior Design, Land Sales & Documentation, Property Management, and Real Estate Consultancy.",
        foundingDate: "2015",
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ikorodu",
            addressRegion: "Lagos",
            addressCountry: "Nigeria",
          },
        },
      },
    },
  ];

  return (
    <SEO
      title="About Us | Da'sayonce Real Estate"
      description="Learn about Da'sayonce Real Estate and Properties, our vision, mission, core values, and the team behind our success."
      keywords="about, real estate company, property developers, Nigeria, Lagos, company history, company vision, company mission"
      jsonLd={jsonLd}
    />
  );
}

export function TeamSEO() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Da'sayonce Real Estate and Properties",
      member: [
        {
          "@type": "Person",
          name: "Engr. Olusayo Taiwo Okusanya",
          jobTitle: "MD/CEO",
          description: "Oversees strategic direction and overall operations",
        },
        {
          "@type": "Person",
          name: "Mrs. Adedayo Okusanya",
          jobTitle: "Chief Operating Officer",
          description: "Manages daily operations and departmental efficiency",
        },
      ],
    },
  ];

  return (
    <SEO
      title="Our Team | Da'sayonce Real Estate"
      description="Meet the professionals dedicated to delivering excellence in every project at Da'sayonce Real Estate and Properties."
      keywords="real estate team, property professionals, Nigeria real estate experts, engineering team, design team"
      jsonLd={jsonLd}
    />
  );
}
