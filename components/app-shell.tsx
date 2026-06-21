import Link from "next/link";
import { Bell, Hash, Inbox, LogOut, MessageCircle, Search, Sparkles } from "lucide-react";
import { createConversation, signOut } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConversationNavItem = {
  id: string;
  title: string;
};

export function AppShell({
  children,
  className,
  workspace,
  conversations = [],
  activeConversationId,
  userEmail,
}: {
  children: React.ReactNode;
  className?: string;
  workspace?: { id: string; name: string };
  conversations?: ConversationNavItem[];
  activeConversationId?: string;
  userEmail?: string | null;
}) {
  return (
    <div className={cn("flex h-screen min-h-[640px] overflow-hidden bg-background text-foreground", className)}>
      <aside className="hidden h-full w-72 shrink-0 border-r border-white/[0.06] bg-surface-1 md:flex md:flex-col">
        <Link href="/" className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white text-sm font-semibold text-black">
            E
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold leading-none text-white">{workspace?.name ?? "Ellipse"}</div>
            <div className="mt-1 truncate text-xs text-muted-foreground">{userEmail ?? "Conversation intelligence"}</div>
          </div>
        </Link>

        <div className="border-b border-white/[0.06] p-3">
          <div className="flex h-9 items-center gap-2 rounded-md border border-white/[0.08] bg-surface-0 px-3 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Search conversations</span>
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto p-3">
          <Link href={workspace ? `/workspaces/${workspace.id}/conversations` : "/"} className="mb-4 flex items-center justify-between rounded-md bg-white/[0.06] px-3 py-2 text-sm font-medium text-white">
            <span className="flex items-center gap-2">
              <Inbox className="h-4 w-4" />
              Inbox
            </span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[11px]">{conversations.length}</span>
          </Link>

          <div className="mb-5">
            <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">DMs</div>
            <div className="rounded-md border border-white/[0.06] px-3 py-2 text-sm text-muted-foreground">
              Direct messages are not wired yet.
            </div>
          </div>

          <div>
            <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Team Conversations</div>
            <div className="space-y-1">
              {conversations.length === 0 ? (
                <div className="rounded-md border border-white/[0.06] px-3 py-2 text-sm text-muted-foreground">No conversations yet.</div>
              ) : null}
              {workspace
                ? conversations.map((conversation) => (
                    <Link
                      key={conversation.id}
                      href={`/workspaces/${workspace.id}/conversations/${conversation.id}`}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-white/[0.04] hover:text-white",
                        activeConversationId === conversation.id && "bg-white/[0.06] text-white",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Hash className="h-4 w-4 shrink-0" />
                        <span className="truncate">{conversation.title}</span>
                      </span>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </nav>

        <div className="border-t border-white/[0.06] p-3">
          {workspace ? (
            <form action={createConversation} className="space-y-2">
              <input type="hidden" name="workspaceId" value={workspace.id} />
              <input
                name="title"
                className="h-9 w-full rounded-md border border-white/[0.08] bg-surface-0 px-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none"
                placeholder="New conversation title"
              />
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircle className="h-4 w-4" />
                New conversation
              </Button>
            </form>
          ) : null}
          <form action={signOut} className="mt-2">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] bg-surface-1 px-4 md:hidden">
          <div className="text-sm font-semibold text-white">{workspace?.name ?? "Ellipse"}</div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Ask Ellipse">
              <Sparkles className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
