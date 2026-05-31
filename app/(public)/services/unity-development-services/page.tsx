"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Box,
  Boxes,
  ClipboardCheck,
  Code2,
  Cpu,
  Cuboid,
  Gamepad2,
  Gauge,
  GitBranch,
  Glasses,
  Headset,
  Layers3,
  MonitorSmartphone,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Smartphone,
  Store,
  Wrench,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { useLocale } from "@/lib/locale-context";

const solvedProblems = [
  {
    title: { en: "One Unity codebase", uk: "Єдина кодова база Unity" },
    text: {
      en: "Deploy across iOS, Android, WebGL, and XR headsets without platform-specific rewrites at launch.",
      uk: "Розгортання на iOS, Android, WebGL і XR-пристрої без переписування під платформу на старті.",
    },
    icon: GitBranch,
  },
  {
    title: { en: "Device-validated performance", uk: "Продуктивність на реальних пристроях" },
    text: {
      en: "Physics-accurate AR and 3D rendering validated against target device performance budgets before delivery.",
      uk: "Фізично коректні AR та 3D-взаємодії перевіряються під обмеження продуктивності цільових пристроїв до передачі.",
    },
    icon: Gauge,
  },
  {
    title: { en: "2–4 week PoCs", uk: "PoC за 2–4 тижні" },
    text: {
      en: "Fixed-scope Unity PoCs that are demonstrable, investor-ready, and built on architecture that extends to production.",
      uk: "Фіксовані Unity-прототипи, готові для демонстрації інвесторам і побудовані на архітектурі, яку можна масштабувати до продакшену.",
    },
    icon: Rocket,
  },
  {
    title: { en: "Legacy Unity rescue", uk: "Відновлення legacy Unity" },
    text: {
      en: "Audit, refactor, and re-stabilize inherited Unity codebases with broken builds or outdated dependencies.",
      uk: "Аудит, рефакторинг і стабілізація успадкованих Unity-кодобаз із поламаними збірками або застарілими залежностями.",
    },
    icon: Wrench,
  },
  {
    title: { en: "Full C# ownership", uk: "Повне C# ownership" },
    text: {
      en: "Documented, tested Unity/C# source delivered with repository access and no vendor lock-in.",
      uk: "Документований і перевірений Unity/C# код передається з доступом до репозиторію та без vendor lock-in.",
    },
    icon: Code2,
  },
] as const;

const unityServices = [
  {
    title: { en: "Mobile AR Applications", uk: "Мобільні AR-додатки" },
    description: {
      en: "Markerless and marker-based AR experiences built with AR Foundation, ARKit, and ARCore: virtual try-ons, product visualization in real space, in-store navigation overlays, and interactive marketing campaigns. Optimized for mid-range iOS and Android hardware with face tracking, plane detection, and image anchoring depending on the use case.",
      uk: "AR-досвіди з використанням AR Foundation, ARKit та ARCore: віртуальні примірки, візуалізація продуктів у просторі, навігаційні накладки та маркетингові інтерактиви. Оптимізовано для реальної продуктивності на iOS та Android пристроях середнього рівня.",
    },
    image: "/images/ar.jpg",
  },
  {
    title: { en: "VR Simulations", uk: "VR-симуляції" },
    description: {
      en: "Training environments, architectural walkthroughs, safety procedure simulators, and onboarding experiences deployed across Meta Quest, HTC Vive, and OpenXR-compatible headsets. OpenXR reduces per-headset porting overhead, while physics interactions, spatial audio, and hand tracking are configured per simulation requirements.",
      uk: "Навчальні середовища, тренажери безпеки, архітектурні огляди та onboarding-системи для Meta Quest, HTC Vive та OpenXR-пристроїв. OpenXR зменшує overhead портингу між гарнітурами, а фізика, spatial audio та hand tracking налаштовуються під сценарій.",
    },
    image: "/images/VR.png",
  },
  {
    title: { en: "3D Configurators and Interactive Products", uk: "3D-конфігуратори та інтерактивні продукти" },
    description: {
      en: "Real-time 3D product configurators, interactive investor decks, gamified sales tools, and embedded WebGL experiences. Users select materials, colors, components, or configurations and see results rendered instantly, eliminating static photography for SKU variants.",
      uk: "Real-time 3D product configurators, інтерактивні investor decks, gamified sales tools та embedded WebGL experiences. Користувач змінює матеріали, кольори й компоненти та бачить результат у реальному часі без статичних зображень для кожного SKU.",
    },
    image: "/images/3d.jpg",
  },
  {
    title: { en: "Interactive PoC Development", uk: "Інтерактивні прототипи" },
    description: {
      en: "Scoped, doable Unity PoCs delivered in 2–4 weeks for investor pitches, product launches, or internal validation. We define the minimum interactive scope, build it to a presentable standard, and document architecture that extends to the full product.",
      uk: "Швидка розробка демонстраційних Unity-прототипів за 2–4 тижні для інвесторів, запусків або внутрішньої перевірки гіпотез. Ми визначаємо мінімальний інтерактивний scope, доводимо його до презентаційного рівня та документуємо архітектуру.",
    },
    image: "/1600x400_Earring_Collection_1.webp",
  },
  {
    title: { en: "Legacy Unity Rescue", uk: "Відновлення legacy Unity-проєктів" },
    description: {
      en: "Inherited a Unity project with broken builds, unreadable code, outdated packages, or undocumented architecture? We audit code quality, asset pipeline, build configuration, and performance bottlenecks, then refactor and bring the project back to a shippable state.",
      uk: "Якщо Unity-проєкт має поламані збірки, unreadable code, застарілі packages або undocumented architecture, ми проводимо технічний аудит, refactor, стабілізацію та повертаємо його до shippable стану.",
    },
    image: "/images/Code-audit.jpg",
  },
] as const;

const processSteps = [
  {
    title: { en: "Discovery", uk: "Discovery" },
    text: {
      en: "Scope definition, target platforms, device tiers, GPU budgets, thermal limits, interaction design, and asset requirements.",
      uk: "Визначення обсягу, платформ, рівнів пристроїв, GPU budget, thermal limits, сценаріїв взаємодії та вимог до assets.",
    },
    icon: ClipboardCheck,
  },
  {
    title: { en: "Pre-production", uk: "Передпродакшн" },
    text: {
      en: "Scene hierarchy, prefab system architecture, C# code structure, Git + Git LFS setup, asset pipeline, and SDK integration planning.",
      uk: "Архітектура scene hierarchy, prefab system, C# structure, Git + Git LFS, asset pipeline та план інтеграції SDK.",
    },
    icon: Layers3,
  },
  {
    title: { en: "Development", uk: "Розробка" },
    text: {
      en: "Sprint-based C# engineering with playable builds delivered to target devices via TestFlight, Android internal testing, WebGL, or headset builds.",
      uk: "Ітеративна C# розробка зі playable builds на цільових пристроях через TestFlight, Android internal testing, WebGL або headset builds.",
    },
    icon: Code2,
  },
  {
    title: { en: "Performance optimization", uk: "Оптимізація" },
    text: {
      en: "Unity Profiler and Frame Debugger-driven optimization: draw call batching, texture compression, LOD setup, GC reduction, and AR session stability.",
      uk: "Оптимізація через Unity Profiler і Frame Debugger: draw call batching, texture compression, LOD, GC reduction і стабільність AR session.",
    },
    icon: Gauge,
  },
  {
    title: { en: "QA", uk: "Тестування" },
    text: {
      en: "Manual and automated testing across device matrices, XR headsets, AR tracking stability, frame rate, memory regression, and platform guidelines.",
      uk: "Manual та automated testing на device matrix, XR-гарнітурах, перевірка AR tracking, frame rate, memory regression і platform guidelines.",
    },
    icon: ShieldCheck,
  },
  {
    title: { en: "Build, release, and handoff", uk: "Реліз і передача" },
    text: {
      en: "Platform-specific build configuration, App Store / Google Play / WebGL / Meta Quest release support, full source handoff, and build documentation.",
      uk: "Platform-specific build configuration, підтримка релізу в App Store / Google Play / WebGL / Meta Quest, повний source handoff і build documentation.",
    },
    icon: PackageCheck,
  },
] as const;

const technologyStacks = [
  {
    label: { en: "Engine", uk: "Рушій" },
    items: ["Unity LTS", "C#", ".NET Framework"],
    icon: Cuboid,
  },
  {
    label: { en: "AR", uk: "AR" },
    items: ["AR Foundation", "ARKit", "ARCore", "ARKit Face Tracking"],
    icon: Smartphone,
  },
  {
    label: { en: "VR/XR", uk: "VR/XR" },
    items: ["OpenXR", "XR Interaction Toolkit", "Meta Quest SDK", "SteamVR"],
    icon: Headset,
  },
  {
    label: { en: "Web", uk: "Web" },
    items: ["WebGL", "WebAssembly builds"],
    icon: MonitorSmartphone,
  },
  {
    label: { en: "Rendering", uk: "Рендеринг" },
    items: ["URP", "HDRP", "Texture compression", "LOD"],
    icon: Cpu,
  },
  {
    label: { en: "Platforms", uk: "Платформи" },
    items: ["iOS", "Android", "Meta Quest", "HTC Vive", "PC", "WebGL"],
    icon: Boxes,
  },
] as const;

const industryItems = [
  {
    title: { en: "Retail & eCommerce", uk: "Ритейл та eCommerce" },
    text: {
      en: "AR virtual try-ons for fashion, jewelry, eyewear, and furniture that help customers validate fit before purchase.",
      uk: "AR-примірки для fashion, jewelry, eyewear і furniture, що допомагають клієнтам перевірити fit до покупки.",
    },
    icon: Store,
  },
  {
    title: { en: "Training & Enterprise", uk: "Навчання та корпоративний сектор" },
    text: {
      en: "VR safety simulations, equipment operation training, and onboarding environments that replace costly physical setups.",
      uk: "VR safety simulations, equipment operation training та onboarding environments замість дорогих фізичних стендів.",
    },
    icon: Headset,
  },
  {
    title: { en: "Architecture & Real Estate", uk: "Архітектура та нерухомість" },
    text: {
      en: "Interactive 3D walkthroughs and configurators for pre-construction sales and design review.",
      uk: "Інтерактивні 3D-тури та configurators для pre-construction sales і design review.",
    },
    icon: Box,
  },
  {
    title: { en: "Manufacturing & Engineering", uk: "Виробництво" },
    text: {
      en: "3D product configurators and assembly visualization for complex B2B sales cycles.",
      uk: "3D product configurators та assembly visualization для складних B2B sales cycles.",
    },
    icon: Wrench,
  },
  {
    title: { en: "Marketing & Events", uk: "Маркетинг" },
    text: {
      en: "Interactive AR campaigns and WebGL experiences for product launches and trade show demos.",
      uk: "Інтерактивні AR campaigns та WebGL experiences для product launches і trade show demos.",
    },
    icon: Glasses,
  },
  {
    title: { en: "GameDev", uk: "Ігрова розробка" },
    text: {
      en: "2D and 3D Unity game development for mobile, PC, and console platforms.",
      uk: "2D/3D Unity game development для mobile, PC та console platforms.",
    },
    icon: Gamepad2,
  },
] as const;

const copy = {
  en: {
    heroTitle: "Unity Development Services - Real-Time 3D & Interactive Experiences",
    heroSubtitle: "Unity Development for Products That Need to Be Experienced, Not Just Described",
    intro:
      "We design and build real-time 3D and interactive experiences on Unity — AR try-ons, VR training simulators, 3D product configurators, interactive PoCs, and cross-platform deployments from a single codebase. Our Unity development services span the full engagement: architecture, C# engineering, AR/VR integration, physics and rendering optimization, and production deployment with no PoC handoffs that stall before reaching users.",
    introStat:
      "Unity's cross-platform engine covers iOS, Android, WebGL, Meta Quest, HTC Vive, and PC builds without separate codebases, cutting multi-platform delivery cost by 40–60% compared to native-per-platform approaches.",
    problemsTitle: "What Problems Unity Development from Idea Team Solves",
    problemsText:
      "Interactive 3D products fail in one of three places: the PoC never ships, performance collapses on target hardware, or the experience does not survive the move from one platform to another. We engineer against all three from day one.",
    servicesTitle: "Unity Development Services We Provide",
    servicesText: "Our Unity development company delivers across five core service areas:",
    practiceCta: "See it in practice",
    processTitle: "Our Unity Development Process",
    processText: "We run Unity engagements in structured milestones with testable deliverables at each stage.",
    techTitle: "Technologies We Use",
    techText: "Our Unity development stack covers the full range of AR, VR, and interactive 3D delivery.",
    industriesTitle: "Industries We Work With",
    industriesText:
      "Unity development delivers measurable product impact in verticals where static media or conventional UX cannot communicate product value effectively.",
    whyTitle: "Why Choose Idea Team for Unity Development",
    whyText:
      "Unity development requires 3D engineering depth, performance discipline, and platform knowledge that general software teams rarely have. We have shipped AR, VR, and interactive 3D products across iOS, Android, WebGL, and XR — not just prototyped them.",
    whyItems: [
      "AR Foundation and ARKit depth — face tracking, markerless plane detection, and physics-accurate object placement validated on real devices.",
      "Cross-platform from architecture, not as an afterthought — one codebase, every target platform, no retrofit rewrites.",
      "Performance-first engineering — every build profiled against real device constraints before delivery.",
      "PoC-to-production continuity — PoC architecture is designed to extend, not be discarded.",
      "Full source handoff — documented codebase, Unity project files, asset pipeline, and no vendor lock-in.",
    ],
    costTitle: "Cost of Unity Development",
    costText:
      "Unity development cost depends on experience type, target platforms, and build complexity. We provide fixed-scope estimates after a technical discovery session.",
    costTiers: [
      ["Interactive PoC", "$8,000 – $20,000", "Investor demo or product validation delivered in 2–4 weeks."],
      ["Production mobile AR app", "$25,000 – $60,000", "iOS and Android AR application with custom physics and App Store deployment."],
      ["VR training simulation", "$30,000 – $80,000", "Meta Quest or multi-headset OpenXR deployment depending on environment complexity and interaction depth."],
      ["WebGL 3D configurator", "$20,000 – $50,000", "Browser-based 3D configurator with real-time material switching and product catalog integration."],
    ] as const,
    ctaTitle: "Tell us what users need to experience.",
    ctaText: "We'll scope the Unity build, define platform targets, and estimate it in a 30-minute call.",
    ctaButton: "Let's scope your idea",
    faqTitle: "FAQ",
    faqs: [
      ["What is Unity development?", "Unity is a cross-platform real-time 3D engine used to build AR applications, VR simulations, 3D configurators, interactive experiences, and games. Unity development is the engineering process of designing, building, and deploying these experiences using Unity, C# scripting, and platform SDKs."],
      ["What platforms does Unity support?", "Unity supports iOS, Android, WebGL, Windows, macOS, Meta Quest, HTC Vive and other OpenXR-compatible headsets, PlayStation, Xbox, and Nintendo Switch. A single Unity codebase can be built across supported platforms with target-specific optimizations."],
      ["What is AR Foundation and why does it matter?", "AR Foundation is Unity's cross-platform AR framework that abstracts ARKit and ARCore into a single API, allowing features like plane detection, face tracking, image anchoring, and object placement to be developed once for both iOS and Android."],
      ["How long does Unity development take?", "A focused PoC or interactive demo takes 2–4 weeks. A production mobile AR application takes 8–16 weeks. A VR training simulation takes 10–20 weeks depending on environment count and interaction complexity."],
      ["What is the difference between AR and VR development in Unity?", "AR overlays 3D content on the real world through a device camera and usually targets mobile devices. VR replaces the user's environment with a synthetic 3D world and targets headsets such as Meta Quest or HTC Vive."],
      ["Can Unity be used for WebGL 3D experiences?", "Yes. Unity builds to WebGL via WebAssembly, delivering 3D configurators, interactive product demos, and gamified experiences that run in a browser without app installs. WebGL builds require polygon budgets, texture compression, and load-time optimization."],
      ["What is legacy Unity rescue?", "Legacy Unity rescue is a technical audit and refactoring engagement for Unity projects inherited from previous contractors or internal teams with broken builds, undocumented architecture, outdated Unity versions, or accumulated technical debt."],
      ["How much does Unity development cost?", "An interactive PoC starts at $8,000–$20,000. A production mobile AR app ranges from $25,000–$60,000. A VR simulation ranges from $30,000–$80,000. A WebGL 3D configurator ranges from $20,000–$50,000."],
    ] as const,
  },
  uk: {
    heroTitle: "Послуги Unity Development - Real-Time 3D та Interactive Experiences",
    heroSubtitle: "Unity-розробка для продуктів, які потрібно відчути, а не просто описати",
    intro:
      "Ми проектуємо та створюємо інтерактивні 3D-досвіди реального часу на Unity — AR-примірки, VR-тренажери, 3D-конфігуратори продуктів, інтерактивні прототипи та кросплатформені розгортання з єдиної кодової бази. Наші послуги Unity-розробки охоплюють повний цикл: архітектуру, інжиніринг на C#, інтеграцію AR/VR, оптимізацію фізики та рендерингу, а також розгортання у продакшені без заморожених прототипів.",
    introStat:
      "Unity дозволяє запускати продукти на iOS, Android, WebGL, Meta Quest, HTC Vive та ПК без окремих кодових баз, скорочуючи витрати на мультиплатформену доставку на 40–60%.",
    problemsTitle: "Які проблеми вирішує Unity-розробка від Idea Team",
    problemsText:
      "Інтерактивні 3D-продукти зазвичай провалюються в одному з трьох місць: прототип не доходить до релізу, продуктивність не відповідає пристроям, або досвід ламається при переході між платформами. Ми проектуємо рішення, що уникають усіх трьох ризиків з першого дня.",
    servicesTitle: "Послуги Unity-розробки",
    servicesText: "Наша Unity development company працює у п’яти ключових напрямах:",
    practiceCta: "Подивитись на практиці",
    processTitle: "Процес розробки Unity",
    processText: "Ми ведемо Unity-проєкти структурованими milestones із тестованими deliverables на кожному етапі.",
    techTitle: "Технології",
    techText: "Наш Unity development stack покриває AR, VR та interactive 3D delivery.",
    industriesTitle: "Галузі застосування",
    industriesText:
      "Unity-розробка дає вимірний ефект там, де статичні медіа або звичайний UX не можуть якісно передати цінність продукту.",
    whyTitle: "Чому Idea Team для Unity Development",
    whyText:
      "Unity-розробка потребує глибини 3D engineering, performance discipline та platform knowledge, яких зазвичай немає у general software teams. Ми не лише прототипуємо, а й доводимо AR, VR та interactive 3D продукти до реальних користувачів.",
    whyItems: [
      "Глибина AR Foundation та ARKit — face tracking, markerless plane detection і фізично коректне розміщення об’єктів на реальних пристроях.",
      "Кросплатформеність на рівні архітектури — одна кодова база, всі цільові платформи, без retrofit rewrites.",
      "Performance-first engineering — кожна збірка профілюється під реальні обмеження пристроїв до передачі.",
      "PoC-to-production continuity — архітектура прототипу розрахована на масштабування, а не на викидання.",
      "Повна передача source — documented codebase, Unity project files, asset pipeline і відсутність vendor lock-in.",
    ],
    costTitle: "Вартість Unity-розробки",
    costText:
      "Вартість Unity-розробки залежить від типу досвіду, цільових платформ і складності збірки. Оцінка формується після технічної discovery-сесії.",
    costTiers: [
      ["Інтерактивний PoC", "$8,000 – $20,000", "Демо для інвесторів або product validation за 2–4 тижні."],
      ["Production mobile AR app", "$25,000 – $60,000", "AR-додаток для iOS та Android із custom physics і App Store deployment."],
      ["VR-симуляція", "$30,000 – $80,000", "Meta Quest або multi-headset OpenXR deployment залежно від складності середовища та взаємодій."],
      ["WebGL 3D-конфігуратор", "$20,000 – $50,000", "Browser-based 3D configurator із real-time material switching та product catalog integration."],
    ] as const,
    ctaTitle: "Розкажіть, який досвід мають отримати користувачі.",
    ctaText: "Ми визначимо обсяг Unity-рішення, цільові платформи та оцінимо його під час 30-хвилинної сесії.",
    ctaButton: "Розпочати проект",
    faqTitle: "FAQ",
    faqs: [
      ["Що таке Unity-розробка?", "Unity — це кросплатформений рушій для створення інтерактивних 3D-досвідів, AR/VR-додатків та ігор. Unity-розробка — це процес створення таких продуктів за допомогою Unity, C# та платформених SDK."],
      ["Які платформи підтримує Unity?", "Unity підтримує iOS, Android, WebGL, Windows, macOS, Meta Quest, HTC Vive та інші OpenXR-сумісні пристрої, а також PlayStation, Xbox і Nintendo Switch."],
      ["Що таке AR Foundation?", "AR Foundation — це кросплатформений шар Unity для AR, що об’єднує ARKit і ARCore в єдиний API для plane detection, face tracking, image anchoring та object placement."],
      ["Скільки триває розробка?", "Прототип або інтерактивне демо займає 2–4 тижні. Production mobile AR application — 8–16 тижнів. VR training simulation — 10–20 тижнів залежно від кількості середовищ і складності взаємодій."],
      ["Чим відрізняються AR і VR?", "AR накладає 3D-контент на реальний світ через камеру пристрою та зазвичай таргетує mobile devices. VR повністю замінює середовище користувача синтетичним 3D-світом і таргетує гарнітури на кшталт Meta Quest або HTC Vive."],
      ["Чи підтримує Unity WebGL?", "Так. Unity збирається у WebGL через WebAssembly, дозволяючи запускати 3D-конфігуратори, interactive product demos і gamified experiences у браузері без встановлення додатків."],
      ["Що таке відновлення legacy Unity-проєктів?", "Це технічний аудит і рефакторинг Unity-проєктів із поламаними збірками, undocumented architecture, застарілими версіями Unity або накопиченим technical debt."],
      ["Скільки коштує Unity-розробка?", "Інтерактивний PoC стартує від $8,000–$20,000. Production mobile AR app — $25,000–$60,000. VR simulation — $30,000–$80,000. WebGL 3D configurator — $20,000–$50,000."],
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

export default function UnityDevelopmentServicesPage() {
  const { locale } = useLocale();
  const lang = locale === "uk" ? "uk" : "en";
  const page = copy[lang];
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[560px] overflow-hidden px-4 pb-20 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0">
          <Image
            src="/images/Game-in-Unity.jpg"
            alt="Unity real-time 3D and interactive development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/62 to-black/20" />
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
            <Cuboid className="mb-5 h-10 w-10 text-[#FF6200]" />
            <p className="text-2xl font-semibold leading-tight text-foreground dark:text-white">
              {page.introStat}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
            {page.problemsTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
            {page.problemsText}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {solvedProblems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title.en}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
              >
                <Icon className="mb-5 h-8 w-8 text-[#FF6200]" />
                <h3 className="text-xl font-semibold">{problem.title[lang]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65 dark:text-white/65">
                  {problem.text[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#eef1f6] px-4 py-14 text-foreground dark:bg-[#323130] dark:text-white">
        <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[420px_1fr]">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:text-4xl">
              {page.servicesTitle}
            </h2>
            <p className="mb-8 text-foreground/65 dark:text-white/65">
              {page.servicesText}
            </p>
            <div className="border-t border-black/10 dark:border-white/10">
              {unityServices.map((service, index) => {
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
                    {service.title[lang]}
                  </button>
                );
              })}
            </div>
            <Link
              href="/projects/ar-earring-virtual-try-on"
              className="relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#FF6200] px-8 py-4 font-[Onest] text-base font-normal leading-[100%] text-white transition duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-black sm:w-auto"
            >
              {page.practiceCta}
            </Link>
          </div>
          <article className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#1b1d23]">
            <div className="relative h-60 bg-[#111] md:h-72">
              <Image
                src={unityServices[activeService].image}
                alt={unityServices[activeService].title[lang]}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="mb-3 text-3xl font-semibold">
                {unityServices[activeService].title[lang]}
              </h3>
              <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
                {unityServices[activeService].description[lang]}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold md:text-5xl">
            {page.processTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
            {page.processText}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title.en}
                className="rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#FF6200]/40 dark:border-white/10 dark:bg-[#191a20]"
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

      <section className="bg-[#f3f5fa] px-4 py-16 dark:bg-[#191a20] md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-semibold md:text-5xl">{page.techTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/65 dark:text-white/65">
              {page.techText}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {technologyStacks.map((stack) => {
              const Icon = stack.icon;
              return (
                <div
                  key={stack.label.en}
                  className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#111111]"
                >
                  <Icon className="mb-5 h-9 w-9 text-[#FF6200]" />
                  <h3 className="text-2xl font-semibold">{stack.label[lang]}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/10 px-3 py-1 text-sm text-foreground/70 dark:border-white/10 dark:text-white/70"
                      >
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

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold md:text-5xl">
            {page.industriesTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
            {page.industriesText}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industryItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title.en}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
              >
                <Icon className="mb-5 h-8 w-8 text-[#FF6200]" />
                <h3 className="text-xl font-semibold">{item.title[lang]}</h3>
                <p className="mt-3 leading-relaxed text-foreground/65 dark:text-white/65">
                  {item.text[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-[#191a20] md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              {page.whyTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/70 dark:text-white/70">
              {page.whyText}
            </p>
          </div>
          <ul className="space-y-3">
            {page.whyItems.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-foreground/75 dark:text-white/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6200]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
              className="mt-4 flex h-[40px] w-[240px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[16px] font-semibold leading-none tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] md:mt-0"
            >
              {page.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-3xl font-semibold md:text-5xl">
          {page.faqTitle}
        </h2>
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

      <div id="unity-development-audit" className="-mt-4">
        <RequestConsultationSection />
      </div>
    </main>
  );
}
