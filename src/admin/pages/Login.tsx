import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useAdminAuth } from "../auth";
import { CenteredCard } from "../AdminLayout";

export default function Login() {
  const { session, isAdmin, loading, signIn, sendPasswordReset } = useAdminAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;
  if (!loading && session && isAdmin) return <Navigate to={from ?? "/admin"} replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setError(await signIn(email.trim(), password));
    setBusy(false);
  };

  const forgot = async () => {
    if (!email.trim()) {
      setError("Enter your email first, then click “Forgot password”.");
      return;
    }
    const err = await sendPasswordReset(email.trim());
    if (err) setError(err);
    else setNotice("Check your inbox for a link to set a new password.");
  };

  return (
    <CenteredCard title="Sign in to manage the website">
      <p className="mb-6 text-sm text-muted-foreground">
        Update properties, projects and blog posts.
      </p>
      {!supabase ? (
        <p className="text-sm text-destructive">The content database isn't connected yet.</p>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={forgot}
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {notice && <p className="text-sm text-green-700">{notice}</p>}
          <Button type="submit" className="h-11 w-full bg-black text-white hover:bg-black/85" disabled={busy}>
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      )}
    </CenteredCard>
  );
}
