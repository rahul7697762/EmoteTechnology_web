"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { Loader2, Pencil, X, Save } from "lucide-react";

interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  loginTime: string;
  logoutTime?: string;
  status: string;
}

function toTimeInputValue(isoString?: string): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  return d.toTimeString().slice(0, 5); // "HH:MM"
}

function applyTimeToDate(baseIso: string, timeStr: string): string {
  const base = new Date(baseIso);
  const [h, m] = timeStr.split(":").map(Number);
  base.setHours(h, m, 0, 0);
  return base.toISOString();
}

const STATUS_OPTIONS = ["Present", "Late", "Half Day", "Absent"];

export default function AdminAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [editing, setEditing] = useState<AttendanceRecord | null>(null);
  const [form, setForm] = useState({ loginTime: "", logoutTime: "", status: "" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const usersQ = query(collection(db, "users"));
        const usersSnap = await getDocs(usersQ);
        const userMap: Record<string, string> = {};
        usersSnap.docs.forEach(doc => {
          userMap[doc.id] = doc.data().name || "Unknown User";
        });

        const q = query(
          collection(db, "attendance"),
          orderBy("date", "desc"),
          limit(100)
        );
        const snapshot = await getDocs(q);

        const recordsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            userName: userMap[data.userId] || "Unknown User",
          } as AttendanceRecord;
        });

        setRecords(recordsData);
      } catch (error) {
        console.error("Error fetching attendance", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const openEdit = (record: AttendanceRecord) => {
    setEditing(record);
    setSaveError("");
    setForm({
      loginTime: toTimeInputValue(record.loginTime),
      logoutTime: toTimeInputValue(record.logoutTime),
      status: record.status,
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setSaveError("");
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setSaveError("");
    try {
      const token = await auth.currentUser?.getIdToken();
      const updates: Record<string, any> = {};

      if (form.loginTime) {
        updates.loginTime = applyTimeToDate(editing.date, form.loginTime);
      }
      if (form.logoutTime) {
        updates.logoutTime = applyTimeToDate(editing.date, form.logoutTime);
      } else {
        updates.logoutTime = null;
      }
      updates.status = form.status;

      const res = await fetch("/api/admin/update-attendance", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: editing.id, ...updates }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update");
      }

      // Update local state
      setRecords(prev =>
        prev.map(r =>
          r.id === editing.id
            ? {
                ...r,
                loginTime: updates.loginTime ?? r.loginTime,
                logoutTime: updates.logoutTime ?? r.logoutTime,
                status: form.status,
              }
            : r
        )
      );

      closeEdit();
    } catch (err: any) {
      setSaveError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "present": return "bg-emerald-500/10 text-emerald-400";
      case "late": return "bg-amber-500/10 text-amber-400";
      case "half day": return "bg-blue-500/10 text-blue-400";
      case "absent": return "bg-red-500/10 text-red-400";
      default: return "bg-neutral-500/10 text-neutral-400";
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">All Attendance Records</h2>
        <p className="text-neutral-400 mt-2">View and edit daily logs for all employees.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-950/50 border-b border-neutral-800">
              <tr>
                <th className="p-4 font-medium text-neutral-400">Date</th>
                <th className="p-4 font-medium text-neutral-400">Employee Name</th>
                <th className="p-4 font-medium text-neutral-400">Log In</th>
                <th className="p-4 font-medium text-neutral-400">Log Out</th>
                <th className="p-4 font-medium text-neutral-400">Status</th>
                <th className="p-4 font-medium text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium">{record.userName}</td>
                    <td className="p-4">
                      {record.loginTime
                        ? new Date(record.loginTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "--:--"}
                    </td>
                    <td className="p-4">
                      {record.logoutTime
                        ? new Date(record.logoutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "--:--"}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openEdit(record)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-blue-600 text-neutral-300 hover:text-white text-xs font-medium transition-all duration-200 border border-neutral-700 hover:border-blue-500"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-semibold">Edit Attendance</h3>
                <p className="text-sm text-neutral-400 mt-0.5">
                  {editing.userName} · {new Date(editing.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <button
                onClick={closeEdit}
                className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Log In Time
                </label>
                <input
                  type="time"
                  value={form.loginTime}
                  onChange={e => setForm(f => ({ ...f, loginTime: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Log Out Time
                </label>
                <input
                  type="time"
                  value={form.logoutTime}
                  onChange={e => setForm(f => ({ ...f, logoutTime: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {saveError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                  {saveError}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-800">
              <button
                onClick={closeEdit}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors border border-neutral-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
