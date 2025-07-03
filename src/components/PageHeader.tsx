import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string;
  backgroundImage?: string;
  gradient?: "primary" | "dark" | "blue" | "purple" | "green";
  badge?: string;
  showBreadcrumb?: boolean;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  stats?: Array<{
    label: string;
    value: string;
    icon?: ReactNode;
  }>;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  backgroundImage,
  gradient = "dark",
  badge,
  showBreadcrumb = true,
  action,
  stats,
  className = "",
}: PageHeaderProps) {
  const location = useLocation();

  const getGradientClasses = () => {
    switch (gradient) {
      case "primary":
        return "bg-gradient-to-br from-primary/10 via-primary/5 to-background";
      case "blue":
        return "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900";
      case "purple":
        return "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900";
      case "green":
        return "bg-gradient-to-br from-green-600 via-green-700 to-green-900";
      case "dark":
      default:
        return "bg-gradient-to-br from-gray-900 via-black to-gray-800";
    }
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Home", href: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = showBreadcrumb ? getBreadcrumbs() : [];

  return (
    <section
      className={`relative pt-20 pb-16 text-white overflow-hidden ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 ${backgroundImage ? "bg-black/60" : getGradientClasses()}`}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        {showBreadcrumb && breadcrumbs.length > 1 && (
          <ScrollAnimation animation="animate-fade-up">
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center">
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                    )}
                    {index === 0 && <Home className="h-4 w-4 mr-2" />}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-primary font-medium">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </ScrollAnimation>
        )}

        <div className="max-w-4xl">
          {/* Badge */}
          {badge && (
            <ScrollAnimation animation="animate-fade-up" delay={100}>
              <Badge className="bg-primary/20 text-primary border-primary mb-6 text-sm px-4 py-2">
                {badge}
              </Badge>
            </ScrollAnimation>
          )}

          {/* Title */}
          <ScrollAnimation animation="animate-fade-up" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
          </ScrollAnimation>

          {/* Subtitle */}
          {subtitle && (
            <ScrollAnimation animation="animate-fade-up" delay={300}>
              <div className="text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl">
                {subtitle}
              </div>
            </ScrollAnimation>
          )}

          {/* Description */}
          {description && (
            <ScrollAnimation animation="animate-fade-up" delay={400}>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                {description}
              </p>
            </ScrollAnimation>
          )}

          {/* Action Button */}
          {action && (
            <ScrollAnimation animation="animate-fade-up" delay={500}>
              <div className="mb-8">
                {action.href ? (
                  <Button
                    asChild
                    size="lg"
                    variant={action.variant || "default"}
                    className={
                      action.variant === "outline"
                        ? "border-white text-white hover:bg-white hover:text-black"
                        : "bg-primary text-black hover:bg-primary/90"
                    }
                  >
                    <Link to={action.href}>
                      {action.label}
                      <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant={action.variant || "default"}
                    onClick={action.onClick}
                    className={
                      action.variant === "outline"
                        ? "border-white text-white hover:bg-white hover:text-black"
                        : "bg-primary text-black hover:bg-primary/90"
                    }
                  >
                    {action.label}
                    <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                  </Button>
                )}
              </div>
            </ScrollAnimation>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <ScrollAnimation animation="animate-fade-up" delay={600}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      {stat.icon && (
                        <div className="text-primary mb-2 flex justify-center">
                          {stat.icon}
                        </div>
                      )}
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          )}
        </div>
      </div>
    </section>
  );
}
