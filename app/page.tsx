import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function SetupRequired() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="max-w-lg rounded-lg border border-white/[0.08] bg-surface-1 p-6">
        <h1 className="text-xl font-semibold text-white">Supabase env vars required</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, run `supabase/schema.sql`, then restart the dev server.
        </p>
      </div>
    </main>
  );
}

export default async function HomePage() {
  if (!hasSupabaseEnv()) return <SetupRequired />;

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");

  const { data: membership } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!membership) {
    redirect("/workspaces/new");
  }

  const { data: firstConversation } = await supabase
    .from("conversations")
    .select("id")
    .eq("workspace_id", membership.workspace_id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (firstConversation) {
    redirect(`/workspaces/${membership.workspace_id}/conversations/${firstConversation.id}`);
  }

  redirect(`/workspaces/${membership.workspace_id}/conversations`);
}
