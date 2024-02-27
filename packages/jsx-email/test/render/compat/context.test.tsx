import { createContext, useContext } from '../../../src/renderer/compat/context';
import { jsxToString } from '../../../src';
// import {Template} from "../fixtures/async-template";

describe('context', () => {
  it('renders the Provider', async () => {
    const context = createContext(123);
    const result = await jsxToString(<context.Provider value={123} />);
    expect(result).toMatchSnapshot();
  });

  it('renders the Consumer', async () => {
    const context = createContext(123);
    const result = await jsxToString(<context.Consumer>{(val) => val}</context.Consumer>);
    expect(result).toMatchSnapshot();
  });

  it('provides default value with useContext hook', async () => {
    const context = createContext(123);
    let result = 0;
    const HookConsumer = () => {
      const val = useContext(context);
      result = val;
      return <></>;
    };
    await jsxToString(<HookConsumer />);
    expect(result).toEqual(123);
  });

  it('provides a scope-dependent context value to useContext', async () => {
    const context = createContext(123);
    const results = [0, 0, 0];
    const HookConsumer = ({ idx }: { idx: number }) => {
      const val = useContext(context);
      results[idx] = val;
      return <></>;
    };
    await jsxToString(
      <>
        <HookConsumer idx={0} />
        <context.Provider value={456}>
          <HookConsumer idx={1} />
        </context.Provider>
        <context.Provider value={789}>
          <HookConsumer idx={2} />
        </context.Provider>
      </>
    );
    expect(results[0]).toEqual(123);
    expect(results[1]).toEqual(456);
    expect(results[2]).toEqual(789);
  });

  it('provides a scope-dependent context value to consumers', async () => {
    const context = createContext(123);
    const results = [0, 0, 0];
    await jsxToString(
      <>
        <context.Consumer>{(val) => {
          results[0] = val;
          return val
        }}</context.Consumer>
        <context.Provider value={456}>
          <context.Consumer>{(val) => {
            results[1] = val;
            return val
          }}</context.Consumer>
        </context.Provider>
        <context.Provider value={789}>
          <context.Consumer>{(val) => {
            results[2] = val;
            return val
          }}</context.Consumer>
        </context.Provider>
      </>
    );
    expect(results[0]).toEqual(123);
    expect(results[1]).toEqual(456);
    expect(results[2]).toEqual(789);
  });

  it('properly cleans up nested scopes', async () => {
    const context = createContext(123);
    const results = [0, 0, 0, 0, 0];
    const HookConsumer = ({ idx }: { idx: number }) => {
      const val = useContext(context);
      results[idx] = val;
      return <></>;
    };
    await jsxToString(
      <>
        <HookConsumer idx={0} />
        <context.Provider value={456}>
          <HookConsumer idx={1} />
          <context.Provider value={789}>
            <HookConsumer idx={2} />
          </context.Provider>
          <HookConsumer idx={3} />
        </context.Provider>
        <HookConsumer idx={4} />
      </>
    );
    expect(results[0]).toEqual(123);
    expect(results[1]).toEqual(456);
    expect(results[2]).toEqual(789);
    expect(results[3]).toEqual(456);
    expect(results[4]).toEqual(123);
  });

});
