import { signUp } from "@/app/actions";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data.user) redirect("/app");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="w-full max-w-sm rounded-lg border border-white/[0.08] bg-surface-1 p-6">
        <Link href="/" className="mb-6 inline-flex text-sm text-muted-foreground hover:text-white">
          Back to landing
        </Link>
        <h1 className="text-xl font-semibold text-white">Register for Ellipse</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Create your account. If email confirmation is enabled, you will need to confirm before login.</p>

        {!hasSupabaseEnv() ? (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            Missing Supabase env vars.
          </div>
        ) : null}
        {params.error ? (
          <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{params.error}</div>
        ) : null}
        {params.message ? (
          <div className="mt-4 rounded-md border border-white/[0.12] bg-white/[0.04] p-3 text-sm leading-6 text-white">{params.message}</div>
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
          <input
            name="confirmPassword"
            type="password"
            required
            minLength={6}
            className="h-10 w-full rounded-md border border-white/[0.08] bg-surface-0 px-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none"
            placeholder="Confirm password"
          />
          <button formAction={signUp} className="h-10 w-full rounded-md bg-white text-sm font-medium text-black">
            Register
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
