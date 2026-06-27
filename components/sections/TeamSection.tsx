
const team = [
 
  {
    name: "K. K. Menon",
    role: "Director",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: " Sana Johnson",
    role: "Digital Marketing Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Priya Bhawani",
    role: "Social Media Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Daniel Fernandes",
    role: "Senior Fullstack Developer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Anagha Menon",
    role: "SEO Executive",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ashina Yadav",
    role: "Content Writer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sujithra K",
    role: "Social Media Executive",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ronaldo M. Jr.",
    role: "Business Development Executive",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fce6e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Joe Keller",
    role: "Performance Marketing Executive",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  
];

export default function TeamSection() {
  return (
    <section className="w-full py-32 px-6 flex flex-col items-center bg-zinc-50">
      <div className="max-w-6xl w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
          The Architects
        </div>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-black mb-4 text-center">
          Know Our Team
        </h2>
        <p className="text-lg text-zinc-500 mb-20 max-w-2xl text-center font-medium">
          A collective of specialists dedicated to turning complex data into simple, scalable growth.
        </p>

        <div className="flex flex-wrap justify-center gap-8 w-full">
          {team.map((member) => (
            <div
              key={member.name}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] float-lg rounded-[2.5rem] overflow-hidden bg-white teardrop-border group hover:scale-[1.05] transition-all duration-500 cursor-pointer relative aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Overlay for Name and Designation */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 transition-all duration-500 group-hover:from-black/100">
                <h3 className="text-2xl font-medium text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
