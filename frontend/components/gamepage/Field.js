import React from "react";
import styles from "../../styles/game.module.scss";

export default function Field(props) {
  const { onClick, location, chess, settings } = props;

  let piece = chess.pieces[location] || "";
  if (settings.confirmation) {
    if (chess.move.from && chess.move.to) {
      if (location === chess.move.from) {
        piece = "";
      }
      if (location === chess.move.to) {
        piece = chess.pieces[chess.move.from];
      }
    }
  }

  const historyClass =
    chess.history.length &&
    (chess.history[chess.history.length - 1].from === location ||
      chess.history[chess.history.length - 1].to === location)
      ? "lastMove"
      : "";
  const moveFromClass = chess.move.from === location ? "moveFrom" : "";
  const moveToClass =
    chess.move.from &&
    chess.moves &&
    chess.moves[chess.move.from] &&
    chess.moves[chess.move.from].includes(location)
      ? "moveTo"
      : "";

  return (
    <div
      className={`${styles.field} ${styles[`piece${piece}`]} ${styles[moveFromClass]} ${styles[moveToClass]} ${styles[historyClass]}`}
      onClick={onClick}
    ></div>
  );
}

