import { useState, type FC, useEffect } from "react";

import styles from "./DemoPerformance.module.css";

import type { IData } from "../../types";
import LatencyChart from "../LatencyChart/LatencyChart";
import ReqsChart from "../ReqsChart/ReqsChart";
import CPUChart from "../CpuChart/CPUChart";
import Logo from "../../utils/Logo";
import configurationData from "../../configurationData";
import RuntimeSelector from "@components/landing/benchmark/components/RuntimeSelector/RuntimeSelector";
import JoinsSelector from "@components/landing/benchmark/components/JoinsSelector/JoinsSelector";

interface Props {
  data: IData[] | null;
  compareData: IData[] | null;
  maxDataLength: number;
  maxElements: number;
}

const DemoPerformance: FC<Props> = ({
  data,
  compareData,
  maxDataLength,
  maxElements,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );
  const [max, setMax] = useState<number>(1);
  const [maxRequests, setMaxRequests] = useState<number>(1);

  useEffect(() => {
    if (!data || !compareData) return;

    const maxLatency = Math.max(
      data[maxDataLength].max.latency,
      compareData[maxDataLength].max.latency,
    );
    setMax(maxLatency);
    const maxRequestsTemp = Math.max(
      data[maxDataLength].max.reqs,
      compareData[maxDataLength].max.reqs,
    );
    setMaxRequests(maxRequestsTemp);
  }, [data, compareData]);

  return (
    <div className={styles.wrap}>
      <div className={styles["compare-item-container"]}>
        <div className={styles["compare-item"]}>
          <div className={styles["compare-icon-wrap"]}>
            <Logo logo="drizzle" />
          </div>
          <div>
            <div className={styles.name}>Drizzle</div>
            <div className={styles.version}>
              {configurationData.orm.items["prisma-v7.1.0"].drizzle_version}
            </div>
          </div>
        </div>
        <RuntimeSelector />
      </div>
      <div className={styles["compare-item-container"]}>
        <div className={styles["compare-item"]}>
          <div className={styles["compare-icon-wrap"]}>
            <Logo logo="prisma" />
          </div>
          <div>
            <div className={styles.name}>Prisma</div>
            <div className={styles.version}>
              {configurationData.orm.items["prisma-v7.1.0"].compare_version}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <RuntimeSelector />
          <JoinsSelector />
        </div>
      </div>
      <div className={styles.block}>
        <LatencyChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={data?.slice(data?.length - 81, data?.length) || []}
          max={max}
          maxDataLength={maxElements}
          averageLatency={data ? data[maxDataLength].avg.latency : 0}
          averageLatencyCompare={
            compareData ? compareData[maxDataLength].avg.latency : 0
          }
          averageP99={data ? data[maxDataLength].avg.p95 : 0}
          averageP99Compare={
            compareData ? compareData[maxDataLength].avg.p95 : 0
          }
          isCompleted={true}
          latency={data ? data[maxDataLength].latency.avg : 0}
        />
      </div>
      <div className={styles.block}>
        <LatencyChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={
            compareData?.slice(
              compareData?.length - 82,
              compareData?.length - 1,
            ) || []
          }
          max={max}
          maxDataLength={maxElements}
          averageLatency={
            compareData ? compareData[maxDataLength].avg.latency : 0
          }
          averageLatencyCompare={data ? data[maxDataLength].avg.latency : 0}
          averageP99={compareData ? compareData[maxDataLength].avg.p95 : 0}
          averageP99Compare={data ? data[maxDataLength].avg.p95 : 0}
          isCompleted={true}
          latency={compareData ? compareData[maxDataLength].latency.avg : 0}
        />
      </div>
      <div className={styles.block}>
        <ReqsChart
          avgRequests={data ? data[maxDataLength].avg.reqs : 0}
          requests={data ? data[maxDataLength].reqs : 0}
          totalRequests={data ? data[maxDataLength].totalReqs : 0}
          totalRequestsCompare={
            compareData ? compareData[maxDataLength].totalReqs : 0
          }
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={data?.slice(data?.length - 81, data?.length) || []}
          maxDataLength={maxElements}
          max={maxRequests}
          isCompleted={true}
          totalRequestsFail={data ? data[maxDataLength].totalFailReqs : 0}
        />
      </div>
      <div className={styles.block}>
        <ReqsChart
          avgRequests={compareData ? compareData[maxDataLength].avg.reqs : 0}
          requests={compareData ? compareData[maxDataLength].reqs : 0}
          totalRequests={compareData ? compareData[maxDataLength].totalReqs : 0}
          totalRequestsCompare={data ? data[maxDataLength].totalReqs : 0}
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={
            compareData?.slice(
              compareData?.length - 82,
              compareData?.length - 1,
            ) || []
          }
          maxDataLength={maxElements}
          max={maxRequests}
          isCompleted={true}
          totalRequestsFail={
            compareData ? compareData[maxDataLength].totalFailReqs : 0
          }
        />
      </div>
      <div className={styles.block}>
        <CPUChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={data?.slice(data?.length - 81, data?.length) || []}
          max={100}
          maxDataLength={maxElements}
          average={data ? data[maxDataLength].avg.cpus : 0}
          averageCompare={compareData ? compareData[maxDataLength].avg.cpus : 0}
          isCompleted={true}
          currentLoad={data ? data[maxDataLength].cpus.cpus : 0}
        />
      </div>
      <div className={styles.block}>
        <CPUChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={
            compareData?.slice(
              compareData?.length - 82,
              compareData?.length - 1,
            ) || []
          }
          max={100}
          maxDataLength={maxElements}
          average={compareData ? compareData[maxDataLength].avg.cpus : 0}
          averageCompare={data ? data[maxDataLength].avg.cpus : 0}
          isCompleted={true}
          currentLoad={compareData ? compareData[maxDataLength].cpus.cpus : 0}
        />
      </div>
    </div>
  );
};

export default DemoPerformance;
