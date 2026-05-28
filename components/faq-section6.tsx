"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  questionEn: string;
  questionUk: string;
  answerEn: string;
  answerUk: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    questionEn: "What is a dedicated development team?",
    questionUk: "Що таке dedicated development team або staff augmentation?",
    answerEn:
      "A group of engineers allocated full-time to your product: integrated into your workflow, tools, and process, not shared across multiple clients.",
    answerUk:
      "Група інженерів, виділених full-time для вашого продукту, інтегрованих у ваші процеси та інструменти, без розподілу між клієнтами.",
  },
  {
    id: 2,
    questionEn: "What is the difference between outsourcing and outstaffing?",
    questionUk: "У чому різниця між outsourcing і staff augmentation?",
    answerEn:
      "Outstaffing means you manage the engineers directly: they join your team and follow your technical leadership. Outsourcing means we own technical execution end-to-end and you review milestones.",
    answerUk:
      "Staff augmentation — ви керуєте інженерами напряму. Outsourcing — ми відповідаємо за повний технічний цикл end-to-end, а ви погоджуєте ключові етапи.",
  },
  {
    id: 3,
    questionEn: "How much does it cost to hire dedicated developers?",
    questionUk: "Скільки коштує найм dedicated розробників?",
    answerEn:
      "Monthly rates depend on seniority and team size. Mid-level engineers typically run $3,500–$5,500/month. Senior engineers and tech leads range from $5,500–$8,500/month.",
    answerUk:
      "Вартість залежить від seniority та розміру команди. Mid-level інженери: $3,500–$5,500/місяць. Senior і tech lead: $5,500–$8,500/місяць.",
  },
  {
    id: 4,
    questionEn: "How do remote development teams work?",
    questionUk: "Як працюють remote development teams?",
    answerEn:
      "They integrate into your existing workflow: your standups, your sprint cadence, your tools. Daily async updates in Slack, bi-weekly sprint reviews, code committed directly to your repository under your PR process.",
    answerUk:
      "Вони інтегруються у ваш workflow: standups, sprint cadence, PR процеси, Slack-комунікація і регулярні sprint reviews. Код потрапляє напряму у ваш репозиторій.",
  },
  {
    id: 5,
    questionEn: "When should a company hire offshore developers?",
    questionUk: "Коли компанії варто наймати offshore розробників?",
    answerEn:
      "When in-house hiring timelines or costs are blocking product velocity, when you need specific stack expertise unavailable locally, or when you're scaling a product that requires more engineering capacity than your current team can absorb.",
    answerUk:
      "Коли потрібно швидко масштабувати команду, зменшити time-to-hire або отримати специфічну технічну експертизу, недоступну локально.",
  },
];

export function FAQSection6() {
  const { locale } = useLocale();
  const [expandedId, setExpandedId] = useState<number | null>();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const textColor = isDark ? "#FFFFFF" : "#212121";
  const mutedText = isDark ? "#EBEBEB" : "#666666";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(0, 0, 0, 0.08)";

  const title =
    locale === "uk" ? "Часті Питання" : "Frequently Asked Questions";

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="max-w-[1127px] mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-24"
          style={{ color: textColor }}
        >
          {title}
        </h2>

        <div className="space-y-3">
          {faqItems.map((item) => {
            const isExpanded = expandedId === item.id;
            const question =
              locale === "uk" ? item.questionUk : item.questionEn;
            const answer = locale === "uk" ? item.answerUk : item.answerEn;

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
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full px-5 md:px-8 py-4 flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
                >
                  <h3
                    className="text-[24px] font-[Onest] font-medium text-left"
                    style={{ color: mutedText }}
                  >
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

                {isExpanded && (
                  <div className="px-5 md:px-8 pb-6 pt-0">
                    <p
                      className="text-base md:text-lg font-[Onest]"
                      style={{
                        color: isDark ? "rgba(255, 255, 255, 0.5)" : "#666666",
                      }}
                    >
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}