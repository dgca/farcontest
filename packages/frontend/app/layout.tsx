"use client";
import { Link } from "@chakra-ui/next-js";
import { chakra, Flex, HStack, Text, Stack, Container } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";

import { RootProvider } from "./RootProvider";

import { Logo } from "@/components/Logo/Logo";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Script src="https://neynarxyz.github.io/siwn/raw/1.2.0/index.js" async />
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
                <Link href="/">
                  <Logo />
                </Link>
                <ConnectButton />
              </Stack>
            </div>
            <chakra.main mt={16} flexGrow={1}>
              <Container maxW="container.lg">{children}</Container>
            </chakra.main>
            <HStack
              as="footer"
              mt={16}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
            >
              <Text>© {new Date().getFullYear()} FarContest</Text>
              <Text>🪿</Text>
              <Text>By typeof.eth and loocy.eth</Text>
            </HStack>
          </Flex>
        </RootProvider>
      </body>
    </html>
  );
}
