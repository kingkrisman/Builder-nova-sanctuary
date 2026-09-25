import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

/** Scroll the page, going through Lenis when it's running so its momentum stays in sync. */
export function scrollToTop(options: { immediate?: boolean } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate: options.immediate, force: true });
  else window.scrollTo({ top: 0, behavior: options.immediate ? "auto" : "smooth" });
}

// Scrollable things that should keep native scrolling instead of the page taking the wheel
const NATIVE_SCROLL =
  '[role="dialog"], [role="alertdialog"], [role="listbox"], [data-radix-popper-content-wrapper], [data-lenis-prevent], .no-scrollbar';

/**
 * Heavy, momentum-style wheel scrolling for the public site.
 * Touch devices keep their native scrolling; reduced-motion users get 1:1 scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const instance = new Lenis({
      // Lower lerp = more weight: the page keeps gliding and eases to a stop
      lerp: 0.075,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      anchors: true,
      prevent: (node) => !!node.closest?.(NATIVE_SCROLL),
    });
    lenis = instance;

    // Pause while anything locks the page (mobile menu, dialogs, lightboxes)
    const body = document.body;
    const sync = () => {
      const locked =
        body.hasAttribute("data-scroll-locked") || body.style.overflow === "hidden";
      if (locked) instance.stop();
      else instance.start();
    };
    const observer = new MutationObserver(sync);
    observer.observe(body, { attributes: true, attributeFilter: ["style", "data-scroll-locked"] });

    return () => {
      observer.disconnect();
      instance.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}
