"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function AdminAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // Fetch users map
        const usersQ = query(collection(db, "users"));
        const usersSnap = await getDocs(usersQ);
        const userMap: Record<string, string> = {};
        usersSnap.docs.forEach(doc => {
          userMap[doc.id] = doc.data().name || "Unknown User";
        });

        // Fetch attendance
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
            userName: userMap[data.userId] || "Unknown User"
          };
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

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">All Attendance Records</h2>
        <p className="text-neutral-400 mt-2">View daily logs for all employees.</p>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500">No attendance records found.</td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="p-4 font-medium">{record.userName}</td>
                    <td className="p-4">{new Date(record.loginTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                    <td className="p-4">{record.logoutTime ? new Date(record.logoutTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
