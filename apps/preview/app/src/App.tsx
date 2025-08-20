import { Provider as MobxProvider, observer } from 'mobx-react';
import { StrictMode, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { useAppStore } from './composables/useAppStore';
import { Shell } from './layouts/Shell';
import { AppStore } from './stores/AppStore';
import { Index } from './views/Index';
import { Preview } from './views/Preview/index';

const Router = observer(() => {
  const appStore = useAppStore();

  return (
    <>
      {appStore.templates.isReady && (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Shell />}>
              <Route index element={<Index />} />
              <Route path="emails">
                {Object.values(appStore.templates.records).map((template, index) => (
                  <Route
                    path={template.path.replace('.tsx', '')}
                    key={index}
                    element={<Preview />}
                  />
                ))}
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      )}
    </>
  );
});

export const App = () => {
  const [appStore] = useState(() => new AppStore());

  return (
    <StrictMode>
      <MobxProvider store={appStore}>
        <Router />
      </MobxProvider>
    </StrictMode>
  );
};
