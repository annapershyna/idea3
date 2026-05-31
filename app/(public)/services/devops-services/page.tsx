"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Bell,
  Boxes,
  ClipboardCheck,
  Cloud,
  Code2,
  Database,
  DollarSign,
  Gauge,
  GitBranch,
  Layers3,
  Lock,
  Rocket,
  ServerCog,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { useLocale } from "@/lib/locale-context";

const services = [
  {
    title: { en: "CI/CD Automation", uk: "CI/CD Automation" },
    description: {
      en: "We configure pipelines that run automated tests, build Docker images, push to container registries, and deploy to staging and production on every merge — with automated rollback on failure.",
      uk: "Ми налаштовуємо CI/CD-пайплайни, які запускають автоматизовані тести, збирають Docker-образи, публікують їх у контейнерні реєстри та розгортають у staging і production при кожному злитті змін — із автоматичним відкатом у разі помилки.",
    },
    image: "/devops.png",
  },
  {
    title: {
      en: "Cloud Infrastructure Management",
      uk: "Cloud Infrastructure Management",
    },
    description: {
      en: "We provision and manage AWS and GCP infrastructure with Terraform so every resource is reproducible, auditable, version-controlled, tracked, and reversible.",
      uk: "Ми налаштовуємо та керуємо cloud-інфраструктурою на AWS і GCP за допомогою infrastructure-as-code з Terraform, щоб кожен ресурс був відтворюваним, придатним до аудиту, контрольованим у Git і оборотним.",
    },
    image: "/dashboard-overview-screen.jpg",
  },
  {
    title: { en: "Kubernetes and Docker Solutions", uk: "Kubernetes і Docker Solutions" },
    description: {
      en: "Dockerfile optimization, EKS and GKE cluster setup, Helm charts, autoscaling, and zero-downtime rollout strategies: rolling updates, blue/green, and canary.",
      uk: "Оптимізація Dockerfile, налаштування кластерів EKS і GKE, Helm-чарти, autoscaling і стратегії розгортання без простоїв: rolling updates, blue/green та canary.",
    },
    image: "/images/our-services-devops.png",
  },
  {
    title: { en: "Monitoring and Security", uk: "Моніторинг і безпека" },
    description: {
      en: "Full-stack monitoring, centralized logs, distributed tracing, on-call alerting, Kubernetes network policies, secrets management, and CI/CD vulnerability scanning.",
      uk: "Повностековий моніторинг, централізовані логи, розподілене трасування, on-call сповіщення, мережеві політики Kubernetes, керування секретами та сканування вразливостей у CI/CD.",
    },
    image: "/monitoring-dashboard-with-graphs-and-data-visualiz.jpg",
  },
] as const;

const stacks = [
  {
    label: "CI/CD",
    items: ["GitHub Actions", "GitLab CI", "CircleCI"],
    icon: GitBranch,
  },
  { label: "Containers", items: ["Docker", "Kubernetes", "Helm"], icon: Boxes },
  {
    label: "Cloud",
    items: ["AWS", "GCP", "Cloud Run", "EKS", "GKE"],
    icon: Cloud,
  },
  {
    label: "IaC",
    items: ["Terraform", "Version control", "Reusable modules"],
    icon: Code2,
  },
  {
    label: "Observability",
    items: ["Prometheus", "Grafana", "CloudWatch", "Tracing"],
    icon: Activity,
  },
  {
    label: "Security",
    items: ["Vault", "Secrets Manager", "Vulnerability scanning"],
    icon: ShieldCheck,
  },
] as const;

const techIcons: Record<string, string> = {
  "GitHub Actions": "/icons/tech/github.svg",
  Docker: "/images/docker.svg",
  Kubernetes: "/images/kubernetes.svg",
  AWS: "/images/aws.svg",
  GCP: "/images/gcp.svg",
  Terraform: "/icons/tech/terraform.svg",
};

const processSteps = [
  {
    title: { en: "Infrastructure audit", uk: "Аудит інфраструктури" },
    text: {
      en: "We map environments, deployment flow, access boundaries, bottlenecks, incidents, and cloud spend before proposing changes.",
      uk: "Ми аналізуємо середовища, deployment flow, межі доступу, bottlenecks, інциденти та cloud spend перед планом змін.",
    },
    icon: ClipboardCheck,
  },
  {
    title: { en: "Architecture", uk: "Архітектура" },
    text: {
      en: "We define cloud topology, network boundaries, Terraform structure, CI/CD stages, rollout strategy, and monitoring signals.",
      uk: "Ми визначаємо cloud topology, мережеві межі, структуру Terraform, етапи CI/CD, deployment strategy та monitoring signals.",
    },
    icon: Layers3,
  },
  {
    title: { en: "Pipeline implementation", uk: "Впровадження пайплайнів" },
    text: {
      en: "Automated tests, image builds, registry publishing, environment-specific deployments, and rollback triggers are wired into the delivery flow.",
      uk: "Автоматизовані тести, збірка образів, публікація в реєстр, deployment за середовищами та rollback triggers інтегруються в delivery flow.",
    },
    icon: GitBranch,
  },
  {
    title: { en: "Platform hardening", uk: "Посилення платформи" },
    text: {
      en: "We configure autoscaling, network policies, secrets management, vulnerability scanning, and least-privilege cloud permissions.",
      uk: "Ми налаштовуємо autoscaling, network policies, secrets management, vulnerability scanning і least-privilege cloud permissions.",
    },
    icon: Lock,
  },
  {
    title: { en: "Observability", uk: "Observability" },
    text: {
      en: "Metrics, logs, traces, dashboards, alert thresholds, and on-call escalation routes are set up for production visibility.",
      uk: "Метрики, логи, traces, dashboards, пороги alerting та on-call escalation routes налаштовуються для production visibility.",
    },
    icon: Bell,
  },
  {
    title: { en: "Optimization", uk: "Оптимізація" },
    text: {
      en: "Rightsizing, spot instance strategies, reserved capacity planning, and non-production shutdown schedules reduce recurring spend.",
      uk: "Rightsizing, spot instance strategies, reserved capacity planning і вимкнення non-production середовищ знижують регулярні витрати.",
    },
    icon: Rocket,
  },
] as const;

const copy = {
  en: {
    heroTitle: "DevOps Consulting and Infrastructure Services",
    heroSubtitle: "DevOps Services for Scalable Infrastructure",
    intro:
      "We design and implement DevOps infrastructure that eliminates deployment bottlenecks, reduces environment-related incidents, and scales with your engineering team. Our DevOps consulting covers CI/CD automation, containerized deployments, Kubernetes orchestration, cloud infrastructure management on AWS and GCP, and observability stack setup with real-time monitoring and alerting. Infrastructure-as-code with Terraform makes every configuration reproducible, auditable, and version-controlled.",
    introStat:
      "Properly implemented CI/CD automation reduces deployment time from hours to under 15 minutes and cuts environment-related production incidents by up to 70%.",
    servicesTitle: "DevOps Services",
    practiceCta: "See it in practice",
    comparisonTitle: "CI/CD Automation and Infrastructure-as-Code",
    comparisonText:
      "A well-configured CI/CD pipeline reduces manual deployment overhead by 80% and gives engineering teams the confidence to ship multiple times per day. Terraform-based infrastructure-as-code keeps every configuration in version control, makes changes auditable, and allows environments to be reproduced instead of manually reconstructed.",
    automationTitle: "Pipeline automation includes:",
    automationItems: [
      "GitHub Actions, GitLab CI, or CircleCI pipeline configuration.",
      "Automated unit, integration, and e2e tests on every pull request.",
      "Docker image build, tagging, and registry push automation.",
      "Environment-specific deployment workflows for dev, staging, and production.",
      "Automated rollback triggers on health-check failure after deployment.",
    ],
    cloudTitle: "Cloud management delivers:",
    cloudItems: [
      "AWS and GCP environments provisioned from version-controlled Terraform.",
      "Rightsizing and reserved instance planning to reduce unmanaged cloud spend by 20–35%.",
      "Auditable, reversible infrastructure changes with consistent resource naming and ownership.",
    ],
    techTitle: "DevOps Technologies We Use",
    platformTitle: "Kubernetes and Docker Solutions",
    platformText:
      "We optimize Dockerfiles and multi-stage builds for minimal image size and security surface, set up Kubernetes clusters on EKS, GKE, or self-managed infrastructure, and develop Helm charts for repeatable, parameterized application deployment.",
    platformCards: [
      ["Autoscaling", "Horizontal Pod Autoscaler configuration for traffic-driven scaling."],
      ["Zero downtime", "Rolling updates, blue/green releases, and canary deployment strategies."],
      ["Repeatability", "Helm charts and Terraform modules that make deployments predictable across environments."],
    ],
    processTitle: "DevOps Implementation Process",
    monitoringTitle: "Monitoring and Security",
    monitoringText:
      "We set up full-stack monitoring and alerting with Prometheus and Grafana for infrastructure metrics, centralized log aggregation, distributed tracing, and PagerDuty or Opsgenie integration for on-call alerting. Security hardening includes Kubernetes network policies, secrets management with HashiCorp Vault or AWS Secrets Manager, and automated vulnerability scanning integrated into CI/CD.",
    monitoringItems: [
      "Prometheus and Grafana dashboards for infrastructure and application metrics",
      "Centralized log aggregation and distributed tracing",
      "PagerDuty or Opsgenie integration for on-call alerting",
      "Network policies, secrets management, and vulnerability scanning",
    ],
    expertiseTitle: "AWS and Google Cloud Expertise",
    aws: "EC2, EKS, RDS, ElastiCache, S3, CloudFront, ALB, IAM, VPC, Route 53, SQS, SNS, Lambda, CloudWatch.",
    gcp: "GKE, Cloud Run, Cloud SQL, Memorystore, GCS, Cloud CDN, Cloud IAM, VPC, Cloud Monitoring, Pub/Sub.",
    costTitle: "DevOps Cost Optimization",
    costText:
      "We audit existing infrastructure for oversized instances, idle resources, unattached volumes, and missing auto-scaling policies — then implement rightsizing, spot instance strategies, reserved capacity planning, and automated shutdown schedules for non-production environments.",
    costTiers: [
      ["CI/CD and cloud setup", "$5,000 – $15,000", "Focused pipeline setup and cloud configuration engagement."],
      ["Ongoing DevOps retainer", "$2,000 – $6,000 / month", "Infrastructure management based on environment complexity."],
      ["Optimization impact", "20–35% lower spend", "Typical cloud cost reduction within 60 days after audit and optimization."],
    ],
    ctaTitle: "Need a DevOps infrastructure audit?",
    ctaText:
      "Send us your current infrastructure setup. We'll identify the highest-impact improvements in a free audit call.",
    ctaButton: "Get an infrastructure audit",
    faqTitle: "FAQ",
    faqs: [
      ["What is DevOps?", "DevOps is the practice of integrating software development and infrastructure operations into a unified workflow with automation, monitoring, and feedback loops that enable frequent, reliable software delivery."],
      ["Why do companies need DevOps services?", "Manual deployments, inconsistent environments, slow release cycles, and poor production visibility are engineering tax. DevOps services eliminate these through automation, infrastructure-as-code, and observability."],
      ["What is CI/CD automation?", "CI/CD stands for continuous integration and continuous delivery. It's the automated pipeline that tests, builds, and deploys code on every change, eliminating manual release steps and reducing deployment risk."],
      ["How much do DevOps services cost?", "A focused CI/CD setup and cloud configuration engagement starts at $5,000–$15,000. Ongoing DevOps retainers for infrastructure management run $2,000–$6,000/month depending on environment complexity."],
      ["AWS vs Google Cloud: which is better?", "Both are production-grade platforms. AWS has broader service coverage and a larger ecosystem. GCP has stronger managed Kubernetes (GKE) and data analytics tooling. The right choice depends on your team's existing expertise and workload profile."],
    ],
  },
  uk: {
    heroTitle: "DevOps Consulting та Infrastructure Services",
    heroSubtitle: "DevOps Services для масштабованої інфраструктури",
    intro:
      "Ми проектуємо та впроваджуємо DevOps-інфраструктуру, яка усуває вузькі місця під час розгортання, зменшує кількість інцидентів, пов’язаних із середовищами, та масштабується разом із вашою інженерною командою. Наш DevOps-консалтинг охоплює автоматизацію CI/CD, контейнеризовані розгортання, оркестрацію Kubernetes, керування хмарною інфраструктурою на AWS і GCP, а також налаштування системи спостереження з моніторингом і сповіщеннями в реальному часі. Infrastructure-as-code з Terraform робить кожну конфігурацію відтворювальною, придатною до аудиту та контрольованою через систему керування версіями.",
    introStat:
      "Правильно впроваджена автоматизація CI/CD скорочує час розгортання з годин до 15 хвилин і зменшує кількість production-інцидентів, пов’язаних із середовищами, на 70%.",
    servicesTitle: "DevOps Services",
    practiceCta: "Подивитись на практиці",
    comparisonTitle: "CI/CD Automation та Infrastructure-as-Code",
    comparisonText:
      "Правильно налаштований CI/CD-пайплайн скорочує ручні витрати на розгортання на 80% і дає інженерним командам впевненість у можливості релізити кілька разів на день. Terraform-based infrastructure-as-code зберігає кожну конфігурацію в системі керування версіями, робить зміни придатними до аудиту та дозволяє відтворювати середовища замість ручного відновлення.",
    automationTitle: "Автоматизація пайплайнів включає:",
    automationItems: [
      "Налаштування CI/CD у GitHub Actions, GitLab CI або CircleCI.",
      "Автоматизований запуск unit, integration та end-to-end тестів для кожного pull request.",
      "Автоматизацію збірки, тегування та публікації Docker-образів у реєстри.",
      "Розгортання з урахуванням середовищ: dev, staging, production.",
      "Автоматичні механізми відкату при провалі health-check після деплою.",
    ],
    cloudTitle: "Cloud management забезпечує:",
    cloudItems: [
      "AWS і GCP середовища, розгорнуті з version-controlled Terraform.",
      "Rightsizing і reserved instance planning для зниження unmanaged cloud spend на 20–35%.",
      "Auditable та reversible зміни інфраструктури з консистентним naming і ownership ресурсів.",
    ],
    techTitle: "DevOps Technologies We Use",
    platformTitle: "Kubernetes і Docker Solutions",
    platformText:
      "Ми оптимізуємо Dockerfile та багатоступеневі збірки для мінімального розміру образів і зменшення поверхні безпеки, налаштовуємо Kubernetes-кластери на EKS, GKE або self-managed інфраструктурі та розробляємо Helm-чарти для відтворюваного й параметризованого розгортання застосунків.",
    platformCards: [
      ["Autoscaling", "Конфігурація Horizontal Pod Autoscaler для автоматичного масштабування залежно від навантаження."],
      ["Zero downtime", "Rolling updates, blue/green та canary-деплойменти без простоїв."],
      ["Repeatability", "Helm-чарти та Terraform modules, які роблять deployments прогнозованими в усіх середовищах."],
    ],
    processTitle: "Процес впровадження DevOps",
    monitoringTitle: "Моніторинг і безпека",
    monitoringText:
      "Ми налаштовуємо повностековий моніторинг і сповіщення з Prometheus і Grafana для інфраструктурних метрик, централізовану агрегацію логів, розподілене трасування запитів, а також інтеграцію з PagerDuty або Opsgenie для on-call сповіщень. Посилення безпеки включає мережеві політики Kubernetes, керування секретами через HashiCorp Vault або AWS Secrets Manager і automated vulnerability scanning у CI/CD-пайплайні.",
    monitoringItems: [
      "Prometheus і Grafana dashboards для infrastructure та application metrics",
      "Централізована агрегація логів і distributed tracing",
      "Інтеграція PagerDuty або Opsgenie для on-call alerting",
      "Network policies, secrets management і vulnerability scanning",
    ],
    expertiseTitle: "AWS і Google Cloud Expertise",
    aws: "EC2, EKS, RDS, ElastiCache, S3, CloudFront, ALB, IAM, VPC, Route 53, SQS, SNS, Lambda, CloudWatch.",
    gcp: "GKE, Cloud Run, Cloud SQL, Memorystore, GCS, Cloud CDN, Cloud IAM, VPC, Cloud Monitoring, Pub/Sub.",
    costTitle: "DevOps Cost Optimization",
    costText:
      "Ми проводимо аудит існуючої інфраструктури на предмет надмірно великих інстансів, неактивних ресурсів, незакріплених дисків і відсутніх політик автоматичного масштабування, після чого впроваджуємо rightsizing, spot instance strategies, reserved capacity planning та автоматизоване вимкнення non-production середовищ.",
    costTiers: [
      ["CI/CD та cloud setup", "$5,000 – $15,000", "Сфокусоване налаштування CI/CD та конфігурації хмарної інфраструктури."],
      ["Постійний DevOps retainer", "$2,000 – $6,000 / місяць", "Infrastructure management залежно від складності середовища."],
      ["Optimization impact", "20–35% lower spend", "Типове скорочення cloud costs протягом 60 днів після аудиту та оптимізації."],
    ],
    ctaTitle: "Потрібен аудит DevOps-інфраструктури?",
    ctaText:
      "Надішліть нам поточну конфігурацію вашої інфраструктури. Ми визначимо найбільш впливові покращення під час безкоштовної консультації з аудиту.",
    ctaButton: "Аудит інфраструктури",
    faqTitle: "FAQ",
    faqs: [
      ["Що таке DevOps?", "DevOps — це практика інтеграції software development та інфраструктурних операцій в єдиний процес з автоматизацією, моніторингом і зворотними зв’язками, що забезпечують часту та надійну доставку програмного забезпечення."],
      ["Чому компаніям потрібні DevOps services?", "Ручне розгортання, неузгоджені середовища, повільні цикли релізів і слабка видимість у продакшені — це приховані витрати інженерії. DevOps-підхід усуває їх через автоматизацію, інфраструктуру як код і системи спостереження."],
      ["Що таке CI/CD automation?", "CI/CD означає безперервну інтеграцію та безперервну доставку. Це автоматизований пайплайн, який тестує, збирає та розгортає код при кожній зміні, усуваючи ручні кроки релізу та знижуючи ризики деплою."],
      ["Скільки коштують DevOps services?", "Сфокусоване налаштування CI/CD та конфігурації хмарної інфраструктури зазвичай коштує від $5,000–$15,000. Постійний DevOps-супровід інфраструктури — від $2,000–$6,000 на місяць залежно від складності середовища."],
      ["AWS vs Google Cloud: що краще?", "Обидві платформи є готовими до продакшену. AWS має ширшу екосистему сервісів і більший ринок рішень. Google Cloud має сильніший керований Kubernetes (GKE) та інструменти для роботи з даними. Оптимальний вибір залежить від наявної експертизи команди та типу навантаження."],
    ],
  },
} as const;

export default function DevOpsServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const { locale } = useLocale();
  const page = copy[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/devops.png"
            alt="DevOps consulting and infrastructure services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/15" />
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
            <ServerCog className="mb-5 h-10 w-10 text-[#FF6200]" />
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
              href="/projects/devops-for-yotewo"
              className="relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#FF6200] px-8 py-4 font-[Onest] text-base font-normal leading-[100%] text-white transition duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-black sm:w-auto"
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
                title: page.automationTitle,
                items: page.automationItems,
                Icon: Settings,
              },
              {
                title: page.cloudTitle,
                items: page.cloudItems,
                Icon: Cloud,
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
            src="/images/our-services-devops.png"
            alt="Kubernetes and Docker solutions"
            width={420}
            height={460}
            className="h-full min-h-[320px] w-full rounded-xl object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-[#111015] dark:text-white sm:text-5xl">
              {page.platformTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/75 dark:text-white/75">
              {page.platformText}
            </p>
            <div className="mt-4 grid gap-x-6 text-lg text-foreground dark:text-white sm:grid-cols-3">
              {page.platformCards.map(([title, text]) => (
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
              {page.monitoringTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70 dark:text-white/70">
              {page.monitoringText}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.monitoringItems.map((item, index) => {
              const icons = [Gauge, Database, Bell, ShieldCheck];
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
        <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-[#191a20] md:grid-cols-[0.8fr_1fr_1fr] md:p-10">
          <h2 className="text-3xl font-semibold md:text-4xl">
            {page.expertiseTitle}
          </h2>
          <div>
            <h3 className="mb-3 text-2xl font-semibold text-[#FF6200]">AWS</h3>
            <p className="leading-relaxed text-foreground/70 dark:text-white/70">
              {page.aws}
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-semibold text-[#FF6200]">GCP</h3>
            <p className="leading-relaxed text-foreground/70 dark:text-white/70">
              {page.gcp}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <div className="bg-[#f3f5fa] px-8 py-10 dark:bg-[#1f2026] md:px-12 md:py-12">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-[#FF6200]">
              <DollarSign className="mr-2 inline h-4 w-4" />
              Optimization
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
              </summary>
              <p className="mt-4 leading-relaxed text-foreground/70 dark:text-white/70">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div id="devops-services-audit" className="-mt-4">
        <RequestConsultationSection />
      </div>
    </main>
  );
}
