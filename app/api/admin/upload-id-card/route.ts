import { NextRequest, NextResponse } from "next/server";
import { auth as adminAuth, db } from "@/lib/firebase-admin";
import { uploadToBunny } from "@/lib/bunny";

export async function POST(req: NextRequest) {
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

    const callerDoc = await db.collection("users").doc(decodedToken.uid).get();
    if (!callerDoc.exists || callerDoc.data()?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const uid = formData.get("uid") as string | null;

    if (!file || !uid) {
      return NextResponse.json({ error: "Missing required fields (file, uid)" }, { status: 400 });
    }

    // 3. Upload file to Bunny Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a unique filename
    const ext = file.name.split('.').pop();
    const fileName = `id-cards/${uid}-${Date.now()}.${ext}`;

    const fileUrl = await uploadToBunny(buffer, fileName);

    // 4. Update the user's document in Firestore
    await db.collection("users").doc(uid).update({
      idCardUrl: fileUrl,
    });

    return NextResponse.json({ success: true, url: fileUrl }, { status: 200 });

  } catch (error: any) {
    console.error("Error uploading ID card:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
