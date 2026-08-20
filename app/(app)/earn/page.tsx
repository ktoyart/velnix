"use client";

import { useState } from "react";
import {
  Wallet,
  Users,
  UserCheck,
  Coins,
  Plus,
  Link as LinkIcon,
  Copy,
  Check,
  Share2,
  QrCode,
  Gift,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Modal } from "../../components/modal";

export default function EarnPage() {
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedCustom, setCopiedCustom] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [customName, setCustomName] = useState("");
  const mainLink = "https://t.me/skobka_robot?start=ref_123456";
  const customLinks: { id: string; name: string; url: string; clicks: number }[] = [];

  const handleCopy = async (text: string, setter: (v: boolean) => void, id?: string) => {
    await navigator.clipboard.writeText(text);
    if (id) {
      setCopiedCustom(id);
      setTimeout(() => setCopiedCustom(null), 1500);
    } else {
      setter(true);
      setTimeout(() => setter(false), 1500);
    }
  };

  return (
    <main className="relative z-10 flex w-full max-w-md flex-1 flex-col gap-6 pb-28 pt-2">
      {/* header */}
      <section className="flex flex-col items-center gap-3 pt-2 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-zinc-900">
          <Gift size={12} /> До 30% с пополнений
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
          Реферальный бонус
        </h1>
        <p className="max-w-[30ch] text-sm leading-5 text-white/80">
          Приглашайте друзей в skobka) и получайте долю от каждого их пополнения — навсегда.
        </p>
      </section>

      {/* earned */}
      <div className="liquid-glass flex flex-col gap-4 rounded-[24px] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-sm">
              <Wallet size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-zinc-500">Заработано всего</span>
              <span className="flex items-baseline gap-1 text-2xl font-extrabold tracking-tight text-zinc-900">
                0 <span className="text-base font-bold text-zinc-400">₽</span>
              </span>
            </div>
          </div>
          <button
            disabled
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white opacity-30 cursor-not-allowed"
          >
            Вывести
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-4 text-amber-900 ring-1 ring-amber-200">
          <TrendingUp size={14} className="shrink-0 text-amber-600" />
          Вывод от 500 ₽. Начислим на тот же способ, каким пополняли.
        </div>
      </div>

      {/* stats */}
      <div className="liquid-glass grid grid-cols-3 divide-x divide-zinc-900/5 rounded-[24px] p-1 shadow-sm">
        {[
          { value: "0", label: "Переходов", icon: Users },
          { value: "0", label: "Оплатили", icon: UserCheck },
          { value: "0", label: "Оплачено", icon: Coins },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1.5 px-2 py-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-900/5">
              <s.icon size={14} />
            </span>
            <span className="text-xl font-extrabold leading-none text-zinc-900">{s.value}</span>
            <span className="text-xs font-medium text-zinc-500">{s.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleCopy(mainLink, setCopiedMain)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[20px] bg-zinc-900 px-6 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition hover:bg-zinc-800 active:scale-[0.99]"
      >
        <Share2 size={18} />
        Пригласить друга
        <ArrowUpRight size={16} className="opacity-60" />
      </button>

      {/* links */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-semibold tracking-tight text-zinc-900">Мои ссылки</h3>
            <p className="text-xs text-zinc-500">Делитесь и отслеживайте стату</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-900/5 transition hover:bg-zinc-50 active:scale-95"
          >
            <Plus size={14} strokeWidth={2.2} /> Создать
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Основная ссылка</h4>
          <div className="liquid-glass flex flex-col gap-3 rounded-[20px] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
                <LinkIcon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900">Основная ссылка</p>
                <p className="truncate font-mono text-xs text-zinc-500">{mainLink}</p>
              </div>
              <span className="hidden items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-700 sm:inline-flex">
                <Sparkles size={10} /> 30%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCopy(mainLink, setCopiedMain)}
                className={[
                  "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition active:scale-[0.98]",
                  copiedMain ? "bg-emerald-500 text-white" : "bg-zinc-900 text-white hover:bg-zinc-800",
                ].join(" ")}
              >
                {copiedMain ? <Check size={14} /> : <Copy size={14} />}
                {copiedMain ? "Скопировано" : "Копировать"}
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-900/10 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                <QrCode size={14} /> QR
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-900/10 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                <Share2 size={14} /> Поделиться
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Кастомные ссылки</h4>
          {customLinks.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-[20px] border-2 border-dashed border-zinc-900/10 bg-white/40 px-6 py-8 text-center backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-900/5">
                <LinkIcon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Кастомных ссылок пока нет</p>
                <p className="mx-auto mt-1 max-w-[28ch] text-xs leading-4 text-zinc-500">
                  Создайте ссылку для канала или чата, чтобы видеть конверсию по каждому источнику.
                </p>
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="mt-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Создать ссылку
              </button>
            </div>
          ) : (
            customLinks.map((l) => (
              <div key={l.id} className="liquid-glass flex items-center gap-3 rounded-2xl p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-900">{l.name}</p>
                  <p className="truncate text-xs text-zinc-500">{l.url}</p>
                </div>
                <button onClick={() => handleCopy(l.url, setCopiedMain, l.id)} className="rounded-full bg-zinc-900 p-2 text-white">
                  {copiedCustom === l.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            ))
          )}
        </div>

        {/* how it works */}
        <div className="rounded-[20px] bg-zinc-900 px-5 py-5 text-white">
          <h4 className="text-sm font-semibold">Как это работает?</h4>
          <ol className="mt-3 flex flex-col gap-2 text-sm leading-5 text-white/70">
            <li className="flex gap-2">
              <span className="font-semibold text-white">1.</span> Друг переходит по вашей ссылке и оплачивает подписку.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-white">2.</span> Вы получаете 30% от каждого его пополнения.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-white">3.</span> Выводите от 500 ₽ в любой момент.
            </li>
          </ol>
        </div>
      </section>

      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Новая ссылка"
        description="Добавьте название, чтобы отличать источники."
      >
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-zinc-500">Название (видно только вам)</span>
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Например, Мой канал"
              className="w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900/20 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
            />
          </label>
          <div className="rounded-xl bg-zinc-900/5 px-3 py-2.5 font-mono text-xs text-zinc-600 break-all">
            {mainLink}&name={encodeURIComponent(customName || "custom")}
          </div>
          <button
            disabled={!customName.trim()}
            onClick={() => setShowCreate(false)}
            className="w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-40"
          >
            Создать
          </button>
        </div>
      </Modal>
    </main>
  );
}
