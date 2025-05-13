import { Hero } from "@/components/Hero";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Stats } from "@/components/Stats";
import {
  companyValues,
  differentiators,
  projects,
  services,
  testimonials,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  // Display only a subset of services and projects on the homepage
  const featuredServices = services.slice(0, 6);
  const featuredProjects = projects.slice(0, 3);

  return (
    <Layout>
      <Hero />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                About Da'sayonce Real Estate
              </h2>
              <p className="text-muted-foreground mb-6">
                Da'sayonce Real Estate and Properties is a Nigerian-owned
                company registered under the Corporate Affairs Commission (RC:
                7115835). With our headquarters in Lagos and branches across
                major Nigerian cities, we are poised to transform the real
                estate landscape with projects that epitomize comfort, luxury,
                and sustainability.
              </p>
              <div className="space-y-3 mb-6">
                {companyValues.slice(0, 3).map((value, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <span className="font-medium">{value.title}: </span>
                      <span className="text-muted-foreground">
                        {value.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild>
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg"
                alt="About Da'sayonce"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Services"
            subtitle="We offer a wide range of real estate and property services to meet your needs."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Projects"
            subtitle="Explore our portfolio of successful projects that exemplify quality and innovation."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg"
                alt="Why choose Da'sayonce"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <SectionHeading
                title="What Sets Us Apart"
                subtitle="At Da'sayonce, we pride ourselves on our commitment to excellence and customer satisfaction."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {differentiators.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8">
                <Link to="/contact">
                  Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Client Testimonials"
            subtitle="Don't just take our word for it. See what our clients have to say about our services."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your real estate vision to life. Contact
            us today to get started.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
