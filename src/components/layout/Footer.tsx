import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { contactInfo, socialMedia } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Da'sayonce</h3>
            <p className="text-sm text-slate-400">Real Estate and Properties</p>
            <p className="text-sm text-slate-400">RC: 7115835</p>
            <p className="text-sm text-slate-400">
              Transforming Spaces. Building Trust.
            </p>
            <div className="flex gap-4 mt-4">
              {socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li className="text-slate-400">Property Development</li>
              <li className="text-slate-400">Building Construction</li>
              <li className="text-slate-400">Renovation Works</li>
              <li className="text-slate-400">Interior & Exterior Design</li>
              <li className="text-slate-400">Land Sales & Documentation</li>
              <li className="text-slate-400">Project Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <address className="not-italic">
              <p className="text-slate-400">
                69, Ayangburen road, Ojogbe bus stop, Ikorodu.
              </p>
              <p className="text-slate-400 mt-2">
                Email:{" "}
                <a
                  href="mailto:Sayonce99@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Sayonce99@gmail.com
                </a>
              </p>
              <p className="text-slate-400">
                Phone:{" "}
                <a
                  href="tel:+2348102067476"
                  className="hover:text-white transition-colors"
                >
                  +234 8102 067 476
                </a>
              </p>
              <p className="text-slate-400">
                Phone:{" "}
                <a
                  href="tel:+2347064258898"
                  className="hover:text-white transition-colors"
                >
                  +234 706 425 8898
                </a>
              </p>
            </address>
            <Button asChild className="mt-2" variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-400">
          <p>
            &copy; {currentYear} Da'sayonce Real Estate and Properties. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
