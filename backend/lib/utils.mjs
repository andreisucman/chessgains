import { PIECES } from "./const/board.mjs";

export function getPieceValue(piece) {
  const values = { k: 10, q: 9, r: 5, b: 3, n: 3, p: 1 };
  return values[piece.toLowerCase()] || 0;
}

export function isLocationValid(location) {
  return (
    typeof location === "string" && location.match("^[a-hA-H]{1}[1-8]{1}$")
  );
}

export function isPieceValid(piece) {
  return Object.values(PIECES).includes(piece);
}
