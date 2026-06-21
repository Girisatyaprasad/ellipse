import { Link2, Send, Sparkles } from "lucide-react";
import { sendMessage } from "@/app/actions";
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

function formatMessageTime(value: string) {
  return new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function MessageRow({ message, currentUserId }: { message: Message; currentUserId?: string }) {
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

function ContextSection({ title, items, tone = "default" }: { title: string; items: string[]; tone?: "default" | "danger" }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.05em] text-muted-foreground">{title}</h3>
      {items.length === 0 ? (
        <div className="rounded-md border border-white/[0.06] bg-surface-0 px-3 py-2 text-sm text-muted-foreground">None yet.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item} className="rounded-md border border-white/[0.06] bg-surface-0 px-3 py-2 text-sm text-white">
              <span className={cn("mr-2 inline-block h-1.5 w-1.5 rounded-full", tone === "danger" ? "bg-destructive" : "bg-slate")} />
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function ConversationWorkspace({
  workspace,
  conversations = [],
  activeConversation = null,
  messages = [],
  userId,
  userEmail,
}: {
  workspace?: Workspace;
  conversations?: Conversation[];
  activeConversation?: Conversation | null;
  messages?: Message[];
  userId?: string;
  userEmail?: string | null;
}) {
  return (
    <AppShell
      workspace={workspace}
      conversations={conversations}
      activeConversationId={activeConversation?.id}
      userEmail={userEmail}
    >
      <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="flex min-w-0 flex-col border-r border-white/[0.06]">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-white">{activeConversation?.title ?? "No conversation selected"}</h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeConversation ? `${messages.length} persisted messages` : "Create or select a conversation"}
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
                <MessageRow key={message.id} message={message} currentUserId={userId} />
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
              <p className="mt-1 text-xs text-muted-foreground">Compiled from this chat</p>
            </div>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </header>
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
            <ContextSection title="Needs Review" items={[]} />
            <ContextSection title="Accepted Tasks" items={[]} />
            <ContextSection title="Decisions" items={[]} />
            <ContextSection title="Blockers" items={[]} tone="danger" />
            <section className="rounded-lg border border-white/[0.06] bg-surface-0 p-3">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.05em] text-muted-foreground">Proof Trail</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Proof starts in the extraction/review phases. Phase 1 now persists workspaces, conversations, and messages.
              </p>
            </section>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
