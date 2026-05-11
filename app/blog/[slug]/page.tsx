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
      title: post.metaTitle || `${post.title} | Evander Digital`,
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


  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-background">
      <article className="flex flex-1 w-full flex-col items-center">
        <header className="w-full bg-[#0B0914] text-white relative overflow-hidden -mt-[110px] pt-[110px] min-h-[600px] flex items-center justify-center">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[50%] h-full bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl w-full mx-auto px-6 py-20 md:py-32 relative z-20">
            <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${post.image && post.image.trim() !== "" ? 'lg:items-center text-center lg:text-left' : 'text-center'}`}>
              <div className={`flex-1 w-full ${post.image && post.image.trim() !== "" ? 'max-w-2xl' : 'max-w-4xl mx-auto'}`}>
                <nav aria-label="Breadcrumb" className={`text-sm text-zinc-400 mb-8 flex items-center gap-2 font-medium ${post.image && post.image.trim() !== "" ? 'justify-center lg:justify-start' : 'justify-center'}`}>
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
                
                <p className={`text-base md:text-lg text-zinc-400 font-medium leading-relaxed mb-10 ${post.image && post.image.trim() !== "" ? '' : 'mx-auto'}`}>
                  {post.excerpt}
                </p>

                <div className={`flex items-center gap-6 text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-widest ${post.image && post.image.trim() !== "" ? 'justify-center lg:justify-start' : 'justify-center'}`}>
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

              {post.image && post.image.trim() !== "" && (
                <div className="flex-1 w-full max-w-lg lg:mt-12 relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 aspect-square sm:aspect-video lg:aspect-[4/5]">
                    <BlogImage 
                      src={post.image} 
                      alt={post.imageAlt || post.title} 
                      className="w-full h-full object-cover group-hover:scale-105"
                      grayscale={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-transparent opacity-60"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-28 overflow-hidden">
          <div 
            className="blog-content w-full"
            dangerouslySetInnerHTML={{ __html: post.content }}
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
      </article>
    </div>
  );
}

