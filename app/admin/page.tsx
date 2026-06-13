"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Users, FileText, MessageSquareWarning, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeEmployees: 0,
    presentToday: 0,
    pendingLeaves: 0,
    openComplaints: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mock stats or partial implementation
        // In a real production app, use Cloud Functions to aggregate these stats
        
        const today = new Date().toISOString().split('T')[0];
        
        // Present Today
        const attendanceQ = query(collection(db, "attendance"), where("date", "==", today));
        const attendanceSnap = await getDocs(attendanceQ);
        const presentCount = attendanceSnap.size;

        // Pending Leaves
        const leavesQ = query(collection(db, "leaves"), where("status", "==", "pending"));
        const leavesSnap = await getDocs(leavesQ);
        const pendingLeaves = leavesSnap.size;

        // Open Complaints
        const complaintsQ = query(collection(db, "complaints"), where("status", "==", "open"));
        const complaintsSnap = await getDocs(complaintsQ);
        const openComplaints = complaintsSnap.size;

        // Total Employees (Users with role != admin)
        const usersQ = query(collection(db, "users"), where("role", "==", "employee"));
        const usersSnap = await getDocs(usersQ);
        const activeEmployees = usersSnap.size;

        setStats({
          activeEmployees,
          presentToday: presentCount,
          pendingLeaves,
          openComplaints
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        fetchStats();
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
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-neutral-400 mt-2">Overview of all company activity today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Employees */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Total Employees</h3>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.activeEmployees}</div>
          <p className="text-xs text-neutral-500 mt-1">Registered in system</p>
        </div>

        {/* Present Today */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Present Today</h3>
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.presentToday}</div>
          <p className="text-xs text-neutral-500 mt-1">Logged in</p>
        </div>

        {/* Pending Leaves */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Pending Leaves</h3>
            <FileText className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.pendingLeaves}</div>
          <p className="text-xs text-neutral-500 mt-1">Requires review</p>
        </div>

        {/* Open Complaints */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-400">Open Complaints</h3>
            <MessageSquareWarning className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.openComplaints}</div>
          <p className="text-xs text-neutral-500 mt-1">Unresolved issues</p>
        </div>
      </div>
    </div>
  );
}
