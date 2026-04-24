import { type FC, useState, useRef, useEffect, useMemo } from "react";

import { CheckIcon } from "@/assets/icons/Icons";
import { SVGViewBoxHeight, SVGViewBoxWidth } from "../../constants";
import { type IData } from "../../types";
import fixedHelper from "../../utils/fixedHelper";

import styles from "./CPUChart.module.css";

interface IProps {
  setSelectedItemIndex: (index: number | null) => void;
  selectedItemIndex: number | null;
  pathArray: IData[];
  maxDataLength: number;
  isCompleted: boolean;
  max: number;
  average: number;
  averageCompare: number;
  showTooltip?: boolean;
  currentLoad: number;
}

const CPUChart: FC<IProps> = ({
  setSelectedItemIndex,
  selectedItemIndex,
  pathArray,
  max,
  maxDataLength,
  isCompleted,
  average,
  averageCompare,
  showTooltip,
  currentLoad,
}) => {
  const [tipPosition, setTipPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const svgHeight = SVGViewBoxHeight;
  const svgWidth = SVGViewBoxWidth;
  const lineRef = useRef<SVGLineElement>(null!);
  const statsRef = useRef<HTMLDivElement>(null!);
  const itemSize = svgWidth / (maxDataLength - 1);

  const formatCpu = (cpu?: number) => {
    if (!cpu && cpu !== 0) return "0";
    if (cpu < 100) {
      return cpu.toFixed(1);
    }
    return cpu.toFixed();
  };

  const calculatePath = (arr: IData[]) =>
    arr
      .map(
        (item, index) =>
          `${(index * itemSize).toFixed()},${(
            svgHeight -
            (svgHeight * item.cpus.cpus) / max
          ).toFixed()}`,
      )
      .join(",");

  const getLines = useMemo(
    () => (
      <>
        <line
          className={styles["dashed-line"]}
          strokeWidth="1"
          x1={0}
          x2={svgWidth}
          y1={1}
          y2={1}
          strokeDasharray="12, 12"
        />
        <line
          className={styles["dashed-line"]}
          strokeWidth="1"
          x1={0}
          x2={svgWidth}
          y1={svgHeight / 3}
          y2={svgHeight / 3}
          strokeDasharray="12, 12"
        />
        <line
          className={styles["dashed-line"]}
          strokeWidth="1"
          x1={0}
          x2={svgWidth}
          y1={(svgHeight / 3) * 2}
          y2={(svgHeight / 3) * 2}
          strokeDasharray="12, 12"
        />
        <line
          className={styles["dashed-line"]}
          strokeWidth="1"
          x1={0}
          x2={svgWidth}
          y1={svgHeight}
          y2={svgHeight}
        />
      </>
    ),
    [],
  );

  const calculateCirclePosition = (arr: IData[]) => {
    if (arr.length === 0) return {};
    return {
      cx: ((arr.length - 1) * itemSize).toFixed(2),
      cy: (
        svgHeight -
        (svgHeight * arr[arr.length - 1].cpus.cpus) / max
      ).toFixed(),
    };
  };

  const getCircles = useMemo(
    () => (
      <circle
        className={styles.circle}
        strokeWidth="3"
        r="3.5"
        data-screenshot-exclude="true"
        {...calculateCirclePosition(pathArray)}
      />
    ),
    [pathArray],
  );

  const getPolylines = useMemo(
    () => (
      <g>
        <polyline
          fill="none"
          className={styles.line}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={calculatePath(pathArray)}
        />
        <polyline
          fill="url(#linegraph-blue-gradient)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={`0 ${svgHeight} ${calculatePath(pathArray)} ${(
            (pathArray.length - 1) *
            itemSize
          ).toFixed()} ${svgHeight}`}
        />
      </g>
    ),
    [pathArray],
  );

  const getRects = useMemo(
    () =>
      pathArray.map((_, index) => (
        <rect
          key={index}
          fill="transparent"
          width={itemSize}
          height={svgHeight}
          onMouseEnter={() => setSelectedItemIndex(index)}
          x={index * itemSize - itemSize / 2}
          y={0}
        />
      )),
    [pathArray.length],
  );

  const removeSelectedItemIndex = () => {
    setSelectedItemIndex(null);
  };

  const getSelectedItemCircles = () => {
    if (selectedItemIndex === null) return;
    return (
      <circle
        strokeWidth="3"
        className={styles.circle}
        r="3.5"
        data-screenshot-exclude="true"
        cx={selectedItemIndex * itemSize}
        cy={
          svgHeight - (svgHeight * pathArray[selectedItemIndex].cpus.cpus) / max
        }
      />
    );
  };

  useEffect(() => {
    if (lineRef.current && selectedItemIndex !== null && statsRef.current) {
      const { x, y } = lineRef.current.getBoundingClientRect();
      const { width } = statsRef.current.getBoundingClientRect();
      if (x + width / 2 > window.innerWidth - 20) {
        setTipPosition({
          x: x - (x + width / 2 - window.innerWidth) - 20,
          y: y + window.scrollY,
        });
        return;
      }
      if (x - width / 2 < 20) {
        setTipPosition({
          x: x - (x - width / 2 - 20),
          y: y + window.scrollY,
        });
        return;
      }
      setTipPosition({ x: x + window.scrollX, y: y + window.scrollY });
    }
  }, [selectedItemIndex]);

  const xTimes = () => {
    const a = average || 0;
    const b = averageCompare || 0;
    return fixedHelper(b / a, 2);
  };

  return (
    <div>
      <div className={styles.header}>
        {isCompleted ? (
          <div className={styles.label}>
            avg CPU load: {formatCpu(average)}%
          </div>
        ) : selectedItemIndex === null ? (
          <div className={styles.label}>
            CPU load: {formatCpu(currentLoad)}%
          </div>
        ) : (
          <div style={{ height: "12px" }}></div>
        )}
        {pathArray.length > 0 && isCompleted && showTooltip && (
          <div
            className={
              isCompleted && showTooltip
                ? styles["tooltip-wrap-underline"]
                : styles["tooltip-wrap"]
            }
          >
            <div className={styles.tooltip}>
              Drizzle has x{xTimes()} lower cpu usage
            </div>
            <div className={styles["success-icon-wrap"]}>
              <CheckIcon />
            </div>
            x{xTimes()}
          </div>
        )}
      </div>
      <div className={styles["chart-wrap"]}>
        <svg
          viewBox={`0 0 ${svgWidth + 7} ${svgHeight + 15}`}
          className="chart"
        >
          <defs>
            <linearGradient
              id="linegraph-blue-gradient"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                className={styles["color-stop-polygon"]}
                offset="0%"
                stopOpacity="0.85"
              />
              <stop
                className={styles["color-stop-polygon"]}
                offset="90%"
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>
          <g transform="translate(0,10)" onMouseLeave={removeSelectedItemIndex}>
            {getLines}
            {getPolylines}
            {getRects}
            {getCircles}
            {selectedItemIndex !== null && (
              <line
                ref={lineRef}
                className={styles["selected-line"]}
                strokeWidth="1"
                x1={selectedItemIndex * itemSize}
                x2={selectedItemIndex * itemSize}
                y1={0}
                y2={svgHeight}
              />
            )}
            {selectedItemIndex !== null && getSelectedItemCircles()}
          </g>
        </svg>
        {selectedItemIndex !== null && (
          <div
            className={styles.stats}
            ref={statsRef}
            style={{
              top: tipPosition.y,
              left: tipPosition.x,
            }}
          >
            <div className={styles["stats-item"]}>
              CPUs:
              <div className={styles["accent-text"]}>
                <span>
                  {formatCpu(pathArray[selectedItemIndex].cpus.cpu1)}%{" "}
                </span>
                <span>
                  {formatCpu(pathArray[selectedItemIndex].cpus.cpu2)}%{" "}
                </span>
                <span>
                  {formatCpu(pathArray[selectedItemIndex].cpus.cpu3)}%{" "}
                </span>
                <span>
                  {formatCpu(pathArray[selectedItemIndex].cpus.cpu4)}%{" "}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CPUChart;
