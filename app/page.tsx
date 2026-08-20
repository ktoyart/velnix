"use client";

import Link from "next/link";
import { Aldrich, Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Globe,
  Infinity,
  Gauge,
  Lock,
  Check,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

const aldrich = Aldrich({ subsets: ["latin"], weight: ["400"] });
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const reviews = [
  { n: "А", name: "Алексей", text: "Стабильно держит связь, скорость не проседает. Юзаю полгода." },
  { n: "М", name: "Мария", text: "Подключилась за пару минут через бота. Очень удобно!" },
  { n: "Д", name: "Дмитрий", text: "Лучшее соотношение цена/качество, перепробовал много." },
  { n: "Ан", name: "Анна", text: "Телефон и ноут — всё летает, поддержка отвечает мигом." },
  { n: "И", name: "Игорь", text: "Не отваливается, для работы — идеально." },
  { n: "Е", name: "Елена", text: "Разобралась сразу, цена адекватная." },
];

const faqs = [
  { q: "Как подключиться?", a: "Перейдите в бота @skobka_robot или на /auth, оплатите и скопируйте ссылку в приложение. Займёт пару минут." },
  { q: "На каких устройствах работает?", a: "iOS, Android, Windows, macOS, Linux, Apple TV и Android TV — одна подписка до 5 устройств." },
  { q: "Насколько это безопасно?", a: "Современное шифрование, не ведём логи и не храним историю. Трафик защищён." },
  { q: "Как оплатить?", a: "СБП, российские и зарубежные карты, Telegram Stars — через бота или на сайте." },
  { q: "Что делать если не работает?", a: "Напишите в @skobka_support — отвечаем за 5 минут, подскажем." },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  const delayClass = delay === 1 ? "reveal-delay-1" : delay === 2 ? "reveal-delay-2" : delay === 3 ? "reveal-delay-3" : delay === 4 ? "reveal-delay-4" : delay === 5 ? "reveal-delay-5" : "";
  return (
    <div ref={ref} className={`reveal ${delayClass} ${visible ? "reveal-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      {/* header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10 md:py-6">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`${aldrich.className} text-2xl leading-none tracking-tight md:text-3xl ${
                scrolled ? "text-zinc-900" : "text-white"
              }`}
            >
              skobka)
            </span>
          </Link>
          <nav
            className={`hidden items-center gap-10 text-[15px] font-medium md:flex ${
              scrolled ? "text-zinc-600" : "text-white/80"
            }`}
          >
            <a href="#brief" className={`transition-all duration-300 ease-out ${scrolled ? "hover:text-zinc-900" : "hover:text-white"}`}>
              Преимущества
            </a>
            <a href="#reviews" className={`transition-all duration-300 ease-out ${scrolled ? "hover:text-zinc-900" : "hover:text-white"}`}>
              Отзывы
            </a>
            <a href="#steps" className={`transition-all duration-300 ease-out ${scrolled ? "hover:text-zinc-900" : "hover:text-white"}`}>
              Как подключить
            </a>
            <a href="#pricing" className={`transition-all duration-300 ease-out ${scrolled ? "hover:text-zinc-900" : "hover:text-white"}`}>
              Цены
            </a>
            <a href="#faq" className={`transition-all duration-300 ease-out ${scrolled ? "hover:text-zinc-900" : "hover:text-white"}`}>
              FAQ
            </a>
          </nav>
          <Link
            href="/auth"
            className={`inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[15px] font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out md:px-7 md:py-3.5 md:text-base ${
              scrolled
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-white text-zinc-900 hover:bg-zinc-100 animate-soft-pulse"
            }`}
          >
            Начать <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>

      {/* hero — hero.png на весь экран 1920x1080 */}
      <section className="relative flex h-[100dvh] min-h-[100dvh] w-full items-center justify-center overflow-hidden">
        <img src="/hero/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        {/* надпись выше центра — Montserrat Medium 128 / 90, белая, без свечения */}
        <div className="relative z-10 flex -translate-y-40 flex-col items-center px-4 text-center md:-translate-y-52 lg:-translate-y-64">
          <h1 className={`${montserrat.className} text-[56px] font-medium leading-[0.9] tracking-[-0.04em] text-white md:text-[128px] md:leading-[90px]`}>
            <span className="block">доступ</span>
            <span className="block">в свободный</span>
            <span className="block">интернет</span>
          </h1>
        </div>
      </section>

      {/* manifesto */}
      <section className="section-y mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className={`${montserrat.className} text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400`}>
              Без лишнего
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className={`${montserrat.className} mt-6 text-[clamp(36px,6vw,80px)] font-medium leading-[0.95] tracking-[-0.04em] text-zinc-900`}
            >
              Надёжный доступ.
              <br />
              <span className="text-zinc-300">Как будто без VPN.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-8 max-w-[56ch] text-lg leading-relaxed text-zinc-500 md:text-xl">
              Никаких приложений и переключателей. Российские сервисы — без пауз, скорость — без потерь, логи — не ведём.
            </p>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              { k: "≤ 30 сек", v: "Подключение", d: "Через бота в Telegram" },
              { k: "5", v: "Устройств", d: "На одной подписке" },
              { k: "0 ₽", v: "Первые 2 дня", d: "Затем 10 ₽ / день" },
            ].map((s) => (
              <div
                key={s.k}
                className="liquid-glass liquid-glass-hover group rounded-[32px] p-8 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)]"
              >
                <p className={`${montserrat.className} text-[clamp(48px,6vw,80px)] font-medium leading-none tracking-tight text-zinc-900`}>
                  {s.k}
                </p>
                <p className="mt-4 text-base font-semibold text-zinc-900">{s.v}</p>
                <p className="text-sm text-zinc-500">{s.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* bento brief */}
      <section id="brief" className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-36">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-2">
          <Reveal className="md:col-span-7 md:row-span-2">
            <div className="liquid-glass liquid-glass-hover group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[36px] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] md:p-10">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <MessageCircle size={20} />
                </span>
                <h3 className={`${montserrat.className} mt-8 text-3xl font-medium leading-none tracking-tight md:text-4xl`}>
                  Прямо в Telegram
                </h3>
                <p className="mt-4 max-w-[36ch] text-base leading-7 text-zinc-500">
                  Бот, три тапа, готово. Никаких отдельных приложений и регистраций.
                </p>
              </div>
              <img
                src="/jiopa/nout.png"
                alt=""
                className="mt-6 h-56 w-full object-contain transition-transform duration-500 group-hover:scale-105 md:h-72"
              />
            </div>
          </Reveal>

          <div className="grid gap-5 md:col-span-5 md:row-span-2 md:grid-rows-2">
            <Reveal delay={1} className="h-full">
              <div className="liquid-glass liquid-glass-hover group flex h-full flex-col justify-between rounded-[36px] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)]">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Globe size={20} />
                  </span>
                  <h3 className={`${montserrat.className} mt-6 text-2xl font-medium`}>Без пауз</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-500">
                    Российские сервисы работают без выключения. Ничего не переключаешь.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2} className="h-full">
              <div className="liquid-glass liquid-glass-hover group flex h-full flex-col justify-between rounded-[36px] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)]">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Infinity size={20} />
                  </span>
                  <h3 className={`${montserrat.className} mt-6 text-2xl font-medium`}>Безлимит</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-500">Платишь за устройство, а не за гигабайты.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="md:col-span-5">
            <div className="liquid-glass liquid-glass-hover group flex h-full min-h-[320px] flex-col justify-between rounded-[36px] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] md:p-10">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Gauge size={20} />
                </span>
                <h3 className={`${montserrat.className} mt-6 text-2xl font-medium`}>Скорость без потерь</h3>
                <p className="mt-3 text-base leading-7 text-zinc-500">Оптимизированные ноды под минимальную задержку.</p>
              </div>
              <div className="mt-8 flex items-baseline gap-3">
                <span className={`${montserrat.className} text-5xl font-medium tracking-tight`}>~12ms</span>
                <span className="text-base text-zinc-400">пинг</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1} className="md:col-span-7">
            <div className="liquid-glass liquid-glass-hover group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[36px] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] md:p-10">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Lock size={20} />
                </span>
                <h3 className={`${montserrat.className} mt-6 text-3xl font-medium md:text-4xl`}>Конфиденциально</h3>
                <p className="mt-4 max-w-[40ch] text-base leading-7 text-zinc-500">
                  Современное шифрование, не храним логи и историю.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5">No logs</span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-zinc-900/10 transition-transform duration-300 group-hover:-translate-y-0.5">AES-256</span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-zinc-900/10 transition-transform duration-300 group-hover:-translate-y-0.5">WireGuard</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* reviews */}
      <section id="reviews" className="section-y overflow-hidden bg-zinc-50/50">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <Reveal>
              <h3 className={`${montserrat.className} text-[clamp(32px,5vw,64px)] font-medium leading-[0.95] tracking-tight`}>
                Нас выбирают
              </h3>
            </Reveal>
            <Reveal delay={1}>
              <a
                href="https://t.me/skobka_support"
                target="_blank"
                className="text-sm font-medium text-zinc-500 transition-all duration-300 ease-out hover:text-zinc-900 md:text-base"
              >
                12k+ пользователей →
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={2} className="mt-10">
          <div className="fade-x overflow-hidden">
            <div className="flex animate-marquee gap-5 py-2">
              {[...reviews, ...reviews].map((r, idx) => (
                <div
                  key={idx}
                  className="flex min-w-[340px] flex-col justify-between gap-6 rounded-[28px] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] ring-1 ring-zinc-900/[0.04] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                >
                  <p className="text-base leading-7 text-zinc-700">“{r.text}”</p>
                  <span className="flex items-center gap-3 text-sm font-semibold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[11px] text-white">
                      {r.n}
                    </span>
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* steps */}
      <section id="steps" className="section-y mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="liquid-glass rounded-[40px] p-8 md:p-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h3 className={`${montserrat.className} text-[clamp(32px,5vw,56px)] font-medium leading-[0.95]`}>
                Как подключить
                <br />
                за минуту
              </h3>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-base text-zinc-500">Без лишних шагов</p>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="relative mt-12 grid gap-8 md:grid-cols-4">
              {/* desktop horizontal connector */}
              <div className="pointer-events-none absolute left-[1.125rem] right-[1.125rem] top-[1.125rem] hidden h-[2px] bg-zinc-900/10 md:block" />
              {/* mobile vertical connector */}
              <div className="pointer-events-none absolute left-[1.125rem] top-[1.125rem] block w-[2px] bg-zinc-900/10 md:hidden" style={{ bottom: "1.125rem" }} />

              {[
                { n: "01", t: "Открой бота", d: "@skobka_robot → Старт" },
                { n: "02", t: "Пополни", d: "СБП / карта / Stars" },
                { n: "03", t: "Выбери устройство", d: "iOS / Android / ПК" },
                { n: "04", t: "Вставь ссылку", d: "Один тап и готово" },
              ].map((s) => (
                <div key={s.n} className="relative pl-12 md:pl-0">
                  <span
                    className={`${montserrat.className} absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-sm font-medium tracking-widest text-zinc-400 backdrop-blur-sm md:static md:mb-4`}
                  >
                    {s.n}
                  </span>
                  <p className="text-xl font-semibold md:mt-0">{s.t}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white transition hover:bg-zinc-800"
              >
                Открыть кабинет <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold ring-1 ring-zinc-900/10 transition-all duration-300 ease-out hover:bg-zinc-50"
              >
                Перейти в бота
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* pricing */}
      <section id="pricing" className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-5 md:grid-cols-12">
          <Reveal className="h-full md:col-span-7">
            <div className="flex h-full min-h-full flex-col justify-between rounded-[40px] bg-zinc-900 p-8 text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(0,0,0,0.25)] md:p-14">
              <div>
                <p className="text-sm font-medium text-white/50">Тариф</p>
                <h3 className={`${montserrat.className} mt-4 text-[clamp(48px,7vw,96px)] font-medium leading-[0.9]`}>
                  10 ₽
                  <span className="text-[clamp(24px,3vw,40px)] font-medium text-white/40"> / день</span>
                </h3>
                <p className="mt-6 max-w-[48ch] text-base leading-7 text-white/60">
                  За устройство. Без автопродления — пополняешь когда нужно. Первые 2 дня — 0 ₽.
                </p>
                <ul className="mt-8 grid grid-cols-2 gap-4 text-base">
                  {["Безлимит", "5 устройств", "Все платформы", "Поддержка 24/7"].map((x) => (
                    <li key={x} className="flex items-center gap-3 text-white/90">
                      <Check size={18} className="text-emerald-400" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/auth"
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-zinc-900 transition-all duration-300 ease-out hover:bg-zinc-100"
              >
                Активировать за 10 ₽
              </Link>
            </div>
          </Reveal>

          <Reveal delay={1} className="h-full md:col-span-5">
            <div className="liquid-glass liquid-glass-hover flex h-full min-h-full flex-col justify-between rounded-[40px] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] md:p-10">
              <div>
                <span className="inline-flex rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white">
                  Пробный период
                </span>
                <p className={`${montserrat.className} mt-8 text-4xl font-medium md:text-5xl`}>2 дня — 0 ₽</p>
                <p className="mt-4 text-base leading-7 text-zinc-500">Попробуй без карты. Потом — по дням.</p>
              </div>
              <div className="mt-8 rounded-3xl bg-zinc-50 p-6">
                <div className="flex items-center justify-between text-base">
                  <span className="text-zinc-500">День 1-2</span>
                  <span className="font-semibold text-emerald-600">0 ₽</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-base">
                  <span className="text-zinc-500">Далее</span>
                  <span className="font-semibold">10 ₽ / день</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-12 md:px-10">
        <Reveal>
          <h3 className={`${montserrat.className} text-center text-[clamp(32px,5vw,48px)] font-medium leading-[0.95]`}>
            Частые вопросы
          </h3>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10 flex flex-col gap-4">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className={`overflow-hidden rounded-[24px] bg-zinc-50 ring-1 ring-zinc-900/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${
                    open ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left md:px-8"
                  >
                    <span className="text-base font-semibold md:text-lg">{f.q}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-base leading-7 text-zinc-600 md:px-8">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* footer */}
      <footer className="border-t border-zinc-900/5">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 py-16 md:flex-row md:items-start md:justify-between md:px-10">
          <div>
            <span className={`${aldrich.className} text-2xl`}>skobka)</span>
            <p className="mt-4 max-w-[34ch] text-base leading-7 text-zinc-500">
              Быстрый доступ без лишнего. Поддержка @skobka_support — отвечаем за 5 минут.
            </p>
          </div>
          <div className="flex gap-16 text-base">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Навигация</span>
              <a href="#brief" className="text-zinc-600 transition-all duration-300 ease-out hover:text-zinc-900">
                Преимущества
              </a>
              <a href="#steps" className="text-zinc-600 transition-all duration-300 ease-out hover:text-zinc-900">
                Как подключить
              </a>
              <a href="#pricing" className="text-zinc-600 transition-all duration-300 ease-out hover:text-zinc-900">
                Цены
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Кабинет</span>
              <Link href="/auth" className="text-zinc-600 transition-all duration-300 ease-out hover:text-zinc-900">
                Войти
              </Link>
              <Link href="/auth" className="text-zinc-600 transition-all duration-300 ease-out hover:text-zinc-900">
                Telegram-бот
              </Link>
              <a href="https://t.me/skobka_support" target="_blank" className="text-zinc-600 transition-all duration-300 ease-out hover:text-zinc-900">
                Поддержка
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 pb-10 text-sm text-zinc-400 md:flex-row md:justify-between md:px-10">
          <span>© 2026 skobka)</span>
          <span className="flex gap-6">
            <a href="#" className="transition-all duration-300 ease-out hover:text-zinc-600">
              Конфиденциальность
            </a>
            <a href="#" className="transition-all duration-300 ease-out hover:text-zinc-600">
              Соглашение
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
