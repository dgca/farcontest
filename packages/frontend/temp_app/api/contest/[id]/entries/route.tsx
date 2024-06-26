import { NextRequest } from "next/server";

import { createClient } from "@/supabase/supabaseClient";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("entries_vote_count")
    .select(
      `id, 
       creator_fid, 
       content, 
       votes(count)
       `
    )
    .eq("contest_id", params.id)
    .order("vote_count", { ascending: false });

  return Response.json({
    data,
    error,
  });
}
