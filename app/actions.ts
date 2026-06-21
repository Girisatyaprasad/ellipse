"use server";

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

export async function signIn(formData: FormData) {
  const email = formString(formData, "email");
  const password = formString(formData, "password");
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirectWithError("/login", error.message);

  redirect("/");
}

export async function signUp(formData: FormData) {
  const email = formString(formData, "email");
  const password = formString(formData, "password");
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) redirectWithError("/login", error.message);

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
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
