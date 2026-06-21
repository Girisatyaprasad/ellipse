import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 border-b border-white/[0.055] pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="label-caps mb-3 text-muted-foreground">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-label text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ tone = "active" }: { tone?: "active" | "pending" | "paused" | "error" }) {
  return (
    <span
      className={cn(
        "block h-1.5 w-1.5 shrink-0",
        tone === "active" && "rounded-full bg-blue-400",
        tone === "pending" && "rounded-full border border-muted-foreground",
        tone === "paused" && "rounded-[1px] bg-muted-foreground",
        tone === "error" && "rounded-full bg-destructive",
      )}
    />
  );
}

export function StatPanel({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="glass-panel rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between text-muted-foreground">
        <span className="label-caps">{label}</span>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-semibold tracking-tight text-white">{value}</div>
    </div>
  );
}
