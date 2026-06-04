"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bot,
  Bug,
  ClipboardCheck,
  Code2,
  Database,
  Gauge,
  GitBranch,
  MonitorCheck,
  ShieldCheck,
  Smartphone,
  TestTube2,
  Wrench,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { useLocale } from "@/lib/locale-context";

const testingTypes = [
  {
    title: { en: "Unit Testing", uk: "Unit Testing" },
    description: {
      en: "Isolated tests for individual functions and modules. Fast execution, high coverage, and logic-error detection at the source with Jest, Pytest, or JUnit depending on your stack.",
      uk: "Ізольовані тести для окремих функцій і модулів. Швидке виконання, високе покриття та виявлення логічних помилок у джерелі за допомогою Jest, Pytest або JUnit залежно від стеку.",
    },
    image: "/images/testing1.png",
  },
  {
    title: { en: "Integration Testing", uk: "Integration Testing" },
    description: {
      en: "Tests for service boundaries, API contracts, and database interactions that catch integration failures unit tests miss. Supertest, REST Assured, and custom API suites.",
      uk: "Тести для меж сервісів, API-контрактів і взаємодії з базою даних, які виявляють інтеграційні збої, пропущені модульними тестами. Supertest, REST Assured і кастомні API-набори.",
    },
    image: "/images/testing2.png",
  },
  {
    title: { en: "End-to-End Testing", uk: "End-to-End Testing" },
    description: {
      en: "Full user-flow simulation in a browser or mobile environment with Selenium, Cypress, Playwright, or Appium, running against staging before production deployments.",
      uk: "Повна симуляція user flow у браузері або мобільному середовищі з Selenium, Cypress, Playwright чи Appium, що запускається у staging перед production-деплоєм.",
    },
    image: "/images/End-to-End.png",
  },
  {
    title: { en: "Performance and Security Testing", uk: "Performance і Security Testing" },
    description: {
      en: "Load, stress, OWASP Top 10, dependency, and API security testing integrated into CI/CD with k6, Gatling, OWASP ZAP, Trivy, and Snyk.",
      uk: "Навантажувальне, стресове, OWASP Top 10, dependency та API security testing, інтегровані в CI/CD із k6, Gatling, OWASP ZAP, Trivy та Snyk.",
    },
    image: "/images/performance-testing.png",
  },
] as const;

const toolStacks = [
  {
    label: "Browser automation",
    items: ["Selenium", "Cypress", "Playwright"],
    icon: MonitorCheck,
  },
  { label: "Mobile testing", items: ["Appium"], icon: Smartphone },
  {
    label: "API testing",
    items: ["Postman", "REST Assured", "Supertest"],
    icon: Database,
  },
  {
    label: "Unit testing",
    items: ["Jest", "Pytest", "JUnit", "Mocha"],
    icon: Code2,
  },
  {
    label: "Load testing",
    items: ["k6", "Gatling", "Locust"],
    icon: Gauge,
  },
  {
    label: "Security scanning",
    items: ["OWASP ZAP", "Snyk", "Trivy"],
    icon: ShieldCheck,
  },
  {
    label: "Test management",
    items: ["TestRail", "Allure"],
    icon: BarChart3,
  },
  {
    label: "CI integration",
    items: ["GitHub Actions", "GitLab CI", "Jenkins"],
    icon: GitBranch,
  },
] as const;

const techIcons: Record<string, string> = {
  "GitHub Actions": "/icons/tech/github.svg",
};

const processSteps = [
  {
    title: { en: "Test strategy audit", uk: "Аудит тестової стратегії" },
    text: {
      en: "Assess current coverage, identify gaps, and prioritize automation by production risk, business value, and frequency of use.",
      uk: "Оцінюємо поточне покриття, виявляємо прогалини та пріоритизуємо автоматизацію за production-ризиком, бізнес-цінністю та частотою використання.",
    },
    icon: ClipboardCheck,
  },
  {
    title: { en: "Framework selection", uk: "Вибір фреймворку" },
    text: {
      en: "Choose testing tools matched to your stack, team workflow, CI/CD environment, browser and mobile requirements, and maintenance capacity.",
      uk: "Обираємо інструменти під ваш стек, workflow команди, CI/CD-середовище, вимоги до browser/mobile тестування та можливості підтримки.",
    },
    icon: Wrench,
  },
  {
    title: { en: "Test suite implementation", uk: "Впровадження тестового набору" },
    text: {
      en: "Write automated tests starting from the highest-risk user flows, critical APIs, and regression-prone modules.",
      uk: "Пишемо автоматизовані тести, починаючи з найбільш ризикових user flows, критичних API та модулів, схильних до регресій.",
    },
    icon: TestTube2,
  },
  {
    title: { en: "CI/CD integration", uk: "Інтеграція з CI/CD" },
    text: {
      en: "Wire test execution into pull request checks, deployment gates, release workflows, and blocking thresholds for failures.",
      uk: "Підключаємо запуск тестів до pull request checks, deployment gates, release workflows і блокуючих порогів для помилок.",
    },
    icon: GitBranch,
  },
  {
    title: { en: "Reporting setup", uk: "Налаштування звітності" },
    text: {
      en: "Configure dashboards, failure notifications, coverage tracking, flaky-test visibility, and actionable reports for engineering teams.",
      uk: "Налаштовуємо дашборди, сповіщення про помилки, tracking покриття, видимість flaky-тестів і практичні звіти для engineering teams.",
    },
    icon: BarChart3,
  },
  {
    title: { en: "Ongoing maintenance", uk: "Постійний супровід" },
    text: {
      en: "Update tests as features ship, remove flaky assertions, expand coverage incrementally, and keep quality gates reliable.",
      uk: "Оновлюємо тести під час релізу функцій, прибираємо flaky assertions, поступово розширюємо покриття та підтримуємо quality gates надійними.",
    },
    icon: Bot,
  },
] as const;

const copy = {
  en: {
    heroTitle: "QA Automation Testing Services",
    heroSubtitle: "Automated Testing for Reliable Software",
    heroText:
      "We build automated QA coverage across unit, integration, end-to-end, performance, and security testing layers — integrated into your CI/CD pipeline and triggered on every commit or pull request. Our QA automation services cover framework selection, test strategy design, suite implementation, and ongoing coverage expansion.",
    heroStat:
      "Automated test suites reduce manual QA effort by 60–80% and compress regression cycle time from days to under 30 minutes.",
    servicesTitle: "Types of QA Testing",
    processTitle: "Automated Testing Process",
    toolsTitle: "QA Tools and Technologies",
    toolsText:
      "We choose tools that match your application stack, CI/CD environment, team experience, and release cadence instead of forcing a one-size-fits-all framework.",
    gatesTitle: "Performance and Security Testing",
    gatesText:
      "Performance and security testing are often the last to be implemented and the first to cause production incidents. We integrate both as non-optional pipeline gates.",
    gates: [
      "Load tests run at 2x projected peak traffic before every major release.",
      "Security dependency scans on every PR merge with blocking failure thresholds.",
      "API fuzzing to identify edge cases in request handling.",
      "Latency regression detection with alerting on P95 and P99 threshold breaches.",
    ],
    benefitsTitle: "Benefits of QA Automation",
    benefits: [
      "60–80% reduction in manual QA effort per release cycle.",
      "Regression detection time compressed from days to under 30 minutes.",
      "3–5x faster release cadence with automated quality gates in CI/CD.",
      "Earlier defect detection — fixing bugs in development costs 10x less than in production.",
      "Consistent coverage across browsers, devices, and environments without manual repetition.",
    ],
    costTitle: "QA Automation Cost",
    costText:
      "A focused engagement covering CI/CD integration and core e2e flows starts at $1,500+. Comprehensive multi-layer automation for a mid-complexity application ranges from $2,000+. Ongoing QA retainers for coverage maintenance run $2,000–$5,000/month.",
    costTiers: [
      ["Core e2e and CI/CD setup", "$1,500+", "Pull request checks, key user flows, reporting, and deployment gates."],
      ["Comprehensive QA automation", "$2,500+", "Unit, integration, e2e, performance, and security coverage for a mid-complexity app."],
      ["Ongoing QA retainer", "$1,000+ / month", "Coverage maintenance, new feature tests, flaky-test cleanup, and reporting support."],
    ] as const,
    ctaTitle: "Need to fix your coverage gaps?",
    ctaText:
      "Tell us your stack and current test coverage. We'll identify the highest-value automation wins in a 30-minute call.",
    ctaButton: "Fix your coverage gaps",
    faqTitle: "FAQ",
    faqs: [
      ["What is QA automation?", "QA automation is the use of software frameworks and scripts to execute tests automatically, replacing or reducing manual testing effort. Automated tests run consistently, repeatedly, and at the speed of your CI/CD pipeline."],
      ["Why is automated testing important?", "Manual testing doesn't scale with codebase growth. Automated testing catches regressions on every change, enables confident frequent releases, and reduces defect-detection cost by identifying issues in development rather than production."],
      ["What types of software testing exist?", "Unit, integration, end-to-end, performance (load/stress), and security testing. Each layer catches a different class of defect, and a complete QA strategy covers all five."],
      ["How much does QA automation cost?", "Core CI/CD integration and e2e coverage starts at $8,000–$20,000. Comprehensive multi-layer test automation ranges from $20,000–$50,000. Ongoing retainers run $2,000–$5,000/month."],
      ["When should businesses implement automated testing?", "As early as possible — ideally from the first sprint. The later automated testing is added, the more expensive it is to retrofit coverage across an existing codebase."],
    ] as const,
  },
  uk: {
    heroTitle: "Послуги QA Automation Testing",
    heroSubtitle: "Automated Testing для надійного програмного забезпечення",
    heroText:
      "Ми будуємо автоматизоване QA-покриття на рівнях модульного, інтеграційного, наскрізного, продуктивнісного та безпекового тестування — інтегроване у ваш CI/CD-пайплайн і таке, що запускається при кожному коміті або pull request. Наші послуги автоматизації QA охоплюють вибір фреймворку, розробку тестової стратегії, впровадження тестових наборів та їх постійне розширення.",
    heroStat:
      "Автоматизовані набори тестів скорочують manual QA effort на 60–80% і зменшують regression cycle time з днів до 30 хвилин.",
    servicesTitle: "Типи QA тестування",
    processTitle: "Процес автоматизованого тестування",
    toolsTitle: "QA інструменти і технології",
    toolsText:
      "Ми обираємо інструменти відповідно до вашого application stack, CI/CD-середовища, досвіду команди та release cadence, а не нав’язуємо універсальний фреймворк.",
    gatesTitle: "Performance і Security Testing",
    gatesText:
      "Тестування продуктивності та безпеки часто впроваджуються останніми, і першими призводять до інцидентів у продакшені. Ми інтегруємо обидва підходи як обов’язкові pipeline gates.",
    gates: [
      "Навантажувальні тести виконуються на рівні 2× від прогнозованого пікового трафіку перед кожним великим релізом.",
      "Сканування залежностей на безпеку запускається для кожного pull request merge із блокуючими порогами критичних вразливостей.",
      "API-фазинг використовується для виявлення edge cases в обробці запитів.",
      "Виявлення регресій затримок із alerting при перевищенні порогів P95 і P99.",
    ],
    benefitsTitle: "Переваги QA Automation",
    benefits: [
      "Скорочення manual QA effort на 60–80% за release cycle.",
      "Regression detection time стиснутий з днів до 30 хвилин.",
      "Release cadence у 3–5x швидший з automated quality gates в CI/CD.",
      "Раннє виявлення дефектів — виправлення багів у розробці коштує в 10x менше, ніж у production.",
      "Послідовне покриття браузерів, пристроїв і середовищ без ручного повторення.",
    ],
    costTitle: "Вартість QA Automation",
    costText:
      "Сфокусований проект, що охоплює інтеграцію CI/CD і ключові наскрізні сценарії, стартує від $1,500+. Комплексне впровадження автоматизації QA для застосунків середньої складності — від $2,000–$50,000. Постійний супровід QA для підтримки та розширення покриття — від $2,000–$5,000 на місяць.",
    costTiers: [
      ["Базове e2e та CI/CD налаштування", "$1,500 +", "Pull request checks, ключові user flows, звітність і deployment gates."],
      ["Комплексна QA automation", "$2,000+", "Unit, integration, e2e, performance і security coverage для застосунку середньої складності."],
      ["Постійний QA retainer", "$1,000+ / місяць", "Підтримка покриття, тести для нових функцій, cleanup flaky tests і reporting support."],
    ] as const,
    ctaTitle: "Потрібно закрити прогалини в тестовому покритті?",
    ctaText:
      "Розкажіть нам про ваш стек і поточне тестове покриття. Ми визначимо найцінніші automation wins за 30-хвилинний дзвінок.",
    ctaButton: "QA оцінка",
    faqTitle: "FAQ",
    faqs: [
      ["Що таке QA automation?", "QA automation — це використання software frameworks і скриптів для автоматичного виконання тестів, що замінює або скорочує manual testing effort. Автоматизовані тести запускаються послідовно, багаторазово і зі швидкістю вашого CI/CD pipeline."],
      ["Чому automated testing важливе?", "Manual testing не масштабується разом із ростом бази коду. Automated testing виявляє регресії при кожній зміні, забезпечує впевнені часті релізи та знижує вартість виявлення дефектів, знаходячи проблеми на етапі розробки, а не в продакшені."],
      ["Які типи software testing існують?", "Модульне, інтеграційне, наскрізне, продуктивнісне (навантажувальне та стресове) і безпекове тестування. Кожен рівень виявляє різний клас дефектів, а повна QA-стратегія охоплює всі п’ять."],
      ["Скільки коштує автоматизація QA?", "Базова інтеграція CI/CD і покриття наскрізних сценаріїв стартує від $8,000–$20,000. Комплексна багаторівнева автоматизація тестування — від $20,000–$50,000. Постійний супровід — від $2,000–$5,000 на місяць."],
      ["Коли бізнесам варто впроваджувати автоматизоване тестування?", "Якомога раніше — в ідеалі з першого спринту. Чим пізніше впроваджується автоматизація тестування, тим дорожче обходиться доопрацювання покриття в уже існуючій кодовій базі."],
    ] as const,
  },
} as const;

function FaqIndicator() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 text-[#FF6200] transition-all duration-300 group-open:rotate-180 group-open:text-[#C0C0C0]"
      aria-hidden="true"
    >
      <g transform="translate(1.67, 2.17)">
        <path
          d="M6.19757 9C5.81267 9.66667 4.85042 9.66667 4.46552 9L0.135391 1.5C-0.249509 0.833332 0.231617 -1.05781e-06 1.00142 -9.90511e-07L9.66167 -2.33408e-07C10.4315 -1.6611e-07 10.9126 0.833333 10.5277 1.5L6.19757 9Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export default function QAAutomationServicesPage() {
  const { locale } = useLocale();
  const lang = locale === "uk" ? "uk" : "en";
  const page = copy[lang];
  const [activeType, setActiveType] = useState(0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(255,98,0,0.20),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,98,0,0.12),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl xl:text-7xl">
              {page.heroTitle}
            </h1>
            <h2 className="mt-6 text-2xl font-medium text-foreground/80 dark:text-white/80 md:text-3xl">
              {page.heroSubtitle}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/70 dark:text-white/70">
              {page.heroText}
            </p>
            <div className="mt-8 rounded-2xl border border-[#FF6200]/30 bg-[#FF6200]/10 p-6 text-lg font-medium leading-relaxed text-foreground dark:text-white">
              {page.heroStat}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[#FF6200]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212] shadow-2xl">
              <Image
                src="/images/qa.jpg"
                alt="QA automation testing dashboard"
                width={900}
                height={700}
                className="h-[420px] w-full object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3 text-white">
                {["60–80%", "<30 min", "3–5x"].map((metric, index) => (
                  <div key={metric} className="rounded-2xl bg-black/45 p-4 backdrop-blur">
                    <p className="text-2xl font-semibold text-[#FF6200]">{metric}</p>
                    <p className="mt-1 text-xs text-white/70">
                      {index === 0 ? "QA effort" : index === 1 ? "Regression" : "Release cadence"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
              {testingTypes.map((item, index) => {
                const isActive = activeType === index;
                return (
                  <button
                    key={item.title.en}
                    onMouseEnter={() => setActiveType(index)}
                    onClick={() => setActiveType(index)}
                    className={`w-full border-b py-4 text-left text-lg transition-colors ${
                      isActive
                        ? "border-[#FF6200] text-[#FF6200]"
                        : "border-black/15 text-foreground/80 hover:text-[#FF6200] dark:border-white/15 dark:text-white/80"
                    }`}
                  >
                    {item.title[lang]}
                  </button>
                );
              })}
            </div>
            <Link
              href="/projects"
              className="relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#FF6200] px-8 py-4 font-[Onest] text-base font-normal leading-[100%] text-white transition duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-black sm:w-auto"
            >
              {lang === "uk" ? "Подивитись на практиці" : "See it in practice"}
            </Link>
          </div>
          <article className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#1b1d23]">
            <div className="relative h-60 md:h-72">
              <Image
                src={testingTypes[activeType].image}
                alt={testingTypes[activeType].title[lang]}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="mb-3 text-3xl font-semibold">
                {testingTypes[activeType].title[lang]}
              </h3>
              <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
                {testingTypes[activeType].description[lang]}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold md:text-5xl">
            {page.processTitle}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title.en}
                className="rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#FF6200]/40 dark:border-white/10 dark:bg-[#161515]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-9 w-9 text-[#FF6200]" />
                  <span className="text-sm font-semibold text-foreground/30 dark:text-white/30">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{step.title[lang]}</h3>
                <p className="mt-3 leading-relaxed text-foreground/65 dark:text-white/65">
                  {step.text[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#f3f5fa] p-6 dark:bg-[#191a20] md:p-10">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-semibold md:text-5xl">{page.toolsTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/65 dark:text-white/65">
              {page.toolsText}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {toolStacks.map((stack) => {
              const Icon = stack.icon;
              return (
                <div key={stack.label} className="rounded-2xl bg-white p-5 dark:bg-[#111111]">
                  <Icon className="mb-4 h-8 w-8 text-[#FF6200]" />
                  <h3 className="font-semibold">{stack.label}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-sm text-foreground/70 dark:border-white/10 dark:text-white/70"
                      >
                        {techIcons[item] && (
                          <Image src={techIcons[item]} alt="" width={16} height={16} className="h-4 w-4" />
                        )}
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-[#FF6200]/20 bg-[#FF6200]/10 p-8 md:p-10">
            <ShieldCheck className="mb-6 h-12 w-12 text-[#FF6200]" />
            <h2 className="text-3xl font-semibold md:text-5xl">{page.gatesTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
              {page.gatesText}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.gates.map((item, index) => (
              <div key={item} className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#161515]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6200] font-semibold text-white">
                  {index + 1}
                </div>
                <p className="leading-relaxed text-foreground/70 dark:text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold md:text-5xl">{page.benefitsTitle}</h2>
          </div>
          <div className="space-y-3">
            {page.benefits.map((benefit) => (
              <div key={benefit} className="flex gap-4 rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#161515]">
                <Bug className="mt-1 h-5 w-5 shrink-0 text-[#FF6200]" />
                <p className="leading-relaxed text-foreground/75 dark:text-white/75">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <div className="bg-[#f3f5fa] px-8 py-10 dark:bg-[#1f2026] md:px-12 md:py-12">
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
                  <p className="font-semibold text-foreground dark:text-white">{label}</p>
                  <p className="mt-0.5 text-foreground/55 dark:text-white/55">{desc}</p>
                </div>
                <span className="shrink-0 font-bold tabular-nums text-[#FF6200]">{range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

            <section className="w-full px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-12 lg:py-20">
        <div className="relative mx-auto min-h-[520px] max-w-[96%] overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f0f0f] via-[#1a0f00] to-[#2a1708] sm:min-h-[440px] sm:max-w-[92%] md:aspect-[5/1.9] md:min-h-0 md:max-w-6xl lg:aspect-[5/1.45] lg:max-w-7xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#ff6200_12%,transparent_70%)] opacity-70 blur-xl md:opacity-90 md:blur-3xl" />
          <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center gap-6 px-6 py-10 sm:min-h-[440px] sm:px-10 md:h-full md:min-h-0 md:flex-row md:justify-between md:px-16 md:py-0 lg:px-24">
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
              className="mt-2 flex min-h-[44px] w-full max-w-[300px] items-center justify-center rounded-[50px] bg-[#FF6200] px-5 py-3 text-center font-['Onest'] text-[16px] font-semibold leading-tight tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] md:mt-0 md:h-[40px] md:w-[240px] md:px-[14px] md:py-[4px] md:leading-none"
            >
              {page.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-3xl font-semibold md:text-5xl">{page.faqTitle}</h2>
        <div className="space-y-4">
          {page.faqs.map(([question, answer]) => (
            <details
              key={question}
              className="group rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold">
                <span>{question}</span>
                <FaqIndicator />
              </summary>
              <p className="mt-4 leading-relaxed text-foreground/70 dark:text-white/70">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div id="qa-automation-audit" className="-mt-4">
        <RequestConsultationSection />
      </div>
    </main>
  );
}
