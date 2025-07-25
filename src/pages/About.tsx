import { Layout } from "@/components/layout/Layout";
import { AboutSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";

import { companyInfo, companyValues } from "@/lib/data";
import { CheckCircle, Users, Award, Building, Target } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <AboutSEO />
      <PageHeader
        title={
          <>
            About <span className="text-primary">Da'sayonce</span> Real Estate
          </>
        }
        subtitle="Transforming Spaces. Building Trust."
        description="Over a decade of excellence in Nigerian real estate development, construction, and property management. We are committed to delivering exceptional solutions that reflect quality, value, and client aspirations."
        gradient="blue"
        badge="Established 2014"
        backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
        stats={[
          {
            label: "Years Experience",
            value: "10+",
            icon: <Award className="h-5 w-5" />,
          },
          {
            label: "Projects Completed",
            value: "500+",
            icon: <Building className="h-5 w-5" />,
          },
          {
            label: "Happy Clients",
            value: "1,200+",
            icon: <Users className="h-5 w-5" />,
          },
          {
            label: "Team Members",
            value: "50+",
            icon: <Target className="h-5 w-5" />,
          },
        ]}
        action={{
          label: "Meet Our Team",
          href: "/team",
        }}
      />

      {/* CEO Welcome Message */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-200 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F88438a5961da449a8d020124630b99a4"
                  alt="Engr. Olusayo Taiwo Okusanya - MD/CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">
                Engr. Olusayo Taiwo Okusanya
              </h3>
              <p className="text-muted-foreground">MD/CEO (MNSE, COREN)</p>
            </div>
            <div className="md:col-span-2">
              <SectionHeading title="MD/CEO Welcome Message" subtitle="" />
              <div className="prose max-w-none">
                <p>Dear Esteemed Clients and Partners,</p>
                <p className="mt-4">
                  It is with great pleasure that I welcome you to Da'sayonce
                  Real Estate and Properties Limited. Our journey began with a
                  vision to redefine real estate in Nigeria, focusing on
                  innovation, quality, and client satisfaction. Today, we stand
                  as a testament to what dedication and integrity can achieve.
                </p>
                <p className="mt-4">
                  Our team of professionals is committed to delivering
                  exceptional services across property development,
                  construction, interior design, and more. We believe in
                  building not just structures, but lasting relationships
                  grounded in trust and excellence.
                </p>
                <p className="mt-4">
                  Thank you for choosing Da'sayonce. Together, let's build the
                  future.
                </p>
                <p className="mt-6">Warm regards,</p>
                <p>
                  Engr. Olusayo Taiwo Okusanya
                  <br />
                  MD/CEO (MNSE, COREN)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading title="Company Profile" subtitle="" centered />
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              Da'sayonce Real Estate and Properties is a Nigerian-owned company
              registered under the Corporate Affairs Commission (RC: 7115835).
              We specialize in:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span>Property Development</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span>Construction</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span>Renovation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span>Interior & Exterior Design</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span>Land Sales & Documentation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span>Property Management</span>
              </li>
              <li className="flex items-center gap-2 md:col-span-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span>Real Estate Consultancy</span>
              </li>
            </ul>
            <p className="text-lg">
              With our headquarters in Lagos and branches across major Nigerian
              cities, we are poised to transform the real estate landscape with
              projects that epitomize comfort, luxury, and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-lg">{companyInfo.vision}</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-lg">{companyInfo.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Core Values"
            subtitle="Our guiding principles that define how we operate and serve our clients."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Journey in Pictures"
            subtitle="A visual story of our growth, achievements, and the spaces we've transformed."
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                url: "https://images.pexels.com/photos/8837715/pexels-photo-8837715.jpeg",
                alt: "Team collaboration on architectural plans",
              },
              {
                url: "https://images.pexels.com/photos/16612657/pexels-photo-16612657.jpeg",
                alt: "Construction site at sunset",
              },
              {
                url: "https://images.pexels.com/photos/32473240/pexels-photo-32473240.png",
                alt: "Modern living room and kitchen design",
              },
              {
                url: "https://images.pexels.com/photos/7242263/pexels-photo-7242263.jpeg",
                alt: "Empty modern room with geometric design",
              },
              {
                url: "https://images.pexels.com/photos/14646006/pexels-photo-14646006.jpeg",
                alt: "Aerial view of residential property",
              },
              {
                url: "https://images.pexels.com/photos/13515672/pexels-photo-13515672.jpeg",
                alt: "High-rise building under construction",
              },
              {
                url: "https://images.pexels.com/photos/9244866/pexels-photo-9244866.jpeg",
                alt: "Contemporary apartment buildings",
              },
              {
                url: "https://images.pexels.com/photos/17797763/pexels-photo-17797763.jpeg",
                alt: "Modern commercial building facade",
              },
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-slate-200 rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
