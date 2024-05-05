import { createClient } from "./supabaseClient";

export async function getEntryById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("entries")
    .select(
      `id,
       creator_fid,
       content,
       contest_id,
       votes(count),
       contests(name)
      `
    )
    .eq("id", id)
    .maybeSingle();

  return { data, error };
}
