import styles from "./Benchmark.module.css";
import { useEffect, useMemo, useState } from "react";
import DemoPerformance from "./components/DemoPerformance/DemoPerformance.tsx";
import { type IData } from "./types.ts";
import getDemoBenchmarkData from "./utils/getDemoBenchmarkData.ts";
import { BenchmarkProvider } from "./context/useBenchmarkContext.tsx";

const Benchmark = () => {
  const [isShaking] = useState<boolean>(false);
  const [drizzleData, setDrizzleData] = useState<IData[] | null>(null);
  const [compareData, setCompareData] = useState<IData[] | null>(null);

  const maxDataLength = useMemo(() => {
    if (drizzleData && compareData) {
      return Math.min(drizzleData.length - 1, compareData.length - 1);
    }
    return 0;
  }, [drizzleData, compareData]);

  useEffect(() => {
    const data = getDemoBenchmarkData();
    if (data) {
      setDrizzleData(data.drizzleData);
      setCompareData(data.compareData);
    }
    return () => {
      setDrizzleData(null);
      setCompareData(null);
    };
  }, []);

  return (
    <BenchmarkProvider>
      <div className={styles.wrap}>
        <div className={styles.header}>Performance</div>
        <div className={styles.description}>
          <div className={styles.description__line}>
            Drizzle doesn&apos;t slow you down
          </div>
        </div>
        <div className={styles.container}>
          <a href={"/benchmarks"} className={styles["wrap-link"]}></a>
          <div className={styles.blurred}>
            <div className={styles["blur-content"]}>
              {isShaking && (
                <div className={styles["only-desktop"]}>
                  Only available on Desktop 🖥️
                </div>
              )}
              <a
                href={"/benchmarks"}
                className={isShaking ? styles["start-shaked"] : styles.start}
              >
                Go to benchmark results
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
                  className="feather feather-arrow-right"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
          <DemoPerformance
            maxElements={81}
            data={drizzleData}
            compareData={compareData}
            maxDataLength={maxDataLength}
          />
        </div>
        <a href={"/benchmarks"} className={styles.benchmark_link}>
          Go to benchmark results
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
            className="feather feather-arrow-right"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </BenchmarkProvider>
  );
};

export default Benchmark;
