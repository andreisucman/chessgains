import { useState } from "react";
import { useMoralis } from "react-moralis";
import styles from "../styles/MaintenanceDisclaimer.module.scss";

export default function MaintenanceDisclaimer() {
  const { Moralis } = useMoralis();
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState(false);


  async function subscribe() {
    if (!email) return;

    const SubscribersTable = Moralis.Object.extend("Subscribers");
    const subscriberInstance = new SubscribersTable();
    subscriberInstance.set("email", email);
    await subscriberInstance.save();

    setSuccess(true);
    setEmail(null);

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  }

  return (
    <section className={styles.maintenance_disclaimer}>
      <div className={styles.maintenance_disclaimer__wrapper}>
        <div className={styles.maintenance_disclaimer__body}>
          <div className={styles.maintenance_disclaimer__text}>
            <div className={styles.maintenance_disclaimer__ico}></div>
            We're introducing the free-to-play mode along with the improvements in monetization for our users. The service will be back when the updates are live. Enter your email below if you want to get notified about that.
          </div>
          <div className={styles.maintenance_disclaimer__form}>
            <input
              type="email"
              className={styles.maintenance_disclaimer__input}
              placeholder="Enter your email here"
              value={email ? email : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.maintenance_disclaimer__button} type="button" onClick={subscribe}>
              Stay notified
            </button>
          </div>
            <p className={success ? `${styles.maintenance_disclaimer__notification} ${styles.maintenance_disclaimer__notification_visible}` : styles.maintenance_disclaimer__notification}>Success! We'll notify you when the game is live</p>
        </div>
      </div>
    </section>
  );
}
