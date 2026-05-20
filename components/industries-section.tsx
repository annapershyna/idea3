"use client"

import { motion } from "framer-motion"
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
  const common = "h-10 w-10 text-[#FF6200]"
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
  const [active, setActive] = useState(0)
  const [hoverCore, setHoverCore] = useState(false)

  const orbit = useMemo(() => [
    { x: 0, y: -170 },
    { x: 185, y: -58 },
    { x: 160, y: 128 },
    { x: -20, y: 192 },
    { x: -190, y: -18 },
  ], [])

  return (
    <section className="relative overflow-hidden bg-[#08090d] px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,98,0,0.12),transparent_45%)]" />
      <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-[#090b12]/90 p-6 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.4fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-[#FF6200]">{t.pill}</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">{t.title}</h2>
            <p className="mt-7 max-w-[36ch] text-xl leading-relaxed text-white/60">{t.subtitle}</p>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-3 border-b border-[#FF6200]/70 pb-1 text-2xl text-white hover:text-[#FF6200]">
              {t.cta}<span>↗</span>
            </Link>
          </div>

          <div className="relative min-h-[680px]">
            <div className="absolute left-1/2 top-1/2 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF6200]/25 lg:block" />
            <div className="absolute left-1/2 top-1/2 hidden h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF6200]/20 lg:block" />
            <div className="absolute left-1/2 top-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF6200]/15 lg:block" />

            <motion.button
              type="button"
              onMouseEnter={() => setHoverCore(true)}
              onMouseLeave={() => setHoverCore(false)}
              className="absolute left-1/2 top-1/2 z-20 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF6200]/30 bg-black text-[#FF6200] shadow-[0_0_80px_rgba(255,98,0,0.35)]"
            >
              <span className="text-3xl font-bold">&gt;/</span>
            </motion.button>

            {items.map((item, index) => {
              const point = orbit[index]
              const isActive = active === index
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className="absolute z-10 w-[310px] text-left"
                  initial={false}
                  animate={
                    isActive
                      ? { x: "-50%", y: "-50%", left: "50%", top: "50%", scale: 1.02 }
                      : { x: point.x + (hoverCore ? point.y * 0.06 : 0), y: point.y + (hoverCore ? -point.x * 0.06 : 0), left: "50%", top: "50%", scale: 1 }
                  }
                  transition={{ type: "spring", stiffness: 110, damping: 18 }}
                >
                  <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${isActive ? "border-[#FF6200]/65 bg-[#0f1118]" : "border-white/20 bg-[#0c0f16]/80 hover:border-[#FF6200]/45"}`}>
                    <div className="mb-2 text-xl font-semibold text-[#FF6200]">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="text-4xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-2xl leading-relaxed text-white/65">{item.description}</p>
                    <div className="mt-4"><IndustryIcon kind={item.icon} /></div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
