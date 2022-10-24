import React from "react";
import Image from "next/image";
import Link from "next/link";
import clubrewardimg from "../public/assets/club-reward.webp";
import mainrewardimg from "../public/assets/main-reward.webp";
import toprewardimg from "../public/assets/top-reward.webp";
import styles from "../styles/Explanation.module.scss";

export default function Explanation() {
  return (
    <div className={styles.explanation}>
      <h2 className={styles.explanation__title}>Rewards</h2>
      <div className={styles.explanation__wrapper}>
        <div className={styles.explanation__main}>
          <div className={styles.explanation__main_img_div}>
            <Image
              className={styles.explanation__main_img}
              src={mainrewardimg}
              alt="chessgains main reward"
              width={450}
              height={450}
            />
          </div>
          <div className={styles.explanation__main_text}>
            <h3 className={styles.explanation__main_title}>Main prize</h3>
            <p className={styles.explanation__paragraph}>
              After defeating the AI you can enter the tournament with your score to get a chance of winning. The higher your score -
              the more chances you have to win. Your payment combined with the payments of other players forms the prize pool that
              the winner is going to take.
            </p>
            <ul className={styles.explanation__main_list}>
              <li className={styles.explanation__main_list_item}>1. Win the game to get a score</li>
              <li className={styles.explanation__main_list_item}>2. Send your score to the tournament</li>
              <li className={styles.explanation__main_list_item}>3. Receive the prize to your wallet</li>
            </ul>
            <Link href="/documentation">
              <a className={styles.explanation__learn_more_btn} id="learn_more_prize">Learn more</a>
            </Link>
          </div>
        </div>
        <div className={styles.explanation__top}>
          <div className={styles.explanation__top_img_div}>
            <Image
              className={styles.explanation__top_img}
              src={toprewardimg}
              alt="chessgains top reward"
              width={450}
              height={450}
            />
          </div>
          <div className={styles.explanation__top_text}>
            <h3 className={styles.explanation__top_title}>Performance rewards</h3>
            <p className={styles.explanation__paragraph}>
              You can get performance rewards from every tournament prize based on how well you compare to other players. If you
              scored within the top 10% of your session you get $1 back. If you rank within the top 5% or top 1% of players you
              get $2 and $3 back respectively.
            </p>
            <table className={styles.explanation__top_table}>
              <thead>
                <tr className={styles.explanation__top_table_row}>
                  <th className={styles.explanation__top_table_heading}>Rank</th>
                  <th className={styles.explanation__top_table_heading}>Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.explanation__top_table_row}>
                  <td className={styles.explanation__top_table_data}>Top 1%</td>
                  <td className={styles.explanation__top_table_data}>$3</td>
                </tr>
                <tr className={styles.explanation__top_table_row}>
                  <td className={styles.explanation__top_table_data}>Top 5%</td>
                  <td className={styles.explanation__top_table_data}>$2</td>
                </tr>
                <tr className={styles.explanation__top_table_row}>
                  <td className={styles.explanation__top_table_data}>Top 10%</td>
                  <td className={styles.explanation__top_table_data}>$1</td>
                </tr>
              </tbody>
            </table>
            <Link href="/documentation">
              <a className={styles.explanation__learn_more_btn} id="learn_more_performance">Learn more</a>
            </Link>
          </div>
        </div>
        <div className={styles.explanation__club}>
          <div className={styles.explanation__club_img_div}>
            <Image
              className={styles.explanation__club_img}
              src={clubrewardimg}
              alt="chessgains club rewards"
              width={450}
              height={450}
            />
          </div>
          <div className={styles.explanation__club_text}>
            <h3 className={styles.explanation__club_title}>CHSS token rewards</h3>
            <p className={styles.explanation__paragraph} style={{ marginBottom: "24px" }}>
              You can support the project by getting CHSS tokens that grant a share of the reward from every tournament prize. The
              more CHSS tokens you have, the bigger is your share from each payout.
            </p>
            <Link href="/documentation">
              <a className={styles.explanation__learn_more_btn} id="learn_more_chss">Learn more</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
