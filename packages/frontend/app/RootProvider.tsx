"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Rubik } from "next/font/google";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { hardhat, baseSepolia } from "wagmi/chains";

import { SIWNProvider } from "@/neynar/SIWNProvider";
import { theme } from "@/theme/theme";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const config = getDefaultConfig({
  appName: "FarContest",
  projectId: "48dcfaeb03c70687339f86c167db9521",
  chains: [hardhat, baseSepolia],
  ssr: true,
});

const client = new QueryClient();

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <div className={rubik.className}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <SIWNProvider>
              <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </SIWNProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
