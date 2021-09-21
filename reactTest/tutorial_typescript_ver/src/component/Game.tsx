import React from "react";
import GameStates from "../entity/interface/GameStates";
import Board from "./Board";

export default class Game extends React.Component<{}, GameStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          player: "X",
        },
      ],
    };
  }

  getNowState() {
    return this.state.history[this.state.history.length - 1];
  }

  isEnd() {
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
    const squares = this.getNowState().squares;
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
  }

  handleClick(index: number) {
    const now = this.getNowState();
    if (this.isEnd() || now.squares[index]) {
      return;
    }

    this.setState({
      history: this.state.history.concat(this.getNewGeneration(index)),
    });
  }

  getNewGeneration(index: number) {
    // イミュータブル。以下の利点がある
    // 1.例えば履歴機能などの実装容易性・2.変更の検出容易性・3.2による再レンダリングタイミングの最適化
    const newSquares = this.getNowState().squares.slice();
    newSquares[index] = this.getNowState().player;

    const newGeneration = {
      squares: newSquares,
      player: this.nextPlayer(),
    };

    return newGeneration;
  }

  nextPlayer() {
    return this.getNowState().player === "X" ? "〇" : "X";
  }

  getMoveBottons() {
    const moveButtons = this.state.history.map((step: any, index: number) => {
      if (!index) return false;
      const msg = index < 2 ? `初めに戻る` : `#${index}に戻る`;

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{msg}</button>
        </li>
      );
    });

    return moveButtons;
  }

  jumpTo(index: number) {
    this.setState({
      history: this.state.history.slice(0, index),
    });
  }

  render() {
    const nowState = this.getNowState();
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={nowState.squares}
            player={nowState.player}
            isEnd={this.isEnd()}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{this.getMoveBottons()}</ol>
        </div>
      </div>
    );
  }
}
