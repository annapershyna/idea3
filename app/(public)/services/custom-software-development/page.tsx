"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Code2, Database, Cloud, Zap, GitBranch, Users } from "lucide-react"

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

interface Service {
  id: string
  title: string
  description: string
}

interface ProcessStep {
  number: string
  title: string
  description: string
}

interface Industry {
  name: string
}

export default function CustomSoftwareDevelopmentPage() {
  const { t, locale } = useLocale()
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [activeWhyChoose, setActiveWhyChoose] = useState<number | null>(null)

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll("[data-index]").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const benefits: Benefit[] = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t.benefit1,
      description: "Full ownership without vendor lock-in",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: t.benefit2,
      description: "Seamless system integration",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: t.benefit3,
      description: "Business-specific automation",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t.benefit4,
      description: "Faster competitive advantage",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: t.benefit5,
      description: "Complete data control",
    },
  ]

  const services: Service[] = [
    {
      id: "web-apps",
      title: t.webAppsTitle,
      description: t.webAppsDesc,
    },
    {
      id: "saas",
      title: t.saasTitle,
      description: t.saasDesc,
    },
    {
      id: "enterprise",
      title: t.enterpriseTitle,
      description: t.enterpriseDesc,
    },
    {
      id: "crm-erp",
      title: t.crmTitle,
      description: t.crmDesc,
    },
    {
      id: "api",
      title: t.apiTitle,
      description: t.apiDesc,
    },
  ]

  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: t.discovery,
      description: t.discoveryDesc,
    },
    {
      number: "02",
      title: t.sprint,
      description: t.sprintDesc,
    },
    {
      number: "03",
      title: t.qa,
      description: t.qaDesc,
    },
    {
      number: "04",
      title: t.deployment,
      description: t.deploymentDesc,
    },
    {
      number: "05",
      title: t.postLaunch,
      description: t.postLaunchDesc,
    },
  ]

  const technologies = {
    frontend: ["React", "Next.js", "Vue", "TypeScript"],
    backend: ["Node.js", "Python", "Go", "Java"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
    cloud: ["AWS", "GCP", "Docker", "Kubernetes"],
    apis: ["REST", "GraphQL", "gRPC", "WebSockets"],
    cicd: ["GitHub Actions", "Terraform", "CI/CD Pipelines"],
  }

  const industries: Industry[] = [
    { name: "FinTech" },
    { name: "HealthTech" },
    { name: "EdTech" },
    { name: "Logistics" },
    { name: "Retail & eCommerce" },
    { name: "SaaS Startups" },
  ]

  const whyChoosePoints = [
    {
      title: t.fullStackTeams,
      description: t.fullStackTeamsDesc,
    },
    {
      title: t.architectureFirst,
      description: t.architectureFirstDesc,
    },
    {
      title: t.transparentProcess,
      description: t.transparentProcessDesc,
    },
    {
      title: t.ownedCodebase,
      description: t.ownedCodebaseDesc,
    },
    {
      title: t.noScopeCreep,
      description: t.noScopeCreepDesc,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Banner Section */}
      <section className="relative w-full h-[320px] md:h-[400px] overflow-hidden pt-16 md:pt-24">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: isDark
              ? "radial-gradient(circle at 30% 50%, rgba(255, 98, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255, 98, 0, 0.2) 0%, transparent 50%)"
              : "radial-gradient(circle at 30% 50%, rgba(255, 98, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255, 98, 0, 0.1) 0%, transparent 50%)",
          }}
        />
        <div className="relative h-full flex flex-col justify-center items-center z-10">
          <div className="text-center">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{
                fontFamily: "Onest",
                color: isDark ? "#FFFFFF" : "#161515",
              }}
            >
              {t.customSoftwareDevelopmentTitle}
            </h1>
            <p
              className="text-base md:text-lg opacity-70 max-w-2xl mx-auto"
              style={{
                fontFamily: "Onest",
              }}
            >
              {t.customSoftwareDevelopmentSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 relative overflow-hidden border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 scroll-animate">
            <h1
              className="font-bold mb-6"
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
              {t.customSoftwareDevelopmentTitle}
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold mb-6"
              style={{
                color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                fontFamily: "Onest",
              }}
            >
              {t.customSoftwareDevelopmentSubtitle}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed opacity-75 max-w-3xl mx-auto"
              style={{
                fontFamily: "Onest",
              }}
            >
              {t.customSoftwareDevelopmentHero}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-lg leading-relaxed mb-8 opacity-80"
            style={{ fontFamily: "Onest" }}
          >
            {t.softwareDevelopmentDesc}
          </p>
          <p
            className="text-sm opacity-60"
            style={{ fontFamily: "Onest" }}
          >
            Every codebase is CI/CD-ready, fully documented, and designed to support growth from hundreds to hundreds of thousands of users without structural rewrites.
          </p>
        </div>
      </section>

      {/* Problems & Benefits Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "Onest" }}
            >
              {t.problemsTitle}
            </h2>
            <p className="text-base opacity-70" style={{ fontFamily: "Onest" }}>
              {t.problemsDesc}
            </p>
          </div>

          {/* Benefits Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                data-index={index}
                className={`p-6 rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 scroll-animate ${
                  visibleCards.includes(index) ? "visible" : ""
                }`}
                style={{
                  backgroundColor: isDark ? "rgba(255,98,0,0.05)" : "rgba(255,98,0,0.03)",
                }}
              >
                <div className="text-primary mb-4">{benefit.icon}</div>
                <p
                  className="font-semibold mb-2 text-sm"
                  style={{ fontFamily: "Onest" }}
                >
                  {benefit.title}
                </p>
                <p
                  className="text-xs opacity-60"
                  style={{ fontFamily: "Onest" }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered Section */}
      <section className="py-20 px-6 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Onest" }}
          >
            {t.servicesOfferedTitle}
          </h2>
          <p className="text-base opacity-70 mb-12" style={{ fontFamily: "Onest" }}>
            {t.servicesOfferedDesc}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                data-index={index}
                className={`p-8 rounded-xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 group scroll-animate ${
                  visibleCards.includes(index) ? "visible" : ""
                }`}
                style={{
                  backgroundColor: isDark ? "rgba(255,98,0,0.05)" : "rgba(255,98,0,0.03)",
                }}
              >
                <h3
                  className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors"
                  style={{ fontFamily: "Onest" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-75"
                  style={{ fontFamily: "Onest" }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-background border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "Onest" }}
            >
              {t.processTitle}
            </h2>
            <p className="text-base opacity-70 max-w-2xl mx-auto" style={{ fontFamily: "Onest" }}>
              Our proven methodology ensures predictable delivery and continuous value delivery at each phase
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Connection lines for desktop */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/30" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  data-index={index + 10}
                  className={`scroll-animate ${
                    visibleCards.includes(index + 10) ? "visible" : ""
                  }`}
                >
                  {/* Step circle and connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 border-primary bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-all duration-300 relative z-20"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(255, 98, 0, 0.1)"
                          : "rgba(255, 98, 0, 0.08)",
                      }}
                    >
                      <span
                        className="text-2xl font-bold text-primary"
                        style={{ fontFamily: "Onest" }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Content card */}
                    <div className="text-center">
                      <h4
                        className="text-lg font-semibold mb-2"
                        style={{ fontFamily: "Onest" }}
                      >
                        {step.title}
                      </h4>
                      <p
                        className="text-sm opacity-70 leading-relaxed"
                        style={{ fontFamily: "Onest" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Onest" }}
          >
            {t.technologiesTitle}
          </h2>
          <p className="text-base opacity-70 mb-12" style={{ fontFamily: "Onest" }}>
            {t.technologiesDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(technologies).map(([category, techs]) => (
              <div
                key={category}
                className="p-6 rounded-xl border border-foreground/10"
                style={{
                  backgroundColor: isDark ? "rgba(255,98,0,0.05)" : "rgba(255,98,0,0.03)",
                }}
              >
                <h4
                  className="font-semibold mb-4 text-primary"
                  style={{ fontFamily: "Onest" }}
                >
                  {category === "frontend"
                    ? t.frontend
                    : category === "backend"
                      ? t.backend
                      : category === "databases"
                        ? t.databases
                        : category === "cloud"
                          ? t.cloud
                          : category === "apis"
                            ? t.apis
                            : t.cicd}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(255,98,0,0.1)"
                          : "rgba(255,98,0,0.08)",
                        color: isDark ? "#FF6200" : "#FF6200",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6 bg-background border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold mb-12"
            style={{ fontFamily: "Onest" }}
          >
            {t.industriesTitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-foreground/10 flex items-center justify-center hover:border-primary/30 transition-all duration-300 group"
                style={{
                  backgroundColor: isDark ? "rgba(255,98,0,0.05)" : "rgba(255,98,0,0.03)",
                }}
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span
                    className="font-semibold text-sm"
                    style={{ fontFamily: "Onest" }}
                  >
                    {industry.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-6 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(255, 98, 0, 0.1) 0%, rgba(255, 98, 0, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.95) 100%)",
            border: `1px solid ${isDark ? "rgba(255, 98, 0, 0.2)" : "rgba(255, 98, 0, 0.15)"}`,
          }}>
            <div className="p-12 md:p-16">
              {/* Header */}
              <div className="text-center mb-16">
                <h2
                  className="text-5xl font-bold mb-4"
                  style={{
                    fontFamily: "Onest",
                    color: isDark ? "#FFFFFF" : "#161515",
                  }}
                >
                  {t.whyChooseTitle}
                </h2>
                <p
                  className="text-lg opacity-70 max-w-2xl mx-auto"
                  style={{ fontFamily: "Onest" }}
                >
                  {t.whyChooseDesc}
                </p>
              </div>

              {/* Why Choose Grid - 2 columns + center image on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                  {whyChoosePoints.slice(0, 2).map((point, index) => (
                    <div
                      key={index}
                      data-index={index + 20}
                      className={`group cursor-pointer transition-all duration-300 scroll-animate ${
                        visibleCards.includes(index + 20) ? "visible" : ""
                      }`}
                      onMouseEnter={() => setActiveWhyChoose(index)}
                      onMouseLeave={() => setActiveWhyChoose(null)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-bold group-hover:scale-110 transition-transform duration-300"
                          style={{
                            backgroundColor: isDark ? "rgba(255, 98, 0, 0.2)" : "rgba(255, 98, 0, 0.15)",
                            color: "#FF6200",
                          }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h4
                            className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors"
                            style={{ fontFamily: "Onest" }}
                          >
                            {point.title}
                          </h4>
                          <p
                            className="text-sm opacity-70"
                            style={{ fontFamily: "Onest" }}
                          >
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Center - Decorative element */}
                <div className="hidden lg:flex items-center justify-center">
                  <div
                    className="relative w-72 h-72 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, rgba(255, 98, 0, 0.2), rgba(255, 98, 0, 0.1))"
                        : "linear-gradient(135deg, rgba(255, 98, 0, 0.15), rgba(255, 98, 0, 0.08))",
                      border: `2px solid ${isDark ? "rgba(255, 98, 0, 0.3)" : "rgba(255, 98, 0, 0.2)"}`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-4">✓</div>
                      <p
                        className="text-center font-semibold"
                        style={{ fontFamily: "Onest" }}
                      >
                        Trusted by
                        <br /> Industry Leaders
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {whyChoosePoints.slice(2).map((point, index) => (
                    <div
                      key={index + 2}
                      data-index={index + 22}
                      className={`group cursor-pointer transition-all duration-300 scroll-animate ${
                        visibleCards.includes(index + 22) ? "visible" : ""
                      }`}
                      onMouseEnter={() => setActiveWhyChoose(index + 2)}
                      onMouseLeave={() => setActiveWhyChoose(null)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-bold group-hover:scale-110 transition-transform duration-300"
                          style={{
                            backgroundColor: isDark ? "rgba(255, 98, 0, 0.2)" : "rgba(255, 98, 0, 0.15)",
                            color: "#FF6200",
                          }}
                        >
                          {index + 3}
                        </div>
                        <div>
                          <h4
                            className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors"
                            style={{ fontFamily: "Onest" }}
                          >
                            {point.title}
                          </h4>
                          <p
                            className="text-sm opacity-70"
                            style={{ fontFamily: "Onest" }}
                          >
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-20 px-6 bg-background border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: "Onest" }}
          >
            {t.costTitle}
          </h2>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed opacity-85" style={{ fontFamily: "Onest" }}>
              {t.costDesc}
            </p>

            <p className="text-base leading-relaxed opacity-80" style={{ fontFamily: "Onest" }}>
              {t.focusedApp}
            </p>

            <p className="text-base leading-relaxed opacity-80" style={{ fontFamily: "Onest" }}>
              {t.midComplexity}
            </p>

            <p className="text-base leading-relaxed opacity-80" style={{ fontFamily: "Onest" }}>
              {t.enterprise}
            </p>

            <p className="text-base leading-relaxed opacity-80 italic" style={{ fontFamily: "Onest" }}>
              We scope every project in detail before committing to a number — contact us for a technical estimate based on your specific requirements.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-primary hover:bg-gradient-to-r hover:from-primary hover:to-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ fontFamily: "Onest" }}
            >
              {t.getEstimate}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
