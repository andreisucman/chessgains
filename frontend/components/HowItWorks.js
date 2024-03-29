import YoutubeEmbed from "./YoutubeIEmbed";
import styles from "../styles/HowItWorks.module.scss";

export default function HowItWorks({ howItWorksRef }) {
  return (
    <div className={styles.how_it_works} ref={howItWorksRef}>
      <h2 className={styles.how_it_works__title}>How does it work?</h2>
      <YoutubeEmbed videoId={"EFyT4Z5e1U4"} title={"Chessgains - Skill-based competition for chess lovers"} />
    </div>
  );
}