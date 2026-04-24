import React, { type FC } from "react";

import styles from "./JoinsSelector.module.css";
import { useBenchmarkContext } from "@components/landing/benchmark/context/useBenchmarkContext";

interface Item {
  value: boolean;
  name: string;
}

const JoinsSelector: FC = () => {
  const { selectedItems, setSelectedItems } = useBenchmarkContext();

  const items: Item[] = [
    { value: false, name: "Queries" },
    { value: true, name: "Joins" },
  ];

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedItems({
      ...selectedItems,
      joins: e.target.value === "true",
    });
  };

  return (
    <select
      className={styles.button}
      onChange={handleChange}
      value={String(selectedItems.joins)}
    >
      {items.map((item) => (
        <option
          key={item.name}
          value={String(item.value)}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default JoinsSelector;
