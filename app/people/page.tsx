import { Filter, Grid2X2, MoreHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip, PageHeader } from "@/components/primitives";
import { people } from "@/lib/data";

export default function PeoplePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Capabilities"
        title="Capabilities & Ownership"
        description="Directory mapping skills, current domain focus, and operational blockers across the network."
        actions={
          <>
            <Button variant="secondary"><Filter className="h-4 w-4" /> Filter Focus</Button>
            <Button variant="secondary"><Grid2X2 className="h-4 w-4" /> Grid View</Button>
          </>
        }
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {people.map((person) => (
          <Card key={person.name} className="flex flex-col p-6">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] font-label text-sm text-white">
                  {person.initials}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">{person.name}</h2>
                  <p className="font-mono text-xs text-slate">{person.role}</p>
                </div>
              </div>
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-5">
              <div>
                <p className="label-caps mb-2 text-muted-foreground">Active Ownership</p>
                <div className="flex flex-wrap gap-2">
                  {person.ownership.map((item) => <Chip key={item}>{item}</Chip>)}
                </div>
              </div>
              <div className="rounded-lg border border-white/[0.055] bg-surface-0/70 p-3">
                <p className="label-caps mb-2 text-muted-foreground">Status</p>
                <p className="text-sm leading-6 text-muted-foreground">{person.blocker}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.055] pt-4">
              <div className="flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className={dot < person.load ? "h-2 w-2 rounded-full bg-slate" : "h-2 w-2 rounded-full bg-white/10"} />
                ))}
              </div>
              <Button variant="ghost" size="sm">Expand Detail</Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
