import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/content/services";
import ServiceIcon from "@/components/services/ServiceIcon";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Performance marketing, SEO, funnels, landing pages, retargeting, and analytics — engineered for revenue, not vanity metrics.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col flex-1 w-full font-sans">
      <main className="flex flex-1 w-full flex-col items-center">
        <section className="w-full relative overflow-hidden pt-10 pb-20 md:pb-28 px-6 bg-zinc-50">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.2), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(168,85,247,0.12), transparent 50%)",
            }}
          />
          <div className="max-w-7xl w-full mx-auto relative z-10 text-center md:text-left">
            <RevealOnScroll className="flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">
                Services
              </div>
            </RevealOnScroll>
            <RevealOnScroll delayMs={80}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-black leading-[1.05] mb-6 max-w-4xl mx-auto md:mx-0">
                Growth systems built for accountability.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delayMs={140}>
              <p className="text-lg md:text-xl text-zinc-600 max-w-2xl font-medium leading-relaxed mx-auto md:mx-0">
                Explore how we deploy paid media, organic search, conversion design, and analytics as one coordinated engine — with
                clear outcomes and transparent reporting.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 px-6 bg-background">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {SERVICES.map((service, index) => (
              <RevealOnScroll key={service.slug} delayMs={index * 60}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  <article className="float-lg teardrop-border bg-white rounded-[2rem] p-8 md:p-10 h-full flex flex-col transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.18)]">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-black text-white flex items-center justify-center float-dark transition-transform duration-500 group-hover:scale-105">
                        <ServiceIcon slug={service.slug} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-black text-black tracking-tight mb-2">{service.title}</h2>
                        <p className="text-zinc-500 font-medium leading-relaxed mb-6">{service.summary}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Benchmark</span>
                          <span className="font-black text-black">{service.stat}</span>
                        </div>
                      </div>
                    </div>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-400 group-hover:text-black transition-colors">
                      Read more
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </article>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
    </div>
  );
}
