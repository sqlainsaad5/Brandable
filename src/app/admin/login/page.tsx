"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/shared/Logo";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/admin/products");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo variant="footer" wrapLink={false} />
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
          BRANDABLE
        </h1>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
          Admin access
        </p>
      </div>

      <div className="rounded-card border border-border bg-surface p-6 shadow-soft sm:p-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted">
          <Lock className="h-4 w-4 text-primary" aria-hidden />
          Sign in with your admin account
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-11 rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-11 rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          {error && (
            <p
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="hover:text-primary">
          ← Back to store
        </Link>
      </p>
    </div>
  );
}
