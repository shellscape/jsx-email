import React, { type FC, useRef } from "react";

import styles from "./RuntimeSelector.module.css";
import { useBenchmarkContext } from "@components/landing/benchmark/context/useBenchmarkContext";
import BunIcon from "@components/landing/benchmark/components/RuntimeSelector/BunIcon";
import NodeIcon from "@components/landing/benchmark/components/RuntimeSelector/NodeIcon";

interface Item {
  value:
    | "node-24"
    | "node-22"
    | "node-18"
    | "node-20"
    | "bun-1.3.4"
    | "bun-1.1.25";
  name: string;
}

interface Props {
  disabled?: boolean;
}

const RuntimeSelector: FC<Props> = ({ disabled }) => {
  const { selectedItems, setSelectedItems } = useBenchmarkContext();
  const resizerRef = useRef<HTMLDivElement | null>(null);

  const items: Item[] =
    selectedItems.orm === "prisma-v7.1.0"
      ? [
          { value: "bun-1.3.4", name: "Bun v1.3.4" },
          { value: "node-24", name: "Node 24.6.0" },
        ]
      : selectedItems.orm === "go"
        ? [{ value: "bun-1.3.4", name: "Bun v1.3.4" }]
        : [
            { value: "bun-1.1.25", name: "Bun v1.1.25" },
            { value: "node-22", name: "Node 22.6.0" },
            { value: "node-20", name: "Node v20.16.0" },
            { value: "node-18", name: "Node v18.20.4" },
          ];

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedItems({
      ...selectedItems,
      runtime: e.target.value as Item["value"],
    });
  };

  return (
    <>
      <div
        ref={resizerRef}
        id={"resizer"}
        className={styles.button}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          visibility: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {items.find(({ value }) => value === selectedItems.runtime)!.name}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {selectedItems.runtime.startsWith("bun") ? (
          <div className={styles.icon}>
            <BunIcon />
          </div>
        ) : (
          <div className={styles.icon}>
            <NodeIcon />
          </div>
        )}
        <select
          className={styles.button}
          onChange={handleChange}
          disabled={disabled}
          value={selectedItems.runtime}
          style={{
            width: resizerRef.current
              ? `${resizerRef.current.offsetWidth}px`
              : "109px",
            ...(disabled && {
              pointerEvents: "none",
              cursor: "not-allowed",
            }),
          }}
        >
          {items.map((item) => (
            <option
              key={item.value}
              value={item.value}
              // selected={selectedItems.runtime === item.value}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default RuntimeSelector;
