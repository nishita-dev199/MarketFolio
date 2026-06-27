import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "@/components/sections/CtaSection";
import BlogImage from "@/components/ui/BlogImage";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const post = await Blog.findOne({ slug }).lean();
  
  if (!post) return { title: "Blog" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle || `${post.title} | MarketFolio`,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [
        {
          url: post.image,
          alt: post.imageAlt || post.title,
        }
      ] : [],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}



export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  await dbConnect();
  
  const post = await Blog.findOne({ slug }).lean();
  if (!post) notFound();

  const relatedPosts = await Blog.find({ slug: { $ne: slug } }).limit(2).lean();


  const hasImage = post.image && post.image.trim() !== "";

  // Remove the duplicated title heading from the rich text content if it exists at the start
  let cleanContent = post.content || "";
  const firstHeadingMatch = cleanContent.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/i);
  if (firstHeadingMatch && cleanContent.indexOf(firstHeadingMatch[0]) < 200) {
    const headingText = firstHeadingMatch[1].replace(/<[^>]+>/g, '').trim();
    if (headingText === post.title.trim() || headingText.includes(post.title.trim()) || post.title.trim().includes(headingText)) {
      cleanContent = cleanContent.replace(firstHeadingMatch[0], '');
    }
  }

  return (
    <div className={`flex flex-col flex-1 w-full font-sans ${hasImage ? '' : 'bg-background'}`}>
      <article className="flex flex-1 w-full flex-col items-center relative">
        {hasImage ? (
          <>
            {/* Parallax Wrapper */}
            <div className="relative w-full bg-gradient-to-b from-zinc-50 to-zinc-200/80">
              
              {/* Sticky Image Background */}
              <div className="sticky top-[60px] w-full z-0 pt-6 pb-10 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-24 px-4 sm:px-8 lg:px-12 flex justify-center">
                <BlogImage 
                  src={post.image!} 
                  alt={post.imageAlt || post.title} 
                  className="w-full max-w-7xl h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                  grayscale={false}
                />
              </div>

              {/* Main Content Area */}
              <div className="relative z-10 w-full bg-white rounded-t-[2rem] sm:rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden border-t border-black/5 flex flex-col -mt-4 sm:-mt-8 lg:-mt-12">
                
                {/* Header Section */}
                <div className="bg-gray-100 text-black px-6 pt-12 pb-16 md:px-16 md:pt-16 md:pb-20 text-center relative overflow-hidden">
                  <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-zinc-500 mb-6 flex items-center justify-center gap-2 font-medium tracking-wide">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span className="text-zinc-400">/</span>
                    <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
                    <span className="text-zinc-400">/</span>
                    <span className="text-zinc-800 truncate max-w-[150px] sm:max-w-[300px]">{post.title}</span>
                  </nav>

                  <div className="flex flex-col items-center justify-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 text-blue-600 border border-black/10 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm backdrop-blur-md">
                      {post.category}
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter leading-[1.15] mb-6 text-black drop-shadow-sm max-w-4xl mx-auto">
                      {post.title}
                    </h1>
                    
                    <p className="text-base md:text-xl text-zinc-600 font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-center mt-2">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 px-6 py-3 bg-white/50 rounded-full border border-black/5 backdrop-blur-md shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-black">MarketFolio Team</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 hidden sm:block"></span>
                        <span className="text-xs sm:text-sm font-medium text-zinc-500">{formatDate(post.date)}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 hidden sm:block"></span>
                        <span className="text-xs sm:text-sm font-medium text-zinc-500 flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* White Content Section */}
                <div className="bg-white px-6 pt-12 pb-16 md:px-16 md:pt-16 md:pb-24">
                  <div 
                    className="blog-content w-full max-w-3xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />

                  <div className="mt-14 pt-10 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 max-w-3xl mx-auto">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm font-black text-black hover:underline underline-offset-4"
                    >
                      ← Back to blog
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex justify-center items-center float-dark text-white px-8 py-4 rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform text-sm"
                    >
                      Talk to us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Posts and CTA */}
              <div className="w-full relative z-10 bg-zinc-50">
                {relatedPosts.length > 0 ? (
                  <section className="w-full py-16 md:py-20 px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                      <h2 className="text-2xl font-medium tracking-tighter text-black mb-8">
                        Keep reading
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedPosts.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/blog/${p.slug}`}
                            className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 bg-white border border-zinc-200/80 p-8 h-full transition-all hover:-translate-y-0.5 hover:shadow-lg float-sm"
                          >
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">
                              {p.category}
                            </p>
                            <h3 className="text-xl font-medium tracking-tight text-black mb-3 group-hover:underline underline-offset-4">
                              {p.title}
                            </h3>
                            <p className="text-zinc-600 font-medium text-sm leading-relaxed line-clamp-2">
                              {p.excerpt}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : null}

                <CtaSection />
              </div>
            </div>
          </>
        ) : (
          <>
            <header className="w-full bg-[#0B0914] text-white relative overflow-hidden -mt-[110px] pt-[110px] min-h-[600px] flex items-center justify-center">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-[50%] h-full bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

              <div className="max-w-7xl w-full mx-auto px-6 py-20 md:py-32 relative z-20">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center text-center">
                  <div className="flex-1 w-full max-w-4xl mx-auto">
                    <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-8 flex items-center gap-2 font-medium justify-center">
                      <Link href="/" className="hover:text-white transition-colors">Home</Link>
                      <span className="text-zinc-600">/</span>
                      <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                      <span className="text-zinc-600">/</span>
                      <span className="text-zinc-200 truncate max-w-[150px] sm:max-w-[300px]">{post.title}</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                      {post.category}
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-8 text-white drop-shadow-2xl">
                      {post.title}
                    </h1>
                    
                    <p className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed mb-10 mx-auto">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-center gap-6 text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-[1px] bg-zinc-800"></span>
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-[1px] bg-zinc-800"></span>
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-28 bg-background relative z-10">
              <div 
                className="blog-content w-full"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />

              <div className="mt-14 pt-10 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-black text-black hover:underline underline-offset-4"
                >
                  ← Back to blog
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex justify-center items-center float-dark text-white px-8 py-4 rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform text-sm"
                >
                  Talk to us
                </Link>
              </div>
            </div>

            <div className="w-full bg-background relative z-10">
              {relatedPosts.length > 0 ? (
                <section className="w-full bg-zinc-50 py-16 md:py-20 px-6 border-t border-zinc-200/80">
                  <div className="max-w-7xl w-full mx-auto">
                    <h2 className="text-2xl font-medium tracking-tighter text-black mb-8">
                      Keep reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedPosts.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/blog/${p.slug}`}
                          className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 bg-white border border-zinc-200/80 p-8 h-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">
                            {p.category}
                          </p>
                          <h3 className="text-xl font-medium tracking-tight text-black mb-3 group-hover:underline underline-offset-4">
                            {p.title}
                          </h3>
                          <p className="text-zinc-600 font-medium text-sm leading-relaxed line-clamp-2">
                            {p.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              ) : null}

              <CtaSection />
            </div>
          </>
        )}
      </article>
    </div>
  );
}

