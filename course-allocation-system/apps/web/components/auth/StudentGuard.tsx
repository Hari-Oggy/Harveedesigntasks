"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearStudentSession, getStudentToken } from "@/lib/api";

interface Props {
  children: React.ReactNode;
}

/**
 * StudentGuard — protects the student dashboard view.
 *
 * On every page load:
 * 1. Checks if student_token exists in localStorage
 * 2. Calls GET /api/auth/verify to confirm the token is still valid
 * 3. Confirms the token's role is STUDENT (rejects admin tokens)
 * 4. If any check fails → clears session and shows the login form
 */
export function StudentGuard({ children, onUnauthorized }: Props & { onUnauthorized: () => void }) {
  const [status, setStatus] = useState<"checking" | "authorized" | "rejected">("checking");

  useEffect(() => {
    async function verify() {
      const token = getStudentToken();

      if (!token) {
        setStatus("rejected");
        onUnauthorized();
        return;
      }

      try {
        const result = await api.verifyToken(token);

        if (!result.valid || result.role !== "STUDENT") {
          // Token invalid or it's an admin token trying to access student portal
          clearStudentSession();
          setStatus("rejected");
          onUnauthorized();
          return;
        }

        setStatus("authorized");
      } catch {
        clearStudentSession();
        setStatus("rejected");
        onUnauthorized();
      }
    }

    verify();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-blue-300 text-sm">Verifying your session…</p>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return null; // onUnauthorized() already called
  }

  return <>{children}</>;
}
