import React from "react";
import styles from "../../styles/LoseScreen.module.scss";

export default function LoseScreen({ setShowFinalScreen, retryGame, prizeValueUsd, prizeValueMatic, timer }) {
  function handlePlayAgain() {
    retryGame();
    setShowFinalScreen(null);
  }

  return (
    <div className={styles.lose_screen}>
      <div className={styles.lose_screen__content}>
        <div className={styles.lose_screen__content_wrapper}>
          <div className={styles.lose_screen__title_div}>
            <h2 className={styles.lose_screen__main_title}>AI Won</h2>
          </div>
          <div className={styles.lose_screen__banner}></div>
          <button className={styles.lose_screen__cta} onClick={handlePlayAgain} id="play_again_lose_screen">
            <div className={styles.lose_screen__cta_img}></div>
            <p className={styles.lose_screen__cta_text}>Play again</p>
          </button>
          <div className={styles.lose_screen__prize}>
            <div className={styles.lose_screen__number_div}>
              <div className={styles.lose_screen__prize_wrapper}>
                <div className={styles.lose_screen__prize_ico}></div>
                <div className={styles.lose_screen__number}>
                  {Number(prizeValueMatic).toFixed(0)}
                  <div className={styles.lose_screen__polygon_icon}></div>
                </div>
                (~${Number(Math.round(prizeValueUsd))})
              </div>
              <p className={styles.lose_screen__prize_num_wrapper}>
                <span>{timer}</span>
              </p>
            </div>
          </div>
        </div>
        <button onClick={() => setShowFinalScreen(null)} className={styles.lose_screen__cross} id="close_lose_screen"></button>
      </div>
    </div>
  );
}
