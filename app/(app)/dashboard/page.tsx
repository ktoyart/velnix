"use client";

import { useState } from "react";
import {
  Wallet,
  Coins,
  Smartphone,
  Clock,
  Laptop,
  ChevronRight,
  Plus,
  Apple,
  MonitorSmartphone,
  History,
  CreditCard,
  QrCode,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Gift,
  ArrowUpRight,
  Trash2,
  ExternalLink,
  Zap,
  Shuffle,
  BookOpen,
  Share2,
  Link2,
} from "lucide-react";
import { Modal } from "../../components/modal";

const devices = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    location: "Москва",
    ip: "10.8.0.2",
    status: "Подключено",
    subLink: "https://rkn.skobka.online/api/sub/jBtJTzpGu7a9c3XqYvL0",
  },
  {
    id: 2,
    name: "MacBook Air",
    location: "Москва",
    ip: "10.8.0.3",
    status: "Подключено",
    subLink: "https://rkn.skobka.online/api/sub/kLp9Qw2xR4tY8zAbC1dE",
  },
];

const historyItems = [
  {
    id: 1,
    type: "Пополнение",
    amount: "+500 ₽",
    date: "19 авг 2026, 14:32",
    status: "success" as const,
    icon: ArrowUpRight,
  },
  {
    id: 2,
    type: "Списание за тариф",
    amount: "−10 ₽",
    date: "19 авг 2026, 00:00",
    status: "neutral" as const,
    icon: Coins,
  },
  {
    id: 3,
    type: "Пополнение",
    amount: "+300 ₽",
    date: "12 авг 2026, 09:15",
    status: "success" as const,
    icon: ArrowUpRight,
  },
  {
    id: 4,
    type: "Списание за тариф",
    amount: "−10 ₽",
    date: "18 авг 2026, 00:00",
    status: "neutral" as const,
    icon: Coins,
  },
];

type ModalType = "deposit" | "install" | "history" | "add" | "device" | null;

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedDevice, setSelectedDevice] = useState<(typeof devices)[number] | null>(null);
  const open = (modal: ModalType) => setActiveModal(modal);
  const openDevice = (d: (typeof devices)[number]) => {
    setSelectedDevice(d);
    setActiveModal("device");
  };
  const close = () => setActiveModal(null);

  // deposit
  const [selectedAmount, setSelectedAmount] = useState<number>(300);
  const [customAmount, setCustomAmount] = useState("");
  const quickAmounts = [100, 300, 500, 1000];
  const effectiveAmount = customAmount ? Number(customAmount) || 0 : selectedAmount;
  const days = Math.floor(effectiveAmount / 10);
  const bonus = effectiveAmount >= 500 ? 7 : 0;

  // install
  const [installTab, setInstallTab] = useState<"apple" | "other">("apple");

  // add device
  const [copied, setCopied] = useState(false);
  const [deviceLinkCopied, setDeviceLinkCopied] = useState(false);
  const inviteCode = "skobka-8X2P-Q9LM";
  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const handleDeviceCopy = async (link: string) => {
    await navigator.clipboard.writeText(link);
    setDeviceLinkCopied(true);
    setTimeout(() => setDeviceLinkCopied(false), 1500);
  };
  const handleDeviceShare = async (link: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "skobka VPN", text: "Ссылка для настройки VPN", url: link });
      } catch {}
    } else {
      handleDeviceCopy(link);
    }
  };

  return (
    <main className="relative z-10 flex w-full max-w-md flex-1 flex-col gap-6 pb-28 pt-2">
      {/* Balance */}
      <section className="flex flex-col items-center gap-3 pt-2">
        <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm">
          <Wallet size={16} />
          Ваш баланс
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-[64px] font-extrabold leading-none tracking-[-0.04em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.18)]">
            812
          </h1>
          <span className="text-3xl font-bold text-white/90">₽</span>
        </div>
        <p className="text-xs font-medium text-white/70">Хватит на 81 день · пополните, когда удобно</p>
      </section>

      {/* Info pills */}
      <section className="flex flex-wrap justify-center gap-2.5">
        <div className="liquid-glass flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-700 shadow-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <Coins size={13} />
          </span>
          Тариф 10 ₽ / день
        </div>
        <div className="liquid-glass flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-700 shadow-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white">
            <Smartphone size={13} />
          </span>
          Устройств: 2 / 5
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-red-500 px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(239,68,68,0.35)]">
          <Clock size={14} className="text-white" />
          Истекла: 16д 7ч назад
        </div>
      </section>

      {/* Action buttons */}
      <section className="grid grid-cols-3 gap-3">
        <button
          onClick={() => open("deposit")}
          className="group flex flex-col items-center gap-2 text-left"
        >
          <div className="liquid-glass liquid-glass-rose flex h-16 w-full items-end justify-center rounded-2xl transition-all duration-300 ease-out group-hover:opacity-90 group-active:scale-[0.98]">
            <img src="/jiopa/koj.png" alt="Пополнить" className="h-20 w-auto object-contain" />
          </div>
          <span className="text-sm font-medium text-zinc-900">Пополнить</span>
        </button>
        <button
          onClick={() => open("install")}
          className="group flex flex-col items-center gap-2 text-left"
        >
          <div className="liquid-glass liquid-glass-sky flex h-16 w-full items-end justify-center rounded-2xl transition-all duration-300 ease-out group-hover:opacity-90 group-active:scale-[0.98]">
            <img src="/jiopa/nout.png" alt="Установить" className="h-20 w-auto object-contain" />
          </div>
          <span className="text-sm font-medium text-zinc-900">Установить</span>
        </button>
        <button
          onClick={() => open("history")}
          className="group flex flex-col items-center gap-2 text-left"
        >
          <div className="liquid-glass liquid-glass-emerald flex h-16 w-full items-end justify-center rounded-2xl transition-all duration-300 ease-out group-hover:opacity-90 group-active:scale-[0.98]">
            <img src="/jiopa/his.png" alt="История" className="h-20 w-auto object-contain" />
          </div>
          <span className="text-sm font-medium text-zinc-900">История</span>
        </button>
      </section>

      {/* Devices */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-semibold tracking-tight text-zinc-900">Устройства</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {devices.length} онлайн
            </span>
          </div>
          <button
            onClick={() => open("add")}
            className="liquid-glass inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-zinc-700 shadow-sm transition-all duration-300 ease-out hover:bg-white active:scale-95"
          >
            <Plus size={14} strokeWidth={2.2} />
            Добавить
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => openDevice(device)}
              className="liquid-glass liquid-glass-hover group text-left flex flex-col justify-between rounded-[20px] p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] active:scale-[0.98]"
            >
              <div className="flex flex-1 flex-col items-center justify-center gap-3 py-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 transition-all duration-300 ease-out group-hover:shadow-md">
                  {device.name.toLowerCase().includes("iphone") ? (
                    <Smartphone size={26} className="text-zinc-700" />
                  ) : (
                    <Laptop size={26} className="text-zinc-700" />
                  )}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {device.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  {device.name.toLowerCase().includes("iphone") ? (
                    <svg className="h-3.5 w-3.5 text-zinc-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-.06.04-1.95 1.13-1.93 3.38.02 2.69 2.35 3.59 2.38 3.6-.03.1-.37 1.27-1.1 2.52-.66 1.11-1.35 2.22-2.4 2.24-.53.01-.9-.15-1.28-.31-.73-.31-1.39-.53-2.72-.55zM12.03 7.25c-.15-2.55 2.11-4.25 3.74-4.25.18 2.68-2.36 4.46-3.74 4.25z" />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5 text-zinc-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                  )}
                  <span className="text-[13px] font-semibold text-zinc-900">{device.name}</span>
                </div>
                <p className="text-xs text-zinc-500">
                  {device.location} · {device.ip}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-zinc-400">Подробнее</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-900/5 transition-all duration-300 ease-out group-hover:bg-zinc-900 group-hover:text-white">
                    <ChevronRight size={12} strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </button>
          ))}
          <button
            onClick={() => open("add")}
            className="flex flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed border-zinc-900/10 bg-white/40 p-6 text-center backdrop-blur transition-all duration-300 ease-out hover:border-zinc-900/20 hover:bg-white/60 hover:-translate-y-0.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white">
              <Plus size={18} />
            </span>
            <span className="text-sm font-semibold text-zinc-900">Добавить устройство</span>
            <span className="text-xs text-zinc-500">До 5 одновременно</span>
          </button>
        </div>
      </section>

      {/* DEPOSIT */}
      <Modal
        isOpen={activeModal === "deposit"}
        onClose={close}
        title="Пополнить баланс"
        description="Деньги зачисляются мгновенно. Тариф 10 ₽ / день."
      >
        <div className="flex flex-col gap-5">
          {/* quick amounts */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {quickAmounts.map((amount) => {
              const active = !customAmount && selectedAmount === amount;
              return (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={[
                    "relative flex flex-col items-center justify-center rounded-2xl border px-3 py-3.5 text-center transition active:scale-[0.98]",
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                      : "liquid-glass border-transparent text-zinc-900 hover:bg-white/60",
                  ].join(" ")}
                >
                  <span className="text-[15px] font-semibold leading-none">{amount} ₽</span>
                  <span
                    className={[
                      "mt-1 text-[11px] font-medium",
                      active ? "text-white/70" : "text-zinc-500",
                    ].join(" ")}
                  >
                    {Math.floor(amount / 10)} дней
                  </span>
                </button>
              );
            })}
          </div>

          {/* custom */}
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-zinc-500">Другая сумма</span>
            <div className="relative">
              <input
                inputMode="numeric"
                placeholder="Например, 750"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value.replace(/[^\d]/g, ""))}
                className="w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 pr-12 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none backdrop-blur focus:border-zinc-900/20 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white">
                ₽
              </span>
            </div>
          </label>

          {/* summary */}
          <div className="rounded-2xl bg-zinc-900 px-4 py-3.5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">К зачислению</span>
              <span className="text-sm font-semibold">
                {effectiveAmount ? `${effectiveAmount} ₽` : "—"}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm text-white/70">
                <Zap size={14} className="text-amber-300" /> Хватит на
              </span>
              <span className="text-sm font-semibold">
                {effectiveAmount ? `${days} дней${bonus ? ` + ${bonus} бонусов` : ""}` : "—"}
              </span>
            </div>
            {bonus > 0 && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-medium text-amber-200">
                <Gift size={14} /> Подарок: +{bonus} дней при пополнении от 500 ₽
              </div>
            )}
          </div>

          <button
            disabled={!effectiveAmount || effectiveAmount < 10}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CreditCard size={16} />
            Оплатить {effectiveAmount ? `${effectiveAmount} ₽` : ""}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs leading-4 text-zinc-500">
            <ShieldCheck size={12} /> Безопасная оплата · СБП, карты, ЮMoney
          </p>
        </div>
      </Modal>

      {/* INSTALL */}
      <Modal
        isOpen={activeModal === "install"}
        onClose={close}
        title="Установить VPN"
        description="Выберите устройство — покажем QR и инструкцию."
      >
        <div className="flex flex-col gap-4">
          {/* tabs */}
          <div className="flex gap-2 rounded-full bg-zinc-900/[0.06] p-1">
            <button
              onClick={() => setInstallTab("apple")}
              className={[
                "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition",
                installTab === "apple" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800",
              ].join(" ")}
            >
              <Apple size={16} /> iOS / macOS
            </button>
            <button
              onClick={() => setInstallTab("other")}
              className={[
                "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition",
                installTab === "other"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800",
              ].join(" ")}
            >
              <MonitorSmartphone size={16} /> Android / Windows
            </button>
          </div>

          {/* qr + info */}
          <div className="rounded-2xl border border-zinc-900/5 bg-white/60 p-4 backdrop-blur">
            <div className="flex gap-4">
              <div className="flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5">
                <QrCode size={56} className="text-zinc-900" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900">
                  {installTab === "apple" ? "Скачайте skobka VPN из App Store" : "Скачайте на Android / Windows"}
                </p>
                <p className="mt-1 text-xs leading-4 text-zinc-600">
                  Наведите камеру и установите. Затем войдите по коду{" "}
                  <span className="font-mono font-semibold text-zinc-900">{inviteCode}</span>
                </p>
                <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800">
                  <Download size={12} /> Скачать
                  <ExternalLink size={12} className="opacity-70" />
                </button>
              </div>
            </div>
          </div>

          {/* steps */}
          <ol className="flex flex-col gap-3">
            {[
              installTab === "apple"
                ? "Установите приложение skobka VPN"
                : "Установите APK или exe с сайта",
              "Войдите и вставьте код " + inviteCode,
              "Нажмите «Подключить» — готово!",
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-3 rounded-2xl bg-zinc-900/[0.04] px-3 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-zinc-900 shadow-sm ring-1 ring-zinc-900/5">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-zinc-800">{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-4 text-amber-900 ring-1 ring-amber-200">
            <ShieldCheck size={14} className="shrink-0 text-amber-600" />
            Конфиг работает только после пополнения баланса. Поддержка — в профиле.
          </div>
        </div>
      </Modal>

      {/* HISTORY */}
      <Modal isOpen={activeModal === "history"} onClose={close} title="История операций" description="Последние списания и пополнения.">
        <div className="flex flex-col gap-3">
          {historyItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-900/[0.04] px-6 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <History size={20} className="text-zinc-400" />
              </div>
              <p className="text-sm font-medium text-zinc-900">Пока операций нет</p>
              <p className="max-w-[22ch] text-xs leading-4 text-zinc-500">
                Здесь появятся пополнения и ежедневные списания по тарифу.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-900/5 bg-white/70 px-3 py-3 backdrop-blur transition hover:bg-white"
                >
                  <div
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      item.status === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-zinc-900/5 text-zinc-600",
                    ].join(" ")}
                  >
                    <item.icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">{item.type}</p>
                    <p className="text-xs text-zinc-500">{item.date}</p>
                  </div>
                  <span
                    className={[
                      "shrink-0 rounded-full px-2.5 py-1 text-sm font-semibold",
                      item.status === "success"
                        ? "bg-emerald-500/10 text-emerald-700"
                        : "bg-zinc-900/5 text-zinc-700",
                    ].join(" ")}
                  >
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
              <Download size={14} /> Скачать чек
            </button>
            <button className="rounded-2xl border border-zinc-900/10 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
              Фильтр
            </button>
          </div>
        </div>
      </Modal>

      {/* ADD DEVICE */}
      <Modal
        isOpen={activeModal === "add"}
        onClose={close}
        title="Добавить устройство"
        description="Подключите новый телефон или ноутбук за 30 секунд."
      >
        <div className="flex flex-col gap-4">
          {/* limit */}
          <div className="rounded-2xl bg-zinc-900 px-4 py-3.5 text-white">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white/80">Устройств подключено</span>
              <span className="font-semibold">2 / 5</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-2/5 rounded-full bg-white transition-all" />
            </div>
            <p className="mt-2 text-xs text-white/60">Можно подключить ещё 3 устройства на этом тарифе.</p>
          </div>

          {/* invite */}
          <div className="rounded-2xl border border-zinc-900/5 bg-white/70 p-4 backdrop-blur">
            <p className="text-xs font-medium text-zinc-500">Код приглашения для нового устройства</p>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 truncate rounded-xl bg-zinc-900 px-3 py-3 text-center font-mono text-sm font-semibold tracking-widest text-white">
                {inviteCode}
              </code>
              <button
                onClick={handleCopy}
                className={[
                  "inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border transition active:scale-95",
                  copied
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-zinc-900/10 bg-white text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
                aria-label="Скопировать код"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5">
                <QrCode size={44} className="text-zinc-900" />
              </div>
              <p className="max-w-[14ch] text-xs leading-4 text-zinc-500">QR для быстрой настройки — покажите на новом устройстве</p>
            </div>
          </div>

          <ol className="flex flex-col gap-2 text-sm">
            <li className="flex gap-2">
              <span className="font-semibold text-zinc-900">1.</span>
              <span className="text-zinc-600">Установите skobka VPN на новом устройстве.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-zinc-900">2.</span>
              <span className="text-zinc-600">Войдите и вставьте код выше.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-zinc-900">3.</span>
              <span className="text-zinc-600">Устройство появится в списке автоматически.</span>
            </li>
          </ol>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99]"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Скопировано!" : "Копировать код"}
            </button>
            <button className="inline-flex items-center justify-center rounded-2xl border border-zinc-900/10 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
              <Trash2 size={16} />
            </button>
          </div>

          <p className="text-center text-xs text-zinc-500">Код действует 24 часа · Можно пересоздать в профиле</p>
        </div>
      </Modal>

      {/* DEVICE DETAIL — референс под стиль сайта */}
      <Modal
        isOpen={activeModal === "device"}
        onClose={close}
        title={selectedDevice ? `Устройство — ${selectedDevice.name}` : "Устройство"}
        description={selectedDevice ? `${selectedDevice.location} · ${selectedDevice.ip}` : undefined}
        size="md"
      >
        {selectedDevice && (
          <div className="flex flex-col gap-5">
            {/* ссылка для настройки — как на скрине, но liquid-glass */}
            <div className="liquid-glass rounded-[20px] p-4">
              <h3 className="text-[15px] font-semibold leading-5 text-zinc-900">Ссылка для настройки приложения VPN</h3>
              <p className="mt-1.5 text-xs leading-[1.5] text-zinc-500">
                Скопируйте эту ссылку, откройте приложение skobka, нажмите на «+», затем «Вставить из буфера обмена» и вставьте скопированную ссылку.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-full border border-zinc-900/10 bg-zinc-50 px-2 py-1.5 pl-3">
                <Link2 size={14} className="shrink-0 text-zinc-400" />
                <span className="min-w-0 flex-1 truncate font-mono text-xs font-medium text-zinc-700">{selectedDevice.subLink}</span>
                <button
                  onClick={() => handleDeviceCopy(selectedDevice.subLink)}
                  className="shrink-0 rounded-full bg-white p-1.5 text-zinc-600 shadow-sm ring-1 ring-zinc-900/10 transition hover:text-zinc-900 active:scale-95"
                  aria-label="Копировать ссылку"
                >
                  {deviceLinkCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDeviceShare(selectedDevice.subLink)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 active:scale-[0.98]"
                >
                  <Share2 size={14} /> Поделиться
                </button>
                <button
                  onClick={() => handleDeviceCopy(selectedDevice.subLink)}
                  className={[
                    "inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98]",
                    deviceLinkCopied
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-zinc-900/10 bg-white text-zinc-900 hover:bg-zinc-50",
                  ].join(" ")}
                >
                  {deviceLinkCopied ? <Check size={14} /> : <Copy size={14} />}
                  {deviceLinkCopied ? "Скопировано" : "Копировать"}
                </button>
              </div>
            </div>

            {/* ПАРАМЕТРЫ — починена мобилка: min-w-0 + flex-1 */}
            <div className="flex flex-col">
              <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">Параметры</p>
              <button className="flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-3 text-left transition hover:bg-zinc-50 active:bg-zinc-100">
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-900/5">
                    <Shuffle size={16} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="min-w-0 break-words text-sm font-medium leading-tight text-zinc-900">Быстрая замена устройства</span>
                    <span className="min-w-0 break-words text-xs leading-tight text-zinc-500">Замените устройство в одно действие</span>
                  </span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-zinc-400" />
              </button>
              <div className="mx-2 h-px bg-zinc-900/[0.06]" />
              <div className="flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-3">
                <span className="flex min-w-0 flex-1 items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-900/5">
                    <Trash2 size={16} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="min-w-0 break-words text-sm font-medium leading-tight text-zinc-900">Удалить настройки VPN этого устройства</span>
                    <span className="min-w-0 break-words text-xs leading-tight text-zinc-500">Удалите его, если вы им не пользуетесь</span>
                  </span>
                </span>
                <button className="shrink-0 self-center rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-semibold leading-none text-red-600 ring-1 ring-red-200 transition hover:bg-red-100 active:scale-95 sm:px-4">
                  Удалить
                </button>
              </div>
            </div>

            {/* ПОМОЩЬ */}
            <div className="flex flex-col">
              <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">Помощь</p>
              <button className="flex items-center justify-between rounded-2xl px-2 py-3 text-left transition hover:bg-zinc-50">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-900/5">
                    <BookOpen size={16} />
                  </span>
                  <span className="text-sm font-medium text-zinc-900">Инструкция для iOS</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-zinc-400" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
