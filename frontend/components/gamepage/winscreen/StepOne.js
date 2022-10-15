import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ReactLoading from "react-loading";
import ls from "localstorage-slim";
import styles from "../../../styles/StepOne.module.scss";

import InsufficientFunds from "./InsufficientFunds";
import DoughnutChart from "./DoughnutChart";

export default function WinScreenStepOne({
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
  const [enterFee, setEnterFee] = useState(0);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const [isLoading, setIsLoading] = useState(false);

  async function handleEntry() {
    await enterLottery();
    setChess(Object.assign(chess, { isFinished: false }));
    ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, Object.assign({}, chess, { prevConfig: chess }), { encrypt: true });
  }

  async function enterLottery() {
    setIsLoading(true);
    const normalizedRatio = maticRatio / 10 ** 8;
    const enterFee = Moralis.Units.Token(1 / normalizedRatio, "18");

    // prevent cheaters from getting in
    const gameQuery = new Moralis.Query("Game");
    gameQuery.descending("createdAt");
    gameQuery.equalTo("sessionId", chess.sessionId);
    const gameResult = await gameQuery.first();
    const cheatingRatio = gameResult.attributes.cheatingRatio;

    if (cheatingRatio > 0.6) return;

    // save enter fee to use it in the insufficient funds modal
    setEnterFee(enterFee);

    // enter the lottery
    const options = {
      contractAddress: process.env.NEXT_PUBLIC_ENGINE_ADDRESS,
      functionName: "enter",
      abi: engineAbi.abi,
      msgValue: enterFee,
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (tx) => {
        tx.wait();

        // save the participant to DB
        const params = {
          sessionId: chess.sessionId,
          userAddress,
          enterFee,
          maticRatio,
          txLink: tx.hash,
        };

        async function finalizeRound() {
          await Moralis.Cloud.run("saveParticipantToDB", params);
          await Moralis.Cloud.run("updatePrizeTable", { maticRatio });
          setShowFinalScreen(2);
          setIsLoading(false);
        }
        finalizeRound();
      },
      onError: (error) => {
        if (error.code === -32603) {
          setIsLoading(false);
          setShowInsufficientBalance(true);
        }
        throw new Error(error);
      },
    });
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
          <button className={styles.step_one__cta} onClick={handleEntry} id="enter_lottery">
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
