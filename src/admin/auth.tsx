import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AdminAuth {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<string | null>;
}

const AdminAuthContext = createContext<AdminAuth | null>(null);

async function checkAdmin(userId: string) {
  if (!supabase) return false;
  // RLS only lets a user read their own row, so a hit means they're an admin
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return !error && !!data;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;
    const apply = async (next: Session | null) => {
      const admin = next ? await checkAdmin(next.user.id) : false;
      if (!active) return;
      setSession(next);
      setIsAdmin(admin);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      // Defer: calling Supabase inside this callback can deadlock the auth lock
      setTimeout(() => apply(next), 0);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value: AdminAuth = {
    session,
    isAdmin,
    loading,
    signIn: async (email, password) => {
      if (!supabase) return "The content database isn't connected yet.";
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? error.message : null;
    },
    signOut: async () => {
      await supabase?.auth.signOut();
    },
    sendPasswordReset: async (email) => {
      if (!supabase) return "The content database isn't connected yet.";
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      return error ? error.message : null;
    },
  };

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
