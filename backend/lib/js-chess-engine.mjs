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

  return aiMove(config, level);
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
  session.set("cheatingRatio", config.gamesPlayed);

  await session.save(null, { useMasterKey: true });
  return score;
}

async function analyze(config, from, to) {
  let currentConfig = config;
  let data = currentConfig.prevConfig;

  if (currentConfig.fiftyMovesRule === 0) {
    data = currentConfig;
  }

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
      fiftyMovesRule: currentConfig.fiftyMovesRule + 1,
      aiDifficulty: currentConfig.aiDifficulty + 1,
      gamesPlayed: (currentConfig.aiDifficulty + 1) / currentConfig.fiftyMovesRule,
    });
  } else {
    newConfig = Object.assign({}, currentConfig, {
      fiftyMovesRule: currentConfig.fiftyMovesRule + 1,
      gamesPlayed: (currentConfig.aiDifficulty + 1) / currentConfig.fiftyMovesRule,
    });
  }

  return newConfig;
}
