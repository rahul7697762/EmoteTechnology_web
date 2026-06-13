"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { Check, X, Loader2 } from "lucide-react";

export default function AdminLeavePage() {
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState<any[]>([]);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      // Fetch users map
      const usersQ = query(collection(db, "users"));
      const usersSnap = await getDocs(usersQ);
      const userMap: Record<string, string> = {};
      usersSnap.docs.forEach(doc => {
        userMap[doc.id] = doc.data().name || "Unknown User";
      });

      const q = query(
        collection(db, "leaves"),
        orderBy("submittedAt", "desc")
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
      
      setLeaves(recordsData);
    } catch (error) {
      console.error("Error fetching leaves", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const leaveRef = doc(db, "leaves", id);
      await updateDoc(leaveRef, { status: newStatus });
      // Refresh local state without refetching for speed
      setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading && leaves.length === 0) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Leave Requests</h2>
        <p className="text-neutral-400 mt-2">Approve or reject employee leave applications.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-950/50 border-b border-neutral-800">
              <tr>
                <th className="p-4 font-medium text-neutral-400">Employee Name</th>
                <th className="p-4 font-medium text-neutral-400">Date Range</th>
                <th className="p-4 font-medium text-neutral-400">Reason</th>
                <th className="p-4 font-medium text-neutral-400">Document</th>
                <th className="p-4 font-medium text-neutral-400">Status</th>
                <th className="p-4 font-medium text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">No leave requests found.</td>
                </tr>
              ) : (
                leaves.map((record) => (
                  <tr key={record.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4 font-medium">{record.userName}</td>
                    <td className="p-4 whitespace-nowrap">{record.startDate} to {record.endDate}</td>
                    <td className="p-4 max-w-xs truncate" title={record.reason}>{record.reason}</td>
                    <td className="p-4">
                      {record.fileUrl ? (
                        <a href={record.fileUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">View File</a>
                      ) : (
                        <span className="text-neutral-600">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${record.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                        ${record.status === 'rejected' ? 'bg-red-500/10 text-red-500' : ''}
                        ${record.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : ''}
                      `}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {record.status === 'pending' && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleUpdateStatus(record.id, 'approved')}
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(record.id, 'rejected')}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
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
