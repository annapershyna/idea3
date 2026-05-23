"use client"

import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { AnimatedSection } from "@/components/AnimatedSection"

export default function CustomSoftwareDevelopmentPage() {
  const { locale } = useLocale()
  const isUk = locale === "uk"

  const content = {
    heroTitle: isUk ? "Послуги кастомної розробки ПЗ" : "Custom Software Development Services",
    heroSubtitle: isUk
      ? "Кастомна розробка програмного забезпечення для бізнесів, що зростають"
      : "Custom Software Development for Growing Businesses",
    intro: isUk
      ? "Готові платформи задають межу можливостей продукту. Кастомна розробка прибирає цю межу. Ми проєктуємо й створюємо масштабовані рішення: вебзастосунки, SaaS-платформи, enterprise-системи, CRM/ERP та API-інтеграції."
      : "Off-the-shelf platforms set the ceiling for what your product can do. Custom software development removes it. We design and engineer scalable software solutions: web applications, SaaS platforms, enterprise software, CRM/ERP systems, and API integrations.",
  }

  const problems = isUk
    ? [
        "Усунення регулярних SaaS-витрат завдяки власній масштабованій архітектурі",
        "Інтеграція систем через кастомні API там, де типові платформи не справляються",
        "Автоматизація бізнес-процесів, які не покриваються шаблонними інструментами",
        "Швидший запуск конкурентних фіч без залежності від чужого roadmap",
        "Повний контроль над даними, безпекою та комплаєнсом",
      ]
    : [
        "Eliminate recurring SaaS licensing costs with owned, scalable software architecture",
        "Integrate systems that generic platforms can't connect via custom API integration services",
        "Automate business-specific workflows that no off-the-shelf tool covers",
        "Build competitive features faster without waiting on a vendor's product roadmap",
        "Maintain full data control and security compliance across your stack",
      ]

  const services = [
    ["Web Applications", isUk ? "SPA, B2B-портали, внутрішні інструменти й real-time дашборди." : "SPAs, B2B portals, internal tools, and real-time dashboards."],
    ["SaaS Platforms", isUk ? "Архітектура, multi-tenant інфраструктура, білінг і план масштабування." : "Architecture design, multi-tenant infrastructure, subscription billing, and scalability planning."],
    ["Enterprise Software", isUk ? "Складні workflow, RBAC, аудит, ERP-інтеграції та комплаєнс." : "Complex workflows, RBAC, audit logs, ERP integrations, and compliance-ready architecture."],
    ["CRM/ERP Systems", isUk ? "Кастомні CRM/ERP або гібридна інтеграція з Salesforce, SAP, HubSpot." : "Custom CRM/ERP or deep integrations with Salesforce, SAP, and HubSpot."],
    ["API Integrations", isUk ? "REST/GraphQL API, webhook-інфраструктура та інтеграційне тестування." : "RESTful and GraphQL APIs, webhook infrastructure, and integration testing."],
  ]

  const faq = [
    {
      q: isUk ? "Що таке кастомна розробка ПЗ?" : "What is custom software development?",
      a: isUk
        ? "Це проєктування та розробка програмного забезпечення під конкретні процеси, дані й технічні вимоги однієї компанії."
        : "It is the process of designing and engineering software tailored to one organization's workflows, data model, and requirements.",
    },
    {
      q: isUk ? "Скільки це коштує?" : "How much does custom software development cost?",
      a: isUk
        ? "Фокусні рішення стартують від $15,000–$30,000, середні SaaS/CRM/ERP — $40,000–$120,000, складні enterprise-системи — від $120,000+."
        : "Focused applications start around $15,000–$30,000, mid-complexity SaaS/CRM/ERP systems typically range from $40,000–$120,000, and complex enterprise software starts from $120,000+.",
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="pt-40 pb-16 px-6">
        <AnimatedSection className="max-w-[1280px] mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#FF6200] to-foreground bg-clip-text text-transparent">{content.heroTitle}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">{content.heroSubtitle}</p>
          <p className="max-w-4xl mx-auto text-base md:text-lg text-muted-foreground leading-8">{content.intro}</p>
        </AnimatedSection>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-6">
          {problems.map((item, index) => (
            <AnimatedSection key={item} delay={index * 70} className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm hover:border-[#FF6200]/50 transition-colors">
              <p className="leading-7">{item}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">{isUk ? "Які сервіси ми надаємо" : "Software Development Services We Provide"}</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {services.map(([title, desc], index) => (
              <AnimatedSection key={title} delay={index * 80} className="rounded-2xl p-6 border border-border bg-background/60 hover:shadow-lg hover:shadow-[#FF6200]/10 transition-all">
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <AnimatedSection className="max-w-[1280px] mx-auto rounded-3xl border border-border bg-gradient-to-br from-background to-muted/40 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">{isUk ? "Вартість кастомної розробки" : "Cost of Custom Software Development"}</h2>
          <p className="text-lg text-muted-foreground leading-8">
            {isUk
              ? "Вартість залежить від складності системи, складу команди та тривалості співпраці. Невеликі вебзастосунки стартують від $15,000–$30,000, SaaS/CRM/ERP середньої складності — $40,000–$120,000, enterprise-рішення з інтеграціями та комплаєнсом — від $120,000+."
              : "Custom software development cost depends on system complexity, team composition, and engagement duration. Focused applications start at $15,000–$30,000, mid-complexity SaaS/CRM/ERP platforms range from $40,000–$120,000, and enterprise systems with complex integrations and compliance requirements start from $120,000+."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-[#FF6200] px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity">
              {isUk ? "Отримати технічну оцінку" : "Get a technical estimate"}
            </Link>
            <Link href="/projects" className="inline-flex items-center rounded-full border border-border px-6 py-3 font-medium hover:border-[#FF6200] transition-colors">
              {isUk ? "Переглянути кейси" : "See it in practice"}
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">FAQ</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <AnimatedSection key={item.q} delay={index * 90} className="rounded-2xl border border-border bg-card/40 p-6">
                <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
