"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectWithError(path: string, error: string): never {
  redirect(`${path}?error=${encodeURIComponent(error)}`);
}

function redirectWithMessage(path: string, message: string): never {
  redirect(`${path}?message=${encodeURIComponent(message)}`);
}

async function getOrigin() {
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";

  return origin ?? (host ? `${protocol}://${host}` : "");
}

export async function signIn(formData: FormData) {
  const email = formString(formData, "email");
  const password = formString(formData, "password");
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirectWithError("/login", error.message);

  redirect("/app");
}

export async function signUp(formData: FormData) {
  const email = formString(formData, "email");
  const password = formString(formData, "password");
  const supabase = await createClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: origin ? `${origin}/auth/callback?next=/app` : undefined,
    },
  });
  if (error) redirectWithError("/login", error.message);

  if (!data.session) {
    redirectWithMessage("/login", "Check your email to confirm your account, then sign in.");
  }

  redirect("/app");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function createWorkspace(formData: FormData) {
  const name = formString(formData, "name") || "Untitled workspace";
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) redirect("/login");

  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .insert({ name, created_by: userData.user.id })
    .select("id")
    .single();

  if (workspaceError || !workspace) redirectWithError("/workspaces/new", workspaceError?.message ?? "Could not create workspace.");

  const { error: memberError } = await supabase.from("workspace_members").insert({
    workspace_id: workspace.id,
    user_id: userData.user.id,
    role: "owner",
  });

  if (memberError) redirectWithError("/workspaces/new", memberError.message);

  redirect(`/workspaces/${workspace.id}/conversations`);
}

export async function createConversation(formData: FormData) {
  const workspaceId = formString(formData, "workspaceId");
  const title = formString(formData, "title") || "New conversation";
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) redirect("/login");

  const { data: conversation, error } = await supabase
    .from("conversations")
    .insert({ workspace_id: workspaceId, title, created_by: userData.user.id })
    .select("id")
    .single();

  if (error || !conversation) redirectWithError(`/workspaces/${workspaceId}/conversations`, error?.message ?? "Could not create conversation.");

  redirect(`/workspaces/${workspaceId}/conversations/${conversation.id}`);
}

export async function sendMessage(formData: FormData) {
  const workspaceId = formString(formData, "workspaceId");
  const conversationId = formString(formData, "conversationId");
  const body = formString(formData, "body");
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) redirect("/login");
  if (!body) return;

  const authorName = userData.user.email?.split("@")[0] || "You";

  const { error } = await supabase.from("messages").insert({
    workspace_id: workspaceId,
    conversation_id: conversationId,
    author_name: authorName,
    body,
    created_by: userData.user.id,
  });

  if (error) redirectWithError(`/workspaces/${workspaceId}/conversations/${conversationId}`, error.message);

  revalidatePath(`/workspaces/${workspaceId}/conversations/${conversationId}`);
}

export async function createArtifact(formData: FormData) {
  const workspaceId = formString(formData, "workspaceId");
  const conversationId = formString(formData, "conversationId");
  const messageId = formString(formData, "messageId");
  const type = formString(formData, "type");
  const title = formString(formData, "title");
  const summary = formString(formData, "summary");
  const sourceQuote = formString(formData, "sourceQuote");
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) redirect("/login");
  if (!workspaceId || !conversationId || !messageId || !title) return;
  if (!["task", "decision", "blocker"].includes(type)) return;

  const { data: artifact, error: artifactError } = await supabase
    .from("artifacts")
    .insert({
      workspace_id: workspaceId,
      conversation_id: conversationId,
      type,
      status: "pending",
      title,
      summary: summary || null,
      created_by: userData.user.id,
      created_by_email: userData.user.email,
    })
    .select("id")
    .single();

  if (artifactError || !artifact) {
    redirectWithError(`/workspaces/${workspaceId}/conversations/${conversationId}`, artifactError?.message ?? "Could not create artifact.");
  }

  const { error: sourceError } = await supabase.from("artifact_sources").insert({
    artifact_id: artifact.id,
    message_id: messageId,
    quote: sourceQuote || title,
  });

  if (sourceError) {
    redirectWithError(`/workspaces/${workspaceId}/conversations/${conversationId}`, sourceError.message);
  }

  revalidatePath(`/workspaces/${workspaceId}/conversations/${conversationId}`);
}

export async function updateArtifact(formData: FormData) {
  const workspaceId = formString(formData, "workspaceId");
  const conversationId = formString(formData, "conversationId");
  const artifactId = formString(formData, "artifactId");
  const title = formString(formData, "title");
  const summary = formString(formData, "summary");
  const type = formString(formData, "type");
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) redirect("/login");
  if (!artifactId || !title || !["task", "decision", "blocker"].includes(type)) return;

  const { error } = await supabase
    .from("artifacts")
    .update({ title, summary: summary || null, type })
    .eq("id", artifactId)
    .eq("workspace_id", workspaceId);

  if (error) redirectWithError(`/workspaces/${workspaceId}/conversations/${conversationId}`, error.message);

  revalidatePath(`/workspaces/${workspaceId}/conversations/${conversationId}`);
}

export async function reviewArtifact(formData: FormData) {
  const workspaceId = formString(formData, "workspaceId");
  const conversationId = formString(formData, "conversationId");
  const artifactId = formString(formData, "artifactId");
  const status = formString(formData, "status");
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) redirect("/login");
  if (!artifactId || !["accepted", "rejected", "pending"].includes(status)) return;

  const { error } = await supabase
    .from("artifacts")
    .update({
      status,
      reviewed_by: status === "pending" ? null : userData.user.id,
      reviewed_at: status === "pending" ? null : new Date().toISOString(),
    })
    .eq("id", artifactId)
    .eq("workspace_id", workspaceId);

  if (error) redirectWithError(`/workspaces/${workspaceId}/conversations/${conversationId}`, error.message);

  revalidatePath(`/workspaces/${workspaceId}/conversations/${conversationId}`);
}
