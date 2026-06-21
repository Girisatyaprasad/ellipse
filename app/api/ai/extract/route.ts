import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    flow: "extract",
    input: body,
    entities: {
      tasks: ["Sync secrets to SYD-4"],
      decisions: ["Adopt Rust for Core backend migration"],
      blockers: ["Legacy auth service not decoupled"],
    },
  });
}
