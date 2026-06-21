import { Filter, MessageSquare } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip, PageHeader, StatusDot } from "@/components/primitives";
import { decisions } from "@/lib/data";

export default function DecisionsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Decision Ledger"
        title="Decision Log"
        description="Chronological commitments extracted from organizational dialogue, with source conversations and impacted work kept close."
        actions={<Button variant="secondary"><Filter className="h-4 w-4" /> Filter</Button>}
      />
      <div className="relative border-l border-white/[0.055] pl-8">
        {decisions.map((decision, index) => (
          <div key={decision.id} className={index === 1 ? "relative mb-10 ml-8" : "relative mb-10"}>
            <span className="absolute -left-[37px] top-5 h-2 w-2 rounded-full bg-white ring-4 ring-background" />
            {index === 1 ? <span className="absolute -left-[69px] top-6 h-px w-8 bg-white/[0.055]" /> : null}
            <Card className="p-6">
              <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Chip>{decision.category}</Chip>
                    <Chip>{decision.id}</Chip>
                  </div>
                  <h2 className="text-xl font-medium text-white">{decision.title}</h2>
                </div>
                <div className="text-left md:text-right">
                  <div className="font-mono text-xs text-muted-foreground">{decision.time}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground md:justify-end">
                    <StatusDot tone={decision.status === "In Progress" ? "active" : "pending"} />
                    {decision.status}
                  </div>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-12">
                <p className="text-sm leading-6 text-muted-foreground md:col-span-8">{decision.context}</p>
                <div className="border-white/[0.055] md:col-span-4 md:border-l md:pl-6">
                  <div className="label-caps mb-2 text-muted-foreground">Decided By</div>
                  <div className="text-sm text-white">{decision.owner}</div>
                  <div className="label-caps mb-2 mt-5 text-muted-foreground">Impact</div>
                  <div className="text-sm text-white">{decision.impact}</div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-white/[0.055] pt-4 text-sm text-slate">
                <MessageSquare className="h-4 w-4" />
                {decision.source}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
