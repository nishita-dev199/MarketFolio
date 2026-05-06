"use client";
// React hooks removed as they were unused

const caseStudies = [
  {
    tag: "E-commerce · SEO + PPC",
    company: "NovaBrew Co.",
    challenge: "Organic traffic had plateaued for 8 months. Paid ads were bleeding budget with a 6.2× CPA.",
    result: "Rebuilt site architecture around purchase-intent clusters. Launched smart-bidding campaigns segmented by LTV cohort.",
    metrics: [
      { value: "412%", label: "Organic traffic growth" },
      { value: "2.8×", label: "ROAS improvement" },
    ],
  },
  {
    tag: "SaaS · Full-Funnel Growth",
    company: "Stackify HX",
    challenge: "High trial signups but only 9% trial-to-paid conversion. CAC was 4× industry benchmark.",
    result: "Redesigned paid acquisition funnels, built nurture sequences tied to behavior triggers, and A/B tested variants.",
    metrics: [
      { value: "31%", label: "Trial-to-paid rate" },
      { value: "₹12L", label: "ARR added in 90 days" },
    ],
  },
  {
    tag: "B2B Tech · Lead Generation",
    company: "Vanguard Systems",
    challenge: "CPC was skyrocketing while lead quality dropped. Sales team was overwhelmed with tire-kickers.",
    result: "Implemented a qualifying funnel and laser-targeted search campaigns. Used value-bidding to prioritize key accounts.",
    metrics: [
      { value: "+55%", label: "Increase in SQLs" },
      { value: "-42%", label: "Reduction in Cost per SQL" },
    ],
  },
 
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="w-full py-32 px-6 flex flex-col items-center bg-black">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
          Proof, Not Promises
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4 text-center">
          Results That Speak<br className="hidden md:block" /> for Themselves
        </h2>
        <p className="text-lg text-zinc-500 mb-20 max-w-2xl text-center font-medium">
          These aren&apos;t estimates. Every number below is from a real client engagement with closed-loop attribution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {caseStudies.map((study) => (
            <div
              key={study.company}
              className="rounded-[2.5rem] p-10 flex flex-col bg-zinc-900/50 border border-zinc-800 hover:border-white/20 transition-all duration-500 float-dark group"
            >
              <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
                {study.tag}
              </span>
              <h3 className="text-3xl font-black text-white mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all">
                {study.company}
              </h3>

              <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">The Challenge</p>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">{study.challenge}</p>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Our Strategy</p>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">{study.result}</p>
              </div>

              <div className="mt-auto border-t border-zinc-800/50 pt-8 grid grid-cols-2 gap-8">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-4xl font-black text-white mb-1 tracking-tighter">{m.value}</p>
                    <p className="text-[10px] text-zinc-500 font-bold leading-tight uppercase tracking-widest">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
