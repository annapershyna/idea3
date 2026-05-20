"use client"

import { motion } from "framer-motion"
import { useLocale } from "@/lib/locale-context"

const industries = {
  en: [
    {
      title: "Healthcare",
      description: "HIPAA-ready apps, patient platforms, analytics systems",
    },
    {
      title: "Fintech",
      description: "Secure API-first financial products and integrations",
    },
    {
      title: "Ecommerce",
      description: "High-load stores, marketplaces, checkout flows",
    },
    {
      title: "SaaS",
      description: "Scalable platforms for startups and B2B products",
    },
    {
      title: "Logistics",
      description: "Real-time tracking automation and operational tools",
    },
  ],
  uk: [
    {
      title: "Охорона здоров’я",
      description: "HIPAA-ready застосунки, платформи для пацієнтів та аналітичні системи",
    },
    {
      title: "Фінтех",
      description: "Захищені API-first фінансові продукти та інтеграції",
    },
    {
      title: "Ecommerce",
      description: "Високонавантажені магазини, маркетплейси та checkout-флоу",
    },
    {
      title: "SaaS",
      description: "Масштабовані платформи для стартапів і B2B-продуктів",
    },
    {
      title: "Логістика",
      description: "Відстеження в реальному часі, автоматизація та операційні інструменти",
    },
  ],
}

const content = {
  en: {
    pill: "Industries",
    title: "Industries",
    subtitle: "We build scalable digital products for fast-growing companies across highly demanding industries.",
  },
  uk: {
    pill: "Галузі",
    title: "Галузі",
    subtitle: "Ми створюємо масштабовані цифрові продукти для швидкозростаючих компаній у найвимогливіших індустріях.",
  },
}

export function IndustriesSection() {
  const { locale } = useLocale()
  const t = locale === "uk" ? content.uk : content.en
  const cards = locale === "uk" ? industries.uk : industries.en

  return (
    <section className="relative overflow-hidden bg-[#F4F4F6] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#0A0A0B]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-40px] top-16 h-72 w-72 rounded-full bg-[#FF6200]/20 blur-3xl dark:bg-[#FF6200]/30" />
        <div className="absolute bottom-10 right-[-60px] h-72 w-72 rounded-full bg-[#7C4DFF]/20 blur-3xl dark:bg-[#7C4DFF]/30" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6200] backdrop-blur dark:border-white/10 dark:bg-white/5">
            {t.pill}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111015] sm:text-4xl lg:text-5xl dark:text-white">{t.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-[#5D5A66] sm:text-lg dark:text-[#B9B7C3]">{t.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((industry, index) => (
            <motion.article
              key={industry.title}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative isolate min-h-[220px] overflow-hidden rounded-3xl border border-black/10 bg-white/75 p-7 shadow-[0_12px_40px_-24px_rgba(17,16,21,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[#131216]/75 dark:shadow-[0_14px_50px_-24px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,98,0,0.25),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(124,77,255,0.2),transparent_38%)] opacity-40 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-[#111015] dark:text-white">{industry.title}</h3>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/80 text-sm text-[#111015] transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FF6200]/50 group-hover:text-[#FF6200] dark:border-white/10 dark:bg-white/10 dark:text-white">
                    ↗
                  </span>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.08 }}
                  className="mt-8 max-w-[34ch] text-sm leading-7 text-[#5D5A66] dark:text-[#B9B7C3]"
                >
                  {industry.description}
                </motion.p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
