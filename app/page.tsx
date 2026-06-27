import Link from "next/link";
import ServicesSection from "@/components/sections/ServicesSection";
import MetricsSection from "@/components/sections/MetricsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ParallaxSection from "@/components/sections/ParallaxSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-[var(--background)]">
      <main className="flex flex-1 w-full flex-col items-center">
        {/* Hero Section */}
        <section className="w-full relative overflow-hidden pt-16 pb-48 flex flex-col items-center text-center px-6 bg-[var(--background)]">
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "10px",
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            {/* The earth image */}
            <img
              src="/half_earth.jpg"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                opacity: 0.2,
                zIndex: 2,
              }}
            />
            {/* Fade-to-white gradient mask at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "300px",
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,1) 100%)",
                zIndex: 3,
              }}
            />
          </div>

          <div className="max-w-6xl relative z-10 mx-auto flex flex-col items-center">
            
            <div className="float-sm inline-flex items-center gap-2 px-6 py-2 rounded-full text-black text-sm font-bold mb-12 tracking-wide uppercase">
              <span className="flex h-2.5 w-2.5 rounded-full bg-black"></span>
              Data-Driven Growth Agency
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter text-black leading-[1.05] mb-8">
              Outpace the Market <br className="hidden md:block"/>
              with Precision Growth.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl leading-relaxed font-medium">
              We engineer high-performance marketing systems that turn cold traffic into loyal customers — through algorithmic SEO, full-funnel paid media, and content that converts at every stage.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
              <button className="float-dark bg-black text-white px-10 py-4 rounded-full font-medium text-base hover:scale-[1.03] active:scale-95 transition-transform tracking-wide">
              <Link href="/#contact">
                Book a Free Consultation →
              </Link>              
              </button> 
            </div>
            
            {/* Our Clients Section */}
            <div className="mt-10 md:mt-20 w-full flex flex-col items-center md:items-start">
              <h3 className="text-sm md:text-md font-black text-black mb-4 uppercase tracking-[0.2em] md:-ml-56">Our Clients</h3>
              
              {/* Target Partners Ticker */}
              <div 
                className="relative py-4 overflow-hidden border-y border-white/5"
                style={{
                  background: 'linear-gradient(180deg, #111 0%, #000 100%)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.4)',
                  width: '100vw',
                  marginLeft: 'calc(50% - 50vw)',
                  marginRight: 'calc(50% - 50vw)'
                }}
              >
                {/* Shine Highlight Overlay */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
                
                <div className="flex animate-ticker whitespace-nowrap relative z-10">
                  {/* First set */}
                  <div className="flex items-center gap-20 md:gap-40 px-10">
                    <span className="text-lg md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Real Estate Companies
                    </span>
                    <span className="text-lg md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Local Service Businesses
                    </span>
                    <span className="text-lg md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Growing Startups
                    </span>
                    <span className="text-xl md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Marketing Agencies
                    </span>
                  </div>
                  {/* Duplicate set for looping */}
                  <div className="flex items-center gap-20 md:gap-40 px-10">
                    <span className="text-lg md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Real Estate Companies
                    </span>
                    <span className="text-lg md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Local Service Businesses
                    </span>
                    <span className="text-xl md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Growing Startups
                    </span>
                    <span className="text-xl md:text-xl font-medium text-white tracking-tighter flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                      Marketing Agencies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Metrics Section */}
        <MetricsSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Parallax Section */}
        <ParallaxSection imageUrl="/marketing.png" />

        {/* Process Section */}
        <ProcessSection />

        {/* Case Studies Section */}
        <CaseStudiesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Final CTA Section */}
        <CtaSection />

      </main>
    </div>
  );
}
