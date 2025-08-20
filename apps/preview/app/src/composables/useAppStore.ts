import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';

import type { AppStore } from '../stores/AppStore';

export function useAppStore() {
  const { store } = useContext(MobXProviderContext) as {
    store: AppStore;
  };

  if (!store) throw new Error("Store doesn't exist.");

  return store;
}
