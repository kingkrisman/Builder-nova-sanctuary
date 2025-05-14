import { Layout } from "@/components/layout/Layout";
import { AboutSEO } from "@/components/RealEstateSEO";
import { SectionHeading } from "@/components/SectionHeading";
import { Stats } from "@/components/Stats";
import { companyInfo, companyValues } from "@/lib/data";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <AboutSEO />
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              About Da'sayonce Real Estate
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transforming Spaces. Building Trust.
            </p>
          </div>
        </div>
      </section>

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

      <Stats />

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
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-slate-200 rounded-lg overflow-hidden"
              >
                <img
                  src="/placeholder.svg"
                  alt={`Gallery image ${index + 1}`}
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
