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
import { useLocale } from "@/lib/locale-context";

const services = [
  {
    title: { en: "Mobile App UI/UX Design", uk: "UI/UX дизайн мобільних додатків" },
    description: {
      en: "Design That Converts and Delights.",
      uk: "Дизайн, який конвертує та захоплює.",
    },
    image: "/images/ui-ux-mobile.png",
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
    image: "/images/ui-ux-brand.jpeg",
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
    items: ["Figma", "Adobe XD", "Framer", "Principle", "Webflow"],
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
    items: ["Component Libraries", "Documentation", "Brand Guidelines"],
    icon: Settings,
  },
  {
    label: "Graphics",
    items: ["Adobe Creative Suite", "Illustration", "Animation", "Motion Design"],
    icon: Sparkles,
  },
  {
    label: "Collaboration",
    items: ["FigJam", "Maze"],
    icon: Users,
  },
] as const;

const techIcons: Record<string, string> = {
  Figma: "/icons/tech/figma.svg",
  FigJam: "/icons/tech/figma.svg",
  "Adobe XD": "/icons/tech/adobe-xd-1.svg",
  Framer: "/icons/tech/framer.svg",
  Principle: "/icons/tech/principle.svg",
  Webflow: "/icons/tech/webflow.svg",
  "User Research": "/icons/tech/user-research-2.svg",
  "Usability Testing": "/icons/tech/usability-testingg.svg",
  Accessibility: "/icons/tech/accessibility.svg",
  "Design Systems": "/icons/tech/design-system.svg",
  Maze: "/icons/tech/Maze.svg",
  "Adobe Creative Suite": "/icons/tech/Adobe_Creative_Suite.svg",
  Illustration: "/icons/tech/Adobe-illustrator.svg",
  Animation: "/icons/tech/animation.svg",
  "Motion Design": "/icons/tech/motion-design.svg",
  "Component Libraries": "/icons/tech/libraries.svg",
  Documentation: "/icons/tech/documentation.svg",
  "Brand Guidelines": "/icons/tech/brand-guidelines.svg",
  "A/B Testing": "/icons/tech/ab-testing.svg",
  "Interactive Prototypes": "/icons/tech/interactive-prototypes.svg",
  "User Flows": "/icons/tech/user-flows.svg",
  Wireframes: "/icons/tech/wireframes.svg",
  Handoff: "/icons/tech/handoff.svg",
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
      "We create intuitive and visually compelling digital experiences that users love and businesses benefit from. Our UI/UX design services combine deep user research, strategic product design, and high-quality graphic design to deliver interfaces that drive engagement, increase conversions, and support sustainable business growth. At IdeaTeam, we don't just make things look beautiful — we design digital products that solve real problems, simplify complex processes, and help companies stand out in a competitive market. Whether you are launching a new mobile app, redesigning a web platform, building a SaaS product, or need a complete visual identity, our team turns your idea into a polished, user-centric solution ready for successful development.",
    introStat:
      "Companies investing in professional UI/UX design see 25-30% higher conversion rates, 40-60% improvement in user satisfaction, and significantly better customer retention compared to those treating design as an afterthought.",
    servicesTitle: "Design Services We Deliver",
    practiceCta: "See it in practice",
    designPhilosophy:
      "At IdeaTeam, we don't just make things look beautiful — we design digital products that solve real problems, simplify complex processes, and help companies stand out in competitive markets. Every design decision is rooted in user research, validated through testing, and optimized for measurable business outcomes.",
    whyChooseTitle: "Why Choose IdeaTeam for Your Product Design",
    whyChooseItems: [
      "User-first approach — every design decision is based on real user needs and validated through research and testing",
      "Full-cycle product design from concept to production-ready design system",
      "Modern, consistent and conversion-oriented graphic design",
      "Seamless collaboration between design and development teams",
      "Fast iterations based on user feedback and business goals",
      "Proven experience across various industries and types of digital products",
    ],
    practiceCta: "See it in practice",
    designValueTitle: "Why product design matters for your business",
    designValueItems: [
      "Professional design services are much more than just making interfaces look good. In today\u2019s competitive market, thoughtful product design directly affects user retention, conversion rates, and overall business success.",
      "A well-designed digital product builds trust, simplifies complex tasks, and creates emotional connection with your audience. Companies that invest in quality UI/UX see significantly better results compared to those who treat design as an afterthought.",
      "At IdeaTeam, we help you create not only beautiful but also effective solutions that support your long-term goals and give you a strong competitive advantage.",
    ],
    techTitle: "Design Tools & Technologies",
    processTitle: "Our Design Process",
    costTitle: "How Much Does Quality Product Design Cost in 2026?",
    costText:
      "The cost of product design depends on the complexity of the project, the depth of research, and the scope of deliverables. At IdeaTeam we offer transparent pricing and several cooperation formats — from fixed-price projects to dedicated design teams.\n\nWe always focus on delivering maximum value for your investment. Most clients see return on design investment through increased conversions and stronger market position within the first months after launch.",
    costTiers: [
      [
        "Startup MVP Design",
        "$1,000+",
        "5-10 key screens, basic design system, wireframes and prototypes.",
      ],
      [
        "Product Design Project",
        "$2,000+",
        "Complete product flow, design system, high-fidelity mockups, user testing.",
      ],
      [
        "Enterprise Design Program",
        "$2,500+",
        "Multi-product ecosystem, comprehensive design system, ongoing optimization.",
      ],
    ],
    ctaTitle: "Ready to build a product your users will fall in love with?",
    ctaText:
      "Let's discuss your project. IdeaTeam's design team will help you create an exceptional user experience that drives real business results.",
    ctaButton: "Start your design project",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        question: "What are UI/UX and Graphic Design Services?",
        answer:
          "Our UI/UX design services focus on creating intuitive, beautiful, and functional interfaces for digital products. We combine user experience research, strategic product design, and professional graphic design to deliver solutions that users love and that drive real business results. From mobile apps to complex web platforms, we help turn your idea into a polished product.",
      },
      {
        question: "Why is professional product design important for my business?",
        answer:
          "Quality product design directly impacts user engagement, conversion rates, and long-term success. A well-crafted user-centric interface builds trust, reduces churn, and helps your digital product stand out in a competitive market. Companies that invest in expert design services typically see faster growth and better ROI.",
      },
      {
        question: "What is included in your full-cycle design services?",
        answer:
          "We provide end-to-end design services including user research, wireframing, UI/UX design, interactive prototyping, graphic design, design systems, and smooth handoff to development. The process ensures your product is validated with user feedback before development begins.",
      },
      {
        question: "How do you ensure a user-centric approach in every project?",
        answer:
          "We place the user at the center of every decision. Through in-depth research, audience analysis, and regular user feedback loops, our designers create experiences that solve real problems and feel natural. This approach leads to higher satisfaction and successful digital products.",
      },
      {
        question: "What types of projects do you work on?",
        answer:
          "We handle a wide range of projects including mobile app UI/UX, web applications, SaaS platforms, dashboards, landing pages, and complete brand graphic design. Our team has expertise across multiple industry sectors and delivers both standalone design and design and development solutions.",
      },
      {
        question: "How long does the design process usually take?",
        answer:
          "The timeline depends on project scope and complexity. A typical product design journey takes 4 to 12 weeks. We use a lean process with clear stages to deliver high-quality results as efficiently as possible while keeping you involved throughout.",
      },
      {
        question: "Do you collaborate with our internal team and developers?",
        answer:
          "Yes. Our design team works as an extension of your team. We maintain close collaboration with your stakeholders, product managers, and development specialists to ensure seamless integration and that all designs are technically feasible to build.",
      },
      {
        question: "How do you validate ideas before full development?",
        answer:
          "We validate concepts early through user research, competitor analysis, wireframes, and interactive prototypes. This helps gather valuable insight, reduce risks, and make informed decisions — saving time and budget while increasing the chances of success.",
      },
      {
        question: "What tools do you use for UI/UX and Graphic Design?",
        answer:
          "We master modern tools such as Figma, FigJam, Framer, Adobe Creative Suite, and Maze. These collaboration tools allow real-time feedback, fast iterations, and efficient delivery of production-ready digital design assets.",
      },
      {
        question: "What is the difference between UI Design and UX Design?",
        answer:
          "UI design focuses on the visual aspects — colors, typography, icons, and aesthetics. UX design concentrates on the overall user experience — flows, usability, and how easily users achieve their goals. We excel at both, delivering harmonious product design where beauty meets functionality.",
      },
      {
        question: "How much do your design services cost?",
        answer:
          "Pricing depends on the project scope, depth of research, and deliverables. We offer flexible models including fixed-price design services, dedicated designer teams, and phased payments. We always aim to deliver maximum value aligned with your business goals.",
      },
      {
        question: "Why should I choose IdeaTeam for my next design project?",
        answer:
          "Clients choose us for our user-centric approach, proven expertise, and focus on measurable results. We don't just deliver beautiful designs — we create successful digital products that support your business growth. Our team becomes a true partner on your journey from idea to market.",
      },
    ],
  },
  uk: {
    heroTitle: "Послуги UI/UX та графічного дизайну",
    heroSubtitle: "Дизайн, який конвертує та захоплює",
    intro:
      "Ми створюємо інтуїтивно зрозумілі та візуально привабливі цифрові продукти, які подобаються користувачам і приносять реальну користь бізнесу. Наші послуги UI/UX-дизайну поєднують глибокі користувацькі досл����дження, стратегічний продуктовий дизайн та високоякісний графічний дизайн. Результат — інтерфейси, що підвищують залученість, збільшують конверсії та сприяють сталому зростанню бізнесу. В IdeaTeam ми не просто робимо красиві інтерфейси — ми розробляємо цифрові продукти, які вирішують реальні проблеми, спрощують складні процеси та допомагають компаніям ефективно виділятися на конкурентному ринку. Незалежно від того, чи ви запускаєте новий мобільний застосунок, оновлюєте веб-платформу, створюєте SaaS-продукт чи потребуєте повної візуальної ідентичності бренду — наша команда перетворює вашу ідею на відшліфоване, орієнтоване на користувача рішення, повністю готове до успішної розробки.",
    introStat:
      "Компанії, які інвестують у професійний UI/UX дизайн, бачать 25-30% вищі показники конверсії, 40-60% покращення задоволення користувачів та значно кращу утримання клієнтів порівняно з тими, хто розглядає дизайн як другорядний етап.",
    servicesTitle: "Послуги дизайну, які ми надаємо",
    practiceCta: "Подивитись на практиці",
    designPhilosophy:
      "В IdeaTeam ми не просто робимо красиві інтерфейси — ми розробляємо цифрові продукти, які вирішують реальні проблеми, спрощують складні процеси та допомагають компаніям виділятися на конкурентному ринку. Кожне рішення ґрунтується на користувацьких дослідженнях, перевіряється через тестування та оптимізується для вимірюваних бізнес-результатів.",
   whyChooseTitle: "Чому обирають IdeaTeam для продуктового дизайну",
    whyChooseItems: [
      "Орієнтований на користувача підхід — кожне дизайн-рішення ґрунтується на реальних потребах користувачів і валідується через дослідження та тестування",
      "Повний цикл продуктового дизайну від концепції до готової до продакшену дизайн-системи",
      "Сучасний, узгоджений та орієнтований на конверсію графічний дизайн",
      "Тісна взаємодія між командами дизайну та розробки",
      "Швидкі ітерації на основі відгуків користувачів та бізнес-цілей",
      "Підтверджений досвід у різних галузях та типах цифрових продуктів",
    ],
    designValueTitle: "Чому продуктовий дизайн важливий для вашого бізнесу",
    designValueItems: [
      "Професійні дизайн-послуги — це набагато більше, ніж просто красиві інтерфейси. На сучасному конкурентному ринку продуманий продуктовий дизайн безпосередньо впливає на утримання користувачів, показники конверсії та загальний успіх бізнесу.",
      "Добре спроектований цифровий продукт будує довіру, спрощує складні завдання та створює емоційний зв'язок з аудиторією. Компанії, що інвестують у якісний UI/UX, отримують значно кращі результати порівняно з тими, хто ставиться до дизайну як до другорядного питання.",
      "В IdeaTeam ми допомагаємо створювати не лише красиві, але й ефективні рішення, які підтримують ваші довгострокові цілі та забезпечують сильну конкурентну перевагу.",
    ],
    techTitle: "Дизайн-інструменти та технології",
    processTitle: "Наш процес дизайну",
    costTitle: "Скільки коштує якісний продуктовий дизайн у 2026 році?",
    costText:
      "Вартість продуктового дизайну залежить від складності проекту, глибини досліджень та обсягу робіт. В IdeaTeam ми пропонуємо прозоре ціноутворення та гнучкі формати співпраці — від фіксованої вартості проекту до виділеної команди дизайнерів.\n\nМи завжди орієнтуємося на максимальну цінність для ваших інвестицій. Більшість клієнтів бачать окупність витрат на дизайн завдяки зростанню конверсій та посиленню ринкових позицій вже в перші місяці після запуску.",
    costTiers: [
      [
        "Дизайн Startup MVP",
        "$1,000+",
        "5-10 ключових екранів, базова дизайн-система, wire-фрейми та прототипи.",
      ],
      [
        "Проект продуктового дизайну",
        "$2,000+",
        "Повний flow продукту, дизайн-система, високоякісні макети, користувацьке тестування.",
      ],
      [
        "Корпоративна дизайн-програма",
        "$2,500+",
        "Екосистема кількох продуктів, комплексна дизайн-система, постійна оптимізація.",
      ],
    ],
    ctaTitle: "Готові створити продукт, у який закохаються ваші користувачі?",
    ctaText:
      "Давайте обговоримо ваш проект. Команда дизайнерів IdeaTeam допоможе розробити винятковий користувацький досвід, який приноситиме реальні бізнес-результати.",
    ctaButton: "Почати ваш дизайн-проект",
    faqTitle: "Часті запитання",
    faqItems: [
      {
        question: "Що таке послуги UI/UX та графічного дизайну?",
        answer:
          "Наші послуги UI/UX-дизайну спрямовані на створення інтуїтивних, красивих і функціональних інтерфейсів для цифрових продуктів. Ми поєднуємо дослідження користувацького досвіду, стратегічний продуктовий дизайн та професійний графічний дизайн, щоб створювати рішення, які подобаються людям і приносять бізнес-результат.",
      },
      {
        question: "Чому професійний продуктовий дизайн важливий для бізнесу?",
        answer:
          "Якісний продуктовий дизайн суттєво впливає на залученість користувачів, конверсії та довгостроковий успіх. Орієнтований на користувача інтерфейс підвищує довіру, зменшує відтік клієнтів і допомагає цифровому продукту виділятися на конкурентному ринку.",
      },
      {
        question: "Що входить у повний цикл послуг дизайну?",
        answer:
          "Ми надаємо комплексні послуги дизайну: дослідження користувачів, вайрфреймінг, UI/UX-дизайн, інтерактивні прототипи, графічний дизайн, дизайн-системи та плавну передачу матеріалів розробникам. Процес гарантує, що продукт перевіряється з реальними користувачами ще до початку розробки.",
      },
      {
        question: "Як ви забезпечуєте орієнтованість на користувача в кожному проекті?",
        answer:
          "Ми ставимо користувача в центр кожного рішення. Завдяки глибоким дослідженням, аналізу аудиторії та регулярному зворотному зв'язку наші дизайнери створюють досвід, який вирішує реальні проблеми та відчувається природним. Це призводить до вищого рівня задоволення та успішних цифрових продуктів.",
      },
      {
        question: "Які типи проектів ви виконуєте?",
        answer:
          "Ми працюємо з різними проектами: UI/UX мобільних застосунків, веб-додатками, SaaS-платформами, дашбордами, лендінгами та повним графічним дизайном бренду. Маємо експертизу в багатьох галузях і реалізуємо як окремі дизайн-проекти, так і комплексні рішення дизайн та розробки.",
      },
      {
        question: "Скільки часу займає процес дизайну?",
        answer:
          "Терміни залежать від складності проекту. Зазвичай повний цикл продуктового дизайну триває від 4 до 12 тижнів. Ми застосовуємо lean підхід із чіткими етапами для ефективної роботи без втрати якості.",
      },
      {
        question: "Чи співпрацюєте ви з нашою внутрішньою командою та розробниками?",
        answer:
          "Так. Наша команда дизайну стає продовженням вашої команди. Ми активно співпрацюємо зі стейкхолдерами, продакт-менеджерами та розробниками, щоб забезпечити технічну реалізованість усіх рішень.",
      },
      {
        question: "Як ви валідуєте ідеї перед повноцінною розробкою?",
        answer:
          "Ми проводимо ранню валідацію через дослідження, аналіз конкурентів, вайрфрейми та інтерактивні прототипи. Це дозволяє зібрати цінні інсайти, зменшити ризики та приймати обґрунтовані рішення — заощаджуючи час і бюджет.",
      },
      {
        question: "Які інструменти ви використовуєте для UI/UX та графічного дизайну?",
        answer:
          "Ми професійно працюємо з сучасними інструментами: Figma, FigJam, Framer, Adobe Creative Suite та Maze. Ці інструменти забезпечують зворотний зв'язок у реальному часі, швидкі ітерації та ефективну передачу готових дизайн-матеріалів.",
      },
      {
        question: "Чим відрізняється UI-дизайн від UX-дизайну?",
        answer:
          "UI-дизайн відповідає за візуальну складову — кольори, типографіку, іконки та естетику. UX-дизайн зосереджений на загальному користувацькому досвіді — сценаріях, зручності та тому, наскільки легко користувачі досягають своїх цілей. Ми майстерно поєднуємо обидва напрямки.",
      },
      {
        question: "Скільки коштують ваші послуги дизайну?",
        answer:
          "Вартість залежить від обсягу проекту, глибини досліджень та переліку робіт. Ми пропонуємо гнучкі моделі співпраці, включаючи фіксовану вартість, виділені команди дизайнерів та поетапну оплату. Завжди прагнемо до максимальної цінності відповідно до ваших бізнес-цілей.",
      },
      {
        question: "Чому варто обрати IdeaTeam для наступного дизайн-проекту?",
        answer:
          "Клієнти обирають нас завдяки користувацько-орієнтованому підходу, глибокій експертизі та фокусу на реальних бізнес-результатах. Ми не просто створюємо красиві дизайни — ми розробляємо успішні цифрові продукти, що підтримують зростання вашого бізнесу. Наша команда стає надійним партнером на шляху від ідеї до ринку.",
      },
    ],
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

export default function UIUXDesignPage() {
  const [activeService, setActiveService] = useState(0);
  const { locale } = useLocale();
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[560px] overflow-hidden px-4 pb-20 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0">
          <Image
            src="/images/ui-ux-designer.png"
            alt="UI/UX and graphic design services"
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

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.10),transparent_32%),#F7F8FA] px-4 py-16 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.05),transparent_32%),#1a1a1a]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#111_0.5px,transparent_0.5px)] [background-size:3px_3px]"></div>
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="text-[18px] leading-[1.8] text-[#4B5563] dark:text-white/72 md:text-xl space-y-4">
            <p>
              We create intuitive and visually compelling digital experiences that users love and businesses benefit from. Our <strong>UI/UX design services combine deep user research, strategic product design</strong>, and high-quality graphic design to deliver interfaces that drive engagement, increase conversions, and support sustainable business growth. 
            </p>
            <p>
              At IdeaTeam, <strong>we don&apos;t just make things look beautiful — we design digital products that solve real problems, simplify complex processes, and help companies stand out in a competitive market.</strong> Whether you are launching a new{" "}
              <Link href="/services/mobile-app-development" className="font-semibold text-[#FF6200] hover:underline">
                mobile app
              </Link>
              , redesigning a{" "}
              <Link href="/services/web-application-development" className="font-semibold text-[#FF6200] hover:underline">
                web platform
              </Link>
              , building a{" "}
              <Link href="/services/custom-software-development" className="font-semibold text-[#FF6200] hover:underline">
                SaaS product
              </Link>
              , or need a complete visual identity, our team turns your idea into a polished, user-centric solution ready for successful development.
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#191a20]">
            <Sparkles className="mb-5 h-10 w-10 text-[#FF6200]" />
            <p className="text-2xl font-semibold leading-tight text-foreground dark:text-white">
              {page.introStat}
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#eef1f6] px-4 py-14 text-foreground dark:bg-[#323130] dark:text-white">
        <div className="mx-auto grid max-w-6xl gap-10 xl:grid-cols-[420px_1fr]">
          <div className="flex flex-col">
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
            {/* Button hidden on mobile — shown on desktop below the list */}
            <Link
              href="https://ideateam.dev/projects/"
              className="mt-8 hidden h-[40px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[14px] font-semibold leading-none tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] xl:flex md:text-[16px]"
            >
              {page.practiceCta}
            </Link>
          </div>
          <div className="flex flex-col gap-0">
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
            {/* Button shown on mobile — below the image+text card */}
            <Link
              href="https://ideateam.dev/projects/"
              className="mt-6 flex h-[40px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[14px] font-semibold leading-none tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] xl:hidden md:text-[16px]"
            >
              {page.practiceCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left: sticky title + philosophy + CTA */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-3xl font-semibold md:text-5xl">
              {page.whyChooseTitle}
            </h2>
            <p className="mt-6 text-lg leading-[1.8] text-foreground/75 dark:text-white/75">
              {page.designPhilosophy}
            </p>
            <Link
              href="https://ideateam.dev/projects/"
              className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-[50px] bg-[#FF6200] px-6 py-3 font-['Onest'] text-[15px] font-semibold leading-snug text-white transition-all hover:bg-[#e45700]"
            >
              {page.practiceCta}
            </Link>
          </div>
          {/* Right: vertical benefit cards */}
          <div className="space-y-3">
            {page.whyChooseItems.map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#161515]"
              >
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#FF6200]" />
                <p className="leading-relaxed text-foreground/75 dark:text-white/75">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f5fa] px-4 py-14 dark:bg-[#1f2026] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {page.designValueItems.map((para, i) => (
            <p
              key={i}
              className="text-lg leading-[1.8] text-foreground/75 dark:text-white/75 md:text-xl"
            >
              {para}
            </p>
          ))}
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
            <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-justify text-foreground/60 dark:text-white/60">
              {page.costText.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
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

      <section className="w-full px-5 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3 lg:px-12 lg:py-4">
        <div className="relative mx-auto max-w-[96%] overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f0f0f] via-[#1a0f00] to-[#2a1708] sm:max-w-[92%]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#ff6200_12%,transparent_70%)] opacity-70 blur-xl md:opacity-90 md:blur-3xl" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:gap-10 md:px-16 md:py-12 lg:px-24">
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
              className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-[50px] bg-[#FF6200] px-6 py-3 text-center font-['Onest'] text-[16px] font-semibold leading-snug text-white transition-all hover:bg-[#e45700] md:w-auto md:min-w-[200px]"
            >
              {page.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <div id="ui-ux-estimate" className="-mt-4">
        <RequestConsultationSection />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-3xl font-semibold md:text-5xl">
          {page.faqTitle}
        </h2>
        <div className="space-y-4">
          {page.faqItems.map(({ question, answer }) => (
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
    </main>
  );
}
