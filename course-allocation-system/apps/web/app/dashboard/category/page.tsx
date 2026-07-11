"use client";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useDashboardStore } from "@/store/use-dashboard-store";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import { RefreshCw } from "lucide-react";

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7"];

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  GENERAL: { label: "General", color: "#3b82f6" },
  OBC:     { label: "OBC",     color: "#22c55e" },
  SC:      { label: "SC",      color: "#f59e0b" },
  ST:      { label: "ST",      color: "#a855f7" },
};

export default function CategoryPage() {
  const { stats, loading, fetch } = useDashboardStore();

  useEffect(() => { fetch(); }, [fetch]);

  const total = stats?.students.total ?? 0;
  const allocated = stats?.students.allocated ?? 0;
  const unallocated = stats?.students.unallocated ?? 0;
  const totalSeats = stats?.courses.reduce((a, c) => a + c.totalSeats, 0) ?? 0;
  const availableSeats = stats?.courses.reduce((a, c) => a + c.availableSeats, 0) ?? 0;

  const pieData = stats?.categoryAllocation.map((c) => ({
    name: c.allocatedCategory,
    value: c._count.id,
  })) ?? [];

  const barData = stats?.categoryAllocation.map((c) => {
    const pct = allocated > 0 ? ((c._count.id / allocated) * 100).toFixed(1) : "0";
    return { name: c.allocatedCategory, "Allocation %": parseFloat(pct) };
  }) ?? [];

  const insights = (() => {
    if (!stats?.categoryAllocation || stats.categoryAllocation.length === 0) return [];
    const sorted = [...stats.categoryAllocation].sort((a, b) => b._count.id - a._count.id);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];
    const pctH = allocated > 0 ? (((highest?._count?.id ?? 0) / allocated) * 100).toFixed(1) : "0";
    const pctL = allocated > 0 ? (((lowest?._count?.id ?? 0) / allocated) * 100).toFixed(1) : "0";
    return [
      { icon: "📊", color: "blue", text: `${highest?.allocatedCategory ?? "N/A"} category has the highest allocations (${pctH}%)` },
      { icon: "📉", color: "red", text: `${lowest?.allocatedCategory ?? "N/A"} category has the lowest allocations (${pctL}%)` },
      { icon: "👥", color: "green", text: `Overall allocation percentage across all categories is ${total > 0 ? ((allocated / total) * 100).toFixed(1) : 0}%.` },
    ];
  })();

  return (
    <>
      <Navbar
        title="Category Summary"
        breadcrumb={["Dashboard", "Category Summary"]}
        subtitle="Category-wise allocation overview and seat distribution."
      />

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <MiniStat icon="👥" color="blue" label="Total Students" value={total} sub="All Categories" />
        <MiniStat icon="✅" color="green" label="Allocated Students" value={allocated} sub={`${total > 0 ? ((allocated / total) * 100).toFixed(1) : 0}%`} />
        <MiniStat icon="⏳" color="orange" label="Not Allocated" value={unallocated} sub={`${total > 0 ? ((unallocated / total) * 100).toFixed(1) : 0}%`} />
        <MiniStat icon="🪑" color="purple" label="Total Seats" value={totalSeats.toLocaleString()} sub="All Courses" />
        <MiniStat icon="📊" color="gray" label="Available Seats" value={availableSeats} sub={`${totalSeats > 0 ? ((availableSeats / totalSeats) * 100).toFixed(1) : 0}%`} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Pie + Summary Table */}
        <div className="section-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Category-wise Allocation Overview</h2>
            <button onClick={fetch} className="p-1.5 rounded hover:bg-gray-100"><RefreshCw className="w-3.5 h-3.5 text-gray-400" /></button>
          </div>
          {pieData.length > 0 ? (
            <div className="flex items-start gap-4">
              <ResponsiveContainer width="45%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-1.5 text-gray-500 font-medium">Category</th>
                      <th className="text-right py-1.5 text-gray-500 font-medium">Allocated</th>
                      <th className="text-right py-1.5 text-gray-500 font-medium">Total</th>
                      <th className="text-right py-1.5 text-gray-500 font-medium">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pieData.map((d, i) => (
                      <tr key={d.name} className="border-b border-gray-50">
                        <td className="py-1.5 flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                          {d.name}
                        </td>
                        <td className="text-right py-1.5 font-medium">{d.value}</td>
                        <td className="text-right py-1.5 text-gray-400">—</td>
                        <td className="text-right py-1.5 text-gray-700">
                          {allocated > 0 ? ((d.value / allocated) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td className="py-1.5">Total</td>
                      <td className="text-right py-1.5">{allocated}</td>
                      <td className="text-right py-1.5 text-gray-400">{total}</td>
                      <td className="text-right py-1.5">{total > 0 ? ((allocated / total) * 100).toFixed(1) : 0}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-gray-300 text-sm">Run allocation to see category data</div>
          )}
        </div>

        {/* Bar Chart % */}
        <div className="section-card">
          <h2 className="font-semibold text-gray-800 mb-4">Allocation Percentage by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
              <Tooltip formatter={(v) => [`${v}%`, "Allocation %"]} />
              <Bar dataKey="Allocation %" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Details table + Insights */}
      <div className="grid grid-cols-3 gap-4">
        <div className="section-card col-span-2">
          <h2 className="font-semibold text-gray-800 mb-4">Category-wise Allocation Details</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Allocated Students</th>
                <th>Allocation %</th>
                <th>Total Seats</th>
                <th>Available Seats</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.categoryAllocation ?? []).map((c) => {
                const pct = allocated > 0 ? ((c._count.id / allocated) * 100).toFixed(1) : "0";
                const isGood = parseFloat(pct) >= 70;
                return (
                  <tr key={c.allocatedCategory}>
                    <td className="font-medium" style={{ color: CATEGORY_META[c.allocatedCategory]?.color }}>
                      {c.allocatedCategory}
                    </td>
                    <td>{c._count.id}</td>
                    <td>{pct}%</td>
                    <td>—</td>
                    <td>—</td>
                    <td>
                      <span className={isGood ? "status-allocated" : "status-not-allocated"}>
                        {isGood ? "Good" : "Needs Attention"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {(stats?.categoryAllocation ?? []).length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">No allocation data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="section-card">
          <h2 className="font-semibold text-gray-800 mb-4">Insights</h2>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <span className="text-lg">{ins.icon}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{ins.text}</p>
              </div>
            ))}
            {insights.length === 0 && (
              <p className="text-xs text-gray-300 text-center py-8">Run the allocation engine to generate insights</p>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        ℹ️ Category reservation and allocation are based on university guidelines and government norms.
      </p>
    </>
  );
}

function MiniStat({ icon, color, label, value, sub }: { icon: string; color: string; label: string; value: string | number; sub?: string }) {
  const colors: Record<string, string> = { blue: "bg-blue-50", green: "bg-green-50", orange: "bg-orange-50", purple: "bg-purple-50", gray: "bg-gray-100" };
  return (
    <div className="stat-card flex items-center gap-3">
      <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}
