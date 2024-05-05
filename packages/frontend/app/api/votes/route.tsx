import { NextRequest } from "next/server";

import { createClient } from "@/supabase/supabaseClient";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();

  const { data, error } = await supabase.from("votes").insert(body);

  return Response.json({ data, error });
}
