"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearAdminSession, getAdminToken } from "@/lib/api";

interface Props {
  children: React.ReactNode;
}

/**
 * AdminGuard — protects all /dashboard routes.
 *
 * On every page load:
 * 1. Checks if admin_token exists in localStorage
 * 2. Calls GET /api/auth/verify to confirm the token is still valid
 * 3. Confirms the token's role is ADMIN (rejects student tokens)
 * 4. If any check fails → clears session and redirects to /login
 */
export function AdminGuard({ children }: Props) {
  const router = useRouter();
  // null = still checking, true = authorized, false = rejected
  const [status, setStatus] = useState<"checking" | "authorized" | "rejected">("checking");

  useEffect(() => {
    async function verify() {
      const token = getAdminToken();

      if (!token) {
        setStatus("rejected");
        router.replace("/login");
        return;
      }

      try {
        const result = await api.verifyToken(token);

        if (!result.valid || result.role !== "ADMIN") {
          // Token invalid or it's a student token — clear and redirect
          clearAdminSession();
          setStatus("rejected");
          router.replace("/login");
          return;
        }

        setStatus("authorized");
      } catch {
        // Network error or server down — clear and redirect
        clearAdminSession();
        setStatus("rejected");
        router.replace("/login");
      }
    }

    verify();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return null; // redirect in progress
  }

  return <>{children}</>;
}
