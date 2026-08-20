"use client";

import { useState } from "react";
import {
  MessageCircle,
  Mail,
  Send,
  ChevronDown,
  HelpCircle,
  Clock,
  ShieldCheck,
  Zap,
  Smartphone,
} from "lucide-react";

const faqs = [
  { q: "Как подключиться после оплаты?", a: "Откройте модалку «Установить», выберите платформу, установите приложение и войдите по коду skobka-8X2P-Q9LM. Конфиг подтянется автоматически." },
  { q: "Сколько устройств можно подключить?", a: "До 5 устройств одновременно на одном тарифе — телефоны, планшеты, ноутбуки. Отвязать можно в любой момент." },
  { q: "Что делать если не работает?", a: "Проверьте баланс (10 ₽ / день), перезапустите VPN и попробуйте другой сервер. Если не помогло — напишите в поддержку, отвечаем за ~5 минут." },
  { q: "Как работает рефералка?", a: "Делитесь ссылкой с /earn — получаете 30% с каждого пополнения друга. Вывод от 500 ₽." },
  { q: "Безопасно ли?", a: "Трафик шифруется, логи не храним. Оплата через СБП/карты, данные карт не сохраняем." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [message, setMessage] = useState("");

  return (
    <main className="relative z-10 flex w-full max-w-md flex-1 flex-col gap-6 pb-28 pt-2">
      <section className="flex flex-col items-center gap-3 pt-2 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-md">
          <HelpCircle size={22} />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]">Поддержка</h1>
        <p className="max-w-[32ch] text-sm leading-5 text-white/80">Отвечаем быстро — в среднем за 5 минут. Выберите удобный способ.</p>
      </section>

      {/* contacts */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="https://t.me/skobka_support"
          target="_blank"
          className="liquid-glass liquid-glass-hover flex flex-col gap-3 rounded-[20px] p-4 transition active:scale-[0.99]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
            <Send size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Telegram</p>
            <p className="text-xs text-zinc-500">@skobka_support</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-600">
            Написать <MessageCircle size={12} />
          </span>
        </a>
        <a
          href="mailto:support@skobka.io"
          className="liquid-glass liquid-glass-hover flex flex-col gap-3 rounded-[20px] p-4 transition active:scale-[0.99]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white">
            <Mail size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Email</p>
            <p className="text-xs text-zinc-500">support@skobka.io</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700">Написать</span>
        </a>
      </div>

      {/* status */}
      <div className="flex items-center justify-between rounded-[20px] bg-emerald-500 px-4 py-3 text-white shadow-sm">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Мы онлайн
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-white/80">
          <Clock size={12} /> ~5 мин
        </span>
      </div>

      {/* quick actions */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Zap, label: "Не подключается" },
          { icon: Smartphone, label: "Устройства" },
          { icon: ShieldCheck, label: "Оплата" },
        ].map((a) => (
          <button key={a.label} className="liquid-glass flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center hover:bg-white/80 transition">
            <a.icon size={18} className="text-zinc-700" />
            <span className="text-xs font-medium text-zinc-700">{a.label}</span>
          </button>
        ))}
      </div>

      {/* form */}
      <section className="liquid-glass flex flex-col gap-3 rounded-[24px] p-5">
        <h2 className="text-sm font-semibold text-zinc-900">Написать прямо здесь</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Опишите проблему — чем подробнее, тем быстрее поможем"
          rows={4}
          className="min-h-[96px] w-full resize-none rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900/20 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
        />
        <div className="flex gap-2">
          <button
            disabled={!message.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-40 active:scale-[0.99] transition"
          >
            <Send size={14} /> Отправить
          </button>
          <span className="hidden items-center text-xs text-zinc-500 sm:flex">Отвечаем в Telegram</span>
        </div>
      </section>

      {/* faq */}
      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">Частые вопросы</h2>
        <div className="flex flex-col gap-2">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="liquid-glass overflow-hidden rounded-[20px]">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <span className="text-sm font-medium text-zinc-900">{f.q}</span>
                  <span className={["flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-900/5 transition", open ? "rotate-180" : ""].join(" ")}>
                    <ChevronDown size={14} />
                  </span>
                </button>
                {open && <p className="px-4 pb-4 text-sm leading-5 text-zinc-600">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-center text-xs text-white/60">Работаем ежедневно 09:00–23:00 МСК · Обычно отвечаем быстрее</p>
    </main>
  );
}
