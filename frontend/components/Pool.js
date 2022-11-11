import ParticipantsList from "./ParticipantsList";
import styles from "../styles/Pool.module.scss";

export default function Pool({ prizeValueUsd, prizeValueMatic, timer, gRefresh }) {
  return (
    <div className={styles.pool}>
      <div className={styles.pool__wrapper}>
        <div className={styles.pool__participants}>
          <h3 className={styles.pool__title}>
            <div className={styles.pool__participants_ico}></div>Participants
          </h3>
          <div className={styles.pool__heading}>
            <span className={styles.pool__address_heading}>Address</span>
            <span className={styles.pool__score_heading}>Score</span>
            <span className={styles.pool__chance_heading}>Chance</span>
            <span className={styles.pool__chance_heading}>Entered</span>
          </div>
          <ParticipantsList gRefresh={gRefresh} />
        </div>
        <div className={styles.pool__prize}>
          <h3 className={`${styles.pool__title} ${styles.pool__title_pool}`}>Prize Pool</h3>
          <div className={styles.pool__number_div}>
            <div className={styles.pool__number_div_wrapper}>
              <div className={styles.pool__prize_container}>
                <div className={styles.pool__prize_ico}></div>
                <div className={styles.pool__number}>
                  {Number(Math.round(prizeValueMatic))}
                  <div className={styles.pool__polygon_symbol}></div>
                </div>
              </div>
              <div className={styles.pool__prize_wrapper}>(~${Number(Math.round(prizeValueUsd))})</div>
            </div>
            <div className={styles.pool__timer_wrapper}>{"00:00:00"}</div>
            {/* <div className={styles.pool__timer_wrapper}>{timer}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
