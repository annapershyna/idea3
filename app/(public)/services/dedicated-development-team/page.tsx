"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  GitPullRequest,
  Handshake,
  Layers3,
  LineChart,
  MessagesSquare,
  Rocket,
  Search,
  ShieldCheck,
  Slack,
  Users,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { FAQSection6 } from "@/components/faq-section6";
import { useLocale } from "@/lib/locale-context";

const teamPrinciples = [
  {
    title: { en: "Full-time allocation", uk: "Повна зайнятість" },
    description: {
      en: "Developers work exclusively on your product, not split across projects or clients.",
      uk: "Команда працює виключно над вашим продуктом, без розподілу між проєктами або клієнтами.",
    },
    image: "/developers-collaborating.jpg",
  },
  {
    title: { en: "Direct communication", uk: "Пряма комунікація" },
    description: {
      en: "Your team talks to your engineers without intermediaries, handoffs, or agency layers.",
      uk: "Ваша команда спілкується з інженерами напряму — без посередників, handoffs або agency layers.",
    },
    image: "/remote-team-video-call.jpg",
  },
  {
    title: { en: "Your process", uk: "Ваш процес" },
    description: {
      en: "Jira, Linear, GitHub, Slack, your sprint cadence, your engineering rituals, and your conventions.",
      uk: "Jira, Linear, GitHub, Slack, ваш ритм спринтів, інженерні ритуали та домовленості.",
    },
    image: "/project-management-team.png",
  },
  {
    title: { en: "Transparent output", uk: "Прозорий результат" },
    description: {
      en: "Code is committed to your repository and reviewed through your pull request process.",
      uk: "Код потрапляє у ваш репозиторій і проходить ваш процес pull request review.",
    },
    image: "/images/code-review-banner.jpg",
  },
  {
    title: { en: "Scalable structure", uk: "Гнучке масштабування" },
    description: {
      en: "Add, reduce, or adjust team composition as your product stage and roadmap evolve.",
      uk: "Додавайте, зменшуйте або змінюйте склад команди відповідно до етапу продукту та roadmap.",
    },
    image: "/team-planning-strategy-whiteboard.jpg",
  },
] as const;

const processSteps = [
  {
    title: { en: "Requirements session", uk: "Сесія визначення вимог" },
    text: {
      en: "Tech stack, seniority levels, domain experience, team size, and start date.",
      uk: "Стек технологій, рівень інженерів, доменна експертиза, розмір команди та старт.",
    },
    icon: ClipboardCheck,
  },
  {
    title: { en: "Candidate sourcing", uk: "Підбір кандидатів" },
    text: {
      en: "Internal talent pool plus targeted search; all candidates pre-screened for technical and communication criteria.",
      uk: "Внутрішня база плюс цільовий пошук; попередній відбір за технічними та комунікаційними критеріями.",
    },
    icon: Search,
  },
  {
    title: { en: "Technical interviews", uk: "Технічні співбесіди" },
    text: {
      en: "You interview every candidate before they join your team.",
      uk: "Ви інтерв’юєте кожного кандидата перед тим, як він долучиться до вашої команди.",
    },
    icon: MessagesSquare,
  },
  {
    title: { en: "Onboarding", uk: "Онбординг" },
    text: {
      en: "Repository access, codebase walkthrough, tooling setup, and first sprint kickoff.",
      uk: "Доступ до репозиторію, walkthrough кодової бази, налаштування інструментів і старт першого спринту.",
    },
    icon: Rocket,
  },
  {
    title: { en: "Ongoing management", uk: "Постійне управління" },
    text: {
      en: "Weekly check-ins, performance reviews, team health monitoring, and escalation support.",
      uk: "Щотижневі синхронізації, оцінка результатів, моніторинг здоров’я команди й підтримка ескалацій.",
    },
    icon: LineChart,
  },
] as const;

const workflowTools = [
  { label: "Jira / Linear", icon: Layers3 },
  { label: "GitHub", icon: GitPullRequest },
  { label: "Slack", icon: Slack },
  { label: "Sprint cadence", icon: CalendarClock },
  { label: "PR reviews", icon: Code2 },
  { label: "Reporting", icon: LineChart },
] as const;

const copy = {
  en: {
    heroTitle: "Dedicated Development Team Services",
    heroSubtitle: "Scale Your Engineering Team Faster",
    intro:
      "Recruiting a senior software engineer in-house takes an average of 3–4 months from posting to start date. We assemble dedicated development teams ready to integrate into your workflow in 2 weeks. Our dedicated developers, tech leads, and QA engineers plug directly into your sprint cadence, communication stack, and reporting structure — delivering output from week one, not month three.",
    introStat:
      "Dedicated offshore development teams reduce engineering costs by 40–60% compared to equivalent in-house hiring while maintaining delivery velocity and code quality.",
    principlesTitle: "What Is a Dedicated Development Team",
    practiceCta: "See it in practice",
    definitionTitle: "Dedicated Development Team",
    definitionText:
      "A dedicated development team is a group of engineers allocated exclusively to your product or project — not shared across multiple clients, not managed through a staffing agency. They operate as an extension of your in-house team: attending your standups, using your tools, following your code review process, and reporting directly into your engineering or product leadership. It’s staff augmentation.",
    modelTitle: "Staff Augmentation vs Outsourcing",
    models: [
      {
        title: "Outstaffing (Staff Augmentation)",
        text: "You retain full technical and product ownership. We provide senior engineers who integrate into your team, follow your architecture decisions, and report to your technical lead. Best for teams that need to scale engineering capacity without hiring overhead.",
      },
      {
        title: "Outsourcing (Full Project Delivery)",
        text: "We own technical execution end-to-end: architecture, development, QA, and deployment. You define requirements and review milestones. Best for companies without in-house engineering leadership, or for building a product vertical outside your core team's scope.",
      },
    ],
    processTitle: "How We Build Dedicated Teams",
    communicationTitle: "Team Management and Communication",
    communicationText:
      "Remote development teams work when communication structure is explicit, not assumed. We establish async and sync communication protocols at onboarding: daily standups or async updates in Slack, sprint planning and retros on your calendar, and a dedicated engineering point of contact from our side for escalations. All code goes through your PR review process. All progress is visible in your project management tool.",
    benefitsTitle: "Benefits of Hiring Remote Developers",
    benefits: [
      "40–60% lower engineering cost compared to equivalent in-house roles in Western Europe or North America",
      "2-week time-to-team vs 3–4 months for in-house hiring",
      "Access to senior engineers with specific stack expertise unavailable locally",
      "No overhead for benefits, office space, equipment, or HR administration",
      "Flexible scaling — add engineers for a product sprint, reduce after launch",
    ],
    pricingTitle: "Pricing Models",
    pricingText:
      "Choose the commercial model that matches your planning horizon and delivery style. We keep time tracking, team availability, and performance transparent in either setup.",
    pricingTiers: [
      [
        "Time & Materials",
        "Tracked hours",
        "You pay for hours worked, tracked transparently. Best for ongoing product development where priorities shift frequently. No minimum commitment beyond the initial onboarding period.",
      ],
      [
        "Monthly Retainer",
        "Fixed monthly fee",
        "Fixed monthly fee for a defined team composition. Predictable cost, guaranteed availability. Best for teams that need stable engineering capacity over 6+ months.",
      ],
    ],
    ctaTitle: "Tell us the stack, seniority, and team size you need.",
    ctaText: "We can have your first engineers ready in 2 weeks.",
    ctaButton: "Build your team",
  },
  uk: {
    heroTitle: "Послуги виділеної команди розробки",
    heroSubtitle: "Масштабуйте свою інженерну команду швидше",
    intro:
      "Найм senior software engineer in-house займає в середньому 3–4 місяці — від публікації вакансії до виходу спеціаліста на роботу. Ми формуємо виділені команди розробки, готові інтегруватися у ваш робочий процес за 2 тижні. Наші розробники, технічні лідери та тестувальники підключаються безпосередньо до вашого ритму спринтів, комунікаційного стеку та структури звітності — забезпечуючи результат з першого тижня.",
    introStat:
      "Виділені віддалені команди розробки скорочують витрати на інженерію на 40–60% порівняно з еквівалентним внутрішнім наймом, зберігаючи швидкість доставки та якість коду.",
    principlesTitle: "Що таке виділена команда розробки",
    practiceCta: "Подивитись на практиці",
    definitionTitle: "Dedicated Development Team",
    definitionText:
      "Виділена команда розробки (Dedicated Development Team) — це група інженерів, закріплена виключно за вашим продуктом або проєктом, тобто staff augmentation. Вона працює як продовження вашої внутрішньої команди: бере участь у щоденних стендапах, використовує ваші інструменти, дотримується вашого процесу перевірки коду та звітує безпосередньо вашому технічному або продуктовому керівництву.",
    modelTitle: "Staff Augmentation vs Outsourcing",
    models: [
      {
        title: "Staff Augmentation (розширення команди)",
        text: "Ви зберігаєте повну технічну та продуктову відповідальність. Ми надаємо senior інженерів, які інтегруються у вашу команду, дотримуються вашої архітектури та звітують вашому технічному лідеру. Найкраще підходить для команд, яким потрібно масштабувати інженерну потужність без витрат на найм.",
      },
      {
        title: "Outsourcing (повна розробка продукту)",
        text: "Ми беремо на себе повний цикл розробки: архітектуру, розробку, тестування та розгортання. Ви визначаєте вимоги та погоджуєте ключові етапи. Найкраще підходить для компаній без внутрішньої інженерної експертизи або для розробки окремих продуктових напрямів.",
      },
    ],
    processTitle: "Як ми формуємо виділені команди",
    communicationTitle: "Управління командою та комунікація",
    communicationText:
      "Віддалені команди ефективні тоді, коли комунікація формалізована, а не припущена. Ми налаштовуємо щоденні стендапи або асинхронні оновлення в Slack, планування та ретроспективи спринтів у вашому календарі, а також виділену контактну особу для ескалацій. Увесь код проходить через ваш процес перевірки pull request. Увесь прогрес відображається у вашій системі управління проєктами.",
    benefitsTitle: "Переваги найму віддалених розробників",
    benefits: [
      "На 40–60% нижчі витрати на інженерію порівняно з внутрішнім наймом",
      "2 тижні до старту команди замість 3–4 місяців",
      "Доступ до senior інженерів із вузькою експертизою",
      "Відсутність витрат на офіс, бенефіти та HR",
      "Гнучке масштабування під навантаження продукту",
    ],
    pricingTitle: "Моделі ціноутворення",
    pricingText:
      "Оберіть комерційну модель, яка відповідає горизонту планування та стилю delivery. В обох форматах ми забезпечуємо прозорий облік часу, доступність команди та контроль результату.",
    pricingTiers: [
      [
        "Погодинна модель",
        "Оплата за години",
        "Оплата за фактично відпрацьований час із прозорим обліком. Підходить для гнучкої розробки та змінних пріоритетів.",
      ],
      [
        "Щомісячна фіксована оплата",
        "Фіксована вартість",
        "Фіксована вартість за визначений склад команди. Забезпечує передбачуваний бюджет і стабільну доступність ресурсів. Найкраще для довгострокових проєктів 6+ місяців.",
      ],
    ],
    ctaTitle: "Розкажіть нам про стек, seniority і розмір команди.",
    ctaText: "Ми можемо підготувати ваших перших інженерів за 2 тижні.",
    ctaButton: "Зібрати команду",
  },
} as const;

export default function DedicatedDevelopmentTeamPage() {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const { locale } = useLocale();
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/team.png"
            alt="Dedicated development team services"
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
            <Users className="mb-5 h-10 w-10 text-[#FF6200]" />
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
              {page.principlesTitle}
            </h2>
            <div className="border-t border-black/10 dark:border-white/10">
              {teamPrinciples.map((principle, index) => {
                const isActive = activePrinciple === index;
                return (
                  <button
                    key={principle.title.en}
                    onMouseEnter={() => setActivePrinciple(index)}
                    onClick={() => setActivePrinciple(index)}
                    className={`w-full border-b py-4 text-left text-lg transition-colors ${
                      isActive
                        ? "border-[#FF6200] text-[#FF6200]"
                        : "border-black/15 text-foreground/80 hover:text-[#FF6200] dark:border-white/15 dark:text-white/80"
                    }`}
                  >
                    {principle.title[locale]}
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
                src={teamPrinciples[activePrinciple].image}
                alt={teamPrinciples[activePrinciple].title[locale]}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="mb-3 text-3xl font-semibold">
                {teamPrinciples[activePrinciple].title[locale]}
              </h3>
              <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
                {teamPrinciples[activePrinciple].description[locale]}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              {page.modelTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
              {page.definitionText}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.models.map(({ title, text }, index) => {
              const icons = [Handshake, ShieldCheck];
              const Icon = icons[index];
              return (
                <div
                  key={title}
                  className="rounded-2xl border border-black/10 bg-white p-7 dark:border-white/10 dark:bg-[#191a20]"
                >
                  <Icon className="mb-5 h-10 w-10 text-[#FF6200]" />
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-foreground/65 dark:text-white/65">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-background px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-4xl font-bold leading-none tracking-[-0.04em] md:text-6xl">
            {page.communicationTitle}
          </h2>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
              {page.communicationText}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {workflowTools.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="group flex min-h-[72px] items-center gap-4 rounded-2xl border border-[var(--tech-card-border)] bg-[var(--tech-card)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#FF6200] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-foreground dark:text-white">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-8 rounded-2xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-[#1f2026] md:p-10 lg:grid-cols-[420px_1fr] lg:items-center">
          <Image
            src="/team-planning-strategy-whiteboard.jpg"
            alt="Dedicated development team planning"
            width={420}
            height={460}
            className="h-full min-h-[320px] w-full rounded-xl object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-[#111015] dark:text-white sm:text-5xl">
              {page.benefitsTitle}
            </h2>
            <div className="mt-4 grid gap-x-6 text-lg text-foreground dark:text-white sm:grid-cols-2">
              {page.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex gap-3 border-b border-[#FF6200] pb-5 pt-5"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#FF6200]" />
                  <p className="text-base text-foreground/70 dark:text-white/70">
                    {benefit}
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <div className="bg-[#f3f5fa] px-8 py-10 dark:bg-[#1f2026] md:px-12 md:py-12">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#FF6200]">
              Pricing
            </span>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
              {page.pricingTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] text-foreground/60 dark:text-white/60">
              {page.pricingText}
            </p>
          </div>
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {page.pricingTiers.map(([label, range, desc], index) => (
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

      <div id="dedicated-team-estimate" className="-mt-4">
        <RequestConsultationSection />
      </div>

      <FAQSection6 />
    </main>
  );
}
