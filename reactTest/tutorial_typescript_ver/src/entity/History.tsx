export default class History {
  constructor(public history: Array<GameState> = [new GameState()]) {
    this.history = history;
  }
  get now(): GameState {
    return this.history[this.history.length - 1];
  }

  get get(): GameState[] {
    return this.history;
  }

  /**
   *
   * 新しいヒストリーを返却する
   * @param newState
   */
  public add = (newState: GameState): History => {
    return new History(this.history.concat(newState));
  };

  public backTo = (index: number): History => {
    return new History(this.history.slice(0, index));
  };

  getNewState = (index: number): GameState => {
    // イミュータブル。以下の利点がある
    // 1.例えば履歴機能などの実装容易性・2.変更の検出容易性・3.2による再レンダリングタイミングの最適化
    const newSquares: string[] = this.now.squares.slice();
    newSquares[index] = this.now.player;

    const getNewState = {
      squares: newSquares,
      player: this.getNextPlayer(),
    };

    return getNewState;
  };

  getNextPlayer = () => {
    return this.now.player === "X" ? "〇" : "X";
  };
}

export class GameState {
  constructor(
    public squares: string[] = Array(9).fill(null),
    public player: string = "X"
  ) {
    this.squares = squares;
    this.player = player;
  }
}
