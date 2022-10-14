import React, { useEffect } from "react";
import ls from "localstorage-slim";
import { PERSIST_STATE_NAMESPACE } from "../gamepage/Board";
import styles from "../../styles/PersistState.module.scss";

export default function PersistState(props) {
  const { settings, chess } = props;

  useEffect(() => {
    ls.set(`${PERSIST_STATE_NAMESPACE}_settings`, settings, { encrypt: true });
  }, [settings]);

  useEffect(() => {
    ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, Object.assign({}, chess, { prevConfig: chess }), { encrypt: true });
  }, [chess && chess.turn]);

  return <div className={styles.hidden}></div>;
}
