import type { FC } from "react";
import styles from "./Timer.module.css";

interface IProps {
  time: number;
}

const Timer: FC<IProps> = ({ time }) => {
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return (
    <div className={styles.wrap}>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}:
      {milliseconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
