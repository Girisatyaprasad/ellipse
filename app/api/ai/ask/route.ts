import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    flow: "ask",
    question: body.question ?? null,
    answer:
      "The strongest current risk is the auth-service dependency. Security sign-off and DBA intervention are both required before the SYD-4 cluster work can close.",
    sources: ["Payment Outage thread", "SEC-492", "DEC-045"],
  });
}
