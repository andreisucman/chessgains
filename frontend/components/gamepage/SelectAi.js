import React from "react";
import ls from "localstorage-slim";
import { PERSIST_STATE_NAMESPACE } from "../gamepage/Board";
import styles from "../../styles/SelectAi.module.scss";

export default function SelectAi({ selectThisAi, setShowSelectAi, triggerGameSave, chess, setChess }) {
  function handleSelect(aiId) {
    selectThisAi(aiId);
    setShowSelectAi(false);
    triggerGameSave(aiId);
    setChess(Object.assign({}, chess, { history: [] }));
    ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, Object.assign({}, chess, { history: [] }), {
      decrypt: true,
    });
  }

  return (
    <div className={styles.select_ai}>
      <div className={styles.select_ai__wrapper}>
        <h2 className={styles.select_ai__title}>Choose your opponent</h2>
        <div className={styles.select_ai__container}>
          <div className={styles.gamma} onClick={() => handleSelect(0)}>
            <div className={styles.gamma__img}></div>
            <h3 className={styles.gamma__title}>Gamma</h3>
            <p className={styles.gamma__desc}>Knows how to move the pieces, but confuses their importance</p>
            <p className={styles.gamma__score}>Base score: 50</p>
          </div>
          <div className={styles.delta} onClick={() => handleSelect(1)}>
            <div className={styles.delta__img}></div>
            <h3 className={styles.delta__title}>Delta</h3>
            <p className={styles.delta__desc}>Considers the importance of the pieces but doesn't have a strategy</p>
            <p className={styles.delta__score}>Base score: 75</p>
          </div>
          <div className={styles.beta} onClick={() => handleSelect(2)}>
            <div className={styles.beta__img}></div>
            <h3 className={styles.beta__title}>Beta</h3>
            <p className={styles.beta__desc}>Has a basic strategy, but doesn't think about the future</p>
            <p className={styles.beta__score}>Base score: 110</p>
          </div>
          <div className={styles.alpha} onClick={() => handleSelect(3)}>
            <div className={styles.alpha__img}></div>
            <h3 className={styles.alpha__title}>Alpha</h3>
            <p className={styles.alpha__desc}>Plays like a well trained chess player</p>
            <p className={styles.alpha__score}>Base score: 160</p>
          </div>
          <div className={styles.omega} onClick={() => handleSelect(3)}>
            <div className={styles.omega__img}></div>
            <h3 className={styles.omega__title}>Omega</h3>
            <p className={styles.omega__desc}>Rumors go that he taught Magnus Carlsen chess</p>
            <p className={styles.omega__score}>Base score: 225</p>
          </div>
        </div>
      </div>
    </div>
  );
}
