"use client"

import Image from "next/image"
import { useLocale } from "@/lib/locale-context"

type Technology = {
  name: string
  logo: string
  label: string
}

type TechnologyGroup = {
  title: string
  align: "start" | "center" | "end"
  items: Technology[]
}

const technologyGroups: TechnologyGroup[] = [
  {
    title: "Mobile",
    align: "end",
    items: [
      { name: "Flutter", logo: "/images/flutter.svg", label: "Flutter" },
      { name: "React Native", logo: "/images/react.svg", label: "React Native" },
    ],
  },
  {
    title: "Backend",
    align: "center",
    items: [
      { name: "Node.js", logo: "/images/node.svg", label: "Node.js" },
      { name: "Nest.js", logo: "/images/nest.svg", label: "Nest.js" },
      { name: "Python", logo: "/images/python.svg", label: "Python" },
    ],
  },
  {
    title: "Cloud & DevOps",
    align: "start",
    items: [
      { name: "AWS", logo: "/images/aws.svg", label: "AWS" },
      { name: "GCP", logo: "/images/gcp.svg", label: "GCP" },
      { name: "Docker", logo: "/images/docker.svg", label: "Docker" },
      { name: "Kubernetes", logo: "/images/kubernetes.svg", label: "Kubernetes" },
    ],
  },
  {
    title: "Frontend",
    align: "center",
    items: [
      { name: "React", logo: "/images/react.svg", label: "React" },
      { name: "Vue.js", logo: "/images/vue.svg", label: "Vue.js" },
      { name: "Next.js", logo: "/images/next.svg", label: "Next.js" },
    ],
  },
  {
    title: "AI & Automation",
    align: "end",
    items: [
      { name: "OpenAI", logo: "/images/openai.svg", label: "OpenAI" },
      { name: "LangChain", logo: "/images/langchain.svg", label: "LangChain" },
    ],
  },
]

const allTechnologies = technologyGroups.flatMap((group) => group.items)

const groupAlignmentClasses: Record<TechnologyGroup["align"], string> = {
  start: "lg:self-start",
  center: "lg:self-center",
  end: "lg:self-end",
}

export function TechnologiesSection() {
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Technologies",
      description:
        "Our technological proficiency gives us the opportunity to create strategic solutions that are both robust and scalable across all products.",
    },
    uk: {
      title: "Технології",
      description:
        "Наша технологічна компетентність дає нам можливість створювати стратегічні рішення, які є як надійними, так і масштабованими на всі продукти.",
    },
  }

  const t = content[locale as "en" | "uk"] || content.en

  return (
    <section className="overflow-hidden bg-background px-4 py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-24">
          <div className="max-w-[520px] space-y-6 lg:space-y-8">
            <h2 className="text-5xl font-bold leading-none tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
              {t.title}
            </h2>
            <p className="max-w-[500px] text-xl leading-[1.8] text-foreground/75 md:text-2xl md:leading-[1.8]">
              {t.description}
            </p>
          </div>

          <div className="hidden min-w-0 flex-col gap-8 lg:flex xl:gap-10">
            {technologyGroups.map((group) => (
              <TechnologyGroupRow key={group.title} group={group} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
            {allTechnologies.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TechnologyGroupRow({ group }: { group: TechnologyGroup }) {
  return (
    <div className={`flex w-fit flex-col gap-4 ${groupAlignmentClasses[group.align]}`}>
      <SectionLabel>{group.title}</SectionLabel>
      <div className="flex flex-wrap gap-5 xl:gap-6">
        {group.items.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 pl-1 text-sm font-semibold uppercase tracking-[0.02em] text-foreground/55">
      <span className="h-px w-8 bg-foreground/35" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function TechCard({ tech }: { tech: Technology }) {
  return (
    <div
      className="group flex min-h-[86px] items-center gap-4 rounded-2xl border border-[var(--tech-card-border)] bg-[var(--tech-card)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:[background:linear-gradient(180deg,#FAF9F8_0%,#FF6200_150%)] dark:hover:[background:linear-gradient(180deg,#161515_0%,#FF6200_150%)] sm:gap-5 sm:px-5 lg:h-[88px] lg:w-[200px] xl:w-[220px]"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <Image
          src={tech.logo || "/placeholder.svg"}
          alt={tech.label}
          width={52}
          height={52}
          className="h-full w-full object-contain"
        />
      </div>
      <span className="text-base font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-white sm:text-lg">
        {tech.label}
      </span>
    </div>
  )
}
