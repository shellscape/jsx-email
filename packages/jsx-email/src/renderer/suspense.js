// Note: tshy has some bugs with dual-mode package importing in the cjs build https://github.com/isaacs/tshy/issues/50
// @ts-ignore
import hash from 'hash-it';
const promiseMap = new Map();
const wrapPromise = (promise) => {
    let status = 'pending';
    let result;
    const suspender = promise.then((r) => {
        status = 'success';
        result = r;
    }, (e) => {
        status = 'error';
        result = e;
    });
    return {
        // eslint-disable-next-line consistent-return
        read() {
            if (status === 'pending') {
                throw suspender;
            }
            else if (status === 'error') {
                throw result;
            }
            else if (status === 'success') {
                return result;
            }
        }
    };
};
export const useData = (props, cb) => {
    const key = hash(props);
    let dataPromise;
    if (promiseMap.has(key)) {
        dataPromise = promiseMap.get(key);
    }
    else {
        dataPromise = wrapPromise(cb());
        promiseMap.set(key, dataPromise);
    }
    return dataPromise.read();
};
//# sourceMappingURL=suspense.js.map