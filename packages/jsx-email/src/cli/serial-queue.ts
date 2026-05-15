export const createSerialAsyncQueue = () => {
  let queue = Promise.resolve();

  return <T>(task: () => Promise<T>) => {
    const next = queue.then(task, task);
    queue = next.then(
      () => undefined,
      () => undefined
    );

    return next;
  };
};
