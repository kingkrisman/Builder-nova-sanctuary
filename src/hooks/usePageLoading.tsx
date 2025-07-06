import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";

export function usePageLoading() {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    // Start loading when route changes
    startLoading("Loading page...");

    // Simulate checking for page readiness
    const timer = setTimeout(() => {
      // Check if all images are loaded
      const images = document.querySelectorAll("img");
      let loadedImages = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        stopLoading();
        return;
      }

      const checkImageLoad = () => {
        loadedImages++;
        if (loadedImages >= totalImages) {
          stopLoading();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          checkImageLoad();
        } else {
          img.addEventListener("load", checkImageLoad);
          img.addEventListener("error", checkImageLoad);
        }
      });

      // Fallback timeout
      const fallbackTimer = setTimeout(() => {
        stopLoading();
      }, 5000);

      return () => clearTimeout(fallbackTimer);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, startLoading, stopLoading]);
}
