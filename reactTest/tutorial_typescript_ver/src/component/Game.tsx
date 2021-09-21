import React, { useState } from "react";
import History from "../entity/History";
import Board from "./Board";
import MoveButtons from "./MoveButtons";

const Game: React.FC<{}> = (props: {}) => {
  const [history, setHistory] = useState<History>(new History());

  const isEnd = () => {
    const endings = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let isEnd = false;
    const squares = history.now.squares;
    endings.forEach((value) => {
      if (
        squares[value[0]] &&
        squares[value[0]] === squares[value[1]] &&
        squares[value[0]] === squares[value[2]]
      ) {
        isEnd = true;
        return false;
      }
    });
    return isEnd;
  };

  const handleClick = (index: number) => {
    const now = history.now;
    // 終わっているか、もしくはすでにクリックされているか
    if (isEnd() || now.squares[index]) {
      return;
    }

    setHistory(history.add(history.getNewState(index)));
  };

  const jumpTo = (index: number) => {
    setHistory(history.backTo(index));
  };

  const nowState = history.now;
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={nowState.squares}
          player={nowState.player}
          isEnd={isEnd()}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <MoveButtons history={history} onClick={jumpTo} />
      </div>
    </div>
  );
};

export default Game;
