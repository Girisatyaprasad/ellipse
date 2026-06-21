import { redirect } from "next/navigation";
import { ConversationWorkspace } from "@/components/conversation-workspace";
import { getCurrentUserContext } from "@/lib/auth/dev-bypass";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ workspaceId: string; conversationId: string }>;
}) {
  const { workspaceId, conversationId } = await params;
  const session = await getCurrentUserContext();

  if (!session) redirect("/login");
  const { supabase, user } = session;

  const [{ data: workspace }, { data: conversations = [] }, { data: activeConversation }, { data: messages = [] }, { data: artifacts = [] }] = await Promise.all([
    supabase.from("workspaces").select("id, name").eq("id", workspaceId).single(),
    supabase.from("conversations").select("id, title").eq("workspace_id", workspaceId).order("created_at", { ascending: true }),
    supabase.from("conversations").select("id, title").eq("workspace_id", workspaceId).eq("id", conversationId).single(),
    supabase
      .from("messages")
      .select("id, author_name, body, created_by, occurred_at")
      .eq("workspace_id", workspaceId)
      .eq("conversation_id", conversationId)
      .order("occurred_at", { ascending: true }),
    supabase
      .from("artifacts")
      .select("id, type, status, title, summary, assignee, task_status, due_date, created_by_email, created_at, artifact_sources(message_id, quote)")
      .eq("workspace_id", workspaceId)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false }),
  ]);

  if (!workspace) redirect("/workspaces/new");
  if (!activeConversation) redirect(`/workspaces/${workspaceId}/conversations`);

  return (
    <ConversationWorkspace
      workspace={workspace}
      conversations={conversations ?? []}
      activeConversation={activeConversation}
      messages={messages ?? []}
      artifacts={artifacts ?? []}
      userId={user.id}
      userEmail={user.email}
    />
  );
}
