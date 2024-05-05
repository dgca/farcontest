import { NextRequest } from "next/server";

import { createCast } from "@/neynar/createCast";
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
  const { signer_uuid, ...rest } = await request.json();

  const { data, error } = await supabase
    .from("contests")
    .insert(rest)
    .select("id");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyData = data as any;

  if (anyData?.[0].id) {
    const contestId = anyData?.[0].id as string;

    await createCast(
      signer_uuid,
      `I just created a FarContest! Learn more 👇\n\nhttp://localhost:3000/contest/${contestId}`
    );
  }

  return Response.json({ data, error });
}
