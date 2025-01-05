export const movementRules = {
  pawn: (position, board, color) => {
    const moves = [];
    const [row, col] = position;
    const direction = color === "white" ? -1 : 1;

    // Movimiento hacia adelante
    if (!board[row + direction][col]) {
      moves.push([row + direction, col]);

      // Primer movimiento: Puede avanzar dos casillas
      const startRow = color === "white" ? 6 : 1;
      if (row === startRow && !board[row + 2 * direction][col]) {
        moves.push([row + 2 * direction, col]);
      }
    }

    // Captura en diagonal
    for (const deltaCol of [-1, 1]) {
      const targetRow = row + direction;
      const targetCol = col + deltaCol;
      if (board[targetRow] && board[targetRow][targetCol]?.color !== color) {
        moves.push([targetRow, targetCol]);
      }
    }

    return moves;
  },

  rook: (position, board, color) => {
    return getStraightMoves(position, board, color);
  },

  bishop: (position, board, color) => {
    return getDiagonalMoves(position, board, color);
  },

  queen: (position, board, color) => {
    return [
      ...getStraightMoves(position, board, color),
      ...getDiagonalMoves(position, board, color),
    ];
  },

  knight: (position, board, color) => {
    const moves = [];
    const [row, col] = position;
    const possibleMoves = [
      [row + 2, col + 1],
      [row + 2, col - 1],
      [row - 2, col + 1],
      [row - 2, col - 1],
      [row + 1, col + 2],
      [row + 1, col - 2],
      [row - 1, col + 2],
      [row - 1, col - 2],
    ];

    for (const [r, c] of possibleMoves) {
      if (board[r] && (!board[r][c] || board[r][c]?.color !== color)) {
        moves.push([r, c]);
      }
    }

    return moves;
  },

  king: (position, board, color) => {
    const moves = [];
    const [row, col] = position;
    const possibleMoves = [
      [row + 1, col],
      [row - 1, col],
      [row, col + 1],
      [row, col - 1],
      [row + 1, col + 1],
      [row + 1, col - 1],
      [row - 1, col + 1],
      [row - 1, col - 1],
    ];

    for (const [r, c] of possibleMoves) {
      if (board[r] && (!board[r][c] || board[r][c]?.color !== color)) {
        moves.push([r, c]);
      }
    }

    return moves;
  },
};

function getStraightMoves(position, board, color) {
  const moves = [];
  const [row, col] = position;
  const directions = [
    [1, 0], // Abajo
    [-1, 0], // Arriba
    [0, 1], // Derecha
    [0, -1], // Izquierda
  ];

  for (const [dRow, dCol] of directions) {
    let r = row + dRow;
    let c = col + dCol;

    while (board[r] && (!board[r][c] || board[r][c]?.color !== color)) {
      moves.push([r, c]);
      if (board[r][c]) break; // Detenerse si hay una pieza enemiga
      r += dRow;
      c += dCol;
    }
  }

  return moves;
}

function getDiagonalMoves(position, board, color) {
  const moves = [];
  const [row, col] = position;
  const directions = [
    [1, 1], // Abajo derecha
    [1, -1], // Abajo izquierda
    [-1, 1], // Arriba derecha
    [-1, -1], // Arriba izquierda
  ];

  for (const [dRow, dCol] of directions) {
    let r = row + dRow;
    let c = col + dCol;

    while (board[r] && (!board[r][c] || board[r][c]?.color !== color)) {
      moves.push([r, c]);
      if (board[r][c]) break; // Detenerse si hay una pieza enemiga
      r += dRow;
      c += dCol;
    }
  }

  return moves;
}
