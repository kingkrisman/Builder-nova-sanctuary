import { Layout } from "@/components/layout/Layout";
import { ProjectsSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Hammer, Award, TrendingUp } from "lucide-react";

export default function Projects() {
  // For a real application, these would be more detailed categories
  const projectTypes = [
    "All",
    "Residential",
    "Commercial",
    "Mixed-Use",
    "Renovation",
  ];

  return (
    <Layout>
      <ProjectsSEO />
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of successful projects that showcase our
              commitment to quality
            </p>
          </div>
        </div>
      </section>

      {/* Projects Filter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                {projectTypes.map((type) => (
                  <TabsTrigger key={type} value={type}>
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {projectTypes.map((type) => (
              <TabsContent key={type} value={type} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {type === "All"
                    ? projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))
                    : // In a real app, you would filter projects by their actual type
                      projects
                        .slice(0, type === "Residential" ? 2 : 1)
                        .map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Project: Da'sayonce Mini-Estate"
            subtitle="A closer look at one of our flagship developments"
          />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/32447381/pexels-photo-32447381.jpeg"
                alt="Da'sayonce Mini-Estate"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Da'sayonce Mini-Estate</h3>
              <p className="text-muted-foreground">
                Located in Mowe, Ogun State, Da'sayonce Mini-Estate is a gated
                community featuring modern homes with top-tier amenities. The
                development combines contemporary design with functionality to
                create living spaces that cater to the needs of modern families.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Location
                  </h4>
                  <p>Mowe, Ogun State</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Project Type
                  </h4>
                  <p>Residential Estate</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Size
                  </h4>
                  <p>20 Units</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Completion
                  </h4>
                  <p>2022</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Key Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>24/7 Security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Reliable Water Supply</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Paved Roads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Green Spaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Backup Power</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Recreational Areas</span>
                  </li>
                </ul>
              </div>
              <Button className="mt-4">View Project Details</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Project Gallery"
            subtitle="A visual showcase of our completed and ongoing projects"
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                url: "https://images.pexels.com/photos/13515672/pexels-photo-13515672.jpeg",
                alt: "Construction site with crane",
              },
              {
                url: "https://images.pexels.com/photos/32512229/pexels-photo-32512229.jpeg",
                alt: "Luxury villa exterior",
              },
              {
                url: "https://images.pexels.com/photos/9244866/pexels-photo-9244866.jpeg",
                alt: "Modern apartment complex",
              },
              {
                url: "https://images.pexels.com/photos/17797763/pexels-photo-17797763.jpeg",
                alt: "Commercial building facade",
              },
              {
                url: "https://images.pexels.com/photos/32485942/pexels-photo-32485942.png",
                alt: "Interior design showcase",
              },
              {
                url: "https://images.pexels.com/photos/10549886/pexels-photo-10549886.jpeg",
                alt: "Dubai skyline architecture",
              },
              {
                url: "https://images.pexels.com/photos/32473240/pexels-photo-32473240.png",
                alt: "Modern living space design",
              },
              {
                url: "https://images.pexels.com/photos/14646006/pexels-photo-14646006.jpeg",
                alt: "Aerial view of property development",
              },
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-slate-200 rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
