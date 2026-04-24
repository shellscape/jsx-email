import React, { type FC } from "react";
import styles from "./Configuration.module.css";

import data from "../../configurationData.ts";
import type { IModalInputDataItem, IParams } from "../../types.ts";
import { useBenchmarkContext } from "../../context/useBenchmarkContext.tsx";

interface IProps {
  isOpened: boolean;
}

const Configuration: FC<IProps> = ({ isOpened }) => {
  const { selectedItems, setSelectedItems } = useBenchmarkContext();
  const [currentTab, setCurrentTab] =
    React.useState<keyof Omit<IParams, "runtime" | "joins">>("orm");

  const changeTab = (tab: keyof Omit<IParams, "runtime" | "joins">) => {
    setCurrentTab(tab);
  };

  const selectItem = (option: IModalInputDataItem, item: string) => {
    if (option.disabled || !selectedItems) return;
    if (selectedItems[currentTab] === item) return;
    setSelectedItems({
      ...selectedItems,
      [currentTab]: item,
      ...(currentTab === "orm" && item === "go"
        ? { runtime: "bun-1.3.4", joins: false }
        : {}),
      ...(currentTab === "orm" && item === "prisma-v7.1.0"
        ? { runtime: "bun-1.3.4", joins: false }
        : {}),
      ...(currentTab === "orm" && item === "prisma-v5.18.0"
        ? { runtime: "bun-1.1.25", joins: false }
        : {}),
    });
  };

  return (
    <div className={isOpened ? styles["wrap-opened"] : styles.wrap}>
      <div className={styles.tabs}>
        {Object.keys(selectedItems)
          .filter(
            (k): k is keyof Omit<IParams, "runtime" | "joins"> =>
              k !== "runtime" && k !== "joins",
          )
          .map((item) => (
            <button
              type="button"
              className={
                currentTab === item ? styles["active-tab"] : styles.tab
              }
              key={item}
              onClick={() => changeTab(item)}
            >
              {data[item].value}
            </button>
          ))}
      </div>
      <div className={styles.options}>
        {selectedItems &&
          Object.keys(data[currentTab].items).map((item) => {
            const items = data[currentTab].items;
            const option = items[
              item as keyof typeof items
            ] as IModalInputDataItem;
            return (
              <button
                type="button"
                className={
                  selectedItems[currentTab as keyof IParams] === item
                    ? styles["active-option"]
                    : styles.option
                }
                key={item}
                onClick={() => selectItem(option, item)}
                disabled={option.disabled}
              >
                <div className={styles.text}>
                  <div className={styles.title}>
                    {option.value}
                    {!option.disabled && option.description && (
                      <div className={styles.description}>
                        → {option.description}
                      </div>
                    )}
                  </div>
                  {option.disabled && (
                    <div className={styles.disabled}>coming soon</div>
                  )}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Configuration;
