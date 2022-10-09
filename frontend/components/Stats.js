import WinnersList from "../components/WinnersList";
import TopPlayersList from "../components/TopPlayersList";
import styles from "../styles/Stats.module.scss";

export default function Stats({ gRefresh }) {
  return (
    <div className={styles.stats}>
      <div className={styles.stats__wrapper}>
        <div className={styles.stats__winners}>
          <h3 className={styles.stats__title}>
            <div className={styles.stats_medal_ico}></div>Latest winners
          </h3>
          <div className={styles.stats__heading}>
            <span className={styles.stats__address_heading}>Address</span>
            <span className={styles.stats__reward_heading}>Prize</span>
            <span className={styles.stats__date_heading}>Date</span>
          </div>
          <WinnersList gRefresh={gRefresh} />
        </div>
        <div className={styles.stats__top_players}>
          <h3 className={styles.stats__title}>
            <div className={styles.stats_pedestal_ico}></div>Top players
          </h3>
          <div className={styles.stats__heading}>
            <span className={styles.stats__address_heading}>Address</span>
            <span className={styles.stats__reward_heading}>Avg. score</span>
            <span className={styles.stats__date_heading}>Earned</span>
          </div>
          <TopPlayersList gRefresh={gRefresh} />
        </div>
      </div>
    </div>
  );
}
