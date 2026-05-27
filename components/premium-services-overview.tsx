"use client"

import { Activity, BarChart3, Code2, Compass, Smartphone, TestTube2 } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const cards = [
  { title: { en: "Web Development", uk: "Веб-розробка" }, description: { en: "Scalable web platforms and internal tools built for performance, security, and long-term maintainability.", uk: "Масштабовані вебплатформи та внутрішні інструменти з фокусом на продуктивність, безпеку та довгострокову підтримуваність." }, icon: Code2, href: "/services/custom-web-solutions" },
  { title: { en: "Mobile Apps", uk: "Мобільні застосунки" }, description: { en: "Native-like mobile experiences for iOS and Android with stable release workflows and product-grade UX.", uk: "Нативний mobile-досвід для iOS та Android зі стабільними релізними процесами та продуктовим UX." }, icon: Smartphone, href: "/services#mobile-applications" },
  { title: { en: "UI/UX Design", uk: "UI/UX дизайн" }, description: { en: "Clean, conversion-driven product interfaces with reusable design systems and measurable usability outcomes.", uk: "Чисті, орієнтовані на конверсію інтерфейси з перевикористовуваними дизайн-системами та вимірюваними UX-результатами." }, icon: Compass, href: "/services#ux-ui-design" },
  { title: { en: "QA & Testing", uk: "QA та тестування" }, description: { en: "Automated and manual quality pipelines that reduce regressions and keep releases predictable.", uk: "Автоматизовані й ручні QA-процеси, що зменшують регресії та роблять релізи передбачуваними." }, icon: TestTube2, href: "/services#qa" },
  { title: { en: "Digital Analytics", uk: "Цифрова аналітика" }, description: { en: "Data instrumentation and KPI-focused analytics pipelines to support faster product decisions.", uk: "Інструментування даних і KPI-орієнтована аналітика для швидших продуктових рішень." }, icon: BarChart3, href: "/services#data-analytics" },
  { title: { en: "IT Consulting", uk: "IT консалтинг" }, description: { en: "Architecture and delivery guidance for teams scaling from MVP to enterprise-grade systems.", uk: "Архітектурний і delivery-консалтинг для команд, що масштабуються від MVP до enterprise-рівня." }, icon: Activity, href: "/contact" },
]

export function PremiumServicesOverview() {
  const { locale } = useLocale()
  const copy = {
    en: {
      title: "Custom Software Development for Growing Businesses",
      intro:
        "Off-the-shelf platforms set the ceiling for what your product can do. Custom software development removes it. We design and engineer scalable software solutions built around your architecture requirements, data model, and growth trajectory.",
      outro:
        "Every codebase is CI/CD-ready, fully documented, and designed to support growth from hundreds to hundreds of thousands of users without structural rewrites. Our software engineering services cover the full cycle: from requirements analysis and system design to deployment and post-launch iteration.",
    },
    uk: {
      title: "Розробка програмного забезпечення для бізнесу, що зростає",
      intro:
        "Готові платформи встановлюють обмеження для того, що може робити ваш продукт. Розробка кастомного програмного забезпечення ці обмеження знімає. Ми проектуємо та створюємо масштабовані програмні рішення, побудовані навколо ваших архітектурних вимог, моделі даних і траєкторії зростання.",
      outro:
        "Кожна кодова база постачається готовою до CI/CD, повністю задокументована та спроектована так, щоб підтримувати зростання від сотень до сотень тисяч користувачів без необхідності структурного переписування. Наші послуги охоплюють повний цикл: від аналізу вимог і системного проектування до розгортання та подальших ітерацій після запуску.",
    },
  } as const
  
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-20 lg:py-24 transition-colors duration-300 bg-[radial-gradient(circle_at_top_right,rgba(255,140,0,.08),transparent_30%),#F7F8FA] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,120,0,.15),transparent_35%),#07070A]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:3px_3px] dark:opacity-[0.06]" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{copy[locale].title}</h2>

        <p className="mt-6 max-w-4xl text-[18px] leading-[1.7] text-[#4B5563] dark:text-white/72">
         {copy[locale].intro}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <a
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-md transition-all duration-300 ease-out hover:border-[#FF6200]/40 hover:bg-white dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/30 dark:hover:shadow-[0_0_24px_rgba(255,98,0,.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6200] motion-reduce:transition-none flex items-start gap-4"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#FF6200]/40 bg-[#FF6200]/15 text-[#FF6200] transition-all duration-300 group-hover:bg-[#FF6200]/25 group-hover:shadow-[0_0_16px_rgba(255,98,0,.25)]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground dark:text-white">{card.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70 dark:text-white/70">{card.description[locale]}</p>
                </div>
              </a>
            )
          })}
        </div>

        <p className="mt-10 max-w-5xl text-[18px] leading-[1.7] text-[#4B5563] dark:text-white/72">
          {copy[locale].outro}
        </p>
      </div>
    </section>
  )
}
