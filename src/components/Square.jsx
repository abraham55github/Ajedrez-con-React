

export const Square = ({ children, color, isValidMove, onClick }) => {
  const className = `square ${isValidMove ?"valid-move" : color }`;
  return (
    <div
      className={className}
      onClick={isValidMove ? onClick : null} // Se ejecuta al hacer click en la casilla
    >
      {children}
    </div>
  );
};