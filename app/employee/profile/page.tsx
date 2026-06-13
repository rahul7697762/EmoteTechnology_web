"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User, Mail, Briefcase, Phone, Loader2, MapPin, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return;
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) fetchProfile();
      else setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  if (!profile) {
    return <div className="p-8 text-center text-neutral-500">Profile not found. Please contact administration.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-neutral-400 mt-2">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {/* Header/Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="px-8 pb-8 relative">
          {/* Avatar */}
          <div className="absolute -top-16 left-8 p-1 bg-neutral-900 rounded-full">
            <div className="w-32 h-32 bg-neutral-800 rounded-full flex items-center justify-center border-4 border-neutral-900 overflow-hidden">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-neutral-500" />
              )}
            </div>
          </div>

          <div className="mt-20 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{profile.name || "Employee"}</h3>
              <p className="text-blue-400 font-medium mt-1">{profile.role === 'admin' ? 'Administrator' : profile.department || 'Employee'}</p>
            </div>
            
            <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Request Edit
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold border-b border-neutral-800 pb-2">Contact Info</h4>
              
              <div className="flex items-center text-neutral-300">
                <Mail className="w-5 h-5 mr-3 text-neutral-500" />
                <span>{auth.currentUser?.email || profile.email || "Not provided"}</span>
              </div>
              
              <div className="flex items-center text-neutral-300">
                <Phone className="w-5 h-5 mr-3 text-neutral-500" />
                <span>{profile.phone || "Not provided"}</span>
              </div>

              <div className="flex items-center text-neutral-300">
                <MapPin className="w-5 h-5 mr-3 text-neutral-500" />
                <span>{profile.address || "Not provided"}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold border-b border-neutral-800 pb-2">Work Details</h4>
              
              <div className="flex items-center text-neutral-300">
                <Briefcase className="w-5 h-5 mr-3 text-neutral-500" />
                <span><span className="text-neutral-500 mr-2">Dept:</span> {profile.department || "N/A"}</span>
              </div>
              
              <div className="flex items-center text-neutral-300">
                <User className="w-5 h-5 mr-3 text-neutral-500" />
                <span><span className="text-neutral-500 mr-2">Manager:</span> {profile.manager || "N/A"}</span>
              </div>
              
              <div className="flex items-center text-neutral-300">
                <Calendar className="w-5 h-5 mr-3 text-neutral-500" />
                <span><span className="text-neutral-500 mr-2">Joined:</span> {profile.joinedDate ? new Date(profile.joinedDate).toLocaleDateString() : "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
