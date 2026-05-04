import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug, getAllPostSlugs } from "@/lib/content/blog";
import CtaSection from "@/components/sections/CtaSection";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Evander Digital`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
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
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-background">
      <article className="flex flex-1 w-full flex-col items-center">
        <header className="w-full bg-black text-white relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-35"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(59,130,246,0.4), transparent 55%), radial-gradient(ellipse 45% 40% at 95% 30%, rgba(168,85,247,0.3), transparent 50%)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/80 to-black" />
          <div className="max-w-3xl w-full mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
            <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-10">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-zinc-200 font-medium line-clamp-1 max-w-48 sm:max-w-none">
                  {post.title}
                </li>
              </ol>
            </nav>

            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">
              {post.category}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter leading-[1.08] mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-zinc-300 font-medium leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400 font-medium">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="w-full max-w-3xl mx-auto px-6 py-14 md:py-20">
          <div className="max-w-none">
            {post.sections.map((block, i) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={`p-${i}`}
                    className="text-zinc-600 font-medium leading-relaxed text-base md:text-lg mb-6 last:mb-0"
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === "heading") {
                return (
                  <h2
                    key={`h-${i}`}
                    className="text-2xl md:text-3xl font-medium tracking-tighter text-black mt-12 mb-4 first:mt-0"
                  >
                    {block.text}
                  </h2>
                );
              }

              return (
                <ul key={`l-${i}`} className="list-none space-y-3 my-8 pl-0">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-zinc-600 font-medium leading-relaxed"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>

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

        {related.length > 0 ? (
          <section className="w-full bg-zinc-50 py-16 md:py-20 px-6 border-t border-zinc-200/80">
            <div className="max-w-7xl w-full mx-auto">
              <h2 className="text-2xl font-medium tracking-tighter text-black mb-8">
                Keep reading
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((p) => (
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
