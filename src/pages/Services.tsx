import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center flex flex-col">
            <h1 className="text-4xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground m-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Service Process"
            subtitle="We follow a streamlined process to ensure your satisfaction at every step."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold">Consultation</h3>
              <p className="text-muted-foreground">
                We begin with understanding your needs and requirements through
                a detailed consultation.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold">Planning & Proposal</h3>
              <p className="text-muted-foreground">
                Our team develops a comprehensive plan and proposal tailored to
                your specific needs.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold">Execution & Delivery</h3>
              <p className="text-muted-foreground">
                We execute the plan with precision and deliver results that
                exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Descriptions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Detailed Service Offerings"
            subtitle="In-depth information about our key services"
          />

          <div className="space-y-12 mt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Property Development
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our property development services encompass the entire
                  lifecycle from land acquisition to project completion. We
                  handle residential, commercial, and mixed-use developments
                  with a focus on quality, sustainability, and return on
                  investment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Residential developments (apartments, houses, estates)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Commercial developments (offices, retail spaces, malls)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Mixed-use developments</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F5b476d39e79c489b893fbce223f62517"
                  alt="Property Development"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-last md:order-first rounded-lg overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F2882003515394644b8f752a7f67c54b3"
                  alt="Building Construction"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Building Construction
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our construction services deliver structures that stand the
                  test of time. With a team of skilled professionals, we ensure
                  that every project is completed to the highest standards of
                  quality and safety.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Residential construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Commercial construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Institutional buildings</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Interior & Exterior Design
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our design services transform spaces into functional,
                  aesthetic environments that reflect your personality and meet
                  your needs. We blend creativity with practicality to deliver
                  designs that inspire.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Interior space planning and design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Exterior façade design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Landscaping and outdoor spaces</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F05b931d2989c419796354d089120dfba"
                  alt="Interior & Exterior Design"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project requirements and how we can
            help you achieve your real estate goals.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/contact">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
