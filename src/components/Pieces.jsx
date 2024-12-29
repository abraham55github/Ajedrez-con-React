

export default function Pieces({ type, color, isSelected, turn, onClick }) {
  const isTurn = color === turn; // Verifica si la pieza corresponde al turno actual
  const className = `chess-piece ${color} ${isSelected ? "selected" : ""} ${
    isTurn ? "interactive" : ""
  }`;

  return (
    <span
      className={className}
      onClick={isTurn ? onClick : null} // Solo se puede interactuar si es el turno
    >
      {type}
    </span>
  );
}