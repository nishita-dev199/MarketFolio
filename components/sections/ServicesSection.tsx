import Link from "next/link";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Performance Marketing",
    description:
      "Precision-targeted Meta and Google Ads campaigns engineered to maximize reach and minimize CPA through algorithmic bidding and creative testing.",
    stat: "4.2× avg. ROAS",
    link: "/#process",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Funnel-Based Approach",
    description:
      "A strategic journey from Awareness to Lead to Conversion. We build automated ecosystems that nurture cold traffic into high-value customers.",
    stat: "28% higher conversion rate",
    link: "/#process",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Landing Page Optimization",
    description:
      "We design and split-test high-intent landing pages that reduce friction and compel action, ensuring every ad dollar works twice as hard.",
    stat: "35% reduction in bounce rate",
    link: "/#process",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO & Organic Growth",
    description:
      "Dominate search results with technical SEO and semantic content strategies that build long-term authority and drive zero-cost traffic.",
    stat: "5.5× organic traffic lift",
    link: "/#process",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Retargeting Campaigns",
    description:
      "Re-engage lost visitors with precision dynamic ads. We keep your brand top-of-mind across the entire digital ecosystem until they convert.",
    stat: "2.8× increase in LTV",
    link: "/#process",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Data-Driven Decision Making",
    description:
      "Zero guesswork. We use advanced attribution modeling and closed-loop analytics to allocate your budget where it generates the most profit.",
    stat: "100% transparent reporting",
    link: "#process",
  },
];

export default function ServicesSection({ darkVariant = false }: { darkVariant?: boolean }) {
  return (
    <section 
      id="services" 
      className={`w-full mt-20 py-32 px-6 flex flex-col items-center ${darkVariant ? 'bg-black' : 'bg-zinc-50'}`}
    >
      <div className="max-w-7xl w-full flex flex-col items-center">
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 ${
          darkVariant 
          ? 'border-white/10 bg-white/5 text-zinc-400' 
          : 'border-zinc-200 bg-white text-zinc-500'
        }`}>
          What We Do
        </div>
        <h2 className={`text-4xl md:text-5xl font-medium tracking-tighter mb-4 text-center ${
          darkVariant ? 'text-white' : 'text-black'
        }`}>
          Built to Win, Not Just Look Good
        </h2>
        <p className={`text-lg mb-20 max-w-2xl text-center font-medium ${
          darkVariant ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          Every service we offer is measured by one metric: revenue generated for your business. No vanity KPIs, no fluff.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full perspective-1000">
          {services.map((service) => (
            <div 
              key={service.title} 
              className="float-lg rounded-[2.5rem] p-10 flex flex-col items-start bg-white teardrop-border group hover:scale-[1.03] hover:rotate-x-12 transition-all duration-500 cursor-pointer overflow-hidden preserve-3d shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-8 float-dark transition-all duration-500 group-hover:scale-110 group-hover:translate-z-10 shadow-xl">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-black transition-all duration-500 group-hover:translate-z-8">
                {service.title}
              </h3>
              <p className="text-zinc-500 font-medium leading-relaxed mb-8 flex-1 transition-all duration-500 group-hover:text-black group-hover:translate-z-4">
                {service.description}
              </p>
              <div className="w-full border-t border-zinc-100 pt-6 flex items-center gap-2 group-hover:border-black/10 transition-colors">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Result</span>
                <span className="ml-auto text-sm font-black text-black transition-all">{service.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}