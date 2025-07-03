import { Layout } from "@/components/layout/Layout";
import { TeamSEO } from "@/components/RealEstateSEO";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamCard } from "@/components/TeamCard";
import { leadershipTeam } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, Award, Target } from "lucide-react";

export default function Team() {
  const departments = [
    { id: "executive", name: "Executive Management" },
    { id: "project", name: "Project & Construction" },
    { id: "realestate", name: "Real Estate" },
    { id: "design", name: "Design & Planning" },
    { id: "support", name: "Support Services" },
    { id: "security", name: "Security & Logistics" },
  ];

  return (
    <Layout>
      <TeamSEO />
      <PageHeader
        title={
          <>
            Our <span className="text-primary">Leadership</span> Team
          </>
        }
        subtitle="Excellence Through Expert Leadership"
        description="Meet the dedicated professionals who drive our success. Our experienced team brings together decades of expertise in real estate development, construction, design, and management."
        gradient="blue"
        badge="Professional Excellence"
        backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
        stats={[
          {
            label: "Team Members",
            value: "50+",
            icon: <Users className="h-5 w-5" />,
          },
          {
            label: "Departments",
            value: "6",
            icon: <Briefcase className="h-5 w-5" />,
          },
          {
            label: "Certifications",
            value: "100+",
            icon: <Award className="h-5 w-5" />,
          },
          {
            label: "Experience",
            value: "200+ Years",
            icon: <Target className="h-5 w-5" />,
          },
        ]}
        action={{
          label: "Join Our Team",
          href: "/careers",
        }}
      />

      {/* Team Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="A Team of Experts"
                subtitle="Our leadership team brings together decades of experience across various disciplines in real estate and construction."
              />
              <p className="text-muted-foreground mb-6">
                At Da'sayonce Real Estate and Properties, we believe that our
                greatest asset is our team. Our diverse group of professionals
                brings together expertise from various fields including
                engineering, architecture, interior design, project management,
                and real estate.
              </p>
              <p className="text-muted-foreground">
                Each member of our leadership team is committed to upholding our
                core values and delivering exceptional results for our clients.
                Their collective experience and dedication ensure that every
                project we undertake meets the highest standards of quality and
                excellence.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F1d77033fc36e46d4b147c3ce854efd1f"
                alt="Da'sayonce Team"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Members by Department */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Meet Our Leadership"
            subtitle="Browse our team by department"
            centered
          />

          <Tabs defaultValue="executive" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList className="mb-2">
                {departments.map((dept) => (
                  <TabsTrigger key={dept.id} value={dept.id}>
                    {dept.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="executive">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadershipTeam.executiveManagement.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="project">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadershipTeam.projectConstruction.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="realestate">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadershipTeam.realEstate.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="design">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadershipTeam.designPlanning.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="support">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadershipTeam.supportServices.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadershipTeam.securityLogistics.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Team Culture"
            subtitle="What makes working at Da'sayonce special"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe in the power of teamwork and collaboration. Our
                diverse team brings together different perspectives and
                expertise to create innovative solutions.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
              <p className="text-muted-foreground">
                We invest in our team's professional development, encouraging
                continuous learning and growth to stay at the forefront of
                industry trends and best practices.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We are committed to delivering excellence in everything we do.
                Our team strives for the highest standards of quality and
                professionalism in every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Join Our Team"
            subtitle="Interested in becoming part of Da'sayonce Real Estate and Properties?"
            centered
          />
          <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
            We're always looking for talented professionals to join our team. If
            you're passionate about real estate and construction, and share our
            commitment to excellence, we'd love to hear from you.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Current Openings</h3>
            <p className="text-muted-foreground mb-4">
              We currently have openings in the following departments:
            </p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Project Management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Architectural Design</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Sales and Marketing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
