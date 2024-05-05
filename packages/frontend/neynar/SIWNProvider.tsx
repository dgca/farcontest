"use client";
import Script from "next/script";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

import { useNeynarUser } from "@/neynar/useNeynarUser";

type FarcasterUser = {
  signer_uuid: string;
  fid: number;
  fname: string;
  displayName: string;
  profile: {
    bio: string;
  };
  pfp: string;
  followerCount: number;
  followingCount: number;
};

type SIWNResponseData = {
  fid: string;
  is_authenticated: boolean;
  signer_uuid: string;
};

const SIWNContext = createContext<{
  signInButton: JSX.Element | null;
  farcasterUser: FarcasterUser | null;
}>({
  signInButton: null,
  farcasterUser: null,
});

export function SIWNProvider({ children }: { children: ReactNode }) {
  const [fid, setFid] = useState(0);
  const [signerUuid, setSignerUuid] = useState("");
  const { user } = useNeynarUser(fid);

  const [storedFarcasterUser, setStoredFarcasterUser] = useLocalStorage(
    "storedFarcasterUser",
    "{}"
  );

  const farcasterUser = useMemo(() => {
    if (!storedFarcasterUser) return null;

    return JSON.parse(storedFarcasterUser) as FarcasterUser;
  }, [storedFarcasterUser]);

  useEffect(() => {
    if (user) {
      const farcasterUser: FarcasterUser = {
        signer_uuid: signerUuid,
        fid: Number(user.fid),
        fname: user?.username,
        displayName: user?.displayName,
        profile: {
          bio: user.profile.bio.text,
        },
        pfp: user.pfp.url,
        followerCount: user?.followerCount,
        followingCount: user?.followingCount,
      };

      setStoredFarcasterUser(JSON.stringify(farcasterUser));
    }
  }, [setStoredFarcasterUser, signerUuid, user]);

  const onSignInSuccess = useCallback((data: SIWNResponseData) => {
    setFid(Number(data.fid));
    setSignerUuid(data.signer_uuid);
  }, []);

  useEffect(() => {
    // @ts-expect-error - temp
    window.onSignInSuccess = onSignInSuccess;

    return () => {
      // @ts-expect-error - temp
      delete window.onSignInSuccess;
    };
  });

  const signInButton = useMemo(() => {
    if (storedFarcasterUser) return null;

    return (
      <div
        className="neynar_signin pt-2 pr-0 md:pr-4"
        data-client_id={process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID}
        data-success-callback="onSignInSuccess"
        data-width="100%"
        data-height="40px"
        data-font_size="16px"
        data-padding="6px 13px"
        data-theme="dark"
      />
    );
  }, [storedFarcasterUser]);

  return (
    <SIWNContext.Provider
      value={{
        signInButton,
        farcasterUser,
      }}
    >
      <Script src="https://neynarxyz.github.io/siwn/raw/1.2.0/index.js" async />
      {children}
    </SIWNContext.Provider>
  );
}

export function useSIWNContext() {
  return useContext(SIWNContext);
}
