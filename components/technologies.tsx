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
      { name: "AI Integrations", logo: "/images/puzzle.svg", label: "AI Integrations" },
    ],
  },
]

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
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(300px,0.42fr)_minmax(0,0.58fr)] lg:gap-8 xl:gap-12">
          <div className="max-w-[520px] space-y-6 lg:space-y-8">
            <h2 className="text-5xl font-bold leading-none tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
              {t.title}
            </h2>
            <p className="max-w-[500px] text-xl leading-[1.8] text-foreground/75 md:text-2xl md:leading-[1.8]">
              {t.description}
            </p>
          </div>

          <div className="hidden min-w-0 lg:flex lg:justify-end">
            <div className="flex w-full max-w-[550px] flex-col gap-8 xl:max-w-[620px] xl:gap-10">
              {technologyGroups.map((group) => (
                <TechnologyGroupRow key={group.title} group={group} />
              ))}
            </div>
          </div>

          <div className="space-y-8 lg:hidden">
            {technologyGroups.map((group) => (
              <TechnologyGroupRow key={group.title} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TechnologyGroupRow({ group }: { group: TechnologyGroup }) {
  return (
    <div className="flex w-full flex-col">
      <div className={`flex w-full flex-col gap-4 ${groupAlignmentClasses[group.align]} lg:w-auto`}>
        <SectionLabel>{group.title}</SectionLabel>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:w-auto lg:flex-nowrap lg:gap-2.5 xl:gap-3">
          {group.items.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </div>
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
      className="group flex min-h-[60px] min-w-0 items-center gap-3 rounded-2xl border border-[var(--tech-card-border)] bg-[var(--tech-card)] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:[background:linear-gradient(180deg,#FAF9F8_0%,#FF6200_150%)] dark:hover:[background:linear-gradient(180deg,#161515_0%,#FF6200_150%)] sm:min-h-[64px] sm:gap-4 sm:px-4 lg:h-[58px] lg:min-h-[58px] lg:w-[130px] lg:gap-2 lg:px-2.5 xl:h-[64px] xl:min-h-[64px] xl:w-[146px] xl:gap-3 xl:px-3"
    >
      <div className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-lg bg-white p-[5px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:h-[34px] sm:w-[34px] lg:h-5 lg:w-5 lg:rounded-md lg:p-[3px] xl:h-[27px] xl:w-[27px] xl:rounded-lg xl:p-[5px]">
        <Image
          src={tech.logo || "/placeholder.svg"}
          alt={tech.label}
          width={48}
          height={48}
          className="h-full w-full object-contain"
        />
      </div>
      <span className="min-w-0 break-words text-sm font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-white sm:text-base lg:text-xs xl:text-sm">
        {tech.label}
      </span>
    </div>
  )
}
