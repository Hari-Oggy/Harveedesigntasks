"use client";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useChatStore } from "@/store/use-chat-store";
import { useDashboardStore } from "@/store/use-dashboard-store";
import { Send, RefreshCw } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const SUGGESTED = [
  "How many students were allocated to each course?",
  "Which students did not receive their first preference?",
  "Which course had the highest rejection rate?",
  "Show category-wise allocation summary.",
  "Show preference vs allocation analysis.",
];

const PROVIDERS = [
  { value: "groq", label: "Groq (LLaMA 3.3)" },
  { value: "nvidia", label: "NVIDIA NIM" },
  { value: "openrouter", label: "OpenRouter (Free)" },
] as const;

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7"];

export default function AIPage() {
  const { messages, sendMessage, loading, provider, setProvider } = useChatStore();
  const { stats, fetch } = useDashboardStore();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetch(); }, [fetch]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    await sendMessage(msg);
  };

  const barData = stats?.courses.map((c) => ({
    name: c.name.length > 10 ? c.name.slice(0, 10) + "…" : c.name,
    Allocated: c.allocatedSeats,
  })) ?? [];

  const pieData = stats?.categoryAllocation.map((c) => ({
    name: c.allocatedCategory,
    value: c._count.id,
  })) ?? [];

  const totalAllocated = stats?.students.allocated ?? 0;

  return (
    <>
      <Navbar
        title="AI Assistant"
        breadcrumb={["Dashboard", "AI Assistant"]}
        subtitle="Get instant answers and intelligent insights about course allocation."
      />

      <div className="grid grid-cols-5 gap-4" style={{ minHeight: "calc(100vh - 180px)" }}>
        {/* ── Chat Panel ─────────────────────────────────── */}
        <div className="col-span-2 section-card flex flex-col" style={{ height: "calc(100vh - 200px)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">🤖</div>
              <span className="font-semibold text-gray-800 text-sm">Chat with AI Assistant</span>
            </div>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as typeof provider)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none bg-white text-gray-600"
            >
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
            {messages.length === 0 && (
              <div className="chat-bubble-ai">
                <p>Hello Admin! 👋</p>
                <p className="mt-1 text-gray-600 text-sm">I can help you with allocation insights, statistics, and reports. What would you like to know?</p>
                <p className="text-xs text-gray-400 mt-2">Just now</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">🤖</div>
                )}
                <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1.5 ${msg.role === "user" ? "text-blue-200" : "text-gray-400"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {msg.role === "user" && " ✓✓"}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs flex-shrink-0">🤖</div>
                <div className="chat-bubble-ai">
                  <div className="flex gap-1 items-center py-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-2 font-medium">Suggested Questions</p>
            <div className="space-y-1">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="w-full text-left text-xs px-3 py-1.5 border border-gray-100 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-gray-600 flex items-center justify-between group"
                >
                  <span>🔍 {q}</span>
                  <span className="text-gray-300 group-hover:text-blue-400">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Type your question here..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">AI responses are generated based on system data and may not be 100% accurate.</p>
          </div>
        </div>

        {/* ── Right: Stats Panel ──────────────────────────── */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Allocation Bar Chart */}
          <div className="section-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">Allocated Students by Course</h3>
                <p className="text-xs text-gray-400">Here is the number of students allocated to each course.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">Total Allocated: {totalAllocated}</span>
                <button onClick={fetch} className="p-1.5 rounded hover:bg-gray-100"><RefreshCw className="w-3.5 h-3.5 text-gray-400" /></button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="Allocated" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3">
            <InsightCard title="Allocation Overview" items={[
              { label: "Total Students", value: String(stats?.students.total ?? 0) },
              { label: "Allocated", value: String(stats?.students.allocated ?? 0) },
              { label: "Not Allocated", value: String(stats?.students.unallocated ?? 0) },
              { label: "Rate", value: stats?.students.total ? `${((stats.students.allocated / stats.students.total) * 100).toFixed(1)}%` : "0%" },
            ]} icon="📊" />
            <InsightCard title="Category-wise Allocation" items={
              (stats?.categoryAllocation ?? []).map((c) => ({
                label: c.allocatedCategory,
                value: `${c._count.id} (${totalAllocated > 0 ? ((c._count.id / totalAllocated) * 100).toFixed(1) : 0}%)`,
              }))
            } icon="👥" />
            <InsightCard title="Top Rejection Insight" items={
              stats?.rejectionRates?.slice(0, 4).map((r) => ({
                label: r.courseName.slice(0, 15),
                value: r.rejectionRate,
              })) ?? []
            } icon="📉" />
            <div className="section-card">
              <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1"><span>🥧</span> Category Split</p>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie data={pieData} innerRadius={25} outerRadius={45} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-24 flex items-center justify-center text-xs text-gray-300">No data</div>
              )}
            </div>
          </div>

          {/* Need more insights */}
          <div className="section-card flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Need more insights?</p>
              <p className="text-xs text-gray-400">You can ask more questions or select from suggestions.</p>
            </div>
            <a href="/dashboard/reports" className="text-sm text-blue-600 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors font-medium">
              📊 View Full Reports
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function InsightCard({ title, items, icon }: { title: string; items: { label: string; value: string }[]; icon: string }) {
  return (
    <div className="section-card">
      <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1"><span>{icon}</span> {title}</p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-baseline">
            <span className="text-xs text-gray-500 truncate">{item.label}</span>
            <span className="text-xs font-semibold text-gray-800 ml-2">{item.value}</span>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-gray-300">No data yet</p>}
      </div>
    </div>
  );
}
