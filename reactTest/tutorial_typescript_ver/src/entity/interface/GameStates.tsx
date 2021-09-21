export default interface GameStates {
  history: History[];
}

type History = {
  squares: any[];
  player: string;
};
