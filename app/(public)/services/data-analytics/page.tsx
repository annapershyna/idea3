"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Brain,
  Database,
  GitBranch,
  LineChart,
  PieChart,
  Search,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { useLocale } from "@/lib/locale-context";

const services = [
  {
    title: { en: "Business Intelligence & Reporting", uk: "Business Intelligence та звітність" },
    description: {
      en: "Interactive dashboards and automated reporting solutions for complete visibility into your business performance. We develop executive dashboards, KPI tracking systems, revenue analytics, and real-time BI solutions using Power BI, Tableau, Looker, and Google Looker Studio.",
      uk: "Інтерактивні дашборди та автоматизована звітність для повної видимості ефективності вашого бізнесу. Ми розробляємо виконавчі дашборди, системи відстеження KPI, аналітику доходів та BI-рішення в реальному часі за допомогою Power BI, Tableau, Looker та Google Looker Studio.",
    },
    image: "/images/analytics-bi.png",
  },
  {
    title: { en: "Predictive Analytics & AI", uk: "Предиктивна аналітика та ШІ" },
    description: {
      en: "Machine learning and statistical modeling for forecasting revenue, predicting customer churn, optimizing inventory, and reducing operational risks. Our AI analytics solutions help organizations make proactive decisions rather than reactive responses.",
      uk: "Машинне навчання та статистичне моделювання для прогнозування доходів, передбачення відтоку клієнтів, оптимізації запасів та зниження операційних ризиків. Наші AI-рішення допомагають організаціям приймати проактивні рішення.",
    },
    image: "/images/analytics-predictive.png",
  },
  {
    title: { en: "Data Engineering & Pipelines", uk: "Інженерія даних та конвеєри" },
    description: {
      en: "Scalable infrastructure for collecting, processing, and transforming data from multiple sources. We design data warehouses, ETL/ELT pipelines, data lakes, and cloud architectures on AWS, Azure, Google Cloud, Snowflake, BigQuery, and Databricks.",
      uk: "Масштабована інфраструктура для збору, обробки та трансформації даних з різних джерел. Ми проектуємо сховища даних, ETL/ELT конвеєри, озера даних та хмарні архітектури на AWS, Azure, Google Cloud, Snowflake, BigQuery та Databricks.",
    },
    image: "/images/analytics-engineering.png",
  },
  {
    title: { en: "Marketing & Customer Analytics", uk: "Маркетингова та клієнтська аналітика" },
    description: {
      en: "Deep analysis of customer acquisition cost, lifetime value, attribution models, conversion rates, and campaign performance. We help marketing teams maximize ROI and improve customer acquisition strategies through data-driven insights.",
      uk: "Глибокий аналіз вартості залучення клієнтів, довічної цінності, моделей атрибуції, конверсій та ефективності кампаній. Ми допомагаємо маркетинговим командам максимізувати ROI через аналітику.",
    },
    image: "/images/analytics-marketing.png",
  },
] as const;

const stacks = [
  {
    label: "BI & Visualization",
    items: ["Power BI", "Tableau", "Looker", "Looker Studio"],
    icon: BarChart3,
  },
  {
    label: "Data Warehouses",
    items: ["Snowflake", "BigQuery", "Redshift", "Azure Synapse"],
    icon: Database,
  },
  {
    label: "Cloud Platforms",
    items: ["AWS", "Azure", "Google Cloud"],
    icon: Activity,
  },
  {
    label: "Data Engineering",
    items: ["Python", "SQL", "Apache Spark", "Apache Airflow"],
    icon: GitBranch,
  },
  {
    label: "Machine Learning",
    items: ["TensorFlow", "Scikit-learn", "XGBoost", "PyTorch"],
    icon: Brain,
  },
  {
    label: "Data Processing",
    items: ["Databricks", "dbt", "Kafka", "Airbyte"],
    icon: Settings,
  },
] as const;

const techIcons: Record<string, string> = {
  "Power BI": "/icons/tech/powerbi.svg",
  Tableau: "/icons/tech/tableau.svg",
  Looker: "/icons/tech/looker.svg",
  Snowflake: "/icons/tech/snowflake.svg",
  BigQuery: "/images/gcp.svg",
  Redshift: "/images/aws.svg",
  AWS: "/images/aws.svg",
  Azure: "/icons/tech/azure.svg",
  "Google Cloud": "/images/gcp.svg",
  Python: "/images/python.svg",
  SQL: "/icons/tech/mssql.svg",
  TensorFlow: "/icons/tech/tensorflow.svg",
  Databricks: "/icons/tech/databricks.svg",
};

const processSteps = [
  {
    title: { en: "Discovery & Business Assessment", uk: "Аналіз бізнесу та цілей" },
    text: {
      en: "We analyze your business objectives, challenges, existing data infrastructure, and reporting requirements.",
      uk: "Аналізуємо ваші бізнес-цілі, виклики, наявну інфраструктуру даних та вимоги до звітності.",
    },
    icon: Search,
  },
  {
    title: { en: "Data Audit & Strategy", uk: "Аудит даних та стратегія" },
    text: {
      en: "Our specialists evaluate data quality, accessibility, consistency, governance, and readiness for analytics initiatives.",
      uk: "Спеціалісти оцінюють якість, доступність, узгодженість, управління даними та готовність до аналітичних ініціатив.",
    },
    icon: Settings,
  },
  {
    title: { en: "Architecture & Integration", uk: "Архітектура та інтеграція" },
    text: {
      en: "We build scalable data pipelines and integrate data sources across your organization into a unified analytics ecosystem.",
      uk: "Будуємо масштабовані конвеєри даних та інтегруємо джерела даних у єдину аналітичну екосистему.",
    },
    icon: GitBranch,
  },
  {
    title: { en: "Analytics Development", uk: "Розробка аналітики" },
    text: {
      en: "Our team develops dashboards, reports, predictive models, KPIs, and advanced analytics solutions tailored to your goals.",
      uk: "Розробляємо дашборди, звіти, предиктивні моделі, KPI та аналітичні рішення під ваші цілі.",
    },
    icon: BarChart3,
  },
  {
    title: { en: "Validation & Optimization", uk: "Валідація та оптимізація" },
    text: {
      en: "We continuously test, refine, and improve analytics models to ensure accuracy, reliability, and business relevance.",
      uk: "Безперервно тестуємо, вдосконалюємо та покращуємо аналітичні моделі для забезпечення точності та бізнес-релевантності.",
    },
    icon: TrendingUp,
  },
  {
    title: { en: "Ongoing Support & Scaling", uk: "Підтримка та масштабування" },
    text: {
      en: "As your business evolves, we help scale your analytics capabilities and continuously improve performance.",
      uk: "У міру розвитку вашого бізнесу ми допомагаємо масштабувати аналітичні можливості та постійно покращувати результати.",
    },
    icon: Activity,
  },
] as const;

const copy = {
  en: {
    heroTitle: "Data Analytics Services",
    heroSubtitle: "Turn Your Data Into Revenue, Growth, and Smarter Decisions",
    intro:
      "Our Data Analytics Services help companies transform raw data into strategic intelligence, enabling faster decision-making, operational efficiency, customer growth, and measurable business outcomes. As a trusted analytics partner for businesses across the United States, Canada, and EU, we combine AI analytics consulting, advanced business intelligence, and enterprise-grade data engineering to support sustainable growth and competitive advantage.",
    introStat:
      "Clients typically reduce reporting time by up to 80%, increase marketing ROI by 25–35%, and improve forecast accuracy by 30–50% with our analytics solutions.",
    servicesTitle: "Data Analytics Services We Provide",
    practiceCta: "See it in practice",
    industryTitle: "Industries We Serve",
    industryItems: [
      "SaaS & Technology",
      "eCommerce & Retail",
      "Healthcare",
      "Financial Services",
      "Manufacturing",
      "Logistics & Transportation",
    ],
    industryDesc: {
      "SaaS & Technology": "Track user behavior, product adoption, retention, recurring revenue, and growth metrics.",
      "eCommerce & Retail": "Optimize sales performance, inventory, customer segmentation, demand forecasting, and conversions.",
      Healthcare: "Improve patient outcomes, operational efficiency, compliance reporting, and resource allocation.",
      "Financial Services": "Enhance risk analysis, fraud detection, forecasting, financial reporting, and regulatory compliance.",
      Manufacturing: "Improve production efficiency, supply chain visibility, quality control, and predictive maintenance.",
      "Logistics & Transportation": "Optimize routes, operational costs, fleet performance, delivery efficiency, and resource utilization.",
    },
    whyTitle: "Why Choose Our Data Analytics Team",
    whyItems: [
      {
        title: "Business-Focused Approach",
        desc: "We don't just analyze data — we solve business problems and drive measurable outcomes.",
        icon: TrendingUp,
      },
      {
        title: "Experienced Analytics Experts",
        desc: "Our team includes data analysts, BI experts, data engineers, ML specialists, and analytics consultants.",
        icon: Users,
      },
      {
        title: "Strategic Analytics Partner",
        desc: "We act as an extension of your internal team, providing ongoing guidance and strategic recommendations.",
        icon: LineChart,
      },
      {
        title: "Scalable Solutions",
        desc: "From startup environments to enterprise-grade platforms, our solutions grow alongside your business.",
        icon: Activity,
      },
      {
        title: "Modern Technology Stack",
        desc: "We utilize industry-leading analytics tools, cloud platforms, AI technologies, and data engineering frameworks.",
        icon: Settings,
      },
      {
        title: "Actionable Insights",
        desc: "Every report, dashboard, and predictive model is designed to support better decisions and tangible outcomes.",
        icon: PieChart,
      },
    ],
    techTitle: "Technology Stack",
    techBody:
      "We work with industry-leading analytics platforms, cloud data warehouses, and AI/ML frameworks to build scalable, reliable analytics ecosystems.",
    processTitle: "Our Data Analytics Process",
    costTitle: "Data Analytics Service Pricing",
    costText:
      "Every analytics initiative is unique. The final cost depends on your business goals, data infrastructure, reporting requirements, technology stack, and team composition.",
    costTiers: [
      [
        "Dedicated Data Analytics Team",
        "from $2,000/mo",
        "Ongoing analytics support, BI development, data engineering, and continuous optimization. Includes Data Analyst, BI Developer, Data Engineer, Analytics Consultant, and Project Manager.",
      ],
      [
        "Analytics Project Delivery",
        "from $2,000",
        "Fixed-scope delivery of dashboards, Power BI/Tableau implementations, data warehouse setup, customer analytics, or predictive models.",
      ],
      [
        "Analytics Team Augmentation",
        "from $18/hr",
        "Expand your existing team with experienced Data Analysts, BI Developers, Data Engineers, or ML Engineers.",
      ],
    ],
    ctaTitle: "Ready to Unlock the Full Value of Your Data?",
    ctaText:
      "Schedule a consultation with our analytics experts. We'll assess your business objectives, data maturity, and growth plans to provide a tailored estimate and implementation roadmap.",
    ctaButton: "Schedule a consultation",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        question: "What are Data Analytics Services?",
        answer:
          "Data Analytics Services involve collecting, processing, analyzing, and visualizing business data to generate actionable insights that improve decision-making and business performance.",
      },
      {
        question: "How can data analytics help my business?",
        answer:
          "Data analytics helps organizations reduce costs, increase revenue, improve operational efficiency, optimize customer experiences, identify growth opportunities, and make data-driven decisions.",
      },
      {
        question: "What industries benefit most from data analytics?",
        answer:
          "Virtually every industry benefits from analytics, including SaaS, healthcare, finance, retail, manufacturing, logistics, real estate, and professional services.",
      },
      {
        question: "Do you provide custom analytics solutions?",
        answer:
          "Yes. Every engagement is tailored to your business objectives, data sources, KPIs, operational requirements, and growth goals.",
      },
      {
        question: "Can you work with our existing systems?",
        answer:
          "Absolutely. We integrate with existing CRMs, ERPs, marketing platforms, databases, cloud environments, and third-party applications.",
      },
      {
        question: "What is the difference between Business Intelligence and Data Analytics?",
        answer:
          "Business Intelligence focuses on monitoring and reporting historical performance, while Data Analytics helps organizations understand trends, predict outcomes, and identify future opportunities.",
      },
      {
        question: "Do you offer AI analytics consulting?",
        answer:
          "Yes. Our AI analytics consulting services combine machine learning, predictive modeling, automation, and advanced analytics to generate AI-powered business insights and support smarter decision-making.",
      },
    ],
  },
  uk: {
    heroTitle: "Послуги аналітики даних",
    heroSubtitle: "Перетворіть свої дані на дохід, зростання та розумні рішення",
    intro:
      "Наші послуги аналітики даних допомагають компаніям перетворювати сирі дані на стратегічну інтелектуальну систему, забезпечуючи швидше прийняття рішень, операційну ефективність, зростання клієнтів та вимірювані бізнес-результати. Як надійний аналітичний партнер для бізнесу в США, Канаді та ЄС, ми поєднуємо AI-консалтинг, передову бізнес-аналітику та інженерію даних корпоративного рівня.",
    introStat:
      "Клієнти зазвичай скорочують час звітності до 80%, збільшують ROI маркетингу на 25–35% та покращують точність прогнозів на 30–50% із нашими аналітичними рішеннями.",
    servicesTitle: "Послуги аналітики даних, які ми надаємо",
    practiceCta: "Подивитись на практиці",
    industryTitle: "Галузі, з якими ми працюємо",
    industryItems: [
      "SaaS та технології",
      "eCommerce та рітейл",
      "Охорона здоров'я",
      "Фінансові послуги",
      "Виробництво",
      "Логістика та транспорт",
    ],
    industryDesc: {
      "SaaS та технології": "Відстеження поведінки користувачів, впровадження продуктів, утримання, повторюваного доходу та показників зростання.",
      "eCommerce та рітейл": "Оптимізація продажів, управління запасами, сегментація клієнтів, прогнозування попиту та конверсій.",
      "Охорона здоров'я": "Покращення результатів лікування, операційна ефективність, звітність про відповідність та розподіл ресурсів.",
      "Фінансові послуги": "Аналіз ризиків, виявлення шахрайства, прогнозування, фінансова звітність та регуляторна відповідність.",
      "Виробництво": "Ефективність виробництва, видимість ланцюга постачання, контроль якості та прогностичне обслуговування.",
      "Логістика та транспорт": "Оптимізація маршрутів, операційних витрат, ефективності флоту та ресурсів.",
    },
    whyTitle: "Чому обирають нашу команду аналітики даних",
    whyItems: [
      {
        title: "Бізнес-орієнтований підхід",
        desc: "Ми не просто аналізуємо дані — ми вирішуємо бізнес-проблеми та досягаємо вимірюваних результатів.",
        icon: TrendingUp,
      },
      {
        title: "Досвідчені експерти з аналітики",
        desc: "Наша команда включає аналітиків даних, BI-експертів, дата-інженерів, ML-спеціалістів та консультантів.",
        icon: Users,
      },
      {
        title: "Стратегічний аналітичний партнер",
        desc: "Ми діємо як розширення вашої внутрішньої команди, надаючи постійне керівництво та стратегічні рекомендації.",
        icon: LineChart,
      },
      {
        title: "Масштабовані рішення",
        desc: "Від стартап-середовищ до корпоративних платформ — наші рішення ростуть разом з вашим бізнесом.",
        icon: Activity,
      },
      {
        title: "Сучасний технологічний стек",
        desc: "Використовуємо провідні аналітичні інструменти, хмарні платформи та AI/ML фреймворки.",
        icon: Settings,
      },
      {
        title: "Дієві інсайти",
        desc: "Кожен звіт, дашборд та предиктивна модель розроблені для підтримки кращих рішень та відчутних результатів.",
        icon: PieChart,
      },
    ],
    techTitle: "Технологічний стек",
    techBody:
      "Ми працюємо з провідними аналітичними платформами, хмарними сховищами даних та AI/ML фреймворками для побудови масштабованих аналітичних екосистем.",
    processTitle: "Наш процес аналітики даних",
    costTitle: "Ціноутворення послуг аналітики даних",
    costText:
      "Кожна аналітична ініціатива унікальна. Кінцева вартість залежить від ваших бізнес-цілей, інфраструктури даних, вимог до звітності, технологічного стеку та складу команди.",
    costTiers: [
      [
        "Виділена команда аналітики даних",
        "від $2,000/міс",
        "Постійна аналітична підтримка, розробка BI, інженерія даних та безперервна оптимізація. Включає аналітика, BI-розробника, дата-інженера, консультанта та менеджера проекту.",
      ],
      [
        "Проектна розробка аналітики",
        "від $2,000",
        "Фіксований обсяг: розробка дашбордів, впровадження Power BI/Tableau, налаштування сховища даних, клієнтська аналітика або предиктивні моделі.",
      ],
      [
        "Розширення команди аналітики",
        "від $18/год",
        "Розширення вашої команди досвідченими аналітиками даних, BI-розробниками, дата-інженерами або ML-інженерами.",
      ],
    ],
    ctaTitle: "Готові розкрити повну цінність ваших даних?",
    ctaText:
      "Запишіться на консультацію з нашими аналітичними експертами. Ми оцінимо ваші бізнес-цілі, зрілість даних та плани зростання, щоб надати індивідуальну оцінку та дорожню карту впровадження.",
    ctaButton: "Запланувати консультацію",
    faqTitle: "Часті запитання",
    faqItems: [
      {
        question: "Що таке послуги аналітики даних?",
        answer:
          "Послуги аналітики даних передбачають збір, обробку, аналіз та візуалізацію бізнес-даних для отримання дієвих інсайтів, що покращують прийняття рішень та ефективність бізнесу.",
      },
      {
        question: "Як аналітика даних може допомогти моєму бізнесу?",
        answer:
          "Аналітика даних допомагає організаціям знижувати витрати, збільшувати дохід, покращувати операційну ефективність, оптимізувати клієнтський досвід, виявляти можливості для зростання та приймати рішення на основі даних.",
      },
      {
        question: "Які галузі найбільше виграють від аналітики даних?",
        answer:
          "Практично кожна галузь отримує вигоду від аналітики, включаючи SaaS, охорону здоров'я, фінанси, рітейл, виробництво, логістику, нерухомість та професійні послуги.",
      },
      {
        question: "Чи надаєте ви кастомні аналітичні рішення?",
        answer:
          "Так. Кожне залучення адаптується до ваших бізнес-цілей, джерел даних, KPI, операційних вимог та цілей зростання.",
      },
      {
        question: "Чи можете ви працювати з нашими існуючими системами?",
        answer:
          "Абсолютно. Ми інтегруємося з існуючими CRM, ERP, маркетинговими платформами, базами даних, хмарними середовищами та сторонніми застосунками.",
      },
      {
        question: "У чому різниця між Business Intelligence та аналітикою даних?",
        answer:
          "Business Intelligence фокусується на моніторингу та звітності про минулу ефективність, тоді як аналітика даних допомагає організаціям розуміти тенденції, прогнозувати результати та виявляти майбутні можливості.",
      },
      {
        question: "Чи пропонуєте ви AI-консалтинг з аналітики?",
        answer:
          "Так. Наші послуги AI-консалтингу поєднують машинне навчання, предиктивне моделювання, автоматизацію та передову аналітику для генерації AI-бізнес-інсайтів та підтримки розумніших рішень.",
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

export default function DataAnalyticsPage() {
  const [activeService, setActiveService] = useState(0);
  const { locale } = useLocale();
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[560px] overflow-hidden px-4 pb-20 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0">
          <Image
            src="/images/data-analytics-hero.png"
            alt="Data analytics services"
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

      {/* Intro */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.10),transparent_32%),#F7F8FA] px-4 py-16 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,98,0,.05),transparent_32%),#1a1a1a]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#111_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <p className="text-[18px] leading-[1.8] text-[#4B5563] dark:text-white/72 md:text-xl">
            {page.intro}
          </p>
          <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#191a20]">
            <Zap className="mb-5 h-10 w-10 text-[#FF6200]" />
            <p className="text-2xl font-semibold leading-tight text-foreground dark:text-white">
              {page.introStat}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
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
            <Link
              href="https://ideateam.dev/projects/"
              className="mt-8 hidden h-[40px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[14px] font-semibold leading-none tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] xl:flex md:text-[16px]"
            >
              {page.practiceCta}
            </Link>
          </div>
          <div className="flex flex-col">
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
            <Link
              href="https://ideateam.dev/projects/"
              className="mt-6 flex h-[40px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[14px] font-semibold leading-none tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] xl:hidden md:text-[16px]"
            >
              {page.practiceCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="mb-10 text-3xl font-semibold md:text-5xl">
          {page.industryTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {page.industryItems.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6200]/10">
                <BarChart3 className="h-6 w-6 text-[#FF6200]" />
              </div>
              <p className="mb-1 font-semibold text-foreground dark:text-white">{item}</p>
              <p className="text-sm leading-relaxed text-foreground/60 dark:text-white/60">
                {page.industryDesc[item]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-[#eef1f6] px-4 py-16 dark:bg-[#1a1a1a] md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-3xl font-semibold md:text-5xl">
            {page.whyTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.whyItems.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
              >
                <Icon className="mb-4 h-7 w-7 text-[#FF6200]" />
                <h3 className="mb-2 text-lg font-semibold text-foreground dark:text-white">
                  {title}
                </h3>
                <p className="leading-relaxed text-foreground/70 dark:text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="overflow-hidden bg-background px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-4xl font-bold leading-none tracking-[-0.04em] md:text-6xl">
            {page.techTitle}
          </h2>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-foreground/70 dark:text-white/70">
            {page.techBody}
          </p>
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

      {/* Process */}
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

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <div className="bg-[#f3f5fa] px-8 py-10 dark:bg-[#1f2026] md:px-12 md:py-12">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#FF6200]">
              Pricing
            </span>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
              {page.costTitle}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-justify text-foreground/60 dark:text-white/60">
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
                  <p className="font-semibold text-foreground dark:text-white">{label}</p>
                  <p className="mt-0.5 text-foreground/55 dark:text-white/55">{desc}</p>
                </div>
                <span className="shrink-0 font-bold tabular-nums text-[#FF6200]">
                  {range}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
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

      <div id="data-analytics-estimate" className="-mt-4">
        <RequestConsultationSection />
      </div>

      {/* FAQ */}
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
