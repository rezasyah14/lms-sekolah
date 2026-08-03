import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Server Client
 * Digunakan di Server Components, Server Actions, Route Handlers
 */
export function createServerClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://dednimurwcqiitrairsm.supabase.co";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_BPkMu3XlWou51D01ffzBYA_meAqY1Sv";

  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
}
