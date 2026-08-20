"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { NavigationProvider } from "./navigation-context";

const TRANSITION_DURATION = 220;

function isInternalReferrer(referrer: string): boolean {
  if (typeof window === "undefined") return false;
  return referrer.startsWith(window.location.origin);
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // enter
    setLeaving(false);
  }, [pathname]);

  const performTransition = useCallback((action: () => void) => {
    setLeaving(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => action(), TRANSITION_DURATION);
  }, []);

  const navigate = useCallback((href: string) => performTransition(() => router.push(href)), [performTransition, router]);

  const goBack = useCallback(
    (fallback = "/") => {
      const referrer = typeof document !== "undefined" ? document.referrer : "";
      if (referrer && isInternalReferrer(referrer)) {
        const target = new URL(referrer).pathname;
        performTransition(() => router.push(target));
        return;
      }
      performTransition(() => {
        if (typeof window !== "undefined" && window.history.length > 1) window.history.back();
        else router.push(fallback);
      });
    },
    [performTransition, router]
  );

  const intercept = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || anchor.target === "_blank") return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      const targetPath = href.split("?")[0].split("#")[0];
      const currentPath = pathname.split("?")[0].split("#")[0];
      if (targetPath === currentPath) return;
      event.preventDefault();
      navigate(href);
    },
    [navigate, pathname]
  );

  useEffect(() => {
    document.addEventListener("click", intercept, true);
    return () => {
      document.removeEventListener("click", intercept, true);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [intercept]);

  return (
    <NavigationProvider value={{ navigate, goBack }}>
      <div
        className={`w-full transition-all ease-out${leaving ? " will-change-transform" : ""}`}
        style={{
          transitionDuration: `${TRANSITION_DURATION}ms`,
          opacity: leaving ? 0 : 1,
          transform: leaving ? "translateY(6px) scale(0.99)" : "none",
          filter: leaving ? "blur(2px)" : "blur(0)",
        }}
      >
        {children}
      </div>
    </NavigationProvider>
  );
}
