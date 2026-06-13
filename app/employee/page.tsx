"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { CalendarClock, FileText, CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react";

export default function EmployeeDashboard() {
  const [userName, setUserName] = useState("Employee");
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    todayStatus: "Not Checked In",
    todayLoginTime: "",
    hoursThisWeek: 0,
    pendingLeaves: 0,
    daysPresentThisMonth: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;

      try {
        // Fetch User Name
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().name) {
          setUserName(docSnap.data().name);
        }

        const today = new Date().toISOString().split('T')[0];
        
        // Fetch Today's Attendance
        const todayQ = query(
          collection(db, "attendance"),
          where("userId", "==", auth.currentUser.uid),
          where("date", "==", today)
        );
        const todaySnap = await getDocs(todayQ);
        
        let todayStatus = "Not Checked In";
        let todayLoginTime = "";
        
        if (!todaySnap.empty) {
          const data = todaySnap.docs[0].data();
          if (data.logoutTime) {
            todayStatus = "Completed";
          } else {
            todayStatus = "Checked In";
          }
          if (data.loginTime) {
            todayLoginTime = new Date(data.loginTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
        }

        // Fetch Pending Leaves
        const leavesQ = query(
          collection(db, "leaves"),
          where("userId", "==", auth.currentUser.uid),
          where("status", "==", "pending")
        );
        const leavesSnap = await getDocs(leavesQ);
        const pendingLeaves = leavesSnap.size;

        // Fetch Monthly Attendance (Days Present)
        const monthStart = new Date();
        monthStart.setDate(1);
        const monthQ = query(
          collection(db, "attendance"),
          where("userId", "==", auth.currentUser.uid),
          where("date", ">=", monthStart.toISOString().split('T')[0])
        );
        const monthSnap = await getDocs(monthQ);
        const daysPresentThisMonth = monthSnap.size;

        // Note: Hours calculation can be complex depending on login/logout timestamps across the week.
        // We will just sum up completed hours for the month/week if available, but for now we set it to 0 or calculate basic.
        let totalMs = 0;
        monthSnap.docs.forEach(doc => {
          const d = doc.data();
          if (d.loginTime && d.logoutTime) {
            const diff = new Date(d.logoutTime).getTime() - new Date(d.loginTime).getTime();
            totalMs += diff;
          }
        });
        const hoursThisMonth = (totalMs / (1000 * 60 * 60)).toFixed(1);

        setStats({
          todayStatus,
          todayLoginTime,
          hoursThisWeek: parseFloat(hoursThisMonth), // Using month for display simplicity
          pendingLeaves,
          daysPresentThisMonth
        });

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        fetchData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {userName}!</h2>
        <p className="text-neutral-400 mt-2">Here's your overview based on your actual data.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Attendance Status */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Today's Status</h3>
            {stats.todayStatus === "Not Checked In" ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            )}
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.todayStatus}</div>
          <p className="text-xs text-neutral-500 mt-1">
            {stats.todayLoginTime ? `Logged in at ${stats.todayLoginTime}` : 'No activity yet today'}
          </p>
        </div>

        {/* Hours Worked */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Hours This Month</h3>
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.hoursThisWeek} hrs</div>
          <p className="text-xs text-neutral-500 mt-1">Total completed hours</p>
        </div>

        {/* Pending Leaves */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Pending Leaves</h3>
            <FileText className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.pendingLeaves}</div>
          <p className="text-xs text-neutral-500 mt-1">Waiting for admin approval</p>
        </div>

        {/* Monthly Attendance */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Monthly Attendance</h3>
            <CalendarClock className="h-5 w-5 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.daysPresentThisMonth} Days</div>
          <p className="text-xs text-neutral-500 mt-1">Days present this month</p>
        </div>
      </div>
    </div>
  );
}
