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
    questionEn: "What is an MVP?",
    questionUk: "Що таке MVP?",
    answerEn:
      "A minimum viable product is the smallest version of a product that delivers enough value to validate a core hypothesis with real users. It's not a rough prototype — it's a production-ready product scoped to the essential features needed to test demand and collect structured feedback.",
    answerUk:
      "MVP - це найменша версія продукту, яка дозволяє перевірити основну гіпотезу на реальних користувачах. Це не прототип, а спрощений, але робочий продукт.",
  },
  {
    id: 2,
    questionEn: "How much does MVP development cost?",
    questionUk: "Скільки коштує MVP?",
    answerEn:
      "A focused SaaS MVP typically costs $20,000–$45,000. Mobile MVPs range from $25,000–$55,000. Complex products with multiple user roles or marketplace features start at $50,000+.",
    answerUk:
      "Від $20,000 до $45,000 для SaaS. Мобільні MVP — від $25,000. Складні продукти — від $50,000+.",
  },
  {
    id: 3,
    questionEn: "How long does it take to build an MVP?",
    questionUk: "Скільки часу займає MVP?",
    answerEn:
      "Most MVPs ship in 6–12 weeks depending on scope and integration complexity. We define the timeline precisely during the scoping session before development begins.",
    answerUk:
      "У середньому 6–12 тижнів залежно від обсягу та інтеграцій.",
  },
  {
    id: 4,
    questionEn: "What features should an MVP include?",
    questionUk: "Які функції має включати MVP?",
    answerEn:
      "Only the features that directly test the core value proposition: authentication, the primary user flow, and one key integration (usually payments or data input). Everything else is a phase-two decision informed by real usage.",
    answerUk:
      "Тільки ті, що перевіряють ключову цінність: автентифікація, основний сценарій і одна критична інтеграція.",
  },
  {
    id: 5,
    questionEn: "What tech stack is best for MVP development?",
    questionUk: "Який стек найкращий для MVP?",
    answerEn:
      "For most products: React or Next.js frontend, Node.js or Python backend, PostgreSQL or Supabase for data, Stripe for payments, deployed on Vercel or AWS. For mobile-first products, Flutter gives you iOS and Android from a single codebase.",
    answerUk:
      "React/Next.js, Node.js або Python, PostgreSQL, Stripe, Vercel або AWS.",
  },
  {
    id: 6,
    questionEn: "How do startups validate an idea with MVP?",
    questionUk: "Як перевірити ідею через MVP?",
    answerEn:
      "By defining measurable success criteria before launch - activation rate, retention at 7 days, conversion to paid, and treating the MVP as a controlled experiment. We help set those criteria during the scoping phase.",
    answerUk:
      "Через вимірювані метрики: активація, утримання користувачів, конверсія. MVP розглядається як контрольований експеримент.",
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
