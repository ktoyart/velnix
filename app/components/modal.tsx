"use client";

import { useEffect, useRef, useState, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-[min(90vw,28rem)]",
  lg: "max-w-[min(92vw,36rem)]",
} as const;

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  const uid = useId();

  // keep onClose fresh without re-subscribing effects
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  // portal target
  useEffect(() => {
    setPortalEl(document.body);
  }, []);

  // mount / unmount — симметричные плавные анимации открытия/закрытия
  useEffect(() => {
    if (isOpen) {
      lastActiveRef.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      setVisible(false);
      // даём браузеру отрисовать начальное состояние opacity-0 / scale-0.96
      const id = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(id);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 420);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // body scroll lock with scrollbar compensation
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const html = document.documentElement;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  // restore focus on close
  useEffect(() => {
    if (!isOpen && !mounted) {
      lastActiveRef.current?.focus?.();
    }
  }, [isOpen, mounted]);

  // focus first element when opened
  useEffect(() => {
    if (visible && panelRef.current) {
      const focusable = panelRef.current.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      // focus close button or first focusable
      (focusable ?? panelRef.current)?.focus?.();
      // if panel itself receives focus, keep it focusable
      if (!focusable && panelRef.current) {
        panelRef.current.focus();
      }
    }
  }, [visible]);

  // focus trap + Esc
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.tabIndex !== -1 && !el.hasAttribute("hidden"));

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !panelRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeOnEsc]
  );

  useEffect(() => {
    if (!mounted) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, handleKeyDown]);

  // prevent closing when dragging from panel to overlay
  const handleOverlayMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current && closeOnOverlay) {
        closeRef.current();
      }
    },
    [closeOnOverlay]
  );

  if (!mounted || !portalEl) return null;

  const titleId = title ? `modal-title-${uid}` : undefined;
  const descId = description ? `modal-desc-${uid}` : undefined;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      // prevent background scroll on iOS
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Backdrop — только opacity, блюр постоянный чтобы не дергался */}
      <div
        ref={overlayRef}
        onMouseDown={handleOverlayMouseDown}
        aria-hidden="true"
        className={[
          "absolute inset-0 bg-zinc-900/30 backdrop-blur-[8px] transition-opacity duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[opacity]",
          visible ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className={[
          "liquid-glass relative z-10 flex max-h-[min(85dvh,720px)] w-full flex-col overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.9)_inset] outline-none transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[transform,opacity]",
          sizeMap[size],
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.96] opacity-0",
        ].join(" ")}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-0 pt-6">
            <div className="min-w-0 flex-1">
              {title && (
                <h2
                  id={titleId}
                  className="pr-2 text-[17px] font-semibold leading-6 tracking-tight text-zinc-900"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id={descId}
                  className="mt-1.5 text-[13.5px] leading-5 text-zinc-500"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={() => closeRef.current()}
                aria-label="Закрыть"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900/[0.06] text-zinc-500 transition hover:bg-zinc-900/10 hover:text-zinc-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              >
                <X size={16} strokeWidth={2.2} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 text-zinc-800 [scrollbar-width:thin]">
          {children}
        </div>
      </div>
    </div>,
    portalEl
  );
}
