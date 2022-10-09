import ReactLoading from "react-loading";
import { useMoralis } from "react-moralis";
import styles from "../styles/Hero.module.scss";
import { useGetMethods } from "./ContextProvider";
import { useRouter } from "next/router";

export default function LoginBtn() {
  const { isWeb3EnableLoading, isAuthenticated } = useMoralis();
  const methods = useGetMethods();
  const router = useRouter();

  return (
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
  );
}
