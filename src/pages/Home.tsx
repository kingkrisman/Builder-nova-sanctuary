import { Hero } from "@/components/Hero";
import { Layout } from "@/components/layout/Layout";
import { HomeSEO } from "@/components/RealEstateSEO";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PropertyRecommendations } from "@/components/PropertyRecommendations";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { PropertyMap } from "@/components/PropertyMap";
import { MobileAppPromo } from "@/components/MobileAppPromo";

import {
  companyValues,
  differentiators,
  projects,
  services,
  testimonials,
  properties,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Calculator,
  Map,
  Sparkles,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { useState } from "react";

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Display only a subset of services and projects on the homepage
  const featuredServices = services.slice(0, 6);
  const featuredProjects = projects.slice(0, 3);
  const featuredProperties = properties.slice(0, 6);

  return (
    <Layout>
      <HomeSEO />
      <Hero />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-fade-right">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                <span className="text-primary">About</span> Da'sayonce Real
                Estate
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
              <Button
                asChild
                className="bg-primary text-black hover:bg-primary/90"
              >
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollAnimation>

            <ScrollAnimation animation="animate-fade-left">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ff96e58722991403781c933a1465be5de"
                  alt="About Da'sayonce"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <SectionHeading
              title={
                <>
                  Our <span className="text-primary">Services</span>
                </>
              }
              subtitle="We offer a wide range of real estate and property services to meet your needs."
              centered
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <ScrollAnimation
                key={service.id}
                animation="animate-fade-up"
                delay={100 * (index % 3)}
              >
                <ServiceCard service={service} />
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation
            animation="animate-fade-up"
            delay={300}
            className="text-center mt-12"
          >
            <Button
              asChild
              className="bg-primary text-black hover:bg-primary/90"
            >
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <SectionHeading
              title={
                <>
                  Our <span className="text-primary">Projects</span>
                </>
              }
              subtitle="Explore our portfolio of successful projects that exemplify quality and innovation."
              centered
              className="text-white"
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ScrollAnimation
                key={project.id}
                animation="animate-fade-up"
                delay={100 * (index + 1)}
              >
                <ProjectCard project={project} />
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation
            animation="animate-fade-up"
            delay={400}
            className="text-center mt-12"
          >
            <Button
              asChild
              className="bg-primary text-black hover:bg-primary/90"
            >
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-fade-right">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Ffda83bddc58a41748f24a9d9dac8b329"
                  alt="Why choose Da'sayonce"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="animate-fade-left">
              <SectionHeading
                title={
                  <>
                    What <span className="text-primary">Sets Us Apart</span>
                  </>
                }
                subtitle="At Da'sayonce, we pride ourselves on our commitment to excellence and customer satisfaction."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {differentiators.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-medium text-primary">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="mt-8 bg-primary text-black hover:bg-primary/90"
              >
                <Link to="/contact">
                  Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* AI Property Recommendations Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <SectionHeading
              title={
                <>
                  <Sparkles className="inline-block h-8 w-8 text-primary mr-2" />
                  AI-Powered{" "}
                  <span className="text-primary">Recommendations</span>
                </>
              }
              subtitle="Discover properties tailored to your preferences using our intelligent recommendation system."
              centered
            />
          </ScrollAnimation>

          <PropertyRecommendations
            userPreferences={{
              budget: 100000000,
              location: "Lagos",
              propertyType: "Residential",
            }}
            viewedProperties={[1, 2]}
          />
        </div>
      </section>

      {/* Interactive Property Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <SectionHeading
              title={
                <>
                  <Map className="inline-block h-8 w-8 text-primary mr-2" />
                  Property <span className="text-primary">Locations</span>
                </>
              }
              subtitle="Explore our properties across Nigeria with our interactive map feature."
              centered
            />
          </ScrollAnimation>

          <ScrollAnimation animation="animate-fade-up" delay={200}>
            <PropertyMap
              properties={featuredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* Mortgage Calculator Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-fade-right">
              <SectionHeading
                title={
                  <>
                    <Calculator className="inline-block h-8 w-8 text-primary mr-2" />
                    Calculate Your{" "}
                    <span className="text-primary">Mortgage</span>
                  </>
                }
                subtitle="Plan your property investment with our advanced mortgage calculator. Get instant estimates for monthly payments, interest, and total costs."
                className="text-white"
              />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Instant payment calculations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Interest rate comparisons</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Down payment planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Total cost breakdown</span>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="animate-fade-left">
              <MortgageCalculator />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Mobile App Promo Section */}
      <MobileAppPromo />

      {/* Testimonials Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <SectionHeading
              title={
                <>
                  Client <span className="text-primary">Testimonials</span>
                </>
              }
              subtitle="Don't just take our word for it. See what our clients have to say about our services."
              centered
              className="text-white"
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation
                key={testimonial.id}
                animation="animate-fade-up"
                delay={100 * ((index % 2) + 1)}
              >
                <TestimonialCard testimonial={testimonial} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-black"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fb0a4bd423bca4919bedc4fc4c237aa29)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation animation="animate-fade-up">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your real estate vision to life.
              Contact us today to get started.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-black bg-black text-primary hover:bg-black/90"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </Layout>
  );
}
