import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/** Defense-in-depth: verify Supabase session inside server components / actions. */
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
