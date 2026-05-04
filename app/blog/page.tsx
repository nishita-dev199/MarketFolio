import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore insights on SEO, paid media, analytics, and digital growth strategy.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col flex-1 w-full font-sans bg-background">
      <main className="flex flex-1 w-full flex-col items-center">
        <section className="w-full pt-12 pb-8 px-6">
          <div className="mx-auto max-w-7xl text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full float-sm text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
              Insights
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-black leading-[1.05] mb-4">
              Blog
            </h1>
            <p className="text-zinc-600 text-base md:text-lg font-medium max-w-2xl mx-auto">
              Practical ideas on performance marketing, SEO, and growth systems.
            </p>
          </div>
        </section>

        <section className="w-full pb-20 px-6">
          <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-3xl border border-zinc-200/80 p-7 md:p-8 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">
                  {post.category}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-black mb-3 group-hover:underline underline-offset-4">
                  {post.title}
                </h2>
                <p className="text-zinc-600 font-medium text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 font-medium">{formatDate(post.date)}</span>
                  <span className="font-black text-black group-hover:translate-x-0.5 transition-transform">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
