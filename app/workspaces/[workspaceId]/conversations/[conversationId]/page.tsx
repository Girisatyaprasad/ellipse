import { redirect } from "next/navigation";
import { ConversationWorkspace } from "@/components/conversation-workspace";
import { createClient } from "@/lib/supabase/server";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ workspaceId: string; conversationId: string }>;
}) {
  const { workspaceId, conversationId } = await params;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) redirect("/login");

  const [{ data: workspace }, { data: conversations = [] }, { data: activeConversation }, { data: messages = [] }] = await Promise.all([
    supabase.from("workspaces").select("id, name").eq("id", workspaceId).single(),
    supabase.from("conversations").select("id, title").eq("workspace_id", workspaceId).order("created_at", { ascending: true }),
    supabase.from("conversations").select("id, title").eq("workspace_id", workspaceId).eq("id", conversationId).single(),
    supabase
      .from("messages")
      .select("id, author_name, body, created_by, occurred_at")
      .eq("workspace_id", workspaceId)
      .eq("conversation_id", conversationId)
      .order("occurred_at", { ascending: true }),
  ]);

  if (!workspace) redirect("/workspaces/new");
  if (!activeConversation) redirect(`/workspaces/${workspaceId}/conversations`);

  return (
    <ConversationWorkspace
      workspace={workspace}
      conversations={conversations ?? []}
      activeConversation={activeConversation}
      messages={messages ?? []}
      userId={userData.user.id}
      userEmail={userData.user.email}
    />
  );
}
