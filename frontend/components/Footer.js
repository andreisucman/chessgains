import styles from "../styles/Footer.module.scss";
import Copyright from "./Copyright";
import AgeDisclaimer from "./AgeDisclaimer";
import ReactLoading from "react-loading";
import { useMoralis } from "react-moralis";
import { useGetMethods } from "./ContextProvider";
import { useRouter } from "next/router";

export default function Footer() {
  const { isWeb3EnableLoading, isAuthenticated } = useMoralis();
  const methods = useGetMethods();
  const router = useRouter();

  return (
    <>
      {/* <AgeDisclaimer /> */}
      <footer className={styles.footer}>
        <div className={styles.footer__nav}>
          <div className={styles.footer__left}>
            <h2 className={styles.footer__slogan}>Turn your skill into profit</h2>
            <div className={styles.footer__trustpilot}>
              <a
                className={styles.footer__trustpilot_link}
                href="https://uk.trustpilot.com/review/chessgains.com"
                target="_blank"
                rel="noopener"
              >
                <div className={styles.footer__trustpilot_logo}></div>
                <span className={styles.footer__trustpilot_text}>Check reviews on Trustpilot</span>
              </a>
            </div>
          </div>
          <ul className={styles.nav_buttons__list}>
            <li className={`${styles.nav_buttons__item} ${styles.nav_buttons__item_enter}`}>
              {isWeb3EnableLoading ? (
                <ReactLoading type="spin" color="#F4F0E6" width={65} height={65} />
              ) : (
                <>
                  <button
                    id="play_now_btn"
                    className={styles.nav_buttons__link}
                    onClick={() => {
                      if (isAuthenticated) {
                        router.push("/wallet");
                      } else {
                        methods.handleLogin();
                      }
                    }}
                  >
                    Play now
                  </button>
                  <div className={styles.nav_buttons__handwithpawn}></div>
                </>
              )}
            </li>
          </ul>
        </div>
      </footer>
      <Copyright />
    </>
  );
}
