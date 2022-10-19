import { useState, useEffect } from "react";
import styles from "../../styles/Cheater.module.scss";
import { NEW_GAME_BOARD_CONFIG, PERSIST_STATE_NAMESPACE } from "./Board";
import ls from "localstorage-slim";

export default function Cheater({
  setShowFinalScreen,
  retryGame,
  prizeValueUsd,
  prizeValueMatic,
  timer,
  chess,
  setChess,
}) {

  const [gamesPlayed, setGamesPlayed] = useState(0);

  const data = ls.get(`${PERSIST_STATE_NAMESPACE}_chess`, { decrypt: true, secret: "data:audio/wav;base64" });

  useEffect(() => {
    setGamesPlayed(data.gamesPlayed);
  }, [data])

  async function handlePlayAgain() {
    retryGame();
    setShowFinalScreen(null);
    setChess(Object.assign(chess, { pieces: {} }, { history: [], prevConfig: {} }, NEW_GAME_BOARD_CONFIG));
    ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, Object.assign({}, { history: [], prevConfig: {} }, NEW_GAME_BOARD_CONFIG), {
      encrypt: true,
    });
  }

  return (
    <div className={styles.cheater}>
      <div className={styles.cheater__content}>
        <div className={styles.cheater__content_wrapper}>
          <div className={styles.cheater__title_div}>
            <h2 className={styles.cheater__main_title}>We can't let you in this time.</h2>
            <p className={styles.cheater__description}>
              Our anti-cheat system flagged this game by several parameters. Try again using your own judgement.
            </p>
          </div>
          <div className={styles.cheater__banner}></div>
          <button className={styles.cheater__cta} onClick={handlePlayAgain} id="cheater_play_again">
            <div className={styles.cheater__cta_img}></div>
            <p className={styles.cheater__cta_text}>Retry</p>
          </button>
          <div className={styles.cheater__prize}>
            <div className={styles.cheater__number_div}>
              <div className={styles.cheater__prize_wrapper}>
                <div className={styles.cheater__prize_ico}></div>
                <div className={styles.cheater__number}>
                  {Number(prizeValueMatic).toFixed(0)}
                  <div className={styles.cheater__polygon_icon}></div>
                </div>
                (~${Number(Math.round(prizeValueUsd))})
              </div>
              <p className={styles.cheater__prize_num_wrapper}>
                <span>{timer}</span>
              </p>
            </div>
          </div>
        </div>
        <button onClick={() => setShowFinalScreen(null)} className={styles.cheater__cross} id="close_lose_screen"></button>
      </div>
    </div>
  );
}
