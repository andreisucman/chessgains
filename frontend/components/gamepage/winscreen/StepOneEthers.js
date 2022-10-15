import { useState } from "react";
import { useMoralis } from "react-moralis";
import ReactLoading from "react-loading";
import ls from "localstorage-slim";
import styles from "../../../styles/StepOne.module.scss";

import InsufficientFunds from "./InsufficientFunds";
import DoughnutChart from "./DoughnutChart";

export default function WinScreenStepOneEthers({
  chess,
  setChess,
  setShowFinalScreen,
  score,
  userAddress,
  PERSIST_STATE_NAMESPACE,
  maticBalance,
  maticRatio,
  engineAbi,
}) {
  const { Moralis } = useMoralis();
  const [enterFee, setEnterFee] = useState( 1 / (maticRatio / 10 ** 8));
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function signWithEthers() {
    setIsLoading(true);
    const normalizedRatio = maticRatio / 10 ** 8;
    const enterFee = Moralis.Units.Token(1 / normalizedRatio, "18");

    if (maticBalance < 1 / normalizedRatio) {
      setIsLoading(false);
      setShowInsufficientBalance(true);
      return;
    }

    // prevent cheaters from getting in
    const gameQuery = new Moralis.Query("Game");
    gameQuery.descending("createdAt");
    gameQuery.equalTo("sessionId", chess.sessionId);
    const gameResult = await gameQuery.first();
    const objectAssign = gameResult.attributes.objectAssign;

    if (objectAssign >= process.env.NEXT_PUBLIC_TRESHOLD) return; // Object assign stands for cheting

    // get gas price
    const getGasPrice = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}gas`);
    const gas = await getGasPrice.json();

    const fastPriceInGwei = Moralis.Units.Token(`${gas}`, "9") || 400000000000;
    const ethers = Moralis.web3Library; // get ethers.js library

    let web3Provider;
    try {
      web3Provider = await Moralis.enableWeb3({
        provider: "web3Auth",
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_ID,
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
        loginMethodsOrder: [
          "google",
          "twitter",
          "facebook",
          "reddit",
          "discord",
          "twitch",
          "github",
          "linkedin",
          "weibo",
          "wechat",
          "email_passwordless",
        ],
        appLogo: "/_next/static/media/logo_black.adaf0e59.webp",
        theme: "light",
      });
    } catch (err) {
      console.log(err);
    }

    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ENGINE_ADDRESS, engineAbi.abi, signer);

    const transaction = await contract.enter({
      value: enterFee,
      gasLimit: 1000000,
      gasPrice: fastPriceInGwei,
    });

    try {
      const tx = await transaction.wait(3);

      // save the participant to DB
      const params = {
        sessionId: chess.sessionId,
        userAddress,
        enterFee,
        maticRatio,
        txLink: tx.transactionHash,
      };

      async function finalizeRound() {
        await Moralis.Cloud.run("saveParticipantToDB", params);
        await Moralis.Cloud.run("updatePrizeTable", { maticRatio });
        setChess(Object.assign(chess, { isFinished: false, turn: "white" }));
        ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, Object.assign({}, chess, { prevConfig: {}, turn: "white" }), { encrypt: true });
        setShowFinalScreen(2);
        setIsLoading(false);
      }

      finalizeRound();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setChess(Object.assign(chess, { isFinished: true }));
    }
  }

  return (
    <div className={styles.step_one}>
      <div className={styles.step_one__content}>
        <div className={styles.step_one__content_wrapper}>
          <div className={styles.step_one__title_div}>
            <h2 className={styles.step_one__title}>You win</h2>
            <h3 className={styles.step_one__score}>Score {score}</h3>
          </div>
          <div className={styles.step_one__chart_div}>
            <h3 className={`${styles.step_one__rank_text} ${styles.step_one__rank_text_left}`}>Higher than</h3>
            <DoughnutChart score={score} />
            <h3 className={styles.step_one__rank_text}>of players</h3>
          </div>
          <button className={styles.step_one__cta} onClick={signWithEthers} id="enter_lottery">
            {!isLoading ? (
              <div className={styles.step_one__cta_div} id="enter_lottery">
                <div className={styles.step_one__cta_img}></div>
                <p className={styles.step_one__cta_text}>Enter the lottery</p>
              </div>
            ) : (
              <ReactLoading type="spin" color="#F4F0E6" width={45} height={45} />
            )}
          </button>
          {showInsufficientBalance && (
            <InsufficientFunds
              setShowInsufficientBalance={setShowInsufficientBalance}
              maticBalance={maticBalance}
              enterFee={enterFee}
              userAddress={userAddress}
            />
          )}
        </div>
        <button onClick={() => setShowFinalScreen(null)} className={styles.step_one__cross} id="enter_lottery_cross"></button>
      </div>
    </div>
  );
}
