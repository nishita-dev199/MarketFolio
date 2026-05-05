import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiLogOut, FiHome } from "react-icons/fi";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-2">Welcome back, Admin</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-colors"
            >
              <FiHome /> View Site
            </Link>
            <Link 
              href="/api/auth/signout"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
            >
              <FiLogOut /> Sign Out
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <p className="text-zinc-400 text-sm">Dashboard content goes here.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
            <p className="text-zinc-400 text-sm">Form submissions will appear here.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <p className="text-zinc-400 text-sm">All systems operational.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
