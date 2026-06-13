"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { CheckCircle, Loader2 } from "lucide-react";

export default function AdminComplaintsPage() {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);

  const fetchComplaints = async () => {
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
        collection(db, "complaints"),
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
      
      setComplaints(recordsData);
    } catch (error) {
      console.error("Error fetching complaints", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      const complaintRef = doc(db, "complaints", id);
      await updateDoc(complaintRef, { status: 'resolved' });
      setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
    } catch (error) {
      console.error("Error resolving complaint", error);
    }
  };

  if (loading && complaints.length === 0) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Complaints Overview</h2>
        <p className="text-neutral-400 mt-2">View and resolve employee complaints.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-950/50 border-b border-neutral-800">
              <tr>
                <th className="p-4 font-medium text-neutral-400">Date</th>
                <th className="p-4 font-medium text-neutral-400">Employee Name</th>
                <th className="p-4 font-medium text-neutral-400">Subject</th>
                <th className="p-4 font-medium text-neutral-400">Attachment</th>
                <th className="p-4 font-medium text-neutral-400">Status</th>
                <th className="p-4 font-medium text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">No complaints found.</td>
                </tr>
              ) : (
                complaints.map((record) => (
                  <tr key={record.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">{new Date(record.submittedAt).toLocaleDateString()}</td>
                    <td className="p-4 font-medium">{record.userName}</td>
                    <td className="p-4">
                      <div className="font-medium">{record.subject}</div>
                      <div className="text-neutral-500 text-xs mt-1 max-w-xs truncate" title={record.description}>{record.description}</div>
                    </td>
                    <td className="p-4">
                      {record.fileUrl ? (
                        <a href={record.fileUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">View Evidence</a>
                      ) : (
                        <span className="text-neutral-600">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${record.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                        ${record.status === 'open' ? 'bg-amber-500/10 text-amber-500' : ''}
                      `}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {record.status === 'open' && (
                        <button
                          onClick={() => handleResolve(record.id)}
                          className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded transition-colors flex items-center float-right"
                          title="Mark Resolved"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-xs">Resolve</span>
                        </button>
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
