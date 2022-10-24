import { useRef } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Pool from "../components/Pool";
import AgeDisclaimer from "../components/AgeDisclaimer";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Explanation from "../components/Explanation";
import StayNotified from "../components/StayNotified";
import Trustpilot from "../components/Trustpilot";
import { useGetCurrentState } from "../components/ContextProvider";
import { useGetMethods } from "../components/ContextProvider";
import { useGetPrizeTimer } from "../components/ContextProvider";

export default function Home() {
  const howItWorksRef = useRef();
  const currentState = useGetCurrentState();
  const methods = useGetMethods();
  const prizeTimer = useGetPrizeTimer();

  return (
    <>
      <Head>
        <title>Chessgains - Play chess against computer and win in the tournament</title>
        <meta
          name="description"
          content="Chessgains - play chess against computer to get a chance of winning in the tournament based on your skill. Check it out!"
        />
      </Head>
      <Hero howItWorksRef={howItWorksRef} handleLogin={methods.handleLogin} />
      {/* <AgeDisclaimer /> */}
      <Pool
        prizeValueUsd={currentState.prizeValueUsd}
        prizeValueMatic={currentState.prizeValueMatic}
        timer={prizeTimer}
        gRefresh={currentState.gRefresh}
      />
      <HowItWorks howItWorksRef={howItWorksRef} />
      <Trustpilot />
      <Stats gRefresh={currentState.gRefresh} />
      <Explanation />
      <StayNotified />
      <Footer />
    </>
  );
}
