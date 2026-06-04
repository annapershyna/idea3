"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Loader2, Paperclip, X } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { getRecaptchaSiteKey } from "@/app/actions/recaptcha"

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const serviceTechIcons: Record<string, string | null> = {
  ARKit: "/icons/tech/arkit.svg",
  "AR Foundation": "/icons/tech/ar-foundation.svg",
  WebGL: "/icons/tech/webgl.svg",
  "Meta Quest": "/icons/tech/meta-quest.svg",
  "C#": "/icons/tech/csharp.svg",
  ARCore: "/icons/tech/arcore.svg",
  "HTC Vive": "/icons/tech/htc-vive.svg",
  "C# (.NET Framework)": "/icons/tech/dotnet-framework.svg",
  TypeScript: "/icons/tech/typescript.svg",
  React: "/images/react.svg",
  "Next.js": "/images/next.svg",
  "Node.js": "/icons/tech/nodejs.svg",
  GraphQL: "/icons/tech/graphql.svg",
  PostgreSQL: "/icons/tech/postgresql.svg", 
  "Tailwind CSS": "/icons/tech/tailwindcss.svg",
  Vercel: "/icons/tech/vercel.svg",
  Figma: "/icons/tech/figma.svg",
  "Adobe XD": "/icons/tech/adobe-xd-1.svg", 
  Prototyping: "/icons/tech/prototyping.svg",
  "Design Systems": "/icons/tech/design.svg",
  "User Research": "/icons/tech/User-Research.svg",
  Accessibility: "/icons/tech/accessibility.svg",
  Jest: "/icons/tech/jest.svg",
  Cypress: "/icons/tech/cypress.svg",
  Playwright: "/icons/tech/playwright.svg",
  Selenium: "/icons/tech/selenium.svg", 
  TestRail: "/icons/tech/TestRail.svg",  
  "API Testing": "/icons/tech/api.svg", 
  Kubernetes: "/images/kubernetes.svg",
  Docker: "/images/docker.svg",
  Terraform: "/icons/tech/terraform.svg",
  GitHub: "/icons/tech/github.svg",
  CircleCI: "/icons/tech/circleci.svg",
  AWS: "/images/aws.svg",
  "Cloud Run": "/icons/tech/cloud-run.svg",
  Grafana: "/icons/tech/grafana.svg",
  Python: "/icons/tech/python.svg", 
  "Data Visualization": "/icons/tech/analytics.svg",
  BigQuery: "/icons/tech/BigQuery.svg", 
  "React Native": "/images/react.svg",
  Flutter: "/icons/tech/flutter.svg",
  Swift: "/icons/tech/swift.svg",
  Kotlin: "/icons/tech/kotlin.svg",
  Firebase: "/icons/tech/firebase.svg",
  Stripe: "/icons/tech/stripe.svg",
  OpenAI: "/icons/tech/openai.svg",
  Anthropic: "/icons/tech/anthropic.svg",
  LangChain: "/images/langchain.svg",
  Pinecone: "/icons/tech/pinecone.svg",
  ChromaDB: "/icons/tech/chromadb.svg",
}

const servicePageCopy = {
  en: {
    mvpTitle: "MVP Development Services",
    mvpDesc:
      "We scope, design, and ship production-ready MVPs for startups in 6–12 weeks, focusing on the smallest feature set that validates your core hypothesis and gives investors or early users a working product to test.",
    mvpCapabilities: "Lean scope · Product architecture · SaaS MVP · Mobile MVP · Investor-ready demos",
    dedicatedTitle: "Dedicated Development Team",
    dedicatedDesc:
      "We assemble dedicated developers, tech leads, and QA engineers who integrate into your sprint cadence, communication stack, and code review process — giving you production output from week one without a 3–4 month hiring cycle.",
    dedicatedCapabilities: "Dedicated developers · Tech leads · QA engineers · Staff augmentation · Remote team onboarding",
    aiTitle: "AI Integration Services",
    aiDesc:
      "We integrate LLMs, AI agents, RAG architecture, AI-powered search, recommendation systems, and workflow automation directly into SaaS products and business operations with production-grade monitoring, cost control, and security.",
    aiCapabilities: "LLM integration · AI agents · RAG · AI search · Document processing · Workflow automation",
    webApplicationTitle: "Web Application Development",
    webApplicationDesc:
      "We build scalable web applications with clean frontend/backend separation, optimized data layers, and cloud-native architecture — engineered for performance, security, and long-term maintainability. From SPAs and real-time dashboards to B2B portals and internal tooling, every system is designed to handle growing user load.",
  },
  uk: {
    mvpTitle: "Послуги з розробки MVP",
    mvpDesc:
      "Ми визначаємо scope, проектуємо та запускаємо production-ready MVP для стартапів за 6–12 тижнів, фокусуючись на мінімальному наборі функцій для перевірки ключової гіпотези.",
    mvpCapabilities: "Lean scope · Product architecture · SaaS MVP · Mobile MVP · Демо для інвесторів",
    dedicatedTitle: "Dedicated Development Team",
    dedicatedDesc:
      "Ми збираємо dedicated developers, tech leads і QA engineers, які інтегруються у ваш sprint cadence, communication stack і code review process — щоб команда давала результат з першого тижня без 3–4 місяців найму.",
    dedicatedCapabilities: "Dedicated developers · Tech leads · QA engineers · Staff augmentation · Remote team onboarding",
    aiTitle: "AI Integration Services",
    aiDesc:
      "Ми інтегруємо LLM, AI-агентів, RAG-архітектуру, AI-пошук, рекомендаційні системи та workflow automation безпосередньо у SaaS-продукти й бізнес-процеси з production-grade моніторингом, контролем вартості та безпекою.",
    aiCapabilities: "LLM integration · AI agents · RAG · AI search · Document processing · Workflow automation",
    webApplicationTitle: "Розробка web-додатків",
    webApplicationDesc:
      "Ми будуємо масштабовані web-додатки з чітким розділенням frontend/backend, оптимізованими шарами даних і нативною хмарною архітектурою — спроектовані для продуктивності, безпеки та довгострокової підтримки.",
  },
} as const

export default function ServicesPage() {
  const { t, locale } = useLocale()
  const pageCopy = servicePageCopy[locale]

  const [isDark, setIsDark] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptTerms: false,
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [siteKey, setSiteKey] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const key = await getRecaptchaSiteKey()
        setSiteKey(key)
      } catch (err) {
        console.error("Failed to load reCAPTCHA key:", err)
      }
    }
    fetchKey()
  }, [])

  useEffect(() => {
    if (scriptLoaded.current) return

    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit"
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    scriptLoaded.current = true

    const style = document.createElement("style")
    style.innerHTML = `.grecaptcha-badge { visibility: hidden !important; width: 0 !important; height: 0 !important; }`
    document.head.appendChild(style)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles].slice(0, 3))
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      setSubmitStatus({ type: "error", message: t.pleaseAcceptTerms || "Please accept the Terms and Conditions" })
      return
    }

    if (!siteKey) {
      setSubmitStatus({ type: "error", message: t.recaptchaNotLoaded || "reCAPTCHA not loaded. Refresh page." })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await new Promise<void>((resolve) => {
        if ((window as any).grecaptcha) {
          resolve()
        } else {
          const checkInterval = setInterval(() => {
            if ((window as any).grecaptcha) {
              clearInterval(checkInterval)
              resolve()
            }
          }, 100)
        }
      })

      const token = await window.grecaptcha.execute(siteKey, { action: "contact_form" })

      const form = new FormData()
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("message", formData.message)
      form.append("recaptchaToken", token)
      files.forEach((file) => form.append("files", file))

      const res = await fetch("/api/contact", { method: "POST", body: form })
      const data = await res.json()

      if (res.ok) {
        setSubmitStatus({ type: "success", message: t.messageSent || "Message sent successfully!" })
        setFormData({ name: "", email: "", message: "", acceptTerms: false })
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ""
      } else {
        setSubmitStatus({ type: "error", message: data.error || t.failedToSend || "Failed to send message" })
      }
    } catch (err) {
      console.error("Submit failed:", err)
      setSubmitStatus({ type: "error", message: t.failedToSend || "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const services = [
    {
      id: "custom-web-solutions",
      title: t.customWebSolutions,
      description: t.customWebSolutionsDesc,
      image: "/images/web-application-coding-1024x683.jpg",
      imageAlt: "Custom web solutions - laptop with code",
      href: "/services/custom-software-development",
      reverse: true,
      stack: t.customWebSolutionsStack,
    },
    {
      id: "web-application-development",
      title: pageCopy.webApplicationTitle,
      description: pageCopy.webApplicationDesc,
      image: "/images/3f00f5531b4c18a10739177bfb9caed239f86ebd.jpg",
      imageAlt: "web application development",
      href: "/services/web-application-development",
      reverse: false,
      stack: t.customWebSolutionsStack,
    },
    {
      id: "ux-ui-design",
      title: t.uiUxDesign,
      description: t.uiUxDesignDesc,
      image: "/images/8d64c3f21c11f588925bab77e415bd557cad385b.jpg",
      imageAlt: "UX/UI and Graphic Design workspace",
      reverse: true,
      stack: t.uiUxDesignStack,
    },
    {
      id: "qa",
      title: t.qaAutomation,
      description: t.qaAutomationDesc,
      image: "/images/d99f7180c4bf0265069aa1c177dc0143e37e4d79.jpg",
      imageAlt: "Manual and Automation QA - testing screens",
      href: "/services/qa-automation-services",
      reverse: false,
      stack: t.qaAutomationStack,
    },
    {
      id: "devops",
      title: t.devops,
      description: t.devopsDesc,
      image: "/images/45fc920cb000857538e44a289f252b1506456ab8.jpg",
      imageAlt: "DevOps development",
      href: "/services/devops-services",
      reverse: true,
      stack: t.devopsStack,
    },
    {
      id: "data-analytics",
      title: t.dataAnalytics,
      description: t.dataAnalyticsDesc,
      image: "/images/ee788060a2aeeb43a086780a10e052075317f0cd.jpg",
      imageAlt: "Data Analytics - graphs and charts",
      reverse: false,
      stack: t.dataAnalyticsStack,
    },
    {
      id: "mobile-applications",
      title: t.mobileApplications,
      description: t.mobileApplicationsDesc,
      image: "/images/d00b7db9fb79ecd79b7d95fa7eecf2e662529ebe.jpg",
      imageAlt: "Mobile Applications - app icons",
      href: "/services/mobile-app-development",
      reverse: true,
      stack: t.mobileApplicationsStack,
    },
    {
      id: "mvp-development-services",
      title: pageCopy.mvpTitle,
      description: pageCopy.mvpDesc,
      capabilities: pageCopy.mvpCapabilities,
      image: "/images/MVP-Development.jpg",
      imageAlt: "MVP development services for startups",
      href: "/services/mvp-development-services",
      reverse: false,
      stack: t.customWebSolutionsStack,
    },
    {
      id: "dedicated-development-team",
      title: pageCopy.dedicatedTitle,
      description: pageCopy.dedicatedDesc,
      capabilities: pageCopy.dedicatedCapabilities,
      image: "/images/Software-Development-Team.jpg",
      imageAlt: "Dedicated development team working together",
      href: "/services/dedicated-development-team",
      reverse: true,
      stack: t.customWebSolutionsStack,
    },
    {
      id: "ai-integration-services",
      title: pageCopy.aiTitle,
      description: pageCopy.aiDesc,
      capabilities: pageCopy.aiCapabilities,
      image: "/ai-machine-learning-technology.jpg",
      imageAlt: "AI integration services for SaaS and automation",
      href: "/services/ai-integration-services",
      reverse: false,
      stack: ["OpenAI", "Anthropic", "LangChain", "Pinecone", "ChromaDB"],
    },
    {
      id: "real-time-3d-interactive-development",
      title: t.unityDevelopment,
      description: t.unityDevelopmentDesc,
      capabilities: t.unityDevelopmentCapabilities,
      stack: t.unityDevelopmentStack,
      href: "/services/unity-development-services",
      buttonLabel: t.unityDevelopmentButton,
      buttonHref: "/projects/ar-earring-virtual-try-on",
      image: "/Unity.jpg",
      imageAlt: "Unity real-time 3D and interactive development",
      reverse: true,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-42 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1
            className="font-bold mb-4"
            style={{
              fontFamily: "Onest",
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: "1.1",
              backgroundImage: isDark
                ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
                : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.servicesTitle}
          </h1>
        </div>
      </section>

      {/* Service Section */}
      <section className="pb-16">
        <div className="max-w-[1280px] mx-auto px-6">
          {services.map((service, index) => (
            <div key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              {index > 0 && (
                <div
                  className="w-full mb-16"
                  style={{
                    height: "1px",
                    background: "var(--foreground)",
                    opacity: 0.1,
                  }}
                />
              )}
              <div
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20 items-center scroll-mt-32 ${service.reverse ? "lg:grid-flow-dense" : ""
                  }`}
              >
                <div className={service.reverse ? "lg:col-start-2" : ""}>
                  <h2
                    className="font-semibold mb-6"
                    style={{
                      fontFamily: "Onest",
                      fontSize: "clamp(24px, 3vw, 40px)",
                      lineHeight: "1.2",
                      backgroundImage: hoveredIndex === index
                        ? (isDark
                          ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
                          : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)")
                        : undefined,
                      WebkitBackgroundClip: hoveredIndex === index ? "text" : undefined,
                      WebkitTextFillColor: hoveredIndex === index ? "transparent" : undefined,
                      backgroundClip: hoveredIndex === index ? "text" : undefined,
                      color: hoveredIndex === index ? undefined : "inherit",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {service.href ? (
                      <Link
                        href={service.href}
                        className="inline-block text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6200] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      >
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h2>
                  <p
                    style={{
                      fontFamily: "Onest",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "var(--foreground)",
                      opacity: 0.8,
                    }}
                  >
                    {service.description}
                  </p>
                  {service.capabilities && (
                    <p
                      className="mt-5 font-medium"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "var(--foreground)",
                      }}
                    >
                      {service.capabilities}
                    </p>
                  )}
                  {service.stack && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.stack.map((tech: string, i: number) => {
                        const iconPath = serviceTechIcons[tech]

                        return (
                          <span
                            key={i}
                            className="px-3 py-2 rounded-[4px] text-xs font-medium flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                            style={{
                              backgroundColor: isDark ? "#323130" : "#FFFFFF",
                              color: isDark ? "#FFFFFF" : "#000000",
                              border: isDark ? "none" : "1px solid #E0E0E0",
                              fontFamily: "Onest",
                            }}
                          >
                            {iconPath && (
                              <span
                                className="flex items-center justify-center rounded-[2px] flex-shrink-0"
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  padding: "2px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              >
                                <Image src={iconPath} alt={`${tech} icon`} width={16} height={16} />
                              </span>
                            )}
                            {tech}
                          </span>
                        )
                      })}
                    </div>
                  )}
                  {service.buttonHref && service.buttonLabel && (
                    <Link
                      href={service.buttonHref}
                      className="mt-7 inline-flex h-10 items-center justify-center rounded-full bg-[#FF6200] px-5 text-sm font-medium text-white transition hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#FF8533]"
                      style={{ fontFamily: "Onest" }}
                    >
                      {service.buttonLabel}
                    </Link>
                  )}
                </div>

                <div className={service.reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
                  {service.href ? (
                    <Link
                      href={service.href}
                      aria-label={service.title}
                      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6200] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.imageAlt}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="rounded-2xl p-5 sm:p-6 md:p-10 lg:p-12" style={{ background: "#1E1E1E" }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-stretch">
                <div className="w-full min-w-0 xl:flex-1 flex flex-col gap-4">
                  <h2
                    className="font-bold mb-6 md:mb-8 text-white"
                    style={{
                      fontFamily: "Onest",
                      fontWeight: 700,
                      fontStyle: "normal",
                      fontSize: "clamp(24px, 6vw, 32px)",
                      lineHeight: "1.12",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {t.contactFormHeading}
                  </h2>

                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-white"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      {t.name || "Name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.typeYourName || "Type your Name"}
                      required
                      className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50 bg-[#2A2A2A]"
                      style={{ fontFamily: "Onest" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-white"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      {t.email || "Email"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.typeYourEmail || "Type your email"}
                      required
                      className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50 bg-[#2A2A2A]"
                      style={{ fontFamily: "Onest" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-white"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      {t.message || "Message"}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.typeYourMessage || "Type your message"}
                      required
                      className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50 resize-none bg-[#2A2A2A]"
                      style={{ fontFamily: "Onest" }}
                    />
                  </div>
                </div>

                <div className="relative hidden xl:block xl:flex-1 rounded-2xl overflow-hidden min-h-[420px] mb-1">
                  <Image
                    src="/images/f236a65b9dcdd59fe25f5a9694d5243e04bca53a-20-281-29.jpg"
                    alt="Developer working at desk"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:flex-wrap items-stretch lg:items-center gap-4 lg:gap-6 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    relative overflow-hidden
                    flex w-full lg:w-[264px] items-center justify-center gap-[10px]
                    text-[16px] font-medium leading-[1]
                    text-white
                    transition duration-300 ease-out
                    disabled:cursor-not-allowed disabled:opacity-50
                    bg-[#FF6200] rounded-[50px]
                    hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000]
                    active:bg-gradient-to-br active:from-[#FF6200] active:to-[#000000]
                    active:scale-[0.98]
                  `}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = "#FF6200"
                    }
                  }}
                  onMouseDown={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)"
                    }
                  }}
                  onMouseUp={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                    }
                  }}
                  style={{
                    height: "40px",
                    padding: "4px 14px",
                    fontFamily: "Onest",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.sending || "Sending..."}
                    </>
                  ) : (
                    t.send || "Send"
                  )}
                </button>

                <label
                  htmlFor="attach-file"
                  className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer text-white hover:opacity-80 transition"
                  style={{ fontFamily: "Onest", fontSize: "16px" }}
                >
                  <Paperclip size={18} color="#FF6200" />
                  {t.attachFile || "Attach file (optional)"}
                </label>

                <input
                  ref={fileInputRef}
                  id="attach-file"
                  type="file"
                  multiple
                  accept=".doc,.docx,.pdf,.ppt,.pptx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-full text-white text-sm border border-[#3A3A3A]"
                    >
                      <span className="truncate max-w-[180px]">{file.name}</span>
                      <button type="button" onClick={() => removeFile(idx)}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-start gap-3 mt-5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-[#3A3A3A] bg-[#2A2A2A]"
                />
                <label className="text-sm text-white/80" style={{ fontFamily: "Onest" }}>
                  {t.iAccept || "I Accept"}{" "}
                  <Link href="/terms" className="underline text-white hover:text-[#FF6200]">
                    {t.acceptTerms || "Terms and Conditions"}
                  </Link>
                  .<br />
                  {t.bySubmitting || "By submitting your email, you accept terms and conditions."}<br />
                  {t.mayEcho || "We may send you occasionally marketing emails."}
                </label>
              </div>

              {submitStatus && (
                <div
                  className={`p-4 rounded-[4px] mt-5 ${submitStatus.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  style={{ fontFamily: "Onest" }}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
