import { useEffect, useState } from "react";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import ReactLoading from "react-loading";
import styles from "../styles/wallet.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import WithdrawModal from "../components/WithdrawModal";
import BuyTokensModal from "../components/BuyTokensModal";
import { useGetCurrentState } from "../components/ContextProvider";
import { useGetMethods } from "../components/ContextProvider";
import { formatNumber } from "../helpers/formatNumber";
import { handleCopyTokenAddress } from "../helpers/handleCopyTokenAddress";
import GasDisclaimer from "../components/GasDisclaimer";

const OnramperWidgetContainer = dynamic(() => import("../components/OnramperWidgetContainer"), {
  ssr: false,
});

export default function Wallet() {
  const { isAuthenticated, isAuthUndefined, isWeb3EnableLoading, Moralis, isWeb3Enabled } = useMoralis();
  const currentState = useGetCurrentState();
  const methods = useGetMethods();
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [claimRewardLoading, setClaimRewardLoading] = useState(false);
  const [claimDividendsLoading, setClaimDividendsLoading] = useState(false);
  const [showOnramper, setShowOnramper] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showInvesting, setShowInvesting] = useState(false);
  const [dividendsLowToClaim, setDividendsLowToClaim] = useState(false);
  const [rewardLowToClaim, setRewardLowToClaim] = useState(false);
  const [copyTokenText, setCopyTokenText] = useState("Copy");
  const [withdrawDisabled, setWithdrawDisabled] = useState(false);
  const [rewardAlreadyClaimed, setRewardAlreadyClaimed] = useState(false);
  const [dividendsAlreadyClaimed, setDividendsAlreadyClaimed] = useState(false);
  const [receivedClaimRequestReward, setReceivedClaimRequestReward] = useState(false);
  const [receivedClaimRequestDividends, setReceivedClaimRequestDividends] = useState(false);

  // useEffect(() => {
  //   if (!currentState.userAddress) return;

  //   disableTestWithdraw();
  // }, [currentState.userAddress]);

  function handleCopyButtonClick(text) {
    setCopyButtonText(text);
    navigator.clipboard.writeText(currentState.userAddress);

    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 1500);
  }

  // function disableTestWithdraw() {
  //   const testAccounts = [
  //     "0x0fb7dc6cb2a6a057632fc7a5ef49b1dbb88538ff",
  //     "0x2a68d95659845821522a01fea665fd64d2d33003",
  //     "0x775b50152df74f5c58a3e86a8ea57a8a612e68b0",
  //     "0x9b4dd6b24d5202778dbe1f111d508077f19aac61",
  //     "0xfd0e1880a35efd1225e290659b5b9242603d60b8",
  //     "0x1320fe5553ce5b65fa69996b08202f9058478fa7",
  //     "0x94c28f66784577e69f32a650f78f73d49a730f99",
  //     "0x7df45c8bf2fb75594ee07fd356ac62615cb1aebb",
  //     "0x012301b01b787928ed94dc2d81589cdf3a90ba81",
  //     "0x15c41ec423234afc629ff9a872619ead0781c94b",
  //     "0x3b8b727c4724909a1f6425fbd07275eecb1923a0",
  //     "0xb8ff425d46c3d9c2c50370105e72eafc32051c73",
  //     "0x9e1965121c22db049856bfbea52ed58caea53cfc",
  //     "0x2df7c85dca427f1dcabbfcef6af0d5cba6f95d13",
  //     "0xa72b187005163700ca9f17d28573ddffde449112",
  //     "0x2deb3688bf988eb33ffcb0f647a5a725278567ad",
  //     "0x9038e05185bafecf471ec9d6258451ffa6e15d32",
  //     "0x7a5dc506f8642735be120b7f8a240a606286c56e",
  //   ];

  //   for (let i = 0; i < testAccounts.length; i++) {
  //     if (currentState.userAddress === testAccounts[i]) {
  //       setWithdrawDisabled(true);
  //     }
  //   }
  // }

  async function handleClaimDividends({ receiver, endpoint }) {
    // check if the payout has already been initiated
    const dividendsQuery = new Moralis.Query("Dividends");
    dividendsQuery.equalTo("address", currentState.userAddress);
    const dividendsQueryResult = await dividendsQuery.first();

    if (dividendsQueryResult && dividendsQueryResult.attributes.pendingTx) {
      setDividendsAlreadyClaimed(true);
      setClaimDividendsLoading(false);

      setTimeout(() => {
        setDividendsAlreadyClaimed(false);
      }, 4000);

      return;
    }

    if (endpoint === "dividends" && currentState.dividends < 0.001) {
      setDividendsLowToClaim(true);

      setInterval(() => {
        setDividendsLowToClaim(false);
      }, 4000);
      return;
    }
    setClaimDividendsLoading(true);

    const response = await methods.allocateReward({ receiver, endpoint });

    if ((await response.status) === 200 || (await response.status) === 204) {
      setTimeout(() => {
        setClaimDividendsLoading(false);

        methods.setDividends(0);

        setReceivedClaimRequestDividends(true);

        setTimeout(() => {
          setReceivedClaimRequestDividends(false);
        }, 5000);
      }, 1000);
    }
  }

  async function handleClaimReward({ receiver, endpoint }) {
    // check if the payout has already been initiated
    const rewardsQuery = new Moralis.Query("Rewards");
    rewardsQuery.equalTo("address", currentState.userAddress);
    const rewardsQueryResult = await rewardsQuery.first();

    if (rewardsQueryResult && rewardsQueryResult.attributes.pendingTx) {
      setRewardAlreadyClaimed(true);
      setClaimRewardLoading(false);

      setTimeout(() => {
        setRewardAlreadyClaimed(false);
      }, 4000);
      return;
    }

    if (endpoint === "reward" && currentState.performanceReward < 0.001) {
      setRewardLowToClaim(true);

      setInterval(() => {
        setRewardLowToClaim(false);
      }, 4000);
      return;
    }
    setClaimRewardLoading(true);

    const response = await methods.allocateReward({ receiver, endpoint });

    if ((await response.status) === 200 || (await response.status) === 204) {
      setTimeout(() => {
        setClaimRewardLoading(false);

        methods.setPerformanceReward(0);

        setReceivedClaimRequestReward(true);

        setTimeout(() => {
          setReceivedClaimRequestReward(false);
        }, 5000);
      }, 1000);
    } else {
      console.log("an error happened while processing reward payment", response);
    }
  }

  return (
    <>
      <Head>
        <title>Chessgains - Wallet</title>
        <meta name="wallet" content="Chessgains - Skill-based tournament for chess lovers - wallet page" />
      </Head>
      {isAuthenticated && (
        <div className={styles.wallet_page}>
          <div className={styles.wallet_page__wrapper}>
            <h3 className={styles.wallet_page__title}>
              <div className={styles.wallet_page__title_ico} onClick={() => setShowInvesting(false)}></div>
              <span onClick={() => setShowInvesting(false)}>Wallet</span>
              <button className={styles.wallet_page__disconnect_btn} onClick={methods.handleLogout} id="disconnect_btn"></button>
              {showInvesting ? (
                <button className={styles.wallet_page__switch} onClick={() => setShowInvesting(false)}>
                  Back
                </button>
              ) : (
                <button className={styles.wallet_page__switch} onClick={() => setShowInvesting(true)} id="invest_btn">
                  Invest
                </button>
              )}
            </h3>
            {showInvesting ? (
              <BuyTokensModal
                userAddress={currentState.userAddress}
                setShowInvesting={setShowInvesting}
                maticBalance={currentState.maticBalance}
                tokensForSale={currentState.tokensForSale}
                maticRatio={currentState.maticRatio}
                tokenAbi={currentState.tokenAbi}
                setWRefresh={methods.setWRefresh}
              />
            ) : (
              <div className={styles.wallet_page__content}>
                <div className={styles.wallet_page__row}>
                  <p className={styles.wallet_page__address}>
                    Address:
                    <span>{currentState.userAddress}</span>
                  </p>
                  <button
                    className={styles.wallet_page__btn}
                    onClick={() => handleCopyButtonClick("Copied")}
                    id="copy_address_btn"
                  >
                    {copyButtonText}
                  </button>
                </div>
                <div className={styles.wallet_page__row}>
                  <p className={styles.wallet_page__matic_balance}>
                    Balance: {currentState.maticBalance} MATIC (~$
                    {((currentState.maticBalance * currentState.maticRatio) / 10 ** 8).toFixed(2)})
                  </p>
                </div>
                <div className={styles.wallet_page__row}>
                  <p className={styles.wallet_page__performance_reward}>
                    Reward: {formatNumber(currentState.performanceReward)} MATIC
                    {receivedClaimRequestReward && (
                      <span className={styles.wallet_page__received_claim_request}>
                        Claim request received. Your balance will update within several minutes.
                      </span>
                    )}
                    {rewardLowToClaim && (
                      <span className={styles.wallet_page__too_low_to_claim}>Must be at least 0.001 to claim</span>
                    )}
                    {rewardAlreadyClaimed && (
                      <span className={styles.wallet_page__claim_already_processing}>
                        Your claim is already processing and your balance will update automatically.
                      </span>
                    )}
                  </p>
                  <button
                    id="claim_reward_btn"
                    className={
                      claimRewardLoading
                        ? `${styles.disabled} ${styles.wallet_page__btn} ${styles.wallet_page__btn_claim}`
                        : `${styles.wallet_page__btn} ${styles.wallet_page__btn_claim}`
                    }
                    onClick={() =>
                      handleClaimReward({
                        receiver: currentState.userAddress,
                        endpoint: "reward",
                      })
                    }
                    disabled={claimRewardLoading || !isWeb3Enabled}
                  >
                    {claimRewardLoading ? <ReactLoading type="spin" color="#F4F0E6" width={26} height={26} /> : "Claim"}
                  </button>
                </div>
                <div className={styles.wallet_page__row}>
                  <p className={styles.wallet_page__token_balance}>
                    <span>Token balance: {currentState.tokenBalance} CHSS</span>
                  </p>
                  <button
                    id="copy_token_address_btn"
                    className={`${styles.wallet_page__btn} ${styles.wallet_page__btn_claim}`}
                    onClick={handleCopyTokenAddress}
                  >
                    {copyTokenText}
                  </button>
                </div>
                <div className={styles.wallet_page__row}>
                  <p className={styles.wallet_page__eligible_to_withdraw}>
                    Dividends:
                    <span>{formatNumber(currentState.dividends)} MATIC</span>{" "}
                    {receivedClaimRequestDividends && (
                      <span className={styles.wallet_page__received_claim_request}>
                        Claim request received. Your balance will update within several minutes.
                      </span>
                    )}
                    {dividendsLowToClaim && (
                      <span className={styles.wallet_page__too_low_to_claim}>Must be at least 0.001 to claim</span>
                    )}
                    {dividendsAlreadyClaimed && (
                      <span className={styles.wallet_page__claim_already_processing}>
                        Your claim is already processing and your balance will update automatically.
                      </span>
                    )}
                  </p>
                  <button
                    id="claim_dividends_btn"
                    className={
                      claimDividendsLoading
                        ? `${styles.disabled} ${styles.wallet_page__btn} ${styles.wallet_page__btn_claim}`
                        : `${styles.wallet_page__btn} ${styles.wallet_page__btn_claim}`
                    }
                    onClick={() =>
                      handleClaimDividends({
                        receiver: currentState.userAddress,
                        endpoint: "dividends",
                      })
                    }
                    disabled={claimDividendsLoading || !isWeb3Enabled}
                  >
                    {claimDividendsLoading ? <ReactLoading type="spin" color="#F4F0E6" width={26} height={26} /> : "Claim"}
                  </button>
                </div>
                <div className={styles.wallet_page__row}>
                  <div className={styles.wallet_page__buttons}>
                    <button
                      disabled={withdrawDisabled}
                      id="withdraw_btn_pre"
                      className={
                        withdrawDisabled
                          ? `${styles.wallet_page__btn} ${styles.wallet_page__buttons_btn} ${styles.disabled}`
                          : `${styles.wallet_page__btn} ${styles.wallet_page__buttons_btn}`
                      }
                      onClick={() => setShowWithdrawModal(true)}
                    >
                      Withdraw
                    </button>
                    <button
                      id="get_matic_btn"
                      className={`${styles.wallet_page__btn} ${styles.wallet_page__buttons_btn}`}
                      onClick={() => setShowOnramper(true)}
                    >
                      Get Matic
                    </button>
                    <Link href="/">
                    {/* <Link href="/game"> */}
                      <a
                        id="play_btn_wallet"
                        className={`${styles.wallet_page__btn} 
                      ${styles.wallet_page__buttons_btn}
                      ${styles.wallet_page__buttons_btn_play}`}
                      >
                        <span className={styles.wallet_page__btn_play_text}>Play</span>
                        <div className={styles.wallet_page__btn_play_img}></div>
                      </a>
                    </Link>
                  </div>
                </div>
                {showWithdrawModal && (
                  <WithdrawModal maticBalance={currentState.maticBalance} setShowWithdrawModal={setShowWithdrawModal} />
                )}
              </div>
            )}
            {withdrawDisabled && (
              <a className={styles.feedback} target="_blank" rel="noreferrer" href="https://forms.gle/ZRbYJ9i8DAsGC3DR9">
                Submit feedback
              </a>
            )}
            {!showWithdrawModal && <GasDisclaimer />}
          </div>
          {showOnramper && <OnramperWidgetContainer setShowOnramper={setShowOnramper} address={currentState.userAddress} />}
        </div>
      )}
      {!isAuthenticated && !isAuthUndefined && (
        <div className={styles.wallet_page__disconnected}>
          <div className={styles.wallet_page__disconnected_wrapper}>
            <h3 className={styles.wallet_page__disconnected_heading}>Login</h3>
            <p className={styles.wallet_page__disconnected_description}>Please log in to see your dashboard</p>
            <button className={styles.wallet_page__disconnected_login_btn} onClick={methods.handleLogin} id="wallet_log_in_btn">
              {isWeb3EnableLoading ? (
                <ReactLoading type="spin" color="#F4F0E6" width={45} height={45} />
              ) : (
                <>
                  <div className={styles.wallet_page__disconnected_login_btn_img}></div>
                  Log In
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
