/* eslint-disable import/no-default-export */
import config from './playwright.config';

(config.webServer as any).command = 'pnpm exec moon smoke:dev';
(config.webServer as any).env.LOCAL_SMOKE = 'true';

export default Object.assign(config, {});
