import { NextRequest, NextResponse } from "next/server";
import { auth as adminAuth, db } from "@/lib/firebase-admin";

export async function DELETE(req: NextRequest) {
  try {
    // 1. Authenticate that the requester is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Double check they have an admin role in the database
    const callerDoc = await db.collection("users").doc(decodedToken.uid).get();
    if (!callerDoc.exists || callerDoc.data()?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    // 2. Parse the request body
    const body = await req.json();
    const { uid } = body;

    if (!uid) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // 3. Delete the user in Firebase Auth
    await adminAuth.deleteUser(uid);

    // 4. Delete the user profile in Firestore
    await db.collection("users").doc(uid).delete();

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
