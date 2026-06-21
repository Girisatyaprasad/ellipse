import { devBypassSignIn } from "@/app/actions";
import { getCurrentUserContext } from "@/lib/auth/dev-bypass";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  if (hasSupabaseEnv()) {
    const session = await getCurrentUserContext();

    if (session) redirect("/app");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <Link
        href="/"
        aria-label="Back to landing"
        className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-lg text-muted-foreground hover:bg-white/[0.04] hover:text-white"
      >
        &lt;
      </Link>
      <div className="w-full max-w-sm rounded-lg border border-white/[0.08] bg-surface-1 p-6">
        <h1 className="text-xl font-semibold text-white">Login to Ellipse</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Open Ellipse in test mode.</p>

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

        <form action={devBypassSignIn} className="mt-6">
          <button className="h-10 w-full rounded-md bg-white text-sm font-medium text-black">
            Login
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Need an account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
