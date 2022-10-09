import React, { useEffect } from "react";
import ls from "localstorage-slim";
import { PERSIST_STATE_NAMESPACE } from "../gamepage/Board";
import styles from "../../styles/PersistState.module.scss";

export default function PersistState(props) {
  const { settings, chess } = props;

  useEffect(() => {
    try {
      ls.set(`${PERSIST_STATE_NAMESPACE}_settings`, settings, { encrypt: true });
    } catch (err) {
      console.log(error);
    }
  }, [settings]);

  useEffect(() => {
    try {
      ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, chess, { encrypt: true });
    } catch (err) {
      console.log(err);
    }
  }, [chess && chess.turn]);

  return <div className={styles.hidden}></div>;
}
