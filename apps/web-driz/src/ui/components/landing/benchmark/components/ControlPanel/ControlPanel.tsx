import { useEffect, useMemo, useState, type FC } from "react";

import styles from "./ControlPanel.module.css";
import type { IData } from "../../types.ts";

import SpeedSelector from "../SpeedSelector/SpeedSelector.tsx";
import Configuration from "../Configuration/Configuration.tsx";
import Performance from "../Performance/Performance.tsx";
import { useBenchmarkContext } from "../../context/useBenchmarkContext.tsx";
import OptionsIcon from "@/assets/icons/OptionsIcon";
import ArrowRight from "@/assets/icons/ArrowRight";
import BenchmarkConifg from "../BenchmarkConfig/BenchmarkConfig.tsx";
import getBenchmarkData from "../../utils/getBenchmarkData.ts";
import Rewind from "../Rewind/Rewind.tsx";

interface Props {
  minWidth?: number;
}

const ControlPanel: FC<Props> = ({ minWidth = 940 }) => {
  const {
    setIsTimerActive,
    isTimerActive,
    time,
    setTime,
    intervalId,
    selectedItems,
  } = useBenchmarkContext();
  const [speed, setSpeed] = useState<number>(2);
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const [drizzleData, setDrizzleData] = useState<IData[] | null>(null);
  const [compareData, setCompareData] = useState<IData[] | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  const maxDataLength = useMemo(() => {
    if (drizzleData && compareData) {
      return Math.min(drizzleData.length - 1, compareData.length - 1);
    }
    return 0;
  }, [drizzleData, compareData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth > minWidth) {
      setIsBlurred(false);
    } else {
      setIsSmall(true);
    }
  }, [typeof window]);

  const toggleConfigModal = () => {
    if (!isConfigOpen) pause();
    setIsConfigOpen((prev) => !prev);
  };

  const skipToResults = () => {
    if (!drizzleData || !compareData) return;
    clearInterval(intervalId.current);
    setTime(maxDataLength * 100);
  };

  const pause = () => {
    if (!drizzleData || !compareData) return;
    clearInterval(intervalId.current);
    setIsTimerActive(false);
  };

  const rerun = () => {
    if (!drizzleData || !compareData) return;
    setTime(0);
    setIsTimerActive(true);
  };

  const resume = () => {
    if (!drizzleData || !compareData) return;
    setIsTimerActive(true);
  };

  const rewind = (e: any) => {
    if (!drizzleData || !compareData) return;
    setTime(Number(e.target.value));
    setIsTimerActive(false);
    clearInterval(intervalId.current);
  };

  const start = () => {
    if (window.innerWidth < minWidth && !isShaking) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 2000);
      return;
    }
    if (isShaking) return;
    rerun();
    setTimeout(() => {
      setIsBlurred(false);
    }, 200);
  };

  useEffect(() => {
    const data = getBenchmarkData(selectedItems);
    if (data) {
      setDrizzleData(data.drizzleData);
      setCompareData(data.compareData);
    }
    return () => {
      setDrizzleData(null);
      setCompareData(null);
    };
  }, [selectedItems]);

  useEffect(() => {
    if (isBlurred) {
      skipToResults();
    } else {
      rerun();
    }
  }, [drizzleData, compareData]);

  return (
    <div className={styles.content}>
      <div className={styles.control}>
        <div className={styles.time}>
          {!isConfigOpen && <SpeedSelector speed={speed} setSpeed={setSpeed} />}
          {!isTimerActive &&
            !isConfigOpen &&
            (time === maxDataLength * 100 || time === 0) && (
              <>
                <div className={styles.divider}></div>
                <button
                  type="button"
                  className={styles["play-wrap"]}
                  onClick={rerun}
                >
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
                    className="lucide lucide-play"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  Run
                </button>
                <div className={styles.divider}></div>
              </>
            )}
          {!isTimerActive &&
            !isConfigOpen &&
            time !== maxDataLength * 100 &&
            time !== 0 && (
              <>
                <div className={styles.divider}></div>
                <button
                  type="button"
                  className={styles["play-wrap"]}
                  onClick={resume}
                >
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
                    className="lucide lucide-play"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  Resume
                </button>
                <div className={styles.divider}></div>
              </>
            )}
          {isTimerActive && !isConfigOpen && (
            <>
              <div className={styles.divider}></div>
              <button
                type="button"
                className={styles["play-wrap"]}
                onClick={pause}
              >
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
                  className="lucide lucide-pause"
                >
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                </svg>
                Pause
              </button>
              <div className={styles.divider}></div>
            </>
          )}
          {!isConfigOpen && (
            <Rewind maxDataLength={maxDataLength} time={time} rewind={rewind} />
          )}
        </div>
        <div className={styles.config}>
          <div className={styles["config-wrap"]}>
            <div className={styles["config-popup"]}>
              <BenchmarkConifg selectedItems={selectedItems} />
            </div>
            <div className={styles["config-info"]}>Benchmark Config</div>
          </div>
          <div className={styles["arrow-wrap"]}>
            <ArrowRight />
          </div>
          <button
            type="button"
            className={styles["config-button"]}
            onClick={toggleConfigModal}
          >
            <OptionsIcon />
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={isBlurred ? styles.blurred : styles["hide-blur"]}>
          {drizzleData && compareData && (
            <div className={styles["blur-content"]}>
              {isShaking && (
                <div className={styles["only-desktop"]}>
                  Only available on Desktop 🖥️
                </div>
              )}
              {isSmall && (
                <button
                  onClick={start}
                  type="button"
                  className={isShaking ? styles["start-shaked"] : styles.start}
                >
                  Launch your DevOps experience 🚀
                </button>
              )}
            </div>
          )}
        </div>
        <Performance
          selectedItems={selectedItems}
          isConfigOpen={isConfigOpen}
          speed={speed}
          data={drizzleData}
          compareData={compareData}
          maxElements={81}
          maxDataLength={maxDataLength}
        />
        <Configuration isOpened={isConfigOpen} />
      </div>
    </div>
  );
};

export default ControlPanel;
