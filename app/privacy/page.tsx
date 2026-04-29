import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Evander Digital Marketing",
  description: "Privacy Policy for Evander Marketing Private Limited.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side - Content Area */}
        <div className="w-full lg:w-3/5">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-black mb-12 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-black">Privacy Policy</h1>
          <p className="text-xl font-medium text-zinc-600 mb-16 border-b border-zinc-100 pb-12 leading-relaxed">
            At Evander Marketing Private Limited, we value your privacy and are committed to protecting your personal information.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-black mb-4 text-black">1. Information We Collect</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">Name, phone number, business details, and information submitted through forms or inquiries.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-black mb-4 text-black">2. How We Use Your Information</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">To provide services, respond to inquiries, improve user experience, and send updates if opted-in.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-black mb-4 text-black">3. Data Protection</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">We implement security measures to protect your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-black">4. Sharing of Information</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">We do not sell or rent your data. Shared only with trusted providers or if required by law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-black">5. Cookies</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">Our website may use cookies to enhance user experience.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-black">6. Third-Party Links</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">We are not responsible for external websites' privacy practices.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-black">7. Your Consent</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">By using our website, you consent to this Privacy Policy.</p>
            </section>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-2/5 flex flex-col items-start pt-32">
          <div className="sticky top-40 w-full">
            <div className="float-lg rounded-[2.5rem] overflow-hidden bg-white teardrop-border aspect-square w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0 group">
              <img 
                src="/privacy_hero.png" 
                alt="Privacy Security" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
