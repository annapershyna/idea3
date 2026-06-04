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
    questionEn: "How much does mobile app development cost?",
    questionUk: "Скільки коштує розробка мобільного додатку?",
    answerEn:
      "A Flutter MVP for both platforms starts at $2,500+. Mid-complexity cross-platform apps: $5,000+. Native builds for complex products: $5,000+ per platform.",
    answerUk:
      "Flutter MVP для обох платформ стартує від $2,500+. Mid-complexity кросплатформні додатки — $5,000+. Нативні застосунки для складних продуктів — від $5,000+ за платформу.",
  },
  {
    id: 2,
    questionEn: "What is better: Flutter or native development?",
    questionUk: "Що краще: Flutter чи нативна розробка?",
    answerEn:
      "Flutter is better for products that need iOS and Android parity at lower cost and faster delivery. Native is better when the product relies on deep platform-specific APIs, hardware integrations, or requires maximum UI performance.",
    answerUk:
      "Flutter краще для продуктів із паритетом iOS і Android та швидшим виходом на ринок. Нативна розробка — коли потрібні глибокі платформо-специфічні API або максимальна продуктивність інтерфейсу.",
  },
  {
    id: 3,
    questionEn: "How long does it take to build a mobile app?",
    questionUk: "Скільки часу займає створення мобільного застосунку?",
    answerEn:
      "A focused Flutter MVP: 8–12 weeks. A mid-complexity app: 3–5 months. A complex native app with multiple platform integrations: 5–8 months.",
    answerUk:
      "Flutter MVP — 8–12 тижнів. Середній продукт — 3–5 місяців. Складні нативні застосунки — 5–8 місяців.",
  },
  {
    id: 4,
    questionEn: "What technologies are used for mobile app development?",
    questionUk: "Які технології використовуються?",
    answerEn:
      "Flutter and Dart for cross-platform. Swift for native iOS. Kotlin for native Android. Firebase or custom REST/GraphQL backends for data. Stripe for payments.",
    answerUk:
      "Flutter і Dart для кросплатформ, Swift для iOS, Kotlin для Android, backend на Node.js або Python, база даних PostgreSQL, платежі через Stripe.",
  },
  {
    id: 5,
    questionEn: "How do businesses monetize mobile apps?",
    questionUk: "Як монетизуються мобільні застосунки?",
    answerEn:
      "Through in-app subscriptions (StoreKit for iOS, Google Play Billing), one-time purchases, freemium models with paid feature unlocks, or direct payment flows via Stripe for B2B products where app store fees are avoidable.",
    answerUk:
      "Через підписки, внутрішні покупки, freemium-моделі або прямі платежі через Stripe для B2B, щоб уникати комісій магазинів.",
  },
];

export function FAQSection5() {
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
