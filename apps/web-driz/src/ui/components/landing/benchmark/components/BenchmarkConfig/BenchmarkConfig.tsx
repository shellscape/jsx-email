import { type FC } from "react";
import { type IParams } from "../../types";
import configurationData from "../../configurationData";
import styles from "./BenchmarkConfig.module.css";

interface Props {
  selectedItems: IParams;
}

const BenchmarkConfig: FC<Props> = ({ selectedItems }) => (
  <div className={styles.items}>
    <div>
      <div className={styles["main-info"]}>
        {configurationData.orm.items[selectedItems.orm].config_info}
      </div>
    </div>
    <br />
    <div className={styles["main-items"]}>
      <div className={styles["main-info"]}>
        {configurationData.dbSize.items[selectedItems.dbSize].config_info}
      </div>
      <div className={styles["main-info"]}>
        {
          configurationData.projectType.items[selectedItems.projectType]
            .config_info
        }
      </div>
      <div className={styles["main-info"]}>
        {configurationData.database.items[selectedItems.database].config_info}
      </div>
    </div>
    <br />
    <div className={styles["additional-items"]}>
      <div className={styles["additional-info"]}>Lenovo M720q</div>
      <div className={styles["additional-info"]}>
        Linux 5.15.0-86-generic x86_64
      </div>
      <div className={styles["additional-info"]}>Intel Core i3-9100T</div>
      <div className={styles["additional-info"]}>RAM 32GB DDR4 2666MHz</div>
    </div>
  </div>
);

export default BenchmarkConfig;
