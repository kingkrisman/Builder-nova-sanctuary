import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { JobDetailsSEO } from "@/components/RealEstateSEO";
import { SectionHeading } from "@/components/SectionHeading";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { jobListings } from "@/lib/data";
import { JobCard } from "@/components/JobCard";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    // Find the current job
    const jobId = parseInt(id);
    const currentJob = jobListings.find((j) => j.id === jobId);

    if (!currentJob) {
      // Redirect to careers page if job not found
      navigate("/careers", { replace: true });
      return;
    }

    setJob(currentJob);

    // Find similar jobs (same department, excluding current job)
    const related = jobListings
      .filter((j) => j.department === currentJob.department && j.id !== jobId)
      .slice(0, 3);

    setSimilarJobs(related);
  }, [id, navigate]);

  if (!job) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <JobDetailsSEO job={job} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-6 hover:bg-transparent"
            >
              <Link
                to="/careers"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Careers
              </Link>
            </Button>

            <ScrollAnimation animation="animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {job.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {job.department}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>{job.experience}</span>
                </div>
                {job.deadline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Apply by {job.deadline}</span>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Job Information */}
            <div className="md:col-span-2">
              <ScrollAnimation animation="animate-fade-right">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About the Role</h2>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Key Responsibilities
                    </h2>
                    <ul className="space-y-2">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Application Form */}
            <div>
              <ScrollAnimation animation="animate-fade-left">
                <JobApplicationForm job={job} />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Jobs */}
      {similarJobs.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Similar Positions"
              subtitle="You might also be interested in these roles"
              centered
            />

            <div className="grid md:grid-cols-3 gap-6">
              {similarJobs.map((similarJob, index) => (
                <ScrollAnimation
                  key={similarJob.id}
                  animation="animate-fade-up"
                  delay={100 * index}
                >
                  <JobCard job={similarJob} />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
