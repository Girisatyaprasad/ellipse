import { redirect } from "next/navigation";
import { ConversationWorkspace } from "@/components/conversation-workspace";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspaceConversationsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) redirect("/login");

  const { data: workspace } = await supabase.from("workspaces").select("id, name").eq("id", workspaceId).single();
  if (!workspace) redirect("/workspaces/new");

  const { data: conversations = [] } = await supabase
    .from("conversations")
    .select("id, title")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true });

  return (
    <ConversationWorkspace
      workspace={workspace}
      conversations={conversations ?? []}
      activeConversation={null}
      messages={[]}
      userId={userData.user.id}
      userEmail={userData.user.email}
    />
  );
}
