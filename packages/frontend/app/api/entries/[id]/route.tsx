import { NextRequest } from "next/server";

import { getEntryById } from "@/supabase/getEntryById";
import { createClient } from "@/supabase/supabaseClient";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await getEntryById(params.id);

  return Response.json({
    data,
    error,
  });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();

  const { data, error } = await supabase.from("entries").insert(body);

  return Response.json({ data, error });
}
