"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { type Locale, getTranslations } from "./i18n"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: ReturnType<typeof getTranslations>
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const storedRaw = localStorage.getItem("locale")
    const normalized = storedRaw === "ua" ? "uk" : storedRaw
    if (normalized === "en" || normalized === "uk") {
      setLocaleState(normalized)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    const normalized = newLocale === "uk" ? "uk" : "en"
    setLocaleState(normalized)
    localStorage.setItem("locale", normalized)
  }

  const t = getTranslations(locale)

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider")
  }
  return context
}
