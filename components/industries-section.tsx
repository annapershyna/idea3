"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useLocale } from "@/lib/locale-context"

type IndustryItem = { title: string; description: string; icon: "health" | "fintech" | "ecommerce" | "saas" | "logistics" }

const industries: Record<"en" | "uk", IndustryItem[]> = {
  en: [
    { title: "Healthcare", description: "HIPAA-ready platforms, patient portals, telemedicine and health analytics.", icon: "health" },
    { title: "Fintech", description: "Secure financial systems, payments, API integrations and compliance.", icon: "fintech" },
    { title: "Ecommerce", description: "High-performance stores, marketplaces, and seamless checkout experiences.", icon: "ecommerce" },
    { title: "SaaS", description: "Scalable SaaS platforms with multi-tenant architecture and dashboards.", icon: "saas" },
    { title: "Logistics", description: "Real-time tracking, route optimization, warehouse and delivery management.", icon: "logistics" },
  ],
  uk: [
    { title: "Охорона здоров’я", description: "HIPAA-ready платформи, портали пацієнтів, телемедицина та health-аналітика.", icon: "health" },
    { title: "Фінтех", description: "Захищені фінансові системи, платежі, API-інтеграції та комплаєнс.", icon: "fintech" },
    { title: "Ecommerce", description: "Високопродуктивні магазини, маркетплейси та безшовні checkout-сценарії.", icon: "ecommerce" },
    { title: "SaaS", description: "Масштабовані SaaS-платформи з мультитенантною архітектурою та дашбордами.", icon: "saas" },
    { title: "Логістика", description: "Відстеження в реальному часі, оптимізація маршрутів і керування доставкою.", icon: "logistics" },
  ],
}

const content = {
  en: { pill: "INDUSTRIES", title: "Digital solutions for every industry", subtitle: "We design and build custom software that solves real business challenges across complex and highly regulated industries.", cta: "Discuss your project" },
  uk: { pill: "ГАЛУЗІ", title: "Цифрові рішення для кожної індустрії", subtitle: "Ми створюємо програмні продукти, що вирішують реальні бізнес-виклики у складних і регульованих галузях.", cta: "Обговорити проєкт" },
}

function IndustryIcon({ kind }: { kind: IndustryItem["icon"] }) {
  const common = "h-5 w-5 text-[#FF6200]"
  if (kind === "health") return <svg className={common} viewBox="0 0 24 24" fill="none"><path d="M9 2v20M2 9h20" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.2" opacity=".6"/></svg>
  if (kind === "fintech") return <svg className={common} viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5" width="19" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2.5 9h19M6 14h4" stroke="currentColor" strokeWidth="1.5"/></svg>
  if (kind === "ecommerce") return <svg className={common} viewBox="0 0 24 24" fill="none"><path d="M5 8h14l-1.2 11H6.2L5 8Z" stroke="currentColor" strokeWidth="1.5"/><path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5"/></svg>
  if (kind === "saas") return <svg className={common} viewBox="0 0 24 24" fill="none"><path d="M7 16h10a4 4 0 1 0-1.1-7.85A5 5 0 0 0 6.4 10.5 3.5 3.5 0 0 0 7 16Z" stroke="currentColor" strokeWidth="1.5"/><path d="M9 19h6" stroke="currentColor" strokeWidth="1.5"/></svg>
  return <svg className={common} viewBox="0 0 24 24" fill="none"><path d="M3 8.5 12 4l9 4.5V19l-9 4-9-4V8.5Z" stroke="currentColor" strokeWidth="1.5"/><path d="M3 8.5 12 13l9-4.5" stroke="currentColor" strokeWidth="1.5"/></svg>
}

export function IndustriesSection() {
  const { locale } = useLocale()
  const lang = locale === "uk" ? "uk" : "en"
  const t = content[lang]
  const items = industries[lang]
  const [active, setActive] = useState<number | null>(null)
  const [hoverCore, setHoverCore] = useState(false)

  const orbit = useMemo(() => [
    { x: 132, y: -248 },
    { x: 286, y: 6 },
    { x: 184, y: 228 },
    { x: -138, y: 148 },
    { x: -178, y: -92 },
  ], [])

  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#08090d]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,98,0,0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_50%_45%,rgba(255,98,0,0.1),transparent_45%)]" />
      <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.4fr]">
          <div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#111015] sm:text-5xl dark:text-white">{t.title}</h2>
            <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-[#5f5b67] sm:text-lg dark:text-white/60">{t.subtitle}</p>
          </div>

          <div>
            <div className="relative hidden min-h-[620px] lg:block">
              <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF6200]/20" />
              <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF6200]/15" />

              <button type="button" onMouseEnter={() => setHoverCore(true)} onMouseLeave={() => setHoverCore(false)} onClick={() => setActive(null)} className="absolute left-1/2 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF6200]/30 bg-black shadow-[0_0_50px_rgba(255,98,0,0.32)]" aria-label="IdeaTeam core">
                <Image src="/icon.svg" alt="IdeaTeam" width={24} height={24} className="mx-auto" />
              </button>

              {items.map((item, index) => {
                const point = orbit[index]
                const isActive = active === index
                return (
                  <motion.button key={item.title} type="button" onClick={() => setActive(active === index ? null : index)} className="absolute z-10 w-[165px] text-left" initial={false}
                    animate={isActive ? { left: "50%", top: "50%", x: "-50%", y: "-50%", scale: 1.04, zIndex: 50 } : { left: "50%", top: "50%", x: point.x + (hoverCore ? point.y * 0.045 : 0), y: point.y + (hoverCore ? -point.x * 0.045 : 0), scale: 1, zIndex: 20 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}>
                    <div className={`rounded-lg border p-3 backdrop-blur-sm transition-colors ${isActive ? "border-[#FF6200]/60 bg-[#eef0f6] dark:bg-[#0f1118]" : "border-black/15 bg-white/80 hover:border-[#FF6200]/40 dark:border-white/20 dark:bg-[#0c0f16]/80"}`}>
                      <div className="text-xs font-semibold text-[#FF6200]">{String(index + 1).padStart(2, "0")}</div>
                      <h3 className="mt-1 text-lg font-semibold text-[#111015] dark:text-white">{item.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#5f5b67] dark:text-white/65 line-clamp-4">{item.description}</p>
                      <div className="mt-2"><IndustryIcon kind={item.icon} /></div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <div className="grid gap-3 lg:hidden sm:grid-cols-2">
              {items.map((item, index) => (
                <button key={item.title} type="button" onClick={() => setActive(active === index ? null : index)} className={`rounded-xl border p-4 text-left transition-colors ${active === index ? "border-[#FF6200]/60 bg-[#eef0f6] dark:bg-[#0f1118]" : "border-black/15 bg-white/80 dark:border-white/20 dark:bg-[#0c0f16]/80"}`}>
                  <div className="text-sm font-semibold text-[#FF6200]">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="mt-1 text-xl font-semibold text-[#111015] dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5b67] dark:text-white/70">{item.description}</p>
                  <div className="mt-3"><IndustryIcon kind={item.icon} /></div>
                </button>
              ))}
              <div className="sm:col-span-2 flex justify-center pt-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FF6200]/35 bg-black shadow-[0_0_24px_rgba(255,98,0,0.25)]">
                  <Image src="/icon.svg" alt="IdeaTeam" width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
