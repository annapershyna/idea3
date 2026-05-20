const industries = [
  {
    title: "Healthcare",
    description: "HIPAA-ready apps, patient platforms, analytics systems",
  },
  {
    title: "Fintech",
    description: "Secure API-first financial products and integrations",
  },
  {
    title: "Ecommerce",
    description: "High-load stores, marketplaces, checkout flows",
  },
  {
    title: "SaaS",
    description: "Scalable platforms for startups and B2B products",
  },
  {
    title: "Logistics",
    description: "Real-time tracking automation and operational tools",
  },
]

export function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F4F4F6] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#0A0A0B]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-120px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#FF6A00]/20 blur-3xl dark:bg-[#FF6A00]/25" />
        <div className="absolute bottom-[-140px] right-[-70px] h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/15 blur-3xl dark:bg-[#8B5CF6]/20" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6200] backdrop-blur dark:border-white/10 dark:bg-white/5">
            Industries
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111015] sm:text-4xl lg:text-5xl dark:text-white">
            Industries
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#5D5A66] sm:text-lg dark:text-[#B9B7C3]">
            We build scalable digital products for fast-growing companies across highly demanding industries.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, index) => (
            <article
              key={industry.title}
              className="group relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white/80 p-7 shadow-[0_12px_40px_-24px_rgba(17,16,21,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#FF6200]/40 hover:shadow-[0_18px_60px_-24px_rgba(255,98,0,0.45)] dark:border-white/10 dark:bg-[#131216]/80 dark:shadow-[0_14px_50px_-24px_rgba(0,0,0,0.8)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(120deg,rgba(255,98,0,0.3),rgba(139,92,246,0.25),transparent_60%)]" />
              </div>

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[#111015] transition-colors duration-300 group-hover:text-[#FF6200] dark:text-white">
                    {industry.title}
                  </h3>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-sm text-[#111015] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#FF6200]/40 group-hover:text-[#FF6200] dark:border-white/10 dark:bg-white/5 dark:text-white">
                    ↗
                  </span>
                </div>

                <p className="max-w-[34ch] text-sm leading-7 text-[#5D5A66] dark:text-[#B9B7C3]">{industry.description}</p>
              </div>

              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#FF6200]/15 blur-2xl transition-all duration-500 group-hover:scale-125 dark:bg-[#FF6200]/25" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
