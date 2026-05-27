"use client"

import { useState } from "react"
import { BriefcaseBusiness, CheckCircle2, ClipboardCheck, Rocket, Wrench } from "lucide-react"
import Image from "next/image"
import { FAQSection } from "@/components/faq-section"
import { CustomEstimateConsultationSection } from "@/components/custom-estimate-consultation-section"
import { PremiumServicesOverview } from "@/components/premium-services-overview"
import { useLocale } from "@/lib/locale-context"

const serviceDetails = [
  {
    title: { en: "Web Applications", uk: "Вебзастосунки" },
    description: {
      en: "Full-stack web application development - SPAs, B2B portals, internal tools, and real-time dashboards. Built with clean frontend/backend separation, optimized data layers, and cloud-native deployment on AWS or GCP.",
      uk: "Повноцінна розробка вебзастосунків: SPA, B2B-портали, внутрішні інструменти та дашборди в реальному часі. Чітке розділення frontend/backend, оптимізовані шари даних і cloud-native деплой на AWS або GCP.",
    },
    image: "/mobile-app-testing.png",
  },
  {
    title: { en: "SaaS Platforms", uk: "SaaS-платформи" },
    description: {
      en: "SaaS development from architecture design through multi-tenant infrastructure setup, subscription billing integration, and scalability planning. Systems built to onboard thousands of customers without performance degradation.",
      uk: "Розробка SaaS від проєктування архітектури до налаштування multi-tenant інфраструктури, інтеграції підписочної оплати та планування масштабування. Системи, здатні підключати тисячі клієнтів без втрати продуктивності.",
    },
    image: "/images/SaaS.webp",
  },
  {
    title: { en: "Enterprise Software", uk: "Корпоративне ПЗ" },
    description: {
      en: "Enterprise software development for complex organizational workflows: approval chains, role-based access control, audit logging, ERP integrations, and compliance-ready data architecture.",
      uk: "Розробка корпоративного ПЗ для складних бізнес-процесів: ланцюжки погодження, рольовий доступ, журнал аудиту, ERP-інтеграції та data-архітектура з урахуванням комплаєнсу.",
    },
    image: "/images/what-is-ERP.jpg",
  },
  {
    title: { en: "CRM/ERP Systems", uk: "CRM/ERP системи" },
    description: {
      en: "Custom CRM and ERP development tailored to your sales, operations, or supply chain processes — or deep integrations into Salesforce, SAP, or HubSpot when a hybrid approach is the right call.",
      uk: "Кастомна розробка CRM та ERP під ваші процеси продажів, операцій або ланцюгів постачання — або глибокі інтеграції із Salesforce, SAP чи HubSpot, коли доречний гібридний підхід.",
    },
    image: "/business-meeting-handshake-partnership.jpg",
  },
  {
    title: { en: "API Integrations", uk: "API-інтеграції" },
    description: {
      en: "API integration services connecting internal systems, third-party platforms, and data pipelines. RESTful and GraphQL API design, webhook infrastructure, and integration testing across environments.",
      uk: "Сервіси API-інтеграції для зв’язку внутрішніх систем, сторонніх платформ і data pipelines. Дизайн RESTful та GraphQL API, webhook-інфраструктура та інтеграційне тестування між середовищами.",
    },
    image: "/images/api-integration.jpg",
  },
]

const process = [
  {
    title: { en: "Discovery & architecture", uk: "Дослідження та архітектура" },
    text: {
      en: "Requirements analysis, system design, tech stack selection, project roadmap",
      uk: "Аналіз вимог, проєктування системи, вибір стеку та дорожня карта проєкту",
    },
  },
  {
    title: { en: "Sprint-based development", uk: "Спринтова розробка" },
    text: {
      en: "Two-week cycles with demo-ready deliverables and stakeholder reviews",
      uk: "Двотижневі цикли з демо-результатами та рев’ю зі стейкхолдерами",
    },
  },
  {
    title: { en: "QA & testing", uk: "QA та тестування" },
    text: {
      en: "Automated unit, integration, and e2e testing integrated into CI/CD pipeline",
      uk: "Автоматизовані unit, integration та e2e тести, інтегровані в CI/CD",
    },
  },
  {
    title: { en: "Deployment", uk: "Реліз" },
    text: {
      en: "Containerized release to staging and production with rollback capability",
      uk: "Контейнеризований реліз у staging і production з можливістю rollback",
    },
  },
  {
    title: { en: "Post-launch iteration", uk: "Післярелізні ітерації" },
    text: {
      en: "Ongoing feature development, performance monitoring, and technical support",
      uk: "Подальший розвиток функцій, моніторинг продуктивності та технічна підтримка",
    },
  },
]

const pageCopy = {
  en: {
    heroTitle: "Custom Software Development Services",
    servicesSubtitle: "Software Development Services We Provide",
    techTitle: "Technologies We Use",
    techBody:
      "Our software development company works across a mature, production-proven stack selected for scalability, maintainability, and ecosystem support:",
    industriesTitle: "Industries We Work With",
    whyTitle: "Why Choose Idea Team",
    whyCards: [
      ["Full-stack teams", "Developers, QA, and a PM on every engagement, not lone contractors"],
      ["Transparent process", "Sprint demos, async updates, and direct access to your engineering team"],
      ["Owned codebase", "You get full IP rights, documentation, and repository access from day one"],
      ["Architecture-first approach", "Systems designed to scale before the first line of code is written"],
      ["No scope creep", "Fixed-scope or time-and-materials engagements scoped honestly upfront"],
    ],
    processTitle: "Our Development Process",
    costTitle: "Cost of Custom Software Development",
    costBody:
      "Custom software development cost depends on system complexity, team composition, and engagement duration. A focused web application or internal tool starts at $15,000–$30,000. Mid-complexity SaaS platforms and CRM/ERP systems typically range from $40,000–$120,000. Enterprise software development with complex integrations and compliance requirements scales from $120,000 upward. We scope every project in detail before committing to a number—contact us for a technical estimate based on your specific requirements.",
    cta: "See it in practice",
    whyBody:
      "Idea Team is a custom software development company that treats engineering quality and product thinking as inseparable.",
    finalCta: "Tell us what you're building. We'll scope it, estimate it, and tell you exactly what it takes to ship it right.",
  },
  uk: {
    heroTitle: "Послуги з розробки програмного забезпечення",
    servicesSubtitle: "Послуги з розробки ПЗ, які ми надаємо",
    techTitle: "Технології, які ми використовуємо",
    techBody:
      "Наша компанія працює зі зрілим, перевіреним у продакшені технологічним стеком, обраним з урахуванням масштабованості, підтримуваності та розвиненої екосистеми:",
    industriesTitle: "Галузі, з якими ми працюємо",
    whyTitle: "Чому варто обрати Idea Team",
    whyCards: [
      ["Повноцінні команди розробки", "Інженери, QA та PM на кожному проєкті, а не окремі виконавці"],
      ["Прозорий процес", "Демонстрації кожного спринту, асинхронні оновлення та прямий доступ до інженерної команди"],
      ["Власна кодова база", "Повні права на інтелектуальну власність, документацію та репозиторій з першого дня"],
      ["Архітектура з першого дня", "Системи проєктуються з урахуванням масштабування ще до написання коду"],
      ["Фіксований або погодинний формат", "Без «розширення обсягу робіт», із заздалегідь погодженими умовами та зобов’язаннями"],
    ],
    processTitle: "Наш процес розробки",
    costTitle: "Вартість розробки кастомного програмного забезпечення",
    costBody:
      "Вартість розробки кастомного ПЗ залежить від складності системи, складу команди та тривалості співпраці. Розробка цільового вебзастосунку або внутрішнього інструменту зазвичай стартує від $15,000–$30,000. SaaS-платформи середньої складності та CRM/ERP-системи зазвичай коштують у межах $40,000–$120,000. Корпоративна розробка з комплексними інтеграціями та вимогами комплаєнсу масштабується від $120,000 і вище. Ми детально оцінюємо кожен проєкт перед фіксацією бюджету — зв’яжіться з нами, щоб отримати технічну оцінку під ваші конкретні вимоги.",
    cta: "Дивитися в реальному кейсі",
    whyBody:
      "Idea Team — це компанія з розробки кастомного програмного забезпечення, яка розглядає інженерну якість і продуктовий підхід як єдине ціле. Ми не передаємо код і не зникаємо після релізу - ми залишаємося відповідальними за результат через розгортання, тестування та перші ітерації після запуску.",
    finalCta: "Розкажіть, що ви будуєте. Ми підсумуємо, оцінимо і скажемо вам точно, що потрібно для правильного запуску.",
  },
} as const

const techIcons: Record<string, string> = {
  React: "/images/react.svg",
  Vue: "/images/vue.svg",
  "Next.js": "/images/next.svg",
  TypeScript: "/icons/tech/typescript.svg",
  "Node.js": "/images/node.svg",
  Python: "/images/python.svg",
  Go: "/icons/tech/go.svg",
  PostgreSQL: "/icons/tech/mssql.svg",
  MongoDB: "/icons/tech/mongodb.svg",
  Redis: "/icons/tech/redis.svg",
  AWS: "/images/aws.svg",
  GCP: "/images/gcp.svg",
  Docker: "/images/docker.svg",
  Kubernetes: "/images/kubernetes.svg",
  REST: "/icons/tech/rest.svg",
  GraphQL: "/icons/tech/graphql.svg",
  gRPC: "/icons/tech/grpc.svg",
  "GitHub Actions": "/icons/tech/github.svg",
  Terraform: "/icons/tech/terraform.svg",
}

export default function CustomSoftwareDevelopmentPage() {
  const [activeService, setActiveService] = useState(0)
  const { locale } = useLocale()
  const copy = pageCopy[locale]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <Image src="/images/custom-software-development-hero.jpg" alt="Custom software development services" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-white">{copy.heroTitle}</h1>
        </div>
      </section>

      <PremiumServicesOverview />

      <section className="bg-[#eef1f6] text-foreground dark:bg-[#323130] dark:text-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid xl:grid-cols-[420px_1fr] gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">{copy.servicesSubtitle}</h2>
            <p className="text-base md:text-lg text-foreground/60 dark:text-white/60 mb-6">{copy.servicesSubtitle}</p>
            <div className="border-t border-black/10 dark:border-white/10">
              {serviceDetails.map((service, index) => {
                const isActive = index === activeService
                return (
                  <button
                    key={service.title.en}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left py-4 border-b transition-colors text-lg ${isActive ? "text-[#FF6200] border-[#FF6200]" : "text-foreground/80 border-black/15 dark:text-white/80 dark:border-white/15 hover:text-[#FF6200]"}`}
                  >
                    {service.title[locale]}
                  </button>
                )
              })}
            </div>
          </div>
          <article className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#1b1d23]">
            <div className="relative h-60 md:h-72">
              <Image src={serviceDetails[activeService].image} alt={serviceDetails[activeService].title[locale]} fill className="object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-3xl font-semibold mb-3">{serviceDetails[activeService].title[locale]}</h3>
              <p className="text-foreground/70 dark:text-white/70 text-lg leading-relaxed">{serviceDetails[activeService].description[locale]}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="overflow-hidden bg-background px-4 py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(300px,0.42fr)_minmax(0,0.58fr)] lg:gap-8 xl:gap-12">
            <div className="max-w-[520px] space-y-6 lg:space-y-8">
              <h2 className="text-5xl font-bold leading-none tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">{copy.techTitle}</h2>
              <p className="max-w-[500px] text-xl leading-[1.8] text-foreground/75 md:text-2xl md:leading-[1.8]">{copy.techBody}</p>
            </div>
            <div className="hidden min-w-0 lg:flex lg:justify-end">
              <div className="flex w-full max-w-[550px] flex-col gap-8 xl:max-w-[620px] xl:gap-10">
                {[
                  ["Frontend", ["React", "Vue", "Next.js", "TypeScript"]],
                  ["Backend", ["Node.js", "Python", "Go"]],
                  ["Databases", ["PostgreSQL", "MongoDB", "Redis"]],
                  ["Cloud", ["AWS", "GCP", "Docker", "Kubernetes"]],
                  ["APIs", ["REST", "GraphQL", "gRPC"]],
                  ["CI/CD", ["GitHub Actions", "Terraform"]],
                ].map(([title, items]) => (
                  <div key={title as string} className="flex w-full flex-col">
                    <div className="flex w-full flex-col gap-4 lg:w-auto">
                      <div className="flex items-center gap-4 pl-1 text-sm font-semibold uppercase tracking-[0.02em] text-foreground/55">
                        <span className="h-px w-8 bg-foreground/35" aria-hidden="true" />
                        <span>{title as string}</span>
                      </div>
                      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:w-auto lg:flex-nowrap lg:gap-2.5 xl:gap-3">
                        {(items as string[]).map((item) => (
                          <div
                            key={item}
                            className="group flex min-h-[61px] min-w-0 items-center gap-3 rounded-2xl border border-[var(--tech-card-border)] bg-[var(--tech-card)] px-3 py-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:[background:linear-gradient(180deg,#FAF9F8_0%,#FF6200_150%)] dark:hover:[background:linear-gradient(180deg,#161515_0%,#FF6200_150%)] sm:min-h-[66px] sm:gap-4 sm:px-4 lg:h-[62px] lg:w-[130px] lg:gap-2 lg:px-2.5 xl:h-[67px] xl:w-[146px] xl:gap-3 xl:px-3"
                          >
                            <div className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-lg bg-white p-[5px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                              <Image src={techIcons[item] || "/images/puzzle.svg"} alt={item} width={20} height={20} className="h-full w-full object-contain" />
                            </div>
                            <span className="min-w-0 break-words text-sm font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-white sm:text-base lg:text-xs xl:text-sm">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl md:text-5xl text-center font-semibold mb-10">{copy.industriesTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["FinTech", "/samsung-product-showcase.jpeg", "Payment infrastructure, lending platforms, financial reporting systems"],
            ["HealthTech", "/ehealth.jpg", "HIPAA-compliant patient management, clinical workflow automation, telehealth platforms"],
            ["EdTech", "/lenovo-landing-page-design.jpg", "LMS platforms, adaptive learning systems, certification infrastructure"],
            ["Logistics", "/original.webp", "Route optimization, warehouse management, real-time tracking systems"],
            ["Retail & eCommerce", "/ecommerce-landing-page-design-multiple-brands.jpg", "Custom storefronts, inventory management, B2B ordering portals"],
            ["SaaS startups", "/fintech-apps-development.jpg", "Product development from MVP through scaled multi-tenant architecture"],
          ].map(([name, image, description]) => (
            <article key={name} className="rounded-2xl overflow-hidden bg-white dark:bg-[#191a20] border border-black/10 dark:border-white/10">
              <div className="relative h-48">
                <Image src={image as string} alt={name as string} fill className="object-cover" />
                <span className="absolute left-3 top-3 rounded-lg bg-[#FF6200] px-3 py-1 text-sm">{name}</span>
              </div>
              <p className="p-4 text-foreground dark:text-white text-sm">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-2xl bg-white dark:bg-[#1f2026] border border-black/10 dark:border-white/10 p-8 md:p-10 grid lg:grid-cols-[420px_1fr] gap-8 items-center">
          <Image src="/images/team.png" alt="Team" width={420} height={460} className="rounded-xl w-full h-auto object-cover" />
          <div>
            <h2 className="text-4xl md:text-6xl font-semibold mb-3">{copy.whyTitle}</h2>
            <p className="text-base md:text-lg text-foreground/60 dark:text-white/60 mb-6">{copy.whyChooseSubtitle}</p>
            <p className="text-foreground/75 dark:text-white/75 mb-6 text-lg">{copy.whyBody}</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-0 text-lg text-foreground dark:text-white">
              {copy.whyCards.map(([title, text]) => (
                <div key={title} className="border-b border-[#FF6200] pt-5 pb-5 sm:col-span-1">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-foreground/70 dark:text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button className="inline-flex w-full items-center justify-center rounded-full bg-[#FF6200] px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-[#e45700] lg:w-[420px]">
            {copy.cta}
          </button>
        </div>
      </section>

      <section className="py-14 px-4 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-[#f3f5fa] dark:bg-[#1f2026] border border-black/10 dark:border-white/10 p-6 md:p-10">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">{copy.costTitle}</h2>
          <p className="text-lg text-foreground/75 dark:text-white/75">{copy.costBody}</p>
        </div>
      </section>

      <section className="py-14 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl text-center font-semibold mb-3">{copy.processTitle}</h2>
        <p className="text-center text-base md:text-lg text-foreground/60 dark:text-white/60 mb-10">{copy.processTitle}</p>
        <div className="rounded-2xl bg-[#f3f5fa] dark:bg-[#1f2026] border border-black/10 dark:border-white/10 p-6 md:p-10 grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          {process.map((step, index) => {
            const icons = [BriefcaseBusiness, ClipboardCheck, CheckCircle2, Rocket, Wrench]
            const Icon = icons[index]
            return (
              <div key={step.title.en}>
                <div className="mb-2">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-[#FF6200] shrink-0 mt-1" />
                    <h3 className="text-foreground dark:text-white text-xl md:text-xl leading-tight font-semibold scroll-animate visible">{step.title[locale]}</h3>
                  </div>
                </div>
                <p className="text-foreground/80 dark:text-white/80 text-[16px] leading-[1.35] pl-8">{step.text[locale]}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-2 pb-2 text-center">
        <h3 className="text-2xl md:text-[24px] font-semibold leading-tight">{copy.finalCta}</h3>
      </section>

      <div className="-mt-4">
        <CustomEstimateConsultationSection />
      </div>

      <FAQSection />
    </main>
  )
}
