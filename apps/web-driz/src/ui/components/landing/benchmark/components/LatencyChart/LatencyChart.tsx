import { type FC, useEffect, useMemo, useRef, useState } from "react";

import { SVGViewBoxHeight, SVGViewBoxWidth } from "../../constants";
import { CheckIcon, XIcon } from "@/assets/icons/Icons";
import type { IData } from "../../types";
import fixedHelper from "../../utils/fixedHelper";
import formatMs from "../../utils/formatMs";

import styles from "./LatencyChart.module.css";

interface IProps {
  setSelectedItemIndex: (index: number | null) => void;
  selectedItemIndex: number | null;
  pathArray: IData[];
  maxDataLength: number;
  max: number;
  averageLatency: number;
  averageLatencyCompare: number;
  averageP99: number;
  averageP99Compare: number;
  isCompleted: boolean;
  showTooltip?: boolean;
  latency: number;
}

const LatencyChart: FC<IProps> = ({
  setSelectedItemIndex,
  selectedItemIndex,
  pathArray,
  max,
  maxDataLength,
  isCompleted,
  averageLatency,
  averageLatencyCompare,
  averageP99,
  averageP99Compare,
  showTooltip,
  latency,
}) => {
  const [tipPosition, setTipPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const svgHeight = SVGViewBoxHeight;
  const svgWidth = SVGViewBoxWidth;
  const statsRef = useRef<HTMLDivElement>(null!);
  const lineRef = useRef<SVGLineElement>(null!);
  const params: Array<keyof IData["latency"]> = ["p95", "p90", "avg"];
  const itemSize = svgWidth / (maxDataLength - 1);

  const calculatePath = (arr: IData[], param: keyof IData["latency"]) => {
    if (arr.length === 0 || !max) return "";
    return arr
      .map(
        (item, index) =>
          `${(index * itemSize).toFixed()},${(
            svgHeight -
            (svgHeight * +item.latency[param]) / max
          ).toFixed()}`,
      )
      .join(",");
  };

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

  const calculateCirclePosition = (
    arr: IData[],
    param: keyof IData["latency"],
  ) => {
    if (arr.length === 0 || !max) return {};
    return {
      cx: ((arr.length - 1) * itemSize).toFixed(),
      cy: (
        svgHeight -
        (svgHeight * +arr[arr.length - 1].latency[param]) / max
      ).toFixed(),
    };
  };

  const getCircles = useMemo(() => {
    if (!max) return;
    return params.map((param, index) => (
      <circle
        key={index}
        strokeWidth="3"
        className={styles[`${param}-circle`]}
        r="3.5"
        data-screenshot-exclude="true"
        {...calculateCirclePosition(pathArray, param)}
      />
    ));
  }, [pathArray]);

  const getPolylines = useMemo(
    () =>
      params.map((param, index) => (
        <g key={index}>
          <polyline
            fill="none"
            className={styles[`${param}-line`]}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={calculatePath(pathArray, param)}
          />
          <polyline
            className={styles[`${param}-polygon`]}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={`0 ${svgHeight} ${calculatePath(pathArray, param)} ${
              (pathArray.length - 1) * itemSize
            } ${svgHeight}`}
          />
        </g>
      )),
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
    return params.map((param, index) => (
      <circle
        key={index}
        strokeWidth="3"
        className={styles[`${param}-circle`]}
        r="3.5"
        data-screenshot-exclude="true"
        cx={selectedItemIndex * itemSize}
        cy={
          svgHeight -
          (svgHeight * +pathArray[selectedItemIndex].latency[param]) / max
        }
      />
    ));
  };

  useEffect(() => {
    if (lineRef.current && selectedItemIndex !== null) {
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

  return (
    <div>
      <div className={styles.header}>
        {isCompleted ? (
          <div className={styles.label}>
            avg latency: {formatMs(averageLatency)}
          </div>
        ) : selectedItemIndex === null ? (
          <div className={styles.label}>avg latency: {formatMs(latency)}</div>
        ) : (
          <div style={{ height: "12px" }}></div>
        )}
        {pathArray.length > 0 && isCompleted && showTooltip && (
          <div className={styles["success-values"]}>
            <div
              className={
                isCompleted && showTooltip
                  ? styles["tooltip-wrap-underline"]
                  : styles["tooltip-wrap"]
              }
            >
              {fixedHelper(averageLatencyCompare / averageLatency, 2) > 1 ? (
                <div className={styles.tooltip}>
                  Drizzle has x
                  {fixedHelper(
                    +averageLatencyCompare.toFixed() /
                      +averageLatency.toFixed(),
                    1,
                  )}{" "}
                  times better average latency
                </div>
              ) : fixedHelper(averageLatencyCompare / averageLatency, 2) ===
                1 ? (
                <div className={styles.tooltip}>
                  Drizzle has the same average latency
                </div>
              ) : (
                <div className={styles.tooltip}>
                  Drizzle has x
                  {fixedHelper(
                    +averageLatency.toFixed() /
                      +averageLatencyCompare.toFixed(),
                    1,
                  )}{" "}
                  times worse average latency
                </div>
              )}
              {fixedHelper(averageLatencyCompare / averageLatency, 2) > 1 ? (
                <div className={styles["success-icon-wrap"]}>
                  <CheckIcon />
                </div>
              ) : fixedHelper(averageLatencyCompare / averageLatency, 2) ===
                1 ? (
                <div></div>
              ) : (
                <div className={styles["success-icon-wrap"]}>
                  <XIcon />
                </div>
              )}
              x
              {fixedHelper(
                +averageLatencyCompare.toFixed() / +averageLatency.toFixed(),
                1,
              )}
            </div>
            <span> | </span>
            <div
              className={
                isCompleted && showTooltip
                  ? styles["tooltip-wrap-underline"]
                  : styles["tooltip-wrap"]
              }
            >
              {fixedHelper(averageP99Compare / averageP99, 2) > 1 ? (
                <div className={styles.tooltip}>
                  Drizzle has x
                  {fixedHelper(
                    +averageP99Compare.toFixed() / +averageP99.toFixed(),
                    1,
                  )}{" "}
                  times better p95 latency
                </div>
              ) : fixedHelper(averageP99Compare / averageP99, 2) === 1 ? (
                <div className={styles.tooltip}>
                  Drizzle has the same p95 latency
                </div>
              ) : (
                <div className={styles.tooltip}>
                  Drizzle has x
                  {fixedHelper(
                    +averageP99.toFixed() / +averageP99Compare.toFixed(),
                    1,
                  )}{" "}
                  times worse p95 latency
                </div>
              )}
              x
              {fixedHelper(
                +averageP99Compare.toFixed() / +averageP99.toFixed(),
                1,
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles["chart-wrap"]}>
        <svg
          viewBox={`0 0 ${svgWidth + 7} ${svgHeight + 15}`}
          className="chart"
        >
          <g transform="translate(0,10)" onMouseLeave={removeSelectedItemIndex}>
            {getLines}
            {getPolylines}
            {getRects}
            {getCircles}
            {selectedItemIndex !== null && (
              <line
                ref={lineRef}
                className={styles["selected-line"]}
                stroke="#000000"
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
              left: tipPosition.x,
              top: tipPosition.y,
            }}
          >
            <div className={styles["stats-item"]}>
              <div className={`${styles.circle} ${styles["stats-avg"]}`} />
              avg:
              <div className={styles["accent-text"]}>
                {formatMs(pathArray[selectedItemIndex].latency.avg)}
              </div>
            </div>
            <div className={styles["stats-item"]}>
              <div className={`${styles.circle} ${styles["stats-p90"]}`} />
              p90:
              <div className={styles["accent-text"]}>
                {formatMs(pathArray[selectedItemIndex].latency.p90)}
              </div>
            </div>
            <div className={styles["stats-item"]}>
              <div className={`${styles.circle} ${styles["stats-p95"]}`} />
              p95:
              <div className={styles["accent-text"]}>
                {formatMs(pathArray[selectedItemIndex].latency.p95)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatencyChart;
