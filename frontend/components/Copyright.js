import React from "react";
import Link from "next/link";
import styles from "../styles/Copyright.module.scss";

export default function Copyright() {
  return (
    <div className={styles.copyright}>
      <p className={styles.copyright__paragraph}>Chessgains | SunChain LTD &copy; 2022</p>
      <ul className={styles.copyright__list}>
        <li className={styles.copyright__item}>
          <Link href="/privacy">
            <a className={styles.copyright__link} id="privacy_policy">Privacy</a>
          </Link>
        </li>
        <li className={styles.copyright__item}>
          <Link href="/terms">
            <a className={styles.copyright__link} id="terms_policy">Terms</a>
          </Link>
        </li>
        <li className={styles.copyright__item}>
          <Link href="/contact">
            <a className={styles.copyright__link} id="contact_footer">Contact</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
