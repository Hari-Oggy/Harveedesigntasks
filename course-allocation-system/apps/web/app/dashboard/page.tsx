"use client";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/store/use-dashboard-store";
import { useChatStore } from "@/store/use-chat-store";
import { Navbar } from "@/components/layout/navbar";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { Users, BookOpen, CheckCircle, Armchair, Send, RefreshCw, MessageCircle, X } from "lucide-react";
import { api } from "@/lib/api";
import type { Allocation } from "@/lib/api";
import { format } from "date-fns";

const CATEGORY_COLORS: Record<string, string> = {
  GENERAL: "#3b82f6",
  OBC: "#22c55e",
  SC: "#f59e0b",
  ST: "#a855f7",
};
const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7"];

const SUGGESTED = [
  "How many students were allocated to each course?",
  "Which students did not receive their first preference?",
  "Which course had the highest rejection rate?",
  "Show category-wise allocation summary.",
];

export default function DashboardPage() {
  const { stats, loading, fetch } = useDashboardStore();
  const { messages, sendMessage, loading: chatLoading } = useChatStore();
  const [recentAllocs, setRecentAllocs] = useState<Allocation[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
    fetch();
    api.getAllocations().then((r) => setRecentAllocs(r.slice(0, 5))).catch(() => {});
  }, [fetch]);

  const barData = stats?.courses.map((c) => ({
    name: c.name.length > 12 ? c.name.slice(0, 12) + "…" : c.name,
    Allocated: c.allocatedSeats,
    Available: c.availableSeats,
  })) ?? [];

  const pieData = stats?.categoryAllocation.map((c) => ({
    name: c.allocatedCategory,
    value: c._count.id,
  })) ?? [];

  const totalAllocated = stats?.students.allocated ?? 0;
  const totalStudents = stats?.students.total ?? 0;
  const pct = totalStudents > 0 ? ((totalAllocated / totalStudents) * 100).toFixed(1) : "0";

  const lastAiMsg = [...messages].reverse().find((m) => m.role === "ai");

  const handleAsk = async () => {
    if (!chatInput.trim()) return;
    await sendMessage(chatInput.trim());
    setChatInput("");
  };

  return (
    <>
      <Navbar title="Dashboard" subtitle="Overview of course allocation system" />

      {/* ── Stat Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-blue-600" />}
          bg="bg-blue-50"
          label="Total Students"
          value={loading ? "…" : (stats?.students.total ?? 0).toLocaleString()}
          sub="Registered Students"
        />
        <StatCard
          icon={<BookOpen className="w-6 h-6 text-green-600" />}
          bg="bg-green-50"
          label="Total Courses"
          value={loading ? "…" : (stats?.courses.length ?? 0).toString()}
          sub="Active Courses"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-purple-600" />}
          bg="bg-purple-50"
          label="Allocated Students"
          value={loading ? "…" : totalAllocated.toLocaleString()}
          sub={`${pct}% Allocated`}
        />
        <StatCard
          icon={<Armchair className="w-6 h-6 text-orange-500" />}
          bg="bg-orange-50"
          label="Available Seats"
          value={loading ? "…" : (stats?.courses.reduce((a, c) => a + c.availableSeats, 0) ?? 0).toLocaleString()}
          sub="Remaining Seats"
        />
      </div>

      {/* ── Charts Row ─────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Bar Chart */}
        <div className="section-card col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-800">Allocation Summary by Course</h2>
            </div>
            <button onClick={fetch} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Allocated" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Available" fill="#d1d5db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="section-card">
          <h2 className="font-semibold text-gray-800 mb-4">Category-wise Allocation</h2>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={false}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-2">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {d.value} ({totalAllocated > 0 ? ((d.value / totalAllocated) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
              Run allocation to see data
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Row ─────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent Allocations */}
        <div className="section-card col-span-2">
          <h2 className="font-semibold text-gray-800 mb-4">Recent Allocations</h2>
          {recentAllocs.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Marks</th>
                  <th>Category</th>
                  <th>Allocated Course</th>
                  <th>Preference</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAllocs.map((a) => (
                  <tr key={a.id}>
                    <td className="font-medium">{a.student.name}</td>
                    <td>{a.student.marks}</td>
                    <td>
                      <CategoryBadge cat={a.student.category} />
                    </td>
                    <td className="text-blue-600 font-medium">{a.course.name}</td>
                    <td>
                      <PrefBadge n={a.preferenceNumber} />
                    </td>
                    <td className="text-gray-400 text-xs">{format(new Date(a.allocationDate), "yyyy-MM-dd")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
              No allocations yet — run allocation first
            </div>
          )}
        </div>

        {/* Top Rejection */}
        <div className="section-card">
          <h2 className="font-semibold text-gray-800 mb-4">Top Course by Rejection Rate</h2>
          {stats?.rejectionRates && stats.rejectionRates.length > 0 ? (
            (() => {
              const top = [...stats.rejectionRates].sort((a, b) => b.rejections - a.rejections)[0];
              const rate = top ? parseFloat(top.rejectionRate) : 0;
              return (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">{top ? top.courseName.slice(0, 20) : "N/A"}</h4>
                  <p className="text-sm text-gray-500 mb-1">Highest Rejection Rate</p>
                  <span className="inline-block px-3 py-1 bg-red-50 text-red-600 font-bold rounded-lg text-lg">
                    {(rate * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(rate * 100, 100)}%` }} />
                  </div>
                  <div className="flex justify-between w-full mt-1 text-xs text-gray-400">
                    <span>Rejected: {top?.rejections ?? 0}</span>
                    <span>Applied: {top?.totalPreferences ?? 0}</span>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
              No data yet
            </div>
          )}
        </div>
      </div>

      {/* ── Floating AI Chatbot ──────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Chat Window */}
        {isAiOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 h-96 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200">
            {/* Header */}
            <div className="bg-blue-600 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">🤖</div>
                <span className="font-semibold text-white text-sm">AI Assistant</span>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-xs text-gray-700">
                Hi! Ask me anything about allocations, statistics, or reports.
              </div>
              
              {/* Suggested Questions (only show if no recent interaction) */}
              {!lastAiMsg && (
                <div className="flex flex-col gap-2 mt-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Suggested</p>
                  {SUGGESTED.slice(0, 3).map((q) => (
                    <button
                      key={q}
                      onClick={() => setChatInput(q)}
                      className="text-left text-xs p-2 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-600"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {lastAiMsg && (
                <div className="mt-auto">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Latest Response</p>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-gray-700 leading-relaxed shadow-sm">
                    {lastAiMsg.content}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="Ask a question…"
                className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-blue-400 transition-colors"
              />
              <button
                onClick={handleAsk}
                disabled={chatLoading}
                className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsAiOpen(!isAiOpen)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
            isAiOpen ? "bg-gray-800 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isAiOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}

function StatCard({ icon, bg, label, value, sub }: { icon: React.ReactNode; bg: string; label: string; value: string; sub: string }) {
  return (
    <div className="stat-card flex items-center gap-3">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 leading-tight">{value}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}

function CategoryBadge({ cat }: { cat: string }) {
  const cls: Record<string, string> = {
    GENERAL: "badge-general", OBC: "badge-obc", SC: "badge-sc", ST: "badge-st",
  };
  return <span className={cls[cat] ?? "badge-general"}>{cat}</span>;
}

function PrefBadge({ n }: { n: number }) {
  const cls = n === 1 ? "pref-1st" : n === 2 ? "pref-2nd" : "pref-3rd";
  const label = n === 1 ? "1st Preference" : n === 2 ? "2nd Preference" : "3rd Preference";
  return <span className={cls}>{label}</span>;
}
