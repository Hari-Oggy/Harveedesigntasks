const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

/**
 * Core fetcher — auto-attaches Bearer token from localStorage.
 * On 401: redirects to the correct login page based on which session was active.
 *   - Student session expired → /student  (their login page)
 *   - Admin session expired  → /login     (admin login page)
 * On 403: throws a "permission denied" error for the component to handle.
 */
async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  let isStudentCall = false;
  if (typeof window !== "undefined") {
    const adminToken = localStorage.getItem("admin_token");
    const studentToken = localStorage.getItem("student_token");
    
    // If we are on the student portal, prioritize student token. Otherwise prioritize admin token.
    const isStudentPortal = window.location.pathname.startsWith("/student");
    
    if (isStudentPortal && studentToken) {
      headers["Authorization"] = `Bearer ${studentToken}`;
      isStudentCall = true;
    } else if (!isStudentPortal && adminToken) {
      headers["Authorization"] = `Bearer ${adminToken}`;
    } else if (adminToken) {
      // Fallback
      headers["Authorization"] = `Bearer ${adminToken}`;
    } else if (studentToken) {
      // Fallback
      headers["Authorization"] = `Bearer ${studentToken}`;
      isStudentCall = true;
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, { headers, ...options });

  // Handle auth errors — redirect to the right login page
  if (res.status === 401) {
    // If the 401 is from a login attempt (invalid credentials), just throw the error, don't redirect
    if (path.includes("/login")) {
      const data = await res.json();
      throw new Error(data.message ?? "Invalid credentials");
    }

    if (typeof window !== "undefined") {
      if (isStudentCall) {
        clearStudentSession();
        // Don't navigate — let the StudentGuard / component handle this
        // by throwing, so the component can show its own login form
        throw new Error("Student session expired — please log in again.");
      } else {
        clearAdminSession();
        window.location.href = "/login";
        throw new Error("Session expired — please log in again.");
      }
    }
    throw new Error("Session expired — please log in again.");
  }

  if (res.status === 403) {
    throw new Error("You do not have permission to perform this action.");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "API Error");
  return data.data as T;
}

// ── Session helpers ────────────────────────────────────────────────────────
export function setAdminSession(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_token", token);
  // Sync to cookie for Next.js middleware
  document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Strict`;
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
  localStorage.removeItem("token");
  // Clear cookie
  document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function setStudentSession(token: string, email: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("student_token", token);
  localStorage.setItem("student_email", email);
  // Sync to cookie
  document.cookie = `student_token=${token}; path=/; max-age=86400; SameSite=Strict`;
}

export function clearStudentSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("student_token");
  localStorage.removeItem("student_data");
  localStorage.removeItem("student_email");
  // Clear cookie
  document.cookie = "student_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function getStudentToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("student_token");
}

// ── Types ─────────────────────────────────────────────────────────────────
export interface Student {
  id: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  applicationDate: string;
  status: string;
  preferences: { priority: number; status: string; course: { id: string; name: string } }[];
  allocation?: {
    id: string;
    course: { name: string };
    allocatedCategory: string;
    allocationDate: string;
    preference?: { priority: number };
  };
}

export interface Course {
  id: string;
  name: string;
  totalSeats: number;
  generalSeats: number;
  obcSeats: number;
  scSeats: number;
  stSeats: number;
  allocations?: { id: string }[];
}

export interface Allocation {
  id: string;
  studentId: string;
  student: { id: string; name: string; marks: number; category: string };
  course: { id: string; name: string };
  allocatedCategory: string;
  preferenceNumber: number;
  allocationDate: string;
  preference?: { priority: number };
}

export interface DashboardStats {
  students: { total: number; allocated: number; unallocated: number };
  courses: { id: string; name: string; totalSeats: number; allocatedSeats: number; availableSeats: number }[];
  categoryAllocation: { allocatedCategory: string; _count: { id: number } }[];
  rejectionRates: { courseId: string; courseName: string; rejections: number; totalPreferences: number; rejectionRate: string }[];
  notFirstPreferenceCount: number;
}

export interface ChatMessage {
  id: string;
  query: string;
  response: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
  student?: Student;
}

export interface VerifyResponse {
  valid: boolean;
  userId?: string;
  role?: "ADMIN" | "STUDENT";
  studentId?: string | null;
}

// ── API Methods ───────────────────────────────────────────────────────────
export const api = {
  // Auth
  adminLogin: (body: { email: string; password: string }) =>
    fetcher<LoginResponse>("/auth/admin/login", { method: "POST", body: JSON.stringify(body) }),

  studentLogin: (body: { email: string; password: string }) =>
    fetcher<LoginResponse>("/auth/student/login", { method: "POST", body: JSON.stringify(body) }),

  studentSignup: (body: object) =>
    fetcher<LoginResponse>("/auth/student/signup", { method: "POST", body: JSON.stringify(body) }),

  /**
   * Verifies the current token against the backend.
   * Used by AuthGuards on every page load to ensure token is still valid.
   */
  verifyToken: async (token: string): Promise<VerifyResponse> => {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) return { valid: false };
    return data.data as VerifyResponse;
  },

  getStudentProfile: () =>
    fetcher<Student>("/auth/student/profile"),

  // Dashboard
  getDashboard: () => fetcher<DashboardStats>("/allocations/dashboard"),

  // Students
  getStudents: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetcher<Student[]>(`/students${q}`);
  },
  createStudent: (body: object) =>
    fetcher<Student>("/students", { method: "POST", body: JSON.stringify(body) }),

  // Courses
  getCourses: () => fetcher<Course[]>("/courses"),
  createCourse: (body: object) =>
    fetcher<Course>("/courses", { method: "POST", body: JSON.stringify(body) }),

  // Allocations
  getAllocations: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetcher<Allocation[]>(`/allocations${q}`);
  },
  runAllocation: () =>
    fetcher<{ allocated: number; skipped: number; message: string }>("/allocations/run", { method: "POST" }),
  resetAllocations: () =>
    fetcher<{ message: string }>("/allocations/reset", { method: "DELETE" }),

  // CSV Export
  downloadCsv: async () => {
    const token = getAdminToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${BASE_URL}/allocations/export`, { headers });
    if (!res.ok) throw new Error("Export failed");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `allocations_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },

  // AI Chat
  chat: (body: { message: string; provider: string }) =>
    fetcher<{ sessionId: string; message: string; provider: string; model: string; timestamp: string }>(
      "/chat",
      { method: "POST", body: JSON.stringify(body) }
    ),
  getChatHistory: () => fetcher<ChatMessage[]>("/chat/history"),
};
