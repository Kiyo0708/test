import React from "react";
import History from "../entity/History";
type Props = {
  history: History;
  onClick: (index: number) => void;
};

const MoveButtons: React.FC<Props> = ({ history, onClick }) => {
  return (
    <ol>
      {history.get.map((step: any, index: number) => {
        if (!index) return false;
        const msg = index < 2 ? `初めに戻る` : `#${index}に戻る`;
        return (
          <li key={index}>
            <button onClick={() => onClick(index)}>{msg}</button>
          </li>
        );
      })}
    </ol>
  );
};

export default MoveButtons;
