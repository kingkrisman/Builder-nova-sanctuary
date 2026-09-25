import { useEffect, useRef } from "react";
import { hasSeenIntro } from "../contexts/LoadingContext";
import { useResourceLoading } from "./useResourceLoading";

// Runs the intro loader on the first page load of a session only; later navigations render instantly.
export function usePageLoading() {
  const { loadAllResources } = useResourceLoading();
  const started = useRef(false);

  useEffect(() => {
    if (started.current || hasSeenIntro()) return;
    started.current = true;
    loadAllResources();
  }, [loadAllResources]);
}
