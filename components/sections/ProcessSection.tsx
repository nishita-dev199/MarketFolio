const steps = [
  {
    number: "01",
    title: "Lead Generation / First Contact",
    description:
      "Whether through ads, referrals, or direct enquiry, your journey starts here. We identify high-intent leads ready for growth.",
  },
  {
    number: "02",
    title: "Requirement Discussion",
    description:
      "An initial deep-dive meeting to understand your business model, specific goals, target audience, and available budget.",
  },
  {
    number: "03",
    title: "Strategy & Planning",
    description:
      "Our team engineers a customized marketing blueprint based on your unique requirements and market opportunities.",
  },
  {
    number: "04",
    title: "Proposal & Confirmation",
    description:
      "We present the strategy, pricing, and project timeline. Once you approve the roadmap, we move into high gear.",
  },
  {
    number: "05",
    title: "Onboarding",
    description:
      "The setup phase. We collect brand assets, secure technical access, and prepare our internal teams for launch.",
  },
  {
    number: "06",
    title: "Execution",
    description:
      "The engine starts. We deploy campaigns, design high-converting creatives, and optimize your website for performance.",
  },
  {
    number: "07",
    title: "Monitoring & Optimization",
    description:
      "We don't set and forget. Our specialists continuously track data and tweak campaigns for maximum ROI.",
  },
  {
    number: "08",
    title: "Reporting",
    description:
      "Transparency is key. You receive regular, detailed performance reports tracking progress against our agreed KPIs.",
  },
  {
    number: "09",
    title: "Delivery & Continuation",
    description:
      "We hit the targets. Depending on the results, we either scale the current success or evolve into the next growth phase.",
  },
];

export default function ProcessSection() {
  const row1 = steps.slice(0, 5);
  const row2 = steps.slice(5, 9);

  return (
    <section id="process" className="w-full py-32 px-4 flex flex-col items-center bg-zinc-50/20 overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
          Our Process
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-4 text-center">
          Engineered for Results.
        </h2>
        <p className="text-lg text-zinc-500 mb-20 max-w-2xl text-center font-medium">
          A systematic 9-phase journey designed to turn cold traffic into compounding revenue.
        </p>

        {/* Timeline Rows */}
        <div className="w-full space-y-16">
          
          {/* Row 1: 5 Cards */}
          <div className="relative">
             <div className="hidden lg:block absolute top-[125px] left-0 w-full h-[5px] bg-zinc-400 -z-0" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {row1.map((step) => (
                <ProcessCard key={step.number} step={step} />
              ))}
            </div>
          </div>

          {/* Row 2: 4 Cards */}
          <div className="relative">
            <div className="hidden lg:block absolute top-[125px] left-[12.5%] w-[75%] h-[5px] bg-zinc-400 -z-0" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-[12.5%]">
              {row2.map((step) => (
                <ProcessCard key={step.number} step={step} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step }: { step: typeof steps[0] }) {
  return (
    <div className="group h-[260px] perspective-1000 z-10">
      <div className="relative w-full h-full flip-card-inner preserve-3d cursor-pointer">
        
        {/* Front Side: High-End Glassmorphism with Teardrop Border */}
        <div className="absolute inset-0 backface-hidden bg-white teardrop-border rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center font-black text-2xl mb-6 shadow-xl transform group-hover:scale-110 group-hover:-rotate-3 transition-transform">
            {step.number}
          </div>
          <h3 className="text-sm font-black text-black leading-tight uppercase tracking-widest">
            {step.title}
          </h3>
          <div className="mt-4 w-8 h-[2px] bg-zinc-100 group-hover:w-16 transition-all" />
        </div>

        {/* Back Side: Deep Black Premium with Teardrop Border */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black teardrop-border text-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl">
          <span className="text-[10px] font-black text-zinc-500 uppercase mb-4 tracking-[0.3em]">Phase {step.number}</span>
          <p className="text-sm font-medium leading-relaxed text-zinc-300">
            {step.description}
          </p>
          <div className="mt-6 text-white/20 text-4xl font-black select-none">{step.number}</div>
        </div>

      </div>
    </div>
  );
}
