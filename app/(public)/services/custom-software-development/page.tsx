import Image from "next/image"
import { TechnologiesSection } from "@/components/technologies"
import { FAQSection } from "@/components/faq-section"

const serviceTabs = ["Web Applications", "SaaS Platforms", "Enterprise Software", "CRM/ERP Systems", "API Integrations"]

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

const problems = [
  "Eliminate recurring SaaS licensing costs with owned, scalable software architecture",
  "Integrate systems that generic platforms can't connect via custom API integration services",
  "Automate business-specific workflows that no off-the-shelf tool covers",
  "Build competitive features faster without waiting on a vendor's product roadmap",
  "Maintain full data control and security compliance across your stack",
]

const industries = [
  "FinTech - payment infrastructure, lending platforms, financial reporting systems",
  "HealthTech - HIPAA-compliant patient management, clinical workflow automation, telehealth platforms",
  "EdTech - LMS platforms, adaptive learning systems, certification infrastructure",
  "Logistics - route optimization, warehouse management, real-time tracking systems",
  "Retail & eCommerce - custom storefronts, inventory management, B2B ordering portals",
  "SaaS startups - product development from MVP through scaled multi-tenant architecture",
]

const process = [
  "Discovery & architecture - requirements analysis, system design, tech stack selection, project roadmap",
  "Sprint-based development - two-week cycles with demo-ready deliverables and stakeholder reviews",
  "QA & testing - automated unit, integration, and e2e testing integrated into CI/CD pipeline",
  "Deployment - containerized release to staging and production with rollback capability",
  "Post-launch iteration - ongoing feature development, performance monitoring, and technical support",
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#121212] dark:bg-[#101114] dark:text-white">
      <section className="relative pt-36 pb-24 px-4">
        <div className="absolute inset-0">
          <Image src="/alert-management-interface.jpg" alt="Custom software development" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1Acc] to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">Custom Software Development Services</h1>
          <p className="text-[#3a3a3a] dark:text-white/80 max-w-2xl mx-auto">
            Product-level software engineering built around your architecture, workflows, and growth trajectory.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-semibold mb-4">Custom Software Development for Growing Businesses</h2>
        <p className="text-[#3a3a3a] dark:text-[#3a3a3a] dark:text-white/80 leading-relaxed mb-6">
          Off-the-shelf platforms set the ceiling for what your product can do. Custom software development removes it. We
          design and engineer scalable software solutions — web applications, SaaS platforms, enterprise software, CRM and
          ERP systems, and API integrations — built around your architecture requirements, data model, and growth
          trajectory.
        </p>
        <ul className="space-y-3">
          {problems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[#202020] dark:text-white/90">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#FF6200] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#e9ebf2] dark:bg-white/10">
        <div className="max-w-6xl mx-auto px-4 py-14 grid lg:grid-cols-[320px_1fr] gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Software Development Services We Provide</h2>
            <div className="space-y-3">
              {serviceTabs.map((tab, idx) => (
                <div key={tab} className={`border-b pb-3 ${idx === 0 ? "text-[#FF6200] border-[#FF6200]" : "text-[#6b7280] dark:text-white/70 border-black/20 dark:border-white/20"}`}>
                  {tab}
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {serviceDetails.map((service) => (
              <article key={service.title} className="bg-white dark:bg-black/30 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                <div className="relative h-44">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-sm text-white/75">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-semibold mb-4">Our Development Process</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {process.map((step, index) => (
            <div key={step} className="rounded-xl border border-[#FF6200]/40 bg-white dark:bg-[#1b1b1f] p-4 text-sm text-[#2f2f2f] dark:text-white/85">
              <div className="text-[#FF6200] font-semibold mb-2">0{index + 1}</div>
              {step}
            </div>
          ))}
        </div>
      </section>

      <TechnologiesSection />

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-semibold mb-6 text-center">Industries We Work With</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => (
            <div key={industry} className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#17181b] text-[#2f2f2f] dark:text-white/85 text-sm">
              {industry}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-2xl bg-white dark:bg-[#1a1b20] border border-black/10 dark:border-white/10 p-6 md:p-10 grid lg:grid-cols-2 gap-8 items-center">
          <Image src="/placeholder.jpg" alt="Idea Team" width={520} height={360} className="rounded-xl w-full h-auto object-cover" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Why Choose Idea Team</h2>
            <p className="text-[#3a3a3a] dark:text-[#3a3a3a] dark:text-white/80 mb-6">
              We don't hand off code and disappear — we stay accountable through deployment, QA, and the first iterations
              after launch.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#202020] dark:text-white/90">
              <li>Full-stack teams with PM, developers, and QA</li>
              <li>Architecture-first approach to scalability</li>
              <li>Transparent sprint demos and async updates</li>
              <li>Owned codebase with full IP rights</li>
              <li>No scope creep with honest engagement scoping</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-3xl font-semibold mb-4">Cost of Custom Software Development</h2>
        <p className="text-[#3a3a3a] dark:text-[#3a3a3a] dark:text-white/80 leading-relaxed">
          Custom software development cost depends on system complexity, team composition, and engagement duration. A
          focused web application or internal tool starts at $15,000–$30,000. Mid-complexity SaaS platforms and CRM/ERP
          systems typically range from $40,000–$120,000. Enterprise software development with complex integrations and
          compliance requirements scales from $120,000 upward.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-[#ff6200] to-[#ff8a3d] text-black p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-3">Tell us what you're building.</h2>
          <p className="mb-6">We'll scope it, estimate it, and tell you exactly what it takes to ship it right.</p>
          <button className="bg-black text-white px-6 py-3 rounded-full">Get a technical estimate</button>
        </div>
      </section>

      <FAQSection />
    </main>
  )
}
