import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-black text-white shadow-md py-2"
          : "bg-transparent py-4 text-white",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Da'sayonce</span>
          <span className="hidden md:inline-block text-sm text-white/80">
            Real Estate & Properties
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-[rgba(255,254,254,0.8)] hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
          >
            Services
          </Link>
          <Link
            to="/projects"
            className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link
            to="/team"
            className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
          >
            Team
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Button
            asChild
            size="sm"
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-black text-white">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-base font-medium text-white hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                className="mt-4 bg-primary text-black hover:bg-primary/90"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
