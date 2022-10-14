import React, { useEffect } from "react";
import ls from "localstorage-slim";
import { PERSIST_STATE_NAMESPACE } from "../gamepage/Board";
import styles from "../../styles/PersistState.module.scss";

export default function PersistState(props) {
  const { settings, chess } = props;

  useEffect(() => {
    async function encrypt() {
      await fetch("https://chessgains.com/api/encrypt", {
        data: settings,
        namespace: `${PERSIST_STATE_NAMESPACE}_settings`,
        customParams: {},
      });
    }
    encrypt();

    // ls.set(`${PERSIST_STATE_NAMESPACE}_settings`, settings, { encrypt: true });
  }, [settings]);

  useEffect(() => {
    async function encrypt() {
      await fetch("https://chessgains.com/api/encrypt", {
        data: chess,
        namespace: `${PERSIST_STATE_NAMESPACE}_chess`,
        customParams: {},
      });
    }
    encrypt();
    
    // ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, chess, { encrypt: true });
  }, [chess && chess.turn]);

  return <div className={styles.hidden}></div>;
}
