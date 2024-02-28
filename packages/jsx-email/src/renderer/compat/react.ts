/* eslint-disable no-underscore-dangle */
import React from 'react';

import { createContext, readContext, useContext } from './context';
import * as hooks from './hooks';

const sillyName = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';
let origDispatcher: any = void 0;

export const shimReact = () => {
  origDispatcher = (React as any)[sillyName].ReactCurrentDispatcher.current;

  (React as any)[sillyName].ReactCurrentDispatcher = {
    current: {
      createContext,
      readContext,
      useContext,
      ...hooks
    }
  };
};

export const restoreReact = () => {
  (React as any)[sillyName].ReactCurrentDispatcher.current = origDispatcher;
};
