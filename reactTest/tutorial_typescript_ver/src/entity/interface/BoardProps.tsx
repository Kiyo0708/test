export default interface BoardProps {
  squares: any[];
  player: string;
  isEnd: boolean;
  onClick: (i: number) => void;
}
