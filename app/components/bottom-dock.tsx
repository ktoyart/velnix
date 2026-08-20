"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Coins, User } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const items = [
  { href: "/dashboard", label: "Главная", icon: Home },
  { href: "/earn", label: "Заработок", icon: Coins },
  { href: "/profile", label: "Профиль", icon: User },
];

export function BottomDock() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, ready: false });

  const activeItem = items.find((item) => item.href === pathname);

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeEl = activeItem ? itemRefs.current.get(activeItem.href) : undefined;
    if (container && activeEl) {
      const c = container.getBoundingClientRect();
      const a = activeEl.getBoundingClientRect();
      setIndicator({
        left: a.left - c.left,
        top: a.top - c.top,
        width: a.width,
        height: a.height,
        ready: true,
      });
    }
  }, [activeItem]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const ro = new ResizeObserver(updateIndicator);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updateIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
      <div
        ref={containerRef}
        className="pointer-events-auto liquid-glass flex w-full max-w-[420px] items-center justify-evenly gap-1 rounded-full p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.9)_inset]"
      >
        {activeItem && indicator.ready && (
          <div
            className="absolute rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ left: indicator.left, top: indicator.top, width: indicator.width, height: indicator.height }}
          />
        )}

        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              ref={(el) => {
                if (el) itemRefs.current.set(href, el);
                else itemRefs.current.delete(href);
              }}
              aria-current={active ? "page" : undefined}
              className={[
                "relative z-10 flex flex-1 flex-col items-center justify-center gap-1 rounded-full px-3 py-2.5 text-[11px] font-semibold leading-none transition-colors",
                active ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700",
              ].join(" ")}
            >
              <Icon size={20} strokeWidth={active ? 2.1 : 1.8} className="shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
