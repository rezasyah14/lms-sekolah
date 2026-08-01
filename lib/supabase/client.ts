import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Browser Client
 * Digunakan di Client Components ('use client')
 */
export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
