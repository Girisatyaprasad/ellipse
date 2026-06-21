import { redirect } from "next/navigation";
import { createWorkspace } from "@/app/actions";
import { getCurrentUserContext } from "@/lib/auth/dev-bypass";

export default async function NewWorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getCurrentUserContext();
  const params = await searchParams;

  if (!session) redirect("/login");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="w-full max-w-sm rounded-lg border border-white/[0.08] bg-surface-1 p-6">
        <h1 className="text-xl font-semibold text-white">Create workspace</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">This creates your first workspace and assigns you as owner.</p>
        {params.error ? (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{params.error}</div>
        ) : null}
        <form action={createWorkspace} className="mt-6 space-y-3">
          <input
            name="name"
            required
            className="h-10 w-full rounded-md border border-white/[0.08] bg-surface-0 px-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none"
            placeholder="Workspace name"
          />
          <button className="h-10 w-full rounded-md bg-white text-sm font-medium text-black">Create workspace</button>
        </form>
      </div>
    </main>
  );
}
