import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const devAuthCookie = "ellipse_dev_auth";
const devUserEmail = process.env.ELLIPSE_DEV_USER_EMAIL || "dev@ellipse.local";
const devUserPassword = process.env.ELLIPSE_DEV_USER_PASSWORD || "ellipse-dev-login-bypass-password";

export type EllipseUser = {
  id: string;
  email: string;
};

async function findUserByEmail(email: string) {
  const admin = createAdminClient();

  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 100 });
    if (error) throw error;

    const user = data.users.find((item) => item.email?.toLowerCase() === email.toLowerCase());
    if (user?.email) return { id: user.id, email: user.email };
    if (data.users.length < 100) break;
  }

  return null;
}

export async function ensureDevBypassUser(): Promise<EllipseUser> {
  const admin = createAdminClient();
  const existingUser = await findUserByEmail(devUserEmail);
  if (existingUser) return existingUser;

  const { data, error } = await admin.auth.admin.createUser({
    email: devUserEmail,
    password: devUserPassword,
    email_confirm: true,
  });

  if (error) throw error;
  if (!data.user.email) throw new Error("Dev bypass user was created without an email.");

  return { id: data.user.id, email: data.user.email };
}

export async function enableDevBypass() {
  const user = await ensureDevBypassUser();
  const cookieStore = await cookies();

  cookieStore.set(devAuthCookie, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return user;
}

export async function clearDevBypass() {
  const cookieStore = await cookies();
  cookieStore.delete(devAuthCookie);
}

export async function getCurrentUserContext() {
  const cookieStore = await cookies();

  if (cookieStore.get(devAuthCookie)?.value === "1") {
    return {
      supabase: createAdminClient(),
      user: await ensureDevBypassUser(),
      isDevBypass: true,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  return {
    supabase,
    user: {
      id: data.user.id,
      email: data.user.email || "unknown@example.com",
    },
    isDevBypass: false,
  };
}
