import { NextRequest } from "next/server";

import { createClient } from "@/supabase/supabaseClient";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    .eq("id", params.id);

  return Response.json({
    data,
    error,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("contests")
    .update(body)
    .eq("id", params.id)
    .select();

  return Response.json({ data, error });
}
