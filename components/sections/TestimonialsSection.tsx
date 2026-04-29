"use client";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Evander completely transformed our digital presence. Within 6 months, our organic traffic doubled and our cost per acquisition dropped by 40%.",
    name: "Sarah Jenkins",
    role: "CMO at TechFlow",
  },
  {
    quote: "Their data-driven approach to PPC is unmatched. The transparency and results they deliver make them an invaluable partner to our growth.",
    name: "Michael Chen",
    role: "Founder of InnovateX",
  },
  {
    quote: "The level of strategy and execution Evander brings to the table is rare. They didn't just run ads; they helped us fix our entire funnel. Our ROI has never been higher.",
    name: "David Miller",
    role: "Director of Marketing at GlobalScale",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  // Responsive logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Automatic crawling logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const step = isMobile ? "calc(100% + 32px)" : "calc(50% + 16px)";
  const slideWidth = isMobile ? "100%" : "calc(50% - 16px)";

  return (
    <section id="testimonials" className="w-full py-32 px-6 flex flex-col items-center bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
          Client Success
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-20 text-center">
          Voices of Growth
        </h2>
        
        {/* Testimonial Crawler Container */}
        <div className="w-full relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out gap-8 w-full"
              style={{ 
                transform: `translateX(calc(-${currentIndex} * (${step})))`,
              }}
            >
              {/* Double mapping for seamless-ish looping or enough items to show 2 */}
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div key={idx} style={{ minWidth: slideWidth }} className="flex justify-center">
                  <div className="w-full float-md rounded-[2.5rem] p-10 md:p-14 bg-white relative teardrop-border group overflow-hidden">
                    
                    {/* Gradient Quotation Marks */}
                    <div className="absolute top-4 right-8 text-[10rem] font-serif leading-none select-none z-0 opacity-25 group-hover:opacity-40 transition-opacity italic tracking-tight">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500">&quot;</span>
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-xl md:text-2xl font-medium text-black leading-relaxed mb-10">
                        {t.quote}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white font-black text-lg shadow-lg">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-black text-lg text-black">{t.name}</h5>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-16">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? "w-10 bg-black" : "w-2 bg-zinc-200 hover:bg-zinc-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
