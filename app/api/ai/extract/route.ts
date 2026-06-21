import { NextResponse } from "next/server";
import { extractArtifactsFromMessage } from "@/lib/ai/extract-message";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message : typeof body.text === "string" ? body.text : "";
  const artifacts = await extractArtifactsFromMessage(message);

  return NextResponse.json({ flow: "extract", artifacts });
}
