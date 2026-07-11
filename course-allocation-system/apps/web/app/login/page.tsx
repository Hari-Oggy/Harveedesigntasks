"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GraduationCap, Brain, Users, BarChart3, Shield } from "lucide-react";
import { api, getAdminToken, setAdminSession } from "@/lib/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // If already logged in as admin, go straight to dashboard
  useEffect(() => {
    const token = getAdminToken();
    if (token) {
      api.verifyToken(token).then((result) => {
        if (result.valid && result.role === "ADMIN") {
          router.replace("/dashboard");
        }
      }).catch(() => {/* ignore */});
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.adminLogin({ email: email.trim().toLowerCase(), password });
      setAdminSession(res.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const FEATURES = [
    { icon: Brain,    color: "bg-blue-100 text-blue-600",  title: "AI Driven Allocation",  desc: "Intelligent allocation based on multiple factors and preferences." },
    { icon: Users,    color: "bg-green-100 text-green-600", title: "Fair & Transparent",    desc: "Merit-based allocation with full adherence to reservation rules." },
    { icon: BarChart3,color: "bg-purple-100 text-purple-600",title: "Real-time Insights",  desc: "Get real-time reports and analytics for better decision making." },
    { icon: Shield,   color: "bg-orange-100 text-orange-600",title: "Secure & Reliable",   desc: "Your data is secure with role-based access and advanced security." },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f7fa" }}>
      {/* Left Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-16 py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center" style={{ background: "#0f1f3d" }}>
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">GLOBAL TECH</p>
            <p className="font-bold text-gray-800 text-sm">UNIVERSITY</p>
            <p className="text-xs text-gray-400">Excellence in Education</p>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2 leading-tight">
          AI-Powered<br />Course Allocation System
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          A smart and fair way to allocate courses based on merit, preferences, and reservation policies.
        </p>

        <div className="space-y-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Illustration area */}
        <div className="mt-12 flex items-center gap-2 text-blue-500">
          <GraduationCap className="w-8 h-8" />
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex items-center justify-center px-16">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center relative">
                <Users className="w-7 h-7 text-white" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome Back!</h2>
          <p className="text-gray-400 text-sm text-center mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email ID</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button type="button" className="text-sm text-blue-600 hover:underline">Forgot Password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : <><span>→</span> Login</>}
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-gray-200 flex-1" />
              <span className="px-3 text-xs text-gray-400 bg-white">OR</span>
              <div className="border-t border-gray-200 flex-1" />
            </div>

            <button
              type="button"
              className="w-full border-2 border-blue-600 text-blue-600 rounded-xl py-3 font-semibold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              🔐 Login with SSO
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Are you a student?{" "}
            <a href="/student" className="text-blue-600 font-medium hover:underline">
              Student Portal →
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-gray-400">© 2025 Global Tech University. All rights reserved.</p>
      </div>
    </div>
  );
}
