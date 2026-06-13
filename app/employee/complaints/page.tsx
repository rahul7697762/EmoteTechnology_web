"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { MessageSquareWarning, Upload, Loader2 } from "lucide-react";

export default function ComplaintsPage() {
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  useEffect(() => {
    const fetchHistory = async () => {
      if (!auth.currentUser) return;
      try {
        const q = query(
          collection(db, "complaints"),
          where("userId", "==", auth.currentUser.uid),
          orderBy("submittedAt", "desc")
        );
        const snapshot = await getDocs(q);
        setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching complaints history", error);
      } finally {
        setHistoryLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) fetchHistory();
      else setHistoryLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);

    try {
      let fileUrl = "";

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "complaints");
        
        const token = await auth.currentUser.getIdToken();

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error("File upload failed");
        const uploadJson = await uploadRes.json();
        fileUrl = uploadJson.url;
      }

      await addDoc(collection(db, "complaints"), {
        userId: auth.currentUser.uid,
        ...formData,
        fileUrl,
        status: "open",
        submittedAt: new Date().toISOString()
      });

      setFormData({ subject: "", description: "" });
      setFile(null);
      
      setHistoryLoading(true);
      const q = query(
        collection(db, "complaints"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("submittedAt", "desc")
      );
      const snapshot = await getDocs(q);
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    } catch (error) {
      console.error("Error submitting complaint", error);
    } finally {
      setLoading(false);
      setHistoryLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Complaints</h2>
        <p className="text-neutral-400 mt-2">File a complaint or report an issue. Your reports are strictly confidential.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquareWarning className="w-5 h-5 mr-2 text-red-500" />
            File Report
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Subject</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Brief title of the issue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
              <textarea 
                required
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Provide detailed information..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Attachment (Optional)</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-800 border-dashed rounded-lg cursor-pointer bg-neutral-950 hover:bg-neutral-900 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-neutral-500" />
                    <p className="mb-2 text-sm text-neutral-400">
                      <span className="font-semibold">Click to upload</span> evidence
                    </p>
                    {file && <p className="text-xs text-blue-400">{file.name}</p>}
                  </div>
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Complaint"}
            </button>
          </form>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Your Complaints</h3>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            {historyLoading ? (
              <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-neutral-500" /></div>
            ) : history.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 flex flex-col items-center">
                <MessageSquareWarning className="w-12 h-12 mb-3 text-neutral-700" />
                No complaints filed.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-950/50 border-b border-neutral-800">
                  <tr>
                    <th className="p-4 font-medium text-neutral-400">Date</th>
                    <th className="p-4 font-medium text-neutral-400">Subject</th>
                    <th className="p-4 font-medium text-neutral-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        {new Date(record.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{record.subject}</div>
                        <div className="text-neutral-500 text-xs mt-1 truncate max-w-sm">{record.description}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${record.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                          ${record.status === 'open' ? 'bg-amber-500/10 text-amber-500' : ''}
                        `}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
