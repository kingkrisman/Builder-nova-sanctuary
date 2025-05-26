import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  Smartphone,
  CheckCircle,
  ChevronRight,
  Bell,
  ArrowRight,
} from "lucide-react";

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

                {/* App Store Buttons */}
                <div className="mt-8">
                  <p className="text-sm text-white/70 mb-3">Coming soon to:</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="app-store-button group">
                      <a
                        href="#"
                        className="flex items-center bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg px-4 py-2 transition-all duration-200"
                      >
                        <div className="mr-3">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.177 5.177c-1.083 1.084-3.14.785-3.14.785s-.298-2.056.786-3.14c1.083-1.083 3.14-.784 3.14-.784s.298 2.056-.786 3.14M4 14.06c0 3.281 2.196 7.05 4.419 7.847c.77.276 1.567-.105 2.229-.58c.502-.36 1.11-.703 1.602-.703c.49 0 1.1.343 1.601.703c.662.475 1.459.856 2.23.58c1.579-.566 3.145-2.633 3.919-4.96c-1.5-.43-2.594-1.786-2.594-3.393c0-1.472.919-2.734 2.226-3.265C18.79 8.793 17.414 8 15.859 8c-.804 0-1.544.324-2.14.713c-.954.62-1.985.62-2.938 0C10.184 8.324 9.445 8 8.641 8C6.077 8 4 10.155 4 14.06" color="currentColor"/></svg>
                          
                        </div>
                        <div className="text-left">
                          <div className="text-xs text-white/80">
                            Download on the
                          </div>
                          <div className="text-white font-semibold text-sm">
                            App Store
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="play-store-button group">
                      <a
                        href="#"
                        className="flex items-center bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg px-4 py-2 transition-all duration-200"
                      >
                        <div className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M.859 11.981V1.741c0-.672.79-1.098 1.434-.771L12.37 6.09c.662.336.662 1.207 0 1.543l-10.077 5.12c-.644.327-1.434-.099-1.434-.772M9.23 9.23l-8.1-8.101m8.1 3.364l-8.1 8.1" stroke-width="1"/></svg>
                        </div>
                        <div className="text-left">
                          <div className="text-xs text-white/80">GET IT ON</div>
                          <div className="text-white font-semibold text-sm">
                            Google Play
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right Column - Phone Mockup */}
          <ScrollAnimation animation="animate-fade-left" className="relative">
            <div className="relative mx-auto" style={{ maxWidth: "300px" }}>
              {/* Enhanced Phone Frame */}
              <div className="relative z-10">
                {/* Phone Outer Frame */}
                <div
                  className="relative rounded-[3rem] border-[12px] border-black/90 bg-black shadow-xl overflow-hidden"
                  style={{ aspectRatio: "9/19" }}
                >
                  {/* Screen Content */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-7 w-full bg-black/80 flex items-center justify-between px-6 relative z-30">
                      <div className="text-white text-[10px] font-medium">
                        9:41 AM
                      </div>
                      <div className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
                          <path
                            fill="currentColor"
                            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                            opacity="0.4"
                          />
                          <path
                            fill="currentColor"
                            d="M19 10h3a9.01 9.01 0 0 0-9-9v3a6 6 0 0 1 6 6Z"
                          />
                          <path
                            fill="currentColor"
                            d="M19 14h3a9.01 9.01 0 0 1-9 9v-3a6 6 0 0 0 6-6Z"
                          />
                        </svg>
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
                          <path
                            fill="currentColor"
                            d="M19 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
                          />
                          <path
                            fill="currentColor"
                            d="M14 4h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
                          />
                          <path
                            fill="currentColor"
                            d="M9 10h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
                          />
                          <path
                            fill="currentColor"
                            d="M4 13h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z"
                          />
                        </svg>
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
                          <path
                            fill="currentColor"
                            d="M7 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2ZM9 9h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Main Screen Content - Real Estate App UI */}
                    <div className="absolute inset-0 z-20">
                      {/* Background Image */}
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F7e88bf5fc8f84a54a67ec3a29cd85a97"
                        alt="App Preview"
                        className="h-full w-full object-cover opacity-50"
                      />

                      {/* App Interface */}
                      <div className="absolute inset-0 flex flex-col">
                        {/* App Header */}
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <span className="text-black font-bold text-xs">
                                D'
                              </span>
                            </div>
                            <span className="text-white font-medium text-sm">
                              Da'sayonce
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 text-white"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M21 21l-4.3-4.3m2.8-6.2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 text-white"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M15 17h5l-1.4-1.4a6 6 0 0 0-3.6-3.6M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 0a7 7 0 0 0-7 7v3h14v-1.5M6 19v.5a2.5 2.5 0 0 0 2.5 2.5H19a2.5 2.5 0 0 0 2.5-2.5v-2a2.5 2.5 0 0 0-2.5-2.5h-2"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 px-4">
                          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-3">
                            <h3 className="text-white text-sm font-medium">
                              Find Your Dream Home
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex-1 bg-white/20 rounded-md px-3 py-1.5 text-xs text-white/80">
                                Search properties...
                              </div>
                              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-4 w-4 text-black"
                                >
                                  <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.3-4.3m2.8-6.2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <div className="flex-1 bg-white/5 rounded-full px-2 py-1 text-[10px] text-center text-white/70">
                                Buy
                              </div>
                              <div className="flex-1 bg-primary/20 rounded-full px-2 py-1 text-[10px] text-center text-primary font-medium">
                                Rent
                              </div>
                              <div className="flex-1 bg-white/5 rounded-full px-2 py-1 text-[10px] text-center text-white/70">
                                Sell
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Cards */}
                        <div className="p-4 space-y-3">
                          <h4 className="text-xs font-medium text-white/90">
                            Featured Properties
                          </h4>

                          {/* Property Card */}
                          <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
                            <div className="h-24 bg-primary/30 relative">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F1e3e6937ad364a8ea712bb2774074832"
                                alt="Property"
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-black/60 rounded-md px-2 py-1">
                                <span className="text-[10px] text-white">
                                  Premium
                                </span>
                              </div>
                            </div>
                            <div className="p-3">
                              <h4 className="text-white text-xs font-semibold">
                                Modern 3 Bedroom Apartment
                              </h4>
                              <p className="text-white/80 text-[10px] mt-1">
                                Lekki Phase 1, Lagos
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

                          {/* Navigation Bar */}
                          <div className="absolute bottom-0 inset-x-0 h-16 bg-black/50 backdrop-blur-md flex items-center justify-around px-6">
                            <div className="flex flex-col items-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-primary"
                              >
                                <path
                                  fill="currentColor"
                                  d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z"
                                />
                              </svg>
                              <span className="text-[8px] text-white/80 mt-1">
                                Home
                              </span>
                            </div>
                            <div className="flex flex-col items-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-white/70"
                              >
                                <path
                                  fill="currentColor"
                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
                                  opacity="0.5"
                                />
                              </svg>
                              <span className="text-[8px] text-white/80 mt-1">
                                Saved
                              </span>
                            </div>
                            <div className="flex flex-col items-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-white/70"
                              >
                                <path
                                  fill="currentColor"
                                  d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 14H5.17L4 17.17V4h16v12Z"
                                />
                              </svg>
                              <span className="text-[8px] text-white/80 mt-1">
                                Chat
                              </span>
                            </div>
                            <div className="flex flex-col items-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-white/70"
                              >
                                <path
                                  fill="currentColor"
                                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
                                />
                              </svg>
                              <span className="text-[8px] text-white/80 mt-1">
                                Profile
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/50 rounded-full"></div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-5 bg-black rounded-b-2xl z-20"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-12 -left-6 w-12 h-12 bg-primary/40 rounded-full blur-lg"></div>

              {/* Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[3rem] pointer-events-none"></div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
