import { SEO } from "./SEO";

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

export function BlogPostSEO({ post }) {
  return (
    <SEO
      title={`${post.title} | Da'sayonce Real Estate Blog`}
      description={post.excerpt}
      keywords={post.tags.join(", ")}
      image={post.imageUrl}
      type="article"
      isArticle={true}
    />
  );
}

export function CareersSEO() {
  return (
    <SEO
      title="Careers | Da'sayonce Real Estate"
      description="Join our team of professionals dedicated to excellence in real estate development, construction, and property management across Nigeria."
      keywords="real estate careers, property jobs, construction careers, Nigeria jobs, real estate employment"
    />
  );
}

export function JobDetailsSEO({ job }) {
  return (
    <SEO
      title={`${job.title} | Careers at Da'sayonce Real Estate`}
      description={`Apply for the ${job.title} position in our ${job.department} department. ${job.description.substring(0, 100)}...`}
      keywords={`${job.title}, ${job.department}, ${job.location}, real estate jobs, construction careers, Nigeria employment`}
    />
  );
}
