import React from "react";
import styles from "../../../styles/StepTwo.module.scss";

export default function WinScreenStepTwo({ setShowFinalScreen, retryGame, prizeValueUsd, prizeValueMatic, timer }) {
  function handlePlayAgain() {
    retryGame();
    setShowFinalScreen(null);
  }

  return (
    <div className={styles.screen_two}>
      <div className={styles.screen_two__content}>
        <div className={styles.screen_two__content_wrapper}>
          <div className={styles.screen_two__title_div}>
            <h2 className={styles.screen_two__main_title}>You're in</h2>
          </div>
          <div className={styles.screen_two__prize}>
            <h3 className={styles.screen_two__title}>Current Prize Pool</h3>
            <div className={styles.screen_two__number_div}>
              <div className={styles.screen_two__prize_wrapper}>
                <div className={styles.screen_two__prize_ico}></div>
                <div className={styles.screen_two__number}>
                  {Number(Math.round(prizeValueMatic))} <div className={styles.screen_two__polygon_icon}></div>
                </div>
                <div className={styles.screen_two__prize_num_wrapper}>(~${Number(Math.round(prizeValueUsd))})</div>
              </div>
              <p className={styles.screen_two__timer_wrapper}>
                <span>{timer}</span>
              </p>
            </div>
          </div>
          <button className={styles.screen_two__cta} onClick={handlePlayAgain} id="play_again_btn_step_two">
            <div className={styles.screen_two__cta_img}></div>
            <p className={styles.screen_two__cta_text}>Play again</p>
          </button>
        </div>
        <button onClick={() => setShowFinalScreen(null)} className={styles.screen_two__cross}></button>
      </div>
    </div>
  );
}
