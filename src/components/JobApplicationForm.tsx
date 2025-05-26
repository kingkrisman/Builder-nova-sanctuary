import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { JobListing } from "@/lib/data";
import { Paperclip, CheckCircle2, Loader2 } from "lucide-react";

interface JobApplicationFormProps {
  job: JobListing;
}

export function JobApplicationForm({ job }: JobApplicationFormProps) {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const [resumeFileName, setResumeFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState((prev) => ({ ...prev, resume: e.target.files![0] }));
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Reset form after submission
      setFormState({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
      });
      setResumeFileName("");

      // Show success message temporarily
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Apply for {job.title}</h3>

      {submitted ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">
              Application Submitted Successfully
            </h4>
            <p className="text-green-700 text-sm mt-1">
              Thank you for your interest in joining Da'sayonce Real Estate. Our
              team will review your application and contact you if your
              qualifications match our requirements.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formState.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                disabled={submitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  disabled={submitting}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formState.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell us why you're interested in this position and what makes you a good fit"
                className="min-h-[120px] resize-none"
                disabled={submitting}
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume/CV</Label>
              <div className="mt-1">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="resume"
                    className={`flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer transition-colors ${
                      resumeFileName
                        ? "bg-primary/10 border-primary/30"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Paperclip className="h-4 w-4 text-primary" />
                    <span>{resumeFileName || "Upload Resume/CV"}</span>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={submitting}
                      required
                    />
                  </label>
                  {resumeFileName && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setResumeFileName("");
                        setFormState((prev) => ({ ...prev, resume: null }));
                      }}
                      disabled={submitting}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-black hover:bg-primary/90"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this application, you consent to Da'sayonce Real
            Estate processing your personal information for recruitment
            purposes.
          </p>
        </form>
      )}
    </div>
  );
}
