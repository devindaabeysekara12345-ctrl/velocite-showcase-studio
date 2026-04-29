import { useEffect, useRef } from "react";

/**
 * Adds a `.is-visible` class to the element when it scrolls into view.
 * Pair with the `.reveal` utility in styles.css for fade-up animation.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      el?.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/**
 * Observes all `.reveal` descendants of the given root and reveals them
 * as they enter the viewport. Useful for page-level setup.
 */
export function useRevealAll(rootRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef?.current ?? document;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}
