import { CalendarClock, ChevronRight, GitBranch, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Chip, PageHeader } from "@/components/primitives";

const evidence = [
  {
    label: "Jira Ticket Updated",
    time: "Oct 12, 14:30 PST",
    body: "Blocked by SEC-492: Auth token leakage in specific edge cases. Launch date moved to Oct 26 pending patch.",
  },
  {
    label: "Engineering Sync Transcript",
    time: "Oct 13, 09:00 PST",
    body: "We cannot ship until the auth service is verified. The migration took longer than expected and pulled resources from final QA.",
  },
];

export default function MemoryDetailPage() {
  return (
    <AppShell>
      <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
        <section>
          <PageHeader
            eyebrow="Organizational Memory"
            title="Why was the V2.4 launch delayed?"
            description="A synthesized answer with source evidence, actor context, and the dependency web that produced the delay."
          />
          <Card className="mb-12 overflow-hidden p-6">
            <div className="flex gap-4">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-slate" />
              <div>
                <p className="text-base leading-8 text-white">
                  The V2.4 launch was delayed by a critical security vulnerability discovered during final penetration testing.
                  Secondary factors included resource reallocation to the Enterprise Client migration and unresolved dependencies in
                  the authentication microservice.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Chip><CalendarClock className="h-3 w-3" /> Delay: 14 days</Chip>
                  <Chip>Security Blocker</Chip>
                  <Chip>Auth Microservice</Chip>
                </div>
              </div>
            </div>
          </Card>

          <h2 className="mb-6 text-xl font-medium text-white">Evidence Trail</h2>
          <div className="relative ml-3 space-y-6 pl-6">
            <div className="lead-line absolute bottom-4 left-0 top-4 w-px" />
            {evidence.map((item) => (
              <Card key={item.label} className="relative p-5">
                <span className="absolute -left-[31px] top-5 h-2 w-2 rounded-full border-2 border-slate bg-surface-0" />
                <div className="mb-3 flex items-start justify-between gap-4">
                  <span className="label-caps text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{item.time}</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <div>
            <h3 className="label-caps mb-3 text-muted-foreground">Key Actors</h3>
            {["Sarah Chen - Lead Security", "Marcus Thorne - Infrastructure"].map((actor) => (
              <div key={actor} className="flex items-center justify-between rounded-lg border border-transparent p-3 text-sm text-white hover:border-white/[0.055] hover:bg-white/[0.025]">
                {actor}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2 text-muted-foreground">
              <GitBranch className="h-4 w-4" />
              <span className="label-caps">Contextual Web</span>
            </div>
            <div className="space-y-3 text-sm text-white">
              <div>Auth Microservice V3</div>
              <div>Q3 Enterprise Migration</div>
              <div>Security Review SEC-492</div>
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
