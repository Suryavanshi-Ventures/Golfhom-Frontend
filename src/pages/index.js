import Head from "next/head";
import Index from "./home/home";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Golfhom</title>
        <meta
          name="description"
          content="Welcome to Golfhōm, your new haven for discovering the perfect golf vacation rental. Say goodbye to the days of tirelessly sorting through irrelevant results on generic vacation websites. Instead, allow yourself to dive into a platform meticulously curated for passionate golf enthusiasts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Index />
      </main>
    </>
  );
}
