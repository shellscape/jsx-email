import hash from 'hash-it';

const promiseMap = new Map();

const wrapPromise = <TPromise extends Promise<any>>(promise: TPromise) => {
  let status = 'pending';
  let result: Awaited<TPromise>;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    // eslint-disable-next-line consistent-return
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        // oxlint-disable-next-line no-throw-literal
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
};

export const useData = <TData>(props: any, cb: () => Promise<TData>): TData => {
  const key = hash(props);
  let dataPromise;
  if (promiseMap.has(key)) {
    dataPromise = promiseMap.get(key);
  } else {
    dataPromise = wrapPromise(cb());
    promiseMap.set(key, dataPromise);
  }
  return dataPromise.read();
};
