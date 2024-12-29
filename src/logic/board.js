
export const setupInitialBoard = () => {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));

  // Piezas negras
  board[0] = [
    { type: "♜", color: "black" },
    { type: "♞", color: "black" },
    { type: "♝", color: "black" },
    { type: "♛", color: "black" },
    { type: "♚", color: "black" },
    { type: "♝", color: "black" },
    { type: "♞", color: "black" },
    { type: "♜", color: "black" },
  ];
  board[1] = Array(8).fill({ type: "♟", color: "black" });

  // Piezas blancas
  board[6] = Array(8).fill({ type: "♟", color: "white" });
  board[7] = [
    { type: "♜", color: "white" },
    { type: "♞", color: "white" },
    { type: "♝", color: "white" },
    { type: "♛", color: "white" },
    { type: "♚", color: "white" },
    { type: "♝", color: "white" },
    { type: "♞", color: "white" },
    { type: "♜", color: "white" },
  ];

  return board;
};