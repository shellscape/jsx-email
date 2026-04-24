import type {
  IData,
  IJSONData,
} from "@components/landing/benchmark/types";

export default (data: IJSONData[]): IData[] => {
  return data
    .map((item) => ({
      time: new Date(item.time).getMilliseconds(),
      latency: {
        avg: item.latency_average,
        p90: item.latency_90,
        p95: item.latency_95,
      },
      cpus: {
        cpu1: item.core1,
        cpu2: item.core2,
        cpu3: item.core3,
        cpu4: item.core4,
        cpus: (item.core1 + item.core2 + item.core3 + item.core4) / 4,
      },
      reqs: item.reqs_per_sec,
      failReqs: item.fail_reqs_per_sec,
      totalReqs: null,
      totalFail: null,
      avg: null,
      max: null,
    }))
    .map((newItem, index, self) => {
      const sliced = self.slice(0, index + 1);

      const p95 =
        sliced.reduce((prev, next) => prev + next.latency.p95, 0) /
        sliced.length;
      const cpus =
        sliced.reduce((prev, next) => prev + next.cpus.cpus, 0) / sliced.length;
      const latency =
        sliced.reduce((prev, next) => prev + next.latency.avg, 0) /
        sliced.length;
      const reqs =
        sliced.reduce((prev, next) => prev + next.reqs, 0) / sliced.length;
      const totalReqs = sliced.reduce((prev, next) => prev + next.reqs, 0);
      const totalFailReqs = sliced.reduce(
        (prev, next) => prev + next.failReqs,
        0,
      );
      const maxReqs = Math.max(...sliced.map(({ reqs }) => reqs));
      const maxLatency = Math.max(
        ...sliced.map(({ latency }) => Math.max(...Object.values(latency))),
      );

      return {
        ...newItem,
        totalReqs,
        totalFailReqs,
        avg: {
          p95,
          cpus,
          latency,
          reqs,
        },
        max: {
          reqs: maxReqs,
          latency: maxLatency,
        },
      };
    })
    .sort((a, b) => a.time - b.time);
};
