import { useState, useEffect } from "react";
import { useInterval, useLocalStorage } from "usehooks-ts";

type UserAuthStatus = "initializing" | "logged-out" | "polling" | "logged-in";

export function usePinataAuth() {
  const [deepLinkUrl, setDeepLinkUrl] = useState<string | null>(null);
  const [userAuthStatus, setUserAuthStatus] =
    useState<UserAuthStatus>("initializing");
  const [storedSignerToken, setStoredSignerToken] = useLocalStorage(
    "farcontestAuthToken",
    ""
  );

  useEffect(() => {
    async function setInitialAuthStatus() {
      if (userAuthStatus !== "initializing") return;

      if (!storedSignerToken) {
        setUserAuthStatus("logged-out");
        return;
      }

      const pollSignerResponse = await fetch(
        `/api/pinata/poll-signer/${storedSignerToken}`
      );
      const pollSignerData = await pollSignerResponse.json();

      setUserAuthStatus(
        pollSignerData.state === "completed" ? "logged-in" : "logged-out"
      );
    }

    setInitialAuthStatus();
  }, [storedSignerToken, userAuthStatus]);

  useInterval(
    async function handleCheck() {
      if (userAuthStatus !== "polling") return;

      let signerToken = storedSignerToken;

      if (!signerToken) {
        const createSignerResponse = await fetch("/api/pinata/create-signer");
        const createSignerData = await createSignerResponse.json();

        signerToken = createSignerData.token;
        setStoredSignerToken(signerToken);
      }

      const pollSignerResponse = await fetch(
        `/api/pinata/poll-signer/${signerToken}`
      );
      const pollSignerData = await pollSignerResponse.json();

      if (!deepLinkUrl && pollSignerData.deeplinkUrl) {
        setDeepLinkUrl(pollSignerData.deeplinkUrl);
      }

      if (pollSignerData.state === "completed") {
        setUserAuthStatus("logged-in");
        return;
      }
    },
    userAuthStatus === "polling" ? 2500 : null
  );

  return {
    userAuthStatus,
    deepLinkUrl,
    handleLogin: () => {
      if (userAuthStatus !== "logged-out") return;
      setUserAuthStatus("polling");
    },
    handleCancel: () => {
      setUserAuthStatus("logged-out");
      setDeepLinkUrl(null);
    },
  };
}
