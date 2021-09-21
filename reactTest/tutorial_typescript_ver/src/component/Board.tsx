import React from "react";
import BoardProps from "../entity/interface/BoardProps";
import Square from "./Square";

const Board: React.FC<BoardProps> = (props) => {
  function renderSquare(i: number) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  }

  const status = props.isEnd ? "end!" : `Next player: ${props.player}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
