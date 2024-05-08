import { fetchMetadata } from "frames.js/next";

import { ContestPageContent } from "./ContestPageContent";

type Params = { params: { id: string } };

export default function Contest({ params }: Params) {
  return <ContestPageContent contestId={params.id} />;
}

export async function generateMetadata({ params }: Params) {
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  return {
    title: "FarContest | Contests on Farcaster",
    // ...
    other: {
      ...(await fetchMetadata(
        new URL(
          `/frames/contest?contestId=${params.id}`,
          process.env.NEXT_PUBLIC_VERCEL_URL
            ? process.env.NEXT_PUBLIC_VERCEL_URL
            : "http://localhost:3000"
        )
      )),
    },
  };
}
