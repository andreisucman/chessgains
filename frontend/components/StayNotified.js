import styles from "../styles/StayNotified.module.scss";

export default function StayNotified() {
  return (
    <div className={styles.stay_notified}>
      <div className={styles.stay_notified__wrapper}>
        <h2 className={styles.stay_notified__title}>Stay Notified</h2>
        <a className={styles.stay_notified__btn} href="https://t.me/+p8kraNSWYFQ1NzY5" target="_blank" rel="noreferrer" id="join_telegram">
          <span className={styles.stay_notified__btn_text}>Join Telegram</span>
        </a>
      </div>
    </div>
  );
}
