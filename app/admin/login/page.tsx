"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiEye, FiEyeOff, FiUser } from "react-icons/fi";

export default function AdminLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Handle Sign Up
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to sign up");
          setLoading(false);
          return;
        }

        toast.success("Account created successfully! Please sign in.");
        setIsSignUp(false);
        setPassword("");
      } else {
        // Handle Sign In
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          toast.error(res.error);
        } else {
          // Check user role
          const session = await getSession();
          const role = (session?.user as { role?: string })?.role;

          if (role !== "admin" && role !== "superadmin") {
            toast.error("You are not an admin");
            router.push("/");
          } else {
            toast.success("Login successful");
            window.location.href = "/admin";
          }
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0914] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full bg-[#161427]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 relative z-10 shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-indigo-200/60 text-sm">Secure access for authorized personnel only.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Toggle Tabs */}
          <div className="flex rounded-xl bg-[#0B0914]/50 p-1 border border-white/5">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                !isSignUp 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25" 
                  : "text-indigo-200/60 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                isSignUp 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25" 
                  : "text-indigo-200/60 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-indigo-200/80 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50">
                  <FiUser />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-indigo-200/80 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50">
                <FiMail />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                placeholder="user@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-200/80 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50">
                <FiLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0B0914]/50 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-indigo-200/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-300/50 hover:text-white focus:outline-none transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-lg shadow-purple-500/25"
          >
            {loading ? (isSignUp ? "Creating Account..." : "Authenticating...") : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </form>
      </div>
    </div>
  );
}
