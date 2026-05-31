"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  Cloud,
  Code2,
  Database,
  FileText,
  Gauge,
  Lock,
  MessageSquare,
  Route,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { RequestConsultationSection } from "@/components/request-consultation-section";
import { useLocale } from "@/lib/locale-context";

const businessProblems = [
  {
    title: { en: "Document processing", uk: "Обробка документів" },
    text: {
      en: "Extract, classify, validate, and route structured data from unstructured documents at scale, reducing manual data entry by 70–90%.",
      uk: "Вилучення, класифікація, валідація та маршрутизація структурованих даних із неструктурованих документів у масштабі зі скороченням ручного введення на 70–90%.",
    },
    icon: FileText,
  },
  {
    title: { en: "Customer support automation", uk: "Автоматизація підтримки клієнтів" },
    text: {
      en: "AI agents resolve tier-1 support queries without human escalation, reducing support ticket volume by 40–60%.",
      uk: "AI-агенти вирішують запити першої лінії без залучення оператора, скорочуючи навантаження на підтримку на 40–60%.",
    },
    icon: MessageSquare,
  },
  {
    title: { en: "Content and workflow automation", uk: "Автоматизація контенту та процесів" },
    text: {
      en: "Generate, summarize, classify, and route content at volume, eliminating hours of manual work per operator per day.",
      uk: "Генерація, узагальнення, класифікація та маршрутизація контенту у великих обсягах, що зменшує години ручної роботи щодня.",
    },
    icon: Workflow,
  },
  {
    title: { en: "Search and discovery", uk: "Пошук і навігація" },
    text: {
      en: "Semantic search over catalogs, knowledge bases, and repositories improves relevant result retrieval by 3–5x over keyword search.",
      uk: "Семантичний пошук по каталогах, базах знань і репозиторіях підвищує релевантність результатів у 3–5 разів порівняно з ключовим пошуком.",
    },
    icon: Search,
  },
  {
    title: { en: "Personalization", uk: "Персоналізація" },
    text: {
      en: "Recommendation systems surface relevant products, content, or actions based on behavior, context, and collaborative filtering signals.",
      uk: "Рекомендаційні системи показують релевантні продукти, контент або дії на основі поведінки користувача, контексту та сигналів взаємодії.",
    },
    icon: Sparkles,
  },
] as const;

const aiServices = [
  {
    title: { en: "AI Chatbot Integration", uk: "AI-чат боти" },
    description: {
      en: "LLM-powered conversational interfaces integrated into your product or support infrastructure. Context-aware, grounded in your knowledge base via RAG, with session memory and fallback routing to human agents.",
      uk: "LLM-інтерфейси для продукту або підтримки, інтегровані з вашою базою знань через RAG, з контекстною пам’яттю та маршрутизацією до оператора.",
    },
    image: "/ai-machine-learning-technology.jpg",
  },
  {
    title: { en: "LLM Integration", uk: "Інтеграція LLM" },
    description: {
      en: "Direct API integration with OpenAI, Anthropic Claude, and Google Gemini. Prompt engineering, token optimization, structured output parsing, error handling, and cost monitoring.",
      uk: "Пряма інтеграція з OpenAI, Anthropic Claude і Google Gemini: налаштування запитів, оптимізація токенів, структурований вихід, обробка помилок і контроль вартості.",
    },
    image: "/images/api-integration.jpg",
  },
  {
    title: { en: "AI Workflow Automation", uk: "Автоматизація AI-процесів" },
    description: {
      en: "End-to-end automation of multi-step business processes using LLMs and tool-calling: document intake, classification, extraction, routing, and output generation in one pipeline.",
      uk: "Автоматизація багатокрокових бізнес-процесів за допомогою LLM і tool-calling: обробка документів, класифікація, витяг даних, маршрутизація та генерація результатів у єдиному пайплайні.",
    },
    image: "/dashboard-overview-screen.jpg",
  },
  {
    title: { en: "AI Agents", uk: "AI-агенти" },
    description: {
      en: "Autonomous agents that plan, use tools, and execute multi-step tasks without human input at each step. Built with LangChain or LlamaIndex and integrated with APIs, databases, and external services.",
      uk: "Автономні агенти, які планують дії, використовують інструменти та виконують складні багатокрокові задачі без участі людини на кожному етапі.",
    },
    image: "/images/langchain.svg",
  },
  {
    title: { en: "AI-Powered Search", uk: "AI-пошук" },
    description: {
      en: "Semantic search over product data, documentation, or knowledge bases using vector embeddings, similarity retrieval, Pinecone or Weaviate, and hybrid dense/sparse search.",
      uk: "Семантичний пошук по даних продукту, документації або базі знань із використанням vector embeddings, similarity retrieval, Pinecone або Weaviate та гібридного пошуку.",
    },
    image: "/analytics-charts-and-graphs.jpg",
  },
  {
    title: { en: "AI Recommendation Systems", uk: "Рекомендаційні системи" },
    description: {
      en: "Personalization engines that surface relevant products, content, or actions based on user behavior, context, and collaborative filtering signals inside your SaaS flows.",
      uk: "Персоналізація контенту та дій на основі поведінки користувача, контексту та сигналів взаємодії безпосередньо у SaaS-процесах.",
    },
    image: "/images/SaaS.webp",
  },
  {
    title: { en: "AI Document Processing", uk: "Обробка документів" },
    description: {
      en: "Automated extraction, classification, and validation of structured data from PDFs, contracts, invoices, forms, and unstructured text with schema-based output validation.",
      uk: "Автоматичне вилучення, класифікація та валідація структурованих даних із PDF, контрактів, інвойсів, форм і неструктурованого тексту з перевіркою за схемами.",
    },
    image: "/financial-charts-data-analysis.jpg",
  },
] as const;

const technologyStacks = [
  {
    label: { en: "Models", uk: "Моделі" },
    items: ["OpenAI GPT-4o", "GPT-4 Turbo", "Claude 3.5", "Gemini 1.5 Pro"],
    text: {
      en: "Model selection is driven by task requirements, context window needs, accuracy benchmarks, latency, and cost profile.",
      uk: "Вибір моделі залежить від задачі, контекстного вікна, benchmark точності, затримки та вартості.",
    },
    icon: BrainCircuit,
  },
  {
    label: { en: "Orchestration", uk: "Оркестрація" },
    items: ["LangChain", "LlamaIndex", "Tool calling", "Retrieval pipelines"],
    text: {
      en: "Agent orchestration, retrieval pipelines, and tool-calling workflows for production AI features.",
      uk: "Оркестрація агентів, retrieval-пайплайни та tool-calling workflows для production AI-функцій.",
    },
    icon: Route,
  },
  {
    label: { en: "Vector databases", uk: "Векторні бази даних" },
    items: ["Pinecone", "Weaviate", "pgvector", "Hybrid search"],
    text: {
      en: "Embedding storage and semantic retrieval, with pgvector for teams already using PostgreSQL.",
      uk: "Зберігання embeddings і семантичний пошук, з pgvector для команд, які вже використовують PostgreSQL.",
    },
    icon: Database,
  },
  {
    label: { en: "RAG architecture", uk: "RAG-архітектура" },
    items: ["Chunking", "Embedding", "Retrieval", "Grounded answers"],
    text: {
      en: "Retrieval-augmented generation pipelines ground LLM responses in proprietary data and reduce hallucination risk.",
      uk: "Retrieval-augmented generation підключає моделі до ваших даних і зменшує ризик «галюцинацій».",
    },
    icon: Search,
  },
  {
    label: { en: "Infrastructure", uk: "Інфраструктура" },
    items: ["Python", "FastAPI", "Docker", "AWS", "GCP"],
    text: {
      en: "Production deployments with response caching, rate limiting, observability, and cost monitoring from day one.",
      uk: "Production-розгортання з кешуванням відповідей, rate limiting, observability і контролем витрат із першого дня.",
    },
    icon: ServerCog,
  },
] as const;

const processSteps = [
  {
    title: { en: "Discovery", uk: "Discovery" },
    text: {
      en: "Use case definition, data audit, model evaluation, and success metric definition before build starts.",
      uk: "Визначення use case, аудит даних, вибір моделі та метрик успіху перед стартом розробки.",
    },
    icon: ClipboardCheck,
  },
  {
    title: { en: "Prototype", uk: "Prototype" },
    text: {
      en: "A working integration demonstrating the core AI capability against your actual data and edge cases.",
      uk: "Робочий прототип, який демонструє ключову AI-можливість на ваших реальних даних і крайових сценаріях.",
    },
    icon: Sparkles,
  },
  {
    title: { en: "Production build", uk: "Production build" },
    text: {
      en: "Prompt engineering, structured outputs, error handling, cost optimization, API hardening, and integration with product workflows.",
      uk: "Налаштування запитів, структуровані outputs, обробка помилок, оптимізація вартості, API hardening та інтеграція з product workflows.",
    },
    icon: Code2,
  },
  {
    title: { en: "Evaluation", uk: "Evaluation" },
    text: {
      en: "Accuracy benchmarking, latency profiling, safety checks, and edge case testing before release.",
      uk: "Бенчмаркінг точності, аналіз затримок, safety checks і тестування крайових сценаріїв перед релізом.",
    },
    icon: Gauge,
  },
  {
    title: { en: "Deployment", uk: "Deployment" },
    text: {
      en: "Containerized release, monitoring setup, documentation, logging, rate limits, and cost alerts.",
      uk: "Контейнеризоване розгортання, моніторинг, документація, логування, rate limits і cost alerts.",
    },
    icon: Cloud,
  },
  {
    title: { en: "Iteration", uk: "Iteration" },
    text: {
      en: "Feedback integration, model updates, prompt improvements, and capability expansion after launch.",
      uk: "Покращення на основі фідбеку, оновлення моделей, prompt improvements і розширення можливостей після запуску.",
    },
    icon: BarChart3,
  },
] as const;

const copy = {
  en: {
    heroTitle: "AI Integration Services for SaaS and Business Automation",
    heroSubtitle: "AI Integration for Modern Digital Products",
    intro:
      "We integrate large language models, build production-grade AI agents, implement RAG architecture for document intelligence, and wire AI-powered search and recommendation systems directly into SaaS products and business workflows. Our AI integration company delivers production-ready implementations: versioned, monitored, cost-controlled, and secured.",
    introStat:
      "LLM integration and AI workflow automation reduce time spent on document-heavy and repetitive cognitive tasks by 50–80%.",
    problemsTitle: "What Business Problems AI Solves",
    servicesTitle: "AI Services We Provide",
    practiceCta: "See it in practice",
    techTitle: "AI Technologies and Models We Use",
    processTitle: "AI Integration Process",
    securityTitle: "AI Security and Data Privacy",
    securityItems: [
      ["No training on your data", "API-based integrations with OpenAI, Anthropic, and Google do not use your inputs for model training under enterprise API agreements."],
      ["Data minimization", "Prompts are constructed to send only the data necessary for the task."],
      ["PII handling", "Sensitive fields are masked or excluded from LLM inputs where processing does not require them."],
      ["Access control", "AI endpoints are secured behind authentication and rate limiting."],
      ["Audit logging", "LLM inputs and outputs are logged for compliance review and debugging."],
      ["On-premise options", "For compliance-constrained environments, we deploy open-weight models such as Llama or Mistral on your infrastructure."],
    ] as const,
    saasTitle: "AI Integration for SaaS Platforms",
    saasText:
      "SaaS products that integrate AI capabilities into core user workflows see measurable retention and engagement improvements. Common patterns include AI-assisted content creation in editors, intelligent search over user-generated data, LLM-driven onboarding flows, and proactive anomaly detection in dashboards. We integrate AI features as first-class product capabilities with the same engineering standards applied to the rest of the product.",
    costTitle: "Cost of AI Integration",
    costText:
      "A focused LLM integration for a single use case typically ranges from $15,000–$35,000. Multi-workflow AI automation with agent orchestration and custom RAG pipelines ranges from $40,000–$100,000. Ongoing AI operations retainers covering model updates, monitoring, and capability expansion run $2,500–$6,000/month.",
    costTiers: [
      ["Single-use-case LLM integration", "$15,000 – $35,000", "Chatbot, document processing, search, or one focused product capability."],
      ["Multi-workflow AI automation", "$40,000 – $100,000", "Agent orchestration, custom RAG pipelines, workflow automation, and production hardening."],
      ["AI operations retainer", "$2,500 – $6,000 / month", "Model updates, monitoring, cost optimization, evaluation, and capability expansion."],
    ] as const,
    ctaTitle: "Ready to scope an AI integration?",
    ctaText:
      "Tell us which workflow you want to automate or which AI capability you want to add to your product. We'll scope it in a 30-minute call.",
    ctaButton: "Start with a free AI scoping call",
    faqTitle: "FAQ",
    faqs: [
      ["What are AI integration services?", "AI integration services connect large language models and AI infrastructure to your existing product or business workflows, enabling automation, intelligent search, document processing, and conversational interfaces without building AI models from scratch."],
      ["How can AI improve business processes?", "AI automates document-heavy tasks, resolves repetitive support queries without escalation, generates and summarizes content at scale, and surfaces relevant information through semantic search — typically reducing time-on-task by 50–80%."],
      ["How much does AI integration cost?", "A focused single-use-case integration ranges from $15,000–$35,000. Multi-workflow automation with RAG and agents ranges from $40,000–$100,000. Ongoing operations retainers run $2,500–$6,000/month."],
      ["What is LLM integration?", "LLM integration is the process of connecting a large language model API such as OpenAI, Claude, or Gemini to your product, including prompt engineering, input/output handling, error management, token cost optimization, and monitoring."],
      ["How do AI agents work?", "AI agents are LLM-based systems that can plan, decide which tools to use, and execute multi-step tasks autonomously. They combine an LLM's reasoning capability with defined tools such as API calls, database queries, and file operations."],
      ["What businesses benefit from AI automation?", "Any business with high-volume document processing, repetitive knowledge work, customer support at scale, or large datasets users need to query in natural language can benefit. SaaS, financial services, legal, healthcare, logistics, and eCommerce are frequent adopters."],
      ["How long does AI integration take?", "A focused integration for a single use case usually takes 4–6 weeks. Multi-workflow automation with agent orchestration and RAG usually takes 8–14 weeks."],
      ["What is RAG architecture?", "Retrieval-augmented generation grounds an LLM response in retrieved documents from a vector database instead of relying only on training data. This reduces hallucination on domain-specific queries and keeps responses accurate as data changes."],
      ["How secure are AI integrations?", "Under standard enterprise API agreements, OpenAI, Anthropic, and Google do not use API inputs for model training. We add data minimization, PII masking, access control on AI endpoints, and audit logging."],
      ["What AI models are best for SaaS products?", "GPT-4o is strong for high-quality general-purpose tasks, Claude 3.5 Sonnet for long context and nuanced instruction following, and Gemini 1.5 Pro for multimodal workflows. Model choice is validated against your task requirements and cost profile."],
    ] as const,
  },
  uk: {
    heroTitle: "AI-інтеграційні сервіси для SaaS і бізнес-автоматизації",
    heroSubtitle: "AI-інтеграція для сучасних цифрових продуктів",
    intro:
      "Ми інтегруємо великі мовні моделі, будуємо AI-агентів рівня production, впроваджуємо RAG-архітектуру для інтелектуальної роботи з документами та підключаємо AI-пошук і рекомендаційні системи безпосередньо у SaaS-продукти та бізнес-процеси. Наша компанія з AI-інтеграції забезпечує готові до продакшену рішення: версіоновані, з моніторингом, контролем витрат і захистом даних.",
    introStat:
      "Інтеграція LLM і автоматизація AI-процесів скорочують час на роботу з документами та повторювані когнітивні задачі на 50–80%.",
    problemsTitle: "Які бізнес-проблеми вирішує AI",
    servicesTitle: "AI-сервіси, які ми надаємо",
    practiceCta: "Подивитись на практиці",
    techTitle: "AI-технології, які ми використовуємо",
    processTitle: "Процес AI-інтеграції",
    securityTitle: "AI безпека та приватність",
    securityItems: [
      ["Без навчання на ваших даних", "API-based інтеграції з OpenAI, Anthropic і Google не використовують ваші inputs для тренування моделей за enterprise API agreements."],
      ["Мінімізація даних", "Промпти формуються так, щоб передавати лише контекст, необхідний для задачі."],
      ["Обробка персональних даних", "Чутливі поля маскуються або виключаються з LLM inputs, якщо обробка їх не потребує."],
      ["Контроль доступу", "AI endpoints захищені автентифікацією та rate limiting."],
      ["Логування", "LLM inputs і outputs логуються для compliance review та debugging."],
      ["On-premise варіанти", "Для compliance-constrained середовищ ми розгортаємо open-weight моделі, такі як Llama або Mistral, у вашій інфраструктурі."],
    ] as const,
    saasTitle: "AI для SaaS-платформ",
    saasText:
      "SaaS-продукти з інтегрованим AI отримують вимірне зростання retention та engagement. Типові сценарії: AI-асистоване створення контенту в редакторах, інтелектуальний пошук по user-generated data, LLM-based onboarding flows і proactive anomaly detection у dashboards. Ми інтегруємо AI як повноцінну частину продукту з тими ж інженерними стандартами, що й основну систему.",
    costTitle: "Вартість AI-інтеграції",
    costText:
      "Сфокусована інтеграція LLM для одного сценарію зазвичай коштує $15,000–$35,000. Комплексна AI-автоматизація з агентами та custom RAG pipelines — $40,000–$100,000. Постійний супровід з оновленням моделей, моніторингом і розвитком функціоналу — $2,500–$6,000/місяць.",
    costTiers: [
      ["Інтеграція LLM для одного use case", "$15,000 – $35,000", "Чат бот, обробка документів, пошук або одна сфокусована product capability."],
      ["Комплексна AI-автоматизація", "$40,000 – $100,000", "Agent orchestration, custom RAG pipelines, workflow automation і production hardening."],
      ["AI operations retainer", "$2,500 – $6,000 / місяць", "Оновлення моделей, моніторинг, cost optimization, evaluation і розширення можливостей."],
    ] as const,
    ctaTitle: "Готові оцінити AI-інтеграцію?",
    ctaText:
      "Розкажіть нам, які процеси ви хочете автоматизувати або яку AI-можливість хочете додати у ваш продукт. Ми визначимо обсяг рішення під час 30-хвилинного дзвінка.",
    ctaButton: "Розпочати безкоштовну AI-сесію",
    faqTitle: "FAQ",
    faqs: [
      ["Що таке AI-інтеграційні сервіси?", "AI-інтеграційні сервіси — це підключення великих мовних моделей та AI-інфраструктури до вашого продукту або бізнес-процесів, що забезпечує автоматизацію, інтелектуальний пошук, обробку документів і діалогові інтерфейси без створення моделей з нуля."],
      ["Як AI може покращити бізнес-процеси?", "AI автоматизує задачі з обробкою документів, вирішує повторювані запити підтримки без оператора, генерує та узагальнює контент у масштабі й забезпечує релевантний семантичний пошук. У середньому це скорочує час виконання задач на 50–80%."],
      ["Скільки коштує AI-інтеграція?", "Сфокусована інтеграція одного сценарію використання коштує $15,000–$35,000. Комплексна автоматизація кількох процесів із RAG і агентами — $40,000–$100,000. Постійний супровід — $2,500–$6,000 на місяць."],
      ["Що таке інтеграція LLM?", "Інтеграція великих мовних моделей — це підключення API OpenAI, Claude або Gemini до вашого продукту, включно з налаштуванням запитів, обробкою входів і виходів, керуванням помилками, оптимізацією вартості токенів і моніторингом."],
      ["Як працюють AI-агенти?", "AI-агенти — це системи на основі мовних моделей, які можуть планувати дії, обирати інструменти та виконувати багатокрокові задачі автономно. Вони поєднують логіку LLM із зовнішніми API, базами даних і сервісами."],
      ["Для яких бізнесів корисна AI-автоматизація?", "Для будь-яких бізнесів із великим обсягом обробки даних, документів або звернень. Найчастіше це SaaS, фінансові сервіси, юриспруденція, медицина, логістика та eCommerce."],
      ["Скільки часу займає AI-інтеграція?", "Інтеграція одного сценарію зазвичай займає 4–6 тижнів. Комплексна автоматизація з агентами та RAG — 8–14 тижнів."],
      ["Що таке RAG-архітектура?", "Retrieval-Augmented Generation — це підхід, за якого відповіді моделі базуються на ваших даних із векторної бази, а не лише на тренувальних даних моделі. Це зменшує кількість помилкових відповідей і підвищує точність у доменних задачах."],
      ["Наскільки безпечні AI-інтеграції?", "За стандартними умовами enterprise API провайдери OpenAI, Anthropic і Google не використовують ваші дані для навчання моделей. Додатково ми впроваджуємо маскування чутливих даних, контроль доступу, мінімізацію даних і аудит логування."],
      ["Які AI-моделі найкраще підходять для SaaS-продуктів?", "GPT-4o підходить для універсальних задач високої якості. Claude 3.5 Sonnet — для складних інструкцій і довгого контексту. Gemini 1.5 Pro — для мультимодальних сценаріїв. Вибір завжди залежить від конкретного use case і вартості."],
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

export default function AIIntegrationServicesPage() {
  const { locale } = useLocale();
  const lang = locale === "uk" ? "uk" : "en";
  const page = copy[lang];
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[560px] overflow-hidden px-4 pb-20 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0">
          <Image
            src="/ai-machine-learning-technology.jpg"
            alt="AI integration services"
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
            <BrainCircuit className="mb-5 h-10 w-10 text-[#FF6200]" />
            <p className="text-2xl font-semibold leading-tight text-foreground dark:text-white">
              {page.introStat}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="mb-10 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          {page.problemsTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {businessProblems.map((problem) => {
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
            <h2 className="mb-8 text-3xl font-semibold md:text-4xl">
              {page.servicesTitle}
            </h2>
            <div className="border-t border-black/10 dark:border-white/10">
              {aiServices.map((service, index) => {
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
              href="/projects"
              className="relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#FF6200] px-8 py-4 font-[Onest] text-base font-normal leading-[100%] text-white transition duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-black sm:w-auto"
            >
              {page.practiceCta}
            </Link>
          </div>
          <article className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#1b1d23]">
            <div className="relative h-60 bg-[#111] md:h-72">
              <Image
                src={aiServices[activeService].image}
                alt={aiServices[activeService].title[lang]}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="mb-3 text-3xl font-semibold">
                {aiServices[activeService].title[lang]}
              </h3>
              <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
                {aiServices[activeService].description[lang]}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-semibold md:text-5xl">{page.techTitle}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technologyStacks.map((stack) => {
            const Icon = stack.icon;
            return (
              <div
                key={stack.label.en}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
              >
                <Icon className="mb-5 h-9 w-9 text-[#FF6200]" />
                <h3 className="text-2xl font-semibold">{stack.label[lang]}</h3>
                <p className="mt-3 leading-relaxed text-foreground/65 dark:text-white/65">
                  {stack.text[lang]}
                </p>
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
      </section>

      <section className="bg-[#f3f5fa] px-4 py-16 dark:bg-[#191a20] md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-3xl font-semibold md:text-5xl">
            {page.processTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title.en}
                  className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#111111]"
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheck className="mb-6 h-12 w-12 text-[#FF6200]" />
            <h2 className="text-3xl font-semibold md:text-5xl">
              {page.securityTitle}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.securityItems.map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#191a20]"
              >
                <Lock className="mb-4 h-6 w-6 text-[#FF6200]" />
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/65 dark:text-white/65">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-[#191a20] md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Boxes className="mb-6 h-12 w-12 text-[#FF6200]" />
            <h2 className="text-3xl font-semibold md:text-4xl">
              {page.saasTitle}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-foreground/70 dark:text-white/70">
            {page.saasText}
          </p>
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
              className="mt-4 flex h-[40px] w-[300px] items-center justify-center rounded-[50px] bg-[#FF6200] px-[14px] py-[4px] text-center font-['Onest'] text-[16px] font-semibold leading-none tracking-[0.02em] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] md:mt-0"
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

      <div id="ai-integration-audit" className="-mt-4">
        <RequestConsultationSection />
      </div>
    </main>
  );
}
