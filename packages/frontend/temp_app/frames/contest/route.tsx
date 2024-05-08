/* eslint-disable react/jsx-key */
import { getUserDataForFid } from "frames.js";
import { Button, createFrames } from "frames.js/next";

import { getContestById } from "@/supabase/getContestById";
import { submitEntry } from "@/supabase/submitEntry";

const frames = createFrames({
  basePath: "/frames/contest",
});

export const GET = frames(async (ctx) => {
  const contestId = ctx.url.searchParams.get("contestId");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = (await getContestById(contestId!)) as any;
  const creatorData = await getUserDataForFid({ fid: data.creator_fid });

  return {
    image: (
      <div tw="w-full h-full justify-center items-center flex flex-col p-12">
        <span>
          <span>FarContest</span>
        </span>
        <span tw="w-full flex flex-col items-center justify-center grow-1">
          <span>{data.name}</span>
          <span>By {creatorData?.displayName}</span>
          <span>~~~</span>
          <span>{data.description}</span>
        </span>
      </div>
    ),
    textInput: "submission URL",
    buttons: [
      <Button
        action="link"
        target={`${process.env.NEXT_PUBLIC_VERCEL_URL}/contest/${contestId}`}
      >
        View Contest
      </Button>,
      <Button
        action="post"
        target={`${process.env.NEXT_PUBLIC_VERCEL_URL}/frames/contest?contestId=${contestId}`}
      >
        Enter Contest
      </Button>,
    ],
  };
});

export const POST = frames(async (ctx) => {
  const contestId = ctx.url.searchParams.get("contestId") || "";
  const creatorFid = ctx.message?.requesterFid || "";
  const content = ctx.message?.inputText || "";

  const { data } = (await submitEntry({
    contestId,
    creatorFid: `${creatorFid}`,
    content,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })) as any;

  console.log(data);

  return {
    image: (
      <div tw="w-full h-full justify-center items-center flex flex-col">
        <span tw="mb-2">{creatorFid}</span>
        <span>{content}</span>
        <span>{contestId}</span>
      </div>
    ),
    buttons: [
      <Button
        action="link"
        target={`${process.env.NEXT_PUBLIC_VERCEL_URL}/entry/${data.id}`}
      >
        View Entry
      </Button>,
    ],
  };
});
