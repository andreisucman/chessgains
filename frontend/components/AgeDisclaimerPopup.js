import { useState, useEffect } from "react";
import ls from "localstorage-slim";
import styles from "../styles/AgeDisclaimerPopup.module.scss";

export default function AgeDisclaimerPopup() {
  const savedConsent = ls.get("chessgains_age_disclaimer");
  const [showModal, setShowModal] = useState(false);
  const [underEighteen, setUnderEighteen] = useState(false);

  useEffect(() => {
    setShowModal(savedConsent ? false : true);
  }, []);

  function handleConsent() {
    ls.set("chessgains_age_disclaimer", true);
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <section className={styles.age_disclaimer_popup}>
          <div className={styles.age_disclaimer_popup__wrapper}>
            <div className={styles.age_disclaimer_popup__body}>
              <p className={styles.age_disclaimer_popup__title}>Warning</p>
              <p className={styles.age_disclaimer_popup__text}>
                {!underEighteen ? (
                  <span>
                    This website is intended for users over 18 years old. If your age is under 18 you must leave this site
                    immediately.
                  </span>
                ) : (
                  <span>
                    Sorry, you can't access this website at the moment. Come when you're 18.
                  </span>
                )}
              </p>
            </div>
            {!underEighteen && <div className={styles.age_disclaimer_popup__buttons}>
              <button className={styles.age_disclaimer_popup__button} onClick={handleConsent}>
                I&apos;m over 18
              </button>
              <button className={styles.age_disclaimer_popup__button} onClick={() => setUnderEighteen(true)}>
                I&apos;m under 18
              </button>
            </div>}
          </div>
        </section>
      )}
    </>
  );
}
