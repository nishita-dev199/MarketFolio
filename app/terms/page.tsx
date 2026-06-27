import Link from "next/link";

export const metadata = {
  title: "Terms of Service | MarketFolio",
  description: "Terms of Service for MarketFolio.",
};

export default function TermsConditionsPage() {
  return (
    <>
    <div className="fixed inset-0 bg-black -z-10"></div>
    <div className="w-full min-h-screen bg-black ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side */}
        <div className="w-full lg:w-3/5">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-white mb-12 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-white">Terms of Service</h1>
          <p className="text-xl font-medium text-zinc-400 mb-16 border-b border-zinc-800 pb-12 leading-relaxed">
            Please read these terms and conditions carefully before using our services.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-black mb-4 text-white">1. Services</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Digital marketing services including Meta Ads, Google Ads, SEO, and Lead Generation.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-black mb-4 text-white">2. User Responsibilities</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Provide accurate information and do not misuse services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-black mb-4 text-white">3. Payments & Fees</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Fees communicated before engagement. Delays may result in suspension.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-white">4. No Guarantee of Results</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">No guaranteed leads, sales, or ROI due to multiple factors.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-white">5. Intellectual Property</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">All materials remain company property unless agreed otherwise.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-white">6. Confidentiality</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Both parties must keep business data confidential.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-white">7. Termination</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Services may be terminated for breach, non-payment, or misuse.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-white">8. Limitation of Liability</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Not liable for business losses or damages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-white">9. Changes to Terms</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Terms may be updated anytime without notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-white">10. Governing Law</h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">Governed by the laws of India.</p>
            </section>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-2/5 flex flex-col items-start pt-32">
          <div className="sticky top-40 w-full">
            <div className="float-dark rounded-[2.5rem] overflow-hidden bg-black teardrop-border aspect-square w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0 group">
              <img 
                src="/terms_hero.png" 
                alt="Terms Agreement" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
