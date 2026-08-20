"use client";

import { useState } from "react";
import {
  Receipt,
  Info,
  MessageSquareQuote,
  HelpCircle,
  ChevronRight,
  Mail,
  AtSign,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Copy,
  Check,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { Modal } from "../../components/modal";

export default function ProfilePage() {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText("@ktoyart");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const Row = ({
    icon: Icon,
    title,
    subtitle,
    onClick,
    href,
  }: {
    icon: React.ElementType;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    href?: string;
  }) => {
    const content = (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-900/5">
          <Icon size={16} />
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-zinc-900">{title}</span>
          {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
        </div>
      </div>
    );
    const cls =
      "liquid-glass liquid-glass-hover flex w-full items-center justify-between rounded-[20px] p-4 text-left transition active:scale-[0.99]";
    if (href) {
      return (
        <Link href={href} className={cls}>
          {content} <ChevronRight size={16} className="text-zinc-400" />
        </Link>
      );
    }
    return (
      <button onClick={onClick} className={cls}>
        {content} <ChevronRight size={16} className="text-zinc-400" />
      </button>
    );
  };

  return (
    <main className="relative z-10 flex w-full max-w-md flex-1 flex-col gap-6 pb-28 pt-2">
      {/* avatar */}
      <section className="flex flex-col items-center gap-3 pt-2">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-[24px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-3xl font-extrabold text-white shadow-[0_12px_32px_rgba(120,40,200,0.25)]">
            K
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-600 shadow-md ring-1 ring-zinc-900/5">
            <ShieldCheck size={14} />
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]">@ktoyart</h1>
          <p className="text-sm text-white/70">ID 482391 · с нами с августа 2026</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-900/5"
          >
            {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />} {copied ? "Скопировано" : "Копировать ID"}
          </button>
          <Link href="/support" className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white">
            <Settings2 size={12} /> Настройки
          </Link>
        </div>
      </section>

      {/* telegram */}
      <section className="liquid-glass flex items-center justify-between rounded-[20px] p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
            <AtSign size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Telegram</p>
            <p className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
              @ktoyart <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700">подключён</span>
            </p>
          </div>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" aria-hidden />
      </section>

      {/* email */}
      <section className="liquid-glass flex flex-col gap-3 rounded-[20px] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Email</p>
            <p className="mt-1 max-w-[28ch] text-sm leading-5 text-zinc-600">
              Для входа через <span className="font-semibold text-zinc-900">web-версию</span>, если нет доступа к Telegram.
            </p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Mail size={16} />
          </span>
        </div>
        <button
          onClick={() => setShowEmail(true)}
          className="self-start rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 active:scale-95 transition"
        >
          Привязать email
        </button>
      </section>

      {/* balance quick */}
      <section className="rounded-[20px] bg-zinc-900 px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/70">Баланс</p>
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white">
            Пополнить <ExternalLink size={12} />
          </Link>
        </div>
        <p className="mt-1 text-2xl font-extrabold tracking-tight">812 ₽</p>
        <p className="text-xs text-white/60">Тариф 10 ₽ / день · до 5 устройств</p>
      </section>

      {/* sections */}
      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">Информация</h2>
        <Row icon={Receipt} title="История транзакций" subtitle="Пополнения и списания" href="/" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">О нас</h2>
        <div className="flex flex-col gap-2">
          <Row icon={Info} title="О сервисе" subtitle="Как работает skobka VPN" onClick={() => {}} />
          <Row icon={MessageSquareQuote} title="Отзывы" subtitle="4.9 · 1.2k оценок" onClick={() => {}} />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">Помощь</h2>
        <Row icon={HelpCircle} title="Служба поддержки" subtitle="Отвечаем за 5 минут" href="/support" />
        <button className="flex items-center justify-center gap-2 rounded-[20px] border border-zinc-900/10 bg-white px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50">
          <LogOut size={16} /> Выйти
        </button>
        <p className="text-center text-xs text-zinc-400">skobka) VPN · v1.0 · support@skobka.io</p>
      </section>

      <Modal isOpen={showEmail} onClose={() => setShowEmail(false)} title="Привязать email" description="На почту придёт код подтверждения.">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-zinc-500">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900/20 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
            />
          </label>
          <button
            disabled={!email.includes("@")}
            className="w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-40"
          >
            Отправить код
          </button>
          <p className="text-center text-xs text-zinc-500">Мы не спамим и не передаём почту третьим лицам.</p>
        </div>
      </Modal>
    </main>
  );
}
