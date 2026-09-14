import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls the window back to the top on every route change.
 * Wouter (SPA) keeps the browser's scroll position between routes,
 * so without this a new page appears mid-page instead of at the hero.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (location.includes("#")) return;
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}