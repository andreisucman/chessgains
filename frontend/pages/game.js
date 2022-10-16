import Head from "next/head";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import {
  NEW_GAME_BOARD_CONFIG,
  ROWS,
  COLUMNS,
  COLORS,
  SETTINGS,
  PERSIST_STATE_NAMESPACE,
  COMPUTER_DESCRIPTIONS,
  MOVE_SOUND,
} from "../components/gamepage/Board";
import styles from "../styles/game.module.scss";
import ls from "localstorage-slim";
import Field from "../components/gamepage/Field";
import PersistState from "../components/gamepage/PersistState";
import RightColumn from "../components/gamepage/RightColumn";
import WinScreenStepOneEthers from "../components/gamepage/winscreen/StepOne";
import WinScreenStepTwo from "../components/gamepage/winscreen/StepTwo";
import LoseScreen from "../components/gamepage/LoseScreen";
import SelectAi from "../components/gamepage/SelectAi";
import Cheater from "../components/gamepage/Cheater";
import { useGetCurrentState } from "../components/ContextProvider";
import { useGetPrizeTimer } from "../components/ContextProvider";
import { encrypt } from "../helpers/encryption";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";

const API_URIS = {
  MOVES: "moves",
  STATUS: "status",
  MOVE: "move",
  AI_MOVE: "aimove",
  CALCULATE: "calculate",
};

const moveSound = typeof Audio !== "undefined" ? new Audio(`data:audio/wav;base64,${MOVE_SOUND}`) : undefined;

export default function Game() {
  encrypt();

  const { Moralis, isInitialized, isAuthenticated, isAuthUndefined } = useMoralis();
  const currentState = useGetCurrentState();
  const prizeTimer = useGetPrizeTimer();
  const savedSettings = ls.get(`${PERSIST_STATE_NAMESPACE}_settings`, { decrypt: true });
  const savedChess = ls.get(`${PERSIST_STATE_NAMESPACE}_chess`, { decrypt: true });
  const [showFinalScreen, setShowFinalScreen] = useState(null);
  const [showSelectAi, setShowSelectAi] = useState(false);
  const [score, setScore] = useState(null);
  const [refreshValue, setRefreshValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isAuthUndefined) {
      router.push("/");
    }
  }, [isAuthenticated, isAuthUndefined]);

  const [chess, setChess] = useState(
    savedChess && typeof savedChess === "object"
      ? Object.assign({}, NEW_GAME_BOARD_CONFIG, savedChess)
      : { ...NEW_GAME_BOARD_CONFIG }
  );

  const [settings, setSettings] = useState(
    savedSettings && typeof savedSettings === "object" ? Object.assign({}, SETTINGS, savedSettings) : { ...SETTINGS }
  );

  const [loading, setLoading] = useState(false);
  const board = getBoard();

  useEffect(() => {
    if (!chess.isStarted) {
      setShowSelectAi(true);
    }
  }, [chess.isStarted]);

  useEffect(() => {
    if (!isInitialized) return;

    const handleScore = async () => {
      if (chess.isFinished) {
        if (chess.playerWon) {
          await calculateFinalScore(chess.sessionId);

          setTimeout(async () => {
            const serverScore = await Moralis.Cloud.run("fetchScore", {
              sessionId: chess.sessionId,
            });
            setScore(await serverScore);
            if (serverScore) {
              if (chess.gamesPlayed >= 0.75) {
                setShowFinalScreen(3);
              } else {
                setShowFinalScreen(1);
              }
            }
          }, 1000);
        } else {
          setShowFinalScreen(0);
        }
      } else if (!getMoves() && chess.turn === "white") {
        ls.set(
          `${PERSIST_STATE_NAMESPACE}_chess`,
          Object.assign({}, chess, { isFinished: true, playerWon: false, prevConfig: chess }, { encrypt: true })
        );
      }
    };
    handleScore();
  }, [chess.isFinished, refreshValue, score, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    getMoves();
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    if (chess.turn === COLORS.BLACK && !chess.isFinished) {
      aiMove();
    }
  }, [chess.turn, isInitialized]);

  return (
    <>
      <Head>
        <title>Chessgains - Skill-based lottery for chess lovers</title>
        <meta name="description" content="Chessgains - skill-based lottery for chess lovers - game page" />
      </Head>
      <div className={styles.gamepage}>
        <div className={styles.interface}>
          <div className={`${styles.interface__wrapper} ${loading ? `${styles.loading}` : ""}`}>
            <div className={styles.board__wrapper}>
              {!showSelectAi && showFinalScreen !== 0 ? (
                <div className={styles.ai_status}>
                  <span>{COMPUTER_DESCRIPTIONS[settings.computerLevel].name}</span>
                  {chess.turn === COLORS.BLACK && !showFinalScreen ? (
                    <ReactLoading type="spin" color="#F4F0E6" width={20} height={20} />
                  ) : (
                    <div className={styles.ai_status__checkmark}></div>
                  )}
                </div>
              ) : null}
              <div className={styles.board} disabled={chess.isFinished || loading}>
                {board}
              </div>
            </div>
            <div className={styles.card}>
              <RightColumn
                prizeValueUsd={currentState.prizeValueUsd}
                prizeValueMatic={currentState.prizeValueMatic}
                chess={chess}
                settings={settings}
                loading={loading}
                onNewGameClick={() => handleNewGameClick()}
                onComputerLevelClick={handleChangeComputerLevelClick}
                onConfirmationToggleClick={() => handleChangeConfirmationToggleClick()}
                onSoundToggleClick={() => handleChangeSoundToggleClick()}
                onConfirmationClick={() => handleChangeConfirmationClick()}
              />
              <PersistState settings={settings} chess={chess} />
            </div>
          </div>
          {showFinalScreen === 1 && (
            <WinScreenStepOneEthers
              setShowFinalScreen={setShowFinalScreen}
              userAddress={currentState.userAddress}
              score={score}
              chess={chess}
              setChess={setChess}
              PERSIST_STATE_NAMESPACE={PERSIST_STATE_NAMESPACE}
              maticBalance={currentState.maticBalance}
              maticRatio={currentState.maticRatio}
              engineAbi={currentState.engineAbi}
            />
          )}
          {showFinalScreen === 2 && (
            <WinScreenStepTwo
              prizeValueUsd={currentState.prizeValueUsd}
              prizeValueMatic={currentState.prizeValueMatic}
              payoutTime={currentState.payoutTime}
              setShowFinalScreen={setShowFinalScreen}
              retryGame={handleNewGameClick}
              timer={prizeTimer}
            />
          )}
          {showFinalScreen === 0 && (
            <LoseScreen
              prizeValueUsd={currentState.prizeValueUsd}
              prizeValueMatic={currentState.prizeValueMatic}
              payoutTime={currentState.payoutTime}
              setShowFinalScreen={setShowFinalScreen}
              retryGame={handleNewGameClick}
              chess={chess}
              setChess={setChess}
              timer={prizeTimer}
              showSelectAi={showSelectAi}
              settings={settings}
            />
          )}
          {showFinalScreen === 3 && (
            <Cheater
              prizeValueUsd={currentState.prizeValueUsd}
              prizeValueMatic={currentState.prizeValueMatic}
              payoutTime={currentState.payoutTime}
              setShowFinalScreen={setShowFinalScreen}
              retryGame={handleNewGameClick}
              chess={chess}
              setChess={setChess}
              timer={prizeTimer}
              showSelectAi={showSelectAi}
              settings={settings}
            />
          )}
          {showSelectAi && (
            <SelectAi
              selectThisAi={handleChangeComputerLevelClick}
              setShowSelectAi={setShowSelectAi}
              triggerGameSave={triggerGameSave}
              chess={chess}
              setChess={setChess}
            />
          )}
        </div>
      </div>
    </>
  );

  async function triggerGameSave(aiId) {
    if (!chess.sessionId) {
      const sessionId = generateRandomId();
      await Moralis.Cloud.run("saveNewGame", {
        sessionId,
        userAddress: currentState.userAddress,
        aiLevel: aiId,
      });
      setChess(Object.assign({}, chess, { sessionId }));
      ls.set(`${PERSIST_STATE_NAMESPACE}_chess`, Object.assign({}, chess, { sessionId }), { encrypt: true });
    }
  }

  function getBoard() {
    const fields = [];
    Object.assign([], ROWS)
      .reverse()
      .map((row) => {
        return COLUMNS.map((column) => {
          const location = `${column}${row}`;
          return fields.push(
            <Field
              location={location}
              key={`field-${location}`}
              onClick={() => handleFieldClick(location)}
              chess={chess}
              settings={settings}
            />
          );
        });
      });
    return fields;
  }

  async function calculateFinalScore() {
    await sendRequest(`${API_URIS.CALCULATE}?sessionId=${chess.sessionId}`);
  }

  async function handleFieldClick(field) {
    if (chess.turn === COLORS.BLACK) return;

    if (chess.move.from && chess.moves[chess.move.from].includes(field)) {
      chess.move.to = field;
      setChess(Object.assign({}, chess, { prevConfig: chess }));
      if (settings.confirmation) {
      } else {
        return performMove(chess.move.from, chess.move.to);
      }
    } else if (chess.moves[field]) {
      setChess(Object.assign({}, chess, { move: { from: field }, prevConfig: chess }));
    } else {
      setChess(Object.assign({}, chess, { move: { from: null }, prevConfig: chess }));
    }
  }

  async function performMove(from, to) {
    if (chess.isFinished) return;

    chess.history.push({ from, to });
    chess.move.from = from;
    chess.move.to = to;
    chess.isStarted = true;

    setChess(
      Object.assign({}, chess, { move: {} }, await sendRequest(`${API_URIS.MOVE}?from=${from}&to=${to}`), { prevConfig: chess })
    );

    if (settings.sound) {
      moveSound.play();
    }
  }

  async function aiMove() {
    if (chess.isFinished) return;
    const sessionId = await Moralis.Cloud.run("fetchSessionId", { userAddress: currentState.userAddress });

    try {
      const aiMove = await sendRequest(`${API_URIS.AI_MOVE}?sessionId=${sessionId}`);

      const from = Object.keys(await aiMove)[0];
      const to = Object.values(await aiMove)[0];

      if (!from || !to) return;

      return await performMove(from, to);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getMoves() {
    const moves = await sendRequest(API_URIS.MOVES);
    setChess(Object.assign({}, chess, { moves, prevConfig: chess }));
    return moves;
  }

  function generateRandomId() {
    const timeNow = new Date() / 1000;
    const numericId = `${Math.floor(Math.random() * 10 ** 18 + timeNow)}`;
    let alphanumericId = numericId.split("");

    const boundary = Math.floor(Math.random() * numericId.length);

    for (let i = boundary; i > 0; i--) {
      alphanumericId.splice(i, 1, String.fromCharCode(97 + Number(alphanumericId[i])));
    }
    return alphanumericId.join("");
  }

  async function handleNewGameClick() {
    setChess(Object.assign(chess, { pieces: {}, turn: "white", history: [] }, NEW_GAME_BOARD_CONFIG));
    ls.set(
      `${PERSIST_STATE_NAMESPACE}_chess`,
      Object.assign({}, chess, { pieces: {}, turn: "white", history: [] }, NEW_GAME_BOARD_CONFIG),
      {
        encrypt: true,
      }
    );
    await getMoves();
  }

  async function sendRequest(url) {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}${url}`, {
        method: "POST",
        body: JSON.stringify(chess),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status !== 200) {
        throw new Error(`Server returns ${res.status}`);
      }
      setLoading(false);
      return res.json().then((res) => {
        return res;
      });
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  }

  async function handleChangeComputerLevelClick(level) {
    setSettings(Object.assign({}, settings, { computerLevel: level }));
  }

  async function handleChangeConfirmationToggleClick() {
    setSettings(
      Object.assign({}, settings, {
        confirmation: settings.confirmation ? false : true,
      })
    );
  }

  async function handleChangeSoundToggleClick() {
    setSettings(Object.assign({}, settings, { sound: settings.sound ? false : true }));
  }

  async function handleChangeConfirmationClick() {
    return performMove(chess.move.from, chess.move.to);
  }
}
