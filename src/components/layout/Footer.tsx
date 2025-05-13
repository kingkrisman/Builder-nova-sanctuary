import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { contactInfo, socialMedia } from "@/lib/data";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <ScrollAnimation
            animation="animate-fade-up"
            delay={100}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-primary">Da'sayonce</h3>
            <p className="text-sm text-white/70">Real Estate and Properties</p>
            <p className="text-sm text-white/70">RC: 7115835</p>
            <p className="text-sm text-white/70">
              Transforming Spaces. Building Trust.
            </p>
            <div className="flex gap-4 mt-4">
              {socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </ScrollAnimation>

          {/* Quick Links */}
          <ScrollAnimation
            animation="animate-fade-up"
            delay={200}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </ScrollAnimation>

          {/* Services */}
          <ScrollAnimation
            animation="animate-fade-up"
            delay={300}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">Services</h3>
            <ul className="space-y-2">
              <li className="text-white/70">Property Development</li>
              <li className="text-white/70">Building Construction</li>
              <li className="text-white/70">Renovation Works</li>
              <li className="text-white/70">Interior & Exterior Design</li>
              <li className="text-white/70">Land Sales & Documentation</li>
              <li className="text-white/70">Project Management</li>
            </ul>
          </ScrollAnimation>

          {/* Contact */}
          <ScrollAnimation
            animation="animate-fade-up"
            delay={400}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">Contact Us</h3>
            <address className="not-italic">
              <p className="text-white/70">
                69, Ayangburen road, Ojogbe bus stop, Ikorodu.
              </p>
              <p className="text-white/70 mt-2">
                Email:{" "}
                <a
                  href="mailto:Sayonce99@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  Sayonce99@gmail.com
                </a>
              </p>
              <p className="text-white/70">
                Phone:{" "}
                <a
                  href="tel:+2348102067476"
                  className="hover:text-primary transition-colors"
                >
                  +234 8102 067 476
                </a>
              </p>
              <p className="text-white/70">
                Phone:{" "}
                <a
                  href="tel:+2347064258898"
                  className="hover:text-primary transition-colors"
                >
                  +234 706 425 8898
                </a>
              </p>
            </address>
            <Button
              asChild
              className="mt-2 bg-primary text-black hover:bg-primary/90 border-primary"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </ScrollAnimation>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-white/70">
          <p>
            &copy; {currentYear} Da'sayonce Real Estate and Properties. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
