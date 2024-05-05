import { NextRequest } from "next/server";

import { getContestById } from "@/supabase/getContestById";
import { createClient } from "@/supabase/supabaseClient";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await getContestById(params.id);

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
