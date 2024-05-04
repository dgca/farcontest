"use client";
import { chakra, Flex, HStack, Text, Stack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { ReactNode } from "react";

import { RootProvider } from "./RootProvider";

import { DotDivider } from "@/components/DotDivider/DotDivider";
import { Logo } from "@/components/Logo/Logo";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          <Flex
            bg="#EBF1F7"
            minHeight="100dvh"
            p={4}
            alignItems="stretch"
            flexDirection="column"
          >
            <Head>
              <title>FarContest</title>
              <meta content="Create constests on Warpcast" name="description" />
              <link
                rel="icon"
                href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>"
              />
            </Head>

            <div>
              <Stack
                justifyContent="space-between"
                flexDirection={{
                  base: "column",
                  md: "row",
                }}
                alignItems={{
                  base: "center",
                  md: "center",
                }}
                gap={{
                  base: 4,
                  md: 0,
                }}
              >
                <Logo />
                <ConnectButton />
              </Stack>
            </div>
            <chakra.main mt={16} flexGrow={1}>
              {children}
            </chakra.main>
            <HStack
              as="footer"
              mt={16}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
            >
              <Text>© {new Date().getFullYear()} FarContest</Text>
              <DotDivider mx={2} />
              <Text>By typeof.eth and loocy.eth</Text>
            </HStack>
          </Flex>
        </RootProvider>
      </body>
    </html>
  );
}
