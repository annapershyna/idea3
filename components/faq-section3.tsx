"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/locale-context"
import { cn } from "@/lib/utils"

interface FAQItem {
  id: number
  questionEn: string
  questionUk: string
  answerEn: string
  answerUk: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    questionEn: "What is custom software development?",
    questionUk: "Що таке розробка кастомного програмного забезпечення?",
    answerEn:
      "Custom software development is the process of designing, engineering, and deploying software built specifically for one organization's workflows, data model, and technical requirements — as opposed to configuring an off-the-shelf product.",
    answerUk:
      "Розробка кастомного програмного забезпечення — це процес проектування, створення та розгортання систем, побудованих спеціально під бізнес-процеси, модель даних і технічні вимоги конкретної організації, на відміну від налаштування готових продуктів.",
  },
  {
    id: 2,
    questionEn: "How much does custom software development cost?",
    questionUk: "Скільки коштує розробка кастомного програмного забезпечення?",
    answerEn:
      "Cost depends on scope and complexity. Focused applications start around $15,000–$30,000. Full SaaS platforms and enterprise systems range from $40,000 to $150,000+. We provide detailed estimates after a scoping session.",
    answerUk:
      "Вартість залежить від обсягу та складності. Сфокусовані додатки стартують від $15,000–$30,000. Повноцінні SaaS-платформи та корпоративні системи — від $40,000 до $150,000+. Ми надаємо детальну оцінку після сесії визначення обсягу.",
  },
  {
    id: 3,
    questionEn: "How long does software development take?",
    questionUk: "Скільки часу займає розробка програмного забезпечення?",
    answerEn:
      "A focused application or internal tool takes 6–12 weeks. A full SaaS platform or enterprise system typically requires 4–9 months, depending on integrations and compliance requirements.",
    answerUk:
      "Сфокусований додаток або внутрішній інструмент зазвичай займає 6–12 тижнів. Повноцінна SaaS-платформа або корпоративна система — 4–9 місяців, залежно від інтеграцій і вимог до відповідності стандартам.",
  },
  {
    id: 4,
    questionEn: "What technologies are best for scalable applications?",
    questionUk: "Які технології найкраще підходять для масштабованих додатків?",
    answerEn:
      "For most web applications and SaaS platforms: React or Next.js on the frontend, Node.js or Python on the backend, PostgreSQL for structured data, Redis for caching, and containerized deployment on AWS or GCP with Kubernetes for orchestration.",
    answerUk:
      "Для більшості веб-додатків і SaaS-платформ: React або Next.js на фронтенді, Node.js або Python на бекенді, PostgreSQL для структурованих даних, Redis для кешування та контейнеризоване розгортання на AWS або Google Cloud з оркестрацією через Kubernetes.",
  },
  {
    id: 5,
    questionEn: "When should a business choose custom software?",
    questionUk: "Коли бізнесу варто обрати кастомну розробку?",
    answerEn:
      "When off-the-shelf tools require workarounds that slow operations, when licensing costs exceed the value delivered, when you need integrations that existing platforms don't support, or when your product's competitive differentiation depends on proprietary functionality.",
    answerUk:
      "Коли готові інструменти вимагають обхідних рішень, що уповільнюють роботу; коли витрати на ліцензії перевищують цінність; коли потрібні інтеграції, яких не підтримують існуючі платформи; або коли конкурентна перевага залежить від унікального функціоналу.",
  },
  {
    id: 6,
    questionEn: "What is the difference between SaaS and custom software?",
    questionUk: "У чому різниця між SaaS і кастомним програмним забезпеченням?",
    answerEn:
      "SaaS is a subscription-based product built for a broad market. Custom software is engineered for a single organization's specific requirements. You own the codebase, control the roadmap, and pay no per-seat licensing fees.",
    answerUk:
      "SaaS — це підписний продукт для широкого ринку. Кастомне програмне забезпечення створюється під конкретні потреби організації. Ви володієте кодовою базою, контролюєте розвиток продукту і не сплачуєте ліцензії за користувачів.",
  },
]

export function FAQSection3() {
  const { locale } = useLocale()
  const [expandedId, setExpandedId] = useState<number | null>()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkDarkMode = () => {
      const htmlElement = document.documentElement
      setIsDark(htmlElement.classList.contains("dark"))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const textColor = isDark ? "#FFFFFF" : "#212121"
  const mutedText = isDark ? "#EBEBEB" : "#666666"
  const borderColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"

  const title = locale === "uk" ? "Часті Питання" : "Frequently Asked Questions"

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="max-w-[1127px] mx-auto px-4">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-24"
          style={{ color: textColor }}
        >
          {title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item) => {
            const isExpanded = expandedId === item.id
            const question = locale === "uk" ? item.questionUk : item.questionEn
            const answer = locale === "uk" ? item.answerUk : item.answerEn

            return (
              <div
                key={item.id}
                className="rounded-[14px] overflow-hidden transition-all duration-300"
                style={{
                  border: `1px solid ${borderColor}`,
                  background: isExpanded
                    ? isDark
                      ? "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.06) 100%), #323130"
                      : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.06) 100%), #FFFFFF"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.06) 100%)",
                }}
              >
                {/* Question Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full px-5 md:px-8 py-4 flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
                >
                  <h3 className="text-[24px] font-[Onest] font-medium text-left" style={{ color: mutedText }}>
                    {question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn("transition-transform duration-300", {
                        "rotate-180": isExpanded,
                      })}
                    >
                      <g transform="translate(1.67, 2.17)">
                        <path
                          d="M6.19757 9C5.81267 9.66667 4.85042 9.66667 4.46552 9L0.135391 1.5C-0.249509 0.833332 0.231617 -1.05781e-06 1.00142 -9.90511e-07L9.66167 -2.33408e-07C10.4315 -1.6611e-07 10.9126 0.833333 10.5277 1.5L6.19757 9Z"
                          fill={isExpanded ? "#C0C0C0" : "#FF6200"}
                        />
                      </g>
                    </svg>
                  </div>
                </button>

                {/* Answer Row */}
                {isExpanded && (
                  <div className="px-5 md:px-8 pb-6 pt-0">
                    <p
                      className="text-base md:text-lg font-[Onest]"
                      style={{ color: isDark ? "rgba(255, 255, 255, 0.5)" : "#666666" }}
                    >
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
