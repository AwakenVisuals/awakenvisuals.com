import { NextResponse } from "next/server";
import { getImagesFromFolder } from "@/lib/google-drive";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "";

    const items = await getImagesFromFolder(folder);

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media", items: [] },
      { status: 500 }
    );
  }
}
