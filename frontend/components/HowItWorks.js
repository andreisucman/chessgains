import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import styles from "../styles/HowItWorks.module.scss";

export default function HowItWorks({ howItWorksRef }) {
  return (
    <div className={styles.how_it_works} ref={howItWorksRef}>
      <h2 className={styles.how_it_works__title}>How does it work?</h2>
      <div className={styles.how_it_works__video}>
        <div className={styles.how_it_works__iframe_wrapper}>
          <LiteYouTubeEmbed
            className={styles.how_it_works__iframe}
            id="US50dMkLSCw"
            title="Chessgains - Skill-based lottery for chess lovers"
            playlist={false}
            poster="hqdefault"
            webp
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
