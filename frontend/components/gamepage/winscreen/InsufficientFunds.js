import React, { useEffect, useState } from "react";
import styles from "../../../styles/InsufficientFunds.module.scss";
import dynamic from "next/dynamic";

const OnramperWidgetContainer = dynamic(() => import("../../OnramperWidgetContainer"), {
  ssr: false,
});

export default function InsufficientFunds({ setShowInsufficientBalance, maticBalance, enterFee, userAddress }) {
  const [copyButtonText, setCopyButtonText] = useState("Copy address");
  const [showOnramper, setShowOnramper] = useState(false);

  function handleCopyButtonClick(text) {
    setCopyButtonText(text);
    navigator.clipboard.writeText(userAddress);

    setTimeout(() => {
      setCopyButtonText("Copy address");
    }, 1500);
  }

  useEffect(() => {
    if (maticBalance > enterFee) {
      setShowInsufficientBalance(false);
    }
  }, [maticBalance]);

  return (
    <div className={styles.insufficient_funds}>
      <div className={styles.insufficient_funds__content}>
        <div className={styles.insufficient_funds__content_wrapper}>
          <div className={styles.insufficient_funds__title_div}>
            <div className={styles.insufficient_funds__icon}></div>
            <h2 className={styles.insufficient_funds__main_title}>Insufficient balance</h2>
          </div>
          <h3 className={styles.insufficient_funds__description}>
            You need at least {(enterFee - maticBalance).toFixed(3)} more MATIC to enter the lottery
          </h3>
          <div className={styles.insufficient_funds__balance}>Your wallet balance: {maticBalance} MATIC</div>
          <div className={styles.insufficient_funds__btns}>
            <button className={styles.insufficient_funds__copy_btn} onClick={() => handleCopyButtonClick("Copied")} id="copy_address_insufficient_funds">
              {copyButtonText}
            </button>
            <button className={styles.insufficient_funds__matic_btn} onClick={() => setShowOnramper(true)} id="buy_matic_insufficient_funds">
              Buy matic
            </button>
          </div>
        </div>
        <button onClick={() => setShowInsufficientBalance(false)} className={styles.insufficient_funds__cross}></button>
      </div>
      {showOnramper && <OnramperWidgetContainer setShowOnramper={setShowOnramper} address={userAddress} />}
    </div>
  );
}
