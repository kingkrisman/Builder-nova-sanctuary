import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResourceLoading } from "./useResourceLoading";

export function usePageLoading() {
  const location = useLocation();
  const { loadAllResources } = useResourceLoading();

  useEffect(() => {
    // Small delay to let the new page render before checking resources
    const timer = setTimeout(() => {
      loadAllResources();
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, loadAllResources]);
}
