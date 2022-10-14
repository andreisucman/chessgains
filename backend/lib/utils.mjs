import { PIECES, ROWS, COLUMNS, COLORS } from "./const/board.mjs";

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

export function getFEN (configuration) {
  let fen = ''
  Object.assign([], ROWS).reverse().map(row => {
      let emptyFields = 0
      if (row < 8) {
          fen += '/'
      }
      COLUMNS.map(column => {
          const piece = configuration.pieces[`${column}${row}`]
          if (piece) {
              if (emptyFields) {
                  fen += emptyFields.toString()
                  emptyFields = 0
              }
              fen += piece
          } else {
              emptyFields++
          }
      })
      fen += `${emptyFields || ''}`
  })

  fen += configuration.turn === COLORS.WHITE ? ' w ' : ' b '

  const { whiteShort, whiteLong, blackLong, blackShort } = configuration.castling
  if (!whiteLong && !whiteShort && !blackLong && !blackShort) {
      fen += '-'
  } else {
      if (whiteShort) fen += 'K'
      if (whiteLong) fen += 'Q'
      if (blackShort) fen += 'k'
      if (blackLong) fen += 'q'
  }

  fen += ` ${configuration.enPassant ? configuration.enPassant.toLowerCase() : '-'}`

  fen += ` ${configuration.halfMove}`

  fen += ` ${configuration.fullMove}`

  return fen
}
