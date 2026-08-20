import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { Aldrich } from "next/font/google";
import { BottomDock } from "../components/bottom-dock";
import { Sidebar } from "../components/sidebar";
import { RouteTransition } from "../components/route-transition";

const aldrich = Aldrich({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full w-full flex-1 flex-col items-center">
      {/* отступ под шапку Telegram Mini App (кнопка закрыть + системный статус-бар) */}
      <div
        className="w-full shrink-0 md:hidden"
        style={{
          height:
            "calc(env(safe-area-inset-top, 0px) + var(--tg-safe-area-inset-top, 0px) + var(--tg-content-safe-area-inset-top, 0px) + 64px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: "url('/back.png')",
          maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
        }}
      />

      <header
        className="fixed left-4 right-4 z-10 flex items-center justify-between md:hidden"
        style={{
          top: "calc(env(safe-area-inset-top, 0px) + var(--tg-safe-area-inset-top, 0px) + var(--tg-content-safe-area-inset-top, 0px) + 24px)",
        }}
      >
        <span className={`${aldrich.className} text-3xl leading-none text-white`}>
          skobka)
        </span>
        <Link
          href="/support"
          className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-zinc-700 transition hover:bg-black/5"
          aria-label="Поддержка"
        >
          <HelpCircle size={30} />
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row">
        <Sidebar />

        <div className="flex flex-1 flex-col items-center px-6 py-12 md:px-12">
          <RouteTransition>{children}</RouteTransition>
        </div>
      </div>

      <div className="md:hidden">
        <BottomDock />
      </div>
    </div>
  );
}
