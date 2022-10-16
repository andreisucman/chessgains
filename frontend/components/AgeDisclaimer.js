import styles from "../styles/AgeDisclaimer.module.scss";

export default function AgeDisclaimer() {
  return (
    <section className={styles.age_disclaimer}>
      <div className={styles.age_disclaimer__wrapper}>
        <div className={styles.age_disclaimer__body}>
          <div className={styles.age_disclaimer__ico}></div>
          <p className={styles.age_disclaimer__text}>
            This website is intended for users over 18 years old. If your age is under 18 you must leave immediately .{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
