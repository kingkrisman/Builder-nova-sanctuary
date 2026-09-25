import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Null until the project's URL and publishable (anon) key are set in .env.
 * Everything that reads content falls back to the bundled data in lib/data.ts when it's null.
 */
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export const cmsEnabled = supabase !== null;

export const MEDIA_BUCKET = "media";
