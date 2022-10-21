import YoutubeEmbed from "./YoutubeIEmbed";
import styles from "../styles/GasDisclaimer.module.scss";

export default function GasDisclaimer() {
  return (
    <div className={styles.gas_disclaimer}>
      <div className={styles.gas_disclaimer__ico}></div><span className={styles.gas_disclaimer__text}>Gas prices are volatile due to the Polygon
      chain overload. To ensure the stability of your transactions always keep ~0.5 MATIC on your balance for covering the gas fees.</span>
    </div>
  );
}
