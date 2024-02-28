/* eslint-disable import/no-default-export */
import config from './playwright.config';

(config.webServer as any).command = 'pnpm exec moon smoke:dev';

export default Object.assign(config, {});
