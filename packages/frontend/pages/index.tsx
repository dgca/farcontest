import type { NextPage } from "next";
import Head from "next/head";

import { Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web3 Starter Kit</title>
        <meta
          name="description"
          content="A starter kit for building web3 applications with RainbowKit, wagmi, and Next.js"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <MainLayout>
        <div className="container px-4 py-12 mx-auto">
          <Text.H1>Hello world!</Text.H1>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
