import { useState, useMemo, useEffect, type FC } from "react";

import styles from "./Performance.module.css";

import type { IData, IParams } from "../../types";
import { useBenchmarkContext } from "../../context/useBenchmarkContext";
import { DELAY } from "../../constants";
import getSubArray from "../../utils/getSubArray";
import LatencyChart from "../LatencyChart/LatencyChart";
import ReqsChart from "../ReqsChart/ReqsChart";
import CPUChart from "../CpuChart/CPUChart";
import Logo from "../../utils/Logo";
import configurationData from "../../configurationData";
import RuntimeSelector from "@components/landing/benchmark/components/RuntimeSelector/RuntimeSelector";
import JoinsSelector from "@components/landing/benchmark/components/JoinsSelector/JoinsSelector";

interface Props {
  selectedItems: IParams;
  isConfigOpen: boolean;
  maxElements: number;
  data: IData[] | null;
  speed: number;
  compareData: IData[] | null;
  maxDataLength: number;
}

const Performance: FC<Props> = ({
  isConfigOpen,
  maxElements,
  data,
  speed,
  compareData,
  maxDataLength,
}) => {
  const {
    isTimerActive,
    setIsTimerActive,
    time,
    setTime,
    intervalId,
    concatedDataDrizzle,
    setConcatedDataDrizzle,
    concatedDataCompare,
    setConcatedDataCompare,
    selectedItems,
  } = useBenchmarkContext();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );
  const [max, setMax] = useState<number>(1);
  const [maxRequests, setMaxRequests] = useState<number>(1);

  useEffect(() => {
    if (!data || !compareData) return;
    if (selectedItemIndex === null && isTimerActive && index < maxDataLength) {
      intervalId.current = window.setInterval(() => {
        setTime((prev) => prev + 1 * speed);
      }, 10);
    } else {
      if (selectedItemIndex === null && index === maxDataLength) {
        setTime(maxDataLength * 100);
      }
      clearInterval(intervalId.current);
    }
    return () => clearInterval(intervalId.current);
  }, [data, compareData, selectedItemIndex, isTimerActive, speed]);

  const index = useMemo(() => {
    const value = Math.floor((time * 10) / DELAY);
    if (value >= maxDataLength) {
      return maxDataLength;
    }
    return Math.floor((time * 10) / DELAY);
  }, [data, compareData, time, maxDataLength]);

  useEffect(() => {
    if (!data || !compareData) return;
    setSelectedItemIndex(null);
    setIsTimerActive(true);
    setConcatedDataDrizzle(data.slice(0, 1));
    setConcatedDataCompare(compareData.slice(0, 1));
    setTime(0);
    return () => {
      setSelectedItemIndex(null);
      setIsTimerActive(true);
      setTime(0);
    };
  }, [data, compareData]);

  useEffect(() => {
    if (!data || !compareData) return;
    if (index === maxDataLength) {
      setTime(maxDataLength * 100);
      clearInterval(intervalId.current);
      setIsTimerActive(false);
    }
    setConcatedDataDrizzle(getSubArray(data, index, maxElements));
    setConcatedDataCompare(getSubArray(compareData, index, maxElements));

    const maxLatency = Math.max(
      data[index].max.latency,
      compareData[index].max.latency,
    );
    setMax(maxLatency);
    const maxRequestsTemp = Math.max(
      data[index].max.reqs,
      compareData[index].max.reqs,
    );
    setMaxRequests(maxRequestsTemp);
  }, [index]);

  return (
    <div className={isConfigOpen ? styles["wrap-hide"] : styles.wrap}>
      <div className={styles["compare-item-container"]}>
        <div className={styles["compare-item"]}>
          <div className={styles["compare-icon-wrap"]}>
            <Logo logo="drizzle" />
          </div>
          <div>
            <div className={styles.name}>Drizzle</div>
            <div className={styles.version}>
              {configurationData.orm.items[selectedItems.orm].drizzle_version}
            </div>
          </div>
        </div>
        <RuntimeSelector disabled={selectedItems.orm === "go"} />
      </div>
      <div className={styles["compare-item-container"]}>
        <div className={styles["compare-item"]}>
          <div className={styles["compare-icon-wrap"]}>
            <Logo logo={selectedItems.orm} />
          </div>
          <div>
            <div className={styles.name}>
              {selectedItems.orm.startsWith("prisma")
                ? "Prisma"
                : selectedItems.orm}
            </div>
            <div className={styles.version}>
              {configurationData.orm.items[selectedItems.orm].compare_version}
            </div>
          </div>
        </div>
        {selectedItems.orm !== "go" && (
          <div style={{ display: "flex", gap: "12px" }}>
            <RuntimeSelector />
            {selectedItems.orm === "prisma-v5.18.0" && <JoinsSelector />}
          </div>
        )}
      </div>
      <div className={styles.block}>
        <LatencyChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataDrizzle}
          max={max}
          maxDataLength={maxElements}
          averageLatency={data ? data[index].avg.latency : 0}
          averageLatencyCompare={
            compareData ? compareData[index].avg.latency : 0
          }
          averageP99={data ? data[index].avg.p95 : 0}
          averageP99Compare={compareData ? compareData[index].avg.p95 : 0}
          showTooltip
          isCompleted={index === maxDataLength}
          latency={data ? data[index].latency.avg : 0}
        />
      </div>
      <div className={styles.block}>
        <LatencyChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataCompare}
          max={max}
          maxDataLength={maxElements}
          averageLatency={compareData ? compareData[index].avg.latency : 0}
          averageLatencyCompare={data ? data[index].avg.latency : 0}
          averageP99={compareData ? compareData[index].avg.p95 : 0}
          averageP99Compare={data ? data[index].avg.p95 : 0}
          isCompleted={index === maxDataLength}
          latency={compareData ? compareData[index].latency.avg : 0}
        />
      </div>
      <div className={styles.block}>
        <ReqsChart
          avgRequests={data ? data[index].avg.reqs : 0}
          requests={data ? data[index].reqs : 0}
          totalRequests={data ? data[index].totalReqs : 0}
          totalRequestsCompare={compareData ? compareData[index].totalReqs : 0}
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataDrizzle}
          maxDataLength={maxElements}
          max={maxRequests}
          isCompleted={index === maxDataLength}
          showTooltip
          totalRequestsFail={data ? data[index].totalFailReqs : 0}
        />
      </div>
      <div className={styles.block}>
        <ReqsChart
          avgRequests={compareData ? compareData[index].avg.reqs : 0}
          requests={compareData ? compareData[index].reqs : 0}
          totalRequests={compareData ? compareData[index].totalReqs : 0}
          totalRequestsCompare={data ? data[index].totalReqs : 0}
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataCompare}
          maxDataLength={maxElements}
          max={maxRequests}
          isCompleted={index === maxDataLength}
          totalRequestsFail={compareData ? compareData[index].totalFailReqs : 0}
        />
      </div>
      <div className={styles.block}>
        <CPUChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataDrizzle}
          max={100}
          maxDataLength={maxElements}
          average={data ? data[index].avg.cpus : 0}
          averageCompare={compareData ? compareData[index].avg.cpus : 0}
          isCompleted={index === maxDataLength}
          currentLoad={data ? data[index].cpus.cpus : 0}
        />
      </div>
      <div className={styles.block}>
        <CPUChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataCompare}
          max={100}
          maxDataLength={maxElements}
          average={compareData ? compareData[index].avg.cpus : 0}
          averageCompare={data ? data[index].avg.cpus : 0}
          isCompleted={index === maxDataLength}
          currentLoad={compareData ? compareData[index].cpus.cpus : 0}
        />
      </div>
    </div>
  );
};

export default Performance;
