"use client";
import { useState, useEffect } from "react";
import { api, clearStudentSession, type Student } from "@/lib/api";
import { StudentGuard } from "@/components/auth/StudentGuard";
import {
  GraduationCap, Eye, EyeOff, BookOpen, CheckCircle, Clock,
  XCircle, User, Award, LogOut, ChevronRight, Star, Shield,
  TrendingUp, Bell,
} from "lucide-react";

// ── Status & preference configs ──────────────────────────────────────────────
const STATUS_CONFIG = {
  ALLOCATED:   { label: "Allocated",   color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200", icon: CheckCircle },
  UNALLOCATED: { label: "Unallocated", color: "text-red-600",     bg: "bg-red-50",      border: "border-red-200",     icon: XCircle },
  PENDING:     { label: "Pending",     color: "text-amber-600",   bg: "bg-amber-50",    border: "border-amber-200",   icon: Clock },
} as const;

const PREF_STATUS = {
  ALLOCATED: { label: "Allocated ✓",  badge: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  REJECTED:  { label: "Not Allocated", badge: "bg-red-100 text-red-700 border-red-200" },
  PENDING:   { label: "Pending",       badge: "bg-amber-100 text-amber-700 border-amber-200" },
} as const;

const CAT_BADGE: Record<string, string> = {
  GENERAL: "bg-blue-100 text-blue-700",
  OBC:     "bg-green-100 text-green-700",
  SC:      "bg-amber-100 text-amber-700",
  ST:      "bg-purple-100 text-purple-700",
};

// ── Feature list for the login left-panel ──────────────────────────────────
const FEATURES = [
  {
    icon: TrendingUp,
    color: "bg-indigo-100 text-indigo-600",
    title: "Real-Time Allocation Status",
    desc: "See instantly whether you have been allocated to a course.",
  },
  {
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600",
    title: "Preference Outcomes",
    desc: "View the result for each of your course preferences (Priority 1, 2, 3).",
  },
  {
    icon: Star,
    color: "bg-amber-100 text-amber-600",
    title: "Merit-Based & Fair",
    desc: "Allocations are processed transparently based on marks and category.",
  },
  {
    icon: Shield,
    color: "bg-emerald-100 text-emerald-600",
    title: "Secure Student Portal",
    desc: "Your personal credentials keep your data safe and private.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// LOGIN FORM (premium design matching admin login)
// ═══════════════════════════════════════════════════════════════════════════
function LoginForm({ onSuccess }: { onSuccess: (token: string, student: Student, email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.studentLogin({ email: email.trim().toLowerCase(), password });
      if (res.student) {
        onSuccess(res.token, res.student, res.user.email);
      } else {
        setError("Login failed — student record not found.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f7fa" }}>
      {/* ─── Left Info Panel ───────────────────────────────────────────── */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-16 py-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "#312e81" }}
          >
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">GLOBAL TECH</p>
            <p className="font-bold text-gray-800 text-sm">UNIVERSITY</p>
            <p className="text-xs text-gray-400">Excellence in Education</p>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2 leading-tight">
          Student<br />Portal
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Log in to view your course allocation result, application status, and preference outcomes.
        </p>

        {/* Features */}
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

        {/* Decorative */}
        <div className="mt-12 flex items-center gap-3">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-purple-600" />
          </div>
        </div>
      </div>

      {/* ─── Right Login Panel ─────────────────────────────────────────── */}
      <div className="w-1/2 flex items-center justify-center px-16">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center relative">
                <User className="w-7 h-7 text-white" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-900 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Student Login</h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            Enter your credentials provided by the admissions office
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Student Email</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@university.edu"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
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

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200 flex items-center gap-2">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6 space-x-4">
            <a href="/student/signup" className="text-indigo-600 font-medium hover:underline">
              Register / Sign Up
            </a>
            <span className="text-gray-300">|</span>
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Admin Login →
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

// ═══════════════════════════════════════════════════════════════════════════
// STUDENT DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════════════════
function StudentDashboard({
  student,
  email,
  onLogout,
}: {
  student: Student;
  email: string;
  onLogout: () => void;
}) {
  const status = STATUS_CONFIG[student.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#312e81" }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">Student Portal</p>
              <p className="text-gray-400 text-xs">Course Allocation System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{student.name}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* ─── Welcome Banner ────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #312e81 0%, #4f46e5 100%)" }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-indigo-200 text-sm mb-1">Welcome back</p>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-indigo-300 text-sm mt-1">
                Applied on:{" "}
                {new Date(student.applicationDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${status.bg} ${status.border} border`}
            >
              <StatusIcon className={`w-5 h-5 ${status.color}`} />
              <span className={`font-semibold ${status.color}`}>{status.label}</span>
            </div>
          </div>
        </div>

        {/* ─── Info Cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: User,      label: "Student ID", value: student.id.slice(0, 8).toUpperCase(), color: "indigo" },
            { icon: Award,     label: "Marks",      value: `${student.marks}/100`,               color: "purple" },
            { icon: BookOpen,  label: "Category",   value: student.category,                     color: "green" },
            { icon: Bell,      label: "Status",     value: status.label,                         color: "orange" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className={`w-8 h-8 rounded-lg bg-${color}-50 flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 text-${color}-600`} />
              </div>
              <p className="text-xs text-gray-500 mb-0.5">{label}</p>
              <p className="font-semibold text-gray-900 text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* ─── Allocation Result ─────────────────────────────────────── */}
        {student.status === "ALLOCATED" && student.allocation && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-emerald-800 text-lg">🎉 Allocation Confirmed</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">
                  Allocated Course
                </p>
                <p className="text-emerald-900 font-bold text-2xl">{student.allocation.course.name}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">
                    Preference
                  </p>
                  <p className="text-emerald-900 font-semibold">
                    {student.allocation.preference?.priority
                      ? `Priority ${student.allocation.preference.priority}${
                          student.allocation.preference.priority === 1 ? " (First Choice 🎉)" : ""
                        }`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">
                    Admitted Under Category
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      CAT_BADGE[student.allocation.allocatedCategory] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {student.allocation.allocatedCategory}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-emerald-600 text-xs mt-4">
              Allocation date:{" "}
              {new Date(student.allocation.allocationDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}

        {student.status === "UNALLOCATED" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-red-800">Not Allocated</h3>
            </div>
            <p className="text-red-700 text-sm">
              Unfortunately, no seats were available in any of your preferred courses. Please contact
              the admissions office for further assistance.
            </p>
          </div>
        )}

        {student.status === "PENDING" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-800">Allocation Pending</h3>
            </div>
            <p className="text-amber-700 text-sm">
              The allocation process hasn&apos;t been run yet. Your application has been received.
              Please check back later.
            </p>
          </div>
        )}

        {/* ─── Course Preferences ────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Your Course Preferences
          </h3>
          <div className="flex flex-col gap-3">
            {student.preferences.length === 0 ? (
              <p className="text-gray-400 text-sm">No preferences recorded.</p>
            ) : (
              student.preferences.map((pref) => {
                const ps =
                  PREF_STATUS[pref.status as keyof typeof PREF_STATUS] ?? PREF_STATUS.PENDING;
                return (
                  <div
                    key={pref.priority}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                        {pref.priority}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{pref.course.name}</p>
                        <p className="text-gray-500 text-xs">Priority {pref.priority}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold border ${ps.badge}`}
                    >
                      {ps.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE — orchestrates login → guard → dashboard
// ═══════════════════════════════════════════════════════════════════════════
export default function StudentPortalPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [email, setEmail] = useState("");
  // "init" while we check localStorage, "login" show login form, "dashboard" show dashboard
  const [view, setView] = useState<"init" | "login" | "dashboard">("init");

  // On first load, check if there's already a student_token → show guard → dashboard
  useEffect(() => {
    const token = localStorage.getItem("student_token");
    const cachedEmail = localStorage.getItem("student_email");
    if (token) {
      setEmail(cachedEmail ?? "");
      setView("dashboard"); // StudentGuard will validate the token
    } else {
      setView("login");
    }
  }, []);

  const handleLoginSuccess = (token: string, s: Student, userEmail: string) => {
    import("@/lib/api").then(({ setStudentSession }) => {
      setStudentSession(token, userEmail);
    });
    setStudent(s);
    setEmail(userEmail);
    setView("dashboard");
  };

  const handleLogout = () => {
    clearStudentSession();
    setStudent(null);
    setEmail("");
    setView("login");
  };

  if (view === "init") return null; // avoid flash

  if (view === "login") {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  // Dashboard view — wrapped in StudentGuard for real JWT validation
  return (
    <StudentGuard onUnauthorized={() => setView("login")}>
      {student ? (
        <StudentDashboard student={student} email={email} onLogout={handleLogout} />
      ) : (
        // Guard authorized but no cached student obj → fetch it
        <StudentDashboardLoader email={email} onLogout={handleLogout} />
      )}
    </StudentGuard>
  );
}

/**
 * Used when the student session is restored from localStorage (token exists but
 * student object isn't in state). Re-fetches from API to avoid stale data.
 * On any auth error (401/403) → calls onLogout() which shows the student login form.
 */
function StudentDashboardLoader({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getStudentProfile()
      .then(setStudent)
      .catch((err: Error) => {
        // On session expired or auth error → go back to student login form
        const isAuthError =
          err.message.includes("expired") ||
          err.message.includes("session") ||
          err.message.includes("permission") ||
          err.message.includes("Authentication");
        if (isAuthError) {
          onLogout(); // shows the student login form, NOT the admin login page
        } else {
          setError("Failed to load your profile. Please try again.");
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading your profile…</p>
        </div>
      </div>
    );
  }

  return <StudentDashboard student={student} email={email} onLogout={onLogout} />;
}
