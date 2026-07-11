"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";

type TabKey = "general" | "allocation" | "reservation" | "notifications";

export default function SettingsPage() {
  const [tab, setTab] = useState<TabKey>("general");
  const [autoAllocation, setAutoAllocation] = useState(true);
  const [considerDate, setConsiderDate] = useState(true);
  const [allowUpgrade, setAllowUpgrade] = useState(true);
  const [lockSeats, setLockSeats] = useState(false);
  const [notifications, setNotifications] = useState({
    newStudent: true,
    allocationCompleted: true,
    allocationFailed: true,
    seatAlerts: true,
    reportGeneration: false,
  });

  const TABS: { key: TabKey; label: string }[] = [
    { key: "general",       label: "⚙️  General Settings" },
    { key: "allocation",    label: "📋  Allocation Rules" },
    { key: "reservation",   label: "🪑  Reservation Settings" },
    { key: "notifications", label: "🔔  Notifications" },
  ];

  return (
    <>
      <Navbar title="Settings" breadcrumb={["Dashboard", "Settings"]} />

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "general" && (
        <div className="grid grid-cols-3 gap-4">
          <div className="section-card col-span-1">
            <h2 className="font-semibold text-gray-800 mb-4">University Information</h2>
            <div className="space-y-3">
              {[
                { label: "University Name", placeholder: "Global Tech University" },
                { label: "Academic Year",   placeholder: "2025-2026" },
                { label: "Address",         placeholder: "123 University Road" },
                { label: "Contact Email",   placeholder: "info@university.edu" },
                { label: "Contact Phone",   placeholder: "+91 98765 43210" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-gray-500 block mb-1">{f.label}</label>
                  <input defaultValue={f.placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
                </div>
              ))}
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">Save Changes</button>
            </div>
          </div>
          <div className="section-card">
            <h2 className="font-semibold text-gray-800 mb-4">System Preferences</h2>
            <div className="space-y-3">
              {[
                { label: "Timezone",    val: "(GMT +05:30) Asia/Kolkata" },
                { label: "Date Format", val: "DD-MM-YYYY" },
                { label: "Time Format", val: "24 Hour" },
                { label: "Items Per Page", val: "10" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-gray-500 block mb-1">{f.label}</label>
                  <select defaultValue={f.val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white">
                    <option>{f.val}</option>
                  </select>
                </div>
              ))}
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">Save Changes</button>
            </div>
          </div>
          <div className="section-card">
            <h2 className="font-semibold text-gray-800 mb-4">Password Policy</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Min Password Length</label>
                <input type="number" defaultValue={8} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
              </div>
              {["Require Uppercase", "Require Number", "Require Special Character"].map((label) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{label}</span>
                  <Toggle value={true} onChange={() => {}} />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Password Expiry (Days)</label>
                <input type="number" defaultValue={90} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400" />
              </div>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {tab === "allocation" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="section-card">
            <h2 className="font-semibold text-gray-800 mb-4">Allocation Preferences</h2>
            <div className="space-y-4">
              {[
                { label: "Auto Allocation", sub: "Automatically run allocation process", key: "auto", val: autoAllocation, set: setAutoAllocation },
                { label: "Consider Application Date", sub: "Use application date as tiebreaker", key: "date", val: considerDate, set: setConsiderDate },
                { label: "Allow Upgrade", sub: "Allow students to be upgraded if higher preference becomes available", key: "upgrade", val: allowUpgrade, set: setAllowUpgrade },
                { label: "Lock Allocated Seats", sub: "Prevent changes after final allocation", key: "lock", val: lockSeats, set: setLockSeats },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                  <Toggle value={item.val} onChange={() => item.set(!item.val)} />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Default Allocation Round</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                  <option>Round 1</option>
                  <option>Round 2</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Allocation Algorithm</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                  <option>Merit with Reservation</option>
                  <option>Pure Merit</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">Save Changes</button>
            </div>
          </div>
          <div className="section-card">
            <h2 className="font-semibold text-gray-800 mb-4">AI Provider Settings</h2>
            <div className="space-y-3">
              <p className="text-xs text-gray-400">Configure which AI provider the system uses for the AI Assistant chatbot.</p>
              {[
                { label: "Default Provider", options: ["Groq (Fast & Free)", "NVIDIA NIM", "OpenRouter (Free)"] },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-gray-500 block mb-1">{f.label}</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-1">🔑 API Keys</p>
                <p className="text-xs text-blue-600">Configure API keys in your <code className="bg-blue-100 px-1 rounded">apps/backend/.env</code> file.</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="section-card max-w-xl">
          <h2 className="font-semibold text-gray-800 mb-4">Email Notification Settings</h2>
          <div className="space-y-4">
            {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => {
              const labels: Record<keyof typeof notifications, string> = {
                newStudent: "New Student Registration",
                allocationCompleted: "Allocation Completed",
                allocationFailed: "Allocation Failed",
                seatAlerts: "Seat Availability Alerts",
                reportGeneration: "Report Generation",
              };
              return (
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-700">{labels[key]}</span>
                  <Toggle
                    value={notifications[key]}
                    onChange={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                  />
                </div>
              );
            })}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Save Changes</button>
          </div>
        </div>
      )}

      {tab === "reservation" && (
        <div className="section-card max-w-xl">
          <h2 className="font-semibold text-gray-800 mb-2">Reservation Policy</h2>
          <p className="text-xs text-gray-400 mb-4">These settings are governed by government policy and cannot be changed here. Contact your system administrator for modifications.</p>
          {[
            { cat: "General (GENERAL)", pct: "50%" },
            { cat: "OBC",              pct: "27%" },
            { cat: "SC",               pct: "15%" },
            { cat: "ST",               pct: "8%" },
          ].map((r) => (
            <div key={r.cat} className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-700">{r.cat}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: r.pct }} />
                </div>
                <span className="text-sm font-bold text-gray-800 w-10 text-right">{r.pct}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-6 text-center">ℹ️ All settings are securely saved and applied across the system.</p>
    </>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex w-10 h-5 rounded-full transition-colors ${value ? "bg-blue-600" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}
