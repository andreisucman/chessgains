import { useMoralis, useWeb3Transfer } from "react-moralis";
import React, { useState } from "react";
import ReactLoading from "react-loading";
import ls from "localstorage-slim";
import styles from "../styles/WithdrawModal.module.scss";
import GasDisclaimer from "./GasDisclaimer";

export default function WithdrawModal({ maticBalance, setShowWithdrawModal }) {
  const { Moralis } = useMoralis();
  const savedReceiverAddress = ls.get("receiver_address", { decrypt: true });
  const [receiverAddress, setReceiverAddress] = useState(savedReceiverAddress ? savedReceiverAddress : "");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [isAddressWrong, setIsAddressWrong] = useState(false);
  const [isAmountWrong, setIsAmountWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleWithdraw() {
    ls.set("receiver_address", receiverAddress, { encrypt: true });
    if (withdrawAmount > 0 && withdrawAmount <= maticBalance) {
      setIsAmountWrong(false);
      transferMatic();
    } else {
      setIsAmountWrong(true);
    }
  }

  const { fetch } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(withdrawAmount || 0),
    receiver: receiverAddress,
  });

  function transferMatic() {
    setIsLoading(true);
    fetch({
      onSuccess: async (tx) => {
        setIsAddressWrong(false);
        await tx.wait();
        setShowWithdrawModal(false);
        setIsLoading(false);
      },
      onError: (error) => {
        setIsAddressWrong(true);
        throw new Error(error);
      },
    });
  }

  return (
    <div className={styles.withdraw_modal}>
      <div className={styles.withdraw_modal__wrapper}>
        <div className={styles.withdraw_modal__cross} onClick={() => setShowWithdrawModal(false)}></div>
        {isLoading ? (
          <>
            <h3 className={styles.withdraw_modal__title}>Processing...</h3>
            <p className={styles.withdraw_modal__notice}>
              Withdrawal usually takes 10-20 sec, but may extend to 1h when the chain is loaded.
            </p>
          </>
        ) : (
          <>
            <h3 className={styles.withdraw_modal__title}>Withdraw balance</h3>
            <GasDisclaimer />
          </>
        )}
        <div className={styles.withdraw_modal__fields}>
          {isLoading ? (
            <div className={styles.withdraw_modal__loading}>
              <ReactLoading type="spin" color="#F4F0E6" height={75} width={75} />
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="enter destination wallet address"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                className={
                  isAddressWrong
                    ? `${styles.withdraw_modal__input} ${styles.withdraw_modal__address_error}`
                    : `${styles.withdraw_modal__input}`
                }
              />
              <div className={styles.withdraw_modal__withdraw_div}>
                <input
                  type="number"
                  placeholder="enter the withdrawal amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className={
                    isAmountWrong
                      ? `${styles.withdraw_modal__input} ${styles.withdraw_modal__amount_error}`
                      : `${styles.withdraw_modal__input}`
                  }
                  max={maticBalance}
                  min={0.1}
                />
                <button
                  id="max_withdraw_btn"
                  className={styles.withdraw_modal__max_btn}
                  onClick={() => setWithdrawAmount(maticBalance - 0.01 /* subtract 0.01 for gas fee */)}
                >
                  Max
                </button>
              </div>
            </>
          )}
        </div>

        <button
          className={styles.withdraw_modal__withdraw_btn}
          onClick={handleWithdraw}
          disabled={isLoading}
          id="withdraw_btn_post"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
