import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { JOBS_TAG } from "@/lib/jobs-queries";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, message: "Invalid secret" },
      { status: 401 }
    );
  }
  revalidateTag(JOBS_TAG);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
