import { NextRequest, NextResponse } from "next/server";
import { uploadToBunny } from "@/lib/bunny";
import { auth } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user via bearer token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    try {
      await auth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Generate unique filename
    const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${folder}/${uniqueId}-${file.name.replace(/\s+/g, "-")}`;

    // 5. Upload to Bunny
    const fileUrl = await uploadToBunny(buffer, fileName);

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
