"use client"

import { useState } from "react"
import { Search, Layers, Monitor, Server, Plug, Rocket } from "lucide-react"
import Image from "next/image"
import { FAQSection3 } from "@/components/faq-section3"
import { CustomEstimateConsultationSection } from "@/components/custom-estimate-consultation-section"
import { PremiumServices } from "@/components/premium-services"
import { useLocale } from "@/lib/locale-context"

const serviceDetails = [
  {
    title: { en: "Product Scoping", uk: "Визначення обсягу" },
    description: {
      en: "Feature prioritization, user flow mapping, and technical constraints analysis. We define the minimum feature set that tests your core hypothesis — nothing more, nothing that delays launch.",
      uk: "Пріоритизація функцій, карта користувацьких сценаріїв та аналіз технічних обмежень. Визначаємо мінімальний набір функцій для перевірки гіпотези — без зайвого, що затримує запуск.",
    },
    image: "/images/custom-software-development-hero.jpg",
  },
  {
    title: { en: "System Architecture", uk: "Архітектура системи" },
    description: {
      en: "Database schema design, API structure, and third-party integration planning. Architecture decisions made before the first line of code — so the MVP codebase scales into the full product.",
      uk: "Проєктування схеми бази даних, структури API та планування інтеграцій. Архітектурні рішення приймаються до першого рядка коду — щоб кодова база MVP масштабувалась у повноцінний продукт.",
    },
    image: "/images/SaaS.webp",
  },
  {
    title: { en: "Frontend Development", uk: "Фронтенд-розробка" },
    description: {
      en: "Responsive UI, core user flows, and onboarding experience. Built with React or Next.js for web, Flutter for mobile-first products. Clean component architecture ready for future feature additions.",
      uk: "Адаптивний інтерфейс, ключові користувацькі сценарії та онбординг. React або Next.js для вебу, Flutter для мобільних продуктів. Чиста архітектура компонентів для майбутнього розвитку.",
    },
    image: "/lenovo-landing-page-design.jpg",
  },
  {
    title: { en: "Backend Development", uk: "Бекенд-розробка" },
    description: {
      en: "Authentication, business logic, data layer, and API endpoints. Node.js or Python FastAPI for rapid development. Production-grade security and data handling from day one.",
      uk: "Автентифікація, бізнес-логіка, шар даних та API. Node.js або Python FastAPI для швидкої розробки. Продакшн-рівень безпеки та роботи з даними з першого дня.",
    },
    image: "/images/what-is-ERP.jpg",
  },
  {
    title: { en: "Deployment & QA", uk: "Деплой та тестування" },
    description: {
      en: "Production environment setup, CI/CD pipeline, domain and SSL configuration. Functional testing across core flows, cross-browser and device coverage before launch.",
      uk: "Налаштування production-середовища, CI/CD-пайплайн, домен та SSL. Функціональне тестування ключових сценаріїв, кросбраузерність і підтримка пристроїв перед запуском.",
    },
    image: "/images/api-integration.jpg",
  },
]

const process = [
  {
    title: { en: "Discovery", uk: "Визначення обсягу" },
    text: {
      en: "Scoping session, architecture design, tech stack decision, project kickoff",
      uk: "Сесія планування, архітектура, вибір технологій, старт проєкту",
    },
    weeks: { en: "Week 1–2", uk: "Тиждень 1–2" },
  },
  {
    title: { en: "Core Development", uk: "Основна розробка" },
    text: {
      en: "Authentication, data models, primary user flows",
      uk: "Автентифікація, модель даних, ключові сценарії",
    },
    weeks: { en: "Week 3–6", uk: "Тиждень 3–6" },
  },
  {
    title: { en: "Integrations", uk: "Інтеграції" },
    text: {
      en: "Payments, notifications, admin panel, secondary flows",
      uk: "Платежі, сповіщення, адміністративна панель",
    },
    weeks: { en: "Week 7–9", uk: "Тиждень 7–9" },
  },
  {
    title: { en: "QA & Refinement", uk: "Тестування і доопрацювання" },
    text: {
      en: "Bug fixes, performance baseline, cross-device testing",
      uk: "Виправлення помилок, стабілізація, базова оптимізація",
    },
    weeks: { en: "Week 10–11", uk: "Тиждень 10–11" },
  },
  {
    title: { en: "Launch", uk: "Запуск" },
    text: {
      en: "Production release, documentation, repository handoff",
      uk: "Реліз у продакшн, документація, передача репозиторію",
    },
    weeks: { en: "Week 12", uk: "Тиждень 12" },
  },
]

const pageCopy = {
  en: {
    heroTitle: "MVP Development Services for Startups",
    heroSubtitle:
      "Build and Launch Your MVP Faster",
    servicesSubtitle: "What Is Included in MVP Development",
    techTitle: "Recommended Tech Stack",
    techBody:
      "We select the stack that balances speed of development, scalability, and ecosystem maturity. For most SaaS MVP projects:",
    whyTitle: "Why Startups Need MVP Development",
    whyBody:
      "Building a full-featured product before validating demand is the most expensive mistake in startup product development. An MVP lets you test the core value proposition with real users and make architecture decisions based on actual usage patterns, not assumptions.",
    whyCards: [
      ["Validate before full build", "Test core hypothesis with real users before committing your full development budget"],
      ["Investor-ready in 12 weeks", "Working MVP demonstrates execution capability and significantly de-risks the pitch"],
      ["Control capital exposure", "Limit spend while generating the data needed to prioritize the next build phase"],
      ["Architecture that scales", "Production codebase, not a throwaway — built to grow into your full product"],
      ["No scope creep", "Fixed-scope delivery scoped to the minimum feature set that tests your hypothesis"],
    ],
    processTitle: "MVP Development Process",
    mistakesTitle: "Common MVP Mistakes",
    mistakes: [
      ["Too many features", "Every non-core feature delays validation and increases rebuild cost when you pivot"],
      ["Skipping architecture", "Throwaway code forces full rewrites when you scale past the first 1,000 users"],
      ["No QA before launch", "Unfixed bugs in core flows destroy early user trust and skew your validation data"],
      ["Unclear success metrics", "Without defined criteria before launch, you can't act on the feedback you collect"],
      ["Wrong stack", "Over-engineered infrastructure slows MVP cadence and inflates the initial build cost"],
    ],
    costTitle: "MVP Development Cost",
    costBody:
      "We provide fixed-scope estimates after a scoping session — contact us to define your MVP scope and get a precise number.",
    costTiers: [
      {
        label: "Focused SaaS MVP",
        range: "$20,000+",
        desc: "Core user flows, authentication, one primary integration. Web-based, production-ready in 6–10 weeks.",
      },
      {
        label: "Mobile MVP (Flutter)",
        range: "$25,000+",
        desc: "iOS and Android from a single Flutter codebase with core flows and Stripe or backend API integration.",
      },
      {
        label: "Complex MVP",
        range: "$50,000+",
        desc: "Multiple user roles, marketplace mechanics, custom workflows, or compliance-adjacent data handling.",
      },
    ],
    cta: "Start your MVP scoping call",
    finalCta: "6–12 weeks from scoping call to production launch. Let's define your MVP scope and ship it.",
  },
  uk: {
    heroTitle: "Послуги з розробки MVP для стартапів",
    heroSubtitle:
      "Розробка програмного забезпечення для бізнесу, що зростає",
    servicesSubtitle: "Що входить у розробку MVP",
    techTitle: "Рекомендований технологічний стек",
    techBody:
      "Для більшості MVP-проєктів ми обираємо стек, який балансує швидкість розробки, масштабованість і зрілість екосистеми:",
    whyTitle: "Чому стартапам потрібен MVP",
    whyBody:
      "Розробка повноцінного продукту до перевірки попиту — одна з найдорожчих помилок у створенні стартапів. MVP дозволяє перевірити ключову цінність на реальних користувачах і приймати архітектурні рішення на основі реальних даних, а не припущень.",
    whyCards: [
      ["Перевірка до повного білду", "Тестуйте гіпотезу на реальних користувачах до того, як витрачати повний бюджет на розробку"],
      ["Готово для інвесторів за 12 тижнів", "Робочий MVP демонструє здатність команди до виконання та суттєво знижує ризик пітчу"],
      ["Контроль витрат", "Обмежте бюджет на ранньому етапі, отримуючи дані для пріоритизації наступного розвитку"],
      ["Архітектура, що масштабується", "Не одноразовий код — кодова база, яка виростає у повноцінний продукт"],
      ["Без розширення обсягу", "Фіксований скоуп на мінімальному наборі функцій для перевірки гіпотези"],
    ],
    processTitle: "Процес розробки MVP",
    mistakesTitle: "Типові помилки при створенні MVP",
    mistakes: [
      ["Надто багато функцій", "Кожна позаядерна функція затримує перевірку та збільшує витрати на перебудову при піvoті"],
      ["Без архітектурного планування", "Одноразовий код вимагає повного переписування при масштабуванні"],
      ["Без тестування перед запуском", "Баги в ключових сценаріях руйнують довіру ранніх користувачів і спотворюють дані валідації"],
      ["Відсутність метрик успіху", "Без визначених критеріїв до запуску неможливо діяти на основі зворотного зв'язку"],
      ["Неправильний стек", "Надскладна інфраструктура уповільнює темп MVP та збільшує початкову вартість"],
    ],
    costTitle: "Вартість розробки MVP",
    costBody:
      "Остаточна оцінка надається після сесії визначення обсягу — зв'яжіться з нами, щоб визначити скоуп MVP і отримати точну цифру.",
    costTiers: [
      {
        label: "Сфокусований SaaS MVP",
        range: "$20,000 – $45,000",
        desc: "Ключові сценарії, автентифікація, одна основна інтеграція. Веб, готовий до продакшну за 6–10 тижнів.",
      },
      {
        label: "Мобільний MVP (Flutter)",
        range: "$25,000+",
        desc: "iOS та Android з однієї Flutter-кодової бази з основними сценаріями та Stripe або API-інтеграцією.",
      },
      {
        label: "Складний MVP",
        range: "$50,000+",
        desc: "Кілька ролей користувачів, механіка маркетплейсу, кастомні workflow або робота з чутливими даними.",
      },
    ],
    cta: "Розпочати сесію визначення MVP",
    finalCta: "6–12 тижнів від визначення обсягу до запуску продукту. Давайте визначимо ваш MVP і запустимо його.",
  },
} as const

const techIcons: Record<string, string> = {
  React: "/images/react.svg",
  "Next.js": "/images/next.svg",
  Flutter: "/icons/tech/flutter.svg",
  TypeScript: "/icons/tech/typescript.svg",
  "Node.js": "/images/node.svg",
  Python: "/images/python.svg",
  PostgreSQL: "/icons/tech/mssql.svg",
  Firebase: "/icons/tech/firebase.svg",
  Supabase: "/icons/tech/supabase.svg",
  Stripe: "/icons/tech/stripe.svg",
  Vercel: "/icons/tech/vercel.svg",
  AWS: "/images/aws.svg",
  Auth0: "/icons/tech/auth0.svg",
}

export default function MVPDevelopmentPage() {
  const [activeService, setActiveService] = useState(0)
  const { locale } = useLocale()
  const copy = pageCopy[locale]

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <Image
            src="/images/mvp-development-hero.jpg"
            alt="MVP development services for startups"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-white max-w-3xl">{copy.heroTitle}</h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mt-4 leading-relaxed">{copy.heroSubtitle}</p>
        </div>
      </section>

      <PremiumServices />

      {/* What's included — tabbed */}
      <section className="bg-[#eef1f6] text-foreground dark:bg-[#323130] dark:text-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid xl:grid-cols-[420px_1fr] gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">{copy.servicesSubtitle}</h2>
            <div className="border-t border-black/10 dark:border-white/10">
              {serviceDetails.map((service, index) => {
                const isActive = index === activeService
                return (
                  <button
                    key={service.title.en}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left py-4 border-b transition-colors text-lg ${
                      isActive
                        ? "text-[#FF6200] border-[#FF6200]"
                        : "text-foreground/80 border-black/15 dark:text-white/80 dark:border-white/15 hover:text-[#FF6200]"
                    }`}
                  >
                    {service.title[locale]}
                  </button>
                )
              })}
            </div>
          </div>
          <article className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#1b1d23]">
            <div className="relative h-60 md:h-72">
              <Image
                src={serviceDetails[activeService].image}
                alt={serviceDetails[activeService].title[locale]}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-3xl font-semibold mb-3">{serviceDetails[activeService].title[locale]}</h3>
              <p className="text-foreground/70 dark:text-white/70 text-lg leading-relaxed">
                {serviceDetails[activeService].description[locale]}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Tech stack */}
      <section className="overflow-hidden bg-background px-4 py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(300px,0.42fr)_minmax(0,0.58fr)] lg:gap-8 xl:gap-12">
            <div className="max-w-[520px] space-y-6 lg:space-y-8">
              <h2 className="text-5xl font-bold leading-none tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
                {copy.techTitle}
              </h2>
              <p className="max-w-[500px] text-xl leading-[1.8] text-foreground/75 md:text-2xl md:leading-[1.8]">
                {copy.techBody}
              </p>
            </div>
            <div className="hidden min-w-0 lg:flex lg:justify-end">
              <div className="flex w-full max-w-[550px] flex-col gap-8 xl:max-w-[620px] xl:gap-10">
                {[
                  ["Frontend", ["React", "Next.js", "Flutter", "TypeScript"]],
                  ["Backend", ["Node.js", "Python"]],
                  ["Database", ["PostgreSQL", "Firebase", "Supabase"]],
                  ["Payments & Auth", ["Stripe", "Auth0"]],
                  ["Deploy", ["Vercel", "AWS"]],
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
                              <Image
                                src={techIcons[item] || "/images/puzzle.svg"}
                                alt={item}
                                width={20}
                                height={20}
                                className="h-full w-full object-contain"
                              />
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

      {/* Why startups need MVP */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-2xl bg-white dark:bg-[#1f2026] border border-black/10 dark:border-white/10 p-8 md:p-10 grid lg:grid-cols-[420px_1fr] gap-8 items-center">
          <Image
            src="/images/team.png"
            alt="MVP development team"
            width={420}
            height={460}
            className="rounded-xl w-full h-auto object-cover"
          />
          <div>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#111015] sm:text-5xl dark:text-white">
              {copy.whyTitle}
            </h2>
            <p className="text-foreground/75 dark:text-white/75 mb-6 mt-3 text-lg">{copy.whyBody}</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-0 text-lg text-foreground dark:text-white">
              {copy.whyCards.map(([title, text]) => (
                <div key={title} className="border-b border-[#FF6200] pt-5 pb-5 sm:col-span-1">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-foreground/70 dark:text-white/70">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button className="inline-flex w-full items-center justify-center rounded-full bg-[#FF6200] px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-[#e45700] lg:w-[420px]">
                {copy.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl text-center font-semibold mb-3">{copy.processTitle}</h2>
        <div className="rounded-2xl bg-[#f3f5fa] dark:bg-[#1f2026] border border-black/10 dark:border-white/10 p-6 md:p-10 grid md:grid-cols-2 xl:grid-cols-5 gap-6 mt-10">
          {process.map((step, index) => {
            const icons = [Search, Layers, Plug, Monitor, Rocket]
            const Icon = icons[index]
            return (
              <div key={step.title.en}>
                <div className="mb-2">
                  <span className="inline-block text-[#FF6200] text-xs font-semibold uppercase tracking-widest mb-2">
                    {step.weeks[locale]}
                  </span>
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-[#FF6200] shrink-0 mt-1" />
                    <h3 className="text-foreground dark:text-white text-xl leading-tight font-semibold">
                      {step.title[locale]}
                    </h3>
                  </div>
                </div>
                <p className="text-foreground/80 dark:text-white/80 text-[16px] leading-[1.35] pl-8">
                  {step.text[locale]}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Common mistakes */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10">{copy.mistakesTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {copy.mistakes.map(([title, text], i) => (
            <div
              key={title}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#191a20] p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FF6200]/10 text-[#FF6200] text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-foreground dark:text-white">{title}</h3>
              </div>
              <p className="text-sm text-foreground/65 dark:text-white/65 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
          <div className="bg-[#f3f5fa] dark:bg-[#1f2026] px-8 md:px-12 py-10 md:py-12">
            <span className="inline-block text-[#FF6200] text-sm font-semibold uppercase tracking-widest mb-3 font-[Onest]">
              Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight max-w-2xl font-[Onest]">
              {copy.costTitle}
            </h2>
            <p className="mt-4 text-[16px] font-[Onest] text-foreground/60 dark:text-white/60 max-w-2xl">
              {copy.costBody}
            </p>
          </div>
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {copy.costTiers.map((tier, i) => (
              <div
                key={i}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 px-8 md:px-12 py-7 bg-white dark:bg-[#161515] hover:bg-[#fff7f2] dark:hover:bg-[#1f1a17] transition-colors duration-200"
              >
                <span className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-[#FF6200]/30 text-[#FF6200] text-sm font-semibold shrink-0 font-[Onest]">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[16px] font-[Onest] text-foreground dark:text-white">{tier.label}</p>
                  <p className="text-[16px] font-[Onest] text-foreground/55 dark:text-white/55 mt-0.5">{tier.desc}</p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-[16px] font-bold font-[Onest] text-[#FF6200] tabular-nums">{tier.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 pt-2 pb-2 text-center">
        <h3 className="text-2xl md:text-[24px] font-semibold leading-tight">{copy.finalCta}</h3>
      </section>

      <div className="-mt-4">
        <CustomEstimateConsultationSection />
      </div>

      <FAQSection3 />
    </main>
  )
}
