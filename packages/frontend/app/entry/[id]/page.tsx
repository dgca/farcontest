import { fetchMetadata } from "frames.js/next";

import { EntryPageContent } from "./EntryPageContent";

type Params = { params: { id: string } };

export default function Contest({ params }: Params) {
  return <EntryPageContent entryId={params.id} />;
}

export async function generateMetadata({ params }: Params) {
  return {
    title: "FarContest | Contests on Farcaster",
    // ...
    other: {
      ...(await fetchMetadata(
        new URL(
          `/frames/entry?entryId=${params.id}`,
          process.env.NEXT_PUBLIC_VERCEL_URL
        )
      )),
    },
  };
}
