import styles from "../styles/Footer.module.scss";
import Copyright from "./Copyright";
import AgeDisclaimer from "./AgeDisclaimer";
import LoginBtn from "./LoginBtn";

export default function Footer() {
  return (
    <>
      <AgeDisclaimer />
      <footer className={styles.footer}>
        <div className={styles.footer__nav}>
          <h2 className={styles.footer__slogan}>Turn your skill into profit</h2>
          <LoginBtn />
        </div>
      </footer>
      <Copyright />
    </>
  );
}
