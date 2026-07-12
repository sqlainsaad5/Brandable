import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3EDE2] px-4">
        {children}
      </div>
    );
  }

  return (
    <AdminShell email={user.email ?? "Admin"} signOutAction={signOut}>
      {children}
    </AdminShell>
  );
}
