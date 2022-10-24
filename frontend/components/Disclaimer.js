import styles from "../styles/documentation.module.scss";

export default function Disclaimer({ disclaimerRef }) {
  return (
    <div className={styles.documentation_page__disclaimer}>
      <h2 className={styles.documentation_page__section_title} ref={disclaimerRef}>
        Disclaimer
      </h2>
      <h3 className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_center}`}>
        Please read this before buying CHSS tokens.
      </h3>
      <p
        className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full} ${styles.documentation_page__section_paragraph_disclaimer}`}
      >
        The purpose of this page is to describe how Chessgains and its token operate, how to enter the Chessgains tournament and what
        benefits it provides to its users.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        Information provided here is NOT a commitment on our part to any stakeholder or potential investor of any current or
        future value or functionality of the Chessgains tournament or its token. Neither is it a solicitation for buying CHSS tokens.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        Buying CHSS tokens bears significant risk and you should never buy them with the money you can't afford to lose. The value
        of the token may decline to zero and the project may not meet your expectations.{" "}
        <b>In these cases you will not be refunded or exchanged</b>.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        We don't guarantee you any value from buying CHSS tokens or participating in the Chessgains tournament. You should assume the
        risk of loss from the time of getting involved and by getting involved you accept that the current value you get from the
        tournament and token may be the highest value you can ever obtain from them.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        You agree that buying CHSS tokens doesn't grant you any right to any compensation, and you will not assert any claim,
        action, judgment, or remedy against Chessgains founders, employees, directors, and sponsors if the token loses value, the
        application stops functioning or doesn't meet your expectations.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        Therefore if you're concerned about losing your money by purchasing CHSS tokens or of the value you are getting from the
        tournament in light of this disclaimer we strongly recommend you NOT to get involved in the Chessgains tournament and NOT to buy
        any CHSS tokens.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        By purchasing CHSS tokens you agree that they do not represent shares or securities and do not grant you any kind of
        ownership or right for monetary compensation.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        The sole purpose of the CHSS tokens is to give you the ability to financially contribute to the project.
      </p>
      <p className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer}`}>
        Before purchasing any CHSS tokens we strongly recommend you take independent legal advice concerning the legality of this
        purchase in your country of residence. We also advise getting financial, tax, and other professional guidance before
        making your buying decision.
      </p>
      <p
        className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_disclaimer} ${styles.documentation_page__section_paragraph_center}`}
      >
        (Information presented on this page may change)
      </p>
    </div>
  );
}
