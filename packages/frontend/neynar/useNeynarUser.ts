import { useState, useEffect } from "react";

export type NeynarV1User = {
  fid: number;
  custodyAddress: string;
  username: string;
  displayName: string;
  pfp: {
    url: string;
  };
  profile: {
    bio: {
      text: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mentionedProfiles: any[];
    };
  };
  followerCount: number;
  followingCount: number;
  verifications: string[];
  activeStatus: string;
};

interface NeynarV1UserResponse {
  result: {
    user: NeynarV1User;
  };
}

export function useNeynarUser(fid: number) {
  const [data, setData] = useState<NeynarV1User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (fid === 0) return;

    async function doFetch() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.neynar.com/v1/farcaster/user?fid=${fid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = (await response.json()) as NeynarV1UserResponse;
        setData(json.result.user);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    }

    doFetch();
  }, [fid]);

  return { user: data, loading, error };
}
