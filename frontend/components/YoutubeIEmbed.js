import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import styles from "../styles/YoutubeEmbed.module.scss";

export default function YoutubeEmbed({ videoId, title }) {
  return (
    <div className={styles.youtube_embed__video}>
      <div className={styles.youtube_embed__iframe_wrapper}>
        <LiteYouTubeEmbed
          className={styles.youtube_embed__iframe}
          id={videoId}
          title={title}
          playlist={false}
          poster="hqdefault"
          webp
          autoplay
        />
      </div>
    </div>
  );
}
