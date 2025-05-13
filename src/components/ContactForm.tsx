import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Define form schema with validation rules
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Define the type for our form data
type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize react-hook-form with zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to an API
      console.log("Form submitted with values:", values);

      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle successful submission
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll be in touch soon!",
        variant: "default",
      });

      // Reset form
      form.reset();
      setFormSubmitted(true);

      // Clear submission state after showing success feedback
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      // Handle submission error
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="border-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="border-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    className="border-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter subject"
                    className="border-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your message here..."
                  className="min-h-[120px] resize-none border-primary/20 focus:border-primary"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        <div className="flex items-center">
          <Button
            type="submit"
            className="bg-primary text-black hover:bg-primary/90 w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : formSubmitted ? (
              "Message Sent!"
            ) : (
              "Send Message"
            )}
          </Button>

          {formSubmitted && (
            <span className="ml-4 text-green-500">
              Thank you! We'll be in touch soon.
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          By submitting this form, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>
          .
        </div>
      </form>
    </Form>
  );
}
