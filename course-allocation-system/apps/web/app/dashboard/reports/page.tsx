"use client";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useDashboardStore } from "@/store/use-dashboard-store";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Download } from "lucide-react";

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7"];

export default function ReportsPage() {
  const { stats, loading, fetch } = useDashboardStore();
  useEffect(() => { fetch(); }, [fetch]);

  const total = stats?.students.total ?? 0;
  const allocated = stats?.students.allocated ?? 0;
  const unallocated = stats?.students.unallocated ?? 0;
  const totalCourses = stats?.courses.length ?? 0;
  const totalSeats = stats?.courses.reduce((a, c) => a + c.totalSeats, 0) ?? 0;

  const barData = stats?.courses.map((c) => ({
    name: c.name.length > 12 ? c.name.slice(0, 12) + "…" : c.name,
    Allocated: c.allocatedSeats,
    Available: c.availableSeats,
    Rate: c.totalSeats > 0 ? Math.round((c.allocatedSeats / c.totalSeats) * 100) : 0,
  })) ?? [];

  const pieData = stats?.categoryAllocation.map((c) => ({
    name: c.allocatedCategory,
    value: c._count.id,
  })) ?? [];

  const statusPieData = [
    { name: "Allocated", value: allocated },
    { name: "Not Allocated", value: unallocated },
  ];

  const rejectionData = (stats?.rejectionRates ?? [])
    .sort((a, b) => b.rejections - a.rejections)
    .slice(0, 5)
    .map((r) => ({
      course: r.courseName.slice(0, 12),
      rate: parseFloat(r.rejectionRate) * 100,
      applicants: r.totalPreferences,
      notAllocated: r.rejections,
    }));

  return (
    <>
      <Navbar title="Reports" breadcrumb={["Dashboard", "Reports"]} />

      {/* Header controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white text-gray-600">
            <option>All Reports</option>
            <option>Allocation Summary</option>
            <option>Category Report</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white text-gray-600">
            <option>All Courses</option>
            {stats?.courses.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white text-gray-600">
            <option>All Categories</option>
            <option>GENERAL</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>
        <button
          onClick={() => {
            import("@/lib/api").then(({ api }) => {
              api.downloadCsv().catch(err => alert("Failed to export: " + err.message));
            });
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Applicants", value: total, icon: "👥", color: "bg-blue-50 text-blue-700" },
          { label: "Allocated", value: allocated, icon: "✅", color: "bg-green-50 text-green-700" },
          { label: "Not Allocated", value: unallocated, icon: "❌", color: "bg-red-50 text-red-600" },
          { label: "Total Courses", value: totalCourses, icon: "📚", color: "bg-purple-50 text-purple-700" },
          { label: "Total Seats", value: totalSeats, icon: "🪑", color: "bg-gray-50 text-gray-700" },
          { label: "Allocation Rate", value: `${total > 0 ? ((allocated / total) * 100).toFixed(1) : 0}%`, icon: "📊", color: "bg-orange-50 text-orange-700" },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${s.color} text-lg mb-1`}>{s.icon}</div>
            <p className="text-lg font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 3-col charts */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="section-card col-span-1">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Allocation Summary by Course</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="Allocated" fill="#2563eb" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Available" fill="#d1d5db" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <button className="mt-3 w-full text-xs text-blue-600 border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition-colors">View Full Report</button>
        </div>

        <div className="section-card">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Category-wise Allocation</h3>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-1">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-medium">{d.value} ({allocated > 0 ? ((d.value / allocated) * 100).toFixed(1) : 0}%)</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-300 text-sm">No data</div>
          )}
          <button className="mt-2 w-full text-xs text-blue-600 border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition-colors">View Details</button>
        </div>

        <div className="section-card">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Allocation Status Overview</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-1">
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-gray-600">Allocated</span></div>
              <span className="font-medium">{allocated} ({total > 0 ? ((allocated / total) * 100).toFixed(1) : 0}%)</span>
            </div>
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-gray-600">Not Allocated</span></div>
              <span className="font-medium">{unallocated} ({total > 0 ? ((unallocated / total) * 100).toFixed(1) : 0}%)</span>
            </div>
          </div>
          <button className="mt-2 w-full text-xs text-blue-600 border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition-colors">View Details</button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="section-card">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Top Courses by Rejection Rate</h3>
          {rejectionData.length > 0 ? (
            <>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-1.5 text-gray-500 font-medium">Course</th>
                    <th className="text-right text-gray-500 font-medium">Rate</th>
                    <th className="text-right text-gray-500 font-medium">Applicants</th>
                    <th className="text-right text-gray-500 font-medium">Rejected</th>
                  </tr>
                </thead>
                <tbody>
                  {rejectionData.map((r) => (
                    <tr key={r.course} className="border-b border-gray-50">
                      <td className="py-1.5 text-gray-700">{r.course}</td>
                      <td className="text-right font-semibold text-red-500">{r.rate.toFixed(1)}%</td>
                      <td className="text-right text-gray-400">{r.applicants}</td>
                      <td className="text-right text-gray-400">{r.notAllocated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="h-24 flex items-center justify-center text-gray-300 text-sm">No rejection data yet</div>
          )}
        </div>

        <div className="section-card">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Not Allocated Students Summary</h3>
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl mb-3">
            <div className="text-2xl">😔</div>
            <div>
              <p className="font-bold text-2xl text-gray-800">{unallocated}</p>
              <p className="text-xs text-gray-500">Total Not Allocated</p>
              <p className="text-xs text-red-500 font-medium">{total > 0 ? ((unallocated / total) * 100).toFixed(1) : 0}% of Total Applicants</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600">Top Reasons</p>
            {[
              { reason: "Seat Unavailability", pct: 65 },
              { reason: "Low Marks",           pct: 22 },
              { reason: "Preference Exhausted",pct: 13 },
            ].map((r) => (
              <div key={r.reason} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">• {r.reason}</span>
                <span className="font-medium text-gray-700">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Reports History</h3>
          <div className="space-y-2">
            {[
              { name: "Allocation Summary Report", type: "Allocation Summary" },
              { name: "Category-wise Allocation Report", type: "Category Summary" },
              { name: "Course-wise Detailed Report", type: "Course Analysis" },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between py-2 border-b border-gray-50 text-xs">
                <div>
                  <p className="font-medium text-gray-700">{r.name}</p>
                  <p className="text-gray-400">{r.type}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-700">↓</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
