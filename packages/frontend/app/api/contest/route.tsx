import { NextRequest } from "next/server";

import { createClient } from "@/supabase/supabaseClient";

export async function GET(_request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.from("contests").select("*");

  return Response.json({
    data,
    error,
  });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();

  const { data, error } = await supabase.from("contests").insert(body);

  return Response.json({ data, error });
}
