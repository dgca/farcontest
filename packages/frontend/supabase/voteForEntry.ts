import { createClient } from "./supabaseClient";

export async function voteForEntry({
  entryId,
  voterFid,
}: {
  entryId: string;
  voterFid: number;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("votes")
    .insert({
      entry_id: entryId,
      voter_fid: voterFid,
    })
    .select()
    .maybeSingle();

  return { data, error };
}
