"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Cpu,
  Cloud,
  Gauge,
  GitBranch,
  Layers3,
  Zap,
  Radio,
  Database,
  BarChart3,
  Rocket,
  Settings,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { useLocale } from "@/lib/locale-context";

const services = [
  {
    title: { en: "Hardware Integration", uk: "Інтеграція обладнання" },
    description: {
      en: "Seamless connection of Arduino, Raspberry Pi, sensors, and industrial devices with cloud platforms. We handle device configuration, firmware updates, and real-time data synchronization.",
      uk: "Безперебійне з'єднання Arduino, Raspberry Pi, датчиків та промислових пристроїв з хмарними платформами. Ми займаємося конфігурацією пристроїв, оновленням прошивки та синхронізацією даних у реальному часі.",
    },
    image: "/images/iot-hardware-integration.jpg",
  },
  {
    title: { en: "Real-Time Monitoring", uk: "Моніторинг у реальному часі" },
    description: {
      en: "Live dashboards and alerting systems for monitoring device health, environmental conditions, and operational metrics. Instant notifications for anomalies and threshold violations.",
      uk: "Живі дашборди та системи оповіщень для моніторингу здоров'я пристроїв, умов навколишнього середовища та операційних метрик. Миттєві сповіщення про аномалії та порушення лімітів.",
    },
    image: "/images/iot-monitoring.jpg",
  },
  {
    title: { en: "Data Collection & Analytics", uk: "Збір даних та аналітика" },
    description: {
      en: "Comprehensive data pipelines for collecting, storing, and analyzing IoT sensor data. Machine learning models for predictive maintenance and anomaly detection.",
      uk: "Комплексні конвеєри даних для збору, зберігання та аналізу даних датчиків IoT. Моделі машинного навчання для передбачувального технічного обслуговування та виявлення аномалій.",
    },
    image: "/images/iot-analytics.jpg",
  },
  {
    title: { en: "Control & Automation", uk: "Управління та автоматизація" },
    description: {
      en: "Remote device control, automated workflows, and intelligent decision-making systems. Integration with external platforms and APIs for seamless operational automation.",
      uk: "Віддалене управління пристроями, автоматизовані робочі процеси та системи розумного прийняття рішень. Інтеграція з зовнішніми платформами та API для безперебійної операційної автоматизації.",
    },
    image: "/images/iot-control.jpg",
  },
] as const;

const stacks = [
  {
    label: "Microcontrollers",
    items: ["Arduino", "Raspberry Pi", "STM32", "ESP32"],
    icon: Cpu,
  },
  {
    label: "Protocols",
    items: ["MQTT", "CoAP", "HTTP", "WebSocket"],
    icon: Radio,
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "Go", "AWS IoT"],
    icon: Cloud,
  },
  {
    label: "Data",
    items: ["PostgreSQL", "InfluxDB", "Time-Series", "Data Lakes"],
    icon: Database,
  },
  {
    label: "Analytics",
    items: ["Real-time Processing", "ML Models", "Dashboards", "Alerts"],
    icon: BarChart3,
  },
  {
    label: "Cloud Platforms",
    items: ["AWS IoT Core", "Azure IoT", "Google Cloud", "Edge Computing"],
    icon: Cloud,
  },
] as const;

const techIcons: Record<string, string> = {
  Arduino: "/icons/tech/arduino.svg",
  "Raspberry Pi": "/icons/tech/raspberry-pi.svg",
  MQTT: "/icons/tech/mqtt.svg",
  "Node.js": "/images/node.svg",
  Python: "/images/python.svg",
  PostgreSQL: "/icons/tech/mssql.svg",
  "AWS IoT": "/images/aws.svg",
  "Azure IoT": "/icons/tech/azure.svg",
  "Google Cloud": "/images/gcp.svg",
  CoAP: "/icons/tech/coap.svg",
  HTTP: "/icons/tech/rest.svg",
  InfluxDB: "/icons/tech/influxdb.svg",
};

const processSteps = [
  {
    title: { en: "Requirements & Planning", uk: "Вимоги та планування" },
    text: {
      en: "Device specifications, communication protocols, data requirements, and platform selection.",
      uk: "Специфікація пристроїв, протоколи комунікації, вимоги до даних та вибір платформи.",
    },
    icon: Settings,
  },
  {
    title: { en: "Hardware Setup", uk: "Налаштування обладнання" },
    text: {
      en: "Device configuration, firmware development, sensor calibration, and network setup.",
      uk: "Конфігурація пристроїв, розробка прошивки, калібрування датчиків та налаштування мережі.",
    },
    icon: Cpu,
  },
  {
    title: { en: "Backend Development", uk: "Розробка бекенду" },
    text: {
      en: "Cloud infrastructure, data pipelines, APIs, and database design for IoT data.",
      uk: "Хмарна інфраструктура, конвеєри даних, API та проектування бази даних для даних IoT.",
    },
    icon: Layers3,
  },
  {
    title: { en: "Integration", uk: "Інтеграція" },
    text: {
      en: "Device-to-cloud connectivity, real-time synchronization, and system testing.",
      uk: "Зв'язок пристрій-хмара, синхронізація у реальному часі та тестування системи.",
    },
    icon: GitBranch,
  },
  {
    title: { en: "Monitoring & Analytics", uk: "Моніторинг та аналітика" },
    text: {
      en: "Dashboard development, alerting systems, and analytics model deployment.",
      uk: "Розробка дашбордів, системи оповіщень та розгортання аналітичних моделей.",
    },
    icon: Activity,
  },
  {
    title: { en: "Deployment", uk: "Розгортання" },
    text: {
      en: "Production deployment, scaling, monitoring, and ongoing support.",
      uk: "Розгортання у продакшні, масштабування, моніторинг та постійна підтримка.",
    },
    icon: Rocket,
  },
] as const;

const copy = {
  en: {
    heroTitle: "IoT Solutions & Hardware Integration Services",
    heroSubtitle: "Connect, Monitor, and Control Your Devices at Scale",
    intro:
      "We design and implement comprehensive IoT systems that connect hardware devices with cloud platforms, enabling real-time monitoring, predictive analytics, and intelligent automation. From industrial IoT to smart home solutions, we handle device integration, data management, and system scalability.",
    introStat:
      "Companies using IoT solutions experience an average 25-35% improvement in operational efficiency and 40-50% reduction in maintenance costs through predictive insights.",
    servicesTitle: "IoT Services We Provide",
    practiceCta: "See it in practice",
    industryTitle: "Industries We Serve",
    industryItems: [
      "Manufacturing & Industrial Automation",
      "Smart Buildings & Facilities Management",
      "Agriculture & Environmental Monitoring",
      "Healthcare & Remote Patient Monitoring",
      "Transportation & Fleet Management",
      "Energy Management & Smart Grids",
    ],
    techTitle: "IoT Technology Stack",
    techBody:
      "We work with industry-leading IoT platforms, microcontrollers, and communication protocols to build scalable, secure systems that grow with your business.",
    processTitle: "IoT Implementation Process",
    costTitle: "IoT Solutions Pricing",
    costText:
      "IoT project costs vary based on device complexity, scale, data volume, and analytics requirements. We provide transparent estimates after understanding your specific needs.",
    costTiers: [
      [
        "Pilot IoT System",
        "$5,000+",
        "10-50 devices, basic monitoring dashboard, cloud infrastructure setup.",
      ],
      [
        "Mid-Scale Deployment",
        "$15,000+",
        "100-500 devices, real-time analytics, predictive models, custom dashboards.",
      ],
      [
        "Enterprise IoT Platform",
        "$50,000+",
        "1,000+ devices, advanced analytics, machine learning, custom integrations.",
      ],
    ],
    ctaTitle: "Ready to connect your devices?",
    ctaText:
      "Tell us about your hardware, requirements, and goals. We'll design a scalable IoT solution tailored to your needs.",
    ctaButton: "Plan your IoT system",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        question: "What are IoT solutions and hardware integration services?",
        answer:
          "IoT solutions connect physical devices, sensors, and machines to cloud platforms so they can collect data, be monitored in real time, and be controlled remotely. Our hardware integration services cover device configuration, firmware, connectivity, data pipelines, dashboards, and automation — turning disconnected hardware into a unified, intelligent system.",
      },
      {
        question: "What types of hardware can you integrate?",
        answer:
          "We work with a wide range of devices including Arduino, Raspberry Pi, ESP32, STM32, industrial PLCs, environmental and motion sensors, and custom hardware. We handle device configuration, firmware development, sensor calibration, and secure connectivity to cloud platforms.",
      },
      {
        question: "Which communication protocols do you support?",
        answer:
          "We implement industry-standard IoT protocols such as MQTT, CoAP, HTTP, and WebSocket, choosing the right one based on power constraints, network conditions, latency, and data volume. This ensures reliable, efficient device-to-cloud communication at scale.",
      },
      {
        question: "How do you ensure real-time monitoring and alerting?",
        answer:
          "We build live dashboards and alerting systems that track device health, environmental conditions, and operational metrics. When anomalies or threshold violations occur, the system sends instant notifications so your team can react before issues escalate.",
      },
      {
        question: "Can you handle large-scale IoT deployments?",
        answer:
          "Yes. Our architecture is designed to scale from pilot projects with a handful of devices to enterprise deployments with thousands of connected endpoints. We use time-series databases, scalable cloud infrastructure, and edge computing where appropriate to maintain performance.",
      },
      {
        question: "Do you provide data analytics and predictive maintenance?",
        answer:
          "We build data pipelines that collect, store, and analyze sensor data, and we apply machine learning models for predictive maintenance and anomaly detection. This helps reduce downtime, lower maintenance costs, and extend equipment lifespan.",
      },
      {
        question: "Which cloud platforms do you work with?",
        answer:
          "We work with AWS IoT Core, Azure IoT, and Google Cloud, as well as edge computing solutions. We help you select the platform that best fits your requirements for scalability, security, cost, and existing infrastructure.",
      },
      {
        question: "How much does an IoT project cost?",
        answer:
          "Costs vary based on device complexity, scale, data volume, and analytics requirements. A pilot system starts at $5,000+, mid-scale deployments from $15,000+, and enterprise platforms from $50,000+. We provide transparent estimates after understanding your specific needs.",
      },
      {
        question: "How long does an IoT implementation take?",
        answer:
          "Timelines depend on scope and complexity. A pilot system typically takes a few weeks, while mid-scale and enterprise deployments span several months. We follow a clear process from requirements and hardware setup through integration, monitoring, and deployment.",
      },
      {
        question: "Do you provide ongoing support after deployment?",
        answer:
          "Yes. We offer continuous support including monitoring, scaling, firmware updates, and optimization. As your business and device fleet grow, we help expand your IoT capabilities and keep the system secure and reliable.",
      },
    ],
  },
  uk: {
    heroTitle: "Послуги IoT рішень та інтеграції обладнання",
    heroSubtitle: "З'єднайте, моніторте та керуйте своїми пристроями у масштабі",
    intro:
      "Ми проектуємо та впроваджуємо комплексні системи IoT, які з'єднують апаратні пристрої з хмарними платформами, забезпечуючи моніторинг у реальному часі, передбачувальну аналітику та розумну автоматизацію. Від промислового IoT до рішень для смартних будинків — ми займаємося інтеграцією пристроїв, управлінням даними та масштабованістю системи.",
    introStat:
      "Компанії, які використовують рішення IoT, відчувають середнє поліпшення операційної ефективності на 25-35% та зниження витрат на обслуговування на 40-50% завдяки передбачувальним інсайтам.",
    servicesTitle: "Послуги IoT, які ми надаємо",
    practiceCta: "Подивитись на практиці",
    industryTitle: "Галузі, з якими ми працюємо",
    industryItems: [
      "Виробництво та промислова автоматизація",
      "Смартні будівлі та управління об'єктами",
      "Сільське господарство та моніторинг навколишнього середовища",
      "Охорона здоров'я та віддалений моніторинг пацієнтів",
      "Транспорт та управління автопарком",
      "Управління енергією та смартні сіти",
    ],
    techTitle: "Технологічний стек IoT",
    techBody:
      "Ми працюємо з провідними платформами IoT, мікроконтролерами та комунікаційними протоколами для розробки масштабованих, безпечних систем, які зростають разом з вашим бізнесом.",
    processTitle: "Процес впровадження IoT",
    costTitle: "Ціноутворення IoT рішень",
    costText:
      "Вартість проектів IoT варіюється залежно від складності пристроїв, масштабу, обсягу даних та вимог до аналітики. Ми надаємо прозорі кошторис після ознайомлення з вашими специфічними потребами.",
    costTiers: [
      [
        "Пілотна IoT система",
        "$5,000+",
        "10-50 пристроїв, базовий дашборд моніторингу, налаштування хмарної інфраструктури.",
      ],
      [
        "Розгортання середнього масштабу",
        "$15,000+",
        "100-500 пристроїв, аналітика в реальному часі, передбачувальні моделі, кастомні дашборди.",
      ],
      [
        "Корпоративна платформа IoT",
        "$50,000+",
        "1000+ пристроїв, передова аналітика, машинне навчання, кастомні інтеграції.",
      ],
    ],
    ctaTitle: "Готові підключити свої пристрої?",
    ctaText:
      "Розкажіть про своє обладнання, вимоги та цілі. Ми розробимо масштабоване рішення IoT, адаптоване під ваші потреби.",
    ctaButton: "Спланувати вашу IoT систему",
    faqTitle: "Часті запитання",
    faqItems: [
      {
        question: "Що таке IoT рішення та послуги інтеграції обладнання?",
        answer:
          "IoT рішення з'єднують фізичні пристрої, датчики та обладнання з хмарними платформами, щоб вони могли збирати дані, моніторитися в реальному часі та керуватися віддалено. Наші послуги інтеграції обладнання охоплюють конфігурацію пристроїв, прошивки, підключення, конвеєри даних, дашборди та автоматизацію — перетворюючи розрізнене обладнання на єдину інтелектуальну систему.",
      },
      {
        question: "Яке обладнання ви можете інтегрувати?",
        answer:
          "Ми працюємо з широким спектром пристроїв, включаючи Arduino, Raspberry Pi, ESP32, STM32, промислові PLC, датчики середовища та руху, а також кастомне обладнання. Ми займаємося конфігурацією пристроїв, розробкою прошивки, калібруванням датчиків та безпечним підключенням до хмарних платформ.",
      },
      {
        question: "Які комунікаційні протоколи ви підтримуєте?",
        answer:
          "Ми впроваджуємо стандартні протоколи IoT, такі як MQTT, CoAP, HTTP та WebSocket, обираючи оптимальний залежно від енергоспоживання, умов мережі, затримки та обсягу даних. Це забезпечує надійний та ефективний зв'язок пристрій-хмара у масштабі.",
      },
      {
        question: "Як ви забезпечуєте моніторинг у реальному часі та оповіщення?",
        answer:
          "Ми створюємо живі дашборди та системи оповіщень, які відстежують стан пристроїв, умови навколишнього середовища та операційні метрики. У разі аномалій чи порушення лімітів система надсилає миттєві сповіщення, щоб ваша команда могла відреагувати до загострення проблеми.",
      },
      {
        question: "Чи можете ви реалізувати масштабні розгортання IoT?",
        answer:
          "Так. Наша архітектура розрахована на масштабування від пілотних проектів із кількома пристроями до корпоративних розгортань із тисячами підключених точок. Ми використовуємо time-series бази даних, масштабовану хмарну інфраструктуру та edge computing там, де це доречно, для підтримки продуктивності.",
      },
      {
        question: "Чи надаєте ви аналітику даних та передбачувальне обслуговування?",
        answer:
          "Ми будуємо конвеєри даних, які збирають, зберігають та аналізують дані датчиків, і застосовуємо моделі машинного навчання для передбачувального обслуговування та виявлення аномалій. Це допомагає зменшити простої, знизити витрати на обслуговування та продовжити термін служби обладнання.",
      },
      {
        question: "З якими хмарними платформами ви працюєте?",
        answer:
          "Ми працюємо з AWS IoT Core, Azure IoT та Google Cloud, а також з рішеннями edge computing. Ми допоможемо вам обрати платформу, яка найкраще відповідає вашим вимогам щодо масштабованості, безпеки, вартості та наявної інфраструктури.",
      },
      {
        question: "Скільки коштує IoT проект?",
        answer:
          "Вартість залежить від складності пристроїв, масштабу, обсягу даних та вимог до аналітики. Пілотна система стартує від $5,000+, розгортання середнього масштабу — від $15,000+, корпоративні платформи — від $50,000+. Ми надаємо прозорі кошториси після ознайомлення з вашими потребами.",
      },
      {
        question: "Скільки часу займає впровадження IoT?",
        answer:
          "Терміни залежать від обсягу та складності. Пілотна система зазвичай займає кілька тижнів, тоді як розгортання середнього масштабу та корпоративні охоплюють кілька місяців. Ми дотримуємося чіткого процесу від вимог і налаштування обладнання до інтеграції, моніторингу та розгортання.",
      },
      {
        question: "Чи надаєте ви підтримку після розгортання?",
        answer:
          "Так. Ми пропонуємо постійну підтримку, включаючи моніторинг, масштабування, оновлення прошивок та оптимізацію. У міру зростання вашого бізнесу та парку пристроїв ми допомагаємо розширювати можливості IoT і підтримувати систему безпечною та надійною.",
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

export default function IoTSolutionsPage() {
  const [activeService, setActiveService] = useState(0);
  const { locale } = useLocale();
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/iot-hero.jpg"
            alt="IoT solutions and hardware integration"
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
            <Zap className="mb-5 h-10 w-10 text-[#FF6200]" />
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
        <h2 className="mb-10 text-3xl font-semibold md:text-5xl">
          {page.industryTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {page.industryItems.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg bg-[#FF6200]/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-[#FF6200]" />
              </div>
              <p className="font-semibold text-foreground dark:text-white">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

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

      <div id="iot-estimate" className="-mt-4">
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
