import { type FC, useMemo, useRef } from "react";

import styles from "./Rewind.module.css";

interface Props {
  maxDataLength: number;
  time: number;
  rewind: (e: any) => void;
}

const steps = [
  { duration: 5, target: 200 },
  { duration: 15, target: 200 },
  { duration: 5, target: 400 },
  { duration: 15, target: 400 },
  { duration: 5, target: 600 },
  { duration: 15, target: 600 },
  { duration: 5, target: 800 },
  { duration: 15, target: 800 },
  { duration: 5, target: 1000 },
  { duration: 15, target: 1000 },
  { duration: 5, target: 1200 },
  { duration: 15, target: 1200 },
  { duration: 5, target: 1400 },
  { duration: 15, target: 1400 },
  { duration: 5, target: 1600 },
  { duration: 15, target: 1600 },
  { duration: 5, target: 1800 },
  { duration: 15, target: 1800 },
  { duration: 5, target: 2000 },
  { duration: 15, target: 2000 },
  { duration: 5, target: 2200 },
  { duration: 15, target: 2200 },
  { duration: 5, target: 2400 },
  { duration: 15, target: 2400 },
  { duration: 5, target: 2600 },
  { duration: 15, target: 2600 },
  { duration: 5, target: 2800 },
  { duration: 15, target: 2800 },
  { duration: 5, target: 3000 },
  { duration: 55, target: 3000 },
];

const Rewind: FC<Props> = ({ maxDataLength, time, rewind }) => {
  const sliderRef = useRef<any>();

  const progress = useMemo(() => {
    return (time / (maxDataLength * 100)) * 100;
  }, [time, maxDataLength]);

  const currentUsers = useMemo(() => {
    const timeInSeconds = Math.floor(time / 100);
    let elapsed = 0;
    let previousTarget = 0;

    for (const step of steps) {
      if (step.duration === 5) {
        const growthRate = (step.target - previousTarget) / step.duration;

        if (timeInSeconds <= elapsed + step.duration) {
          const timeWithinStep = timeInSeconds - elapsed;
          return previousTarget + growthRate * timeWithinStep;
        }
      } else {
        if (timeInSeconds <= elapsed + step.duration) {
          return step.target;
        }
      }

      elapsed += step.duration;
      previousTarget = step.target;
    }

    return steps[steps.length - 1].target;
  }, [time]);

  return (
    <div className={styles.wrap}>
      <div
        className={styles.tooltip}
        style={{ left: `${350 / (100 / progress)}px` }}
      >
        {currentUsers} VUs
      </div>
      <div className={styles.rangeContainer}>
        <div
          className={styles["progress-line"]}
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className={styles.rangeStep}
          style={{ width: `${350 / (360 / 100)}px` }}
        >
          0
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          1k
        </div>
        <div
          className={styles.rangeStep}
          style={{ width: `${350 / (360 / 100)}px` }}
        >
          1k
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          2k
        </div>
        <div
          className={styles.rangeStep}
          style={{ width: `${350 / (360 / 105)}px` }}
        >
          2k
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          3k
        </div>
        <div
          className={styles.rangeStep}
          style={{
            borderRight: "1px solid transparent",
            width: `${350 / (360 / 55)}px`,
          }}
        >
          3k
        </div>
        <input
          ref={sliderRef}
          className={styles["rewind-input"]}
          type="range"
          min={0}
          max={maxDataLength * 100}
          value={time}
          onChange={rewind}
          step={1}
        />
      </div>
    </div>
  );
};

export default Rewind;
