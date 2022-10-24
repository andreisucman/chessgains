import Head from "next/head";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import styles from "../styles/winner.module.scss";

export default function Winner() {
  return (
    <>
      <Head>
        <title>Chessgains - Winners</title>
        <meta name="winners" content="Chessgains - Skill-based tournament for chess lovers - winners page" />
      </Head>
      <div className={styles.container}>
        <Stats />
        <Footer />
      </div>
    </>
  );
}
