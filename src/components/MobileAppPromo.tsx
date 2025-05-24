import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Smartphone, CheckCircle, ChevronRight, Bell } from "lucide-react";

export function MobileAppPromo() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your backend
      console.log("Notifying:", email);
      setSubmitted(true);
      setEmail("");

      // Reset the submitted state after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-black text-white relative overflow-hidden">
      {/* Gold accent corner */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-bl-full -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <ScrollAnimation animation="animate-fade-right">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                <Smartphone className="mr-1 h-4 w-4" />
                <span>New Mobile Experience</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Our Mobile App is{" "}
                <span className="text-primary">Coming Soon</span>
              </h2>

              <p className="text-white/80 text-lg">
                Experience the future of real estate on the go. Browse
                properties, schedule viewings, and manage your investments from
                anywhere.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <span className="font-medium">Property Search</span>
                    <p className="text-white/70 text-sm">
                      Find your dream property with advanced filters and
                      location-based search
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <span className="font-medium">Virtual Tours</span>
                    <p className="text-white/70 text-sm">
                      Explore properties through immersive 3D tours from your
                      phone
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <span className="font-medium">Real-time Notifications</span>
                    <p className="text-white/70 text-sm">
                      Stay updated with instant alerts on new properties and
                      price changes
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Form */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">
                  Get Notified on Launch
                </h3>
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-primary text-black hover:bg-primary/90"
                  >
                    {submitted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Notify Me
                      </>
                    )}
                  </Button>
                </form>
                {submitted && (
                  <p className="text-primary text-sm mt-2">
                    Thanks! We'll notify you when our app launches.
                  </p>
                )}
              </div>
            </div>
          </ScrollAnimation>

          {/* Right Column - Phone Mockup */}
          <ScrollAnimation animation="animate-fade-left" className="relative">
            <div className="relative mx-auto" style={{ maxWidth: "280px" }}>
              {/* Phone Frame */}
              <div className="relative z-10 rounded-[3rem] border-8 border-black/80 bg-black/90 shadow-xl aspect-[9/19] overflow-hidden">
                {/* Screen Content */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/5 pointer-events-none z-10" />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F7e88bf5fc8f84a54a67ec3a29cd85a97"
                    alt="App Preview"
                    className="h-full w-full object-cover"
                  />

                  {/* UI Overlay Elements */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-6 px-4 z-20">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <h4 className="text-white text-xs font-semibold mb-1">
                        Da'sayonce Properties
                      </h4>
                      <p className="text-white/80 text-[10px]">
                        Modern 3 Bedroom Apartment
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-primary text-xs font-bold">
                          ₦45,000,000
                        </span>
                        <button className="bg-primary rounded-full p-1">
                          <ChevronRight className="h-3 w-3 text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-12 -left-6 w-12 h-12 bg-primary/40 rounded-full blur-lg"></div>

              {/* Status Bar */}
              <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-t-3xl z-20 flex items-center justify-between px-6">
                <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
              </div>

              {/* App Store Badge */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2 text-xs text-white/80">
                  <span>Coming Soon to</span>
                  <span className="font-bold">App Store</span>
                  <span>&</span>
                  <span className="font-bold">Google Play</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
