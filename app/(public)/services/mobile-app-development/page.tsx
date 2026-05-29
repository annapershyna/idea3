"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  Bell,
  ClipboardCheck,
  CloudUpload,
  Code2,
  CreditCard,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Rocket,
  Settings,
  Smartphone,
  Store,
  TabletSmartphone,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { FAQSection5 } from "@/components/faq-section5";
import { useLocale } from "@/lib/locale-context";

const services = [
  {
    title: { en: "Native iOS in Swift", uk: "Нативна iOS розробка на Swift" },
    description: {
      en: "SwiftUI and UIKit, CoreData, HealthKit, ARKit, and StoreKit integrations for platform-native iPhone and iPad applications.",
      uk: "SwiftUI та UIKit, інтеграція Core Data, HealthKit, ARKit і StoreKit для платформо-нативних iPhone та iPad застосунків.",
    },
    image: "/images/Mobile-App.webp",
  },
  {
    title: {
      en: "Native Android in Kotlin",
      uk: "Нативна Android розробка на Kotlin",
    },
    description: {
      en: "Jetpack Compose, Room, WorkManager, Google Play Billing, and Google Pay integrations for production Android apps.",
      uk: "Jetpack Compose, Room, WorkManager, Google Play Billing та Google Pay інтеграції для production Android застосунків.",
    },
    image: "/mobile-app-testing.png",
  },
  {
    title: { en: "Platform-specific UX", uk: "Платформо-специфічний UX" },
    description: {
      en: "Human Interface Guidelines compliance for iOS and Material Design patterns for Android, with interaction details tuned for each platform.",
      uk: "Відповідність Human Interface Guidelines для iOS та Material Design для Android із деталями взаємодії, адаптованими під кожну платформу.",
    },
    image: "/mobile-responsive-design.png",
  },
  {
    title: { en: "Store review management", uk: "Управління рев’ю у сторах" },
    description: {
      en: "App Store and Google Play submission, rejection handling, metadata preparation, compliance checks, and release coordination.",
      uk: "Подача в App Store і Google Play, опрацювання відхилень, підготовка metadata, compliance checks та координація релізу.",
    },
    image: "/images/projects-mobile-card.png",
  },
] as const;

const stacks = [
  {
    label: "Cross-platform",
    items: ["Flutter", "Dart", "Firebase"],
    icon: Smartphone,
  },
  { label: "Native", items: ["Swift", "Kotlin", "StoreKit"], icon: AppWindow },
  {
    label: "Backend",
    items: ["REST", "GraphQL", "Node.js", "Python"],
    icon: Code2,
  },
  {
    label: "Data",
    items: ["PostgreSQL", "SQLite", "Offline sync"],
    icon: Database,
  },
  {
    label: "Payments",
    items: ["Stripe", "Google Pay", "In-app purchases"],
    icon: CreditCard,
  },
  {
    label: "Release",
    items: ["TestFlight", "Google Play", "Analytics"],
    icon: Store,
  },
] as const;

const techIcons: Record<string, string> = {
  Flutter: "/icons/tech/flutter.svg",
  Firebase: "/icons/tech/firebase.svg",
  REST: "/icons/tech/rest.svg",
  GraphQL: "/icons/tech/graphql.svg",
  "Node.js": "/images/node.svg",
  Python: "/images/python.svg",
  PostgreSQL: "/icons/tech/mssql.svg",
  Stripe: "/icons/tech/stripe.svg",
  TestFlight: "/icons/tech/flight.svg",
  Google Pay: "/icons/tech/google-pay.svg",
  Analytics: "/icons/tech/analytics.svg",
  In-app purchases: "/icons/tech/revenue-cat-extension.svg",
  Dart: "/icons/tech/dart.svg",
  Swift: "/icons/tech/swift.svg",
  Kotlin: "/icons/tech/kotlin.svg",
  StoreKit: "/icons/tech/Storekit.svg",
  Offline sync: "/icons/tech/network-wireless-offline.svg",
};

const processSteps = [
  {
    title: { en: "Discovery", uk: "Discovery" },
    text: {
      en: "Feature scoping, UX flow mapping, API contract definition, and platform decisions.",
      uk: "Визначення обсягу функціоналу, мапінг користувацьких сценаріїв, опис контракту API та вибір платформних рішень.",
    },
    icon: ClipboardCheck,
  },
  {
    title: { en: "Architecture", uk: "Архітектура" },
    text: {
      en: "Navigation structure, state management, local storage strategy, and API integration layer.",
      uk: "Структура навігації, підхід до керування станом, стратегія локального зберігання та шар інтеграції з API.",
    },
    icon: Layers3,
  },
  {
    title: { en: "Sprint development", uk: "Спринтова розробка" },
    text: {
      en: "Two-week cycles with demo builds on TestFlight or Android internal track.",
      uk: "Двотижневі цикли з демонстраційними збірками в TestFlight або внутрішньому каналі Google Play.",
    },
    icon: GitBranch,
  },
  {
    title: { en: "QA", uk: "QA" },
    text: {
      en: "Device matrix testing, edge case coverage, performance profiling, and accessibility review.",
      uk: "Тестування на матриці пристроїв, крайові сценарії, профілювання продуктивності та аудит доступності.",
    },
    icon: Gauge,
  },
  {
    title: { en: "Store deployment", uk: "Реліз у сторах" },
    text: {
      en: "App Store Connect and Google Play submission, review management, and release coordination.",
      uk: "Подача в App Store та Google Play, управління процесом рев’ю і випуск оновлень.",
    },
    icon: CloudUpload,
  },
  {
    title: { en: "Post-launch", uk: "Пост-реліз" },
    text: {
      en: "Crash monitoring, analytics review, and OTA update cycles.",
      uk: "Моніторинг збоїв, аналіз аналітики та цикли оновлень без повторної публікації.",
    },
    icon: Rocket,
  },
] as const;

const copy = {
  en: {
    heroTitle: "Mobile App Development Services",
    heroSubtitle: "Mobile Apps for Business Growth",
    intro:
      "We develop iOS and Android applications — native and cross-platform via Flutter — with full App Store and Google Play deployment, push notification infrastructure, offline-first data handling, and mobile-optimized UX. Our mobile app development company delivers production-ready applications engineered for performance on mid-range devices, compliance with platform review guidelines, and long-term maintainability.",
    introStat:
      "Purpose-built mobile products can generate up to 3x higher user engagement than mobile-responsive web alternatives.",
    servicesTitle: "iOS and Android Development",
    practiceCta: "See it in practice",
    comparisonTitle: "Cross-Platform vs Native Development",
    comparisonText:
      "Cross-platform mobile app development via Flutter allows us to maintain a single production codebase for both iOS and Android, reducing development and long-term maintenance costs by 30–40% compared to separate native builds. Flutter apps compile to native ARM code and render through their own engine, not a WebView — delivering near-native performance on both platforms.",
    flutterTitle: "Choose Flutter when:",
    flutterItems: [
      "Product parity across iOS and Android is required.",
      "The budget or timeline favors one codebase.",
      "Core features don't require deep platform-specific APIs.",
    ],
    nativeTitle: "Choose native when:",
    nativeItems: [
      "The product relies heavily on platform-specific APIs such as ARKit, HealthKit, or Wear OS.",
      "Maximum UI performance and platform convention compliance are critical.",
      "Teams have iOS and Android expertise in-house.",
    ],
    techTitle: "Mobile Technologies We Use",
    flutterSectionTitle: "Flutter App Development",
    flutterSectionText:
      "Flutter is our primary cross-platform framework for mobile app development. A single Dart codebase compiles to iOS, Android, and, when required, web and desktop. Flutter's widget engine renders pixel-consistent UI across platforms without relying on native components, delivering faster development cycles and lower maintenance overhead.",
    flutterCards: [
      [
        "SaaS companion apps",
        "Mobile products that extend an existing SaaS workflow to iOS and Android.",
      ],
      [
        "B2B mobile tools",
        "Field operations, approvals, reporting, and internal workflows optimized for mobile use.",
      ],
      [
        "Startup MVPs",
        "Fast cross-platform delivery when time-to-market and cost efficiency are priorities.",
      ],
    ],
    processTitle: "Mobile App Development Process",
    deploymentTitle: "App Store and Google Play Deployment",
    deploymentText:
      "App Store and Google Play submission is a defined process with specific technical and content requirements that affect launch timelines. We handle provisioning profiles and signing certificates for iOS, keystore management for Android, store listing optimization, screenshot production, privacy policy compliance, and review submission. Apple's review process averages 1–3 days; Google Play averages 2–7 days for new apps.",
    deploymentItems: [
      "Provisioning profiles and signing certificates for iOS",
      "Keystore management and Android release signing",
      "Store listing optimization, screenshots, and privacy compliance",
      "Revision requests and rejection handling during review",
    ],
    costTitle: "Mobile App Development Cost",
    costText:
      "Mobile app development cost depends on platform choice, feature complexity, and backend requirements. We scope the platform strategy, release plan, and store requirements before finalizing the estimate.",
    costTiers: [
      [
        "Flutter MVP",
        "$25,000 – $50,000",
        "iOS and Android with core flows and basic integrations.",
      ],
      [
        "Mid-complexity app",
        "$50,000 – $100,000",
        "Custom UI, real-time features, payment integration, and richer backend workflows.",
      ],
      [
        "Native complex product",
        "$80,000+ per platform",
        "Platform-specific integrations, advanced device APIs, and complex native UX requirements.",
      ],
    ],
    ctaTitle: "iOS, Android, or both?",
    ctaText:
      "Tell us what your app needs to do and we'll scope it in a 30-minute call.",
    ctaButton: "Talk about your app",
  },
  uk: {
    heroTitle: "Послуги з розробки мобільних застосунків",
    heroSubtitle: "Мобільні застосунки для зростання бізнесу",
    intro:
      "Ми розробляємо iOS та Android застосунки — нативні та кросплатформні на Flutter — із повним розгортанням в App Store та Google Play, інфраструктурою push-сповіщень, офлайн-орієнтованою обробкою даних і UX, оптимізованим для мобільних пристроїв. Наша компанія з розробки мобільних застосунків створює готові до продакшену продукти, оптимізовані для продуктивності на пристроях середнього рівня, відповідності вимогам платформ і довгострокової підтримуваності.",
    introStat:
      "Спеціалізовані мобільні продукти можуть досягати до 3× вищої залученості користувачів порівняно з мобільними веб альтернативами.",
    servicesTitle: "iOS і Android розробка",
    practiceCta: "Подивитись на практиці",
    comparisonTitle: "Cross-Platform vs Native розробка",
    comparisonText:
      "Кросплатформна розробка мобільних застосунків на Flutter дозволяє підтримувати єдину кодову базу для iOS та Android, скорочуючи витрати на розробку та довгострокову підтримку на 30–40% порівняно з окремими нативними реалізаціями. Застосунки на Flutter компілюються в нативний ARM код і рендеряться через власний рушій, а не через WebView, що забезпечує продуктивність, близьку до нативної, на обох платформах.",
    flutterTitle: "Обирайте Flutter, коли:",
    flutterItems: [
      "Потрібен паритет функціоналу між iOS і Android.",
      "Бюджет або терміни передбачають єдину кодову базу.",
      "Ключові функції не потребують глибоких платформо-специфічних API.",
    ],
    nativeTitle: "Обирайте нативну розробку, коли:",
    nativeItems: [
      "Продукт суттєво залежить від платформо-специфічних API: ARKit, HealthKit або Wear OS.",
      "Критично важлива максимальна UI продуктивність і відповідність платформним стандартам.",
      "Команда має внутрішню експертизу iOS і Android розробки.",
    ],
    techTitle: "Технології мобільної розробки",
    flutterSectionTitle: "Flutter App Development",
    flutterSectionText:
      "Flutter — наш основний кросплатформний фреймворк для розробки мобільних застосунків. Єдина кодова база на Dart компілюється в застосунки для iOS і Android, а за потреби також для вебу і десктопу. Рушій Flutter рендерить піксельно-узгоджений інтерфейс на всіх платформах без залежності від нативних компонентів, забезпечуючи швидші цикли розробки та нижчу вартість підтримки.",
    flutterCards: [
      [
        "SaaS companion застосунки",
        "Мобільні продукти, які розширюють існуючий SaaS workflow на iOS та Android.",
      ],
      [
        "B2B мобільні інструменти",
        "Польові операції, погодження, звітність і внутрішні workflows, оптимізовані для мобільного використання.",
      ],
      [
        "Startup MVP",
        "Швидка кросплатформна доставка, коли критичні time-to-market та економічна ефективність.",
      ],
    ],
    processTitle: "Процес розробки мобільних застосунків",
    deploymentTitle: "Розгортання в App Store і Google Play",
    deploymentText:
      "Публікація в App Store та Google Play — це регламентований процес із чіткими технічними та контентними вимогами, які впливають на таймлайн запуску. Ми керуємо повним циклом розгортання: сертифікатами підпису та provisioning profiles для iOS, ключами підпису для Android, оптимізацією сторінок застосунку, підготовкою скріншотів, відповідністю політикам конфіденційності та подачею на рев’ю. У середньому рев’ю Apple займає 1–3 дні, Google Play — 2–7 днів для нових застосунків.",
    deploymentItems: [
      "Provisioning profiles і signing certificates для iOS",
      "Keystore management та Android release signing",
      "Оптимізація сторінки застосунку, скріншоти та privacy compliance",
      "Супровід запитів на доопрацювання та обробка відхилень",
    ],
    costTitle: "Вартість розробки мобільних застосунків",
    costText:
      "Вартість залежить від платформи, складності функціоналу та вимог до бекенду. Ми визначаємо платформну стратегію, план релізу та вимоги сторів перед фінальною оцінкою.",
    costTiers: [
      [
        "Flutter MVP",
        "$25,000 – $50,000",
        "iOS і Android з ключовими сценаріями та базовими інтеграціями.",
      ],
      [
        "Додаток середньої складності",
        "$50,000 – $100,000",
        "Кастомний інтерфейс, real-time фічі, платіжні інтеграції та складніші backend workflows.",
      ],
      [
        "Складний нативний продукт",
        "$80,000+ за платформу",
        "Платформо-специфічні інтеграції, advanced device APIs і складні native UX вимоги.",
      ],
    ],
    ctaTitle: "iOS, Android або обидві платформи?",
    ctaText:
      "Розкажіть, що має робити ваш застосунок, і ми визначимо його обсяг на 30-хвилинному дзвінку.",
    ctaButton: "Поговорити про ваш додаток",
  },
} as const;

export default function MobileAppDevelopmentPage() {
  const [activeService, setActiveService] = useState(0);
  const { locale } = useLocale();
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/Mobile-App.webp"
            alt="Mobile app development services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {page.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl">
            {page.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.10),transparent_32%),#F7F8FA] px-4 py-16 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.18),transparent_36%),#07070A] md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#111_0.5px,transparent_0.5px)] [background-size:3px_3px] dark:[background-image:radial-gradient(#fff_0.5px,transparent_0.5px)]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <p className="text-[18px] leading-[1.8] text-[#4B5563] dark:text-white/72 md:text-xl">
            {page.intro}
          </p>
          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#191a20]">
            <Smartphone className="mb-5 h-10 w-10 text-[#FF6200]" />
            <p className="text-2xl font-semibold leading-tight text-foreground dark:text-white">
              {page.introStat}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#eef1f6] px-4 py-14 text-foreground dark:bg-[#323130] dark:text-white">
        <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[420px_1fr]">
          <div>
            <h2 className="mb-8 text-3xl font-semibold md:text-4xl">
              {page.servicesTitle}
            </h2>
            <div className="border-t border-black/10 dark:border-white/10">
              {services.map((service, index) => {
                const isActive = activeService === index;
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
                );
              })}
            </div>
            <Link
              href="https://ideateam.dev/projects/"
              className="relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#FF6200] px-8 py-4 font-[Onest] text-base font-normal leading-[100%] text-white transition duration-300 ease-out sm:w-auto"
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FF6200";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
              }}
            >
              {page.practiceCta}
            </Link>
          </div>
          <article className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#1b1d23]">
            <div className="relative h-60 md:h-72">
              <Image
                src={services[activeService].image}
                alt={services[activeService].title[locale]}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="mb-3 text-3xl font-semibold">
                {services[activeService].title[locale]}
              </h3>
              <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
                {services[activeService].description[locale]}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              {page.comparisonTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
              {page.comparisonText}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: page.flutterTitle,
                items: page.flutterItems,
                Icon: TabletSmartphone,
              },
              {
                title: page.nativeTitle,
                items: page.nativeItems,
                Icon: Settings,
              },
            ].map(({ title, items, Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-black/10 bg-white p-7 dark:border-white/10 dark:bg-[#191a20]"
              >
                <Icon className="mb-5 h-10 w-10 text-[#FF6200]" />
                <h3 className="text-2xl font-semibold">{title}</h3>
                <ul className="mt-4 space-y-3 text-foreground/65 dark:text-white/65">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6200]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-background px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-4xl font-bold leading-none tracking-[-0.04em] md:text-6xl">
            {page.techTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stacks.map(({ label, items, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-[var(--tech-card-border)] bg-[var(--tech-card)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.08em] text-foreground/55">
                  <Icon className="h-5 w-5 text-[#FF6200]" />
                  {label}
                </div>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <div
                      key={item}
                      className="group flex min-h-[56px] items-center gap-3 rounded-2xl border border-black/10 bg-white px-3 py-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:[background:linear-gradient(180deg,#FAF9F8_0%,#FF6200_150%)] dark:border-white/10 dark:bg-[#161515] dark:hover:[background:linear-gradient(180deg,#161515_0%,#FF6200_150%)]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                        <Image
                          src={techIcons[item] || "/images/puzzle.svg"}
                          alt={item}
                          width={22}
                          height={22}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="text-sm font-semibold transition-colors group-hover:text-white">
                        {item}
                      </span>
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
          <Image
            src="/images/our-services-mobile.png"
            alt="Flutter app development"
            width={420}
            height={460}
            className="h-full min-h-[320px] w-full rounded-xl object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-[#111015] dark:text-white sm:text-5xl">
              {page.flutterSectionTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/75 dark:text-white/75">
              {page.flutterSectionText}
            </p>
            <div className="mt-4 grid gap-x-6 text-lg text-foreground dark:text-white sm:grid-cols-3">
              {page.flutterCards.map(([title, text]) => (
                <div
                  key={title}
                  className="border-b border-[#FF6200] pb-5 pt-5"
                >
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-base text-foreground/70 dark:text-white/70">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-10 text-3xl font-semibold md:text-5xl">
          {page.processTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map(({ title, text, icon: Icon }) => (
            <div
              key={title.en}
              className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
            >
              <Icon className="mb-4 h-7 w-7 text-[#FF6200]" />
              <h3 className="text-xl font-semibold">{title[locale]}</h3>
              <p className="mt-3 leading-relaxed text-foreground/75 dark:text-white/75">
                {text[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold md:text-5xl">
              {page.deploymentTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
              {page.deploymentText}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.deploymentItems.map((item, index) => {
              const icons = [Store, CloudUpload, ClipboardCheck, Bell];
              const Icon = icons[index];
              return (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
                >
                  <Icon className="mb-4 h-7 w-7 text-[#FF6200]" />
                  <p className="leading-relaxed text-foreground/75 dark:text-white/75">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <div className="bg-[#f3f5fa] px-8 py-10 dark:bg-[#1f2026] md:px-12 md:py-12">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#FF6200]">
              Pricing
            </span>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
              {page.costTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] text-foreground/60 dark:text-white/60">
              {page.costText}
            </p>
          </div>
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {page.costTiers.map(([label, range, desc], index) => (
              <div
                key={label}
                className="group flex flex-col gap-4 bg-white px-8 py-7 transition-colors duration-200 hover:bg-[#fff7f2] dark:bg-[#161515] dark:hover:bg-[#1f1a17] sm:flex-row sm:items-center sm:gap-8 md:px-12"
              >
                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FF6200]/30 text-sm font-semibold text-[#FF6200] sm:flex">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground dark:text-white">
                    {label}
                  </p>
                  <p className="mt-0.5 text-foreground/55 dark:text-white/55">
                    {desc}
                  </p>
                </div>
                <span className="shrink-0 font-bold tabular-nums text-[#FF6200]">
                  {range}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-12 lg:py-20">
        <div className="relative mx-auto aspect-[5/3] max-w-[96%] overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f0f0f] via-[#1a0f00] to-[#2a1708] sm:aspect-[5/2.6] sm:max-w-[92%] md:aspect-[5/1.9] md:max-w-6xl lg:aspect-[5/1.45] lg:max-w-7xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#ff6200_12%,transparent_70%)] opacity-70 blur-xl md:opacity-90 md:blur-3xl" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 sm:px-10 md:flex-row md:justify-between md:px-16 lg:px-24">
            <div className="max-w-3xl text-center md:text-left">
              <h2 className="text-xl font-medium leading-[1.15] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[40px]">
                {page.ctaTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/72 md:text-lg">
                {page.ctaText}
              </p>
            </div>
            <Link
              href="https://calendar.app.google/sySAYTvgF8Zi264U7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-[40px] w-[220px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[16px] font-semibold leading-none tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] md:mt-0"
            >
              {page.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <div id="mobile-app-estimate" className="-mt-4">
        <RequestConsultationSection />
      </div>

      <FAQSection5 />
    </main>
  );
}
