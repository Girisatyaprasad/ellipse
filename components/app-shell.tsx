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
    <div className={cn("flex h-screen min-h-[640px] overflow-hidden bg-background font-sans text-foreground", className)}>
      <aside className="hidden h-full w-72 shrink-0 bg-surface-1 md:flex md:flex-col">
        <Link href="/" className="flex h-20 items-center gap-3 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f0e8] text-sm font-semibold text-[#070b12]">
            E
          </div>
          <div className="min-w-0">
            <div className="truncate text-[15px] font-semibold leading-none text-foreground">{workspace?.name ?? "Ellipse"}</div>
            <div className="mt-1.5 truncate text-xs text-muted-foreground">{userEmail ?? "Conversation intelligence"}</div>
          </div>
        </Link>

        <div className="px-4 pb-5">
          <div className="flex h-10 items-center gap-2 rounded-full bg-[#f4f0e8]/[0.07] px-4 text-sm text-muted-foreground">
            <Search className="h-4 w-4 opacity-80" />
            <span>Search conversations</span>
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          <Link href={workspace ? `/workspaces/${workspace.id}/conversations` : "/"} className="mb-5 flex items-center justify-between rounded-full bg-[#f4f0e8]/[0.08] px-4 py-2.5 text-sm font-medium text-foreground">
            <span className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-muted-foreground" />
              Inbox
            </span>
            <span className="rounded-full bg-[#f4f0e8]/[0.1] px-2 py-0.5 text-[11px] text-muted-foreground">{conversations.length}</span>
          </Link>

          <div className="mb-6">
            <div className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">DMs</div>
            <div className="rounded-xl bg-[#f4f0e8]/[0.04] px-4 py-3 text-sm leading-5 text-muted-foreground">
              Direct messages are not wired yet.
            </div>
          </div>

          <div>
            <div className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">Team Conversations</div>
            <div className="space-y-1">
              {conversations.length === 0 ? (
                <div className="rounded-xl bg-[#f4f0e8]/[0.04] px-4 py-3 text-sm text-muted-foreground">No conversations yet.</div>
              ) : null}
              {workspace
                ? conversations.map((conversation) => (
                    <Link
                      key={conversation.id}
                      href={`/workspaces/${workspace.id}/conversations/${conversation.id}`}
                      className={cn(
                        "flex items-center justify-between rounded-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-[#f4f0e8]/[0.05] hover:text-foreground",
                        activeConversationId === conversation.id && "bg-[#f4f0e8]/[0.1] text-foreground",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Hash className="h-4 w-4 shrink-0 opacity-70" />
                        <span className="truncate">{conversation.title}</span>
                      </span>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </nav>

        <div className="p-4">
          {workspace ? (
            <form action={createConversation} className="space-y-2">
              <input type="hidden" name="workspaceId" value={workspace.id} />
              <input
                name="title"
                className="h-10 w-full rounded-full bg-[#f4f0e8]/[0.07] px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
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
        <header className="flex h-14 shrink-0 items-center justify-between bg-surface-1 px-4 md:hidden">
          <div className="text-sm font-semibold text-foreground">{workspace?.name ?? "Ellipse"}</div>
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
