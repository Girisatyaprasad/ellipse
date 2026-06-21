import { Clock3, Tag } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Chip, PageHeader, StatusDot } from "@/components/primitives";

const proof = [
  ["09:42", "System assigned task to Marcus Thorne", "Auto-routed based on incident analysis from the Payment Outage thread consensus."],
  ["10:15", "Sarah Jenkins changed priority", "P2 Standard -> P1 Critical"],
  ["11:03", "Blocker reported by Marcus Thorne", "Unable to acquire lock on database shard 7. DBA intervention required."],
];

export default function TaskDetailPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Task Detail"
          title="Re-sync cluster SYD-4"
          description="A task artifact with ownership, source context, related decision lineage, and proof trail."
        />
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> TSK-8902</span>
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Due Today</span>
          <Chip><StatusDot tone="active" /> In Progress</Chip>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            ["Assignee", "Marcus Thorne", "Infrastructure Ops"],
            ["Source Context", "Payment Outage thread", "#incident-response"],
            ["Related Decision", "Infrastructure Hardening", "DEC-045"],
          ].map(([label, value, meta]) => (
            <Card key={label} className="p-5">
              <div className="label-caps mb-4 text-muted-foreground">{label}</div>
              <div className="text-sm font-medium text-white">{value}</div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">{meta}</div>
            </Card>
          ))}
        </div>

        <section className="border-t border-white/[0.055] pt-8">
          <h2 className="mb-8 text-xl font-medium text-white">Proof and Lineage</h2>
          <div className="relative ml-3 space-y-8">
            <div className="lead-line absolute bottom-3 left-0 top-3 w-px" />
            {proof.map(([time, title, body], index) => (
              <div key={title} className="relative flex gap-8">
                <span className="absolute -left-[4px] top-2 h-2 w-2 rounded-full border-2 border-slate bg-surface-0" />
                <div className="hidden w-20 pl-5 font-mono text-xs text-muted-foreground md:block">{time}</div>
                <Card className="ml-5 flex-1 p-5 md:ml-0">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                    <span className="font-mono text-xs text-muted-foreground md:hidden">{time}</span>
                  </div>
                  <p className={index === 2 ? "text-sm leading-6 text-destructive" : "text-sm leading-6 text-muted-foreground"}>{body}</p>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
