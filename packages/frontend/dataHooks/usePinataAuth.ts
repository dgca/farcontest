import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

type UserAuthStatus = "initializing" | "logged-out" | "polling" | "logged-in";

export function usePinataAuth() {
  const [deepLinkUrl, setDeepLinkUrl] = useState<string | null>(null);
  const [userAuthStatus, setUserAuthStatus] =
    useState<UserAuthStatus>("initializing");
  const [storedSignerToken, setStoredSignerToken] = useLocalStorage(
    "authToken",
    ""
  );
  const statusRef = useRef(userAuthStatus);
  statusRef.current = userAuthStatus;

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

  useEffect(() => {
    if (userAuthStatus !== "polling") return;

    async function handleLogin() {
      if (statusRef.current !== "polling") return;

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

      if (pollSignerData.deeplinkUrl) {
        setDeepLinkUrl(pollSignerData.deeplinkUrl);
      }

      if (pollSignerData.state === "completed") {
        setUserAuthStatus("logged-in");
        return;
      }

      setTimeout(handleLogin, 3000);
    }

    handleLogin();
  }, [setStoredSignerToken, storedSignerToken, userAuthStatus]);

  return {
    userAuthStatus,
    deepLinkUrl,
    handleLogin: () => {
      setUserAuthStatus("polling");
    },
    handleCancel: () => {
      setUserAuthStatus("logged-out");
    },
  };
}
