import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Server Client
 * Digunakan di Server Components, Server Actions, Route Handlers
 */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );
}
