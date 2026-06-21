import { redirect } from "next/navigation";
import { ConversationWorkspace } from "@/components/conversation-workspace";
import { getCurrentUserContext } from "@/lib/auth/dev-bypass";

export default async function WorkspaceConversationsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const session = await getCurrentUserContext();

  if (!session) redirect("/login");
  const { supabase, user } = session;

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
      userId={user.id}
      userEmail={user.email}
    />
  );
}
