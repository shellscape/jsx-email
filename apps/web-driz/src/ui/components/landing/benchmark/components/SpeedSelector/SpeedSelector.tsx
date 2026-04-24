import React, { type FC } from "react";

import styles from "./SpeedSelector.module.css";

interface IProps {
  speed: number;
  setSpeed: (speed: number) => void;
}

const SpeedSelector: FC<IProps> = ({ speed, setSpeed }) => {
  const items = [1, 2, 4, 8, 16, 32];

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSpeed(event.target.value as unknown as number);
  };

  return (
    <select
      className={styles.button}
      value={speed}
      onChange={handleChange}
    >
      {items.map((item) => (
        <option key={item} value={item}>
          {item}x
        </option>
      ))}
    </select>
  );
};

export default SpeedSelector;
