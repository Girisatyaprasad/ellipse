import { signIn, signUp } from "@/app/actions";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="w-full max-w-sm rounded-lg border border-white/[0.08] bg-surface-1 p-6">
        <h1 className="text-xl font-semibold text-white">Sign in to Ellipse</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Phase 1 persistence uses Supabase email/password auth.</p>

        {!hasSupabaseEnv() ? (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            Missing Supabase env vars.
          </div>
        ) : null}
        {params.error ? (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{params.error}</div>
        ) : null}

        <form className="mt-6 space-y-3">
          <input
            name="email"
            type="email"
            required
            className="h-10 w-full rounded-md border border-white/[0.08] bg-surface-0 px-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none"
            placeholder="you@company.com"
          />
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="h-10 w-full rounded-md border border-white/[0.08] bg-surface-0 px-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none"
            placeholder="Password"
          />
          <div className="grid grid-cols-2 gap-2">
            <button formAction={signIn} className="h-10 rounded-md bg-white text-sm font-medium text-black">
              Sign in
            </button>
            <button formAction={signUp} className="h-10 rounded-md border border-white/[0.12] text-sm font-medium text-white">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
