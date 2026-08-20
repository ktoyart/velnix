"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Coins, User, HelpCircle, ShieldCheck } from "lucide-react";
import { Aldrich } from "next/font/google";

const aldrich = Aldrich({ subsets: ["latin"], weight: ["400"] });

const items = [
  { href: "/dashboard", label: "Главная", icon: Home },
  { href: "/earn", label: "Заработок", icon: Coins },
  { href: "/profile", label: "Профиль", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const isSupport = pathname === "/support";

  return (
    <aside className="hidden md:flex w-[248px] shrink-0 flex-col py-6 pl-6">
      <div className="liquid-glass flex flex-1 flex-col rounded-[28px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        <div className="mb-8 px-2">
          <span className={`${aldrich.className} text-[30px] leading-none tracking-tight text-zinc-900`}>skobka)</span>
          <p className="mt-1 text-xs font-medium tracking-wide text-zinc-500">VPN · 10 ₽ / день</p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  active
                    ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-900/[0.04]"
                    : "text-zinc-600 hover:bg-white/60 hover:text-zinc-900",
                ].join(" ")}
              >
                <Icon size={18} strokeWidth={active ? 2 : 1.8} className={active ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-700"} />
                <span>{label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl bg-zinc-900 px-4 py-4 text-white">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
            <ShieldCheck size={14} className="text-emerald-300" /> Баланс 812 ₽
          </p>
          <p className="mt-1 text-xs leading-4 text-white/60">До конца подписки 16 дней, пополните заранее.</p>
          <Link href="/dashboard" className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-white px-3 py-2 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-50">
            Пополнить
          </Link>
        </div>

        <div className="mt-auto border-t border-zinc-900/5 pt-4">
          <Link
            href="/support"
            className={[
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
              isSupport ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-900/[0.04]" : "text-zinc-600 hover:bg-white/60 hover:text-zinc-900",
            ].join(" ")}
          >
            <HelpCircle size={18} className={isSupport ? "text-zinc-900" : "text-zinc-500"} />
            Поддержка
          </Link>
          <p className="px-4 pt-3 text-[11px] leading-4 text-zinc-400">v1.0 · skobka VPN</p>
        </div>
      </div>
    </aside>
  );
}
