"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { api, type Allocation } from "@/lib/api";
import { Play, RotateCcw, Search, Filter } from "lucide-react";
import { format } from "date-fns";

type Tab = "allocated" | "not_allocated";

export default function AllocationPage() {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<Tab>("allocated");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<{ allocated: number; skipped: number; message: string } | null>(null);
  const [dashStats, setDashStats] = useState<{ students: { total: number; allocated: number; unallocated: number }; courses: { id: string; name: string; totalSeats: number; availableSeats: number; allocatedSeats: number }[] } | null>(null);

  const limit = 10;

  const load = async () => {
    setLoading(true);
    try {
      const [allocRes, dash] = await Promise.all([
        api.getAllocations(),
        api.getDashboard(),
      ]);
      setAllocations(allocRes.slice((page - 1) * limit, page * limit));
      setTotal(allocRes.length);
      setDashStats(dash);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [page]);

  const handleRun = async () => {
    setRunning(true);
    setRunResult(null);
    try {
      const r = await api.runAllocation();
      setRunResult(r);
      await load();
    } catch (e) {
      setRunResult({ allocated: 0, skipped: 0, message: (e as Error).message });
    }
    setRunning(false);
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset all allocations?")) return;
    try {
      await api.resetAllocations();
      await load();
    } catch {}
  };

  const totalPages = Math.ceil(total / limit);
  const totalSeats = dashStats?.courses.reduce((a, c) => a + c.totalSeats, 0) ?? 0;

  return (
    <>
      <Navbar title="Allocation" breadcrumb={["Dashboard", "Allocation"]} />

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <MiniStat icon="📋" color="blue" label="Total Applicants" value={dashStats?.students.total ?? 0} />
        <MiniStat icon="✅" color="green" label="Allocated Students" value={`${dashStats?.students.allocated ?? 0}`} sub={`${dashStats && dashStats.students.total ? ((dashStats.students.allocated / dashStats.students.total) * 100).toFixed(1) : 0}%`} />
        <MiniStat icon="⏳" color="orange" label="Not Allocated" value={dashStats?.students.unallocated ?? 0} sub={`${dashStats && dashStats.students.total ? ((dashStats.students.unallocated / dashStats.students.total) * 100).toFixed(1) : 0}%`} />
        <MiniStat icon="📚" color="purple" label="Total Courses" value={dashStats?.courses.length ?? 0} />
        <MiniStat icon="🪑" color="gray" label="Total Seats" value={totalSeats.toLocaleString()} />
      </div>

      {/* Controls */}
      <div className="section-card mb-4">
        <h2 className="font-semibold text-gray-800 mb-4">Allocation Controls</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex gap-3">
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {running ? "Running…" : "Run Allocation"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Allocations
            </button>
          </div>
          {runResult && (
            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${runResult.allocated > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {runResult.message} | Allocated: {runResult.allocated} | Skipped: {runResult.skipped}
            </div>
          )}
        </div>
      </div>

      {/* Tabs + Table */}
      <div className="section-card">
        <div className="flex items-center gap-1 border-b border-gray-100 mb-4">
          {(["allocated", "not_allocated"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "allocated" ? "Allocated Students" : "Not Allocated Students"}
            </button>
          ))}
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search by Student ID or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
            />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <div className="ml-auto">
            <button className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">↓ Export</button>
          </div>
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center text-gray-400">Loading…</div>
        ) : tab === "allocated" ? (
          <>
            <p className="text-xs text-gray-400 mb-3">Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total} allocated students</p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Category</th>
                  <th>Marks (%)</th>
                  <th>Allocated Course</th>
                  <th>Preference Allocated</th>
                  <th>Allocation Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((a) => (
                  <tr key={a.id}>
                    <td className="text-blue-600 font-medium text-xs">{a.student.id.slice(0, 8)}</td>
                    <td className="font-medium">{a.student.name}</td>
                    <td><CategoryBadge cat={a.student.category} /></td>
                    <td>{a.student.marks}</td>
                    <td>
                      <div>
                        <p className="font-medium text-gray-800">{a.course.name}</p>
                      </div>
                    </td>
                    <td><PrefBadge n={a.preferenceNumber} /></td>
                    <td className="text-xs text-gray-400">{format(new Date(a.allocationDate), "yyyy-MM-dd")}</td>
                    <td><button className="text-gray-400 hover:text-blue-500">👁</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-400">Rows per page: {limit}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-2 py-1 rounded text-sm hover:bg-gray-100 disabled:opacity-40">‹</button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded text-sm ${page === p ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2 py-1 rounded text-sm hover:bg-gray-100 disabled:opacity-40">›</button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
            Students not receiving any allocation will appear here after running the allocation engine.
          </div>
        )}
      </div>
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

function CategoryBadge({ cat }: { cat: string }) {
  const cls: Record<string, string> = { GENERAL: "badge-general", OBC: "badge-obc", SC: "badge-sc", ST: "badge-st" };
  return <span className={cls[cat] ?? "badge-general"}>{cat}</span>;
}

function PrefBadge({ n }: { n: number }) {
  const cls = n === 1 ? "pref-1st" : n === 2 ? "pref-2nd" : "pref-3rd";
  const label = n === 1 ? "1st Preference" : n === 2 ? "2nd Preference" : "3rd Preference";
  return <span className={cls}>{label}</span>;
}
