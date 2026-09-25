import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { CenteredCard } from "../AdminLayout";

/** Landing page for password-reset and invite emails. */
export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) setError(error.message);
    else {
      toast.success("Password updated");
      navigate("/admin", { replace: true });
    }
  };

  return (
    <CenteredCard title="Set your password">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="h-11 w-full bg-black text-white hover:bg-black/85" disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save password
        </Button>
        <Button asChild variant="ghost" className="w-full">
          <Link to="/admin">Back to dashboard</Link>
        </Button>
      </form>
    </CenteredCard>
  );
}
