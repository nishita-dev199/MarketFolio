export default function MissionVisionSection() {
  return (
    <section className="w-full py-32 overflow-hidden bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Mission Row */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-40 relative">
          {/* Mission Text */}
          <div className="w-full md:w-3/5 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Our Core Purpose
            </div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-black mb-8 leading-tight">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed max-w-2xl">
              To help businesses generate consistent, high-quality leads and revenue through data-driven digital marketing strategies, focusing on real results rather than vanity metrics.
            </p>
          </div>

          {/* Card on the Right */}
          <div className="w-full md:w-2/5 flex justify-end relative z-20">
            <div className="float-lg rounded-[2.5rem] overflow-hidden bg-white teardrop-border w-64 md:w-80 group hover:-translate-y-4 transition-all duration-700 relative aspect-[3/4]">
              <img 
                src="/team/sabareesh.jpeg" 
                alt="CEO - Sabareesh Sankar" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-medium text-white mb-1">Sabareesh Sankar</h3>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">CEO</p>
              </div>
            </div>
          </div>

          {/* Triangle */}
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-100 rotate-12 pointer-events-none z-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-200 fill-current drop-shadow-md">
              <path d="M50 10 L90 85 Q92 90 85 90 L15 90 Q8 90 10 85 L50 10 Z" />
            </svg>
          </div>
        </div>

        {/* Vision Row */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 relative">
          {/* Vision Text */}
          <div className="w-full md:w-3/5 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              The North Star
            </div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-black mb-8 leading-tight">
              Our Vision
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed max-w-2xl">
              To become a leading performance marketing agency in India, empowering startups and local businesses to scale sustainably using innovative digital strategies and measurable growth systems.
            </p>
          </div>

          {/* Vision Card on the Left */}
          <div className="w-full md:w-2/5 flex justify-start relative z-20">
            <div className="float-lg rounded-[2.5rem] overflow-hidden bg-white teardrop-border w-64 md:w-80 group hover:-translate-y-4 transition-all duration-700 relative aspect-[3/4]">
              <img 
                src="/team/pavithra.png" 
                alt="Founder - Pavithra S." 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-medium text-white mb-1">Pavithra S.</h3>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">Founder</p>
              </div>
            </div>
          </div>

          {/* Triangle */}
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-100 -rotate-12 pointer-events-none z-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-200 fill-current drop-shadow-md">
              <path d="M50 10 L90 85 Q92 90 85 90 L15 90 Q8 90 10 85 L50 10 Z" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
