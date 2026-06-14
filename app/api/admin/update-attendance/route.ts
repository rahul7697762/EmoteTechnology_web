import { NextRequest, NextResponse } from "next/server";
import { auth as adminAuth, db } from "@/lib/firebase-admin";

export async function PATCH(req: NextRequest) {
  try {
    // 1. Verify admin token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const callerDoc = await db.collection("users").doc(decodedToken.uid).get();
    if (!callerDoc.exists || callerDoc.data()?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    // 2. Parse body
    const { id, loginTime, logoutTime, status } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing record id" }, { status: 400 });
    }

    // 3. Build update payload
    const updates: Record<string, any> = {};
    if (loginTime !== undefined) updates.loginTime = loginTime;
    if (logoutTime !== undefined) updates.logoutTime = logoutTime;
    if (status !== undefined) updates.status = status;

    await db.collection("attendance").doc(id).update(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
