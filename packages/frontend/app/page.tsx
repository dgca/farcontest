import { fetchMetadata } from "frames.js/next";

import { HomepageContent } from "./HomepageContent";

export default function Home() {
  return <HomepageContent />;
}

export async function generateMetadata() {
  return {
    title: "FarContest | Contests on Farcaster",
    // ...
    other: {
      // ...
      ...(await fetchMetadata(
        // provide a full URL to your /frames endpoint
        new URL(
          "/frames",
          process.env.VERCEL_URL
            ? `https://{process.env.VERCEL_URL}`
            : "http://localhost:3000"
        )
      )),
    },
  };
}
