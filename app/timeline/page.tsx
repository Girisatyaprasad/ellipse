import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/primitives";
import { timeline } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function TimelinePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Reality Timeline"
        title="Organizational Reality"
        description="A linear reconstruction of events, decisions, and shifts across the organization. Nodes reveal contextual lineage."
        actions={
          <div className="rounded-lg border border-white/[0.055] bg-surface-1 p-1">
            {["Company", "Project", "Person"].map((scope, index) => (
              <Button key={scope} size="sm" variant={index === 0 ? "default" : "ghost"}>{scope}</Button>
            ))}
          </div>
        }
      />
      <div className="relative mx-auto max-w-5xl pb-16">
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-white/[0.055] to-transparent" />
        {timeline.map((item, index) => {
          const Icon = item.icon;
          const left = index % 2 === 0;
          return (
            <div key={item.title} className="relative mb-10 grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_3rem_1fr]">
              <div className={cn(!left && "md:col-start-3")}>
                <div className={cn("mb-2 font-mono text-xs text-muted-foreground", left && "md:text-right")}>{item.time}</div>
                <Card className="p-5">
                  <div className={cn("mb-2 flex items-center gap-2", item.tone === "error" ? "text-destructive" : "text-slate")}>
                    <Icon className="h-4 w-4" />
                    <span className="label-caps">{item.type}</span>
                  </div>
                  <h2 className="mb-2 text-lg font-medium text-white">{item.title}</h2>
                  <p className="text-sm leading-6 text-muted-foreground">{item.body}</p>
                </Card>
              </div>
              <span className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate bg-surface-0 shadow-[0_0_18px_rgba(148,163,184,0.22)] md:block" />
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
