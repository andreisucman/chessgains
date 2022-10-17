import styles from "../styles/Trustpilot.module.scss";

export default function Trustpilot() {
  return (
    <div className={styles.trustpilot}>
      <a className={styles.trustpilot_link} href="https://uk.trustpilot.com/review/chessgains.com" target="_blank" rel="noopener">
        <div className={styles.trustpilot_logo}></div>
        <span className={styles.trustpilot_text}>We're on Trustpilot</span>
      </a>
    </div>
  );
}
