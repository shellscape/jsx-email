import React from 'react';

export const dispatcher = {};

export const patchHooks = () => {
  // eslint-disable-next-line no-underscore-dangle
  const internal = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  internal.ReactCurrentDispatcher.current = dispatcher;
};
