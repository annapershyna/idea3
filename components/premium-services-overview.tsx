"use client"

import { Activity, BarChart3, Code2, Compass, Smartphone, TestTube2 } from "lucide-react"

const cards = [
  { title: "Web Development", description: "Scalable web platforms and internal tools built for performance, security, and long-term maintainability.", icon: Code2, href: "/services/custom-web-solutions" },
  { title: "Mobile Apps", description: "Native-like mobile experiences for iOS and Android with stable release workflows and product-grade UX.", icon: Smartphone, href: "/services#mobile-applications" },
  { title: "UI/UX Design", description: "Clean, conversion-driven product interfaces with reusable design systems and measurable usability outcomes.", icon: Compass, href: "/services#ux-ui-design" },
  { title: "QA & Testing", description: "Automated and manual quality pipelines that reduce regressions and keep releases predictable.", icon: TestTube2, href: "/services#qa" },
  { title: "Digital Analytics", description: "Data instrumentation and KPI-focused analytics pipelines to support faster product decisions.", icon: BarChart3, href: "/services#data-analytics" },
  { title: "IT Consulting", description: "Architecture and delivery guidance for teams scaling from MVP to enterprise-grade systems.", icon: Activity, href: "/contact" },
]

export function PremiumServicesOverview() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-20 lg:py-24 transition-colors duration-300 bg-[radial-gradient(circle_at_top_right,rgba(255,140,0,.08),transparent_30%),#F7F8FA] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,120,0,.15),transparent_35%),#07070A]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:3px_3px] dark:opacity-[0.06]" />
      <div className="relative mx-auto max-w-6xl">
        <span className="inline-flex rounded-full border border-foreground/15 bg-background/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70 backdrop-blur">
          Custom Software Development for Growing Businesses
        </span>

        <p className="mt-6 max-w-4xl text-[18px] leading-[1.7] text-[#4B5563] dark:text-white/72">
          Off-the-shelf platforms set the ceiling for what your product can do. Custom software development removes it. We design and engineer scalable software solutions built around your architecture requirements, data model, and growth trajectory.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <a
                key={card.title}
                href={card.href}
                className="group rounded-3xl border border-black/10 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,.08)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FF6200]/60 hover:shadow-[0_16px_50px_rgba(255,98,0,.18)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_14px_44px_rgba(0,0,0,.35)] dark:hover:border-[#FF6200]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6200] motion-reduce:transition-none"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF6200]/35 bg-[#FF6200]/12 text-[#FF6200] shadow-[0_0_0_0_rgba(255,98,0,0)] transition-all duration-300 group-hover:bg-[#FF6200]/18 group-hover:shadow-[0_0_26px_0_rgba(255,98,0,.35)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold text-[#111827] dark:text-[#F5F7FA]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563] dark:text-white/70">{card.description}</p>
              </a>
            )
          })}
        </div>

        <p className="mt-10 max-w-5xl text-[18px] leading-[1.7] text-[#4B5563] dark:text-white/72">
          Every codebase is CI/CD-ready, fully documented, and designed to support growth from hundreds to hundreds of thousands of users without structural rewrites. Our software engineering services cover the full cycle: from requirements analysis and system design to deployment and post-launch iteration.
        </p>
      </div>
    </section>
  )
}
