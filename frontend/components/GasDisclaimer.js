import styles from "../styles/GasDisclaimer.module.scss";

export default function GasDisclaimer() {
  return (
    <div className={styles.gas_disclaimer}>
      <div className={styles.gas_disclaimer__ico}></div><span className={styles.gas_disclaimer__text}>The Polygon chain is overloaded. Transactions may take several minutes to process. To ensure the stability of your transactions keep ~0.5 more MATIC on your balance and wait patiently.</span>
    </div>
  );
}
