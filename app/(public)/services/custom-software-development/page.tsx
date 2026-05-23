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
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
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
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Onest" }}
          >
            {t.processTitle}
          </h2>
          <p className="text-base opacity-70 mb-12" style={{ fontFamily: "Onest" }}>
            Our proven methodology ensures predictable delivery and continuous value
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                data-index={index}
                className={`p-6 rounded-xl border border-foreground/10 scroll-animate ${
                  visibleCards.includes(index + 10) ? "visible" : ""
                }`}
                style={{
                  backgroundColor: isDark ? "rgba(255,98,0,0.08)" : "rgba(255,98,0,0.05)",
                }}
              >
                <div
                  className="text-3xl font-bold text-primary mb-3"
                  style={{ fontFamily: "Onest" }}
                >
                  {step.number}
                </div>
                <h4
                  className="font-semibold mb-2"
                  style={{ fontFamily: "Onest" }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-xs opacity-60"
                  style={{ fontFamily: "Onest" }}
                >
                  {step.description}
                </p>
              </div>
            ))}
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
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Onest" }}
          >
            {t.whyChooseTitle}
          </h2>
          <p className="text-base opacity-70 mb-12" style={{ fontFamily: "Onest" }}>
            {t.whyChooseDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChoosePoints.map((point, index) => (
              <div
                key={index}
                data-index={index + 20}
                className={`p-8 rounded-xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 scroll-animate ${
                  visibleCards.includes(index + 20) ? "visible" : ""
                }`}
                style={{
                  backgroundColor: isDark ? "rgba(255,98,0,0.05)" : "rgba(255,98,0,0.03)",
                }}
              >
                <h4
                  className="text-xl font-semibold mb-2 text-primary"
                  style={{ fontFamily: "Onest" }}
                >
                  {point.title}
                </h4>
                <p className="text-sm opacity-70" style={{ fontFamily: "Onest" }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-20 px-6 bg-background border-t border-foreground/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Onest" }}
          >
            {t.costTitle}
          </h2>
          <p className="text-base opacity-70 mb-8" style={{ fontFamily: "Onest" }}>
            {t.costDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-8 rounded-xl border border-primary/30"
              style={{
                backgroundColor: isDark ? "rgba(255,98,0,0.1)" : "rgba(255,98,0,0.08)",
              }}
            >
              <p className="text-sm font-semibold text-primary mb-2" style={{ fontFamily: "Onest" }}>
                Focused Applications
              </p>
              <p className="text-lg font-bold" style={{ fontFamily: "Onest" }}>
                $15K - $30K
              </p>
              <p className="text-xs opacity-60 mt-2" style={{ fontFamily: "Onest" }}>
                {t.focusedApp}
              </p>
            </div>

            <div
              className="p-8 rounded-xl border border-primary/30"
              style={{
                backgroundColor: isDark ? "rgba(255,98,0,0.1)" : "rgba(255,98,0,0.08)",
              }}
            >
              <p className="text-sm font-semibold text-primary mb-2" style={{ fontFamily: "Onest" }}>
                Mid-Complexity Systems
              </p>
              <p className="text-lg font-bold" style={{ fontFamily: "Onest" }}>
                $40K - $120K
              </p>
              <p className="text-xs opacity-60 mt-2" style={{ fontFamily: "Onest" }}>
                {t.midComplexity}
              </p>
            </div>

            <div
              className="p-8 rounded-xl border border-primary/30"
              style={{
                backgroundColor: isDark ? "rgba(255,98,0,0.1)" : "rgba(255,98,0,0.08)",
              }}
            >
              <p className="text-sm font-semibold text-primary mb-2" style={{ fontFamily: "Onest" }}>
                Enterprise Solutions
              </p>
              <p className="text-lg font-bold" style={{ fontFamily: "Onest" }}>
                $120K+
              </p>
              <p className="text-xs opacity-60 mt-2" style={{ fontFamily: "Onest" }}>
                {t.enterprise}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-primary hover:bg-gradient-to-r hover:from-primary hover:to-black transition-all duration-300"
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
