import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs, SERVICES } from "@/lib/content/services";
import ServiceIcon from "@/components/services/ServiceIcon";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CtaSection from "@/components/sections/CtaSection";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: `${service.title} | MarketFolio`,
      description: service.summary,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const other = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-background">
      <main className="flex flex-1 w-full flex-col items-center">
        <section className="w-full relative overflow-hidden bg-black text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 20% 20%, rgba(59,130,246,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(168,85,247,0.25), transparent 50%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black pointer-events-none" />
          <div className="max-w-7xl w-full mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 relative z-10">
            <RevealOnScroll>
              <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-10">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-zinc-200 font-medium">{service.title}</li>
                </ol>
              </nav>
            </RevealOnScroll>

            <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">
              <RevealOnScroll className="flex-1" delayMs={60}>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-widest text-zinc-300 mb-8">
                  {service.title}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.05] mb-6">
                  {service.heroTagline}
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 max-w-2xl font-medium leading-relaxed">{service.overview}</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/#contact"
                    target="_blank"
                    className="inline-flex justify-center items-center float-sm text-black px-8 py-4 rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Book a consultation →
                  </Link>
                  <Link
                    href="/#services"
                    className="inline-flex justify-center items-center border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
                  >
                    All services
                  </Link>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delayMs={120} className="shrink-0">
                <div className="w-full sm:w-56 h-56 rounded-4xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-24 h-24 rounded-3xl bg-white text-black flex items-center justify-center float-sm">
                    <ServiceIcon slug={service.slug} className="w-12 h-12" />
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delayMs={160}>
              <div className="mt-14 inline-flex flex-wrap items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Typical outcome</span>
                <span className="text-white font-black">{service.stat}</span>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 px-6 bg-zinc-50">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-8">What you get</h2>
              <ul className="space-y-4">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex gap-3 text-zinc-600 font-medium leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll delayMs={80}>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-8">How we work it</h2>
              <ol className="space-y-8">
                {service.processSteps.map((step, i) => (
                  <li key={step.title} className="relative pl-12">
                    <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm font-black">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-black text-black mb-2">{step.title}</h3>
                    <p className="text-zinc-600 font-medium leading-relaxed">{step.description}</p>
                  </li>
                ))}
              </ol>
            </RevealOnScroll>
          </div>
        </section>

        <section className="w-full py-20 md:py-24 px-6 bg-background relative overflow-hidden">
          <div className="max-w-7xl w-full mx-auto relative z-10">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-black mb-10 text-center md:text-left">
                Ideal fit
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
              {service.idealFor.map((line, index) => {
                // Diagonal/opposite cards get the teardrop border
                const hasTeardrop = index === 0 || index === 2;
                return (
                  <RevealOnScroll key={line} delayMs={index * 70} className="h-full">
                    <div 
                      className={`float-sm rounded-2xl p-8 h-full bg-white group hover:scale-[1.02] transition-transform duration-500 hover:[transform:rotateX(5deg)_rotateY(-5deg)] ${hasTeardrop ? 'teardrop-border' : 'border border-black/5'}`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <p className="text-zinc-700 font-medium leading-relaxed">{line}</p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 px-6 bg-zinc-50 border-y border-zinc-200/80">
          <div className="max-w-7xl w-full mx-auto">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-black">Related services</h2>
                <Link href="/#services" className="text-sm font-bold text-zinc-500 hover:text-black transition-colors">
                  View all →
                </Link>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {other.map((s, index) => (
                <RevealOnScroll key={s.slug} delayMs={index * 60}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 h-full transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                      <h3 className="font-black text-black mb-2 group-hover:underline underline-offset-4">{s.title}</h3>
                      <p className="text-sm text-zinc-500 font-medium line-clamp-2">{s.summary}</p>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
    </div>
  );
}
