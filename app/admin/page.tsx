import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiLogOut, FiHome, FiTrendingUp, FiMessageSquare, FiActivity } from "react-icons/fi";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0914] text-white p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Dashboard</h1>
            <p className="text-indigo-200/60">Welcome back, {session?.user?.name || 'Admin'}</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161427]/80 backdrop-blur-md border border-white/5 hover:bg-white/5 transition-all text-sm font-medium shadow-lg"
            >
              <FiHome className="text-indigo-300" /> View Site
            </Link>
            <Link 
              href="/api/auth/signout"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-sm font-medium shadow-lg shadow-purple-500/25"
            >
              <FiLogOut /> Sign Out
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/blogs" className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-3xl">
            <div className="bg-[#161427]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-2xl hover:border-purple-500/30 transition-all group h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-white">Manage Blogs</h2>
              </div>
              <p className="text-indigo-200/60 text-sm leading-relaxed mb-4">Create, edit, and publish blog posts to the Growth Gallery.</p>
              <div className="flex items-center text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Open Manager →
              </div>
            </div>
          </Link>
          
          <div className="bg-[#161427]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-2xl hover:border-purple-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                <FiMessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-white">Recent Inquiries</h2>
            </div>
            <p className="text-indigo-200/60 text-sm leading-relaxed">Form submissions and new messages will appear here.</p>
          </div>
          
          <div className="bg-[#161427]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-2xl hover:border-purple-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                <FiActivity className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-white">System Status</h2>
            </div>
            <p className="text-indigo-200/60 text-sm leading-relaxed">All backend services and database connections are fully operational.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
