import { useState, useCallback } from "react";
import { useLoading } from "../contexts/LoadingContext";

interface LoadingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  showLoader?: boolean;
}

export function LoadingImage({
  src,
  alt,
  fallback = "/placeholder.svg",
  showLoader = true,
  className,
  ...props
}: LoadingImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    if (showLoader) {
      stopLoading();
    }
  }, [showLoader, stopLoading]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
    if (showLoader) {
      stopLoading();
    }
  }, [showLoader, stopLoading]);

  const handleImageStart = useCallback(() => {
    if (showLoader && !imageLoaded) {
      startLoading("Loading images...");
    }
  }, [showLoader, imageLoaded, startLoading]);

  return (
    <img
      src={imageError ? fallback : src}
      alt={alt}
      className={className}
      onLoadStart={handleImageStart}
      onLoad={handleImageLoad}
      onError={handleImageError}
      {...props}
    />
  );
}
