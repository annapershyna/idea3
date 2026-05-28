"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Activity,
  BarChart3,
  Boxes,
  CheckCircle2,
  CloudCog,
  Code2,
  Database,
  Gauge,
  Globe2,
  LockKeyhole,
  Network,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react"
import { RequestConsultationSection } from "@/components/request-consultation-section"
import { useLocale } from "@/lib/locale-context"

const services = [
  {
    title: { en: "SPA development", uk: "SPA розробка" },
    description: {
      en: "React or Vue single-page applications with optimized rendering, state management, and API integration.",
      uk: "React або Vue single-page applications з оптимізованим рендерингом, state management і API інтеграцією.",
    },
    image: "/images/web-application-coding-1024x683.jpg",
  },
  {
    title: { en: "Admin dashboards and analytics", uk: "Admin дашборди і аналітика" },
    description: {
      en: "Real-time data visualization, role-based access, export pipelines, and decision-ready reporting interfaces.",
      uk: "Візуалізація даних у режимі реального часу, рольовий доступ, пайплайни експорту та звітність для прийняття рішень.",
    },
    image: "/analytics-charts-and-graphs.jpg",
  },
  {
    title: { en: "B2B portals", uk: "B2B портали" },
    description: {
      en: "Client-facing platforms with custom workflows, document management, approvals, and third-party integrations.",
      uk: "Клієнтські платформи з кастомізованими робочими процесами, управлінням документами, погодженнями і сторонніми інтеграціями.",
    },
    image: "/developers-collaborating-on-project.jpg",
  },
  {
    title: { en: "Internal tools", uk: "Внутрішні інструменти" },
    description: {
      en: "Operational tooling for teams that outgrow spreadsheets, manual approvals, and off-the-shelf software limits.",
      uk: "Операційні інструменти для команд, які переросли spreadsheets, ручні погодження і обмеження готових рішень.",
    },
    image: "/inventory-management-dashboard.png",
  },
  {
    title: { en: "API-first platforms", uk: "API-first платформи" },
    description: {
      en: "Backend services and API layers that power web, mobile, and third-party consumers simultaneously.",
      uk: "Backend сервіси і API шари, що одночасно підтримують web, mobile і сторонніх споживачів.",
    },
    image: "/images/api-integration.jpg",
  },
] as const

const stacks = [
  { label: "Frontend", items: ["React", "Vue", "Next.js", "TypeScript"], icon: Code2 },
  { label: "Backend", items: ["Node.js", "Python", "Go"], icon: Server },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"], icon: Database },
  { label: "Cloud", items: ["AWS", "GCP", "Docker", "Kubernetes"], icon: CloudCog },
  { label: "API layer", items: ["REST", "GraphQL", "gRPC"], icon: Network },
  { label: "CI/CD", items: ["GitHub Actions", "Terraform", "Vercel"], icon: TerminalSquare },
] as const

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
  Terraform: "/icons/tech/terraform.svg",
  Vercel: "/icons/tech/vercel.svg",
}

const copy = {
  en: {
    heroTitle: "Web Application Development Services",
    heroSubtitle: "Scalable Web Applications for Modern Businesses",
    intro:
      "We build scalable web applications with clean frontend/backend separation, optimized data layers, and cloud-native architecture — engineered for performance, security, and long-term maintainability. From SPAs and real-time dashboards to B2B portals and internal tooling, every system is designed to handle growing user load without architectural rewrites.",
    introStat: "Up to 35% lower infrastructure costs through efficient resource utilization and load optimization.",
    servicesTitle: "Custom Web Development Services",
    practiceCta: "See it in practice",
    frontendBackendTitle: "Frontend and Backend Development",
    frontendBackendText:
      "Our frontend development company delivers performant, accessible UIs built with React or Vue, TypeScript, and component systems designed for long-term maintainability. On the backend, we engineer Node.js and Python services with documented REST or GraphQL APIs, structured error handling, rate limiting, and authentication middleware. Frontend and backend are developed in parallel with contract-first API design, eliminating integration delays.",
    frontend: {
      title: "Frontend",
      text: "React, Vue, Next.js, TypeScript, Tailwind — optimized for Core Web Vitals, accessibility standards, and cross-browser compatibility.",
    },
    backend: {
      title: "Backend",
      text: "Node.js, Python (FastAPI / Django), Go — stateless service architecture, PostgreSQL and MongoDB data layers, Redis caching, JWT and OAuth2 authentication.",
    },
    techTitle: "Technologies We Use",
    architectureTitle: "Web Application Architecture",
    architectureText:
      "Architecture decisions made early determine how much future development costs. We design cloud web applications with modular, service-oriented architecture: separated concerns, stateless services, horizontal scalability, and infrastructure-as-code from the start. This approach allows teams to add features, scale specific services under load, and onboard new developers without reverse-engineering a monolith.",
    architectureCards: [
      ["Separated concerns", "Frontend, APIs, data layers, and infrastructure stay modular and easy to replace."],
      ["Horizontal scalability", "Stateless services scale independently under peak load without rewriting the product."],
      ["Documented decisions", "Every architectural choice includes rationale, trade-offs, and future extension paths."],
    ],
    securityTitle: "Performance and Security",
    securityItems: [
      "Load testing under 2x projected peak traffic before production release",
      "Core Web Vitals optimization — LCP under 2.5s, CLS under 0.1, FID under 100ms",
      "OWASP Top 10 security coverage — input validation, injection prevention, auth hardening",
      "HTTPS enforcement, CSP headers, rate limiting on all public API endpoints",
      "Automated security scanning integrated into CI/CD pipeline",
    ],
    costTitle: "Cost of Web Application Development",
    costText:
      "Web application development cost depends on system complexity, number of integrations, and team size. We scope the architecture, delivery phases, and team composition before committing to a final estimate.",
    costTiers: [
      ["Focused internal tool", "$12,000 – $25,000", "Single-feature web app, internal workflow, or operational dashboard."],
      ["Mid-complexity application", "$30,000 – $80,000", "Multiple roles, custom workflows, integrations, and admin capabilities."],
      ["Large-scale platform", "$80,000+", "Real-time features, complex data architecture, high availability, and advanced scaling requirements."],
    ],
    ctaTitle: "Tell us what you're building.",
    ctaText: "We'll review your requirements and propose the right architecture and timeline.",
    ctaButton: "Get a web app estimate",
    faqTitle: "FAQ",
    faq: [
      ["What is the difference between a website and a web application?", "A website is primarily informational and static. A web application is interactive: it processes user input, manages state, authenticates users, and connects to backend services. Most SaaS products, portals, and dashboards are web applications."],
      ["How much does web application development cost?", "From $12,000 for a focused tool to $80,000+ for a complex platform. The primary cost drivers are number of user roles, real-time features, third-party integrations, and compliance requirements."],
      ["What technologies are best for web apps?", "For most products: React or Next.js on the frontend, Node.js or Python on the backend, PostgreSQL for structured data, Redis for caching, deployed on AWS or GCP. Tech stack is always selected for your specific scalability and maintenance requirements."],
      ["How long does web development take?", "A focused application: 6–10 weeks. A mid-complexity platform: 3–5 months. A large-scale system with complex integrations: 5–9 months. Timeline is defined precisely during scoping."],
      ["How do you scale a web application?", "Through horizontal scaling of stateless services, database read replicas, Redis caching for hot data, CDN for static assets, and auto-scaling groups on AWS or GCP. We configure this infrastructure from day one, not as a retrofit."],
    ],
  },
  uk: {
    heroTitle: "Послуги з розробки web-додатків",
    heroSubtitle: "Масштабовані web-додатки для сучасного бізнесу",
    intro:
      "Ми будуємо масштабовані web-додатки з чітким розділенням frontend/backend, оптимізованими шарами даних і нативною хмарною архітектурою — розроблені для продуктивності, безпеки і довгострокової підтримуваності. Від SPA і дашбордів у режимі реального часу до B2B порталів і внутрішніх інструментів — кожна система спроектована для обробки зростаючого навантаження без архітектурних переписувань.",
    introStat: "До 35% нижчі витрати на інфраструктуру завдяки ефективному використанню ресурсів і оптимізації навантаження.",
    servicesTitle: "Custom Web Development Services",
    practiceCta: "Подивитись на практиці",
    frontendBackendTitle: "Frontend і Backend розробка",
    frontendBackendText:
      "Наша компанія надає продуктивні, доступні UI, побудовані з React або Vue, TypeScript і component systems, запроектованими для довгострокової підтримуваності. На backend ми розробляємо Node.js і Python сервіси з задокументованими REST або GraphQL API, структурованою обробкою помилок, rate limiting і authentication middleware. Frontend і backend розробляються паралельно з contract-first API design, що усуває затримки інтеграції.",
    frontend: {
      title: "Frontend",
      text: "React, Vue, Next.js, TypeScript, Tailwind — оптимізовані для Core Web Vitals, стандартів доступності і кросбраузерної сумісності.",
    },
    backend: {
      title: "Backend",
      text: "Node.js, Python (FastAPI / Django), Go — stateless service архітектура, PostgreSQL і MongoDB data layers, Redis кешування, JWT і OAuth2 автентифікація.",
    },
    techTitle: "Технології, які ми використовуємо",
    architectureTitle: "Архітектура web-додатків",
    architectureText:
      "Архітектурні рішення, прийняті на ранніх етапах, визначають вартість майбутньої розробки. Ми проектуємо cloud web applications з модульною, service-oriented архітектурою: розмежування зон відповідальності, stateless services, горизонтальна масштабованість і infrastructure-as-code з самого початку. Цей підхід дозволяє командам додавати фічі, масштабувати конкретні сервіси під навантаженням і онбордити нових розробників без зворотного проектування моноліту.",
    architectureCards: [
      ["Розмежування відповідальності", "Frontend, API, data layers та інфраструктура залишаються модульними й керованими."],
      ["Горизонтальне масштабування", "Stateless сервіси масштабуються незалежно під піковим навантаженням без переписування продукту."],
      ["Документовані рішення", "Кожен архітектурний вибір має обґрунтування, trade-offs і шлях подальшого розвитку."],
    ],
    securityTitle: "Продуктивність і безпека",
    securityItems: [
      "Load testing при 2x від прогнозованого пікового трафіку до production релізу",
      "Core Web Vitals оптимізація — LCP менше 2.5s, CLS менше 0.1, FID менше 100ms",
      "OWASP Top 10 security coverage — валідація введення, захист від атак, посилення автентифікації",
      "HTTPS enforcement, CSP headers, rate limiting на всіх публічних API ендпоінтах",
      "Автоматизоване захисне сканування, інтегроване в CI/CD пайплайн",
    ],
    costTitle: "Вартість розробки web-додатків",
    costText:
      "Вартість web application development залежить від складності системи, кількості інтеграцій і розміру команди. Ми визначаємо архітектуру, етапи delivery і склад команди перед фінальною оцінкою.",
    costTiers: [
      ["Сфокусований internal tool", "$12,000 – $25,000", "Single-feature web app, внутрішній workflow або операційний дашборд."],
      ["Додаток середньої складності", "$30,000 – $70,000", "Кілька ролей користувачів, кастомні workflow, інтеграції та admin capabilities."],
      ["Великомасштабна платформа", "$80,000+", "Real-time features, складна архітектура даних, high availability і вимоги до масштабування."],
    ],
    ctaTitle: "Розкажіть, що ви будуєте.",
    ctaText: "Ми розглянемо ваші вимоги і запропонуємо правильну архітектуру та таймлайн.",
    ctaButton: "Отримати оцінку web-додатку",
    faqTitle: "FAQ",
    faq: [
      ["У чому різниця між сайтом і web-додатком?", "Сайт переважно інформаційний і статичний. Web-додаток інтерактивний — він обробляє введення користувача, управляє станом, автентифікує користувачів і підключається до backend сервісів. Більшість SaaS продуктів, порталів і дашбордів — це web-додатки."],
      ["Скільки коштує розробка web-додатку?", "Від $12,000 за сфокусований інструмент до $80,000+ за складну платформу. Основні фактори вартості — кількість user roles, real-time фічі, сторонні інтеграції і вимоги compliance."],
      ["Які технології найкращі для web-додатків?", "Для більшості продуктів: React або Next.js на frontend, Node.js або Python на backend, PostgreSQL для структурованих даних, Redis для кешування, задеплоєно на AWS або GCP. Tech stack завжди обирається під ваші конкретні вимоги масштабованості й підтримки."],
      ["Скільки часу займає web розробка?", "Сфокусований додаток: 6–10 тижнів. Mid-complexity платформа: 3–5 місяців. Великомасштабна система зі складними інтеграціями: 5–9 місяців. Таймлайн визначається точно під час скопінгу."],
      ["Як масштабувати web-додаток?", "Через горизонтальне масштабування stateless сервісів, database read replicas, Redis кешування для hot data, CDN для статичних assets і auto-scaling groups на AWS або GCP. Ми налаштовуємо цю інфраструктуру з першого дня, а не як retrofit."],
    ],
  },
} as const

export default function WebApplicationDevelopmentPage() {
  const [activeService, setActiveService] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const { locale } = useLocale()
  const page = copy[locale]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/web-application-coding-1024x683.jpg"
            alt="Web application development services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur">
            Full-stack web engineering
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">{page.heroTitle}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl">{page.heroSubtitle}</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.10),transparent_32%),#F7F8FA] px-4 py-16 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.18),transparent_36%),#07070A] md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#111_0.5px,transparent_0.5px)] [background-size:3px_3px] dark:[background-image:radial-gradient(#fff_0.5px,transparent_0.5px)]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <p className="text-[18px] leading-[1.8] text-[#4B5563] dark:text-white/72 md:text-xl">{page.intro}</p>
          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#191a20]">
            <Gauge className="mb-5 h-10 w-10 text-[#FF6200]" />
            <p className="text-2xl font-semibold leading-tight text-foreground dark:text-white">{page.introStat}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#eef1f6] px-4 py-14 text-foreground dark:bg-[#323130] dark:text-white">
        <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[420px_1fr]">
          <div>
            <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{page.servicesTitle}</h2>
            <div className="border-t border-black/10 dark:border-white/10">
              {services.map((service, index) => {
                const isActive = activeService === index
                return (
                  <button
                    key={service.title.en}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className={`w-full border-b py-4 text-left text-lg transition-colors ${
                      isActive
                        ? "border-[#FF6200] text-[#FF6200]"
                        : "border-black/15 text-foreground/80 hover:text-[#FF6200] dark:border-white/15 dark:text-white/80"
                    }`}
                  >
                    {service.title[locale]}
                  </button>
                )
              })}
            </div>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF6200] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e45700]">
              {page.practiceCta}
              <CheckCircle2 className="h-5 w-5" />
            </button>
          </div>
          <article className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#1b1d23]">
            <div className="relative h-60 md:h-72">
              <Image src={services[activeService].image} alt={services[activeService].title[locale]} fill className="object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="mb-3 text-3xl font-semibold">{services[activeService].title[locale]}</h3>
              <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
                {services[activeService].description[locale]}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">{page.frontendBackendTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70 dark:text-white/70">{page.frontendBackendText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { ...page.frontend, Icon: Globe2 },
              { ...page.backend, Icon: Boxes },
            ].map(({ title, text, Icon }) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white p-7 dark:border-white/10 dark:bg-[#191a20]">
                <Icon className="mb-5 h-10 w-10 text-[#FF6200]" />
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/65 dark:text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-background px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-4xl font-bold leading-none tracking-[-0.04em] md:text-6xl">{page.techTitle}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stacks.map(({ label, items, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-[var(--tech-card-border)] bg-[var(--tech-card)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.08em] text-foreground/55">
                  <Icon className="h-5 w-5 text-[#FF6200]" />
                  {label}
                </div>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <div key={item} className="group flex min-h-[56px] items-center gap-3 rounded-2xl border border-black/10 bg-white px-3 py-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:[background:linear-gradient(180deg,#FAF9F8_0%,#FF6200_150%)] dark:border-white/10 dark:bg-[#161515] dark:hover:[background:linear-gradient(180deg,#161515_0%,#FF6200_150%)]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                        <Image src={techIcons[item] || "/images/puzzle.svg"} alt={item} width={22} height={22} className="h-full w-full object-contain" />
                      </span>
                      <span className="text-sm font-semibold transition-colors group-hover:text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-8 rounded-2xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-[#1f2026] md:p-10 lg:grid-cols-[420px_1fr] lg:items-center">
          <Image src="/developers-collaborating.jpg" alt="Web application architecture planning" width={420} height={460} className="h-full min-h-[320px] w-full rounded-xl object-cover" />
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-[#111015] dark:text-white sm:text-5xl">{page.architectureTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/75 dark:text-white/75">{page.architectureText}</p>
            <div className="mt-4 grid gap-x-6 text-lg text-foreground dark:text-white sm:grid-cols-3">
              {page.architectureCards.map(([title, text]) => (
                <div key={title} className="border-b border-[#FF6200] pb-5 pt-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-base text-foreground/70 dark:text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <ShieldCheck className="mb-5 h-12 w-12 text-[#FF6200]" />
            <h2 className="text-3xl font-semibold md:text-5xl">{page.securityTitle}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.securityItems.map((item, index) => {
              const icons = [Activity, Gauge, LockKeyhole, ShieldCheck, CloudCog]
              const Icon = icons[index]
              return (
                <div key={item} className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]">
                  <Icon className="mb-4 h-7 w-7 text-[#FF6200]" />
                  <p className="leading-relaxed text-foreground/75 dark:text-white/75">{item}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <div className="bg-[#f3f5fa] px-8 py-10 dark:bg-[#1f2026] md:px-12 md:py-12">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#FF6200]">Pricing</span>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">{page.costTitle}</h2>
            <p className="mt-4 max-w-2xl text-[16px] text-foreground/60 dark:text-white/60">{page.costText}</p>
          </div>
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {page.costTiers.map(([label, range, desc], index) => (
              <div key={label} className="group flex flex-col gap-4 bg-white px-8 py-7 transition-colors duration-200 hover:bg-[#fff7f2] dark:bg-[#161515] dark:hover:bg-[#1f1a17] sm:flex-row sm:items-center sm:gap-8 md:px-12">
                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FF6200]/30 text-sm font-semibold text-[#FF6200] sm:flex">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground dark:text-white">{label}</p>
                  <p className="mt-0.5 text-foreground/55 dark:text-white/55">{desc}</p>
                </div>
                <span className="shrink-0 font-bold tabular-nums text-[#FF6200]">{range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-2 text-center">
        <div className="rounded-3xl bg-[#1E1E1E] px-6 py-10 text-white md:px-10 md:py-12">
          <BarChart3 className="mx-auto mb-5 h-10 w-10 text-[#FF6200]" />
          <h2 className="text-3xl font-semibold md:text-5xl">{page.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/72">{page.ctaText}</p>
          <a href="#web-app-estimate" className="mt-8 inline-flex rounded-full bg-[#FF6200] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#e45700]">
            {page.ctaButton}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center text-4xl font-semibold md:text-6xl">{page.faqTitle}</h2>
        <div className="divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-[#191a20]">
          {page.faq.map(([question, answer], index) => {
            const isOpen = openFaq === index
            return (
              <button key={question} onClick={() => setOpenFaq(isOpen ? -1 : index)} className="w-full px-6 py-5 text-left transition-colors hover:bg-[#fff7f2] dark:hover:bg-[#1f1a17] md:px-8">
                <span className="flex items-center justify-between gap-4 text-lg font-semibold">
                  {question}
                  <span className="text-2xl text-[#FF6200]">{isOpen ? "−" : "+"}</span>
                </span>
                {isOpen && <span className="mt-3 block max-w-4xl leading-relaxed text-foreground/65 dark:text-white/65">{answer}</span>}
              </button>
            )
          })}
        </div>
      </section>

      <div id="web-app-estimate" className="-mt-4">
        <RequestConsultationSection />
      </div>
    </main>
  )
}
