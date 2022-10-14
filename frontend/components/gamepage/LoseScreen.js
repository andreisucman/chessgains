import React from "react";
import styles from "../../styles/LoseScreen.module.scss";
import { COMPUTER_DESCRIPTIONS, NEW_GAME_BOARD_CONFIG } from "./Board";
import ls from "localstorage-slim";

export default function LoseScreen({
  setShowFinalScreen,
  retryGame,
  prizeValueUsd,
  prizeValueMatic,
  timer,
  settings,
  chess,
  setChess,
}) {
  async function handlePlayAgain() {
    retryGame();
    setShowFinalScreen(null);
    setChess(Object.assign(chess, { pieces: {} }, { history: [] }, NEW_GAME_BOARD_CONFIG));
    ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, { history: [], prevConfig: chess }, NEW_GAME_BOARD_CONFIG, { encrypt: true });
  }

  return (
    <div className={styles.lose_screen}>
      <div className={styles.lose_screen__content}>
        <div className={styles.lose_screen__content_wrapper}>
          <div className={styles.lose_screen__title_div}>
            <h2 className={styles.lose_screen__main_title}>{COMPUTER_DESCRIPTIONS[settings.computerLevel].name} won</h2>
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
