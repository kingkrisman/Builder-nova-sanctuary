import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ContactSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { SimpleMap } from "@/components/SimpleMap";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { socialMedia } from "@/lib/data";

const OFFICES = [
  { name: "Head Office", address: "69, Ayangburen Road, Ojogbe Bus Stop, Ikorodu, Lagos State." },
  { name: "Abuja Branch", address: "Suite 45, ABC Plaza, Garki, Abuja." },
  { name: "Port Harcourt Branch", address: "52 Aba Road, Port Harcourt, Rivers State." },
];

const FAQS = [
  {
    q: "What areas do you service?",
    a: "We operate primarily in Lagos, Abuja, Ogun, Ibadan, Port Harcourt and other major cities across Nigeria, and we're open to projects nationwide.",
  },
  {
    q: "How do I verify the authenticity of your properties?",
    a: "All our properties come with comprehensive documentation. We also encourage clients to verify with the relevant government agencies, and we can assist with that process.",
  },
  {
    q: "What is your project delivery timeline?",
    a: "Timelines vary with scope and complexity. During consultation we provide a detailed schedule specific to your project, and we work hard to keep to it.",
  },
  {
    q: "Do you offer financing options?",
    a: "We don't provide direct financing, but we partner with financial institutions that offer favourable terms to our clients, and we'll guide you through the options.",
  },
];

export default function Contact() {
  return (
    <Layout>
      <ContactSEO />
      <PageHeader
        title={
          <>
            Get in <span className="text-primary">touch</span>
          </>
        }
        subtitle="Ready to transform your space?"
        description="Questions, consultations or a viewing: our team will help you find the right real estate solution."
        badge="We'd love to hear from you"
        backgroundImage="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
        action={{ label: "Call now", href: "tel:+2348102067476", variant: "outline" }}
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto grid gap-16 px-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Talk to us"
              title={
                <>
                  Let's start a <span className="text-primary">conversation.</span>
                </>
              }
              subtitle="Call, email or send a message and we'll get back to you within one working day."
            />
            <RevealGroup className="divide-y border-y">
              <RevealItem>
                <a href="tel:+2348102067476" className="group flex items-center gap-5 py-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 transition-colors group-hover:bg-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm text-neutral-500">Phone</span>
                    <span className="block text-xl font-semibold">+234 810 206 7476</span>
                    <span className="block text-neutral-600">+234 706 425 8898</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-neutral-300 transition group-hover:text-black" />
                </a>
              </RevealItem>
              <RevealItem>
                <a href="mailto:Sayonce99@gmail.com" className="group flex items-center gap-5 py-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 transition-colors group-hover:bg-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm text-neutral-500">Email</span>
                    <span className="block text-xl font-semibold">Sayonce99@gmail.com</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-neutral-300 transition group-hover:text-black" />
                </a>
              </RevealItem>
              <RevealItem className="flex items-center gap-5 py-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-neutral-500">Head office</span>
                  <span className="block text-lg font-semibold">
                    69, Ayangburen Road, Ojogbe Bus Stop, Ikorodu, Lagos
                  </span>
                </span>
              </RevealItem>
            </RevealGroup>
            <Reveal className="mt-8 flex gap-2">
              {socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-black hover:bg-black hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal variant="right" className="lg:col-span-7">
            <div className="rounded-3xl bg-neutral-100 p-6 md:p-10">
              <h2 className="mb-2 text-2xl font-bold">Send us a message</h2>
              <p className="mb-8 text-neutral-500">Tell us a little about what you're looking for.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-black py-24 text-white md:py-32">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Visit us"
              title={
                <>
                  Our <span className="text-primary">offices</span>
                </>
              }
              subtitle="Head office in Lagos, with branches across Nigeria."
            />
            <RevealGroup className="space-y-3">
              {OFFICES.map((o) => (
                <RevealItem key={o.name} className="rounded-2xl border border-white/10 p-6">
                  <p className="font-semibold text-primary">{o.name}</p>
                  <p className="mt-1 text-white/75">{o.address}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal variant="clip" className="overflow-hidden rounded-3xl">
            <SimpleMap
              address="69, Ayangburen road, Ojogbe bus stop, Ikorodu, Lagos, Nigeria"
              height="440px"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Questions, <span className="text-primary">answered</span>
                </>
              }
            />
          </div>
          <Reveal className="lg:col-span-7">
            <Accordion type="single" collapsible defaultValue="0" className="border-t">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={String(i)}>
                  <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-neutral-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
