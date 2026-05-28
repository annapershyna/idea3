"use client"

import { Activity, BarChart3, Code2, Compass, Smartphone, TestTube2 } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function PremiumServices() {
  const { locale } = useLocale()
  const copy = {
    en: {
      intro:
        "Startups that launch an MVP before committing to full product development cut initial build costs by 60–70% and reach market validation up to 4 months faster. We scope, architect, and ship minimum viable products in 6-12 weeks - production-ready, investor-demovable, and built to iterate."
    },
    uk: {
      title: "Розробка програмного забезпечення для бізнесу, що зростає",
      intro:
        "Стартапи, які запускають MVP (мінімально життєздатний продукт) до повномасштабної розробки, скорочують початкові витрати на 60–70% і досягають перевірки ринку на 4 місяці швидше.
Ми визначаємо обсяг робіт, проектуємо та запускаємо Startup MVP за 6–12 тижнів - у форматі, придатному для демонстрації інвесторам і подальших ітерацій. Це не прототип: це працюючий продукт із бізнес-логікою на бекенді, автентифікацією, ключовими користувацькими сценаріями та масштабованою кодовою базою.
Ми застосовуємо підхід lean startup, щоб визначити мінімальний набір функцій для перевірки вашої гіпотези, і уникаємо розширення обсягу робіт поза межі узгодженого."
    },
  } as const
  
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-20 lg:py-24 transition-colors duration-300 bg-[radial-gradient(circle_at_top_right,rgba(255,140,0,.08),transparent_30%),#F7F8FA] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,120,0,.15),transparent_35%),#07070A]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:3px_3px] dark:opacity-[0.06]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mt-6 max-w-4xl text-[18px] leading-[1.7] text-[#4B5563] dark:text-white/72">
         {copy[locale].intro}
        </p>

    </section>
  )
}
