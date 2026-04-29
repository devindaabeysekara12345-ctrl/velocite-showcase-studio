import { useRef } from "react";
import { useRevealAll } from "@/hooks/useReveal";

/**
 * Wraps a page and observes any `.reveal` descendants for scroll-into-view fades.
 */
export function PageReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealAll(ref);
  return <div ref={ref}>{children}</div>;
}
