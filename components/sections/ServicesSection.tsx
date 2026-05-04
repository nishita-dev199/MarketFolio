import Link from "next/link";
import { SERVICES } from "@/lib/content/services";
import ServiceIcon from "@/components/services/ServiceIcon";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function ServicesSection({ darkVariant = false }: { darkVariant?: boolean }) {
  return (
    <section
      id="services"
      className={`w-full mt-20 py-32 px-6 flex flex-col items-center ${darkVariant ? "bg-black" : "bg-zinc-50"}`}
    >
      <div className="max-w-7xl w-full flex flex-col items-center">
        <RevealOnScroll>
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 ${
              darkVariant
                ? "border-white/10 bg-white/5 text-zinc-400"
                : "border-zinc-200 bg-white text-zinc-500"
            }`}
          >
            What We Do
          </div>
        </RevealOnScroll>
        <RevealOnScroll delayMs={60}>
          <h2
            className={`text-4xl md:text-5xl font-medium tracking-tighter mb-4 text-center ${
              darkVariant ? "text-white" : "text-black"
            }`}
          >
            Built to Win, Not Just Look Good
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delayMs={120}>
          <p
            className={`text-lg mb-20 max-w-2xl text-center font-medium ${
              darkVariant ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Every service we offer is measured by one metric: revenue generated for your business. No vanity KPIs, no fluff.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full perspective-1000">
          {SERVICES.map((service, index) => (
            <RevealOnScroll key={service.slug} delayMs={index * 70} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className={`group block h-full rounded-[2.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                  darkVariant ? "focus-visible:ring-offset-black" : "focus-visible:ring-offset-zinc-50"
                }`}
              >
                <div
                  className="float-lg rounded-[2.5rem] p-10 flex flex-col items-start bg-white teardrop-border group-hover:scale-[1.03] transition-all duration-500 cursor-pointer overflow-hidden preserve-3d shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] h-full min-h-[320px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-8 float-dark transition-all duration-500 group-hover:scale-110 shadow-xl">
                    <ServiceIcon slug={service.slug} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-black transition-all duration-500">{service.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed mb-8 flex-1 transition-all duration-500 group-hover:text-black">
                    {service.summary}
                  </p>
                  <div className="w-full border-t border-zinc-100 pt-6 flex items-center gap-2 group-hover:border-black/10 transition-colors mt-auto">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Result</span>
                    <span className="ml-auto text-sm font-black text-black transition-all">{service.stat}</span>
                  </div>
                  <span className="mt-6 text-sm font-bold text-zinc-400 group-hover:text-black transition-colors">
                    View service →
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
