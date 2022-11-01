import styles from "../styles/GasDisclaimer.module.scss";

export default function GasDisclaimer() {
  return (
    <div className={styles.gas_disclaimer}>
      <div className={styles.gas_disclaimer__ico}></div>
      <span className={styles.gas_disclaimer__text}>
        Transactions may take several minutes to process. Please always keep ~0.5 MATIC on your balance and wait patiently.
      </span>
    </div>
  );
}
