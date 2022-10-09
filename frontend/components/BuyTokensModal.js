import React, { useState } from "react";
import ReactLoading from "react-loading";
import Link from "next/link";
import { useWeb3ExecuteFunction } from "react-moralis";
import styles from "../styles/BuyTokensModal.module.scss";

export default function BuyTokensModal({
  tokensForSale,
  maticRatio,
  maticBalance,
  tokenAbi,
  userAddress,
  setShowInvesting,
  setWRefresh,
}) {
  const [buyAmount, setBuyAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConsent, setIsConsent] = useState(false);
  const [isBuyModalOpen, setisBuyModalOpen] = useState(false);
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();

  // #region execute buy tokens
  async function handleBuy() {
    setIsLoading(true);

    if (Number(buyAmount) < 10) {
      setBuyAmount(10);
      setIsLoading(false);
      return;
    }

    if (Number(buyAmount) > Number(tokensForSale)) {
      setBuyAmount(tokensForSale);
      setIsLoading(false);
      return;
    }

    const cost = Number((10 ** 8 / maticRatio) * Number(buyAmount) * 0.11);

    if (Number(cost) > Number(maticBalance)) {
      setIsLoading(false);
      setIsInsufficientBalance(true);
      return;
    }

    const options = {
      contractAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
      functionName: "buyTokens",
      abi: tokenAbi.abi,
      params: {
        buyer: userAddress,
      },
      msgValue: cost * 10 ** 18,
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (tx) => {
        async function onSuccesDo() {
          await tx.wait(3);
          setWRefresh((prevValue) => prevValue + 1);

          setTimeout(() => {
            setShowInvesting(false);
            setIsLoading(false);
          }, 3000);
        }

        onSuccesDo();
      },
      onError: (error) => {
        setIsLoading(false);
        throw new Error(error);
      },
    });
  }

  function handleBuyInput(e) {
    setBuyAmount(e.target.value);
  }
  // #endregion

  return (
    <div className={styles.buy_tokens}>
      <div className={styles.buy_tokens__wrapper}>
        {!isConsent && (
          <div className={styles.buy_tokens__disclaimer}>
            <h3 className={styles.buy_tokens__disclaimer_title}>Disclaimer</h3>
            <div className={styles.buy_tokens__disclaimer_body}>
              The following information is not financial advice or solicitation to buy. We don&apos;t guarantee you any value from
              buying CHSS tokens. By making a purchase you accept that the token&apos;s current value may be the highest value you
              can ever obtain from them.
              <p className={styles.buy_tokens__disclaimer_last_line}>
                Click the button below if you acknowledge that.
              </p>
            </div>
            <button className={styles.buy_tokens__disclaimer_btn} onClick={() => setIsConsent(true)} id="i_acknowledge_btn">
              I acknowledge that
            </button>
          </div>
        )}
        {isConsent && (
          <div className={styles.buy_tokens__content}>
            {!isBuyModalOpen && (
              <>
                <h3 className={styles.buy_tokens__content_title}>Buy CHSS tokens</h3>
                <div className={styles.buy_tokens__explanation}>
                  CHSS tokens grant a share from each lottery draw represented by the following formula:
                  <p className={styles.buy_tokens__formula}>Token reward = 1 / 10^6 * prize * 0.22</p>
                </div>
              </>
            )}
            {!isBuyModalOpen && (
              <div className={styles.buy_tokens__content_wrapper}>
                <div className={styles.buy_tokens__content_img}></div>
                <div className={styles.buy_tokens__content_data}>
                  <p className={styles.buy_tokens__content_left}>On sale: {tokensForSale} CHSS</p>
                  <p className={styles.buy_tokens__content_price}>Price: $ 0.1 / CHSS</p>
                  <p className={styles.buy_tokens__content_moq}>Min QTY: 10 CHSS</p>
                  <button className={styles.buy_tokens__content_btn} onClick={() => setisBuyModalOpen(true)} id="buy_tokens_btn_pre">
                    Buy tokens
                  </button>
                </div>
              </div>
            )}

            {!isBuyModalOpen && (
              <Link href="/documentation" target="_blank">
                <a className={styles.buy_tokens__more_info} id="more_info_in_doc_wallet">More info in the documentation</a>
              </Link>
            )}

            {isBuyModalOpen && (
              <div className={styles.buy_tokens_modal}>
                <div className={styles.buy_tokens_modal__wrapper}>
                  {!isLoading ? (
                    <h3 className={styles.buy_tokens_modal__title}>Buy tokens</h3>
                  ) : (
                    <h3 className={styles.buy_tokens_modal__title}>Processing...</h3>
                  )}
                  {isLoading ? (
                    <div className={styles.buy_tokens_modal__loading}>
                      <ReactLoading type="spin" color="#F4F0E6" width={75} height={75} />
                    </div>
                  ) : (
                    <>
                      {!isInsufficientBalance && (
                        <>
                          <p className={styles.buy_tokens_modal__balance}>
                            Cost: {((1 / (maticRatio / 10 ** 8)) * buyAmount * 0.1).toFixed(2)} MATIC (~$
                            {(((1 / (maticRatio / 10 ** 8)) * buyAmount * 0.1 * maticRatio) / 10 ** 8).toFixed(2)})
                          </p>
                          <input
                            className={styles.buy_tokens_modal__input}
                            placeholder="CHSS tokens"
                            type="number"
                            step={10}
                            min={10}
                            max={tokensForSale}
                            value={buyAmount}
                            disabled={isLoading}
                            onChange={(e) => handleBuyInput(e)}
                          />
                          <button className={styles.buy_tokens_modal__btn} onClick={handleBuy} disabled={isLoading} id="buy_tokens_post_btn">
                            Buy
                          </button>
                          <div className={styles.buy_tokens_modal__cross} onClick={() => setisBuyModalOpen(false)}></div>
                        </>
                      )}
                      {isInsufficientBalance && (
                        <div className={styles.insufficient_balance}>
                          <div className={styles.insufficient_balance__wrapper}>
                            <div className={styles.insufficient_balance__ico}></div>
                            <h3 className={styles.insufficient_balance__title}>Insufficient balance</h3>
                            <p className={styles.insufficient_balance__desc}>Add some MATIC to your wallet and try again</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
