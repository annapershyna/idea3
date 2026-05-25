"use client"

import { useState } from "react"
import Image from "next/image"
import { TechnologiesSection } from "@/components/technologies"
import { FAQSection } from "@/components/faq-section"
import { RequestConsultationSection } from "@/components/request-consultation-section"

const serviceDetails = [
  {
    title: "Web Applications",
    description:
      "Full-stack web application development - SPAs, B2B portals, internal tools, and real-time dashboards. Built with clean frontend/backend separation, optimized data layers, and cloud-native deployment on AWS or GCP.",
    image: "/developers-collaborating-on-project.jpg",
  },
  {
    title: "SaaS Platforms",
    description:
      "SaaS development from architecture design through multi-tenant infrastructure setup, subscription billing integration, and scalability planning. Systems built to onboard thousands of customers without performance degradation.",
    image: "/project-management-team.png",
  },
  {
    title: "Enterprise Software",
    description:
      "Enterprise software development for complex organizational workflows: approval chains, role-based access control, audit logging, ERP integrations, and compliance-ready data architecture.",
    image: "/business-partnership-meeting.png",
  },
  {
    title: "CRM/ERP Systems",
    description:
      "Custom CRM and ERP development tailored to your sales, operations, or supply chain processes — or deep integrations into Salesforce, SAP, or HubSpot when a hybrid approach is the right call.",
    image: "/business-meeting-handshake-partnership.jpg",
  },
  {
    title: "API Integrations",
    description:
      "API integration services connecting internal systems, third-party platforms, and data pipelines. RESTful and GraphQL API design, webhook infrastructure, and integration testing across environments.",
    image: "/developers-collaborating.jpg",
  },
]

const expertiseBullets = [
  "Web development",
  "Mobile app development",
  "UI/UX design",
  "QA & testing",
  "Digital analytics",
  "IT consulting",
]

const process = [
  ["Discovery & architecture", "Requirements analysis, system design, tech stack selection, project roadmap"],
  ["Sprint-based development", "Two-week cycles with demo-ready deliverables and stakeholder reviews"],
  ["QA & testing", "Automated unit, integration, and e2e testing integrated into CI/CD pipeline"],
  ["Deployment", "Containerized release to staging and production with rollback capability"],
  ["Post-launch iteration", "Ongoing feature development, performance monitoring, and technical support"],
]

export default function CustomSoftwareDevelopmentPage() {
  const [activeService, setActiveService] = useState(0)

  return (
    <main className="min-h-screen bg-[#f5f6fa] text-[#111] dark:bg-[#101114] dark:text-white">
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <Image src="/alert-management-interface.jpg" alt="Custom software development services" fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/25" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">Custom Software Development Services</h1>
          <p className="max-w-3xl mx-auto text-white/80">Custom software development for growing businesses.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl md:text-4xl font-semibold mb-5">Custom Software Development for Growing Businesses</h2>
        <p className="text-[#3a3a3a] dark:text-white/75 mb-6">
          Off-the-shelf platforms set the ceiling for what your product can do. Custom software development removes it.
          We design and engineer scalable software solutions built around your architecture requirements, data model, and growth trajectory.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
          {expertiseBullets.map((item) => (
            <div key={item} className="flex items-center gap-2 text-[#262626] dark:text-white/90">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF6200]" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#2b2d34] text-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid xl:grid-cols-[420px_1fr] gap-10">
          <div>
            <h2 className="text-4xl font-semibold mb-8">Software Development Services We Provide</h2>
            <div className="border-t border-white/10">
              {serviceDetails.map((service, index) => {
                const isActive = index === activeService
                return (
                  <button
                    key={service.title}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left py-4 border-b transition-colors ${isActive ? "text-[#FF6200] border-[#FF6200]" : "text-white/80 border-white/15 hover:text-[#FF6200]"}`}
                  >
                    {service.title}
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <article className="rounded-2xl overflow-hidden border border-white/10 bg-[#1b1d23]">
              <div className="relative h-60 md:h-72">
                <Image src={serviceDetails[activeService].image} alt={serviceDetails[activeService].title} fill className="object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-4xl font-semibold mb-3">{serviceDetails[activeService].title}</h3>
                <p className="text-white/70 text-xl leading-relaxed">{serviceDetails[activeService].description}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <TechnologiesSection />


      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-4xl md:text-6xl text-center font-semibold mb-10">Industries We Work With</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["FinTech", "/samsung-product-showcase.jpg", "Payment infrastructure, lending platforms, financial reporting systems"],
            ["HealthTech", "/business-partnership-meeting.png", "HIPAA-compliant patient management, clinical workflow automation, telehealth platforms"],
            ["EdTech", "/lenovo-landing-page-design.jpg", "LMS platforms, adaptive learning systems, certification infrastructure"],
            ["Logistics", "/project-management-team.png", "Route optimization, warehouse management, real-time tracking systems"],
            ["Retail & eCommerce", "/ecommerce-landing-page-design-multiple-brands.jpg", "Custom storefronts, inventory management, B2B ordering portals"],
            ["SaaS startups", "/business-meeting-handshake-partnership.jpg", "Product development from MVP through scaled multi-tenant architecture"],
          ].map(([name, image, description]) => (
            <article key={name} className="rounded-2xl overflow-hidden bg-[#191a20] border border-white/10">
              <div className="relative h-48">
                <Image src={image as string} alt={name as string} fill className="object-cover" />
                <span className="absolute left-3 top-3 rounded-lg bg-[#FF6200] px-3 py-1 text-sm">{name}</span>
              </div>
              <p className="p-4 text-white text-sm">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-2xl bg-[#1f2026] border border-white/10 p-8 md:p-10 grid lg:grid-cols-[420px_1fr] gap-8 items-center">
          <Image src="/placeholder.jpg" alt="Team" width={420} height={460} className="rounded-xl w-full h-auto object-cover" />
          <div>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">Why Choose Idea Team</h2>
            <p className="text-white/75 mb-6 text-lg">Idea Team is a custom software development company that treats engineering quality and product thinking as inseparable.</p>
            <div className="grid sm:grid-cols-2 gap-5 text-lg">
              <div><h3 className="font-semibold">Full-stack teams</h3><p className="text-white/70">Developers, QA, and a PM on every engagement, not lone contractors</p></div>
              <div><h3 className="font-semibold">Transparent process</h3><p className="text-white/70">Sprint demos, async updates, and direct access to your engineering team</p></div>
              <div><h3 className="font-semibold">Owned codebase</h3><p className="text-white/70">You get full IP rights, documentation, and repository access from day one</p></div>
              <div><h3 className="font-semibold">Architecture-first approach</h3><p className="text-white/70">Systems designed to scale before the first line of code is written</p></div>
              <div><h3 className="font-semibold">No scope creep</h3><p className="text-white/70">Fixed-scope or time-and-materials engagements scoped honestly upfront</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl text-center font-semibold mb-10">Our Development Process</h2>
        <div className="rounded-2xl bg-[#1f2026] p-6 md:p-10 grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          {process.map(([title, text]) => (
            <div key={title}>
              <h3 className="text-[#FF6200] text-3xl font-semibold mb-2">{title}</h3>
              <p className="text-white/80 text-2xl leading-tight">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <RequestConsultationSection />
      <FAQSection />
    </main>
  )
}
