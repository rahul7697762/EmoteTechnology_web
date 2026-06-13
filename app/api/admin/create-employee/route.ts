import { NextRequest, NextResponse } from "next/server";
import { auth as adminAuth, db } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate that the requester is actually an admin
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
    const { name, email, password, department, phone, address, manager, joinedDate } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 3. Create the user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // 4. Save the user profile in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      id: userRecord.uid,
      name,
      email,
      department: department || "General",
      role: "employee",
      phone: phone || "",
      address: address || "",
      manager: manager || "",
      joinedDate: joinedDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      profilePic: null,
      idCardUrl: null
    });

    return NextResponse.json({ success: true, uid: userRecord.uid }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating employee:", error);
    // If it's a firebase error like email already exists, return that
    if (error.code === "auth/email-already-exists") {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
