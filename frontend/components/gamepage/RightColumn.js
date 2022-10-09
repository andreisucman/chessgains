import Image from "next/image";
import { COMPUTER_DESCRIPTIONS } from "../gamepage/Board";
import styles from "../../styles/game.module.scss";

export default function RightColumn(props) {
  const {
    prizeValueUsd,
    onNewGameClick,
    onConfirmationToggleClick,
    onSoundToggleClick,
    onConfirmationClick,
    chess,
    settings,
    loading,
  } = props;

  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__pool}>
        <div className={styles.card__coins}></div>
        Prize: {Number(props.prizeValueMatic).toFixed(0)}
        <div className={styles.gamepage__polygon_icon}></div>
        <span className={styles.card__prize}>(~${Number(Math.round(prizeValueUsd))}</span>)
      </div>
      <div className={styles.new_game}>
        <button
          id="new_game_btn"
          className={`${styles.btn} ${styles.new_game__btn}`}
          disabled={!chess.history.length || loading}
          onClick={onNewGameClick}
        >
          <div className={styles.new_game__img}></div>
          <b>New Game</b>
        </button>
      </div>
      <div className={styles.sound_and_move_div}>
        <div id={styles.sound}>
          <p className={styles.card__heading}>
            <b>Sound</b>
          </p>
          <label className={styles.switch}>
            <input type="checkbox" checked={settings.sound ? "checked" : ""} onChange={onSoundToggleClick} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        <div className={styles.confirmation}>
          <p className={styles.card__heading}>
            <b>Move confirmation</b>
          </p>
          <div className={styles.confirmation__row}>
            <label className={styles.switch}>
              <input type="checkbox" checked={settings.confirmation ? "checked" : ""} onChange={onConfirmationToggleClick} />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            {settings.confirmation ? (
              <button
                className={`${styles.confirmation__btn} ${styles.btn}`}
                onClick={onConfirmationClick}
                disabled={!(chess.move.from && chess.move.to)}
              >
                <b>Confirm</b>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className={styles.history}>
        <b className={styles.card__heading}>History</b>
        <div className={styles.history__data}>
          {chess.history.map((record) => {
            return ` ${record.from}-${record.to} `;
          })}
        </div>
      </div>
      <div className={styles.level}>
        <p className={styles.level__heading}>
          <strong>You're playing with</strong>
        </p>
        <div className={styles.level__ai_bio}>
          <div className={styles.level__ai_bio_info}>
            <div className={styles.level__ai_name}>
              <strong>{COMPUTER_DESCRIPTIONS[settings.computerLevel].name}</strong>
            </div>
            <div className={styles.level__ai_desc}>{COMPUTER_DESCRIPTIONS[settings.computerLevel].desc}</div>
            <div className={styles.level__ai_score}>Base score: {COMPUTER_DESCRIPTIONS[settings.computerLevel].score}</div>
          </div>
          <Image src={COMPUTER_DESCRIPTIONS[settings.computerLevel].image} objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
