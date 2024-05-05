/* eslint-disable react/jsx-key */
import { Button, createFrames } from "frames.js/next";

import { getEntryById } from "@/supabase/getEntryById";
import { voteForEntry } from "@/supabase/voteForEntry";

const frames = createFrames({
  basePath: "/frames/entry",
});

export const GET = frames(async (ctx) => {
  const entryId = ctx.url.searchParams.get("entryId");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = (await getEntryById(entryId!)) as any;

  return {
    image: (
      <div tw="w-full h-full justify-center items-center flex flex-col p-12">
        <span>
          <span>FarContest</span>
        </span>
        <span tw="w-full flex flex-col items-center justify-center grow-1">
          <span>{data.contests.name}</span>
          <span>~~~</span>
          <span>Submission by {data.creator_fid}</span>
          <span>{data.content}</span>
        </span>
      </div>
    ),
    buttons: [
      <Button action="link" target={`${data.content}`}>
        View Entry
      </Button>,
      <Button
        action="post"
        target={`${process.env.NEXT_PUBLIC_VERCEL_URL}/frames/entry?entryId=${entryId}`}
      >
        +1 Vote
      </Button>,
    ],
  };
});

export const POST = frames(async (ctx) => {
  const entryId = ctx.url.searchParams.get("entryId") || "";
  const voterFid = Number(ctx.message?.requesterFid) || 0;

  try {
    const { data } = (await voteForEntry({
      entryId,
      voterFid,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: entryData } = (await getEntryById(entryId!)) as any;

    return {
      image: (
        <div tw="w-full h-full justify-center items-center flex flex-col p-12">
          <span>
            <span>FarContest</span>
          </span>
          <span tw="w-full flex flex-col items-center justify-center grow-1">
            <span>{entryData.contests.name}</span>
            <span>~~~</span>
            <span>You voted for</span>
            <span>{entryData.content}</span>
            <span>Total votes: {entryData.votes?.[0].count ?? "unknown"}</span>
          </span>
        </div>
      ),
      buttons: [
        <Button action="link" target={`${data.content}`}>
          View Entry
        </Button>,
      ],
    };
  } catch (err) {
    return {
      image: (
        <div tw="w-full h-full justify-center items-center flex flex-col p-12">
          <span>
            <span>FarContest</span>
          </span>
          <span tw="w-full flex flex-col items-center justify-center grow-1">
            <span>You can only vote</span>
            <span>once per submission</span>
          </span>
        </div>
      ),
    };
  }
});
