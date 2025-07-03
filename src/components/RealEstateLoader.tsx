import { useState, useEffect } from "react";
import { Building, Home, Key, Hammer, MapPin } from "lucide-react";

interface RealEstateLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
  duration?: number;
  showProgress?: boolean;
  fullScreen?: boolean;
  message?: string;
}

export function RealEstateLoader({
  isLoading = true,
  onComplete,
  duration = 3000,
  showProgress = true,
  fullScreen = true,
  message = "Building your experience...",
}: RealEstateLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: MapPin, label: "Finding locations..." },
    { icon: Building, label: "Loading properties..." },
    { icon: Home, label: "Preparing homes..." },
    { icon: Key, label: "Setting up access..." },
    { icon: Hammer, label: "Final touches..." },
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, duration, onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 800);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  if (!isLoading) return null;

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClasses}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-primary/30 rotate-45 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-primary/20 rotate-12 animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-primary/25 -rotate-12 animate-pulse delay-300"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 border border-primary/15 rotate-45 animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Company Logo/Brand */}
        <div className="mb-8">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078"
            alt="Da'sayonce Logo"
            className="h-16 mx-auto mb-4 animate-pulse"
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            Da'sayonce <span className="text-primary">Real Estate</span>
          </h2>
          <p className="text-gray-300 text-sm">
            Transforming Spaces. Building Trust.
          </p>
        </div>

        {/* Animated Buildings Skyline */}
        <div className="relative mb-8 h-24 flex items-end justify-center gap-2">
          {/* Building 1 */}
          <div
            className="w-6 bg-gradient-to-t from-primary/80 to-primary/40 rounded-t-sm animate-pulse delay-100"
            style={{ height: "60px", animationDuration: "2s" }}
          >
            <div className="w-full h-2 bg-primary/60 mt-2"></div>
            <div className="w-full h-2 bg-primary/60 mt-2"></div>
          </div>

          {/* Building 2 */}
          <div
            className="w-8 bg-gradient-to-t from-blue-500/80 to-blue-400/40 rounded-t-sm animate-pulse delay-200"
            style={{ height: "80px", animationDuration: "1.8s" }}
          >
            <div className="w-full h-2 bg-blue-400/60 mt-3"></div>
            <div className="w-full h-2 bg-blue-400/60 mt-2"></div>
            <div className="w-full h-2 bg-blue-400/60 mt-2"></div>
          </div>

          {/* Building 3 - Tallest */}
          <div
            className="w-7 bg-gradient-to-t from-purple-500/80 to-purple-400/40 rounded-t-sm animate-pulse delay-300"
            style={{ height: "90px", animationDuration: "2.2s" }}
          >
            <div className="w-full h-2 bg-purple-400/60 mt-2"></div>
            <div className="w-full h-2 bg-purple-400/60 mt-2"></div>
            <div className="w-full h-2 bg-purple-400/60 mt-2"></div>
            <div className="w-full h-2 bg-purple-400/60 mt-2"></div>
          </div>

          {/* Building 4 */}
          <div
            className="w-6 bg-gradient-to-t from-green-500/80 to-green-400/40 rounded-t-sm animate-pulse delay-400"
            style={{ height: "70px", animationDuration: "1.9s" }}
          >
            <div className="w-full h-2 bg-green-400/60 mt-3"></div>
            <div className="w-full h-2 bg-green-400/60 mt-2"></div>
          </div>

          {/* Building 5 */}
          <div
            className="w-5 bg-gradient-to-t from-red-500/80 to-red-400/40 rounded-t-sm animate-pulse delay-500"
            style={{ height: "50px", animationDuration: "2.1s" }}
          >
            <div className="w-full h-2 bg-red-400/60 mt-2"></div>
          </div>
        </div>

        {/* Rotating Icon with Current Step */}
        <div className="mb-6">
          <div className="relative w-20 h-20 mx-auto">
            {/* Rotating Ring */}
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            ></div>

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <IconComponent
                    key={index}
                    className={`h-8 w-8 transition-all duration-500 ${
                      currentStep === index
                        ? "text-primary scale-100 opacity-100"
                        : "text-gray-400 scale-75 opacity-0 absolute"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Step Message */}
        <div className="mb-6">
          <p className="text-white text-lg font-medium mb-2">{message}</p>
          <p className="text-primary text-sm font-medium animate-pulse">
            {steps[currentStep].label}
          </p>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm">
              {Math.round(progress)}% Complete
            </p>
          </div>
        )}

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Key */}
          <div className="absolute top-1/4 left-1/4 animate-float">
            <Key className="h-6 w-6 text-primary/60 animate-pulse" />
          </div>

          {/* Floating Home */}
          <div className="absolute top-1/3 right-1/4 animate-float delay-1000">
            <Home className="h-6 w-6 text-blue-400/60 animate-pulse" />
          </div>

          {/* Floating Building */}
          <div className="absolute bottom-1/3 left-1/3 animate-float delay-2000">
            <Building className="h-6 w-6 text-purple-400/60 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Simplified version for smaller loading states
export function RealEstateLoaderSimple({
  size = "md",
  message = "Loading...",
}: {
  size?: "sm" | "md" | "lg";
  message?: string;
}) {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [Building, Home, Key, Hammer];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 600);
    return () => clearInterval(interval);
  }, [icons.length]);

  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`relative ${sizes[size]} mb-3`}>
        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {icons.map((IconComponent, index) => (
            <IconComponent
              key={index}
              className={`transition-all duration-300 ${
                currentIcon === index
                  ? "text-primary scale-100 opacity-100"
                  : "text-gray-400 scale-75 opacity-0 absolute"
              } ${size === "sm" ? "h-4 w-4" : size === "lg" ? "h-8 w-8" : "h-6 w-6"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{message}</p>
    </div>
  );
}
