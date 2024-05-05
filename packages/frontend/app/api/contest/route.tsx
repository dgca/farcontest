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

  const { data, error } = (await supabase
    .from("contests")
    .insert(rest)
    .select(
      `
      id,
      prize_token,
      prizes
    `
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .maybeSingle()) as any;

  console.log(data);

  if (data?.id) {
    const contestId = data.id as string;

    const castResponse = await createCast(
      signer_uuid,
      `I just created a FarContest! Learn more 👇\n\nhttp://localhost:3000/contest/${contestId}`
    );

    const hash = castResponse?.cast?.hash ?? "";

    if (hash && !!data?.prizes?.length) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalAmount = data.prizes.reduce((acc: number, current: any) => {
        const amount = Number(current.amount);
        if (isNaN(amount)) return acc;
        return acc + amount;
      }, 0);
      const token = data.prize_token;
      const message = `Bounty for this contest: ${totalAmount} ${token.toUpperCase()} @bountybot`;

      await new Promise((res) => {
        setTimeout(() => {
          res(null);
        }, 3500);
      });

      await createCast(process.env.NEYNAR_BOT_SIGNER!, message, hash);
    }
  }

  return Response.json({ data, error });
}
