"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GitMerge,
  BarChart3,
  Bot,
  PieChart,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { clearAdminSession } from "@/lib/api";

const NAV_ITEMS = [
  { label: "Dashboard",        href: "/dashboard",            icon: LayoutDashboard },
  { label: "Students",         href: "/dashboard/students",   icon: Users },
  { label: "Courses",          href: "/dashboard/courses",    icon: BookOpen },
  { label: "Allocation",       href: "/dashboard/allocation", icon: GitMerge },
  { label: "Reports",          href: "/dashboard/reports",    icon: BarChart3 },
  { label: "AI Assistant",     href: "/dashboard/ai",         icon: Bot },
  { label: "Category Summary", href: "/dashboard/category",   icon: PieChart },
  { label: "Settings",         href: "/dashboard/settings",   icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAdminSession();
    router.replace("/login");
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">AI-Powered</p>
            <p className="text-white/60 text-xs leading-tight">Course Allocation System</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item ${active ? "active" : ""}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-navy-800 rounded-xl p-4 mb-4 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
          <GraduationCap className="w-10 h-10 text-blue-400 mx-auto mb-2" />
          <p className="text-white text-sm font-semibold">Smart Allocation</p>
          <p className="text-white/50 text-xs">Fair. Transparent. Intelligent.</p>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          style={{ margin: 0 }}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
