import Link from "next/link";
import Head from "next/head";
import styles from "../styles/FAQ.module.scss";
import Footer from "../components/Footer";
import YoutubeEmbed from "../components/YoutubeIEmbed";

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>Chessgains - FAQ</title>
        <meta name="faq" content="Chessgains skill-based lottery for chess lovers - faq page" />
      </Head>
      <main className={styles.faq_page}>
        <div className={styles.faq_page__wrapper}>
          <h1 className={styles.faq_page__title}>FAQ</h1>
          <div className={styles.container}>
            <div className={styles.accordion}>
              <div className={styles.accordion__item} id="question1">
                <a className={styles.accordion__link} href="#question1">
                  Do you have an anti-cheat system?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    We have a versatile approach to cheating. First, we calculate and store critical information such as the
                    score, legality of moves, and the level of the AI on the server preventing potential hackers from modifying
                    them throughout the gameplay.
                  </p>
                  <p className={styles.accordion__paragraph}>
                    Then, we're running a live comparison of the player's move with the most popular commercially available chess
                    engines to calculate the probability of cheating.
                  </p>
                  <p className={styles.accordion__paragraph}>
                    Lastly, we placed limitations that reject the scores obtained under unrealistic circumstances.
                  </p>
                  <p className={`${styles.accordion__paragraph} ${styles.accordion__paragraph_bottom_16}`}>
                    We can't disclose these limitations due to obvious reasons, but if we suspect a participant of cheating we
                    deny his access to the lottery immediately.
                  </p>
                  <YoutubeEmbed videoId={"te8tAxay-M8"} title={"Can you cheat at chessgains.com?"} />
                </div>
              </div>
              <div className={styles.accordion__item} id="question2">
                <a className={styles.accordion__link} href="#question2">
                  How much can I earn with CHSS tokens?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    We can't guarantee you any earnings from the CHSS tokens. Please read the disclaimer on the{" "}
                    <Link href="/documentation">
                      <u>documentation page</u>
                    </Link>{" "}
                    before making the buying decision.
                  </p>{" "}
                  <p className={styles.accordion__paragraph}>
                    The amount of reward depends on the number of players in the lottery and the number of CHSS tokens in your
                    wallet. You can find the return formula, and estimated projections in the "Token holders reward" section of
                    the{" "}
                    <Link href="/documentation">
                      <u>documentation</u>
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className={styles.accordion__item} id="question3">
                <a className={styles.accordion__link} href="#question3">
                  Where can I see the team behind the project?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    We prefer not to disclose our identities due to safety considerations. At the moment our team consists of 4
                    people with over 20 years of cumulative experience in sales, marketing, and IT development.
                  </p>
                  <p className={styles.accordion__paragraph}>
                    If you feel uneasy about the security of your money or you have specific return expectations we strongly
                    advise you NOT to get involved in the Chessgains lottery and NOT buy any CHSS tokens.
                  </p>
                </div>
              </div>
              <div className={styles.accordion__item} id="question4">
                <a className={styles.accordion__link} href="#question4">
                  Can I pay more than one dollar?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    Our system doesn't accept more than one dollar for every application. But you can enter multiple times to
                    increase your odds of winning.
                  </p>
                  <p className={styles.accordion__paragraph}>Just bear in mind that higher odds don't guarantee victory.</p>
                </div>
              </div>
              <div className={styles.accordion__item} id="question5">
                <a className={styles.accordion__link} href="#question5">
                  Can I use my in-game wallet for other purposes?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    Your in-game wallet displays only MATIC and CHSS tokens. That's why we recommend using it only for
                    game-related transactions and keeping there only the amount of MATIC that you need for entering the lottery.
                  </p>
                </div>
              </div>
              <div className={styles.accordion__item} id="question6">
                <a className={styles.accordion__link} href="#question6">
                  Do you store my credit card information?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    We don't require and store the credit card information of our users. When you're buying Matic through your
                    in-game wallet your credit card information goes directly to the payment provider that you choose in the
                    payment modal (e.g. Wyre, Moonpay, etc.).
                  </p>
                </div>
              </div>
              <div className={styles.accordion__item} id="question7">
                <a className={styles.accordion__link} href="#question7">
                  What should I do if I win?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    If you win the main prize, we recommend withdrawing it to your personal wallet, leaving only a small amount
                    for your future games.
                  </p>
                  <p className={styles.accordion__paragraph}>
                    You can withdraw your prize by clicking the "Withdraw" button and following the instructions.
                  </p>
                  <p className={styles.accordion__paragraph}>
                    If you get the performance and/or dividend reward, you need to claim them first, by clicking the "Claim"
                    button to the right of the respective field. Then you will be able to withdraw them.
                  </p>
                </div>
              </div>
              <div className={styles.accordion__item} id="question8">
                <a className={styles.accordion__link} href="#question8">
                  How can I buy CHSS tokens?
                  <div className={styles.icon}></div>
                </a>
                <div className={styles.accordion__answer}>
                  <p className={styles.accordion__paragraph}>
                    You can buy CHSS tokens by clicking the "Invest" button in the top left corner of your in-game wallet page.
                  </p>
                  <p className={styles.accordion__paragraph}>
                    You need to have Matic in your in-game wallet to make the purchase. Make sure to read the disclaimer in the{" "}
                    <Link href="/documentation">
                      <u>documentation</u>
                    </Link>{" "}
                    before making your buying decision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
