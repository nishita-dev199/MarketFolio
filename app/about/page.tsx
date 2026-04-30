import MissionVisionSection from "@/components/sections/MissionVisionSection";
import TeamSection from "@/components/sections/TeamSection";
import CtaSection from "@/components/sections/CtaSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-[var(--background)]">
      <main className="flex flex-1 w-full flex-col items-center">
        {/* About Hero Section */}
        <section className="w-full relative h-[80vh] flex items-center justify-center overflow-hidden bg-black -mt-28 pt-28">
          {/* Background Image */}
          <img 
            src="/marketing.jpg" 
            alt="Digital Marketing" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          
          <div className="max-w-7xl w-full relative z-20 mx-auto px-6 flex flex-col items-start text-left">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-white mb-6 uppercase">
              Digital <br/> Marketing
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl leading-relaxed font-medium">
              We engineer high-performance marketing systems that turn cold traffic into loyal customers. 
              Our approach combines algorithmic SEO, full-funnel paid media, and content strategies 
              designed to scale your business with mathematical precision and creative excellence.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <MissionVisionSection />

        {/* Marketing Strategies (Reusing Services Section) */}
        <ServicesSection darkVariant={true} />

        {/* Know Our Team Section */}
        <TeamSection />

        {/* Why Choose Evander Section */}
        <WhyChooseSection />

        {/* Final CTA Section */}
        <CtaSection />
      </main>
    </div>
  );
}
