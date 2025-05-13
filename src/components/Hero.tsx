import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div
          className="absolute inset-0 bg-black/80"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F1e3e6937ad364a8ea712bb2774074832)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <ScrollAnimation animation="animate-fade-up" className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Transforming</span> Spaces.{" "}
              <span className="text-primary">Building</span> Trust.
            </h1>
          </ScrollAnimation>

          <ScrollAnimation
            animation="animate-fade-up"
            delay={200}
            className="mb-8"
          >
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Da'sayonce Real Estate and Properties is committed to delivering
              exceptional real estate solutions that reflect quality, value, and
              client aspirations.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="animate-fade-up" delay={400}>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-black hover:bg-primary/90"
              >
                <Link to="/projects">View Our Projects</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:border-primary hover:text-primary"
                style={{
                  transitionProperty:
                    "color, border-color, text-decoration-color, stroke",
                }}
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
