import React, { useState, useEffect } from "react";
import ls from "localstorage-slim";
import Link from "next/link";
import styles from "../styles/Cookies.module.scss";

export default function Cookies() {
  const savedConsent = ls.get("chessgains_cookies_consent");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(savedConsent ? false : true);
  }, [])

  function handleConsent() {
    ls.set("chessgains_cookies_consent", true);
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <section className={styles.cookies}>
          <div className={styles.cookies__wrapper}>
            <div className={styles.cookies__body}>
              <p className={styles.cookies__title}>Cookie consent</p>
              <p className={styles.cookies__text}>
                We use cookies to better understand you as our user. We need this information to assess our service performance
                and provide you with a better experience. If you continue using our site, we assume that you are okay with that.{" "}
                <Link href="/privacy">
                  <a className={styles.cookies__link}>Read More</a>
                </Link>
              </p>
            </div>
            <button className={styles.cookies__button} onClick={handleConsent}>
              Okay
            </button>
          </div>
        </section>
      )}
    </>
  );
}
