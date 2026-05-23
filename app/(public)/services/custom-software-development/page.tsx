"use client"

import Link from "next/link"
import { AnimatedSection } from "@/components/AnimatedSection"
import { TechnologiesSection } from "@/components/technologies"
import { useLocale } from "@/lib/locale-context"

export default function CustomSoftwareDevelopmentPage() {
  const { locale } = useLocale()
  const isUk = locale === "uk"

  const h1 = isUk ? "Послуги кастомної розробки ПЗ" : "Custom Software Development Services"
  const h2 = isUk ? "Кастомна розробка ПЗ для бізнесів, що зростають" : "Custom Software Development for Growing Businesses"

  const problems = [
    "Eliminate recurring SaaS licensing costs with owned, scalable software architecture.",
    "Integrate systems that generic platforms can't connect via custom API integration services.",
    "Automate business-specific workflows that no off-the-shelf tool covers.",
    "Build competitive features faster without waiting on a vendor's product roadmap.",
    "Maintain full data control and security compliance across your stack.",
  ]

  const process = [
    ["Discovery & architecture", "Requirements analysis, system design, tech stack selection, project roadmap."],
    ["Sprint-based development", "Two-week cycles with demo-ready deliverables and stakeholder reviews."],
    ["QA & testing", "Automated unit, integration, and e2e testing integrated into CI/CD pipeline."],
    ["Deployment", "Containerized release to staging and production with rollback capability."],
    ["Post-launch iteration", "Ongoing feature development, performance monitoring, and technical support."],
  ]

  const why = [
    ["Full-stack teams", "Developers, QA, and a PM on every engagement, not lone contractors."],
    ["Architecture-first approach", "Systems designed to scale before the first line of code is written."],
    ["Transparent process", "Sprint demos, async updates, and direct access to your engineering team."],
    ["Owned codebase", "Full IP rights, documentation, and repository access from day one."],
  ]

  const industries = ["FinTech", "HealthTech", "EdTech", "Logistics", "Retail & eCommerce", "SaaS startups"]

  const faq = [
    ["What is custom software development?", "Custom software development is the process of designing, engineering, and deploying software built specifically for one organization's workflows, data model, and technical requirements."],
    ["How much does custom software development cost?", "Focused applications start around $15,000–$30,000. Full SaaS platforms and enterprise systems range from $40,000 to $150,000+."],
    ["How long does software development take?", "A focused application or internal tool takes 6–12 weeks. A full SaaS platform or enterprise system typically requires 4–9 months."],
    ["What technologies are best for scalable applications?", "React or Next.js, Node.js or Python, PostgreSQL, Redis, AWS or GCP, and Kubernetes are a common scalable baseline."],
    ["When should a business choose custom software?", "When off-the-shelf tools require workarounds, block integrations, or limit your ability to build competitive features."],
    ["What is the difference between SaaS and custom software?", "SaaS is built for a broad market. Custom software is engineered for one organization and fully owned by that business."],
  ]

  return (
    <main className="min-h-screen bg-background text-foreground" data-locale={isUk ? "uk" : "en"}>
      <section className="pt-36 pb-10 px-6">
        <AnimatedSection className="max-w-[1280px] mx-auto rounded-[32px] border border-border/60 bg-gradient-to-br from-card/80 via-background to-card/40 p-8 md:p-12 lg:p-16 shadow-[0_24px_70px_rgba(0,0,0,0.15)]">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#FF6200] to-foreground bg-clip-text text-transparent">{h1}</h1>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-full bg-[#FF6200] px-6 py-3 text-white font-medium">{isUk ? "Отримати технічну оцінку" : "Get a technical estimate"}</Link>
            <Link href="/projects" className="inline-flex rounded-full border border-border px-6 py-3 font-medium hover:border-[#FF6200]">{isUk ? "Дивитися кейси" : "See it in practice"}</Link>
          </div>
        </AnimatedSection>
      </section>

      <section className="pb-14 px-6">
        <AnimatedSection className="max-w-[1280px] mx-auto space-y-5">
          <h2 className="text-3xl md:text-5xl font-semibold">{h2}</h2>
          <p className="text-lg text-muted-foreground leading-8">Off-the-shelf platforms set the ceiling for what your product can do. Custom software development removes it. We design and engineer scalable software solutions built around your architecture requirements, data model, and growth trajectory.</p>
        </AnimatedSection>
      </section>

      <section className="pb-16 px-6"><div className="max-w-[1280px] mx-auto"><AnimatedSection><h2 className="text-3xl md:text-4xl font-semibold mb-7">{isUk ? "Які проблеми вирішує кастомна розробка від IdeaTeam" : "What Problems Custom Software from IdeaTeam Solves"}</h2></AnimatedSection><div className="grid md:grid-cols-2 gap-5">{problems.map((item, i) => <AnimatedSection key={item} delay={i * 70} className="rounded-2xl border border-border bg-card/40 p-6"><p>{item}</p></AnimatedSection>)}</div></div></section>
      <section className="pb-16 px-6"><div className="max-w-[1280px] mx-auto"><AnimatedSection><h2 className="text-3xl md:text-4xl font-semibold mb-8">{isUk ? "Наш процес розробки" : "Our Development Process"}</h2></AnimatedSection><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{process.map(([t, d], i) => <AnimatedSection key={t} delay={i * 80} className="rounded-2xl border border-border/80 bg-background/70 p-6"><h3 className="font-semibold text-xl mb-3">{t}</h3><p className="text-muted-foreground">{d}</p></AnimatedSection>)}</div></div></section>
      <section className="pb-16 px-6"><div className="max-w-[1280px] mx-auto rounded-[28px] border border-border/80 bg-gradient-to-br from-emerald-900/20 via-cyan-900/10 to-background p-8 md:p-12"><AnimatedSection><h2 className="text-3xl md:text-4xl font-semibold mb-8">{isUk ? "Чому Idea Team" : "Why Choose Idea Team"}</h2></AnimatedSection><div className="grid md:grid-cols-2 gap-6">{why.map(([t, d], i) => <AnimatedSection key={t} delay={i * 80} className="rounded-2xl border border-white/10 bg-background/60 p-6"><h3 className="text-xl font-semibold mb-2">{t}</h3><p className="text-muted-foreground">{d}</p></AnimatedSection>)}</div></div></section>
      <section className="pb-16 px-6"><div className="max-w-[1280px] mx-auto"><AnimatedSection><h2 className="text-3xl md:text-4xl font-semibold mb-8">{isUk ? "Індустрії, з якими ми працюємо" : "Industries We Work With"}</h2></AnimatedSection><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{industries.map((item, i) => <AnimatedSection key={item} delay={i * 70} className="rounded-xl border border-border bg-card/50 px-5 py-4 font-medium">{item}</AnimatedSection>)}</div></div></section>

      <TechnologiesSection />

      <section className="px-6 pb-16"><AnimatedSection className="max-w-[1280px] mx-auto rounded-3xl border border-border bg-gradient-to-r from-[#FF6200]/10 via-card/60 to-background p-8 md:p-12"><p className="text-lg text-muted-foreground leading-8">Tell us what you're building. We'll scope it, estimate it, and tell you exactly what it takes to ship it right.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/contact" className="inline-flex rounded-full bg-[#FF6200] px-6 py-3 text-white font-medium">{isUk ? "Отримати технічну оцінку" : "Get a technical estimate"}</Link><Link href="/projects" className="inline-flex rounded-full border border-border px-6 py-3 font-medium hover:border-[#FF6200]">{isUk ? "Дивитися кейси" : "See it in practice"}</Link></div></AnimatedSection></section>
      <section className="px-6 pb-24"><div className="max-w-[1280px] mx-auto"><AnimatedSection><h2 className="text-3xl md:text-4xl font-semibold mb-8">{isUk ? "FAQ" : "FAQ"}</h2></AnimatedSection><div className="space-y-4">{faq.map(([q, a], i) => <AnimatedSection key={q} delay={i * 70} className="rounded-2xl border border-border bg-card/40 p-6"><h3 className="font-semibold text-lg mb-2">{q}</h3><p className="text-muted-foreground">{a}</p></AnimatedSection>)}</div></div></section>
    </main>
  )
}
