
const team = [
  {
    name: "Tanushri Bagdi",
    role: "CEO's Executive Assistant",
    image: "/team/Tanushree.jpeg",
  },
  {
    name: "Bhaveena P. B.",
    role: "Digital Marketing Manager",
    image: "/team/Bhaveena.jpeg",
  },
  {
    name: "Khushi Bajpai",
    role: "Social Media Manager",
    image: "/team/khushi.jpeg",
  },
  {
    name: "Nishita Namdeo",
    role: "Web Developer",
    image: "/team/nishita.png",
  },
  {
    name: "Ritika Srivastava",
    role: "Web Developer",
    image: "/team/ritika.jpeg",
  },
  {
    name: "Josna Joshy",
    role: "SEO Executive",
    image: "/team/Josna.png",
  },
  {
    name: "Riti Shah",
    role: "Business Development Executive",
    image: "/team/riti.jpeg",
  },
  {
    name: "Pravallika",
    role: "Business Development Executive",
    image: "/team/pravallika.jpeg",
  },
   {
    name: "Vimala Varshini",
    role: "Digital Marketing Executive",
    image: "/team/varshini.jpeg",
  },
  {
    name: "Jitisha Bhutani",
    role: "Social Media Marketing Executive",
    image: "/team/Jitisha.jpeg",
  },
  {
    name: "Mehuli Debnath",
    role: "CRM Executive",
    image: "/team/mehuli.jpeg",
  },
  {
    name: "Chandni Jha",
    role: "CRM Executive",
    image: "/team/chandni.jpeg",
  },
   {
    name: "Archana Chandrashekar",
    role: "CRM Executive",
    image: "/team/archana.jpeg",
  },
  {
    name: "Samuel",
    role: "Performance Marketing Executive",
    image: "/team/samuel.jpeg",
  },
   {
    name: "Sundar Singh",
    role: "Graphic Designer",
    image: "/team/Sundar.jpeg",
  },
  {
    name: "Kesavarajaguru G. K.",
    role: "Video Editor",
    image: "/team/KRG.jpeg",
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
