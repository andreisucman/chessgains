import { useState, useEffect, useRef } from "react";
import styles from "../styles/Header.module.scss";
import logo from "../public/assets/logo.webp";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";

export default function Header() {
  let menuRef = useRef();
  let burgerRef = useRef();

  const [openMenu, setOpenMenu] = useState(false);

  function toggleMenu(boolean) {
    setOpenMenu(boolean);
  }

  const checkIfTrue = openMenu ? 1 : 0;

  // close menu on burger click
  function handleClick() {
    if (openMenu) {
      toggleMenu(false);
    } else {
      toggleMenu(true);
    }
  }

  // close menu on click outside
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target) && !burgerRef.current.contains(e.target)) {
        toggleMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => document.removeEventListener("mousedown", checkIfClickedOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //close menu on scroll

  useEffect(() => {
    document.addEventListener("scroll", () => toggleMenu(false));

    return () => document.removeEventListener("scroll", () => toggleMenu(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Image className={styles.logo} alt="chessgains logo" src={logo} width={96} height={52} />
            </a>
          </Link>
        </div>
        <div
          ref={burgerRef}
          className={checkIfTrue ? `${styles.burger} ${styles.burger_open}` : `${styles.burger}`}
          onClick={handleClick}
        ></div>
      </div>
      <Menu openMenu={openMenu} toggleMenu={toggleMenu} menuRef={menuRef} />
    </header>
  );
}
