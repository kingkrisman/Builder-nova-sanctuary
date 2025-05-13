import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { contactInfo, socialMedia } from "@/lib/data";

export default function Contact() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team for inquiries, quotes, or more
              information
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <SectionHeading
                title="Get In Touch"
                subtitle="We're here to answer any questions you may have about our services."
              />

              <div className="grid gap-6 mt-8">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        <div className="mt-1 space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
                <div className="flex gap-6">
                  {socialMedia.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Locations"
            subtitle="Visit us at our head office or any of our branches across Nigeria"
            centered
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-2">Head Office</h3>
                <p className="text-muted-foreground">
                  69, Ayangburen road, Ojogbe bus stop, Ikorodu, Lagos State.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Abuja Branch</h3>
                  <p className="text-muted-foreground">
                    Suite 45, ABC Plaza, Garki, Abuja.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium mb-2">
                    Port Harcourt Branch
                  </h3>
                  <p className="text-muted-foreground">
                    52 Aba Road, Port Harcourt, Rivers State.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-200 rounded-lg overflow-hidden aspect-square md:aspect-auto">
              {/* In a real implementation, this would be an embedded Google Map */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-slate-600">Interactive Map Goes Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to commonly asked questions about our services"
            centered
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                What areas do you service?
              </h3>
              <p className="text-muted-foreground">
                We operate primarily in Lagos, Abuja, Ogun, Ibadan, Port
                Harcourt, and other major cities across Nigeria. However, we're
                open to projects nationwide.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                How do I verify the authenticity of your properties?
              </h3>
              <p className="text-muted-foreground">
                All our properties come with comprehensive documentation. We
                also encourage clients to verify with relevant government
                agencies and can assist with this process.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                What is your project delivery timeline?
              </h3>
              <p className="text-muted-foreground">
                Project timelines vary based on scope and complexity. During
                consultation, we provide detailed timelines specific to your
                project, which we strive to adhere to strictly.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                Do you offer financing options?
              </h3>
              <p className="text-muted-foreground">
                While we don't provide direct financing, we have partnerships
                with financial institutions that offer favorable terms for our
                clients. We can guide you through these options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
