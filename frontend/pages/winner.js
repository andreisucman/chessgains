import Head from "next/head";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Winner() {

  
  return (
    <>
      <Head>
        <title>Chessgains - Winners</title>
        <meta name="winners" content="Chessgains - skill-based lottery for chess lovers - winners page" />
      </Head>
      <Stats />
      <Footer />
    </>
  );
}
