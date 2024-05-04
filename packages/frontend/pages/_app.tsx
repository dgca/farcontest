import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import { WagmiProvider } from "wagmi";
import { hardhat, baseSepolia } from "wagmi/chains";

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={rubik.className}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default MyApp;
