"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, doc, updateDoc } from "firebase/firestore";
import { UserPlus, Loader2, Mail, Lock, Building, CheckCircle2, KeyRound, Edit, Users } from "lucide-react";

export default function AdminEmployeesPage() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("list");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    phone: "",
    address: "",
    manager: "",
    joinedDate: new Date().toISOString().split('T')[0]
  });

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetUid, setResetUid] = useState("");
  const [resetName, setResetName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Edit State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});

  const fetchEmployees = async () => {
    setEmployeesLoading(true);
    try {
      const q = query(
        collection(db, "users"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      setEmployees(snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) })).filter((u: any) => u.role === 'employee'));
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setEmployeesLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const token = await auth.currentUser.getIdToken();
      
      const res = await fetch("/api/admin/create-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create employee");
      }

      setSuccessMsg(`Successfully created account for ${formData.name}!`);
      setFormData({ name: "", email: "", password: "", department: "", phone: "", address: "", manager: "", joinedDate: new Date().toISOString().split('T')[0] });
      fetchEmployees();
      setActiveTab("list");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openResetModal = (uid: string, name: string) => {
    setResetUid(uid);
    setResetName(name);
    setNewPassword("");
    setResetModalOpen(true);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setResetLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const token = await auth.currentUser.getIdToken();
      
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ uid: resetUid, newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccessMsg(`Password successfully reset for ${resetName}!`);
      setResetModalOpen(false);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setResetLoading(false);
    }
  };

  const openEditModal = (emp: any) => {
    setEditFormData({ ...emp });
    setEditModalOpen(true);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const docRef = doc(db, "users", editFormData.id);
      await updateDoc(docRef, {
        name: editFormData.name,
        department: editFormData.department,
        phone: editFormData.phone || "",
        address: editFormData.address || "",
        manager: editFormData.manager || "",
        joinedDate: editFormData.joinedDate || ""
      });

      setSuccessMsg(`Successfully updated details for ${editFormData.name}!`);
      setEditModalOpen(false);
      fetchEmployees();
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl relative">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Employees</h2>
        <p className="text-neutral-400 mt-2">Provision new employee accounts and manage access.</p>
      </div>

      {successMsg && !resetModalOpen && !editModalOpen && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg flex items-center text-sm text-emerald-500">
          <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />
          {successMsg}
        </div>
      )}
      
      {errorMsg && !resetModalOpen && !editModalOpen && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-500">
          {errorMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-neutral-800">
        <button
          onClick={() => setActiveTab("list")}
          className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "list"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-700"
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Employee Roster
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "create"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-700"
          }`}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Create New Employee
        </button>
      </div>

      <div className="mt-6">
        {/* CREATE TAB */}
        {activeTab === "create" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8 max-w-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-blue-500" />
              New Employee Details
            </h3>

            <form onSubmit={handleCreateSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-neutral-500" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-9 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="employee@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Temporary Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-neutral-500" />
                    </div>
                    <input 
                      type="password" 
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-9 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Department</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-4 w-4 text-neutral-500" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full pl-9 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Engineering"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Address</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Manager</label>
                  <input 
                    type="text" 
                    value={formData.manager}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Manager Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Joined Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.joinedDate}
                    onChange={(e) => setFormData({...formData, joinedDate: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                Create Account
              </button>
            </form>
          </div>
        )}

        {/* LIST TAB */}
        {activeTab === "list" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            {employeesLoading ? (
              <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-neutral-500" /></div>
            ) : employees.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">
                No employees found. Switch to the "Create" tab to add one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-neutral-950/50 border-b border-neutral-800">
                    <tr>
                      <th className="p-4 font-medium text-neutral-400">Name</th>
                      <th className="p-4 font-medium text-neutral-400">Email</th>
                      <th className="p-4 font-medium text-neutral-400">Department</th>
                      <th className="p-4 font-medium text-neutral-400">Manager</th>
                      <th className="p-4 font-medium text-neutral-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-neutral-800/50 transition-colors">
                        <td className="p-4 font-medium">{emp.name}</td>
                        <td className="p-4 text-neutral-300">{emp.email}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2 py-1 rounded bg-neutral-800 text-xs font-medium text-neutral-300">
                            {emp.department || "N/A"}
                          </span>
                        </td>
                        <td className="p-4 text-neutral-400">{emp.manager || "N/A"}</td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => openEditModal(emp)}
                            className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs font-medium text-neutral-300 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1.5" />
                            Edit
                          </button>
                          <button 
                            onClick={() => openResetModal(emp.id, emp.name)}
                            className="inline-flex items-center px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs font-medium text-neutral-300 transition-colors"
                          >
                            <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Employee Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">Edit Employee Profile</h3>
            
            {errorMsg && editModalOpen && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-500">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={editFormData.name || ""}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Department</label>
                  <input 
                    type="text" 
                    required
                    value={editFormData.department || ""}
                    onChange={(e) => setEditFormData({...editFormData, department: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={editFormData.phone || ""}
                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Address</label>
                  <input 
                    type="text" 
                    value={editFormData.address || ""}
                    onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Manager</label>
                  <input 
                    type="text" 
                    value={editFormData.manager || ""}
                    onChange={(e) => setEditFormData({...editFormData, manager: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Joined Date</label>
                  <input 
                    type="date" 
                    value={editFormData.joinedDate || ""}
                    onChange={(e) => setEditFormData({...editFormData, joinedDate: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50"
                >
                  {editLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-2">Reset Password</h3>
            <p className="text-neutral-400 text-sm mb-6">Enter a new password for <span className="text-white font-medium">{resetName}</span>.</p>
            
            {errorMsg && resetModalOpen && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-500">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-neutral-500" />
                  </div>
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-9 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setResetModalOpen(false)}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading || !newPassword}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50"
                >
                  {resetLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
