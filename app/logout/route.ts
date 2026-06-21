import { redirect } from "next/navigation";
import { clearDevBypass } from "@/lib/auth/dev-bypass";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  await clearDevBypass();
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
