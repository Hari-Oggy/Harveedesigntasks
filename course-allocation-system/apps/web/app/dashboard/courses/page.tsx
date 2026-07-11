"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { api, type Course } from "@/lib/api";
import { Plus, X, Search } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getCourses();
      setCourses(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = courses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalSeats = courses.reduce((a, c) => a + c.totalSeats, 0);
  const allocatedSeats = courses.reduce((a, c) => a + (c.allocations?.length ?? 0), 0);
  const availableSeats = totalSeats - allocatedSeats;

  return (
    <>
      <Navbar title="Courses" breadcrumb={["Dashboard", "Courses"]} />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MiniStat icon="📖" color="blue" label="Total Courses" value={courses.length} />
        <MiniStat icon="👥" color="green" label="Total Seats" value={totalSeats.toLocaleString()} />
        <MiniStat icon="🪑" color="orange" label="Available Seats" value={availableSeats} />
        <MiniStat icon="📊" color="purple" label="Allocated Seats" value={allocatedSeats} />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      {/* Search + Filter */}
      <div className="section-card mb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search by Course Name or Code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
            />
          </div>
          <button onClick={() => setSearch("")} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Reset</button>
        </div>
      </div>

      {/* Table */}
      <div className="section-card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">Showing {filtered.length} of {courses.length} courses</p>
          <button className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">↓ Export</button>
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center text-gray-400">Loading courses…</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Total Seats</th>
                <th className="text-center">General</th>
                <th className="text-center">OBC</th>
                <th className="text-center">SC</th>
                <th className="text-center">ST</th>
                <th>Available Seats</th>
                <th>Allocated Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const allocated = c.allocations?.length ?? 0;
                const available = c.totalSeats - allocated;
                return (
                  <tr key={c.id}>
                    <td className="font-medium text-gray-800">{c.name}</td>
                    <td>{c.totalSeats}</td>
                    <td className="text-center">{c.generalSeats}</td>
                    <td className="text-center">{c.obcSeats}</td>
                    <td className="text-center">{c.scSeats}</td>
                    <td className="text-center">{c.stSeats}</td>
                    <td>{available}</td>
                    <td>{allocated}</td>
                    <td><span className="status-allocated">Active</span></td>
                    <td><button className="text-gray-400 hover:text-gray-600">⋯</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && <AddCourseModal onClose={() => { setShowModal(false); load(); }} />}
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

function AddCourseModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", totalSeats: "", generalSeats: "", obcSeats: "", scSeats: "", stSeats: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const n = (v: string) => parseInt(v || "0");

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      await api.createCourse({
        name: form.name,
        totalSeats: n(form.totalSeats),
        generalSeats: n(form.generalSeats),
        obcSeats: n(form.obcSeats),
        scSeats: n(form.scSeats),
        stSeats: n(form.stSeats),
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
          <h2 className="font-bold text-gray-800 text-lg">Add New Course</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Course Name</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. B.Tech Computer Science" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Total Seats</label>
            <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              value={form.totalSeats} onChange={(e) => setForm(f => ({ ...f, totalSeats: e.target.value }))} />
          </div>
          <p className="text-xs font-semibold text-gray-500 pt-1">Reserved Seats by Category</p>
          <div className="grid grid-cols-2 gap-3">
            {(["General", "OBC", "SC", "ST"] as const).map((cat) => {
              const key = cat.toLowerCase() + "Seats" as keyof typeof form;
              return (
                <div key={cat}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{cat} Seats</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    value={form[key]} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))} />
                </div>
              );
            })}
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            <button onClick={handleSubmit} disabled={saving} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Saving…" : "Add Course"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
