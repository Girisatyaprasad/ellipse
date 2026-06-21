import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Database,
  Gavel,
  GitBranch,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Today", icon: Clock3 },
  { href: "/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/tasks/syd-4-resync", label: "Tasks", icon: CheckCircle2 },
  { href: "/decisions", label: "Decisions", icon: Gavel },
  { href: "/timeline", label: "Timeline", icon: GitBranch },
  { href: "/people", label: "People", icon: Users },
  { href: "/memory/v24-launch-delay", label: "Memory", icon: Database },
  { href: "/describe-organization", label: "Describe Org", icon: Sparkles },
] as const;

export const aiFlows = [
  { name: "organize", href: "/api/ai/organize", status: "Active" },
  { name: "extract", href: "/api/ai/extract", status: "Active" },
  { name: "ask", href: "/api/ai/ask", status: "Active" },
  { name: "timeline", href: "/api/ai/timeline", status: "Active" },
];

export const decisions = [
  {
    id: "DEC-045",
    title: "Migrate auth services to NextAuth v5",
    category: "Architecture",
    owner: "Sarah Jenkins",
    status: "In Progress",
    source: "Launch Strategy Thread",
    time: "Today 11:20",
    context:
      "Security audit found several custom JWT edge cases. The team committed to moving authentication into a maintained service boundary.",
    impact: "12 impacted tasks",
  },
  {
    id: "DEC-041",
    title: "Pause external marketing agency search",
    category: "Resource Allocation",
    owner: "Elena Rostova",
    status: "Locked",
    source: "Q4 Budget Review",
    time: "Yesterday 16:00",
    context:
      "Budget was reallocated internally to support the new design system rollout and sales engineering enablement.",
    impact: "4 impacted tasks",
  },
  {
    id: "DEC-039",
    title: "Adopt Rust for Core migration spike",
    category: "Infrastructure",
    owner: "Marcus Thorne",
    status: "Proposed",
    source: "Project Quantum",
    time: "Jun 18 09:42",
    context:
      "Peak-hour contention in the node service is producing memory pressure. Rust will be tested for the lowest-latency path first.",
    impact: "7 impacted tasks",
  },
];

export const tasks = [
  {
    id: "TSK-8902",
    title: "Re-sync cluster SYD-4",
    assignee: "Marcus Thorne",
    due: "Due Today",
    status: "In Progress",
    source: "Payment Outage thread",
    priority: "P1",
  },
  {
    id: "TSK-8841",
    title: "Review final copy for Q3 launch page",
    assignee: "Aisha Khan",
    due: "Today",
    status: "Pending",
    source: "Launch Strategy Thread",
    priority: "P2",
  },
  {
    id: "TSK-8819",
    title: "Approve Q4 budget allocations",
    assignee: "Elena Rostova",
    due: "Today",
    status: "Pending",
    source: "Budget Review",
    priority: "P1",
  },
];

export const people = [
  {
    name: "Elena Rostova",
    role: "Lead Systems Architect",
    initials: "ER",
    ownership: ["Core Infrastructure", "Data Pipeline V2"],
    blocker: "Awaiting security clearance on the new AWS cluster configuration.",
    load: 2,
  },
  {
    name: "Marcus Chen",
    role: "Product Strategist",
    initials: "MC",
    ownership: ["User Onboarding Flow", "Market Analysis Q3"],
    blocker: "All paths clear. Synthesizing user research for Q3 roadmap.",
    load: 3,
  },
  {
    name: "Sarah Jenkins",
    role: "UX Research Lead",
    initials: "SJ",
    ownership: ["Usability Testing", "Persona Development"],
    blocker: "Low recruitment numbers for the upcoming test cohort.",
    load: 2,
  },
] as const;

export const timeline = [
  {
    type: "Strategic Decision",
    title: "Pivot Q3 roadmap to AI features",
    time: "Today, 09:42",
    body: "Executive team deprioritized legacy integrations in favor of ambient intelligence.",
    icon: Gavel,
    tone: "secondary",
  },
  {
    type: "Critical Blocker",
    title: "API rate limits exceeded",
    time: "Yesterday, 14:15",
    body: "Data ingestion stalled due to third-party throttling. DevOps escalation is open.",
    icon: AlertTriangle,
    tone: "error",
  },
  {
    type: "Milestone Reached",
    title: "Design System V2 published",
    time: "Jun 18, 11:00",
    body: "Token package and shared shell approved for app-wide rollout.",
    icon: Shield,
    tone: "primary",
  },
] as const;

export const conversationMessages = [
  {
    author: "Marcus",
    side: "user",
    text: "We need to finalize the infrastructure pivot before the end of the week. The current node setup is bottlenecking during peak hours.",
  },
  {
    author: "Marcus",
    side: "user",
    text: "I propose we adopt Rust for Core. Also, can someone ensure we sync secrets to SYD-4? That cluster is currently isolated.",
  },
  {
    author: "Ellipse AI",
    side: "ai",
    text: "I extracted the SYD-4 task and the Rust decision point. Historical migrations suggest latency could drop by roughly 40%, with a two-week backend ramp.",
  },
  {
    author: "Sarah",
    side: "user",
    text: "I agree with the Rust pivot. The blocker is legacy auth: it has not been decoupled yet, so migration waits on containerization.",
  },
] as const;

export const extractionPanel = [
  { label: "Tasks", title: "Sync secrets to SYD-4", meta: "Pending", icon: CheckCircle2 },
  { label: "Decisions", title: "Adopt Rust for Core backend migration", meta: "Proposed by Marcus", icon: Gavel },
  { label: "Blockers", title: "Legacy auth service not decoupled", meta: "Unresolved", icon: CircleDashed },
] as const;
