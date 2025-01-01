import { createContext, useState, useContext } from "react";
import { setupInitialBoard } from "../logic/board";
import { movementRules } from "../logic/Rules";


const GameContext = createContext();


export function GameProvider({ children }) {
  const [board, setBoard] = useState(setupInitialBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState('white')
  const [validMoves, setValidMoves] = useState([]);


  const nextTurn = () => {
    setTurn((prevTurn) => (prevTurn === 'white' ? 'black' : 'white'));
  };

  const handleSquareClick = (row, col) => {
    const cell = board[row][col];
    if (!cell || cell.color !== turn) {
      setValidMoves([]);
      return;
    }

    setSelectedPiece({ row, col })

    const rule = movementRules[cell.type === "♟" ? "pawn" : null];
    if (rule) {
      const moves = rule([row, col], board, cell.color);
      setValidMoves(moves)
    } else {
      setValidMoves([]);
    }

  }

  const handleMoveClick = (row, col) => {

    if (selectedPiece && validMoves.some(([r, c]) => r === row && c === col)) {
      const newBoard = [...board];

      newBoard[row][col] = newBoard[selectedPiece.row][selectedPiece.col];
      newBoard[selectedPiece.row][selectedPiece.col] = null;

      setBoard(newBoard);
      setSelectedPiece(null);
      setValidMoves([]);
      nextTurn();
      return;
    }
  }

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        selectedPiece,
        setSelectedPiece,
        turn,
        setTurn,
        validMoves,
        setValidMoves,
        nextTurn,
        handleSquareClick,
        handleMoveClick
      }}
    >
      {children}
    </GameContext.Provider>
  )
}


export const useGame = () => useContext(GameContext);


