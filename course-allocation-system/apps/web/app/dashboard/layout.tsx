import { Sidebar } from "@/components/layout/sidebar";
import { AdminGuard } from "@/components/auth/AdminGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="page-content flex-1">
          <div className="page-inner">
            {children}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
