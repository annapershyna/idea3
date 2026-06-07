"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Layers,
  Users,
  Check,
  GitBranch,
  Gauge,
  Rocket,
  Settings,
  Smartphone,
  Sparkles,
  BarChart3,
  Eye,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { FAQSection5 } from "@/components/faq-section5";
import { useLocale } from "@/lib/locale-context";

const services = [
  {
    title: { en: "Mobile App UI/UX Design", uk: "UI/UX дизайн мобільних додатків" },
    description: {
      en: "Design That Converts and Delights.",
      uk: "Дизайн, який конвертує та захоплює.",
    },
    image: "/images/ui-ux-mobile.jpg",
  },
  {
    title: { en: "Web Application Design", uk: "Дизайн веб-додатків" },
    description: {
      en: "Scalable, responsive web interfaces for SaaS platforms, dashboards, and web applications. Design systems that support rapid development and consistent user experiences.",
      uk: "Масштабовані, адаптивні веб-інтерфейси для SaaS платформ, дашбордів та веб-додатків. Дизайн-системи, які підтримують швидку розробку та узгоджений користувацький досвід.",
    },
    image: "/images/ui-ux-web.jpg",
  },
  {
    title: { en: "Brand Identity & Visual Design", uk: "Брендова ідентичність та візуальний дизайн" },
    description: {
      en: "Complete visual identity systems including logo design, color palettes, typography, and brand guidelines. Graphic design that communicates your brand story effectively.",
      uk: "Повні системи візуальної ідентичності включаючи дизайн логотипу, кольорові палітри, типографію та брендові гайдлайни. Графічний дизайн, який ефективно передає вашу брендову історію.",
    },
    image: "/images/ui-ux-brand.jpg",
  },
  {
    title: { en: "Design Systems & Component Libraries", uk: "Дизайн-системи та бібліотеки компонентів" },
    description: {
      en: "Reusable design systems that scale across multiple products. Component libraries, documentation, and design tokens that accelerate development and ensure consistency.",
      uk: "Повторно використовувані дизайн-системи, які масштабуються на кілька продуктів. Бібліотеки компонентів, документація та дизайн-токени, які прискорюють розробку та забезпечують узгодженість.",
    },
    image: "/images/ui-ux-design-systems.jpg",
  },
] as const;

const stacks = [
  {
    label: "Design Tools",
    items: ["Figma", "Adobe XD", "Framer", "Principle"],
    icon: Palette,
  },
  { label: "Prototyping", items: ["Interactive Prototypes", "User Flows", "Wireframes", "Handoff"], icon: Layers },
  {
    label: "Research",
    items: ["User Research", "Usability Testing", "Accessibility", "A/B Testing"],
    icon: Eye,
  },
  {
    label: "Design Systems",
    items: ["Component Libraries", "Design Tokens", "Documentation", "Brand Guidelines"],
    icon: Settings,
  },
  {
    label: "Graphics",
    items: ["Adobe Creative Suite", "Illustration", "Animation", "Motion Design"],
    icon: Sparkles,
  },
  {
    label: "Collaboration",
    items: ["FigJam", "Design Reviews", "Feedback Tools", "Developer Handoff"],
    icon: Users,
  },
] as const;

const techIcons: Record<string, string> = {
  Figma: "/icons/tech/figma.svg",
  "Adobe XD": "/icons/tech/adobe-xd.svg",
  Framer: "/icons/tech/framer.svg",
  Principle: "/icons/tech/principle.svg",
  "User Research": "/icons/tech/user-research.svg",
  "Usability Testing": "/icons/tech/testing.svg",
  Accessibility: "/icons/tech/accessibility.svg",
  "Design Systems": "/icons/tech/design-system.svg",
};

const processSteps = [
  {
    title: { en: "Discovery & Research", uk: "Discovery і дослідження" },
    text: {
      en: "Understanding your audience, goals, competitors, and market opportunities through user interviews and competitor analysis.",
      uk: "Розуміння вашої аудиторії, цілей, конкурентів та ринкових можливостей через інтерв'ю користувачів та аналіз конкурентів.",
    },
    icon: Users,
  },
  {
    title: { en: "Strategy & Ideation", uk: "Стратегія та ідеація" },
    text: {
      en: "Defining user journeys, information architecture, and design approach based on research insights.",
      uk: "Визначення користувацьких сценаріїв, інформаційної архітектури та дизайн-підходу на основі дослідницьких інсайтів.",
    },
    icon: Layers,
  },
  {
    title: { en: "Wireframing & Prototyping", uk: "Wire-фрейми та прототипування" },
    text: {
      en: "Low-fidelity wireframes and interactive prototypes to visualize ideas and gather early feedback.",
      uk: "Низьконорівневі wire-фрейми та інтерактивні прототипи для візуалізації ідей та збору раннього зворотного зв'язку.",
    },
    icon: GitBranch,
  },
  {
    title: { en: "Visual Design", uk: "Візуальний дизайн" },
    text: {
      en: "High-fidelity designs with typography, color, imagery, and interactions that delight users.",
      uk: "Високоякісний дизайн з типографією, кольором, зображеннями та взаємодіями, які захоплюють користувачів.",
    },
    icon: Palette,
  },
  {
    title: { en: "Testing & Validation", uk: "Тестування та валідація" },
    text: {
      en: "Usability testing, user feedback sessions, and iterative refinements to ensure effectiveness.",
      uk: "Тестування юзабіліті, сесії зворотного зв'язку від користувачів та ітеративні покращення для забезпечення ефективності.",
    },
    icon: Check,
  },
  {
    title: { en: "Handoff & Implementation", uk: "Передача розробникам" },
    text: {
      en: "Design documentation, component specs, and developer handoff ensuring seamless translation to code.",
      uk: "Документація дизайну, специфікація компонентів та передача розробникам для безперебійного перекладу в код.",
    },
    icon: Rocket,
  },
] as const;

const copy = {
  en: {
    heroTitle: "UI/UX & Graphic Design Services",
    heroSubtitle: "Design That Converts and Delights",
    intro:
      "We create intuitive and visually compelling digital experiences that users love and businesses benefit from. Our UI/UX design services combine deep user research, strategic product design, and high-quality graphic design to deliver interfaces that drive engagement, increase conversions, and support sustainable business growth.[...]
    introStat:
      "Companies investing in professional UI/UX design see 25-30% higher conversion rates, 40-60% improvement in user satisfaction, and significantly better customer retention compared to those treating design as an afterthought.",
    servicesTitle: "Design Services We Deliver",
    practiceCta: "See it in practice",
    designPhilosophy:
      "At IdeaTeam, we don't just make things look beautiful — we design digital products that solve real problems, simplify complex processes, and help companies stand out in competitive markets. Every design decision is rooted in user research, validated through testing, and optimized for measurable business outcomes.",
    whyChooseTitle: "Why Choose IdeaTeam for Design",
    whyChooseItems: [
      "User-first approach backed by research and validation",
      "Full-cycle product design from concept to production",
      "Modern, conversion-oriented design thinking",
      "Seamless collaboration with development teams",
      "Fast iterations based on feedback",
      "Proven expertise across industries",
    ],
    techTitle: "Design Tools & Technologies",
    processTitle: "Our Design Process",
    costTitle: "UI/UX Design Pricing",
    costText:
      "Design project costs depend on complexity, scope, research depth, and deliverables. We offer flexible engagement models from project-based work to dedicated design teams.",
    costTiers: [
      [
        "Startup MVP Design",
        "$3,000+",
        "5-10 key screens, basic design system, wireframes and prototypes.",
      ],
      [
        "Product Design Project",
        "$8,000+",
        "Complete product flow, design system, high-fidelity mockups, user testing.",
      ],
      [
        "Enterprise Design Program",
        "$20,000+",
        "Multi-product ecosystem, comprehensive design system, ongoing optimization.",
      ],
    ],
    ctaTitle: "Ready to design a product users will love?",
    ctaText:
      "Let's discuss your vision. Our design team will help you create an exceptional user experience that drives real business results.",
    ctaButton: "Start your design project",
  },
  uk: {
    heroTitle: "Послуги UI/UX та графічного дизайну",
    heroSubtitle: "Дизайн, який конвертує та захоплює",
    intro:
      "Ми створюємо інтуїтивно зрозумілі та візуально привабливі цифрові продукти, які подобаються користувачам і приносять реальну користь бізнесу. Наші послуги UI/UX-дизайну поєднують глибокі користувацькі дослідження, стратегічний продуктовий дизайн та високоякісний графічний дизайн.[...]
    introStat:
      "Компанії, які інвестують у професійний UI/UX дизайн, бачать 25-30% вищі показники конверсії, 40-60% покращення задоволення користувачів та значно кращу утримання клієнтів порівняно з тими, хто розглядає дизайн як другорядний етап.",
    servicesTitle: "Послуги дизайну, які ми надаємо",
    practiceCta: "Подивитись на практиці",
    designPhilosophy:
      "В IdeaTeam ми не просто робимо красиві інтерфейси — ми розробляємо цифрові продукти, які вирішують реальні проблеми, спрощують складні процеси та допомагають компаніям виділятися на конкурентному ринку. Кожне рішення ґрунтується на користувацьких дослідженнях, перевіряється через тестування та оптимізується для вимірюваних бізнес-результатів.",
    whyChooseTitle: "Чому обирають IdeaTeam для дизайну",
    whyChooseItems: [
      "Орієнтований на користувача підхід підкріплений дослідженнями та валідацією",
      "Повний цикл продуктового дизайну від концепції до продакшену",
      "Сучасне, орієнтоване на конверсію дизайн-мислення",
      "Тісна співпраця з командами розробки",
      "Швидкі ітерації на основі зворотного зв'язку",
      "Доведена експертиза у різних галузях",
    ],
    techTitle: "Дизайн-інструменти та технології",
    processTitle: "Наш процес дизайну",
    costTitle: "Ціноутворення UI/UX дизайну",
    costText:
      "Вартість проектів дизайну залежить від складності, обсягу, глибини досліджень та розроблюваних матеріалів. Ми пропонуємо гнучкі формати взаємодії від проектних робіт до виділених дизайн-команд.",
    costTiers: [
      [
        "Дизайн Startup MVP",
        "$3,000+",
        "5-10 ключових екранів, базова дизайн-система, wire-фрейми та прототипи.",
      ],
      [
        "Проект продуктового дизайну",
        "$8,000+",
        "Повний flow продукту, дизайн-система, високоякісні макети, користувацьке тестування.",
      ],
      [
        "Корпоративна дизайн-програма",
        "$20,000+",
        "Екосистема кількох продуктів, комплексна дизайн-система, постійна оптимізація.",
      ],
    ],
    ctaTitle: "Готові створити продукт, у який закохаються користувачі?",
    ctaText:
      "Давайте обговоримо вашу бачення. Наша дизайн-команда допоможе розробити винятковий користувацький досвід, який приноситиме реальні бізнес-результати.",
    ctaButton: "Почати ваш дизайн-проект",
  },
} as const;

export default function UIUXDesignPage() {
  const [activeService, setActiveService] = useState(0);
  const { locale } = useLocale();
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/ui-ux-hero.jpg"
            alt="UI/UX and graphic design services"
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

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.10),transparent_32%),#F7F8FA] px-4 py-16 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.05),transparent_32%),#1a1a1a]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#111_0.5px,transparent_0.5px)] [background-size:3px_3px]"></div>
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <p className="text-[18px] leading-[1.8] text-[#4B5563] dark:text-white/72 md:text-xl">
            {page.intro}
          </p>
          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#191a20]">
            <Sparkles className="mb-5 h-10 w-10 text-[#FF6200]" />
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
              className="relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#FF6200] px-8 py-4 font-[Onest] text-base font-normal leading-[100%] text-white transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FF6200";
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
        <div className="space-y-10">
          <div>
            <h2 className="mb-8 text-3xl font-semibold md:text-5xl">
              {page.designPhilosophy}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.whyChooseItems.map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
              >
                <Check className="h-6 w-6 shrink-0 text-[#FF6200] mt-1" />
                <p className="font-medium text-foreground dark:text-white">
                  {item}
                </p>
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
                      className="group flex min-h-[56px] items-center gap-3 rounded-2xl border border-black/10 bg-white px-3 py-2 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:border-white/10 dark:bg-[#191a20] dark:hover:border-[#FF6200]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:bg-[#2a2a2a]">
                        <Image
                          src={techIcons[item] || "/images/puzzle.svg"}
                          alt={item}
                          width={22}
                          height={22}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="text-sm font-semibold transition-colors group-hover:text-white dark:text-white">
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
                className="group flex flex-col gap-4 bg-white px-8 py-7 transition-colors duration-200 hover:bg-[#fff7f2] dark:bg-[#161515] dark:hover:bg-[#1f1a17] sm:flex-row sm:items-center sm:gap-8"
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
        <div className="relative mx-auto aspect-[5/3] max-w-[96%] overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f0f0f] via-[#1a0f00] to-[#2a1708] sm:aspect-[5/2.6] sm:max-w-[92%]">
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
              className="mt-4 flex h-[40px] w-[220px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[16px] font-semibold leading-none transition-all hover:bg-[#e45700]"
            >
              {page.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <div id="ui-ux-estimate" className="-mt-4">
        <RequestConsultationSection />
      </div>

      <FAQSection5 />
    </main>
  );
}
