import { ArrowRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip, PageHeader } from "@/components/primitives";

export default function DescribeOrganizationPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Onboarding"
          title="Tell us how your organization works."
          description="Write naturally. Ellipse maps people, roles, teams, and critical timelines into workspace intelligence."
        />
        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div className="relative min-h-[440px]">
              <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-slate via-white/15 to-transparent" />
              <textarea
                className="min-h-[440px] w-full resize-none bg-transparent pl-6 text-xl leading-9 text-white placeholder:text-muted-foreground/40 focus:outline-none"
                defaultValue="Rahul is frontend lead. Marcus handles backend. Design is Aisha and Kevin. We launch next Thursday."
              />
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/[0.055] pt-5">
              <span className="label-caps text-muted-foreground">Press Enter to finalize</span>
              <Button>
                Build Workspace <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          <aside className="lg:col-span-5">
            <Card className="sticky top-24 p-6">
              <div className="mb-8 flex items-center justify-between border-b border-white/[0.055] pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-slate" />
                  <span className="label-caps text-white">Active Processing</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-blue-400" />
              </div>
              <div className="space-y-8">
                <section>
                  <h2 className="label-caps mb-3 text-muted-foreground">People Identified</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Rahul", "Marcus", "Aisha", "Kevin"].map((name) => (
                      <Chip key={name}>{name}</Chip>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="label-caps mb-3 text-muted-foreground">Mapped Roles</h2>
                  <div className="space-y-2 border-l border-white/[0.08] pl-4 text-sm">
                    <div className="flex justify-between gap-4"><span className="text-white">Frontend Lead</span><span className="text-muted-foreground">Rahul</span></div>
                    <div className="flex justify-between gap-4"><span className="text-white">Backend</span><span className="text-muted-foreground">Marcus</span></div>
                  </div>
                </section>
                <section>
                  <h2 className="label-caps mb-3 text-muted-foreground">Squads / Teams</h2>
                  <div className="flex gap-2"><Chip>Engineering</Chip><Chip>Design</Chip></div>
                </section>
                <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
                  <h2 className="label-caps mb-3 text-muted-foreground">Key Timelines</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-white">Launch</span>
                    <span className="text-sm text-slate">Next Thursday</span>
                  </div>
                </section>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
