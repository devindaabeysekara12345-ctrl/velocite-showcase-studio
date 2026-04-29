import { useEffect, useRef } from "react";

/**
 * Wraps a page and adds smooth scroll-fade reveals to:
 *  - any element with className `.reveal`
 *  - every direct <section> descendant (auto-tagged)
 *
 * Runs idempotently and respects prefers-reduced-motion via CSS.
 */
export function PageReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = new Set<HTMLElement>();
    root.querySelectorAll<HTMLElement>("section").forEach((el) => {
      // Skip the first hero section so it appears immediately
      if (el.dataset.revealApplied === "true") return;
      el.classList.add("reveal");
      el.dataset.revealApplied = "true";
      targets.add(el);
    });
    root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => targets.add(el));

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Reveal anything already above the fold immediately (no flash)
    const vh = window.innerHeight;
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9) el.classList.add("is-visible");
    });

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
    targets.forEach((el) => {
      if (!el.classList.contains("is-visible")) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
