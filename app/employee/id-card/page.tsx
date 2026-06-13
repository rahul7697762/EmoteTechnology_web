"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { IdCard, Download, Loader2 } from "lucide-react";

export default function IdCardPage() {
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

  const handleDownload = () => {
    // In a real scenario, this could trigger a PDF generation or download an image
    if (profile?.idCardUrl) {
      window.open(profile.idCardUrl, "_blank");
    } else {
      alert("ID Card image not available to download. Please contact administration.");
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Digital ID Card</h2>
          <p className="text-neutral-400 mt-2">View and download your official company ID card.</p>
        </div>
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Download
        </button>
      </div>

      <div className="flex justify-center py-12">
        {/* ID Card Component */}
        <div className="relative w-80 h-[30rem] bg-gradient-to-br from-blue-900 via-neutral-900 to-indigo-950 rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col items-center pt-8 pb-6 px-6">
          
          {/* Logo / Company Name placeholder */}
          <div className="w-full flex justify-center mb-6">
            <div className="text-xl font-black tracking-widest text-white flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-sm transform rotate-45"></div>
              EMOTE
            </div>
          </div>

          {/* Photo */}
          <div className="w-32 h-32 bg-neutral-800 rounded-xl mb-4 border-4 border-neutral-800 overflow-hidden shadow-inner">
            {profile?.profilePic ? (
              <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                <User className="w-12 h-12 text-neutral-600" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="text-center w-full space-y-1 mb-8 flex-1">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">{profile?.name || "Employee Name"}</h3>
            <p className="text-blue-400 text-sm font-medium uppercase tracking-widest">{profile?.department || "Department"}</p>
            <p className="text-neutral-500 text-xs mt-2">ID: EMP-{auth.currentUser?.uid?.substring(0, 6).toUpperCase() || "000000"}</p>
          </div>

          {/* Barcode placeholder */}
          <div className="w-full h-12 bg-white/10 rounded flex items-center justify-center p-2 mb-2">
             <div className="w-full h-full border-x-4 border-white/20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 2px, transparent 2px, transparent 6px, #fff 6px, #fff 10px, transparent 10px, transparent 12px)' }}></div>
          </div>
          <div className="text-[10px] text-neutral-500 tracking-widest">{auth.currentUser?.uid?.toUpperCase() || "BARCODE"}</div>

          {/* Hologram/Security feature */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center overflow-hidden mix-blend-screen opacity-50">
             <div className="w-full h-full bg-gradient-to-tr from-transparent via-blue-500/30 to-purple-500/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick import for the placeholder icon since we used it
import { User } from "lucide-react";
