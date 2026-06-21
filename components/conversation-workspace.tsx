import { Check, Link2, Send, Sparkles, X } from "lucide-react";
import { reviewArtifact, sendMessage, updateArtifact } from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Workspace = {
  id: string;
  name: string;
};

type Conversation = {
  id: string;
  title: string;
};

type Message = {
  id: string;
  author_name: string;
  body: string;
  created_by: string | null;
  occurred_at: string;
};

type ArtifactSource = {
  message_id: string;
  quote: string;
};

type Artifact = {
  id: string;
  type: "task" | "decision" | "blocker";
  status: "pending" | "accepted" | "rejected";
  title: string;
  summary: string | null;
  created_by_email: string | null;
  created_at: string;
  artifact_sources?: ArtifactSource[];
};

function formatMessageTime(value: string) {
  return new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function ArtifactBadge({ type }: { type: Artifact["type"] }) {
  return (
    <span className="rounded border border-white/[0.08] px-2 py-1 text-[11px] font-medium uppercase tracking-[0.05em] text-slate">
      {type}
    </span>
  );
}

function MessageRow({
  message,
  currentUserId,
}: {
  message: Message;
  currentUserId?: string;
}) {
  const own = Boolean(currentUserId && message.created_by === currentUserId);

  return (
    <article className={cn("flex flex-col", own ? "items-end" : "items-start")}>
      <div className={cn("mb-1 flex items-center gap-2 text-xs text-muted-foreground", own && "flex-row-reverse")}>
        <span className="font-medium text-white/80">{message.author_name}</span>
        <span>{formatMessageTime(message.occurred_at)}</span>
      </div>
      <div
        className={cn(
          "max-w-2xl rounded-lg px-4 py-3 text-sm leading-6",
          own ? "border border-white/[0.08] bg-transparent text-white" : "bg-surface-1 text-white",
        )}
      >
        {message.body}
      </div>
    </article>
  );
}

function ReviewArtifactCard({ artifact, workspaceId, conversationId }: { artifact: Artifact; workspaceId: string; conversationId: string }) {
  const source = artifact.artifact_sources?.[0];

  return (
    <article className="rounded-lg border border-white/[0.06] bg-surface-0 p-3">
      <form action={updateArtifact} className="space-y-2">
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <input type="hidden" name="conversationId" value={conversationId} />
        <input type="hidden" name="artifactId" value={artifact.id} />
        <div className="flex items-center justify-between gap-2">
          <select name="type" defaultValue={artifact.type} className="h-8 rounded-md border border-white/[0.08] bg-surface-1 px-2 text-xs text-white focus:outline-none">
            <option value="task">Task</option>
            <option value="decision">Decision</option>
            <option value="blocker">Blocker</option>
          </select>
          <span className="text-[11px] text-muted-foreground">{formatDateTime(artifact.created_at)}</span>
        </div>
        <input
          name="title"
          defaultValue={artifact.title}
          className="h-9 w-full rounded-md border border-white/[0.08] bg-surface-1 px-3 text-sm text-white focus:outline-none"
        />
        <textarea
          name="summary"
          defaultValue={artifact.summary ?? ""}
          className="min-h-14 w-full resize-none rounded-md border border-white/[0.08] bg-surface-1 px-3 py-2 text-xs text-white placeholder:text-muted-foreground focus:outline-none"
          placeholder="Optional note"
        />
        <div className="text-[11px] leading-5 text-muted-foreground">Created by {artifact.created_by_email ?? "unknown"}</div>
        {source ? <div className="rounded-md border border-white/[0.06] bg-surface-1 p-2 text-xs leading-5 text-muted-foreground">Proof: &quot;{source.quote}&quot;</div> : null}
        <div className="flex flex-wrap gap-2 pt-1">
          <Button size="sm" variant="secondary">
            Save edit
          </Button>
        </div>
      </form>
      <div className="mt-2 flex flex-wrap gap-2">
        <form action={reviewArtifact}>
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input type="hidden" name="conversationId" value={conversationId} />
          <input type="hidden" name="artifactId" value={artifact.id} />
          <input type="hidden" name="status" value="accepted" />
          <Button size="sm">
            <Check className="h-3.5 w-3.5" />
            Accept
          </Button>
        </form>
        <form action={reviewArtifact}>
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input type="hidden" name="conversationId" value={conversationId} />
          <input type="hidden" name="artifactId" value={artifact.id} />
          <input type="hidden" name="status" value="rejected" />
          <Button size="sm" variant="ghost">
            <X className="h-3.5 w-3.5" />
            Reject
          </Button>
        </form>
      </div>
    </article>
  );
}

function AcceptedArtifactCard({ artifact }: { artifact: Artifact }) {
  const source = artifact.artifact_sources?.[0];

  return (
    <article className="rounded-md border border-white/[0.06] bg-surface-0 px-3 py-2">
      <div className="mb-2 flex items-center justify-between gap-2">
        <ArtifactBadge type={artifact.type} />
        <span className="text-[11px] text-muted-foreground">{formatDateTime(artifact.created_at)}</span>
      </div>
      <div className="text-sm font-medium text-white">{artifact.title}</div>
      {artifact.summary ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{artifact.summary}</p> : null}
      <div className="mt-2 text-[11px] text-muted-foreground">Created by {artifact.created_by_email ?? "unknown"}</div>
      {source ? <div className="mt-2 rounded border border-white/[0.06] bg-surface-1 p-2 text-xs leading-5 text-muted-foreground">Proof: &quot;{source.quote}&quot;</div> : null}
    </article>
  );
}

function ArtifactSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.05em] text-muted-foreground">{title}</h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md border border-white/[0.06] bg-surface-0 px-3 py-2 text-sm text-muted-foreground">{children}</div>;
}

export function ConversationWorkspace({
  workspace,
  conversations = [],
  activeConversation = null,
  messages = [],
  artifacts = [],
  userId,
  userEmail,
}: {
  workspace?: Workspace;
  conversations?: Conversation[];
  activeConversation?: Conversation | null;
  messages?: Message[];
  artifacts?: Artifact[];
  userId?: string;
  userEmail?: string | null;
}) {
  const pendingArtifacts = artifacts.filter((artifact) => artifact.status === "pending");
  const acceptedArtifacts = artifacts.filter((artifact) => artifact.status === "accepted");

  return (
    <AppShell
      workspace={workspace}
      conversations={conversations}
      activeConversationId={activeConversation?.id}
      userEmail={userEmail}
    >
      <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="flex min-w-0 flex-col border-r border-white/[0.06]">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-white">{activeConversation?.title ?? "No conversation selected"}</h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeConversation ? `${messages.length} messages / ${pendingArtifacts.length} pending / ${acceptedArtifacts.length} accepted` : "Create or select a conversation"}
              </p>
            </div>
            <Button variant="secondary" size="sm" disabled>
              <Sparkles className="h-4 w-4" />
              Ask Ellipse
            </Button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              {!activeConversation ? (
                <div className="rounded-lg border border-white/[0.06] bg-surface-1 p-6 text-center text-sm text-muted-foreground">
                  Create a conversation from the sidebar to start.
                </div>
              ) : null}
              {activeConversation && messages.length === 0 ? (
                <div className="rounded-lg border border-white/[0.06] bg-surface-1 p-6 text-center text-sm text-muted-foreground">
                  No messages yet. Send the first message below.
                </div>
              ) : null}
              {messages.map((message) => (
                <MessageRow
                  key={message.id}
                  message={message}
                  currentUserId={userId}
                />
              ))}
            </div>
          </div>

          <footer className="shrink-0 border-t border-white/[0.06] bg-surface-0 p-3">
            <form action={sendMessage} className="mx-auto flex max-w-3xl items-end gap-2 rounded-lg border border-white/[0.1] bg-surface-1 p-2">
              <input type="hidden" name="workspaceId" value={workspace?.id ?? ""} />
              <input type="hidden" name="conversationId" value={activeConversation?.id ?? ""} />
              <textarea
                name="body"
                disabled={!activeConversation}
                className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-6 text-white placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={activeConversation ? `Message ${activeConversation.title}...` : "Select a conversation first"}
                rows={1}
              />
              <Button size="icon" aria-label="Send message" disabled={!activeConversation}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </footer>
        </section>

        <aside className="hidden min-h-0 flex-col bg-surface-1 lg:flex">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Conversation Context</h2>
              <p className="mt-1 text-xs text-muted-foreground">Artifacts and proof from this chat</p>
            </div>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </header>
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
            <ArtifactSection title="Review">
              {pendingArtifacts.length === 0 ? <EmptyState>No pending artifacts.</EmptyState> : null}
              {workspace && activeConversation
                ? pendingArtifacts.map((artifact) => (
                    <ReviewArtifactCard key={artifact.id} artifact={artifact} workspaceId={workspace.id} conversationId={activeConversation.id} />
                  ))
                : null}
            </ArtifactSection>

            <ArtifactSection title="Accepted Artifacts">
              {acceptedArtifacts.length === 0 ? <EmptyState>No accepted artifacts yet.</EmptyState> : null}
              {acceptedArtifacts.map((artifact) => (
                <AcceptedArtifactCard key={artifact.id} artifact={artifact} />
              ))}
            </ArtifactSection>

            <ArtifactSection title="Rejected">
              {artifacts.filter((artifact) => artifact.status === "rejected").length === 0 ? <EmptyState>No rejected artifacts.</EmptyState> : null}
              {artifacts
                .filter((artifact) => artifact.status === "rejected")
                .map((artifact) => (
                  <AcceptedArtifactCard key={artifact.id} artifact={artifact} />
                ))}
            </ArtifactSection>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
