import Board from "./Board.mjs";
import Moralis from "moralis-v1/node.js";
import * as ChessAnalysisApi from "chess-analysis-api";
import { getFEN } from "./utils.mjs";

const { chessAnalysisApi, PROVIDERS } = ChessAnalysisApi;

export class Game {
  constructor(configuration) {
    this.board = new Board(configuration);
  }

  setAiLevel(level) {
    return this.board.setAiLevel(level);
  }

  move(from, to) {
    from = from.toUpperCase();
    to = to.toUpperCase();
    const possibleMoves = this.board.getMoves();
    if (!possibleMoves[from] || !possibleMoves[from].includes(to)) {
      throw new Error(`Invalid move from ${from} to ${to} for ${this.board.getPlayingColor()}`);
    }
    this.board.addMoveToHistory(from, to);
    this.board.move(from, to);
    return { [from]: to };
  }

  moves(from = null) {
    return (from ? this.board.getMoves()[from.toUpperCase()] : this.board.getMoves()) || [];
  }

  setPiece(location, piece) {
    this.board.setPiece(location, piece);
  }

  removePiece(location) {
    this.board.removePiece(location);
  }

  aiMove(level = 2) {
    const move = this.board.calculateAiMove(level);
    return this.move(move.from, move.to);
  }

  points() {
    const points = this.board.calculatePoints();
    return points;
  }

  getHistory(reversed = false) {
    return reversed ? this.board.history.reverse() : this.board.history;
  }

  exportJson() {
    return this.board.exportJson();
  }

  exportFEN() {
    return getFEN(this.board.configuration);
  }
}

export function moves(config) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  return game.moves();
}

export function status(config) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  return game.exportJson();
}

export async function move(config, from, to) {
  if (!config) {
    throw new Error("Configuration param required.");
  }

  let newConfig;
  if (config.turn === "white") {
    newConfig = await analyze(config, from, to);
  } else {
    newConfig = config;
  }

  const game = new Game(newConfig);
  game.move(from, to);

  if (typeof newConfig === "object") {
    return game.exportJson();
  } else {
    return game.exportFEN();
  }
}

export async function fetchAiLevel(config, sessionId) {
  await Moralis.start({
    serverUrl: "https://rfoqdnxrqo9v.usemoralis.com:2053/server",
    appId: "631L5XogDOAuSaMnc8DQjoDTy8sSm0gHVH9ikeEh",
    masterKey: "3YiQTciXk54wmcBT26JgI3rYCsifTG4WFWDzApuP",
  });

  const level = await Moralis.Cloud.run("fetchAiLevel", { sessionId });

  if (level < 3) {
    return aiMove(config, level);
  } else {
    return getStockFishMove(config, level);
  }
}

export function aiMove(config, level) {
  if (!config) {
    throw new Error("Configuration param required.");
  }

  const game = new Game(config);
  const move = game.board.calculateAiMove(level);

  if (move) {
    return { [move.from]: move.to };
  } else {
    return {};
  }
}

export async function getStockFishMove(config, level) {
  const fen = getFen(config);
  let stockFishLevel = 1;

  switch (Number(level)) {
    case 3:
      stockFishLevel = 1;
      break;
    case 4:
      stockFishLevel = 2;
      break;
    default:
      stockFishLevel = 1;
  }

  const analysis = await chessAnalysisApi.getAnalysis({
    fen,
    depth: stockFishLevel,
    multipv: 1,
    excludes: [PROVIDERS.LICHESS_BOOK, PROVIDERS.LICHESS_CLOUD_EVAL],
  });

  const allMoves = analysis.moves.map((entry) => entry.uci).flat(1);
  const aiMoves = [];

  allMoves.forEach((entry) => {
    if (allMoves.indexOf(entry) % 2 === 0) {
      aiMoves.push(entry);
    }
  });

  const from = aiMoves[0].slice(0, 2);
  const to = aiMoves[0].slice(2, 4);

  if (from && to) {
    return { [from.toUpperCase()]: to.toUpperCase() };
  } else {
    return {};
  }
}

export function getFen(config) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  return game.exportFEN();
}

export async function saveScore(config, sessionId) {
  await Moralis.start({
    serverUrl: "https://rfoqdnxrqo9v.usemoralis.com:2053/server",
    appId: "631L5XogDOAuSaMnc8DQjoDTy8sSm0gHVH9ikeEh",
    masterKey: "3YiQTciXk54wmcBT26JgI3rYCsifTG4WFWDzApuP",
  });

  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);

  const table = Moralis.Object.extend("Game");
  const query = new Moralis.Query(table);
  query.equalTo("sessionId", sessionId);
  const session = await query.first();

  const aiLevel = await session.attributes.aiLevel;
  const score = game.board.calculatePoints(aiLevel);
  game.board.configuration.score = score;
  session.set("playerWon", true);
  session.set("score", score);
  session.set("coincidenceRatio", config.coincidenceRatio);

  await session.save(null, { useMasterKey: true });
  return score;
}

async function analyze(config, from, to) {
  const currentConfig = config;
  let data = currentConfig.prevConfig;

  // if total moves is 0
  if (currentConfig.turnCount === 0) {
    data = currentConfig;
  }

  //#region preparations for time flag checks

  // determine the boundaries
  const thirtyPercentBoundary = Math.floor((currentConfig.moveTimes.length - 1) * 0.3);
  const sixtyPercentBoundary = Math.floor((currentConfig.moveTimes.length - 1) * 0.6);
  const ninetyPercentBoundary = currentConfig.moveTimes.length - 1;

  const thirtyDifferences = [];
  const sixtyDifferences = [];
  const ninetyDifferences = [];

  let thirtyAverage;
  let sixtyAverage;
  let ninetyAverage;

  let thirtyMedian;
  let sixtyMedian;
  let ninetyMedian;

  // calculate the differences in times between the moves
  for (let i = ninetyPercentBoundary; i > sixtyPercentBoundary; i--) {
    const difference = currentConfig.moveTimes[i] - currentConfig.moveTimes[i - 1];
    ninetyDifferences.push(difference);
  }

  for (let i = sixtyPercentBoundary; i > thirtyPercentBoundary; i--) {
    const difference = currentConfig.moveTimes[i] - currentConfig.moveTimes[i - 1];
    sixtyDifferences.push(difference);
  }

  for (let i = thirtyPercentBoundary; i > 0; i--) {
    const difference = currentConfig.moveTimes[i] - currentConfig.moveTimes[i - 1];
    thirtyDifferences.push(difference);
  }

  // sort time differences ascending
  thirtyDifferences.sort((a, b) => a - b);
  sixtyDifferences.sort((a, b) => a - b);
  ninetyDifferences.sort((a, b) => a - b);

  // calculate the average thinking times
  if (thirtyDifferences.length > 0) {
    thirtyAverage = thirtyDifferences.reduce((a, b) => a + b) / thirtyDifferences.length;
  }

  if (sixtyDifferences.length > 0) {
    sixtyAverage = sixtyDifferences.reduce((a, b) => a + b) / sixtyDifferences.length;
  }

  if (ninetyDifferences.length > 0) {
    ninetyAverage = ninetyDifferences.reduce((a, b) => a + b) / ninetyDifferences.length;
  }

  // calculate the median thinking times
  if (thirtyDifferences.length % 2 !== 0) {
    thirtyMedian = thirtyDifferences[(thirtyDifferences.length + 1) / 2];
  } else {
    thirtyMedian =
      (thirtyDifferences[thirtyDifferences.length / 2] +
        thirtyDifferences[thirtyDifferences.length / 2 + 1]) /
      2;
  }

  if (sixtyDifferences.length % 2 !== 0) {
    sixtyMedian = sixtyDifferences[(sixtyDifferences.length + 1) / 2];
  } else {
    sixtyMedian =
      (sixtyDifferences[sixtyDifferences.length / 2] +
        sixtyDifferences[sixtyDifferences.length / 2 + 1]) /
      2;
  }

  if (ninetyDifferences.length % 2 !== 0) {
    ninetyMedian = ninetyDifferences[(ninetyDifferences.length + 1) / 2];
  } else {
    ninetyMedian =
      (ninetyDifferences[ninetyDifferences.length / 2] +
        ninetyDifferences[ninetyDifferences.length / 2 + 1]) /
      2;
  }

  // #endregion

  // #region AVERAGE TIME CHECK
  let avgToAvgFlag = false;
  let medianToMedianFlag = false;
  let avgToMedianFlag = false;
  let progressiveTimeFlag = false;

  // check if the average thinking time during the first, second, and third quarters varies enough
  let caseOne =
    Math.abs(thirtyAverage - sixtyAverage) <= ((thirtyAverage + sixtyAverage) / 2) * 0.15;
  let caseTwo =
    Math.abs(thirtyAverage - ninetyAverage) <= ((thirtyAverage + ninetyAverage) / 2) * 0.15;
  let caseThree =
    Math.abs(sixtyAverage - ninetyAverage) <= ((sixtyAverage + ninetyAverage) / 2) * 0.15;

  if ((caseOne && caseTwo) || (caseOne && caseThree) || (caseTwo && caseThree)) avgToAvgFlag = true;

  // check if the median thinking time during the first, second, and third quarters varies enough
  caseOne = Math.abs(thirtyMedian - sixtyMedian) <= ((thirtyMedian + sixtyMedian) / 2) * 0.15;
  caseTwo = Math.abs(thirtyMedian - ninetyMedian) <= ((thirtyMedian + ninetyMedian) / 2) * 0.15;
  caseThree = Math.abs(thirtyMedian - ninetyMedian) <= ((thirtyMedian + ninetyMedian) / 2) * 0.15;

  if ((caseOne && caseTwo) || (caseOne && caseThree) || (caseTwo && caseThree))
    medianToMedianFlag = true;

  // check if the difference between average and median thinking time during varies enough
  caseOne = Math.abs(thirtyAverage - thirtyMedian) <= ((thirtyAverage + thirtyMedian) / 2) * 0.15;
  caseTwo = Math.abs(sixtyAverage - sixtyMedian) <= ((sixtyAverage + sixtyMedian) / 2) * 0.15;
  caseThree = Math.abs(ninetyAverage - ninetyMedian) <= ((ninetyAverage + ninetyMedian) / 2) * 0.15;

  if ((caseOne && caseTwo) || (caseOne && caseThree) || (caseTwo && caseThree))
    avgToMedianFlag = true;

  // #endregion

  // #region PROGRESSIVE TIME FLAG
  if (sixtyMedian - thirtyMedian < thirtyMedian * 1.25) {
    progressiveTimeFlag = true;
  }
  //#endregion

  const fen = getFen(data);
  let newConfig = {};

  const analysis = await chessAnalysisApi.getAnalysis({
    fen,
    depth: 15,
    multipv: 1,
    excludes: [PROVIDERS.LICHESS_BOOK, PROVIDERS.LICHESS_CLOUD_EVAL],
  });

  const c = from.toLowerCase() + to.toLowerCase();
  const allmoves = analysis.moves.map((entry) => entry.uci).flat(1);
  const playerMoves = [];

  allmoves.forEach((entry) => {
    if (allmoves.indexOf(entry) % 2 === 0) {
      playerMoves.push(entry);
    }
  });

  if (playerMoves.includes(c)) {
    newConfig = Object.assign({}, currentConfig, {
      turnCount: currentConfig.turnCount + 1,
      sameTurnCount: currentConfig.sameTurnCount + 1,
      coincidenceRatio: (currentConfig.sameTurnCount + 1) / currentConfig.turnCount,
      moveTimes: [...currentConfig.moveTimes, Math.floor(new Date() / 1000)],
      avgToAvgFlag,
      medianToMedianFlag,
      avgToMedianFlag,
      progressiveTimeFlag,
      coincided: [...currentConfig.coincided, playerMoves.includes(c)],
    });
  } else {
    newConfig = Object.assign({}, currentConfig, {
      turnCount: currentConfig.turnCount + 1,
      coincidenceRatio: (currentConfig.sameTurnCount + 1) / currentConfig.turnCount,
      moveTimes: [...currentConfig.moveTimes, Math.floor(new Date() / 1000)],
      avgToAvgFlag,
      medianToMedianFlag,
      avgToMedianFlag,
      progressiveTimeFlag,
      coincided: [...currentConfig.coincided, playerMoves.includes(c)],
    });
  }

  // #region IDEAL MOVES COMBO CHECK check if there are 6 coinciding moves in a row
  for (let i = 0; i < newConfig.coincided.length; i++) {
    if (
      newConfig.coincided[i] &&
      newConfig.coincided[i + 1] &&
      newConfig.coincided[i + 2] &&
      newConfig.coincided[i + 3] &&
      newConfig.coincided[i + 4] &&
      newConfig.coincided[i + 5]
    );
    newConfig = Object.assign({}, newConfig, { idealMovesComboFlag: true });
  }
  // #endregion

  // #region PROGRESSIVE ACCURACY CHECK
  let firstQuarterCoincidences = 0;
  let secondQuarterCoincidences = 0;

  for (let i = 0; i < thirtyPercentBoundary; i++) {
    if (newConfig.coincided[i]) firstQuarterCoincidences++;
  }

  for (let i = thirtyPercentBoundary; i < sixtyPercentBoundary; i++) {
    if (newConfig.coincided[i]) secondQuarterCoincidences++;
  }

  if (firstQuarterCoincidences >= secondQuarterCoincidences)
    newConfig = Object.assign({}, newConfig, { progressiveAccuracyFlag: true });

  // #endregion

  return newConfig;
}
