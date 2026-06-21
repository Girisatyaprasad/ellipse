import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    flow: "organize",
    input: body,
    workspace: {
      teams: ["Engineering", "Design", "Operations"],
      cadence: "Weekly leadership sync, daily incident triage",
      confidence: 0.82,
    },
  });
}
