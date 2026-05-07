"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import react-quill-new to avoid SSR issues and React 19 compatibility
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function BlogEditor({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const isNew = params.id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    readTime: "5 min read",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    image: "",
    imageAlt: "",
  });

  useEffect(() => {
    let ignore = false;
    if (isNew) return;

    const loadBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        if (!ignore) {
          setFormData({
            title: data.title,
            slug: data.slug,
            category: data.category,
            readTime: data.readTime,
            date: data.date,
            excerpt: data.excerpt,
            content: data.content,
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            keywords: data.keywords || "",
            image: data.image || "",
            imageAlt: data.imageAlt || "",
          });
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error("Failed to load blog post");
          router.push("/admin/blogs");
        }
      }
    };

    loadBlog();
    return () => {
      ignore = true;
    };
  }, [isNew, params.id, router]);

  const generateSlug = () => {
    if (!formData.title) return;
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    // Auto-populate SEO fields if they are empty
    setFormData(prev => ({ 
      ...prev, 
      slug,
      metaTitle: prev.metaTitle || prev.title,
      metaDescription: prev.metaDescription || prev.excerpt
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? "/api/blogs" : `/api/blogs/${params.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save blog");
      }

      toast.success(isNew ? "Blog created successfully!" : "Blog updated successfully!");
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save blog post";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0914] flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-[#0B0914] text-white p-8 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              {isNew ? "Create New Blog Post" : "Edit Blog Post"}
            </h1>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/admin/blogs"
              className="px-5 py-2.5 rounded-xl bg-[#161427]/80 backdrop-blur-md border border-white/5 hover:bg-white/5 transition-all text-sm font-medium shadow-lg"
            >
              Cancel
            </Link>
            <button 
              onClick={handleSubmit}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-sm font-medium shadow-lg shadow-purple-500/25 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>

        <div className="bg-[#161427]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-200/80 mb-2">Blog Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  onBlur={isNew ? generateSlug : undefined}
                  required
                  className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200/80 mb-2">Custom URL</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="url-friendly-slug"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200/80 mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="e.g. SEO, Analytics"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200/80 mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    required
                    className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="5 min read"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200/80 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200/80 mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                rows={3}
                className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                placeholder="A short summary of the blog post..."
              />
            </div>

            {/* SEO Section */}
            <div className="border-t border-white/5 pt-8 mt-8">
              <h3 className="text-xl font-bold text-white mb-6">SEO & Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-200/80 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="SEO title (defaults to Blog Title)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200/80 mb-2">Focus Keywords</label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="e.g. SEO, Growth, Marketing"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-indigo-200/80 mb-2">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={2}
                    className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="SEO description (defaults to Excerpt)"
                  />
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="border-t border-white/5 pt-8 mt-8">
              <h3 className="text-xl font-bold text-white mb-6">Featured Image</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-200/80 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {formData.image && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-white/5 aspect-video relative group">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/161427/white?text=Invalid+Image+URL';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Image Preview</span>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200/80 mb-2">Image Alt Text</label>
                  <input
                    type="text"
                    value={formData.imageAlt}
                    onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                    className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="Descriptive text for the image"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200/80 mb-2">Content</label>
              <div className="bg-white rounded-xl overflow-hidden text-black pb-12">
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={(val) => setFormData({ ...formData, content: val })} 
                  modules={quillModules}
                  className="h-96"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
