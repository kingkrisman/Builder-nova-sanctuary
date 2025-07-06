import { useEffect, useCallback } from "react";
import { useLoading } from "../contexts/LoadingContext";

export function useResourceLoading() {
  const { startLoading, stopLoading, setLoadingMessage } = useLoading();

  const checkAllResourcesLoaded = useCallback(() => {
    return new Promise<void>((resolve) => {
      // Check document ready state
      if (document.readyState === "complete") {
        resolve();
        return;
      }

      // Wait for document to be complete
      const handleReadyStateChange = () => {
        if (document.readyState === "complete") {
          document.removeEventListener(
            "readystatechange",
            handleReadyStateChange,
          );
          resolve();
        }
      };

      document.addEventListener("readystatechange", handleReadyStateChange);
    });
  }, []);

  const checkImagesLoaded = useCallback(() => {
    return new Promise<void>((resolve) => {
      const images = document.querySelectorAll("img");
      const totalImages = images.length;

      if (totalImages === 0) {
        resolve();
        return;
      }

      let loadedImages = 0;
      const imageLoadHandler = () => {
        loadedImages++;
        setLoadingMessage(`Loading images... (${loadedImages}/${totalImages})`);

        if (loadedImages >= totalImages) {
          resolve();
        }
      };

      images.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          imageLoadHandler();
        } else {
          img.addEventListener("load", imageLoadHandler, { once: true });
          img.addEventListener("error", imageLoadHandler, { once: true });
        }
      });

      // Fallback timeout for stuck images
      setTimeout(() => {
        resolve();
      }, 8000);
    });
  }, [setLoadingMessage]);

  const checkVideosLoaded = useCallback(() => {
    return new Promise<void>((resolve) => {
      const videos = document.querySelectorAll("video");
      const totalVideos = videos.length;

      if (totalVideos === 0) {
        resolve();
        return;
      }

      let loadedVideos = 0;
      const videoLoadHandler = () => {
        loadedVideos++;
        setLoadingMessage(`Loading videos... (${loadedVideos}/${totalVideos})`);

        if (loadedVideos >= totalVideos) {
          resolve();
        }
      };

      videos.forEach((video) => {
        if (video.readyState >= 3) {
          // HAVE_FUTURE_DATA or higher
          videoLoadHandler();
        } else {
          video.addEventListener("canplaythrough", videoLoadHandler, {
            once: true,
          });
          video.addEventListener("error", videoLoadHandler, { once: true });
        }
      });

      // Fallback timeout
      setTimeout(() => {
        resolve();
      }, 10000);
    });
  }, [setLoadingMessage]);

  const loadAllResources = useCallback(async () => {
    startLoading("Loading page...");

    try {
      // Wait for document to be ready
      setLoadingMessage("Preparing page...");
      await checkAllResourcesLoaded();

      // Small delay to let DOM settle
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Load images
      setLoadingMessage("Loading images...");
      await checkImagesLoaded();

      // Load videos
      setLoadingMessage("Loading videos...");
      await checkVideosLoaded();

      // Final delay for smooth transition
      setLoadingMessage("Finishing up...");
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.warn("Resource loading error:", error);
    } finally {
      stopLoading();
    }
  }, [
    startLoading,
    stopLoading,
    setLoadingMessage,
    checkAllResourcesLoaded,
    checkImagesLoaded,
    checkVideosLoaded,
  ]);

  return {
    loadAllResources,
    checkImagesLoaded,
    checkVideosLoaded,
  };
}
