"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { useLocale } from "@/lib/locale-context"

type IndustryItem = {
  title: string
  description: string
}

const industries: Record<"en" | "uk", IndustryItem[]> = {
  en: [
    { title: "Healthcare", description: "HIPAA-ready apps, patient platforms, analytics systems" },
    { title: "Fintech", description: "Secure API-first financial products and integrations" },
    { title: "Ecommerce", description: "High-load stores, marketplaces, checkout flows" },
    { title: "SaaS", description: "Scalable platforms for startups and B2B products" },
    { title: "Logistics", description: "Real-time tracking automation and operational tools" },
  ],
  uk: [
    { title: "Охорона здоров’я", description: "HIPAA-ready застосунки, платформи для пацієнтів та аналітичні системи" },
    { title: "Фінтех", description: "Захищені API-first фінансові продукти та інтеграції" },
    { title: "Ecommerce", description: "Високонавантажені магазини, маркетплейси та checkout-флоу" },
    { title: "SaaS", description: "Масштабовані платформи для стартапів і B2B-продуктів" },
    { title: "Логістика", description: "Відстеження в реальному часі, автоматизація та операційні інструменти" },
  ],
}

const content = {
  en: {
    pill: "Industries",
    title: "Building digital solutions that drive industry forward",
    subtitle: "We build scalable digital products for fast-growing companies across highly demanding industries.",
    cta: "Let’s talk",
  },
  uk: {
    pill: "Галузі",
    title: "Створюємо цифрові рішення, що рухають індустрії вперед",
    subtitle: "Ми створюємо масштабовані цифрові продукти для швидкозростаючих компаній у найвимогливіших індустріях.",
    cta: "Обговорити проєкт",
  },
}

export function IndustriesSection() {
  const { locale } = useLocale()
  const lang = locale === "uk" ? "uk" : "en"
  const t = content[lang]
  const items = industries[lang]
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#f5f5f8] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#06070b]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,16,21,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,16,21,0.06)_1px,transparent_1px)] bg-[size:52px_52px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />
        <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-[#ff6200]/15 blur-3xl dark:bg-[#8e6bff]/25" />
        <div className="absolute bottom-14 right-[8%] h-72 w-72 rounded-full bg-[#8e6bff]/15 blur-3xl dark:bg-[#00e7c2]/20" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.6fr)] lg:gap-10">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d63ff] dark:text-[#9e97ff]">{t.pill}</p>
          <h2 className="max-w-[20ch] text-3xl font-semibold leading-tight text-[#111015] sm:text-4xl dark:text-white">{t.title}</h2>
          <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-[#5d5a66] dark:text-[#a8a6b6]">{t.subtitle}</p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-3 border-b border-[#6d63ff]/60 pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#111015] transition-colors hover:text-[#6d63ff] dark:text-white dark:hover:text-[#9e97ff]"
          >
            {t.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </Link>
        </aside>

        <div className="space-y-4 sm:space-y-5">
          {items.map((item, index) => {
            const isActive = activeIndex === index

            return (
              <motion.article
                key={item.title}
                onViewportEnter={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5, once: false }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/65 p-5 backdrop-blur-xl transition-all duration-500 sm:rounded-3xl sm:p-7 dark:border-white/10 dark:bg-[#0c0f16]/80"
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-30 group-hover:opacity-70"
                  } bg-[radial-gradient(circle_at_78%_50%,rgba(122,103,255,0.32),transparent_36%),radial-gradient(circle_at_72%_82%,rgba(0,231,194,0.18),transparent_34%)]`}
                />

                <div className="relative z-10 grid items-start gap-6 sm:grid-cols-[68px_minmax(0,1fr)_140px] sm:gap-8">
                  <div className="text-3xl font-medium leading-none text-[#6d63ff] sm:pt-1 dark:text-[#9e97ff]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="sm:border-l sm:border-black/10 sm:pl-8 dark:sm:border-white/10">
                    <h3 className="text-2xl font-semibold text-[#111015] dark:text-white">{item.title}</h3>
                    <motion.p
                      initial={{ opacity: 0.35, y: 10 }}
                      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="mt-3 max-w-[54ch] text-base leading-relaxed text-[#5d5a66] dark:text-[#a8a6b6]"
                    >
                      {item.description}
                    </motion.p>
                  </div>

                  <div className="hidden h-[112px] items-center justify-center rounded-2xl border border-black/10 bg-white/50 sm:flex dark:border-white/10 dark:bg-white/5">
                    <div className="relative h-14 w-14">
                      <div className="absolute inset-0 rounded-2xl bg-[#6d63ff]/25 blur-lg" />
                      <div className="absolute inset-2 rounded-xl border border-[#6d63ff]/60" />
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
