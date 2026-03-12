import { NextResponse } from "next/server";
import { listFilesInFolder } from "@/lib/google-drive";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "default";

    const items = await listFilesInFolder(folder);

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media", items: [] },
      { status: 500 }
    );
  }
}
