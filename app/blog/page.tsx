import Link from "next/link";
import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore insights on SEO, paid media, analytics, and digital growth strategy.",
};

const POST_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  await dbConnect();
  const rawPosts = await Blog.find({}).sort({ date: -1 }).lean();
  
  // Convert _id to string to pass to client components
  const sortedPosts = rawPosts.map((post) => ({
    ...post,
    _id: post._id.toString(),
  }));

  const featuredPost = sortedPosts[0];
  const regularPosts = sortedPosts.slice(1);

  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-[var(--background)]">
      <main className="flex flex-1 w-full flex-col items-center">
        
        {/* Parallax Header */}
        <section className="w-full relative overflow-hidden pt-16 pb-12 flex flex-col items-center text-center px-6 bg-[var(--background)]">
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

          <div className="max-w-4xl relative z-10 mx-auto flex flex-col items-center">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                Insights & Strategy
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delayMs={60}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-black leading-[1.1] mb-6">
                The Growth Gallery.
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delayMs={120}>
              <p className="text-base md:text-lg text-zinc-600 max-w-2xl leading-relaxed font-medium">
                Our blog brings you the latest in marketing, strategy, and growth.
                Designed to inspire ideas and drive real impact.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Blog Gallery Section */}
        <section className="w-full pb-32 px-4 md:px-6 bg-zinc-50 flex flex-col items-center pt-16">
          <div className="mx-auto max-w-7xl w-full perspective-1000 flex flex-col gap-8 md:gap-12">
            
            {/* Featured Post (Gallery Style) */}
            {featuredPost && (
              <RevealOnScroll>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                >
                  <div
                    className="float-dark rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 group-hover:scale-[1.02] transition-all duration-500 overflow-hidden w-full relative"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Featured Image Background */}
                    {featuredPost.image && (
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={featuredPost.image}
                          alt={featuredPost.imageAlt || featuredPost.title}
                          className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161427] via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col items-start w-full relative z-10">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                        {featuredPost.category}
                      </div>
                      
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.1] group-hover:underline underline-offset-8 transition-all duration-500 drop-shadow-md">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-zinc-300 font-medium text-base md:text-lg leading-relaxed mb-10 max-w-xl group-hover:text-white transition-colors duration-500 drop-shadow">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="w-full border-t border-white/20 pt-6 flex items-center justify-between text-sm mt-auto group-hover:border-white/40 transition-colors">
                        <span className="text-zinc-400 font-medium">{formatDate(featuredPost.date)}</span>
                        <span className="font-black text-white flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            →
                          </span>
                          <span className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 drop-shadow">
                            Read Article
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            )}

            {/* Standard Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => {
                // Make the first item in the grid span 2 columns on tablet/desktop if we want a varied gallery look
                const isLargeCard = index === 0;

                // Select a consistent image for this post based on its index
                const imageUrl = POST_IMAGES[index % POST_IMAGES.length];
                // Apply teardrop border to diagonal/opposite cards
                const hasTeardrop = index === 0 || index === 1;
                
                return (
                  <RevealOnScroll key={post.slug} delayMs={index * 100} className={isLargeCard ? "md:col-span-2 lg:col-span-2" : ""}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                    >
                      <div
                        className={`float-lg rounded-[2.5rem] flex flex-col bg-white group-hover:scale-[1.02] transition-all duration-500 overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] h-full relative ${isLargeCard ? 'min-h-[500px]' : 'min-h-[450px]'} ${hasTeardrop ? 'teardrop-border' : ''}`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Image Section */}
                        <div className={`relative w-full overflow-hidden ${isLargeCard ? 'h-[300px]' : 'h-[200px]'}`}>
                          <img 
                            src={post.image || imageUrl}
                            alt={post.imageAlt || ""}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                          <div className="absolute top-6 left-6 relative z-20">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-purple-600 transition-colors duration-500">
                              {post.category}
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="relative z-20 flex flex-col p-8 md:p-10 flex-1">
                          <h2 className={`font-black tracking-tight text-black mb-4 group-hover:text-purple-600 transition-all duration-500 ${isLargeCard ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                            {post.title}
                          </h2>
                          
                          <p className={`text-zinc-600 font-medium leading-relaxed mb-8 flex-1 group-hover:text-black transition-colors duration-500 ${isLargeCard ? 'text-base md:text-lg max-w-2xl' : 'text-sm'}`}>
                            {post.excerpt}
                          </p>
                          
                          <div className="w-full border-t border-zinc-200/60 pt-6 flex items-center justify-between text-sm mt-auto group-hover:border-purple-200 transition-colors">
                            <span className="text-zinc-500 font-medium group-hover:text-zinc-800 transition-colors">{formatDate(post.date)}</span>
                            <span className="font-black text-black opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 drop-shadow-sm flex items-center gap-2">
                              Read Article <span className="text-purple-600">→</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </RevealOnScroll>
                );
              })}
            </div>

          </div>
        </section>
        
      </main>
    </div>
  );
}
