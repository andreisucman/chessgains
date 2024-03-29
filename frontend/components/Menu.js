import styles from "../styles/Menu.module.scss";
import Link from "next/link";

export default function Menu({ openMenu, toggleMenu, menuRef }) {
  return (
    <section
      ref={menuRef}
      className={openMenu ? `${styles.dropdownmenu} ${styles.dropdownmenu_hidden}` : `${styles.dropdownmenu}`}
    >
      <div className={`${styles.dropdownmenu__wrapper}`}>
        <ul className={`${styles.dropdownmenu__list}`}>
          <li className={`${styles.dropdownmenu__item}`}>
            <Link href="/wallet">
              <div className={`${styles.dropdownmenu__link}`} onClick={() => toggleMenu(false)}>
                <div className={`${styles.dropdownmenu__wallet_ico}`}></div>
                Wallet
              </div>
            </Link>
          </li>
          <li className={`${styles.dropdownmenu__item}`}>
            <Link href="/documentation">
              <div className={`${styles.dropdownmenu__link}`} onClick={() => toggleMenu(false)}>
                <div className={`${styles.dropdownmenu__docs_ico}`}></div>Docs
              </div>
            </Link>
          </li>
          <li className={`${styles.dropdownmenu__item}`}>
            <Link href="/faq/#question1">
              <div className={`${styles.dropdownmenu__link}`} onClick={() => toggleMenu(false)}>
                <div className={`${styles.dropdownmenu__faq_ico}`}></div>F.A.Q
              </div>
            </Link>
          </li>
          <li className={`${styles.dropdownmenu__item}`}>
            <Link href="/contact">
              <div className={`${styles.dropdownmenu__link}`} onClick={() => toggleMenu(false)}>
                <div className={`${styles.dropdownmenu__contact_ico}`}></div>
                Contact
              </div>
            </Link>
          </li>
          <li className={`${styles.dropdownmenu__item}`}>
            <a
              className={`${styles.dropdownmenu__link}`}
              onClick={() => toggleMenu(false)}
              href="https://uk.trustpilot.com/review/chessgains.com"
              target="_blank"
              rel="noopener"
            >
              <div className={`${styles.dropdownmenu__trustpilot_ico}`}></div>
              Trustpilot
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
