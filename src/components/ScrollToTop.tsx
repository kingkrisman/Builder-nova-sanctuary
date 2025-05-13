import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component ensures that when a link is clicked and the page changes,
// the window scrolls to the top automatically
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
