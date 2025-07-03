import { useState, useEffect } from "react";
import { RealEstateLoader } from "./RealEstateLoader";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  minLoadingTime?: number;
}

export function LoadingScreen({
  onLoadingComplete,
  minLoadingTime = 2000,
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time with minimum duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  const handleLoadingComplete = () => {
    onLoadingComplete?.();
  };

  return (
    <RealEstateLoader
      isLoading={isLoading}
      onComplete={handleLoadingComplete}
      duration={minLoadingTime}
      showProgress={true}
      fullScreen={true}
      message="Welcome to Da'sayonce Real Estate"
    />
  );
}
