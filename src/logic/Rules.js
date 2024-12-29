


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
  };