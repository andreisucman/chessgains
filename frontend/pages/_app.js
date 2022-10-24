import { useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import AgeDisclaimerPopup from "../components/AgeDisclaimerPopup";
import Cookies from "../components/Cookies";
import { MoralisProvider } from "react-moralis";
import ContextProvider from "../components/ContextProvider";
import TagManager from "react-gtm-module";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const gtmId = "GTM-NJ3HDFD" || "";

  const tagManagerArgs = {
    gtmId,
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <>
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL} appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}>
        <ContextProvider>
          <Header />
          <Cookies />
          {/* <AgeDisclaimerPopup /> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
