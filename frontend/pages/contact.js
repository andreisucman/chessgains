import Head from "next/head";
import { useRef } from "react";
import styles from "../styles/contact.module.scss";
import Footer from "../components/Footer";

export default function Contact() {
  const submissionMessageRef = useRef(null);

  function handleSubmissionMessage() {
    submissionMessageRef.current.innerHTML = "Message sent";

    setTimeout(() => {
      submissionMessageRef.current.innerHTML = "";
    }, 3500);
  }

  return (
    <>
      <Head>
        <title>Chessgains - Contact</title>
        <meta name="contact" content="Chessgains skill-based competition for chess lovers - contact us page" />
      </Head>
      <div className={styles.contact_page}>
        <h1 className={styles.contact_page__title}>Contact</h1>
        <div className={styles.contact}>
          <form
            name="contact"
            method="POST"
            action="https://formsubmit.co/188540431f39e69cdf5444a12e335bcd"
            className={styles.contact__form}
            onSubmit={handleSubmissionMessage}
          >
            <input className={styles.contact__input} type="text" name="name" placeholder="Your name" required />
            <input className={styles.contact__input} type="email" name="email" placeholder="Your email" required />
            <textarea
              className={styles.contact__message}
              type="text"
              name="message"
              placeholder="Your message"
              required
            ></textarea>
            <div className={styles.contact__submit_wrapper}>
              <span className={styles.contact__submission_message} ref={submissionMessageRef}></span>
              <button className={styles.contact__submit} type="submit">
                <div className={styles.contact__submit_ico}></div>
                Send
              </button>
            </div>
            <input type="hidden" name="_next" value="https://chessgains.com/contact"></input>
            <input type="hidden" name="_captcha" value="false" />
          </form>
          <div className={styles.contact__info}>
            <ul className={styles.contact__info_list}>
              <li className={styles.contact__info_item_faster}>
                For faster replies ask your questions in our{" "}
                <a className={styles.contact__info_link} href="https://telegram.me/+2ZBq14Vm3FA2OGIx" target="_blank" rel="noreferrer">
                  Telegram group
                </a>
              </li>
              <li className={styles.contact__info_item}>info@chessgains.com</li>
              <li className={styles.contact__info_item}>+44 20 4577 2359</li>
              <li className={styles.contact__info_item_p_top_24}>SunChain LTD</li>
              <li className={styles.contact__info_item}>128 City Road, London EC1V 2NX</li>
              <li className={styles.contact__info_item}>Reg #: 14378160</li>
            </ul>
          </div>
        </div>
      <Footer />
      </div>
    </>
  );
}
