"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, XCircle, CheckCircle, GraduationCap as Cap2 } from "lucide-react";
import { api, type Course } from "@/lib/api";

const CATEGORIES = ["GENERAL", "OBC", "SC", "ST"] as const;

export default function StudentSignupPage() {
  const router = useRouter();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [marks, setMarks] = useState<number | "">("");
  const [category, setCategory] = useState<"GENERAL" | "OBC" | "SC" | "ST">("GENERAL");
  
  const [pref1, setPref1] = useState("");
  const [pref2, setPref2] = useState("");
  const [pref3, setPref3] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getCourses()
      .then((data) => setCourses(data))
      .catch((err) => setError("Failed to load courses. Please try again later."))
      .finally(() => setLoadingCourses(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Build preferences array (filter out empty ones)
    const preferences = [pref1, pref2, pref3].filter(Boolean);
    if (preferences.length === 0) {
      setError("Please select at least one course preference.");
      return;
    }

    if (new Set(preferences).size !== preferences.length) {
      setError("You cannot select the same course multiple times.");
      return;
    }
    
    if (marks === "" || marks < 0 || marks > 100) {
      setError("Please enter valid marks between 0 and 100.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.studentSignup({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        marks: Number(marks),
        category,
        preferences,
      });

      if (res.token && res.student) {
        import("@/lib/api").then(({ setStudentSession }) => {
          setStudentSession(res.token, res.user.email);
          router.push("/student");
        });
      } else {
        setError("Account created, but automatic login failed. Please go to login.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#f5f7fa" }}>
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Info */}
        <div className="w-full md:w-5/12 bg-indigo-900 text-white p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center">
                <Cap2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm tracking-widest">GLOBAL TECH</p>
                <p className="text-xs text-indigo-300">UNIVERSITY</p>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">Begin Your<br/>Journey</h1>
            <p className="text-indigo-200 text-sm leading-relaxed mb-8">
              Apply for your desired courses in minutes. Our AI-driven allocation system ensures a fair, transparent, and merit-based admission process for every student.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-indigo-100">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Fair & merit-based allocation
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-100">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Real-time tracking
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-100">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Secure student dashboard
              </li>
            </ul>
          </div>
          
          <div className="mt-12 text-sm text-indigo-300 border-t border-indigo-700 pt-6">
            Already have an account?{" "}
            <a href="/student" className="text-white font-medium hover:underline">
              Sign In →
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Registration</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-200 flex items-center gap-2 mb-6">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white appearance-none"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Marks */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Entrance Marks (Out of 100)</label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value === "" ? "" : Number(e.target.value))}
                required
                min={0}
                max={100}
                step={0.1}
                placeholder="e.g. 85.5"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Preferences */}
            <div className="pt-4 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Course Preferences (Priority 1 to 3)</label>
              
              {loadingCourses ? (
                <div className="text-sm text-gray-400 py-2 animate-pulse">Loading available courses...</div>
              ) : (
                <div className="space-y-3">
                  <select
                    value={pref1}
                    onChange={(e) => setPref1(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="">-- Select Priority 1 (Required) --</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id} disabled={pref2 === c.id || pref3 === c.id}>{c.name}</option>
                    ))}
                  </select>

                  <select
                    value={pref2}
                    onChange={(e) => setPref2(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="">-- Select Priority 2 (Optional) --</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id} disabled={pref1 === c.id || pref3 === c.id}>{c.name}</option>
                    ))}
                  </select>

                  <select
                    value={pref3}
                    onChange={(e) => setPref3(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="">-- Select Priority 3 (Optional) --</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id} disabled={pref1 === c.id || pref2 === c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading || loadingCourses}
                className="w-full bg-indigo-600 text-white rounded-xl py-4 font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account…
                  </>
                ) : (
                  <>
                    Create Student Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
