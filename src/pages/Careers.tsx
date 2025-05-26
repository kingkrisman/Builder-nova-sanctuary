import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CareersSEO } from "@/components/RealEstateSEO";
import { SectionHeading } from "@/components/SectionHeading";
import { JobCard } from "@/components/JobCard";
import { jobListings } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Briefcase, MapPin, Users, Building } from "lucide-react";

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Get unique departments
  const departments = [
    "All",
    ...Array.from(new Set(jobListings.map((job) => job.department))),
  ];

  // Featured job (could be most recent or specifically chosen)
  const featuredJob = jobListings[0];

  // Filter jobs based on search and department
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      activeFilter === "All" || job.department === activeFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <Layout>
      <CareersSEO />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground">
              Build your career with Da'sayonce Real Estate and be part of
              transforming Nigeria's property landscape
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="animate-fade-right">
              <SectionHeading
                title="Why Join Da'sayonce?"
                subtitle="We offer more than just a job – we provide a career path in one of Nigeria's most dynamic industries"
              />

              <div className="space-y-6 mt-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Professional Growth</h3>
                    <p className="text-muted-foreground">
                      Access to mentorship, training programs, and career
                      advancement opportunities to help you reach your full
                      potential.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Impactful Projects</h3>
                    <p className="text-muted-foreground">
                      Work on significant developments that shape communities
                      and transform Nigeria's urban landscape.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Collaborative Culture</h3>
                    <p className="text-muted-foreground">
                      Join a diverse team of professionals who value innovation,
                      integrity, and excellence in everything they do.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="animate-fade-left">
              <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F1d77033fc36e46d4b147c3ce854efd1f"
                  alt="Da'sayonce Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Featured Job */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Opportunity"
            subtitle="Our most recent opening"
            centered
          />

          <ScrollAnimation animation="animate-fade-up">
            <div className="max-w-3xl mx-auto">
              <JobCard job={featuredJob} featured />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Current Openings"
            subtitle="Find the perfect role that matches your skills and career goals"
            centered
          />

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Departments */}
            <div className="flex flex-wrap gap-2">
              {departments.map((department) => (
                <Badge
                  key={department}
                  variant={activeFilter === department ? "default" : "outline"}
                  className={`cursor-pointer ${
                    activeFilter === department
                      ? "bg-primary text-black hover:bg-primary/90"
                      : "hover:bg-slate-200"
                  }`}
                  onClick={() => setActiveFilter(department)}
                >
                  {department}
                </Badge>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-[300px]"
              />
            </div>
          </div>

          {/* Job Listings */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <ScrollAnimation
                  key={job.id}
                  animation="animate-fade-up"
                  delay={100 * (index % 3)}
                >
                  <JobCard job={job} />
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No positions found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Internship Program */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation animation="animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">
                Our Internship Program
              </h2>
              <p className="text-white/80 mb-6">
                We're committed to developing the next generation of real estate
                professionals through our structured internship program.
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-left">
                <h3 className="text-xl font-bold mb-3">Program Highlights:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-black font-bold text-sm">1</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">
                        Hands-on Experience
                      </span>
                      <p className="text-white/70 text-sm">
                        Work on real projects alongside experienced
                        professionals
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-black font-bold text-sm">2</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">Mentorship</span>
                      <p className="text-white/70 text-sm">
                        One-on-one guidance from industry experts
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-black font-bold text-sm">3</span>
                    </div>
                    <div>
                      <span className="font-medium text-white">
                        Career Development
                      </span>
                      <p className="text-white/70 text-sm">
                        Skills workshops, industry networking, and potential for
                        permanent positions
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6">
                  <Button
                    asChild
                    className="bg-primary text-black hover:bg-primary/90"
                  >
                    <Link to="/careers/5">
                      View Current Internship Opportunities
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Recruitment Process */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Recruitment Process"
            subtitle="What to expect when you apply for a position with us"
            centered
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process Steps */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2"></div>

              <div className="space-y-12 relative">
                <ScrollAnimation animation="animate-fade-up" delay={100}>
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:text-right">
                      <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <h3 className="text-lg font-bold text-primary mb-2">
                          1. Application
                        </h3>
                        <p className="text-muted-foreground">
                          Submit your application through our careers portal.
                          Ensure your resume highlights relevant skills and
                          experience.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary z-10"></div>
                    <div className="mt-4 md:mt-0"></div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="animate-fade-up" delay={200}>
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:text-right mt-4 md:mt-0"></div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary z-10"></div>
                    <div>
                      <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <h3 className="text-lg font-bold text-primary mb-2">
                          2. Initial Screening
                        </h3>
                        <p className="text-muted-foreground">
                          Our HR team reviews applications and conducts initial
                          phone interviews with qualified candidates.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="animate-fade-up" delay={300}>
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:text-right">
                      <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <h3 className="text-lg font-bold text-primary mb-2">
                          3. Assessment
                        </h3>
                        <p className="text-muted-foreground">
                          Depending on the role, you may be asked to complete
                          technical assessments, case studies, or portfolio
                          presentations.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary z-10"></div>
                    <div className="mt-4 md:mt-0"></div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="animate-fade-up" delay={400}>
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:text-right mt-4 md:mt-0"></div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary z-10"></div>
                    <div>
                      <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <h3 className="text-lg font-bold text-primary mb-2">
                          4. Interview
                        </h3>
                        <p className="text-muted-foreground">
                          Qualified candidates are invited for in-person or
                          virtual interviews with the hiring manager and team
                          members.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="animate-fade-up" delay={500}>
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:text-right">
                      <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <h3 className="text-lg font-bold text-primary mb-2">
                          5. Offer & Onboarding
                        </h3>
                        <p className="text-muted-foreground">
                          Successful candidates receive an offer letter,
                          followed by a comprehensive onboarding program once
                          accepted.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary z-10"></div>
                    <div className="mt-4 md:mt-0"></div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation animation="animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">
                Don't See a Suitable Position?
              </h2>
              <p className="text-muted-foreground mb-8">
                We're always looking for talented individuals to join our team.
                Send us your CV for future opportunities.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-primary text-black hover:bg-primary/90"
              >
                <a href="mailto:careers@dasayonce.com">
                  Submit Spontaneous Application
                </a>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </Layout>
  );
}
