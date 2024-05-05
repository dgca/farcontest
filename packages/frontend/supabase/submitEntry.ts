import { createClient } from "./supabaseClient";

export async function submitEntry({
  contestId,
  creatorFid,
  content,
}: {
  contestId: string;
  creatorFid: string;
  content: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("entries")
    .insert({
      contest_id: contestId,
      creator_fid: creatorFid,
      content,
    })
    .select()
    .maybeSingle();

  return { data, error };
}
