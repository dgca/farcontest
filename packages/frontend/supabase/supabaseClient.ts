import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  return createSupabaseClient(
    "https://kszhixdyngdeqlpcagay.supabase.co",
    process.env.SUPABASE_KEY!
  );
}
