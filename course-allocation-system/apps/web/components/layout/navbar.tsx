"use client";
import { Bell } from "lucide-react";

interface NavbarProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
}

export function Navbar({ title, subtitle, breadcrumb }: NavbarProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        {breadcrumb && (
          <p className="text-xs text-gray-400 mb-1">
            {breadcrumb.join(" › ")}
          </p>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-none">Admin</p>
            <p className="text-xs text-gray-400 leading-none">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
