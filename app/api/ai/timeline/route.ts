import { NextResponse } from "next/server";
import { timeline } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    flow: "timeline",
    events: timeline.map((event) => ({
      type: event.type,
      title: event.title,
      time: event.time,
      body: event.body,
      tone: event.tone,
    })),
  });
}
