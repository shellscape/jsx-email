import { BenchmarkProvider } from "./context/useBenchmarkContext";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import styles from "./MdxBenchmark.module.css";

const MDXBenchmark = () => {
  return (
    <BenchmarkProvider>
      <div className={styles["mdx-benchmark__wrap"]}>
        <ControlPanel minWidth={1190} />
        <div className={styles.bottom}>
          <a
            href="https://github.com/drizzle-team/drizzle-benchmarks"
            target="_blank"
            rel="nofollow noreferrer"
            className={styles.github}
          >
            Open on Github ↗︎
          </a>
        </div>
      </div>
    </BenchmarkProvider>
  );
};

export default MDXBenchmark;
