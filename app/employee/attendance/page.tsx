"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, getDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { Loader2, LogIn, LogOut, CheckCircle2, Ban } from "lucide-react";

export default function AttendancePage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"not_started" | "logged_in" | "completed">("not_started");
  const [attendanceId, setAttendanceId] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!auth.currentUser) return;
      
      try {
        // Fetch user profile to check if attendance is blocked
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().attendanceBlocked) {
          setIsBlocked(true);
        } else {
          setIsBlocked(false);
        }

        const today = new Date().toISOString().split('T')[0];
        const q = query(
          collection(db, "attendance"),
          where("userId", "==", auth.currentUser.uid),
          where("date", "==", today)
        );
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setAttendanceId(docData.id);
          const data = docData.data();
          if (data.logoutTime) {
            setStatus("completed");
          } else {
            setStatus("logged_in");
          }
        } else {
          setStatus("not_started");
        }

        // Fetch monthly history
        const monthStart = new Date();
        monthStart.setDate(1);
        const historyQ = query(
          collection(db, "attendance"),
          where("userId", "==", auth.currentUser.uid),
          where("date", ">=", monthStart.toISOString().split('T')[0]),
          orderBy("date", "desc")
        );
        
        const historySnapshot = await getDocs(historyQ);
        const historyData = historySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching attendance", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        fetchAttendance();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAction = async () => {
    if (!auth.currentUser) return;
    setLoading(true);

    try {
      const today = new Date().toISOString().split('T')[0];
      
      if (status === "not_started") {
        // Log in
        const docRef = await addDoc(collection(db, "attendance"), {
          userId: auth.currentUser.uid,
          date: today,
          loginTime: new Date().toISOString(),
          logoutTime: null,
          status: "present"
        });
        setAttendanceId(docRef.id);
        setStatus("logged_in");
      } else if (status === "logged_in" && attendanceId) {
        // Log out
        const docRef = doc(db, "attendance", attendanceId);
        await updateDoc(docRef, {
          logoutTime: new Date().toISOString()
        });
        setStatus("completed");
      }
    } catch (error) {
      console.error("Error updating attendance", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
        <p className="text-neutral-400 mt-2">Mark your daily attendance and view your monthly records.</p>
      </div>

      {/* Action Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center flex flex-col items-center justify-center space-y-4">
        {isBlocked ? (
          <>
            <div className="bg-red-500/10 p-4 rounded-full">
              <Ban className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-400">Attendance Blocked</h3>
            <p className="text-neutral-400 max-w-sm">Your ability to log attendance has been restricted. Please contact your administrator.</p>
          </>
        ) : (
          <>
            {status === "not_started" && (
          <>
            <div className="bg-blue-500/10 p-4 rounded-full">
              <LogIn className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold">Good Morning!</h3>
            <p className="text-neutral-400 max-w-sm">Ready to start your day? Click below to log your check-in time.</p>
            <button
              onClick={handleAction}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Log In for the Day
            </button>
          </>
        )}
        
        {status === "logged_in" && (
          <>
            <div className="bg-amber-500/10 p-4 rounded-full">
              <LogOut className="w-12 h-12 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold">You are clocked in.</h3>
            <p className="text-neutral-400 max-w-sm">Have a productive day! Don't forget to log out when you leave.</p>
            <button
              onClick={handleAction}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log Out for the Day
            </button>
          </>
        )}

        {status === "completed" && (
          <>
            <div className="bg-emerald-500/10 p-4 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold">Attendance Completed</h3>
            <p className="text-neutral-400 max-w-sm">You have successfully logged your hours for today. See you tomorrow!</p>
          </>
        )}
          </>
        )}
      </div>

      {/* History */}
      <div>
        <h3 className="text-xl font-bold mb-4">Monthly History</h3>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-950/50 border-b border-neutral-800">
              <tr>
                <th className="p-4 font-medium text-neutral-400">Date</th>
                <th className="p-4 font-medium text-neutral-400">Log In</th>
                <th className="p-4 font-medium text-neutral-400">Log Out</th>
                <th className="p-4 font-medium text-neutral-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-neutral-500">No attendance records found for this month.</td>
                </tr>
              ) : (
                history.map((record, idx) => (
                  <tr key={idx} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4">{new Date(record.date).toLocaleDateString()}</td>
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
