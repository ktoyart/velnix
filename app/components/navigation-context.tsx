"use client";

import { createContext, useContext, type ReactNode } from "react";

export type NavigationContextValue = {
  /** Переходит по указанному адресу с плавной анимацией. */
  navigate: (href: string) => void;
  /** Возвращает на предыдущую страницу с плавной анимацией. */
  goBack: (fallback?: string) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: NavigationContextValue;
}) {
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue | null {
  return useContext(NavigationContext);
}
