"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { api, type Student } from "@/lib/api";
import { Search, Filter, Plus, X } from "lucide-react";

type Category = "GENERAL" | "OBC" | "SC" | "ST";

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [allocStatus, setAllocStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [allStudents, setAllStudents] = useState<Student[]>([]);

  const limit = 10;

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.getStudents();
      setAllStudents(res);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Client-side filtering
  const filteredStudents = allStudents.filter(s => {
    if (search && !s.id.toLowerCase().includes(search.toLowerCase()) && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && s.category !== category) return false;
    if (allocStatus === "allocated" && !s.allocation) return false;
    if (allocStatus === "not_allocated" && s.allocation) return false;
    return true;
  });

  const total = filteredStudents.length;
  const totalPages = Math.ceil(total / limit);
  const students = filteredStudents.slice((page - 1) * limit, page * limit);

  // Reset page to 1 if we are out of bounds after filtering
  useEffect(() => {
    if (page > 1 && page > totalPages && totalPages > 0) setPage(1);
  }, [totalPages, page]);

  const allocated = allStudents.filter(s => s.allocation).length;
  const notAllocated = allStudents.filter(s => !s.allocation).length;

  return (
    <>
      <Navbar
        title="Students"
        breadcrumb={["Dashboard", "Students"]}
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MiniStat icon="👥" color="blue" label="Total Students" value={total} />
        <MiniStat icon="✅" color="green" label="Allocated Students" value={allocated} />
        <MiniStat icon="⏳" color="orange" label="Not Allocated" value={notAllocated} />
        <MiniStat icon="📅" color="purple" label="Latest Registration" value="Today" />
      </div>

      {/* Add Student Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="section-card mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search by Student ID or Name..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
            />
          </div>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
          >
            <option value="">All Categories</option>
            <option value="GENERAL">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
          <select
            value={allocStatus}
            onChange={(e) => setAllocStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
          >
            <option value="">All Status</option>
            <option value="allocated">Allocated</option>
            <option value="not_allocated">Not Allocated</option>
          </select>
          <button
            onClick={() => { setSearch(""); setCategory(""); setAllocStatus(""); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Reset
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="section-card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} students
          </p>
          <button className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            ↓ Export
          </button>
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center text-gray-400">Loading students…</div>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Marks (%)</th>
                  <th>Category</th>
                  <th>Application Date</th>
                  <th>Preferences</th>
                  <th>Allocation Status</th>
                  <th>Allocated Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="text-blue-600 font-medium text-xs">{s.id.slice(0, 8)}</td>
                    <td className="font-medium">{s.name}</td>
                    <td>{s.marks}</td>
                    <td><CategoryBadge cat={s.category} /></td>
                    <td className="text-gray-400 text-xs">{new Date(s.applicationDate).toLocaleDateString()}</td>
                    <td>
                      <div className="text-xs text-gray-600 space-y-0.5">
                        {s.preferences?.map((p) => (
                          <div key={p.priority}>{p.priority}. {p.course.name}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      {s.allocation
                        ? <span className="status-allocated">Allocated</span>
                        : <span className="status-not-allocated">Not Allocated</span>
                      }
                    </td>
                    <td className="text-gray-700">{s.allocation?.course?.name ?? "—"}</td>
                    <td>
                      <button className="text-gray-400 hover:text-gray-600">⋯</button>
                    </td>
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
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded text-sm ${page === p ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}
                  >
                    {p}
                  </button>
                ))}
                {totalPages > 5 && <span className="text-gray-400 text-sm">…</span>}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2 py-1 rounded text-sm hover:bg-gray-100 disabled:opacity-40">›</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Student Modal */}
      {showModal && <AddStudentModal onClose={() => { setShowModal(false); load(); }} />}
    </>
  );
}

function MiniStat({ icon, color, label, value }: { icon: string; color: string; label: string; value: string | number }) {
  const colors: Record<string, string> = { blue: "bg-blue-50", green: "bg-green-50", orange: "bg-orange-50", purple: "bg-purple-50" };
  return (
    <div className="stat-card flex items-center gap-3">
      <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center text-xl`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function CategoryBadge({ cat }: { cat: string }) {
  const cls: Record<string, string> = { GENERAL: "badge-general", OBC: "badge-obc", SC: "badge-sc", ST: "badge-st" };
  return <span className={cls[cat] ?? "badge-general"}>{cat}</span>;
}

function AddStudentModal({ onClose }: { onClose: () => void }) {
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    marks: "",
    category: "GENERAL" as Category,
    preferences: ["", "", ""]
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { api.getCourses().then(setCourses).catch(() => {}); }, []);

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      const prefs = form.preferences.filter(Boolean);
      await api.createStudent({
        name: form.name,
        email: form.email,
        password: form.password,
        marks: parseFloat(form.marks),
        category: form.category,
        preferences: prefs,
      });
      onClose();
    } catch (e) {
      setError((e as Error).message);
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800 text-lg">Add New Student</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Full Name</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter student name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Email (for Login)</label>
              <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="student@edu.com" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Password</label>
              <input type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min 6 chars" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Marks (%)</label>
              <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                value={form.marks} onChange={(e) => setForm(f => ({ ...f, marks: e.target.value }))} placeholder="0-100" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
                value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value as Category }))}>
                <option value="GENERAL">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="text-xs font-medium text-gray-600 block mb-1">Preference {i + 1} {i === 0 ? "(Required)" : "(Optional)"}</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
                value={form.preferences[i]}
                onChange={(e) => {
                  const prefs = [...form.preferences];
                  prefs[i] = e.target.value;
                  setForm(f => ({ ...f, preferences: prefs }));
                }}>
                <option value="">Select course</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          ))}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            <button onClick={handleSubmit} disabled={saving} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Saving…" : "Add Student"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
