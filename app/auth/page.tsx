"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Aldrich } from "next/font/google";
import {
  Send,
  Mail,
  ArrowRight,
  ShieldCheck,
  Clock,
  RefreshCw,
  Check,
  AtSign,
  Lock,
  ExternalLink,
  HelpCircle,
} from "lucide-react";

const aldrich = Aldrich({ subsets: ["latin"], weight: ["400"] });

type AuthMode = "tg" | "email";
type EmailStep = "email" | "code";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("tg");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailStep, setEmailStep] = useState<EmailStep>("email");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const codeValid = code.trim().length >= 4;

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (emailStep === "code") {
      setTimeout(() => codeInputRef.current?.focus(), 100);
    }
  }, [emailStep]);

  const handleSendCode = async () => {
    if (!emailValid || sending) return;
    setError(null);
    setSending(true);
    // имитация запроса
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setEmailStep("code");
    setCooldown(60);
    setCode("");
  };

  const handleVerify = async () => {
    if (!codeValid || verifying) return;
    setError(null);
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    // простая проверка — любой код 4+ символов считаем валидным, кроме 0000 для демо ошибки
    if (code.trim() === "0000") {
      setError("Неверный код, попробуйте ещё раз");
      setVerifying(false);
      return;
    }
    setVerifying(false);
    router.push("/dashboard");
  };

  const handleTgLogin = () => {
    // в реальном проекте — Telegram Login Widget или deep-link
    window.open("https://t.me/skobka_robot?start=auth", "_blank");
  };

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-white px-5 py-8 md:px-10 md:py-12">
      {/* bg */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: "url('/back.png')",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-white/30 to-white" />

      {/* header */}
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className={`${aldrich.className} text-2xl leading-none tracking-tight text-zinc-900 md:text-3xl`}>
            skobka)
          </span>
        </Link>
        <Link
          href="/support"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-900/5 transition-all duration-300 ease-out hover:bg-zinc-50"
        >
          <HelpCircle size={14} /> Поддержка
        </Link>
      </header>

      <main className="flex w-full max-w-[440px] flex-col gap-6 pt-12">
        {/* title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-md">
            <Lock size={20} />
          </span>
          <h1 className="text-[28px] font-extrabold tracking-tight text-zinc-900 md:text-3xl">Вход в skobka)</h1>
          <p className="max-w-[32ch] text-sm leading-5 text-zinc-500">
            Выберите как войти — через Telegram за 1 тап или по коду на email
          </p>
        </div>

        {/* segmented control */}
        <div className="liquid-glass flex gap-1 rounded-full p-1 shadow-sm">
          <button
            onClick={() => setMode("tg")}
            className={[
              "flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-out",
              mode === "tg" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900",
            ].join(" ")}
          >
            <Send size={16} /> Telegram
          </button>
          <button
            onClick={() => setMode("email")}
            className={[
              "flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-out",
              mode === "email" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900",
            ].join(" ")}
          >
            <Mail size={16} /> Email
          </button>
        </div>

        {/* card */}
        <div className="liquid-glass liquid-glass-hover flex flex-col gap-5 rounded-[28px] p-6 shadow-sm transition-all duration-300 ease-out md:p-7">
          {mode === "tg" ? (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
                  <Send size={18} />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-zinc-900">Войти через Telegram</span>
                  <span className="text-xs text-zinc-500">Мгновенно · без пароля</span>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Рекомендуем
                </span>
              </div>

              <div className="rounded-2xl bg-sky-50 px-4 py-3 text-xs leading-4 text-sky-900 ring-1 ring-sky-100">
                Откроется <span className="font-semibold">@skobka_robot</span> — нажмите «Старт», вернитесь сюда и вы будете авторизованы автоматически.
              </div>

              <button
                onClick={handleTgLogin}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(14,165,233,0.25)] transition-all duration-300 ease-out hover:bg-sky-600 hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <AtSign size={18} />
                Открыть @skobka_robot
                <ExternalLink size={16} className="opacity-70" />
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-900/5" />
                <span className="text-xs font-medium text-zinc-400">или</span>
                <div className="h-px flex-1 bg-zinc-900/5" />
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-zinc-900/[0.04] px-4 py-3">
                <ShieldCheck size={16} className="shrink-0 text-zinc-500" />
                <p className="text-xs leading-4 text-zinc-600">
                  Безопасно: Telegram подтверждает ваш аккаунт, пароль не нужен.
                </p>
              </div>

              <p className="text-center text-xs text-zinc-500">
                Нет Telegram?{" "}
                <button onClick={() => setMode("email")} className="font-semibold text-zinc-900 hover:underline">
                  Войти по email
                </button>
              </p>
            </>
          ) : (
            <>
              {emailStep === "email" ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-sm">
                      <Mail size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Вход по email</p>
                      <p className="text-xs text-zinc-500">Пришлём код на 5 минут</p>
                    </div>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-zinc-500">Email</span>
                    <div className="relative">
                      <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full rounded-2xl border border-zinc-900/10 bg-white/70 py-3 pl-10 pr-4 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none backdrop-blur transition-all duration-300 ease-out focus:border-zinc-900/20 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
                        onKeyDown={(e) => e.key === "Enter" && emailValid && handleSendCode()}
                      />
                      {emailValid && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                          <Check size={16} />
                        </span>
                      )}
                    </div>
                  </label>

                  {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600 ring-1 ring-red-100">{error}</p>}

                  <button
                    onClick={handleSendCode}
                    disabled={!emailValid || sending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {sending ? <RefreshCw size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                    {sending ? "Отправляем..." : "Получить код"}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-xs leading-4 text-zinc-500">
                    <Clock size={12} /> Код действует 5 минут · не передаём email третьим лицам
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                        <Mail size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">Код отправлен</p>
                        <p className="truncate text-xs text-zinc-500">на {email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEmailStep("email");
                        setCode("");
                        setError(null);
                      }}
                      className="text-xs font-semibold text-zinc-500 transition-all duration-300 ease-out hover:text-zinc-900"
                    >
                      Изменить
                    </button>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-xs leading-4 text-emerald-900 ring-1 ring-emerald-100">
                    Введите 4-значный код из письма. Проверьте спам, если не пришло.
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-zinc-500">Код из письма</span>
                    <input
                      ref={codeInputRef}
                      inputMode="numeric"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6));
                        setError(null);
                      }}
                      placeholder="••••"
                      className="w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-center text-lg font-semibold tracking-[0.3em] text-zinc-900 placeholder:text-zinc-300 outline-none backdrop-blur transition-all duration-300 ease-out focus:border-zinc-900/20 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
                      onKeyDown={(e) => e.key === "Enter" && codeValid && handleVerify()}
                    />
                  </label>

                  {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-medium text-red-600 ring-1 ring-red-100">{error}</p>}

                  <button
                    onClick={handleVerify}
                    disabled={!codeValid || verifying}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {verifying ? <RefreshCw size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                    {verifying ? "Проверяем..." : "Войти"}
                  </button>

                  <div className="flex items-center justify-between text-xs">
                    {cooldown > 0 ? (
                      <span className="flex items-center gap-1 text-zinc-500">
                        <Clock size={12} /> повторно через {cooldown}с
                      </span>
                    ) : (
                      <button
                        onClick={handleSendCode}
                        disabled={sending}
                        className="inline-flex items-center gap-1 font-semibold text-zinc-900 transition hover:text-zinc-700"
                      >
                        <RefreshCw size={12} /> Отправить снова
                      </button>
                    )}
                    <button
                      onClick={() => setEmailStep("email")}
                      className="font-medium text-zinc-500 hover:text-zinc-900"
                    >
                      Назад
                    </button>
                  </div>
                </>
              )}

              <div className="flex items-center gap-3 pt-1">
                <div className="h-px flex-1 bg-zinc-900/5" />
                <span className="text-xs font-medium text-zinc-400">или</span>
                <div className="h-px flex-1 bg-zinc-900/5" />
              </div>

              <button
                onClick={() => setMode("tg")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-900/10 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition-all duration-300 ease-out hover:bg-zinc-50 hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <Send size={16} className="text-sky-500" /> Войти через Telegram
              </button>
            </>
          )}
        </div>

        <p className="px-2 text-center text-xs leading-4 text-zinc-500">
          Продолжая, вы соглашаетесь с{" "}
          <a href="#" className="font-semibold text-zinc-900 hover:underline">
            Соглашением
          </a>{" "}
          и{" "}
          <a href="#" className="font-semibold text-zinc-900 hover:underline">
            Политикой конфиденциальности
          </a>
          .
        </p>
      </main>
    </div>
  );
}
