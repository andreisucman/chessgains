import winbanner from "../public/assets/winbanner.webp";
import Image from "next/image";
import styles from "../styles/Hero.module.scss";
import LoginBtn from "./LoginBtn";

export default function Hero({ howItWorksRef }) {
  return (
    <div className={styles.hero}>
      <div className={styles.banner}>
        <Image className={styles.banner__img} alt="chess computer" src={winbanner} width={640} height={640} />
      </div>
      <nav className={styles.nav_buttons}>
        <div className={styles.slogan_box}>
          <h1 className={styles.slogan}>Monetize your intelligence</h1>
          <h2 className={styles.cta}>Start earning with chess today</h2>
        </div>
        <div className={styles.reasons_to_participate}>
          <ul className={styles.reasons_to_participate__list}>
            <li className={styles.reasons_to_participate__item}>Play chess against computer and get a score</li>
            <li className={styles.reasons_to_participate__item}>Submit your score to get a chance of winning</li>
            <li className={styles.reasons_to_participate__item}>Get the prize sent to your wallet automatically</li>
          </ul>
        </div>
        <LoginBtn />
        <p
          id="how_does_it_work"
          className={styles.nav_buttons__how_does_it_work}
          onClick={() => howItWorksRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          How does it work?
        </p>
      </nav>
    </div>
  );
}
