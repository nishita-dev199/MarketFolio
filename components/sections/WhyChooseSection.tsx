"use client";
import { useState } from "react";
import { FaChevronDown, FaCheckCircle } from "react-icons/fa";

const reasons = [
  {
    title: "Performance-focused approach",
    description: "Every campaign we launch is measured by one metric: revenue. We avoid vanity KPIs and focus on strategies that directly impact your bottom line through algorithmic bidding and creative testing."
  },
  {
    title: "Data-driven strategies",
    description: "Zero guesswork. We use advanced attribution modeling and closed-loop analytics to allocate your budget where it generates the most profit, ensuring maximum efficiency for every dollar spent."
  },
  {
    title: "Lead generation expertise",
    description: "Our systems are built to turn cold traffic into high-intent leads. We specialize in building scalable lead generation engines tailored specifically for high-ticket industries like Real Estate."
  },
  {
    title: "Dedicated support & transparency",
    description: "You'll never be in the dark. We provide 100% transparent reporting and dedicated support, ensuring you understand exactly how your campaigns are performing and what we're doing to improve them."
  },
  {
    title: "Fast execution and continuous optimization",
    description: "The digital market moves fast, and so do we. We execute quickly and use real-time data to continuously optimize your funnels, ensuring you stay ahead of the competition at all times."
  }
];

export default function WhyChooseSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-32 px-6 bg-zinc-50 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
          The Competitive Edge
        </div>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-black mb-16 text-center">
          Why Choose MarketFolio?
        </h2>

        <div className="w-full space-y-4">
          {reasons.map((reason, i) => (
            <div 
              key={i} 
              className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                openIndex === i 
                ? 'bg-black border-black shadow-2xl scale-[1.02]' 
                : 'bg-white border-zinc-100 hover:border-zinc-300'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    openIndex === i ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    <FaCheckCircle className="text-sm" />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-500 ${
                    openIndex === i ? 'text-white' : 'text-black'
                  }`}>
                    {reason.title}
                  </h3>
                </div>
                <FaChevronDown className={`transition-transform duration-500 ${
                  openIndex === i ? 'rotate-180 text-white' : 'text-zinc-400'
                }`} />
              </button>

              <div className={`transition-all duration-500 ease-in-out ${
                openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-8 pt-0 ml-14">
                  <p className={`text-lg leading-relaxed font-medium transition-colors duration-500 ${
                    openIndex === i ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
