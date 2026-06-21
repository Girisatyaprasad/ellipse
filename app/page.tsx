import Link from "next/link";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const sections = [
  {
    title: "Every task begins as a conversation.",
    body: "A request, a name, a date. Ellipse keeps the work attached to the words that created it.",
  },
  {
    title: "Decisions shouldn't disappear.",
    body: "The decision stays with the context, the people, and the thread where it became real.",
  },
  {
    title: "Work should prove itself.",
    body: "Progress becomes easier to trust when it is connected to the conversation that assigned it.",
  },
  {
    title: "Organizations forget. Ellipse remembers.",
    body: "Memory, execution, and proof are compiled from the source of truth: conversation.",
  },
];

async function getHasSession() {
  if (!hasSupabaseEnv()) return false;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    return Boolean(data.user);
  } catch {
    return false;
  }
}

export default async function LandingPage() {
  const hasSession = await getHasSession();

  return (
    <main className="min-h-screen bg-[#070b12] text-[#f4efe7]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Ellipse home">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f4efe7] text-sm font-semibold text-[#070b12]">
            E
          </div>
          <span className="text-sm font-medium tracking-tight">Ellipse</span>
        </Link>
        <nav className="flex items-center gap-2">
          {hasSession ? (
            <Link href="/app" className="rounded-md px-3 py-2 text-sm text-[#f4efe7]/80 hover:text-[#f4efe7]">
              Open App
            </Link>
          ) : null}
          <Link href="/login" className="rounded-md px-3 py-2 text-sm text-[#f4efe7]/70 hover:text-[#f4efe7]">
            Login
          </Link>
          <Link href="/register" className="rounded-md bg-[#f4efe7] px-3 py-2 text-sm font-medium text-[#070b12] hover:bg-[#fffaf0]">
            Register
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex min-h-[72vh] max-w-5xl flex-col items-center justify-center px-5 py-20 text-center">
        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.035em] text-[#f4efe7] md:text-7xl lg:text-8xl">
          Conversation is everything.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f4efe7]/68 md:text-xl">
          Ellipse turns team conversations into memory, execution, and proof.
        </p>
        <div className="mt-9 flex items-center gap-3">
          <Link href="/register" className="rounded-md bg-[#f4efe7] px-5 py-3 text-sm font-medium text-[#070b12] hover:bg-[#fffaf0]">
            Register
          </Link>
          <Link href="/login" className="rounded-md border border-[#f4efe7]/14 px-5 py-3 text-sm font-medium text-[#f4efe7]/82 hover:border-[#f4efe7]/28 hover:text-[#f4efe7]">
            Login
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-28">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#f4efe7]/10 bg-[#0c111b] p-4">
          <div className="rounded-xl border border-[#f4efe7]/8 bg-[#070b12] p-5">
            <div className="mb-5 flex items-center justify-between border-b border-[#f4efe7]/8 pb-4">
              <div>
                <div className="text-sm font-medium text-[#f4efe7]">launch-room</div>
                <div className="mt-1 text-xs text-[#f4efe7]/45">conversation context</div>
              </div>
              <div className="h-2 w-2 rounded-full bg-[#d8d0c3]" />
            </div>
            <div className="max-w-[28rem] rounded-xl bg-[#111722] px-4 py-3 text-sm leading-6 text-[#f4efe7]/88">
              Rahul, please finish onboarding copy by Thursday.
            </div>
            <div className="mt-3 max-w-[24rem] rounded-xl border border-[#f4efe7]/10 bg-[#0c111b] p-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#d8d0c3]/75">Task detected</div>
              <div className="mt-3 text-sm font-medium text-[#f4efe7]">Finish onboarding copy</div>
              <div className="mt-1 text-xs leading-5 text-[#f4efe7]/52">Assignee: Rahul. Due: Thursday.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-28">
        <div className="space-y-28">
          {sections.map((section) => (
            <article key={section.title} className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-[-0.025em] text-[#f4efe7] md:text-5xl">{section.title}</h2>
              <p className="mt-5 text-base leading-8 text-[#f4efe7]/58 md:text-lg">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
