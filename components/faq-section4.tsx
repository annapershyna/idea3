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
    questionEn:
      "What is the difference between a website and a web application?",
    questionUk: "У чому різниця між сайтом і web-додатком?",
    answerEn:
      "A website is primarily informational and static. A web application is interactive: it processes user input, manages state, authenticates users, and connects to backend services. Most SaaS products, portals, and dashboards are web applications.",
    answerUk:
      "Сайт переважно інформаційний і статичний. Web-додаток інтерактивний — він обробляє введення користувача, управляє станом, автентифікує користувачів і підключається до backend сервісів. Більшість SaaS продуктів, порталів і дашбордів — це web-додатки.",
  },
  {
    id: 2,
    questionEn: "How much does web application development cost?",
    questionUk: "Скільки коштує розробка web-додатку?",
    answerEn:
      "From $12,000 for a focused tool to $80,000+ for a complex platform. The primary cost drivers are number of user roles, real-time features, third-party integrations, and compliance requirements.",
    answerUk:
      "Від $12,000 за сфокусований інструмент до $80,000+ за складну платформу. Основні фактори вартості — кількість user roles, real-time фічі, сторонні інтеграції і вимоги compliance.",
  },
  {
    id: 3,
    questionEn: "What technologies are best for web apps?",
    questionUk: "Які технології найкращі для web-додатків?",
    answerEn:
      "For most products: React or Next.js on the frontend, Node.js or Python on the backend, PostgreSQL for structured data, Redis for caching, deployed on AWS or GCP. Tech stack is always selected for your specific scalability and maintenance requirements.",
    answerUk:
      "Для більшості продуктів: React або Next.js на frontend, Node.js або Python на backend, PostgreSQL для структурованих даних, Redis для кешування, задеплоєно на AWS або GCP. Tech stack завжди обирається під ваші конкретні вимоги масштабованості й підтримки.",
  },
  {
    id: 4,
    questionEn: "How long does web development take?",
    questionUk: "Скільки часу займає web розробка?",
    answerEn:
      "A focused application: 6–10 weeks. A mid-complexity platform: 3–5 months. A large-scale system with complex integrations: 5–9 months. Timeline is defined precisely during scoping.",
    answerUk:
      "Сфокусований додаток: 6–10 тижнів. Mid-complexity платформа: 3–5 місяців. Великомасштабна система зі складними інтеграціями: 5–9 місяців. Таймлайн визначається точно під час скопінгу.",
  },
  {
    id: 5,
    questionEn: "How do you scale a web application?",
    questionUk: "Як масштабувати web-додаток?",
    answerEn:
      "Through horizontal scaling of stateless services, database read replicas, Redis caching for hot data, CDN for static assets, and auto-scaling groups on AWS or GCP. We configure this infrastructure from day one, not as a retrofit.",
    answerUk:
      "Через горизонтальне масштабування stateless сервісів, database read replicas, Redis кешування для hot data, CDN для статичних assets і auto-scaling groups на AWS або GCP. Ми налаштовуємо цю інфраструктуру з першого дня, а не як retrofit.",
  },
];

export function FAQSection4() {
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
