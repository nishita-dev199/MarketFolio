"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
}

export default function AdminBlogsDashboard() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(() => {
    setLoading(true);
    setRefreshCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (!ignore) {
          setBlogs(data);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error("Failed to load blogs");
          setLoading(false);
        }
      }
    };

    loadBlogs();
    return () => {
      ignore = true;
    };
  }, [refreshCount]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0914] text-white p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Blog Manager</h1>
            <p className="text-indigo-200/60">Create, edit, and manage your blog posts.</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/admin"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161427]/80 backdrop-blur-md border border-white/5 hover:bg-white/5 transition-all text-sm font-medium shadow-lg"
            >
              Back to Dashboard
            </Link>
            <Link 
              href="/admin/blogs/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-sm font-medium shadow-lg shadow-purple-500/25"
            >
              <FiPlus /> New Post
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-[#161427]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-12 text-center shadow-2xl">
            <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-400 mb-4">
              <FiFileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No blog posts found</h3>
            <p className="text-indigo-200/60 mb-6">You haven&apos;t created any posts yet. Start writing your first blog!</p>
            <Link 
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-sm font-medium"
            >
              <FiPlus /> Create First Post
            </Link>
          </div>
        ) : (
          <div className="bg-[#161427]/80 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-indigo-200/60 text-sm">
                    <th className="py-4 px-6 font-medium">Title</th>
                    <th className="py-4 px-6 font-medium">Category</th>
                    <th className="py-4 px-6 font-medium">Date</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">{blog.title}</div>
                        <div className="text-xs text-indigo-200/40 mt-1">/{blog.slug}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                          {blog.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-indigo-200/60">
                        {blog.date}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/blogs/${blog._id}`}
                            className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </Link>
                          <button 
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
