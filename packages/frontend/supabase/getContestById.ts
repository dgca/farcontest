import { createClient } from "./supabaseClient";

export async function getContestById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("contests")
    .select(
      `name, 
       description, 
       winners, 
       deadline, 
       prize_token, 
       prizes, 
       cast_link, 
       creator_fid
       `
    )
    .eq("id", id)
    .maybeSingle();

  return { data, error };
}
