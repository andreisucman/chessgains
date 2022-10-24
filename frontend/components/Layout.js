import Head from "next/head";
import styles from "../styles/Layout.module.scss";

export default function Layout({ children }) {
  <Head>
    <meta name="description" content="Play chess against computer to win in the tournament" />
    <meta name="keywords" content="play chess, play chess against computer, play chess for money, play chess computer" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  </Head>;

  return (
  <div className={styles.page}>{children}</div>);
}
